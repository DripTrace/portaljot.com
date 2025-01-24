// app/api/clinicviews/llpmg-text-session/route.ts
import { ringCentralClient } from "@/lib/clinicviews/ringcentralClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { providerPhone, patientPhone, initialMessage } =
			await request.json();

		// Login to RingCentral client using JWT
		await ringCentralClient.login({ jwt: process.env.RC_JWT });

		// Send SMS to both provider and patient
		const resp = await ringCentralClient.post(
			"/restapi/v1.0/account/~/extension/~/sms",
			{
				from: { phoneNumber: process.env.RC_PHONE_NUMBER },
				to: [
					{ phoneNumber: providerPhone },
					{ phoneNumber: patientPhone },
				],
				text: initialMessage,
			}
		);

		const result = await resp.json();

		// Return a successful response
		return NextResponse.json({
			message: "Registration successful",
			result,
		});
	} catch (error) {
		console.error("Error in API route:", error);

		// Return error details
		return NextResponse.json(
			{
				error: "An unknown error occurred",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
