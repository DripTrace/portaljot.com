import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    try {
        const { firebaseID, stripeId } = req.body;

        if (!firebaseID || !stripeId) {
            return res
                .status(400)
                .json({
                    error: "Missing required fields: firebaseID or stripeId",
                });
        }

        // Create a bank account token first
        const bankAccountToken = await stripe.tokens.create({
            bank_account: {
                country: "US",
                currency: "usd",
                routing_number: "110000000",
                account_number: "000999999991",
            },
        });

        // Then use this token to create the external account
        const addExternalAccount = await stripe.accounts.createExternalAccount(
            stripeId,
            {
                external_account: bankAccountToken.id, // Use the token ID here
                metadata: { firebaseID },
            }
        );

        res.status(200).json(addExternalAccount);
    } catch (error) {
        console.error("Error adding external account:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
