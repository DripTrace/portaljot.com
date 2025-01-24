import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-12-18.acacia",
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(req: NextRequest) {
	const buf = await buffer(req);
	const sig = req.headers.get("stripe-signature");

	if (!sig) {
		return NextResponse.json(
			{ error: "Missing Stripe signature" },
			{ status: 400 }
		);
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			buf.toString(),
			sig,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (err) {
		const error = err as Error;
		console.error("Error verifying webhook signature:", error.message);
		return NextResponse.json(
			{ error: `Webhook Error: ${error.message}` },
			{ status: 400 }
		);
	}

	try {
		if (
			event.type === "product.created" ||
			event.type === "product.updated"
		) {
			const product = event.data.object as Stripe.Product;
			await updateProductInDatabase(product);
		}

		return NextResponse.json({ received: true }, { status: 200 });
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{ error: "Failed to process webhook" },
			{ status: 500 }
		);
	}
}

async function updateProductInDatabase(product: Stripe.Product) {
	// Implement your database update logic here
	console.log("Updating product in database:", product.id);
	// Example: Call your database API or SDK to update the product
}
