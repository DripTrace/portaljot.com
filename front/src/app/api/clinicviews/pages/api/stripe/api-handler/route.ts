import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

const stripeApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const { amount, currency } = req.body;

            if (!amount || !currency) {
                return res
                    .status(400)
                    .json({ error: "Missing required parameters" });
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
            });

            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (err) {
            console.error(err);
            const error = err as Error;
            return res
                .status(400)
                .json({ error: `Stripe API Error: ${error.message}` });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default stripeApiHandler;
