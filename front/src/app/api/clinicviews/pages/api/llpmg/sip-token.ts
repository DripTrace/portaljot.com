import type { NextApiRequest, NextApiResponse } from "next";

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Check for the correct environment variables
        const {
            NEXT_PUBLIC_RC_WP_CLIENT_ID,
            NEXT_PUBLIC_RC_WP_CLIENT_SECRET,
            NEXT_PUBLIC_RC_WP_CALLER_JWT_TOKEN,
        } = process.env;

        if (
            !NEXT_PUBLIC_RC_WP_CLIENT_ID ||
            !NEXT_PUBLIC_RC_WP_CLIENT_SECRET ||
            !NEXT_PUBLIC_RC_WP_CALLER_JWT_TOKEN
        ) {
            throw new Error(
                "Missing environment variables for RingCentral API authentication"
            );
        }
        const tokenResponse = await fetch(
            `${process.env.NEXT_PUBLIC_RC_WP_SERVER}/restapi/oauth/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${Buffer.from(`${NEXT_PUBLIC_RC_WP_CLIENT_ID}:${NEXT_PUBLIC_RC_WP_CLIENT_SECRET}`).toString("base64")}`,
                },
                body: new URLSearchParams({
                    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                    assertion: NEXT_PUBLIC_RC_WP_CALLER_JWT_TOKEN,
                }),
            }
        );

        console.log("token response: >>>> \n", tokenResponse);

        if (!tokenResponse.ok) {
            const errorDetails = await tokenResponse.json();
            throw new Error(
                `Failed to authenticate: ${tokenResponse.statusText} - ${JSON.stringify(errorDetails)}`
            );
        }

        const tokenData: TokenResponse = await tokenResponse.json();

        // Return the token to the client
        res.status(200).json({ token: tokenData.access_token });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Failed to authenticate:", errorMessage);
        res.status(500).json({
            message: "Failed to authenticate",
            error: errorMessage,
        });
    }
}
