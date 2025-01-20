import type { NextApiRequest, NextApiResponse } from "next";
import { ringCentralClient } from "@/lib/ringcentralClient";
import axios from "axios";

interface MessageDetails {
    id: string;
    from: { phoneNumber: string };
    to: Array<{ phoneNumber: string }>;
    subject: string;
    direction: "Inbound" | "Outbound";
}

interface Conversation {
    patientNumber: string;
    doctorNumber: string;
}

const activeConversations: { [key: string]: Conversation } = {};

function createOrUpdateConversation(
    patientNumber: string,
    doctorNumber: string
): string {
    const conversationId = `${patientNumber}-${doctorNumber}`;
    activeConversations[conversationId] = { patientNumber, doctorNumber };
    console.log(`Conversation created/updated: ${conversationId}`);
    return conversationId;
}

async function getMessageDetails(messageId: string): Promise<MessageDetails> {
    console.log(`Fetching details for message ID: ${messageId}`);
    try {
        await ringCentralClient.login({ jwt: process.env.RC_JWT });
        const response = await ringCentralClient.get(
            `/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
        );
        const details = await response.json();
        console.log(
            `Message details retrieved:`,
            JSON.stringify(details, null, 2)
        );
        return details;
    } catch (error) {
        console.error(`Error getting message details:`, error);
        throw error;
    }
}

async function getRecentMessages(
    count: number = 10
): Promise<MessageDetails[]> {
    console.log(`Fetching ${count} recent messages`);
    try {
        await ringCentralClient.login({ jwt: process.env.RC_JWT });
        const response = await ringCentralClient.get(
            `/restapi/v1.0/account/~/extension/~/message-store`,
            {
                params: {
                    dateFrom: new Date(Date.now() - 5 * 60000).toISOString(),
                    perPage: count,
                },
            }
        );
        const data = await response.json();
        console.log(
            `Recent messages retrieved:`,
            JSON.stringify(data.records, null, 2)
        );
        return data.records;
    } catch (error) {
        console.error(`Error getting recent messages:`, error);
        throw error;
    }
}

async function sendSMS(to: string, message: string) {
    console.log(`Sending SMS to ${to}: ${message}`);
    try {
        await ringCentralClient.login({ jwt: process.env.RC_JWT });
        const response = await ringCentralClient.post(
            "/restapi/v1.0/account/~/extension/~/sms",
            {
                from: { phoneNumber: process.env.RC_PHONE_NUMBER },
                to: [{ phoneNumber: to }],
                text: message,
            }
        );
        const result = await response.json();
        console.log(`SMS sent successfully:`, JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
}

async function handleNewMessage(messageDetails: MessageDetails) {
    console.log(
        `Handling new message:`,
        JSON.stringify(messageDetails, null, 2)
    );
    const { from, to, subject } = messageDetails;
    const fromNumber = from.phoneNumber;
    const toNumber = to[0].phoneNumber;

    if (fromNumber === process.env.RC_PHONE_NUMBER) {
        console.log("Outbound message, ignoring");
        return;
    }

    console.log(
        `Active conversations:`,
        JSON.stringify(activeConversations, null, 2)
    );

    // Find the conversation this message belongs to
    const conversationId = Object.keys(activeConversations).find(
        (id) =>
            activeConversations[id].patientNumber === fromNumber ||
            activeConversations[id].doctorNumber === fromNumber
    );

    if (!conversationId) {
        console.error(`No conversation found for number: ${fromNumber}`);
        return;
    }

    console.log(`Found conversation: ${conversationId}`);
    const conversation = activeConversations[conversationId];
    const recipientNumber =
        fromNumber === conversation.patientNumber
            ? conversation.doctorNumber
            : conversation.patientNumber;

    console.log(`Forwarding message to: ${recipientNumber}`);
    // Forward the message
    await sendSMS(recipientNumber, `(${conversationId}) ${subject}`);
}

const processedMessageIds: Set<string> = new Set();

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

        if (messageData && messageData.body && messageData.body.changes) {
            try {
                for (const change of messageData.body.changes) {
                    if (change.type === "SMS" && change.newCount > 0) {
                        for (const messageId of change.newMessageIds) {
                            if (!processedMessageIds.has(messageId)) {
                                processedMessageIds.add(messageId);
                                try {
                                    await axios.post(
                                        `${process.env.BASE_URL}/api/llpmg/ringcentral/handle-new-message`,
                                        { messageId }
                                    );
                                } catch (error) {
                                    if (axios.isAxiosError(error)) {
                                        console.error(
                                            "Error sending to new message handler:",
                                            error.response?.data ||
                                                error.message
                                        );
                                    } else {
                                        console.error(
                                            "Unexpected error:",
                                            error
                                        );
                                    }
                                }
                            } else {
                                console.log(
                                    `Message with ID ${messageId} already processed, skipping.`
                                );
                            }
                        }
                    }
                }
                res.status(200).json({ status: "Messages processed" });
            } catch (error) {
                console.error("Error processing messages:", error);
                res.status(500).json({ error: "Failed to process messages" });
            }
        } else {
            res.status(400).json({ error: "Invalid message data" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export { createOrUpdateConversation };
