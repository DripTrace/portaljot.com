import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { serviceAccount } from "@/config/firebase/serviceAccount";

// Initialize Firebase Admin SDK
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
	: admin.app();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

// Stripe webhook secret
const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

// Function to update account in Firestore
const updatingAccount = async (accountUpdate: Stripe.Account) => {
	console.log("Updating account:", accountUpdate);

	if (!accountUpdate.metadata || !accountUpdate.metadata.firebaseID) {
		throw new Error("Firebase ID is missing from account metadata.");
	}

	const firestore = app.firestore();

	await firestore
		.collection("users")
		.doc(accountUpdate.metadata.firebaseID)
		.collection("custom_account")
		.doc(accountUpdate.id)
		.set({
			last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
		});

	await firestore
		.collection("users")
		.doc(accountUpdate.metadata.firebaseID)
		.update({
			stripeId: accountUpdate.id,
		});

	console.log(
		`SUCCESS: Account ${accountUpdate.id} has been updated in the DB`
	);
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const payload = await buffer(req.body);
		const sig = req.headers.get("stripe-signature");

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(
				payload.toString(),
				sig!,
				endpointSecret
			);
			console.log("Received event:", event);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(
					"Webhook signature verification failed:",
					err.message
				);
				return NextResponse.json(
					{ error: `Webhook error: ${err.message}` },
					{ status: 400 }
				);
			}
			return NextResponse.json(
				{ error: "Webhook error: Unknown error occurred." },
				{ status: 400 }
			);
		}

		// Handle the `capability.updated` event
		if (event.type === "capability.updated") {
			const accountUpdateEvent = event.data.object as Stripe.Capability;

			try {
				const accountUpdate = await stripe.accounts.retrieve(
					accountUpdateEvent.account as string
				);

				await updatingAccount(accountUpdate);

				return NextResponse.json(
					{ id: accountUpdate.id },
					{ status: 200 }
				);
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(
						"Error processing capability.updated:",
						err.message
					);
					return NextResponse.json(
						{ error: `Webhook error: ${err.message}` },
						{ status: 400 }
					);
				}
				return NextResponse.json(
					{ error: "Unhandled error while updating account." },
					{ status: 400 }
				);
			}
		} else {
			console.warn("Unhandled event type:", event.type);
			return NextResponse.json(
				{ error: "Unhandled event type" },
				{ status: 400 }
			);
		}
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error("Error processing request:", err.message);
			return NextResponse.json(
				{ error: `Internal server error: ${err.message}` },
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
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
