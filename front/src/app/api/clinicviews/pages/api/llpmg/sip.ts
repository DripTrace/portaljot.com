import type { NextApiRequest, NextApiResponse } from "next";
import { ringCentralClient } from "@/lib/ringcentralClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            await ringCentralClient.login({ jwt: process.env.RC_JWT });
            const sipConfig = {
                username: process.env.SIP_INFO_USERNAME,
                password: process.env.SIP_INFO_PASSWORD,
                domain: process.env.SIP_INFO_DOMAIN,
            };

            res.status(200).json({ sipConfig });
        } catch (error) {
            console.error("Error authenticating with JWT:", error);
            res.status(500).json({
                error: "Failed to authenticate with JWT",
                details: (error as Error).message,
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
