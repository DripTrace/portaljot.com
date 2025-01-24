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

const customerCreation = async (
	customerAccount: Stripe.Customer
): Promise<void> => {
	const app = admin.app();

	try {
		console.log("Creating customer account:", customerAccount);

		await app
			.firestore()
			.collection("users")
			.doc(customerAccount.metadata.firebaseID)
			.collection("customer")
			.doc(customerAccount.id)
			.set({
				last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
			});

		await app
			.firestore()
			.collection("users")
			.doc(customerAccount.metadata.firebaseID)
			.update({
				customerId: customerAccount.id,
			});

		console.log(
			`SUCCESS: Customer ${customerAccount.id} has been added to the DB`
		);
	} catch (error) {
		console.error("Error creating customer account:", error);
		throw new Error("Error creating customer account");
	}
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	const payload = await buffer(req).then((buf) => buf.toString());
	const sig = req.headers.get("stripe-signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		console.log(event);
	} catch (err) {
		console.error("ERROR", (err as Error).message);
		return NextResponse.json(
			{ error: `Webhook error: ${(err as Error).message}` },
			{ status: 400 }
		);
	}

	if (event.type === "customer.created") {
		const customerAccount = event.data.object as Stripe.Customer;

		console.log("Processing customer creation event:", customerAccount);

		try {
			await customerCreation(customerAccount);
			return NextResponse.json({ success: true }, { status: 200 });
		} catch (err) {
			return NextResponse.json(
				{ error: `Webhook Error: ${(err as Error).message}` },
				{ status: 500 }
			);
		}
	}

	// Handle other event types if necessary
	return NextResponse.json({ message: "Event not handled" }, { status: 200 });
}

export async function GET(): Promise<NextResponse> {
	return NextResponse.json(
		{ error: "GET method not allowed for this route." },
		{ status: 405 }
	);
}
