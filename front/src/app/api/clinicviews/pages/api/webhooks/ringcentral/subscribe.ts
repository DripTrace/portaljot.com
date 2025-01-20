import { ringCentralClient } from "@/lib/ringcentralClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const sessions: { [key: string]: { patient: string; doctor: string } } = {};

function formatPhoneNumber(phone: string | number): string {
    const phoneString = String(phone).replace(/\D/g, "");
    const formattedPhoneNumber = `+1${phoneString.slice(-10)}`;

    if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
        throw new Error(`Invalid phone number format: ${formattedPhoneNumber}`);
    }
    return formattedPhoneNumber;
}

async function getMessageDetails(messageId: string) {
    try {
        await ringCentralClient.login({ jwt: process.env.RC_JWT });
        const response = await ringCentralClient.get(
            `/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
        );
        return response.json();
    } catch (error) {
        console.error("Error fetching message details:", error);
        throw error;
    }
}

async function sendSMS(to: string, message: string) {
    try {
        await ringCentralClient.login({ jwt: process.env.RC_JWT });
        const formattedPhoneNumber = formatPhoneNumber(to);

        const resp = await ringCentralClient.post(
            "/restapi/v1.0/account/~/extension/~/sms",
            {
                from: { phoneNumber: process.env.RC_PHONE_NUMBER },
                to: [{ phoneNumber: formattedPhoneNumber }],
                text: message,
            }
        );

        return resp.json();
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const validationToken = req.headers["validation-token"];

        if (validationToken) {
            res.setHeader("Validation-Token", validationToken as string);
            return res.status(200).send("OK");
        }

        const messageData = req.body;

        console.log(
            "Received message data:",
            JSON.stringify(messageData, null, 2)
        );

        if (messageData && messageData.body && messageData.body.changes) {
            try {
                for (const change of messageData.body.changes) {
                    const messageId = change.newMessageId || change.messageId;
                    if (!messageId) {
                        console.error("Message ID is undefined");
                        continue;
                    }

                    const messageDetails = await getMessageDetails(messageId);
                    console.log("Message details:", messageDetails);

                    const { from, to, subject, direction } = messageDetails;
                    // const fromNumber = formatPhoneNumber(from.phoneNumber);
                    // const toNumber = formatPhoneNumber(to[0].phoneNumber);
                    const fromNumber = from.phoneNumber;
                    const toNumber = to[0].phoneNumber;

                    let sessionId;
                    let targetNumber;
                    if (direction === "Inbound") {
                        // Patient to Doctor
                        sessionId = `${fromNumber}-${toNumber}`;
                        if (!sessions[sessionId]) {
                            sessions[sessionId] = {
                                patient: fromNumber,
                                doctor: toNumber,
                            };
                        }
                        targetNumber = sessions[sessionId]?.doctor;
                    } else {
                        // Doctor to Patient
                        sessionId = `${toNumber}-${fromNumber}`;
                        if (!sessions[sessionId]) {
                            sessions[sessionId] = {
                                patient: toNumber,
                                doctor: fromNumber,
                            };
                        }
                        targetNumber = sessions[sessionId]?.patient;
                    }

                    if (targetNumber) {
                        await sendSMS(targetNumber, subject);
                    } else {
                        console.error("Session not found");
                    }
                }
                res.status(200).json({ status: "Message processed" });
            } catch (error) {
                console.error("Error processing message:", error);
                res.status(500).json({ error: "Failed to process message" });
            }
        } else {
            res.status(400).json({ error: "Invalid message data" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
