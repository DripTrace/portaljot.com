import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeApi = new Stripe(
	process.env.STRIPE_SECRET_KEY_MERCHANDISE as string,
	{
		apiVersion: "2024-12-18.acacia",
	}
);

// Define the expected structure of items
interface OrderItem {
	id: string;
	quantity: number;
	price: number; // Adjust based on your pricing logic
}

const calculateOrderAmount = (items: OrderItem[]): number => {
	// Example calculation, replace with your logic
	return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { items } = (await req.json()) as { items: OrderItem[] };

		if (!items || items.length === 0) {
			return NextResponse.json(
				{ error: "No items provided" },
				{ status: 400 }
			);
		}

		const amount = calculateOrderAmount(items);

		const paymentIntent = await stripeApi.paymentIntents.create({
			amount,
			currency: "eur",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		return NextResponse.json(
			{
				clientSecret: paymentIntent.client_secret,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error creating payment intent:", error.message);
		return NextResponse.json(
			{ error: `Internal Server Error: ${error.message}` },
			{ status: 500 }
		);
	}
}

export async function GET(): Promise<NextResponse> {
	return NextResponse.json(
		{ error: "GET method not allowed for this route." },
		{ status: 405 }
	);
}
