import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20", // Update this to match your Stripe API version
});

interface ProductVariant {
    external_id: string;
    id: string;
    name: string;
    retail_price: string;
    files: Array<{
        type: string;
        preview_url: string;
    }>;
}

interface Product {
    id: string;
    name: string;
    variants: ProductVariant[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { productArray } = req.body;
    const products = productArray as Product[];

    try {
        const stripeProducts = await Promise.all(
            products.map(async (product: Product) => {
                const { id, name, variants } = product;
                const [firstVariant] = variants;
                const activeVariantExternalId = firstVariant.external_id;
                const activeVariant = variants.find(
                    (v) => v.external_id === activeVariantExternalId
                );
                const activeVariantFile = activeVariant?.files.find(
                    ({ type }) => type === "preview"
                );

                if (!activeVariant || !activeVariantFile) {
                    throw new Error(`Invalid variant data for product ${name}`);
                }

                const stripeProduct = await stripe.products.create({
                    name,
                    active: true,
                    metadata: { prinfulProductId: id },
                    images: [activeVariantFile.preview_url],
                });

                try {
                    setTimeout(async () => {
                        await Promise.all(
                            variants.map(async (variant: ProductVariant) => {
                                const { retail_price } = variant;
                                const centsPrice = Math.round(
                                    parseFloat(retail_price) * 100
                                );
                                const variantName = `${stripeProduct.name} ${variant.name}`;

                                const stripePrice = await stripe.prices.create({
                                    currency: "usd",
                                    product: stripeProduct.id,
                                    unit_amount: centsPrice,
                                    active: true,
                                    metadata: { printfulVariantId: variant.id },
                                    nickname: variantName,
                                    billing_scheme: "per_unit",
                                });

                                return { stripePrice };
                            })
                        );
                    }, 1500);

                    console.log(`🛍️  Successfully created price for ${name}.`);
                } catch (error) {
                    console.log(
                        `⚠️  Error creating price for ${name}: ${error instanceof Error ? error.message : "Unknown error"}`
                    );
                }

                return {
                    stripeProduct,
                };
            })
        );

        console.log(
            `🛍️  Successfully created ${stripeProducts.length} products for storefront.`
        );

        return res
            .status(200)
            .json({ productMessage: "Products received and processed" });
    } catch (error) {
        console.log(
            `⚠️  Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
        return res
            .status(500)
            .json({ error: "An error occurred while processing products" });
    }
}
