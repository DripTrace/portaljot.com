import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, stripeId } = await req.json();

		if (!firebaseID || !stripeId) {
			return NextResponse.json(
				{ error: "Missing required fields: firebaseID or stripeId" },
				{ status: 400 }
			);
		}

		// Create a bank account token first
		const bankAccountToken = await stripe.tokens.create({
			bank_account: {
				country: "US",
				currency: "usd",
				routing_number: "110000000",
				account_number: "000999999991",
			},
		});

		// Use this token to create the external account
		const addExternalAccount = await stripe.accounts.createExternalAccount(
			stripeId,
			{
				external_account: bankAccountToken.id,
				metadata: { firebaseID },
			}
		);

		return NextResponse.json(addExternalAccount, { status: 200 });
	} catch (error: any) {
		console.error("Error adding external account:", error.message);
		return NextResponse.json(
			{ error: `Internal Server Error: ${error.message}` },
			{ status: 500 }
		);
	}
}

export async function GET(): Promise<NextResponse> {
	return NextResponse.json(
		{ error: "GET method not allowed for this route." },
		{ status: 405 }
	);
}
