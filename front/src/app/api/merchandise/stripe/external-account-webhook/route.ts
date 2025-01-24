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
	try {
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
			event = stripe.webhooks.constructEvent(
				payload,
				sig,
				endpointSecret
			);
			console.log("Received Stripe event:", event.type);
		} catch (error) {
			console.error("Webhook signature verification failed:", error);
			return NextResponse.json(
				{ error: `Webhook error: ${(error as Error).message}` },
				{ status: 400 }
			);
		}

		switch (event.type) {
			case "invoice.payment_succeeded": {
				const invoice = event.data.object as Stripe.Invoice;
				const paidAt = invoice.status_transitions.paid_at
					? admin.firestore.Timestamp.fromDate(
							new Date(invoice.status_transitions.paid_at * 1000)
						)
					: null;

				await admin
					.firestore()
					.collection("invoices")
					.doc(invoice.id)
					.set({
						status: invoice.status,
						amount_paid: invoice.amount_paid,
						currency: invoice.currency,
						paid_at: paidAt,
						customer: invoice.customer,
					});

				return NextResponse.json({
					message: `Invoice ${invoice.id} payment succeeded.`,
				});
			}

			case "invoice.payment_failed": {
				const failedInvoice = event.data.object as Stripe.Invoice;

				const paymentIntent = await stripe.paymentIntents.retrieve(
					failedInvoice.payment_intent as string
				);

				const lastPaymentError =
					paymentIntent.last_payment_error?.message || "No error";

				await admin
					.firestore()
					.collection("invoices")
					.doc(failedInvoice.id)
					.set({
						status: failedInvoice.status,
						amount_due: failedInvoice.amount_due,
						currency: failedInvoice.currency,
						customer: failedInvoice.customer,
						last_payment_error: lastPaymentError,
					});

				return NextResponse.json({
					message: `Invoice ${failedInvoice.id} payment failed.`,
				});
			}

			case "account.updated": {
				const accountUpdate = event.data.object as Stripe.Account;

				if (accountUpdate.metadata?.firebaseID) {
					await admin
						.firestore()
						.collection("users")
						.doc(accountUpdate.metadata.firebaseID)
						.collection("custom_account")
						.doc(accountUpdate.id)
						.set({
							last_time_updated:
								admin.firestore.FieldValue.serverTimestamp(),
						});

					await admin
						.firestore()
						.collection("users")
						.doc(accountUpdate.metadata.firebaseID)
						.update({
							stripeId: accountUpdate.id,
						});

					console.log(
						`Account ${accountUpdate.id} has been updated in Firestore.`
					);
				} else {
					console.log(
						`Account ${accountUpdate.id} has no associated firebaseID.`
					);
				}

				return NextResponse.json({
					message: `Account ${accountUpdate.id} updated successfully.`,
				});
			}

			default:
				console.warn(`Unhandled event type: ${event.type}`);
				return NextResponse.json(
					{ message: `Unhandled event type: ${event.type}` },
					{ status: 200 }
				);
		}
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{ error: `Internal Server Error: ${(error as Error).message}` },
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
