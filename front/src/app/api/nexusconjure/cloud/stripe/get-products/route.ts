// src/pages/api/get-products.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function GET(req: NextRequest) {
	try {
		// Fetch products and prices from Stripe
		const [products, prices] = await Promise.all([
			stripe.products.list(),
			stripe.prices.list(),
		]);

		// Map products with their associated prices
		const productData = products.data.map((product) => ({
			id: product.id,
			name: product.name,
			description: product.description,
			metadata: {
				features: product.metadata.features || "",
			},
			prices: prices.data
				.filter((price) => price.product === product.id)
				.map((price) => ({
					id: price.id,
					unit_amount: price.unit_amount || 0,
					recurring: {
						interval: price.recurring?.interval || "month",
					},
				})),
		}));

		return NextResponse.json(productData, { status: 200 });
	} catch (error) {
		console.error("Error fetching products:", error);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500 }
		);
	}
}
