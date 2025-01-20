import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with the correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { firebaseID, stripeId } = req.body;

        // Ensure required parameters are provided
        if (!firebaseID || !stripeId) {
            return res
                .status(400)
                .json({ error: "Missing required parameters" });
        }

        // Create a bank account token
        const bankToken = await stripe.tokens.create({
            bank_account: {
                country: "US",
                currency: "usd",
                routing_number: "110000000",
                account_number: "000999999991",
            },
        });

        // Add the external account to the Stripe account using the token
        const addExternalAccount = await stripe.accounts.createExternalAccount(
            stripeId,
            {
                external_account: bankToken.id, // Use the token ID here
                metadata: { firebaseID },
            }
        );

        // Respond with a success message
        res.status(200).json({
            success: true,
            externalAccount: addExternalAccount,
        });
    } catch (error: any) {
        console.error("Error adding external account:", error);
        res.status(500).json({ error: error.message });
    }
};
