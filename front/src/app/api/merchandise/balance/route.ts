import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function GET(req: NextRequest) {
	try {
		// Retrieve a list of connected accounts
		const connectedAccounts = await stripe.accounts.list({ limit: 3 });

		console.dir(
			{
				"account-retrieval-logger": connectedAccounts,
			},
			{
				depth: null,
				maxArrayLength: null,
				colors: true,
			}
		);

		// Respond with the list of connected accounts
		return NextResponse.json(connectedAccounts, { status: 200 });
	} catch (error: unknown) {
		if (error instanceof Stripe.errors.StripeError) {
			console.error({
				AccountRetrievalErrorMessage: error.raw.message,
			});
			console.dir(
				{
					"account-retrieval-error-logger": error,
				},
				{
					depth: null,
					maxArrayLength: null,
					colors: true,
				}
			);
			return NextResponse.json(
				{ error: error.raw.message },
				{ status: 500 }
			);
		}

		console.error("Unexpected error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred" },
			{ status: 500 }
		);
	}
}
