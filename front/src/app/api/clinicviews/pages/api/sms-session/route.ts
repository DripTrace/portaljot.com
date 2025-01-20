// app/api/llpmg-text-session/route.ts
import { ringCentralClient } from "@/lib/ringcentralClient";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(res: NextApiResponse, request: NextApiRequest) {
    try {
        const { providerPhone, patientPhone, initialMessage } = await (
            request as any
        ).json();

        await ringCentralClient.login({ jwt: process.env.RC_JWT });

        const resp = await ringCentralClient.post(
            "/restapi/v1.0/account/~/extension/~/sms",
            {
                from: { phoneNumber: process.env.RC_PHONE_NUMBER },
                to: [
                    { phoneNumber: providerPhone },
                    { phoneNumber: patientPhone },
                ],
                text: initialMessage,
            }
        );

        const result = await resp.json();

        res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error in API route:", error);
        res.status(500).json({
            error: "An unknown error occurred",
            details: (error as Error).message,
        });
    }
}
