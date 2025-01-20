import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

const stripeWebhookHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === "POST") {
        const sig = req.headers["stripe-signature"] as string;
        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET as string
            );
        } catch (err) {
            const error = err as Error;
            console.error(
                `Webhook signature verification failed: ${error.message}`
            );
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        try {
            switch (event.type) {
                case "payment_intent.succeeded":
                    const paymentIntent = event.data
                        .object as Stripe.PaymentIntent;
                    console.log(
                        "PaymentIntent was successful!",
                        paymentIntent.id
                    );
                    // Add your business logic here
                    break;
                case "payment_intent.payment_failed":
                    const paymentFailedIntent = event.data
                        .object as Stripe.PaymentIntent;
                    console.log(
                        "PaymentIntent failed!",
                        paymentFailedIntent.id
                    );
                    // Add your business logic here
                    break;
                // Add more event types as needed
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
        } catch (err) {
            console.error(err);
            const error = err as Error;
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default stripeWebhookHandler;
