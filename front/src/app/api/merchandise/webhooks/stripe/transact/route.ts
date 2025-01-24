import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import util from "util";
import { serviceAccount } from "../../stripe/webhook";

// Initialize Firebase Admin SDK
const firebaseAdmin = !admin.apps.length
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

// Function to fulfill capability updates
const fulfillCapabilityUpdate = async (capabilityUpdate: Stripe.Capability) => {
	const customAccount = await stripe.accounts.retrieve(
		capabilityUpdate.account as string
	);

	await firebaseAdmin
		.firestore()
		.collection("users")
		.doc(customAccount.metadata?.transactId as string)
		.update({
			stripeId: customAccount.id,
			last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
			neccessary_actions: customAccount.requirements,
			verification: customAccount.individual?.verification,
			personal_info: {
				dob: customAccount.individual?.dob,
				phone: customAccount.individual?.phone,
				ssnLast4: customAccount.individual?.ssn_last_4_provided,
			},
		});

	console.log(
		`SUCCESS: Account ${customAccount.id} capability updated in Firestore`
	);
};

// Function to fulfill account updates
const fulfillAccountUpdate = async (accountUpdate: Stripe.Account) => {
	const customAccountUpdate = await stripe.accounts.retrieve(
		accountUpdate.id
	);

	await firebaseAdmin
		.firestore()
		.collection("users")
		.doc(customAccountUpdate.metadata?.transactId as string)
		.update({
			last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
			neccessary_actions: customAccountUpdate.requirements,
			individualVerification:
				customAccountUpdate.individual?.verification,
			companyVerification: customAccountUpdate.company?.verification,
			external_accounts: customAccountUpdate.external_accounts,
			stripe_metadata: customAccountUpdate.metadata,
		});

	console.log(
		`SUCCESS: Account ${customAccountUpdate.id} updated in Firestore`
	);
};

// Function to fulfill external account creation
const fulfillExternalAccountCreation = async (
	externalAccountCreation: Stripe.BankAccount | Stripe.Card
) => {
	const customExternalAccountUpdate = await stripe.accounts.retrieve(
		externalAccountCreation.account as string
	);

	await firebaseAdmin
		.firestore()
		.collection("users")
		.doc(customExternalAccountUpdate.metadata?.transactId as string)
		.update({
			last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
			neccessary_actions: customExternalAccountUpdate.requirements,
			verification: customExternalAccountUpdate.individual?.verification,
			external_accounts: customExternalAccountUpdate.external_accounts,
		});

	console.log(
		`SUCCESS: Account ${customExternalAccountUpdate.id} external account updated`
	);
};

// Function to fulfill customer creation
const fulfillCustomerCreation = async (customerCreation: Stripe.Customer) => {
	await firebaseAdmin
		.firestore()
		.collection("users")
		.doc(customerCreation.metadata?.username as string)
		.update({
			customerId: customerCreation.id,
		});

	console.log(`SUCCESS: Customer ${customerCreation.id} added to Firestore`);
};

// Function to fulfill customer updates
const fulfillCustomerUpdate = async (customerUpdate: Stripe.Customer) => {
	await firebaseAdmin
		.firestore()
		.collection("users")
		.doc(customerUpdate.metadata?.username as string)
		.update({
			shipping: customerUpdate.shipping,
		});

	console.log(
		`SUCCESS: Customer ${customerUpdate.id} shipping address updated`
	);
};

export async function POST(req: NextRequest) {
	const requestBuffer = await buffer(req.body);
	const payload = requestBuffer.toString();
	const sig = req.headers.get("stripe-signature");

	let event: Stripe.Event;

	try {
		if (!sig) {
			throw new Error("No Stripe signature found");
		}

		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
	} catch (err) {
		console.error("Error verifying Stripe webhook:", err);
		return NextResponse.json(
			{ error: `Webhook error: ${(err as Error).message}` },
			{ status: 400 }
		);
	}

	console.log({
		"event-logger": util.inspect(event, { maxArrayLength: null }),
	});

	try {
		switch (event.type) {
			case "account.updated":
				await fulfillAccountUpdate(event.data.object as Stripe.Account);
				break;
			case "account.external_account.created":
				await fulfillExternalAccountCreation(
					event.data.object as Stripe.BankAccount | Stripe.Card
				);
				break;
			case "capability.updated":
				await fulfillCapabilityUpdate(
					event.data.object as Stripe.Capability
				);
				break;
			case "customer.created":
				await fulfillCustomerCreation(
					event.data.object as Stripe.Customer
				);
				break;
			case "customer.updated":
				await fulfillCustomerUpdate(
					event.data.object as Stripe.Customer
				);
				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
		return NextResponse.json({ received: true });
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{ error: "Failed to process webhook" },
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
