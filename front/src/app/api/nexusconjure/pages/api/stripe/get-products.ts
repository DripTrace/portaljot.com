// src/pages/api/get-products.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Fetch products
        const products = await stripe.products.list();
        const prices = await stripe.prices.list();

        const productData = products.data.map((product) => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                metadata: {
                    features: product.metadata.features || "",
                },
                prices: prices.data
                    .filter((price) => price.product === product.id)
                    .map((price) => ({
                        id: price.id,
                        unit_amount: price.unit_amount || 0,
                        recurring: {
                            interval: price.recurring?.interval || "month",
                        },
                    })),
            };
        });

        res.status(200).json(productData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
}
