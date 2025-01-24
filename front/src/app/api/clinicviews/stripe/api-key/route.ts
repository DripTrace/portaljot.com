// app/api/stripe/api-key/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function GET() {
	try {
		// This is a placeholder response indicating the API key is correctly loaded.
		return NextResponse.json({ message: "API Key received" });
	} catch (error) {
		console.error("Stripe API Key Error:", error);
		return NextResponse.json(
			{ error: `API Key Error: ${(error as Error).message}` },
			{ status: 400 }
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
