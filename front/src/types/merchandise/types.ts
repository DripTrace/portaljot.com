import type { NextApiRequest } from "next";
import type { Session } from "next-auth";
import type Stripe from "stripe";

export interface total {
    basketTotal: number;
}

export type StripeWebhookEvent =
    Stripe.WebhookEndpointCreateParams.EnabledEvent;

export type PrintfulWebhookEvent =
    | "package_shipped"
    | "order_failed"
    | "order_canceled"
    | "order_refunded"
    | "product_synced"
    | "product_updated"
    | "product_deleted"
    | "stock_updated"
    | "order_put_hold"
    | "order_remove_hold"
    | "package_returned"
    | "order_created"
    | "order_updated";

export interface StripeWebhookContent {
    discounts: { [key: string]: any };
    items: { [key: string]: any };
    shippingAddress: {
        fullName: string;
        firstName?: string;
        name: string;
        company?: string;
        address1: string;
        address2?: string;
        fullAddress: string;
        city: string;
        country: string;
        postalCode: string;
        province: string;
        phone?: string;
    };
    shippingRateUserDefinedId?: string;
    [key: string]: any;
}

export type StripeShippingRate = {
    cost: number;
    description: string;
    guaranteedDaysToDelivery?: number;
    userDefinedId?: string;
};

export type StripeTaxItem = {
    name: string;
    amount: number;
    rate: number;
    numberForInvoice?: string;
    includedInPrice?: boolean;
    appliesOnShipping?: boolean;
};

export interface StripeRequest extends NextApiRequest {
    headers: {
        "x-stripe-requesttoken"?: string;
    };
    body: {
        eventName: StripeWebhookEvent;
        mode: string;
        createdOn: string;
        content: StripeWebhookContent;
    };
}

export interface CartProduct {
    id: string;
    price: number;
    url: string;
    description: string;
    image: string;
    name: string;
}

// export interface PrintfulProduct {
//     id: string;
//     name: string;
//     variants: Array<{
//         external_id: string;
//         name: string;
//         currency: string;
//         retail_price: number;
//         files: Array<{
//             type: string;
//             preview_url: string;
//         }>;
//     }>;
//     // Add any other properties that your products have
// }
export interface PrintfulCatalog {
    id: string;
    name: string;
}

export type PrintfulShippingItem = {
    external_variant_id: string;
    quantity: number;
};

// export type PrintfulProductVariant = {
//     id: string; // Added 'id' property here
//     external_id: string;
//     name: string;
//     currency: string;
//     retail_price: number;
//     files: Array<{
//         type: string;
//         preview_url: string;
//     }>;
// };

export interface PrintfulProduct {
    id: string;
    name: string;
    type_name: string;
    variant_count: PrintfulProductVariant[];
    currency: string;
    variants: any[]; // Ensure variants exist if required by the Product component
}

export interface PrintfulProductVariant {
    id: string;
    name: string;
    currency: string;
    retail_price: number;
    files: Array<{
        type: string;
        preview_url: string;
    }>;
}
