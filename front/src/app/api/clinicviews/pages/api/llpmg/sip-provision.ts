import type { NextApiRequest, NextApiResponse } from "next";
import { SDK } from "@ringcentral/sdk";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { tokenData } = req.body;

        console.log("Received tokenData:", tokenData);

        if (!tokenData || !tokenData.access_token) {
            console.error("Token data is missing or invalid");
            return res.status(400).json({ message: "Invalid token data" });
        }

        try {
            const rcsdk = new SDK({
                server: process.env.NEXT_PUBLIC_RC_SERVER_URL,
                clientId: process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID,
                clientSecret: process.env.NEXT_PUBLIC_RC_APP_CLIENT_SECRET,
            });

            const platform = rcsdk.platform();
            await platform.auth().setData(tokenData);

            const sipProvisionResponse = await platform.post(
                "/restapi/v1.0/client-info/sip-provision",
                {
                    sipInfo: [{ transport: "WSS" }],
                }
            );

            const sipProvisionData = await sipProvisionResponse.json();

            console.log("SIP Provision Data:", sipProvisionData);

            res.status(200).json({
                sipProvisionData: JSON.stringify(sipProvisionData),
            });
        } catch (error) {
            console.error("Failed to provision SIP:", error);
            res.status(500).json({
                message: "Failed to provision SIP",
                error: (error as Error).message,
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
