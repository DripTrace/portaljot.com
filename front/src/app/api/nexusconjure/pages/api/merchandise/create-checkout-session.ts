import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20", // Make sure this matches your Stripe account's API version
});

interface RequestItem {
    description: string;
    price: number;
    image: string;
    name: string;
}

interface RequestBody {
    items: RequestItem[];
    firebaseID: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { items, firebaseID } = req.body as RequestBody;

        const transformedItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
            items.map((item) => ({
                price_data: {
                    currency: "usd",
                    unit_amount: Math.round(item.price * 100),
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: [item.image],
                    },
                },
                quantity: 1,
            }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["GB", "US", "CA"],
            },
            line_items: transformedItems,
            mode: "payment",
            success_url: `${process.env.MERCH_URL}/success`,
            cancel_url: `${process.env.MERCH_URL}/checkout`,
            metadata: {
                firebaseID,
                images: JSON.stringify(items.map((item) => item.image)),
            },
            shipping_options: [
                {
                    shipping_rate: "shr_1KJrdeHgBISqeUGdzitDzzIN",
                },
            ],
        } as Stripe.Checkout.SessionCreateParams);

        res.status(200).json({ id: session.id });
    } catch (err) {
        const error = err as Error;
        console.error("Error creating checkout session:", error);
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "1mb",
        },
    },
};
