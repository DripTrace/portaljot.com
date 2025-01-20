import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import querystring from "querystring";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const tokenUrl = process.env.OAUTH2_TOKEN_URL!;
        const clientId = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!;
        const clientSecret = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET!;
        const scopes = process.env.OAUTH2_SCOPES!;

        const response = await axios.post(
            tokenUrl,
            querystring.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                scope: scopes,
                grant_type: "client_credentials",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token } = response.data;

        res.status(200).json({ access_token });
    } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).json({ error: "Error fetching access token" });
    }
}
