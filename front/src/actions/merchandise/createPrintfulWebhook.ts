"use server";

import { getPrintfulClient } from "@/lib/merchandise/printful-client";

export async function createPrintfulWebhook() {
    const printful = await getPrintfulClient();

    const webhookCreation = {
        url: `${process.env.MERCH_API}/webhooks/printful/produce`,
        types: ["package_shipped", "stock_updated"],
        params: {
            stock_updated: {
                product_ids: [5, 12],
            },
        },
    };

    try {
        const response = await printful.post("webhook", webhookCreation);
        console.log("Printful webhook created:", response);
        return response;
    } catch (error) {
        console.error("Error creating Printful webhook:", error);
        return null;
    }
}
