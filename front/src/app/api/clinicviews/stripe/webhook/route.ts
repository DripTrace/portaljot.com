// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(request: NextRequest) {
	const sig = request.headers.get("stripe-signature");
	if (!sig) {
		return NextResponse.json(
			{ error: "Missing Stripe signature header" },
			{ status: 400 }
		);
	}

	let event: Stripe.Event;
	try {
		const rawBody = await request.text(); // Extract raw body for signature verification
		event = stripe.webhooks.constructEvent(
			rawBody,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET as string
		);
	} catch (err) {
		const error = err as Error;
		console.error(
			`Webhook signature verification failed: ${error.message}`
		);
		return NextResponse.json(
			{ error: `Webhook Error: ${error.message}` },
			{ status: 400 }
		);
	}

	try {
		switch (event.type) {
			case "payment_intent.succeeded": {
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.log("PaymentIntent was successful!", paymentIntent.id);
				// Add your business logic here
				break;
			}
			case "payment_intent.payment_failed": {
				const paymentFailedIntent = event.data
					.object as Stripe.PaymentIntent;
				console.log("PaymentIntent failed!", paymentFailedIntent.id);
				// Add your business logic here
				break;
			}
			// Add more event types as needed
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
	} catch (err) {
		const error = err as Error;
		console.error("Error handling webhook event:", error.message);
		return NextResponse.json(
			{ error: `Webhook Error: ${error.message}` },
			{ status: 400 }
		);
	}

	return NextResponse.json({ received: true });
}

export async function OPTIONS() {
	// Handle preflight CORS requests
	return NextResponse.json(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Stripe-Signature",
		},
	});
}
