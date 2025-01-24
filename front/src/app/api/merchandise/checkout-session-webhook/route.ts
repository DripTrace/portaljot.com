import { buffer } from "micro";
import * as admin from "firebase-admin";
import { serviceAccount } from "@/app/api/merchandise/stripe/webhook/route";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(
			serviceAccount as admin.ServiceAccount
		),
	});
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE!, {
	apiVersion: "2024-12-18.acacia", // Updated to your Stripe version
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
	console.log("Fulfilling order", session);

	const metadata = session.metadata as Stripe.Metadata;
	const firebaseID = metadata?.firebaseID;
	const images = metadata?.images;

	if (!firebaseID || !images) {
		throw new Error("Missing required metadata");
	}

	await admin
		.firestore()
		.collection("users")
		.doc(firebaseID)
		.collection("orders")
		.doc(session.id)
		.set({
			amount: (session.amount_total ?? 0) / 100,
			amount_shipping:
				(session.total_details?.amount_shipping ?? 0) / 100,
			images: JSON.parse(images),
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		});

	console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
};

export async function POST(req: NextRequest) {
	const requestBuffer = await buffer(req.body);
	const payload = requestBuffer.toString();
	const sig = req.headers.get("stripe-signature");

	let event: Stripe.Event;

	try {
		if (!sig) throw new Error("No Stripe signature found");
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
	} catch (err) {
		const error = err as Error;
		console.error("ERROR", error.message);
		return NextResponse.json(
			{ error: `Webhook error: ${error.message}` },
			{ status: 400 }
		);
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;

		try {
			await fulfillOrder(session);
			return NextResponse.json({ received: true }, { status: 200 });
		} catch (err) {
			const error = err as Error;
			console.error("ERROR", error.message);
			return NextResponse.json(
				{ error: `Webhook Error: ${error.message}` },
				{ status: 400 }
			);
		}
	}

	return NextResponse.json({ received: true }, { status: 200 });
}

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
