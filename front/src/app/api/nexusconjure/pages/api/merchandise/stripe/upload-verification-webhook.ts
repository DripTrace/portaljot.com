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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event: Stripe.Event;

        try {
            if (!sig || !endpointSecret) {
                throw new Error("Missing Stripe signature or endpoint secret.");
            }
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
            console.log(event);
        } catch (err) {
            console.error("Error:", (err as Error).message);
            return res
                .status(400)
                .send(`Webhook error: ${(err as Error).message}`);
        }

        if (event.type === "account.updated") {
            const updatePerson = event.data.object as Stripe.Account;

            try {
                const updateIndividualPerson = await stripe.accounts.retrieve(
                    updatePerson.id
                );
                console.log(updateIndividualPerson);
            } catch (err) {
                console.error(
                    "Error retrieving account:",
                    (err as Error).message
                );
                return res
                    .status(500)
                    .send(
                        `Error retrieving account: ${(err as Error).message}`
                    );
            }
        }

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
