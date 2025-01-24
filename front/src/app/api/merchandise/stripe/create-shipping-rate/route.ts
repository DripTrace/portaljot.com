import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, stripeId } = await req.json();

		if (!firebaseID || !stripeId) {
			return NextResponse.json(
				{
					error: "Missing required fields: firebaseID or stripeId",
				},
				{ status: 400 }
			);
		}

		const createTaxRate = await stripe.taxRates.create({
			display_name: "GST",
			inclusive: true,
			percentage: 9.47,
			country: "US",
			description: "GST United States",
			metadata: {
				firebaseID,
				stripeId,
			},
		});

		console.log("Tax Rate Created:", createTaxRate);

		return NextResponse.json(
			{ success: true, taxRateId: createTaxRate.id },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error creating tax rate:", error.message);
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
