import { serviceAccount } from "@/pages/api/merchandise/stripe/webhook";
import { PrintfulClient } from "./printful-request";
import axios from "axios";
import * as admin from "firebase-admin";

// Type definitions
type AccessCodeData = {
    access_token: string;
    expires_at: number;
    refresh_token: string;
};

// Initialize Firebase Admin SDK
// const initializeFirebase = () => {
//     if (typeof window === "undefined" && !admin.apps.length) {
//         admin.initializeApp({
//             credential: admin.credential.cert(serviceAccount),
//         });
//     }
//     return admin.apps.length ? admin.app() : null;
// };

// const app = initializeFirebase();

const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

const clientId = process.env.PRINTFUL_CLIENT_ID;
const clientSecret = process.env.PRINTFUL_SECRET_KEY;

const getAccessCode = async (): Promise<string> => {
    if (typeof window !== "undefined") {
        throw new Error("getAccessCode should only be called server-side");
    }

    if (!app) {
        throw new Error("Firebase app not initialized");
    }

    const snapshot = await app
        .firestore()
        .collection("accessCodes")
        .doc("Authorization")
        .get();
    const data = snapshot.data() as AccessCodeData | undefined;

    if (!data) {
        throw new Error("No access code data found");
    }

    const { access_token, expires_at, refresh_token } = data;
    const now = Math.floor(Date.now() / 1000);

    if (now < expires_at) {
        console.log("Using current access token", access_token);
        return access_token;
    } else {
        return getRefreshedCode(refresh_token);
    }
};

const getRefreshedCode = async (
    current_refresh_token: string
): Promise<string> => {
    try {
        const response = await axios.post(
            "https://www.printful.com/oauth/token",
            {
                grant_type: "refresh_token",
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: current_refresh_token,
            }
        );

        const { access_token, expires_at, refresh_token } = response.data;

        if (!app) {
            throw new Error("Firebase app not initialized");
        }

        await app
            .firestore()
            .collection("accessCodes")
            .doc("Authorization")
            .set({
                access_token,
                expires_at,
                refresh_token,
            });

        console.log("Using refreshed access token", access_token);
        return access_token;
    } catch (e) {
        console.log("error retrieving token:", e);
        throw e;
    }
};

// Export a function to get the PrintfulClient instead of instantiating it immediately
export const getPrintfulClient = async (): Promise<PrintfulClient> => {
    const access_code = await getAccessCode();
    return new PrintfulClient(access_code);
};
