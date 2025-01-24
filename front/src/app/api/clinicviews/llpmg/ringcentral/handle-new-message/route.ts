// app/api/process-message/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ringCentralClient } from "@/lib/clinicviews/ringcentralClient";

interface ProcessedMessage {
	id: string;
	from: string;
	to: string;
	content: string;
	timestamp: number;
}

interface Conversation {
	patientNumber: string;
	doctorNumber: string;
}

const processedMessages: ProcessedMessage[] = [];
const DEDUPLICATION_WINDOW = 300000; // 5 minutes in milliseconds

const activeConversations: { [key: string]: Conversation } = {};

function formatPhoneNumber(phoneNumber: string | undefined): string {
	if (!phoneNumber) {
		return "";
	}
	const cleaned = phoneNumber.replace(/\D/g, "");
	return cleaned.startsWith("1") ? `+${cleaned}` : `+1${cleaned}`;
}

function isDuplicate(message: ProcessedMessage): boolean {
	const now = Date.now();
	return processedMessages.some(
		(m) =>
			m.from === message.from &&
			m.to === message.to &&
			m.content === message.content &&
			now - m.timestamp < DEDUPLICATION_WINDOW
	);
}

function addProcessedMessage(message: ProcessedMessage) {
	processedMessages.push(message);
	if (processedMessages.length > 100) {
		processedMessages.shift();
	}
}

function getOrCreateConversation(
	number1: string,
	number2: string
): Conversation {
	const key1 = `${number1}-${number2}`;
	const key2 = `${number2}-${number1}`;

	if (activeConversations[key1]) {
		return activeConversations[key1];
	} else if (activeConversations[key2]) {
		return activeConversations[key2];
	} else {
		// Assume the first number is the patient for new conversations
		const newConversation = {
			patientNumber: number1,
			doctorNumber: number2,
		};
		activeConversations[key1] = newConversation;
		return newConversation;
	}
}

export async function POST(req: NextRequest) {
	console.log("Received request:", JSON.stringify(await req.json(), null, 2));

	if (req.method !== "POST") {
		return NextResponse.json(
			{ error: "Method not allowed" },
			{ status: 405 }
		);
	}

	try {
		const body = await req.json();
		const { messageId } = body;

		if (!messageId) {
			return NextResponse.json(
				{ error: "Missing messageId" },
				{ status: 400 }
			);
		}

		console.log(
			`[${new Date().toISOString()}] Fetching message details for ID:`,
			messageId
		);
		const messageResponse = await ringCentralClient.get(
			`/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
		);
		const messageDetails = await messageResponse.json();

		if (
			!messageDetails.from ||
			!messageDetails.to ||
			!messageDetails.to[0]
		) {
			throw new Error("Invalid message structure");
		}

		const fromNumber = formatPhoneNumber(messageDetails.from.phoneNumber);
		const toNumber = formatPhoneNumber(messageDetails.to[0].phoneNumber);
		const messageContent = messageDetails.subject || "No subject";

		const newMessage: ProcessedMessage = {
			id: messageId,
			from: fromNumber,
			to: toNumber,
			content: messageContent,
			timestamp: Date.now(),
		};

		if (isDuplicate(newMessage)) {
			console.log(
				`[${new Date().toISOString()}] Duplicate message detected, skipping`
			);
			return NextResponse.json(
				{ status: "Duplicate message ignored" },
				{ status: 200 }
			);
		}

		const rcNumber = formatPhoneNumber(process.env.RC_PHONE_NUMBER);
		if (!rcNumber) {
			throw new Error("RC_PHONE_NUMBER is not set");
		}

		if (fromNumber !== rcNumber) {
			const conversation = getOrCreateConversation(fromNumber, toNumber);
			const recipientNumber =
				fromNumber === conversation.patientNumber
					? conversation.doctorNumber
					: conversation.patientNumber;

			console.log(
				`[${new Date().toISOString()}] Forwarding message to:`,
				recipientNumber
			);

			await ringCentralClient.post(
				"/restapi/v1.0/account/~/extension/~/sms",
				{
					from: { phoneNumber: rcNumber },
					to: [{ phoneNumber: recipientNumber }],
					text: messageContent,
				}
			);

			addProcessedMessage(newMessage);
			console.log(
				`[${new Date().toISOString()}] Message forwarded successfully`
			);
			return NextResponse.json(
				{ status: "Message forwarded successfully" },
				{ status: 200 }
			);
		} else {
			console.log(
				`[${new Date().toISOString()}] Outgoing message, ignoring`
			);
			return NextResponse.json(
				{ status: "Outgoing message ignored" },
				{ status: 200 }
			);
		}
	} catch (error: any) {
		console.error(
			`[${new Date().toISOString()}] Error processing message:`,
			error
		);
		return NextResponse.json(
			{
				error: "Failed to process message",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
