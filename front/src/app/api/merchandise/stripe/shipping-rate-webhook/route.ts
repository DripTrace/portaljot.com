import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { serviceAccount } from "@/config/firebase/serviceAccount";

// Initialize Firebase Admin
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

export async function POST(req: NextRequest): Promise<NextResponse> {
	const requestBuffer = await buffer(req.body as any);
	const payload = requestBuffer.toString();
	const sig = req.headers.get("stripe-signature");

	if (!sig) {
		return NextResponse.json(
			{ error: "Missing Stripe signature" },
			{ status: 400 }
		);
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		console.log("Received Stripe event:", event.type);
	} catch (error) {
		console.error("Webhook signature verification failed:", error);
		return NextResponse.json(
			{ error: `Webhook error: ${(error as Error).message}` },
			{ status: 400 }
		);
	}

	try {
		// Handle the event
		switch (event.type) {
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.log(
					`PaymentIntent for ${paymentIntent.amount} was successful.`
				);
				// Add business logic here
				break;

			case "payment_intent.payment_failed":
				const failedPaymentIntent = event.data
					.object as Stripe.PaymentIntent;
				console.log(
					`PaymentIntent for ${failedPaymentIntent.amount} failed.`
				);
				// Add business logic here
				break;

			default:
				console.warn(`Unhandled event type: ${event.type}`);
				break;
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		console.error("Error processing webhook event:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
