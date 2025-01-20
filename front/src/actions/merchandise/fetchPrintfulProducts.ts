"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]"; // Adjust this import path as needed
import { getPrintfulClient } from "@/lib/merchandise/printful-client";
import { PrintfulProduct } from "@/types/merchandise/types";
import formatVariantName from "@/lib/merchandise/format-variant-name";

interface PrintfulApiResponse {
    result: {
        sync_product: Omit<PrintfulProduct, "variants">;
        sync_variants: Array<{
            name: string;
            [key: string]: any;
        }>;
    };
}

export async function fetchPrintfulProducts(): Promise<{
    products: PrintfulProduct[];
    error?: string;
}> {
    try {
        const session = await getServerSession(authOptions);
        const printful = await getPrintfulClient();

        const { result: productIds } = await printful.get("sync/products", "");
        const allProducts = await Promise.all(
            productIds.map(
                async ({ id }: { id: string }) =>
                    await printful.get(`sync/products/${id}`, "")
            )
        );

        const products: PrintfulProduct[] = allProducts.map(
            ({
                result: { sync_product, sync_variants },
            }: PrintfulApiResponse) => ({
                ...sync_product,
                variants: sync_variants.map(({ name, ...variant }) => ({
                    name: formatVariantName(name),
                    external_id: variant.external_id ?? "", // Default value if not present
                    currency: variant.currency ?? "USD", // Default value if not present
                    retail_price: variant.retail_price ?? 0, // Default value if not present
                    files: variant.files ?? [], // Default value if not present
                    ...variant,
                })),
            })
        );

        const printfulProducts = { productArray: products };

        const productSyncing = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(printfulProducts),
        };

        await fetch(`${process.env.MERCH_API}/product`, productSyncing);

        return { products };
    } catch (error) {
        console.error("Error fetching Printful products:", error);
        return { products: [], error: "Failed to fetch products" };
    }
}
