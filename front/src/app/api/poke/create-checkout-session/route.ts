import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_POKE!, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(request: Request) {
	try {
		const { priceId } = await request.json();

		if (!priceId) {
			return NextResponse.json(
				{ error: "Missing required parameter: priceId" },
				{ status: 400 }
			);
		}

		// Create a new Stripe Checkout Session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL_POKE}/poke/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL_POKE}/poke/cancel`,
		});

		return NextResponse.json({ url: session.url });
	} catch (error: unknown) {
		// Changed from 'any' to 'unknown'
		console.error("Error creating checkout session:", error);
		return NextResponse.json(
			{
				error:
					(error as Error).message ||
					"Failed to create checkout session",
			},
			{ status: 500 }
		);
	}
}
