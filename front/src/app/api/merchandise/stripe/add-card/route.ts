import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export const config = {
	runtime: "edge",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, stripeId } = await req.json();

		if (!firebaseID || !stripeId) {
			return NextResponse.json(
				{ error: "Missing required fields: firebaseID or stripeId" },
				{ status: 400 }
			);
		}

		const card = await stripe.accounts.createExternalAccount(stripeId, {
			external_account: {
				object: "card",
				number: "4000056655665556",
				currency: "usd",
			} as Stripe.AccountCreateExternalAccountParams.Card,
			metadata: { firebaseID },
		});

		console.log("External card account created:", card);

		return NextResponse.json(card, { status: 200 });
	} catch (error) {
		console.error("Error creating external card account:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";

		return NextResponse.json(
			{ error: `Internal Server Error: ${errorMessage}` },
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
