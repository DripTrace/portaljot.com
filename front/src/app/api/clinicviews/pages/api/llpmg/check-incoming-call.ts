import { NextApiRequest, NextApiResponse } from "next";
import Softphone from "@/ref/soft/src/softphone";

let softphone: Softphone | null = null;
let lastIncomingCall: { callerNumber: string } | null = null;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!softphone) {
        const sipInfo = {
            username: process.env.SIP_INFO_USERNAME!,
            password: process.env.SIP_INFO_PASSWORD!,
            authorizationId: process.env.SIP_INFO_AUTHORIZATION_ID!,
            domain: process.env.SIP_INFO_DOMAIN!,
        };

        softphone = new Softphone(sipInfo);
        softphone.enableDebugMode();
        await softphone.register();

        softphone.on("invite", (inviteMessage: any) => {
            console.log("Incoming call detected", inviteMessage);
            const callerNumber =
                inviteMessage.headers.From.match(/<sip:(.+?)@/)?.[1];
            lastIncomingCall = { callerNumber };
        });
    }

    if (req.method === "GET") {
        if (lastIncomingCall) {
            const response = { ...lastIncomingCall };
            lastIncomingCall = null;
            res.status(200).json(response);
        } else {
            res.status(200).json({ callerNumber: null });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default handler;
