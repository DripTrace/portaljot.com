import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { firebaseID, stripeId } = req.body;

        if (!firebaseID || !stripeId) {
            return res
                .status(400)
                .json({
                    error: "Missing required fields: firebaseID or stripeId",
                });
        }

        const createTaxRate = await stripe.taxRates.create({
            display_name: "GST",
            inclusive: true,
            percentage: 9.47,
            country: "US",
            description: "GST United States",
            metadata: {
                firebaseID,
                stripeId,
            },
        });

        console.log("Tax Rate Created:", createTaxRate);

        res.status(200).json({ success: true, taxRateId: createTaxRate.id });
    } catch (error: any) {
        console.error("Error creating tax rate:", error);
        res.status(500).json({ error: error.message });
    }
};
