import { buffer } from "micro";
import * as admin from "firebase-admin";
import { serviceAccount } from "./webhook";
import { NextApiRequest, NextApiResponse } from "next";
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sig!,
                endpointSecret
            );
            console.log("Received event:", event.id);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log("ERROR", err.message);
                return res.status(400).send(`Webhook error: ${err.message}`);
            }
            return res
                .status(400)
                .send("Webhook error: Unknown error occurred.");
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log(
                    `PaymentIntent for ${paymentIntent.amount} was successful!`
                );
                // Handle successful payment here (e.g., update your database, fulfill an order, etc.)
                break;

            case "payment_intent.payment_failed":
                const paymentFailedIntent = event.data
                    .object as Stripe.PaymentIntent;
                console.log(
                    `PaymentIntent for ${paymentFailedIntent.amount} failed.`
                );
                // Handle failed payment here
                break;

            case "customer.subscription.created":
                const subscription = event.data.object as Stripe.Subscription;
                console.log(
                    `Subscription created for customer ${subscription.customer}`
                );
                // Handle subscription creation here
                break;

            case "customer.subscription.updated":
                const updatedSubscription = event.data
                    .object as Stripe.Subscription;
                console.log(
                    `Subscription updated for customer ${updatedSubscription.customer}`
                );
                // Handle subscription update here
                break;

            case "customer.subscription.deleted":
                const deletedSubscription = event.data
                    .object as Stripe.Subscription;
                console.log(
                    `Subscription deleted for customer ${deletedSubscription.customer}`
                );
                // Handle subscription deletion here
                break;

            case "account.updated":
                const accountUpdated = event.data.object as Stripe.Account;
                console.log(`Account updated: ${accountUpdated.id}`);
                // Handle account update here, possibly update your database
                break;

            case "invoice.payment_succeeded":
                const invoice = event.data.object as Stripe.Invoice;
                console.log(
                    `Invoice payment succeeded for ${invoice.customer}`
                );
                // Handle successful invoice payment here
                break;

            case "invoice.payment_failed":
                const failedInvoice = event.data.object as Stripe.Invoice;
                console.log(
                    `Invoice payment failed for ${failedInvoice.customer}`
                );
                // Handle failed invoice payment here
                break;

            default:
                console.warn(`Unhandled event type ${event.type}`);
                break;
        }

        // Return a 200 response to acknowledge receipt of the event
        res.status(200).json({ received: true });
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
