import type { NextApiRequest, NextApiResponse } from "next";
import { SDK } from "@ringcentral/sdk";
import crypto from "crypto";

function generateCodeVerifier() {
    return crypto
        .randomBytes(32)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

function generateCodeChallenge(verifier: string) {
    const base64Hash = crypto
        .createHash("sha256")
        .update(verifier)
        .digest("base64");
    return base64Hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { code, state } = req.query;
        if (code && state) {
            try {
                const storedCodeVerifier = state as string;

                const rcsdk = new SDK({
                    server: process.env.NEXT_PUBLIC_RC_SERVER_URL!,
                    clientId: process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID!,
                    clientSecret: process.env.NEXT_PUBLIC_RC_APP_CLIENT_SECRET!,
                    redirectUri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
                });

                const platform = rcsdk.platform();

                await platform.login({
                    code: code as string,
                    redirect_uri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
                    code_verifier: storedCodeVerifier,
                });

                const tokenData = await platform.auth().data();

                console.log("Authentication successful, redirecting...");

                res.redirect(
                    302,
                    `/llpmg/sip?tokenData=${encodeURIComponent(JSON.stringify(tokenData))}`
                );
            } catch (error) {
                console.error("Failed to complete authentication:", error);
                res.status(500).json({
                    message: "Failed to complete authentication",
                    error: (error as Error).message,
                });
            }
        } else {
            try {
                const redirectUri = process.env.NEXT_PUBLIC_RC_REDIRECT_URI;

                if (
                    !redirectUri ||
                    (!redirectUri.startsWith("http://") &&
                        !redirectUri.startsWith("https://"))
                ) {
                    throw new Error(`Invalid redirect URI: ${redirectUri}`);
                }

                const clientId = process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID;
                const codeVerifier = generateCodeVerifier();
                const codeChallenge = generateCodeChallenge(codeVerifier);

                const loginUrl = new URL("https://login.ringcentral.com/");
                loginUrl.searchParams.append("responseType", "code");
                loginUrl.searchParams.append("clientId", clientId!);
                loginUrl.searchParams.append("brandId", "1210");
                loginUrl.searchParams.append("state", codeVerifier);
                loginUrl.searchParams.append("localeId", "en_US");
                loginUrl.searchParams.append("display", "page");
                loginUrl.searchParams.append("prompt", "login sso");
                loginUrl.searchParams.append("appUrlScheme", redirectUri);
                loginUrl.searchParams.append("code_challenge", codeChallenge);
                loginUrl.searchParams.append("code_challenge_method", "S256");

                console.log("Generated login URL: ", loginUrl.toString());

                res.status(200).json({
                    loginUrl: loginUrl.toString(),
                    codeVerifier,
                });
            } catch (error) {
                console.error("Error generating login URL:", error);
                res.status(500).json({
                    error: "Failed to generate login URL",
                    details: (error as Error).message,
                });
            }
        }
    } else if (req.method === "POST") {
        console.log("Entering POST method");
        const { code, state } = req.body;

        if (!code) {
            res.status(400).json({ message: "Authorization code is missing" });
            return;
        }

        try {
            const rcsdk = new SDK({
                server: process.env.NEXT_PUBLIC_RC_SERVER_URL!,
                clientId: process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID!,
                clientSecret: process.env.NEXT_PUBLIC_RC_APP_CLIENT_SECRET!,
                redirectUri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
            });

            const platform = rcsdk.platform();

            console.log("Attempting to login with code: ", code);

            await platform.login({
                code,
                redirect_uri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
                code_verifier: state,
            });

            const tokenData = await platform.auth().data();

            console.log("Authentication successful, redirecting...");

            res.status(200).json({ tokenData });
        } catch (error) {
            console.error("Failed to exchange code:", error);
            res.status(500).json({
                message: "Failed to exchange code",
                error: (error as Error).message,
            });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
