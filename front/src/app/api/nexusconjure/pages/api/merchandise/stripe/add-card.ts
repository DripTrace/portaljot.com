import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

interface RequestBody {
    firebaseID: string;
    stripeId: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const { firebaseID, stripeId }: RequestBody = req.body;

        const card = await stripe.accounts.createExternalAccount(stripeId, {
            external_account: {
                object: "card",
                number: "4000056655665556",
                currency: "usd",
            } as Stripe.AccountCreateExternalAccountParams.Card,
            metadata: { firebaseID },
        });

        console.log(card);

        res.status(200).json(card);
    } catch (error) {
        console.error("Error creating external card account:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
