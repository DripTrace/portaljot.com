import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { firebaseID, stripeId, date, ip } = req.body;

        if (!stripeId || !date || !ip || !firebaseID) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        await stripe.accounts.update(stripeId, {
            tos_acceptance: { date, ip },
            metadata: { firebaseID },
        });

        return res
            .status(200)
            .json({ message: "Account updated successfully." });
    } catch (error) {
        console.error("Error updating account:", (error as Error).message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
