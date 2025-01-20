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
        const { firebaseID, stripeId, date, ip } = req.body;

        if (!firebaseID || !stripeId || !date || !ip) {
            return res
                .status(400)
                .json({
                    error: "Missing required fields: firebaseID, stripeId, date, or ip",
                });
        }

        const account = await stripe.accounts.create({
            country: "US",
            type: "custom",
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            tos_acceptance: { date, ip },
            metadata: {
                firebaseID,
            },
        });

        res.status(200).json(account);
    } catch (error) {
        console.error("Error creating Stripe account:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
