import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE!, {
	apiVersion: "2024-12-18.acacia", // Ensure this matches your Stripe API version
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

export async function POST(req: NextRequest) {
	try {
		const { productArray } = await req.json();
		const products = productArray as Product[];

		const stripeProducts = await Promise.all(
			products.map(async (product: Product) => {
				const { id, name, variants } = product;

				// Get the first variant and its preview file
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

				// Create the Stripe product
				const stripeProduct = await stripe.products.create({
					name,
					active: true,
					metadata: { printfulProductId: id },
					images: [activeVariantFile.preview_url],
				});

				// Create Stripe prices for the product variants
				try {
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

					console.log(`🛍️  Successfully created prices for ${name}.`);
				} catch (priceError) {
					console.error(
						`⚠️  Error creating prices for ${name}: ${
							priceError instanceof Error
								? priceError.message
								: "Unknown error"
						}`
					);
				}

				return { stripeProduct };
			})
		);

		console.log(
			`🛍️  Successfully created ${stripeProducts.length} products for storefront.`
		);

		return NextResponse.json({
			productMessage: "Products received and processed successfully",
		});
	} catch (error) {
		console.error(
			`⚠️  Error: ${error instanceof Error ? error.message : "Unknown error"}`
		);
		return NextResponse.json(
			{ error: "An error occurred while processing products" },
			{ status: 500 }
		);
	}
}
