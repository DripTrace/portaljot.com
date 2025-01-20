import { buffer } from "micro";
import * as admin from "firebase-admin";
import { serviceAccount } from "./stripe/webhook";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
        ),
    });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20", // Updated to match your project's version
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;

interface SessionMetadata {
    firebaseID: string;
    images: string;
}

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
    console.log("Fulfilling order", session);

    const metadata = session.metadata as Stripe.Metadata;
    const firebaseID = metadata?.firebaseID;
    const images = metadata?.images;

    if (!firebaseID || !images) {
        throw new Error("Missing required metadata");
    }

    return admin
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
        })
        .then(() => {
            console.log(
                `SUCCESS: Order ${session.id} has been added to the DB`
            );
        });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"] as string | undefined;

        let event: Stripe.Event;

        try {
            if (!sig) throw new Error("No Stripe signature found");
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
        } catch (err) {
            const error = err as Error;
            console.log("ERROR", error.message);
            return res.status(400).send(`Webhook error: ${error.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            try {
                await fulfillOrder(session);
                res.status(200).json({ received: true });
            } catch (err) {
                const error = err as Error;
                res.status(400).send(`Webhook Error: ${error.message}`);
            }
        } else {
            res.status(200).json({ received: true });
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
