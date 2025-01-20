import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
    }
    return stripePromise;
};

export const fetchPublishableKey = async (): Promise<string> => {
    const response = await fetch("/api/stripe-public-key");
    const { publishableKey } = await response.json();
    return publishableKey;
};

export const createPaymentIntent = async (
    amount: number,
    currency: string
): Promise<string> => {
    const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency }),
    });
    const { clientSecret } = await response.json();
    return clientSecret;
};
