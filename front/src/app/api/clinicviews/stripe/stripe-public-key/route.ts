// app/api/stripe/publishable-key/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
		if (!publishableKey) {
			return NextResponse.json(
				{ error: "Publishable key is not set" },
				{ status: 500 }
			);
		}
		return NextResponse.json({ publishableKey });
	} catch (error) {
		console.error("Error retrieving publishable key:", error);
		return NextResponse.json(
			{
				error: `Failed to retrieve publishable key: ${(error as Error).message}`,
			},
			{ status: 500 }
		);
	}
}

export async function OPTIONS() {
	// Handle preflight requests
	return NextResponse.json(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
