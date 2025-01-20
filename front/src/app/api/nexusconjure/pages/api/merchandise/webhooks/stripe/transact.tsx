import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import util from "util";
import { serviceAccount } from "../../stripe/webhook";

const firebaseAdmin = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20", // Use the latest API version
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string;

const fulfillCapabilityUpdate = async (capabilityUpdate: Stripe.Capability) => {
    const customAccount = await stripe.accounts.retrieve(
        capabilityUpdate.account as string
    );

    return firebaseAdmin
        .firestore()
        .collection("users")
        .doc(customAccount.metadata?.transactId as string)
        .update({
            stripeId: customAccount.id,
            last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
            neccessary_actions: customAccount.requirements,
            verification: customAccount.individual?.verification,
            personal_info: {
                dob: customAccount.individual?.dob,
                phone: customAccount.individual?.phone,
                ssnLast4: customAccount.individual?.ssn_last_4_provided,
            },
        })
        .then(() => {
            console.log(
                `SUCCESS: Account ${customAccount.id} has been added to firestore`
            );
        });
};

const fulfillAccountUpdate = async (accountUpdate: Stripe.Account) => {
    const customAccountUpdate = await stripe.accounts.retrieve(
        accountUpdate.id
    );
    console.log(customAccountUpdate);

    return firebaseAdmin
        .firestore()
        .collection("users")
        .doc(customAccountUpdate.metadata?.transactId as string)
        .update({
            last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
            neccessary_actions: customAccountUpdate.requirements,
            individualVerification:
                customAccountUpdate.individual?.verification,
            companyVerification: customAccountUpdate.company?.verification,
            external_accounts: customAccountUpdate.external_accounts,
            stripe_metadata: customAccountUpdate.metadata,
        })
        .then(() => {
            console.log(
                `SUCCESS: Account ${customAccountUpdate.id} has been updated`
            );
        });
};

const fulfillExternalAccountCreation = async (
    externalAccountCreation: Stripe.BankAccount | Stripe.Card
) => {
    const customExternalAccountUpdate = await stripe.accounts.retrieve(
        externalAccountCreation.account as string
    );

    console.dir(
        { "custom-account-directory": customExternalAccountUpdate },
        {
            depth: null,
            colors: true,
            maxArrayLength: null,
        }
    );

    return firebaseAdmin
        .firestore()
        .collection("users")
        .doc(customExternalAccountUpdate.metadata?.transactId as string)
        .update({
            last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
            neccessary_actions: customExternalAccountUpdate.requirements,
            verification: customExternalAccountUpdate.individual?.verification,
            external_accounts: customExternalAccountUpdate.external_accounts,
        })
        .then(() => {
            console.log(
                `SUCCESS: Account ${customExternalAccountUpdate.id} has been updated`
            );
        });
};

const fulfillCustomerCreation = async (customerCreation: Stripe.Customer) => {
    return firebaseAdmin
        .firestore()
        .collection("users")
        .doc(customerCreation.metadata?.username as string)
        .update({
            customerId: customerCreation.id,
        })
        .then(() => {
            console.log(
                `SUCCESS: Account ${customerCreation.id} has been added to firestore`
            );
        });
};

const fulfillCustomerUpdate = async (customerUpdate: Stripe.Customer) => {
    return firebaseAdmin
        .firestore()
        .collection("users")
        .doc(customerUpdate.metadata?.username as string)
        .update({
            shipping: customerUpdate.shipping,
        })
        .then(() => {
            console.log(
                `SUCCESS: Updated ${customerUpdate.id} shipping address.`
            );
        });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event: Stripe.Event;

        try {
            if (!sig) {
                throw new Error("No Stripe signature found");
            }
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
        } catch (err: any) {
            console.log("ERROR", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        console.log({
            "event-logger": util.inspect(event, { maxArrayLength: null }),
        });

        console.dir(
            { "event-directory": event },
            {
                depth: null,
                colors: true,
                maxArrayLength: null,
            }
        );

        try {
            switch (event.type) {
                case "account.updated":
                    await fulfillAccountUpdate(
                        event.data.object as Stripe.Account
                    );
                    break;
                case "account.external_account.created":
                    await fulfillExternalAccountCreation(
                        event.data.object as Stripe.BankAccount | Stripe.Card
                    );
                    break;
                case "capability.updated":
                    await fulfillCapabilityUpdate(
                        event.data.object as Stripe.Capability
                    );
                    break;
                case "customer.created":
                    await fulfillCustomerCreation(
                        event.data.object as Stripe.Customer
                    );
                    break;
                case "customer.updated":
                    await fulfillCustomerUpdate(
                        event.data.object as Stripe.Customer
                    );
                    break;
                // Add other cases as needed
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            res.status(200).json({ received: true });
        } catch (error) {
            console.error("Error processing webhook:", error);
            res.status(500).json({ error: "Failed to process webhook" });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
