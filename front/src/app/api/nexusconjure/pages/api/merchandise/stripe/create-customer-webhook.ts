import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { serviceAccount } from "./webhook";

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

const customerCreation = async (
    customerAccount: Stripe.Customer
): Promise<void> => {
    const app = admin.app(); // Using admin.app() to get the current app instance

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

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
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
            console.error("ERROR", (err as Error).message);
            return res
                .status(400)
                .send(`Webhook error: ${(err as Error).message}`);
        }

        if (event.type === "customer.created") {
            const customerAccount = event.data.object as Stripe.Customer;

            console.log("Processing customer creation event:", customerAccount);

            try {
                await customerCreation(customerAccount);
                res.status(200).json({ success: true });
            } catch (err) {
                res.status(500).send(
                    `Webhook Error: ${(err as Error).message}`
                );
            }
            return;
        }

        // Handle other event types if necessary
        res.status(200).send("Event not handled");
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
