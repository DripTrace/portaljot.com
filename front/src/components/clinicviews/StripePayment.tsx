"use client";

import React, { useState, FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: 1000, currency: "usd" }), // $10.00 in cents
        });

        const { clientSecret } = await response.json();

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (result.error) {
                setError(result.error.message || "An error occurred");
            } else {
                // Payment succeeded
                console.log("Payment succeeded:", result.paymentIntent);
            }
        } else {
            setError("Card element not found");
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={!stripe || processing}>Pay</button>
            {error && <div>{error}</div>}
        </form>
    );
};

const StripePaymentComponent: React.FC = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default StripePaymentComponent;
