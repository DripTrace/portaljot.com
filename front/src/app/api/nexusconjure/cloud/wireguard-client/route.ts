import { NextRequest, NextResponse } from "next/server";
import {
	bringDownWireGuard,
	bringUpWireGuard,
} from "@/utils/cloud/wireguardUtils";

export async function POST(req: NextRequest) {
	try {
		await bringUpWireGuard();
		return NextResponse.json(
			{
				message: "WireGuard interface brought up successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error bringing up WireGuard:", error);
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		await bringDownWireGuard();
		return NextResponse.json(
			{
				message: "WireGuard interface brought down successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error bringing down WireGuard:", error);
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 }
		);
	}
}

export async function PUT(req: NextRequest) {
	return NextResponse.json(
		{ error: "Method PUT not supported." },
		{ status: 405 }
	);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
