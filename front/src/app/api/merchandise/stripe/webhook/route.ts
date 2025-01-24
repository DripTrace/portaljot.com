import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import * as admin from "firebase-admin";
import { serviceAccount } from "@/config/firebase/serviceAccount";

// Initialize Firebase Admin SDK
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
	: admin.app();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

// Function to handle account updates in Firestore
const fulfillAccountCreation = async (stripeAccount: Stripe.Account) => {
	if (!stripeAccount.metadata?.firebaseID) {
		throw new Error("Missing Firebase ID in account metadata.");
	}

	const firestore = app.firestore();

	await firestore
		.collection("users")
		.doc(stripeAccount.metadata.firebaseID)
		.collection("custom_account")
		.doc(stripeAccount.id)
		.set({
			last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
		});

	await firestore
		.collection("users")
		.doc(stripeAccount.metadata.firebaseID)
		.update({
			stripeId: stripeAccount.id,
			personId: stripeAccount.individual?.id || null,
		});

	console.log(
		`SUCCESS: Account ${stripeAccount.id} has been updated in Firestore.`
	);
};

export default async function handler(req: NextRequest, res: NextResponse) {
	if (req.method !== "POST") {
		res.headers.set("Allow", "POST");
		return res.status(405).text("Method Not Allowed");
	}

	const payload = await req.text(); // Extract raw body directly
	const sig = req.headers.get("stripe-signature");

	let event: Stripe.Event;

	try {
		if (!sig || !endpointSecret) {
			throw new Error("Missing Stripe signature or endpoint secret.");
		}

		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		console.log("Webhook event received:", event.type);
	} catch (err) {
		console.error("Error verifying webhook:", (err as Error).message);
		return res.status(400).text(`Webhook error: ${(err as Error).message}`);
	}

	try {
		switch (event.type) {
			case "capability.updated": {
				const account = event.data.object as Stripe.Account;
				await fulfillAccountCreation(account);
				return res.status(200).text("Account successfully updated.");
			}
			case "person.created":
				console.log("Person created event received.");
				return res.status(200).text("Person created.");
			case "person.updated":
				console.log("Person updated event received.");
				return res.status(200).text("Person updated.");
			case "account.updated":
				console.log("Account updated event received.");
				return res.status(200).text("Account updated.");
			default:
				console.warn(`Unhandled event type: ${event.type}`);
				return res.status(200).text("Event not handled.");
		}
	} catch (err) {
		console.error("Error handling webhook event:", (err as Error).message);
		return res
			.status(500)
			.text(`Internal Server Error: ${(err as Error).message}`);
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
