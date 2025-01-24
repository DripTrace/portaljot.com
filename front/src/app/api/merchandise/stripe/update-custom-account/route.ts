import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, stripeId, date, ip } = await req.json();

		// Validate required fields
		if (!stripeId || !date || !ip || !firebaseID) {
			return NextResponse.json(
				{
					error: "Missing required fields: firebaseID, stripeId, date, or ip.",
				},
				{ status: 400 }
			);
		}

		// Update the Stripe account
		await stripe.accounts.update(stripeId, {
			tos_acceptance: { date, ip },
			metadata: { firebaseID },
		});

		// Return success response
		return NextResponse.json(
			{ message: "Account updated successfully." },
			{ status: 200 }
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Error updating account:", error.message);
			return NextResponse.json(
				{ error: `Internal Server Error: ${error.message}` },
				{ status: 500 }
			);
		}
		return NextResponse.json(
			{ error: "An unknown error occurred." },
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
};
