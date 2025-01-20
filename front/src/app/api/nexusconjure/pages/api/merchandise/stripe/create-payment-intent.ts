import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripeApi = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

// Define the expected structure of items
interface OrderItem {
    id: string;
    quantity: number;
    price: number; // You can adjust this depending on how your price is represented
}

const calculateOrderAmount = (items: OrderItem[]): number => {
    // Example calculation, replace with your logic
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { items } = req.body as { items: OrderItem[] };

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No items provided" });
        }

        const amount = calculateOrderAmount(items);

        const paymentIntent = await stripeApi.paymentIntents.create({
            amount,
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
};
