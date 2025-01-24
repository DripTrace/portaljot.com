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

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		// Read the request body as a buffer
		const requestBuffer = await buffer(req.body as ReadableStream);
		const payload = requestBuffer.toString();
		const sig = req.headers.get("stripe-signature");

		// Validate Stripe signature
		if (!sig || !endpointSecret) {
			throw new Error("Missing Stripe signature or endpoint secret.");
		}

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(
				payload,
				sig,
				endpointSecret
			);
			console.log("Received Stripe Event:", event);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Error validating webhook:", err.message);
				return NextResponse.json(
					{ error: `Webhook validation failed: ${err.message}` },
					{ status: 400 }
				);
			}
			return NextResponse.json(
				{ error: "Unknown error occurred during webhook validation." },
				{ status: 400 }
			);
		}

		// Handle event type
		if (event.type === "account.updated") {
			const updatedAccount = event.data.object as Stripe.Account;

			try {
				const accountDetails = await stripe.accounts.retrieve(
					updatedAccount.id
				);
				console.log("Updated Account Details:", accountDetails);

				// Handle further processing, such as updating Firestore, if needed
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error("Error retrieving account:", err.message);
					return NextResponse.json(
						{ error: `Error retrieving account: ${err.message}` },
						{ status: 500 }
					);
				}
				return NextResponse.json(
					{
						error: "Unknown error occurred while retrieving account.",
					},
					{ status: 500 }
				);
			}
		} else {
			console.warn(`Unhandled event type: ${event.type}`);
		}

		return NextResponse.json({ received: true }, { status: 200 });
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error("Error processing webhook:", err.message);
			return NextResponse.json(
				{ error: `Error processing webhook: ${err.message}` },
				{ status: 500 }
			);
		}
		return NextResponse.json(
			{ error: "Unknown error occurred while processing webhook." },
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
	api: {
		bodyParser: false,
	},
};
