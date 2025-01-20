import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { serviceAccount } from "./stripe/webhook";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20", // Use the version that matches your Stripe account
});

interface RequestBody {
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
        const { firebaseID } = req.body as RequestBody;

        // Fetch the payment ID from Firestore
        const paymentSnapshot = await admin
            .firestore()
            .collection("accessCodes")
            .doc("Payment")
            .get();

        const paymentId = paymentSnapshot.data()?.obinsunId;

        if (!paymentId) {
            throw new Error("Payment ID not found in Firestore");
        }

        // Create a payment intent
        const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
            payment_method_types: ["card"],
            amount: 1000,
            currency: "usd",
            application_fee_amount: 123,
            metadata: {
                firebaseID,
            },
        };

        const requestOptions: Stripe.RequestOptions = {
            stripeAccount: paymentId,
        };

        const paymentIntent = await stripe.paymentIntents.create(
            paymentIntentParams,
            requestOptions
        );

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        const error = err as Error;
        console.error("Error creating payment intent:", error);
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
