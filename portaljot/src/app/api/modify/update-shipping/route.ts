import { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

async function shippingHandler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "PUT") {
		return;
	}

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
	} = req.body;

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

	res.status(200).json({ message: "Updating Shipping Details!" });
}

export default shippingHandler;
