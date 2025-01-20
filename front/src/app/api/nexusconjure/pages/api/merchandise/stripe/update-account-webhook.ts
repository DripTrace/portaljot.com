import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import { serviceAccount } from "./webhook";

// Initialize Firebase Admin SDK
const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

// Stripe webhook secret
const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

// Function to update account in Firestore
const updatingAccount = async (accountUpdate: Stripe.Account) => {
    console.log("Updating account", accountUpdate);

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"] as string;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
            console.log(event);
        } catch (err) {
            console.log("ERROR", (err as Error).message);
            return res
                .status(400)
                .send(`Webhook error: ${(err as Error).message}`);
        }

        if (event.type === "capability.updated") {
            const accountUpdateEvent = event.data.object as Stripe.Capability;

            try {
                const accountUpdate = await stripe.accounts.retrieve(
                    accountUpdateEvent.account as string
                );

                await updatingAccount(accountUpdate);

                return res.status(200).json({ id: accountUpdate.id });
            } catch (err) {
                console.log("ERROR", (err as Error).message);
                return res
                    .status(400)
                    .send(`Webhook Error: ${(err as Error).message}`);
            }
        } else {
            return res.status(400).send("Unhandled event type");
        }
    } else {
        return res.status(405).send("Method Not Allowed");
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
