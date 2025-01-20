import * as admin from "firebase-admin";
import axios, { AxiosResponse } from "axios";
import { serviceAccount } from "../stripe/webhook";
import { NextApiRequest, NextApiResponse } from "next";

// Environment Variables
const clientId = process.env.PRINTFUL_CLIENT_ID as string;
const clientSecret = process.env.PRINTFUL_SECRET_KEY as string;
const redirectUrl = `${process.env.MERCH_URL}/settings`;

// Initialize Firebase Admin SDK
const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

// Type Definitions
interface PrintfulTokenData {
    access_token: string;
    expires_at: number;
    token_type: string;
    refresh_token: string;
}

const createAccessCode = async (
    printfulTokenData: PrintfulTokenData,
    firestoreAccess: string
): Promise<void> => {
    await app
        .firestore()
        .collection("users")
        .doc(firestoreAccess)
        .collection("printful")
        .doc("accessValues")
        .set({
            access_token: printfulTokenData.access_token,
            expires_at: printfulTokenData.expires_at,
            token_type: printfulTokenData.token_type,
            refresh_token: printfulTokenData.refresh_token,
        });

    console.log(
        `SUCCESS: Printful access token ${printfulTokenData.access_token} has been added to the DB`
    );
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    if (req.method === "GET") {
        const firestoreAccess = req.query.state as string;
        const printfulAccess = req.query.code as string;

        try {
            const response: AxiosResponse<PrintfulTokenData> = await axios.post(
                "https://www.printful.com/oauth/token",
                {
                    grant_type: "access_token",
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: printfulAccess,
                }
            );

            const printfulTokenData = response.data;
            console.log(printfulTokenData);

            await createAccessCode(printfulTokenData, firestoreAccess);
            res.redirect(307, redirectUrl);
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(400).send(`Error: ${err.message}`);
            } else {
                res.status(400).send("Unknown error occurred");
            }
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
