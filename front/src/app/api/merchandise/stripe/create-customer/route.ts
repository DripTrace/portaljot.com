import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, stripeId } = await req.json();

		// Ensure required parameters are provided
		if (!firebaseID || !stripeId) {
			return NextResponse.json(
				{
					error: "Missing required parameters: firebaseID and stripeId",
				},
				{ status: 400 }
			);
		}

		// Create a bank account token
		const bankToken = await stripe.tokens.create({
			bank_account: {
				country: "US",
				currency: "usd",
				routing_number: "110000000",
				account_number: "000999999991",
			},
		});

		// Add the external account to the Stripe account using the token
		const addExternalAccount = await stripe.accounts.createExternalAccount(
			stripeId,
			{
				external_account: bankToken.id,
				metadata: { firebaseID },
			}
		);

		// Respond with a success message
		return NextResponse.json({
			success: true,
			externalAccount: addExternalAccount,
		});
	} catch (error: any) {
		console.error("Error adding external account:", error.message);
		return NextResponse.json(
			{ error: `Error adding external account: ${error.message}` },
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
