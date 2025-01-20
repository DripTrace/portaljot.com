// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"] as string;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                buf,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err) {
            const error = err as Error;
            res.status(400).send(`Webhook Error: ${error.message}`);
            return;
        }

        if (
            event.type === "product.created" ||
            event.type === "product.updated"
        ) {
            const product = event.data.object as Stripe.Product;
            await updateProductInDatabase(product);
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

async function updateProductInDatabase(product: Stripe.Product) {
    // Implement your database update logic here
    console.log("Updating product in database:", product.id);
}
