// app/api/stripe/payment-intent/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(request: NextRequest) {
	try {
		const { amount, currency } = await request.json();

		if (!amount || !currency) {
			return NextResponse.json(
				{ error: "Missing required parameters" },
				{ status: 400 }
			);
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
		});

		return NextResponse.json({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Stripe API Error:", error);

		return NextResponse.json(
			{ error: `Stripe API Error: ${(error as Error).message}` },
			{ status: 400 }
		);
	}
}

export async function OPTIONS() {
	// Handle preflight requests
	return NextResponse.json(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
