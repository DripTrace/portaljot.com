import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export const config = {
	runtime: "edge",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, stripeId, date, ip } = await req.json();

		if (!firebaseID || !stripeId || !date || !ip) {
			return NextResponse.json(
				{
					error: "Missing required fields: firebaseID, stripeId, date, or ip",
				},
				{ status: 400 }
			);
		}

		const account = await stripe.accounts.create({
			country: "US",
			type: "custom",
			capabilities: {
				card_payments: { requested: true },
				transfers: { requested: true },
			},
			tos_acceptance: { date, ip },
			metadata: {
				firebaseID,
			},
		});

		return NextResponse.json(account, { status: 200 });
	} catch (error) {
		console.error("Error creating Stripe account:", error);
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
