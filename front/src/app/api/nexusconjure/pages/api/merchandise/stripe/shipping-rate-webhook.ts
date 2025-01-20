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
            console.log(event);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log("ERROR", err.message);
                return res.status(400).send(`Webhook error: ${err.message}`);
            }
            return res
                .status(400)
                .send("Webhook error: Unknown error occurred.");
        }

        // Handle the event as needed
        // e.g., if (event.type === 'payment_intent.succeeded') { ... }

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
