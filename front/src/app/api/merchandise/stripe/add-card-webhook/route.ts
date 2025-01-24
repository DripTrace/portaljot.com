import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { serviceAccount } from "@/app/api/merchandise/stripe/webhook/route";
import { NextRequest, NextResponse } from "next/server";

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

export const config = {
	runtime: "edge",
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const payload = await req.text(); // Extract raw body
		const sig = req.headers.get("stripe-signature");

		if (!sig) {
			console.error("Missing Stripe signature header");
			return NextResponse.json(
				{ error: "Missing Stripe signature header" },
				{ status: 400 }
			);
		}

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(
				payload,
				sig,
				endpointSecret
			);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Error verifying Stripe webhook:", err.message);
				return NextResponse.json(
					{ error: `Webhook Error: ${err.message}` },
					{ status: 400 }
				);
			} else {
				console.error("Unknown error verifying Stripe webhook");
				return NextResponse.json(
					{ error: "Unknown webhook verification error" },
					{ status: 400 }
				);
			}
		}

		console.log("Stripe event received:", event.type);

		if (event.type === "account.external_account.created") {
			const externalAccount = event.data.object as
				| Stripe.BankAccount
				| Stripe.Card;
			const accountId = event.account;

			try {
				const retrievedAccount =
					await stripe.accounts.retrieveExternalAccount(
						accountId!,
						externalAccount.id
					);

				console.log("Retrieved external account:", retrievedAccount);

				// Add additional processing logic here if needed.
			} catch (error) {
				if (error instanceof Error) {
					console.error(
						"Error retrieving external account:",
						error.message
					);
				} else {
					console.error("Unknown error retrieving external account");
				}
				return NextResponse.json(
					{ error: "Error retrieving external account" },
					{ status: 500 }
				);
			}
		}

		return NextResponse.json({ received: true }, { status: 200 });
	} catch (error) {
		console.error("Unexpected error in POST handler:", error);
		return NextResponse.json(
			{ error: "Unexpected error occurred" },
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
