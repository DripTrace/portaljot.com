"use server";

import { UserDetails } from "@/app/upgrade/page";
// import type UserDetails from "../../app/dashboard/upgrade/page";
import { adminDb } from "@/config/warpcatch/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/warpcatch/stripe";
import getBaseUrl from "@/lib/warpcatch/getBaseUrl";

const FREE_LIMIT = 20;
const PRO_LIMIT = 100;

export async function createCheckoutSession(userDetails: UserDetails) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	let stripeCustomerId;

	const user = await adminDb.collection("users").doc(userId).get();
	stripeCustomerId = user.data()?.stripeCustomerId;

	if (!stripeCustomerId) {
		const customer = await stripe.customers.create({
			email: userDetails.email,
			name: userDetails.name,
			metadata: {
				userId,
			},
		});

		await adminDb.collection("users").doc(userId).set({
			stripeCustomerId: customer.id,
		});

		stripeCustomerId = customer.id;
	}

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price: process.env.STRIPE_PRICE_ID_WARPCATCH,
				quantity: 1,
			},
		],
		mode: "subscription",
		customer: stripeCustomerId,
		success_url: `${getBaseUrl()}/warpcatch/dashboard?upgrade=true`,
		cancel_url: `${getBaseUrl()}/warpcatch/upgrade`,
	});

	return session.id;
}
