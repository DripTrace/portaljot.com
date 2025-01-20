import { handleWireguardView } from "@/actions/cloud/wireguard";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const wireguardData = await handleWireguardView();
		console.log("WireGuard Data: ", wireguardData);
		return NextResponse.json({ wireguard: wireguardData });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
