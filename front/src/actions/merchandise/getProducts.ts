"use server";

import shuffle from "lodash.shuffle";
import { getServerSession } from "next-auth/next";
import { getPrintfulClient } from "@/lib/merchandise/printful-client";
import { PrintfulProduct } from "@/types/merchandise/types";
import formatVariantName from "@/lib/merchandise/format-variant-name";
import { keyCreation } from "@/types/merchandise/interfaces/objects/obinsun-objects";
import { cache } from "react";
import debounce from "lodash.debounce";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]"; // Adjust this import path as needed

// In-memory cache
let productsCache: PrintfulProduct[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchProducts = async (): Promise<PrintfulProduct[]> => {
    const printful = await getPrintfulClient();
    const { result: productIds } = await printful.get("sync/products", "");
    const allProducts = await Promise.all(
        productIds.map(
            async ({ id }: { id: string }) =>
                await printful.get(`sync/products/${id}`, "")
        )
    );

    return allProducts.map(
        ({ result: { sync_product, sync_variants } }: any) => ({
            ...sync_product,
            variants: sync_variants.map(({ name, ...variant }: any) => ({
                name: formatVariantName(name),
                ...variant,
            })),
        })
    );
};

const fetchDBKeys = async () => {
    const dbAttributes: keyCreation[] = [
        {
            obinsunKey: `string`,
            username: `string`,
            firstname: `string`,
            lastname: `string`,
            email: `string`,
            password: `string`,
            ip: `string`,
            cc: `string`,
        },
    ];

    const addDBKeys = {
        method: "POST",
        body: JSON.stringify(dbAttributes),
        headers: {
            "Content-Type": "application/json",
            "obinsun-db": `Piece 0`,
        },
    };

    try {
        const url = `${process.env.MERCH_API}/dbs/keys`;
        console.log(`Fetching DB keys from: ${url}`);

        const response = await fetch(url, addDBKeys);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(
                `HTTP error! status: ${response.status}, body: ${errorText}`
            );
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const keyRetrieval = await response.json();
        console.log("Key retrieval successful:", keyRetrieval);
    } catch (error) {
        console.error("Error fetching or parsing keys:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
    }
};

let isFetchingKeys = false;

const debouncedFetchDBKeys = debounce(
    async () => {
        if (isFetchingKeys) return;
        isFetchingKeys = true;
        try {
            await fetchDBKeys();
        } finally {
            isFetchingKeys = false;
        }
    },
    5000,
    { leading: true, trailing: false }
);

export const getProducts = cache(async (): Promise<PrintfulProduct[]> => {
    const session = await getServerSession(authOptions);
    console.log("session(server/actions/getProducts.ts):\n", session);

    const now = Date.now();
    if (productsCache && now - lastFetchTime < CACHE_DURATION) {
        return productsCache;
    }

    try {
        const products = await fetchProducts();
        productsCache = products;
        lastFetchTime = now;

        // Use the debounced function
        debouncedFetchDBKeys();

        return shuffle(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        if (productsCache) {
            console.log("Returning cached products due to error");
            return productsCache;
        }
        throw error;
    }
});

export async function getProduct(
    productId: string
): Promise<PrintfulProduct | undefined> {
    const products = await getProducts();
    return products.find((product) => product.id === productId);
}
