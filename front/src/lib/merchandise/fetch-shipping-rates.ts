import type { NextApiRequest, NextApiResponse } from "next";
import {
    PrintfulShippingItem,
    StripeShippingRate,
} from "@/types/merchandise/types";
import { getPrintfulClient } from "./printful-client";

interface StripeRequest extends NextApiRequest {
    body: {
        eventName: string;
        mode: string;
        createdOn: string;
        content: { [key: string]: any };
    };
}

type Data = {
    rates: StripeShippingRate[];
};

type Error = {
    errors: { key: string; message: string }[];
};

export default async function handler(
    req: StripeRequest,
    res: NextApiResponse<Data | Error>
) {
    const { eventName, content } = req.body;

    if (eventName !== "shippingrates.fetch") return res.status(200).end();

    if (content.items.length === 0) {
        return res.status(200).json({
            errors: [
                {
                    key: "no_items",
                    message: "No items in cart to calculate shipping.",
                },
            ],
        });
    }

    const {
        items: cartItems,
        shippingAddress1,
        shippingAddress2,
        shippingAddressCity,
        shippingAddressCountry,
        shippingAddressProvince,
        shippingAddressPostalCode,
        shippingAddressPhone,
    } = content;

    const recipient = {
        ...(shippingAddress1 && { address1: shippingAddress1 }),
        ...(shippingAddress2 && { address2: shippingAddress2 }),
        ...(shippingAddressCity && { city: shippingAddressCity }),
        ...(shippingAddressCountry && { country_code: shippingAddressCountry }),
        ...(shippingAddressProvince && { state_code: shippingAddressProvince }),
        ...(shippingAddressPostalCode && { zip: shippingAddressPostalCode }),
        ...(shippingAddressPhone && { phone: shippingAddressPhone }),
    };

    // Map cart items to PrintfulShippingItem structure
    const items: PrintfulShippingItem[] = cartItems.map(
        (item: any): PrintfulShippingItem => ({
            external_variant_id: item.external_variant_id, // Adjusted to match Printful's API
            quantity: item.quantity,
        })
    );

    try {
        const printfulClient = await getPrintfulClient();
        const { result } = await printfulClient.post("shipping/rates", {
            recipient,
            items,
        });

        res.status(200).json({
            rates: result.map((rate: any) => ({
                cost: rate.rate,
                description: rate.name,
                userDefinedId: rate.id,
                guaranteedDaysToDelivery: rate.maxDeliveryDays,
            })),
        });
    } catch (error: any) {
        console.log("Error retrieving shipping rates:", error);
        res.status(500).json({
            errors: [
                {
                    key: error?.reason || "unknown_error",
                    message: error?.message || "An unknown error occurred.",
                },
            ],
        });
    }
}
