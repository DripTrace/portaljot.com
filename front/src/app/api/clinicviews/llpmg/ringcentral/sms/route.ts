// app/api/clinicviews/ringcentral/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ringCentralClient } from "@/lib/clinicviews/ringcentralClient";
import axios from "axios";

interface MessageDetails {
	id: string;
	from: { phoneNumber: string };
	to: Array<{ phoneNumber: string }>;
	subject: string;
	direction: "Inbound" | "Outbound";
}

interface Conversation {
	patientNumber: string;
	doctorNumber: string;
}

const activeConversations: { [key: string]: Conversation } = {};
const processedMessageIds: Set<string> = new Set();

export function createOrUpdateConversation(
	patientNumber: string,
	doctorNumber: string
): string {
	const conversationId = `${patientNumber}-${doctorNumber}`;
	activeConversations[conversationId] = { patientNumber, doctorNumber };
	console.log(`Conversation created/updated: ${conversationId}`);
	return conversationId;
}

export async function getMessageDetails(
	messageId: string
): Promise<MessageDetails> {
	console.log(`Fetching details for message ID: ${messageId}`);
	await ringCentralClient.login({ jwt: process.env.RC_JWT });
	const response = await ringCentralClient.get(
		`/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
	);
	const details = await response.json();
	console.log(`Message details retrieved:`, JSON.stringify(details, null, 2));
	return details;
}

export async function sendSMS(to: string, message: string) {
	console.log(`Sending SMS to ${to}: ${message}`);
	await ringCentralClient.login({ jwt: process.env.RC_JWT });
	const response = await ringCentralClient.post(
		"/restapi/v1.0/account/~/extension/~/sms",
		{
			from: { phoneNumber: process.env.RC_PHONE_NUMBER },
			to: [{ phoneNumber: to }],
			text: message,
		}
	);
	const result = await response.json();
	console.log(`SMS sent successfully:`, JSON.stringify(result, null, 2));
}

export async function handleNewMessage(messageDetails: MessageDetails) {
	console.log(
		`Handling new message:`,
		JSON.stringify(messageDetails, null, 2)
	);
	const { from, to, subject } = messageDetails;
	const fromNumber = from.phoneNumber;
	const toNumber = to[0].phoneNumber;

	if (fromNumber === process.env.RC_PHONE_NUMBER) {
		console.log("Outbound message, ignoring");
		return;
	}

	console.log(
		`Active conversations:`,
		JSON.stringify(activeConversations, null, 2)
	);

	const conversationId = Object.keys(activeConversations).find(
		(id) =>
			activeConversations[id].patientNumber === fromNumber ||
			activeConversations[id].doctorNumber === fromNumber
	);

	if (!conversationId) {
		console.error(`No conversation found for number: ${fromNumber}`);
		return;
	}

	console.log(`Found conversation: ${conversationId}`);
	const conversation = activeConversations[conversationId];
	const recipientNumber =
		fromNumber === conversation.patientNumber
			? conversation.doctorNumber
			: conversation.patientNumber;

	console.log(`Forwarding message to: ${recipientNumber}`);
	await sendSMS(recipientNumber, `(${conversationId}) ${subject}`);
}

export async function POST(req: NextRequest) {
	const validationToken = req.headers.get("validation-token");

	if (validationToken) {
		return new NextResponse("OK", {
			headers: { "Validation-Token": validationToken },
		});
	}

	try {
		const messageData = await req.json();

		if (messageData && messageData.body && messageData.body.changes) {
			for (const change of messageData.body.changes) {
				if (change.type === "SMS" && change.newCount > 0) {
					for (const messageId of change.newMessageIds) {
						if (!processedMessageIds.has(messageId)) {
							processedMessageIds.add(messageId);
							try {
								await axios.post(
									`${process.env.BASE_URL}/api/clinicviews/ringcentral/handle-new-message`,
									{ messageId }
								);
							} catch (error) {
								if (axios.isAxiosError(error)) {
									console.error(
										"Error sending to new message handler:",
										error.response?.data || error.message
									);
								} else {
									console.error("Unexpected error:", error);
								}
							}
						} else {
							console.log(
								`Message with ID ${messageId} already processed, skipping.`
							);
						}
					}
				}
			}
			return NextResponse.json({ status: "Messages processed" });
		} else {
			return NextResponse.json(
				{ error: "Invalid message data" },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error("Error processing messages:", error);
		return NextResponse.json(
			{ error: "Failed to process messages" },
			{ status: 500 }
		);
	}
}
