// app/api/register-call/route.ts

import { NextRequest, NextResponse } from "next/server";
import Softphone from "@/utils/clinicviews/ref/soft/src/softphone";

let softphone: Softphone | null = null;
let lastIncomingCall: { callerNumber: string } | null = null;

export async function GET(req: NextRequest) {
	if (!softphone) {
		const sipInfo = {
			username: process.env.SIP_INFO_USERNAME!,
			password: process.env.SIP_INFO_PASSWORD!,
			authorizationId: process.env.SIP_INFO_AUTHORIZATION_ID!,
			domain: process.env.SIP_INFO_DOMAIN!,
		};

		softphone = new Softphone(sipInfo);
		softphone.enableDebugMode();
		await softphone.register();

		softphone.on("invite", (inviteMessage: any) => {
			console.log("Incoming call detected", inviteMessage);
			const callerNumber =
				inviteMessage.headers.From.match(/<sip:(.+?)@/)?.[1];
			if (callerNumber) {
				lastIncomingCall = { callerNumber };
			}
		});
	}

	if (lastIncomingCall) {
		const response = { ...lastIncomingCall };
		lastIncomingCall = null;
		return NextResponse.json(response, { status: 200 });
	} else {
		return NextResponse.json({ callerNumber: null }, { status: 200 });
	}
}
