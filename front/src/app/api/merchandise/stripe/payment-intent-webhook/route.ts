import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { serviceAccount } from "@/config/firebase/serviceAccount";
import { NextRequest, NextResponse } from "next/server";

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
		switch (event.type) {
			case "payment_intent.succeeded":
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.log(
					`PaymentIntent for ${paymentIntent.amount} was successful.`
				);
				// Handle successful payment here
				break;

			case "payment_intent.payment_failed":
				const failedPaymentIntent = event.data
					.object as Stripe.PaymentIntent;
				console.log(
					`PaymentIntent for ${failedPaymentIntent.amount} failed.`
				);
				// Handle failed payment here
				break;

			case "customer.subscription.created":
				const newSubscription = event.data
					.object as Stripe.Subscription;
				console.log(
					`Subscription created for customer ${newSubscription.customer}.`
				);
				// Handle subscription creation here
				break;

			case "customer.subscription.updated":
				const updatedSubscription = event.data
					.object as Stripe.Subscription;
				console.log(
					`Subscription updated for customer ${updatedSubscription.customer}.`
				);
				// Handle subscription update here
				break;

			case "customer.subscription.deleted":
				const deletedSubscription = event.data
					.object as Stripe.Subscription;
				console.log(
					`Subscription deleted for customer ${deletedSubscription.customer}.`
				);
				// Handle subscription deletion here
				break;

			case "account.updated":
				const account = event.data.object as Stripe.Account;
				console.log(`Account updated: ${account.id}.`);
				// Handle account update here
				break;

			case "invoice.payment_succeeded":
				const invoiceSucceeded = event.data.object as Stripe.Invoice;
				console.log(
					`Invoice payment succeeded for ${invoiceSucceeded.customer}.`
				);
				// Handle successful invoice payment here
				break;

			case "invoice.payment_failed":
				const failedInvoice = event.data.object as Stripe.Invoice;
				console.log(
					`Invoice payment failed for ${failedInvoice.customer}.`
				);
				// Handle failed invoice payment here
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
