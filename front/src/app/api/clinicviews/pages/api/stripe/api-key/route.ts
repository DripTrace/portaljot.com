import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe_key = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

const stripeApiKeyHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === "GET") {
        //

        try {
            res.status(200).json({ message: "API Key received" });
        } catch (err) {
            console.error(err);
            const error = err as Error;
            return res.status(400).send(`API Key Error: ${error.message}`);
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
