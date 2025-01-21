// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/client/prisma"; // if you need to store data in your DB

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_EXOTALK as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
	try {
		const { userId, priceId, successUrl, cancelUrl, mode } =
			await req.json();

		// 1) Optionally, store something in your DB with Prisma
		//    e.g., prisma.checkoutSession.create(...) if you want to track the session creation

		// 2) Create a Checkout Session via Stripe
		const session = await stripe.checkout.sessions.create({
			customer: undefined, // If you have a Stripe customer ID, pass it here
			line_items: [{ price: priceId, quantity: 1 }],
			mode: mode || "subscription",
			success_url: successUrl,
			cancel_url: cancelUrl,
		});

		// 3) Return the session URL
		return NextResponse.json({ url: session.url });
	} catch (error: any) {
		console.error("Error creating Stripe checkout session:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to create session" },
			{ status: 500 }
		);
	}
}
