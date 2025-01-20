import { buffer } from "micro";
import * as admin from "firebase-admin";
import { serviceAccount } from "./webhook";
import Stripe from "stripe";

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2024-06-20",
});

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

export default async (req: any, res: any) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
            console.log(event);
        } catch (err: any) {
            console.log("ERROR", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        // Handle the event
        switch (event.type) {
            case "invoice.payment_succeeded":
                const invoice = event.data.object as Stripe.Invoice;
                const paidAt = invoice.status_transitions.paid_at
                    ? admin.firestore.Timestamp.fromDate(
                          new Date(invoice.status_transitions.paid_at * 1000)
                      )
                    : null;

                await app
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

                return res
                    .status(200)
                    .send(`Invoice ${invoice.id} payment succeeded.`);

            case "invoice.payment_failed":
                const failedInvoice = event.data.object as Stripe.Invoice;

                // Retrieve the PaymentIntent to access `last_payment_error`
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    failedInvoice.payment_intent as string
                );

                const lastPaymentError =
                    paymentIntent.last_payment_error?.message ?? "No error";

                await app
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

                return res
                    .status(200)
                    .send(`Invoice ${failedInvoice.id} payment failed.`);

            case "account.updated":
                const accountUpdate = event.data.object as Stripe.Account;

                if (accountUpdate.metadata?.firebaseID) {
                    await app
                        .firestore()
                        .collection("users")
                        .doc(accountUpdate.metadata.firebaseID)
                        .collection("custom_account")
                        .doc(accountUpdate.id)
                        .set({
                            last_time_updated:
                                admin.firestore.FieldValue.serverTimestamp(),
                        });

                    await app
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

                return res
                    .status(200)
                    .send(`Account ${accountUpdate.id} updated successfully.`);

            default:
                console.log(`Unhandled event type ${event.type}`);
                return res.status(400).end();
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
