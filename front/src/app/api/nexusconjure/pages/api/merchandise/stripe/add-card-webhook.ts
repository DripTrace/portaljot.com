import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { serviceAccount } from "./webhook";
import type { NextApiRequest, NextApiResponse } from "next";

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

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
        } catch (err) {
            if (err instanceof Error) {
                console.log("ERROR", err.message);
                return res.status(400).send(`Webhook error: ${err.message}`);
            } else {
                console.log("ERROR", "An unknown error occurred");
                return res
                    .status(400)
                    .send("Webhook error: An unknown error occurred");
            }
        }

        if (event.type === "account.external_account.created") {
            const addExternalAccountEvent = event.data.object as
                | Stripe.BankAccount
                | Stripe.Card;
            const accountId = event.account as string;

            try {
                const addExternalAccount =
                    await stripe.accounts.retrieveExternalAccount(
                        accountId,
                        addExternalAccountEvent.id
                    );

                console.log(addExternalAccount);

                // You can add any additional logic here, such as updating Firestore or other processing.
            } catch (error) {
                if (error instanceof Error) {
                    console.error(
                        "Error retrieving external account:",
                        error.message
                    );
                } else {
                    console.error(
                        "An unknown error occurred while retrieving the external account"
                    );
                }
                return res.status(500).send("Internal Server Error");
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
