import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { serviceAccount } from "@/app/api/merchandise/stripe/webhook/route";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount as ServiceAccount),
	});
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE!, {
	apiVersion: "2024-12-18.acacia", // Ensure this matches your Stripe account's API version
});

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { firebaseID } = body;

		if (!firebaseID) {
			return NextResponse.json(
				{ error: "firebaseID is required." },
				{ status: 400 }
			);
		}

		// Fetch the payment ID from Firestore
		const paymentSnapshot = await admin
			.firestore()
			.collection("accessCodes")
			.doc("Payment")
			.get();

		const paymentId = paymentSnapshot.data()?.obinsunId;

		if (!paymentId) {
			throw new Error("Payment ID not found in Firestore.");
		}

		// Create a payment intent
		const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
			payment_method_types: ["card"],
			amount: 1000, // Amount in cents
			currency: "usd",
			application_fee_amount: 123, // Application fee in cents
			metadata: {
				firebaseID,
			},
		};

		const requestOptions: Stripe.RequestOptions = {
			stripeAccount: paymentId,
		};

		const paymentIntent = await stripe.paymentIntents.create(
			paymentIntentParams,
			requestOptions
		);

		return NextResponse.json(
			{ clientSecret: paymentIntent.client_secret },
			{ status: 200 }
		);
	} catch (err) {
		const error = err as Error;
		console.error("Error creating payment intent:", error.message);
		return NextResponse.json(
			{
				error: "Failed to create payment intent",
				message: error.message,
			},
			{ status: 500 }
		);
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "1mb",
		},
	},
};
