// app/api/provision-sip/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SDK } from "@ringcentral/sdk";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { tokenData } = body;

		console.log("Received tokenData:", tokenData);

		if (!tokenData || !tokenData.access_token) {
			console.error("Token data is missing or invalid");
			return NextResponse.json(
				{ message: "Invalid token data" },
				{ status: 400 }
			);
		}

		const rcsdk = new SDK({
			server: process.env.NEXT_PUBLIC_RC_SERVER_URL!,
			clientId: process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_RC_APP_CLIENT_SECRET!,
		});

		const platform = rcsdk.platform();

		await platform.auth().setData(tokenData);

		const sipProvisionResponse = await platform.post(
			"/restapi/v1.0/client-info/sip-provision",
			{
				sipInfo: [{ transport: "WSS" }],
			}
		);

		const sipProvisionData = await sipProvisionResponse.json();

		console.log("SIP Provision Data:", sipProvisionData);

		return NextResponse.json(
			{
				sipProvisionData: JSON.stringify(sipProvisionData),
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Failed to provision SIP:", error);
		return NextResponse.json(
			{
				message: "Failed to provision SIP",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
