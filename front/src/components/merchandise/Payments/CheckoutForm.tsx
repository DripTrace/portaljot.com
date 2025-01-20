"use client";

import { useEffect, useState, FormEvent } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import {
    Stripe,
    StripeElements,
    PaymentIntent,
    PaymentIntentResult,
} from "@stripe/stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe() as Stripe | null;
    const elements = useElements() as StripeElements | null;

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe
            .retrievePaymentIntent(clientSecret)
            .then((result: PaymentIntentResult) => {
                if (result.paymentIntent) {
                    switch (result.paymentIntent.status) {
                        case "succeeded":
                            setMessage("Payment succeeded!");
                            break;
                        case "processing":
                            setMessage("Your payment is processing.");
                            break;
                        case "requires_payment_method":
                            setMessage(
                                "Your payment was not successful, please try again."
                            );
                            break;
                        default:
                            setMessage("Something went wrong.");
                            break;
                    }
                } else if (result.error) {
                    setMessage(
                        result.error.message || "An unexpected error occurred."
                    );
                }
            });
    }, [stripe]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.MERCH_URL}/success`,
            },
        });

        if (
            error &&
            (error.type === "card_error" || error.type === "validation_error")
        ) {
            setMessage(error.message || "An error occurred");
        } else if (error) {
            console.log(error);
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Pay now"
                    )}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
