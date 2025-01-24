import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE!, {
	apiVersion: "2024-12-18.acacia", // Ensure this matches your Stripe account's API version
});

interface RequestItem {
	description: string;
	price: number;
	image: string;
	name: string;
}

interface RequestBody {
	items: RequestItem[];
	firebaseID: string;
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { items, firebaseID } = body as RequestBody;

		if (
			!items ||
			!Array.isArray(items) ||
			items.length === 0 ||
			!firebaseID
		) {
			return NextResponse.json(
				{ error: "Invalid request. Missing required fields." },
				{ status: 400 }
			);
		}

		// Transform the items into the format required by Stripe
		const transformedItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
			items.map((item) => ({
				price_data: {
					currency: "usd",
					unit_amount: Math.round(item.price * 100),
					product_data: {
						name: item.name,
						description: item.description,
						images: [item.image],
					},
				},
				quantity: 1,
			}));

		// Create the checkout session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			shipping_address_collection: {
				allowed_countries: ["GB", "US", "CA"],
			},
			line_items: transformedItems,
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_URL}/merchandise/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_URL}/merchandise/checkout`,
			metadata: {
				firebaseID,
				images: JSON.stringify(items.map((item) => item.image)),
			},
			shipping_options: [
				{
					shipping_rate: "shr_1KJrdeHgBISqeUGdzitDzzIN",
				},
			],
		} as Stripe.Checkout.SessionCreateParams);

		return NextResponse.json({ id: session.id }, { status: 200 });
	} catch (err) {
		const error = err as Error;
		console.error("Error creating checkout session:", error.message);
		return NextResponse.json(
			{ statusCode: 500, message: error.message },
			{ status: 500 }
		);
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "1mb",
		},
	},
};
