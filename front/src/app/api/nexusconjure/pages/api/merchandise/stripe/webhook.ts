import { buffer } from "micro";
import * as admin from "firebase-admin";
// import { ServiceAccount } from "@google-cloud/storage";

export const serviceAccount: admin.ServiceAccount = {
    // projectId: `${process.env.FIREBASE_PROJECT_ID}`,
    // keyFilename: globalThis.__filename,
    // credentials: {
    // type: `${process.env.FIREBASE_CREDENTIALS_TYPE}`,
    projectId: `${process.env.FIREBASE_PROJECT_ID}`,
    // private_key_id: `${process.env.FIREBASE_PRIVATE_KEY_ID}`,
    privateKey: `${process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n")}`,
    clientEmail: `${process.env.FIREBASE_CLIENT_EMAIL}`,
    // client_id: `${process.env.FIREBASE_CLIENT_ID}`,
    // auth_uri: `${process.env.FIREBASE_AUTH_URI}`,
    // token_uri: `${process.env.FIREBASE_TOKEN_URI}`,
    // auth_provider_x509_cert_url: `${process.env.FIREBASE_AUTH_PROVIDER_CERT_URL}`,
    // client_x509_cert_url: `${process.env.FIREBASE_CLIENT_CERT_URL}`,
    // universe_domain: `${process.env.FIREBASE_UNIVERSE_DOMAIN}`,
    // },
};

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;
const fulfillAccountCreation = async (stripeAccount: any) => {
    const account = await stripe.accounts.retrieve(stripeAccount.account);

    console.log("neccessary actions:", account.requirements.currently_due[0]);
    app.firestore().collection("accessCodes").doc("Payment").set({
        obinsunId: account.id,
    });

    app.firestore()
        .collection("users")
        .doc(account.metadata.firebaseID)
        .collection("custom_account")
        .doc(account.id)
        .set({
            last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
        });

    return app
        .firestore()
        .collection("users")
        .doc(account.metadata.firebaseID)
        .update({
            stripeId: account.id,
            personId: account.individual.id,
        })
        .then(() => {
            console.log(
                `SUCCESS: Account ${account.id} has been added to the DB`
            );
        });
};

export default async (req: any, res: any) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
            // console.log(event);
        } catch (err: any) {
            console.log("ERROR", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        console.log(event);

        if (event.type === "capability.updated") {
            const accountCreationEvents = event.data.object;
            const stripeAccount = accountCreationEvents;

            return fulfillAccountCreation(stripeAccount)
                .then(() =>
                    res.status(200).send("account successfully updated")
                )
                .catch((err) =>
                    res.status(400).send(`Webhook Error: ${err.message}`)
                );
        }

        if (event.type === "person.created") {
            return res.status(200).send("person created");
        }

        if (event.type === "person.updated") {
            return res.status(200).send("person updated");
        }

        if (event.type === "account.updated") {
            return res.status(200).send("account updated");
        }

        if (event.pending_webhooks === 0) {
            return res.status(200);
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};
