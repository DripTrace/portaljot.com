"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ContentComponent from "@/components/merchandise/ContentComponent";
import CheckoutForm from "@/components/merchandise/Payments/CheckoutForm";

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

export default function Payments() {
    const [clientSecret, setClientSecret] = useState<string>("");

    const personTokenCreation = async () => {
        const stripeResolver = await stripePromise;

        if (stripeResolver) {
            const result = await stripeResolver.createToken("person", {
                first_name: "Jane",
                last_name: "Doe",
                relationship: { owner: true },
            });

            if (result?.token) {
                console.log(result.token);
            } else if (result?.error) {
                console.error(result.error.message);
            }
        } else {
            console.error("Stripe could not be initialized.");
        }
    };

    useEffect(() => {
        fetch("/api/merchandise/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance: StripeElementsOptions["appearance"] = {
        theme: "stripe", // Ensure this is one of: "stripe", "night", "flat"
    };

    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
    };

    return (
        <ContentComponent
            title="Payments"
            description="Secure your payments through Stripe"
        >
            <div className="relative flex items-center justify-center">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
                <button onClick={personTokenCreation}>Create Person</button>
            </div>
        </ContentComponent>
    );
}
