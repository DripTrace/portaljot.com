import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export async function PUT(req: NextRequest) {
	const {
		first,
		last,
		city,
		country,
		line1,
		line2,
		postal_code,
		state,
		stripeAccess,
	} = await req.json();

	await stripe.customers.update(stripeAccess, {
		address: { city, country, line1, line2, postal_code, state },
		shipping: {
			address: {
				city,
				country,
				line1,
				line2,
				postal_code,
				state,
			},
			name: `${first} ${last}`,
		},
	});

	return NextResponse.json(
		{ message: "Updating Shipping Details!" },
		{ status: 200 }
	);
}
