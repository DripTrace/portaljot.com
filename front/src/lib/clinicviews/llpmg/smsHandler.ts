import { ringCentralClient } from "@/lib/ringcentralClient";

interface MessageDetails {
    id: string;
    from?: { phoneNumber?: string };
    to?: Array<{ phoneNumber?: string }>;
    subject?: string;
    direction?: "Inbound" | "Outbound";
}

class SMSHandler {
    private processedMessageIds: Set<string> = new Set();

    async processMessage(messageId: string) {
        if (this.processedMessageIds.has(messageId)) {
            console.log(`Message ${messageId} already processed, skipping.`);
            return;
        }

        try {
            const messageDetails = await this.getMessageDetails(messageId);
            await this.handleMessage(messageDetails);
            this.processedMessageIds.add(messageId);
        } catch (error) {
            console.error(`Error processing message ${messageId}:`, error);
        }
    }

    private async getMessageDetails(
        messageId: string
    ): Promise<MessageDetails> {
        const response = await ringCentralClient.get(
            `/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    private async handleMessage(message: MessageDetails) {
        if (message.direction === "Outbound") {
            console.log("Outbound message, ignoring");
            return;
        }

        const recipientNumber = this.getRecipientNumber(message);
        if (!recipientNumber) {
            console.error(
                "Unable to determine recipient number for message:",
                message
            );
            return;
        }

        await this.forwardMessage(message, recipientNumber);
    }

    private getRecipientNumber(message: MessageDetails): string | null {
        const fromNumber = message.from?.phoneNumber;
        const toNumber = message.to?.[0]?.phoneNumber;

        if (!fromNumber || !toNumber) {
            console.error("Missing from or to number in message:", message);
            return null;
        }

        // Assuming the message is always to or from the RingCentral number
        return fromNumber === process.env.RC_PHONE_NUMBER
            ? toNumber
            : fromNumber;
    }

    private async forwardMessage(
        message: MessageDetails,
        recipientNumber: string
    ) {
        try {
            const response = await ringCentralClient.post(
                "/restapi/v1.0/account/~/extension/~/sms",
                {
                    from: { phoneNumber: process.env.RC_PHONE_NUMBER },
                    to: [{ phoneNumber: recipientNumber }],
                    text: message.subject || "No subject",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(`Message forwarded successfully to ${recipientNumber}`);
        } catch (error) {
            console.error("Error forwarding message:", error);
        }
    }

    cleanupProcessedMessages(maxAge: number = 24 * 60 * 60 * 1000) {
        const now = Date.now();
        this.processedMessageIds.clear();
    }
}

export const smsHandler = new SMSHandler();
