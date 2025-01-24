// app/api/clinicviews/auth/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ringCentralClient } from "@/lib/clinicviews/ringcentralClient";

interface SipConfig {
	username: string;
	password: string;
	domain: string;
}

export async function POST(req: NextRequest) {
	try {
		// Retrieve environment variables
		const {
			RC_JWT,
			SIP_INFO_USERNAME,
			SIP_INFO_PASSWORD,
			SIP_INFO_DOMAIN,
		} = process.env;

		// Validate environment variables
		if (
			!RC_JWT ||
			!SIP_INFO_USERNAME ||
			!SIP_INFO_PASSWORD ||
			!SIP_INFO_DOMAIN
		) {
			throw new Error(
				"Missing environment variables for RingCentral API authentication"
			);
		}

		// Authenticate with RingCentral using JWT
		await ringCentralClient.login({ jwt: RC_JWT });

		// Prepare SIP configuration
		const sipConfig: SipConfig = {
			username: SIP_INFO_USERNAME,
			password: SIP_INFO_PASSWORD,
			domain: SIP_INFO_DOMAIN,
		};

		// Respond with SIP configuration
		return NextResponse.json({ sipConfig }, { status: 200 });
	} catch (error: any) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		console.error("Error authenticating with JWT:", errorMessage);
		return NextResponse.json(
			{
				error: "Failed to authenticate with JWT",
				details: errorMessage,
			},
			{ status: 500 }
		);
	}
}
