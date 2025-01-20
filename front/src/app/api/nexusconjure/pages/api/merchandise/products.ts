import formatVariantName from "@/lib/merchandise/format-variant-name";
import { ISyncVariant } from "@/lib/merchandise/state/slices/variantSlice";
import axios from "axios";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import { serviceAccount } from "./stripe/webhook";

export interface ISyncProduct {
    id: string;
    external_id: string;
    name: string;
    variants: ISyncVariant[];
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
}

interface AccessCodeData {
    access_token: string;
    expires_at: number;
    refresh_token: string;
}

interface RefreshedToken {
    access_token: string;
    expires_at: number;
    refresh_token: string;
}

interface PrintfulProduct {
    id: number;
}

interface SyncProductResponse {
    result: {
        sync_product: ISyncProduct;
        sync_variants: ISyncVariant[];
    };
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
}

const db = admin.firestore();

export async function getProducts(): Promise<ISyncProduct[]> {
    const clientId = process.env.PRINTFUL_CLIENT_ID;
    const clientSecret = process.env.PRINTFUL_SECRET_KEY;

    const getAccessCode = async (): Promise<string> => {
        const snapshot = await db
            .collection("accessCodes")
            .doc("Authorization")
            .get();
        const data = snapshot.data() as AccessCodeData | undefined;

        if (!data) {
            throw new Error("No access code data found");
        }

        const { access_token, expires_at, refresh_token } = data;

        if (Date.now() < expires_at) {
            console.log("Using current access token", access_token);
            return access_token;
        } else {
            return getRefreshedCode(refresh_token);
        }
    };

    const getRefreshedCode = async (
        current_refresh_token: string
    ): Promise<string> => {
        try {
            const response = await axios.post<RefreshedToken>(
                "https://www.printful.com/oauth/token",
                {
                    grant_type: "refresh_token",
                    client_id: clientId,
                    client_secret: clientSecret,
                    refresh_token: current_refresh_token,
                }
            );

            const { access_token, expires_at, refresh_token } = response.data;

            await db.collection("accessCodes").doc("Authorization").set({
                access_token,
                expires_at,
                refresh_token,
            });

            console.log("Using refreshed access token", access_token);
            return access_token;
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    };

    const access_code = await getAccessCode();

    const getProductsResponse = await axios.get<{ result: PrintfulProduct[] }>(
        "https://api.printful.com/store/products",
        {
            headers: {
                Authorization: `Bearer ${access_code}`,
            },
        }
    );

    const productIds = getProductsResponse.data.result;

    const synced_products = await Promise.all(
        productIds.map(async ({ id }) => {
            const response = await axios.get<SyncProductResponse>(
                `https://api.printful.com/store/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${access_code}`,
                    },
                }
            );
            return response.data;
        })
    );

    const products: ISyncProduct[] = synced_products.map(
        ({ result: { sync_product, sync_variants } }) => ({
            ...sync_product,
            variants: sync_variants.map(({ name, ...variant }) => ({
                name: formatVariantName(name),
                ...variant,
            })),
        })
    );

    return products;
}

export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; error?: string };
export const sleep = (time: number): Promise<void> =>
    new Promise((res) => setTimeout(res, time));
