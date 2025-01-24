import { ringCentralClient } from "@/lib/clinicviews/ringcentralClient";
import { NextRequest, NextResponse } from "next/server";

const sessions: { [key: string]: { patient: string; doctor: string } } = {};

function formatPhoneNumber(phone: string | number): string {
	const phoneString = String(phone).replace(/\D/g, "");
	const formattedPhoneNumber = `+1${phoneString.slice(-10)}`;

	if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
		throw new Error(`Invalid phone number format: ${formattedPhoneNumber}`);
	}
	return formattedPhoneNumber;
}

async function getMessageDetails(messageId: string) {
	await ringCentralClient.login({ jwt: process.env.RC_JWT });
	const response = await ringCentralClient.get(
		`/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
	);
	return response.json();
}

async function sendSMS(to: string, message: string) {
	await ringCentralClient.login({ jwt: process.env.RC_JWT });
	const formattedPhoneNumber = formatPhoneNumber(to);

	const resp = await ringCentralClient.post(
		"/restapi/v1.0/account/~/extension/~/sms",
		{
			from: { phoneNumber: process.env.RC_PHONE_NUMBER },
			to: [{ phoneNumber: formattedPhoneNumber }],
			text: message,
		}
	);

	return resp.json();
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

		console.log(
			"Received message data:",
			JSON.stringify(messageData, null, 2)
		);

		if (messageData?.body?.changes) {
			for (const change of messageData.body.changes) {
				const messageId = change.newMessageId || change.messageId;
				if (!messageId) {
					console.error("Message ID is undefined");
					continue;
				}

				const messageDetails = await getMessageDetails(messageId);
				console.log("Message details:", messageDetails);

				const { from, to, subject, direction } = messageDetails;
				const fromNumber = from.phoneNumber;
				const toNumber = to[0].phoneNumber;

				let sessionId: string;
				let targetNumber: string | undefined;

				if (direction === "Inbound") {
					// Patient to Doctor
					sessionId = `${fromNumber}-${toNumber}`;
					if (!sessions[sessionId]) {
						sessions[sessionId] = {
							patient: fromNumber,
							doctor: toNumber,
						};
					}
					targetNumber = sessions[sessionId]?.doctor;
				} else {
					// Doctor to Patient
					sessionId = `${toNumber}-${fromNumber}`;
					if (!sessions[sessionId]) {
						sessions[sessionId] = {
							patient: toNumber,
							doctor: fromNumber,
						};
					}
					targetNumber = sessions[sessionId]?.patient;
				}

				if (targetNumber) {
					await sendSMS(targetNumber, subject);
				} else {
					console.error("Session not found for message.");
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
		console.error("Error processing message:", error);
		return NextResponse.json(
			{ error: "Failed to process message" },
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
};
