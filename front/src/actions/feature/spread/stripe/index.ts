"use server";

import { prisma as client } from "@/lib/client/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import Stripe from "stripe";
import { SUBSCRIPTION_PLAN } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_SPREAD || "", {
	apiVersion: "2024-12-18.acacia",
});

const MINIMUM_AMOUNT = 50; // 50 cents

/**
 * Creates a PaymentIntent for a connected Stripe account.
 */
export const onCreateCustomerPaymentIntentSecret = async (
	amount: number,
	stripeId: string
) => {
	if (amount * 100 < MINIMUM_AMOUNT) {
		throw new Error("Amount must be at least $0.50 (50 cents).");
	}
	try {
		const paymentIntent = await stripe.paymentIntents.create(
			{
				currency: "usd",
				amount: Math.round(amount * 100),
				automatic_payment_methods: { enabled: true },
			},
			{ stripeAccount: stripeId }
		);
		if (paymentIntent) {
			return { secret: paymentIntent.client_secret };
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Updates the user's subscription plan (STANDARD, PRO, ULTIMATE).
 */
export const onUpdateSubscription = async (plan: SUBSCRIPTION_PLAN) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return;

		const credits =
			plan === SUBSCRIPTION_PLAN.PRO
				? 50
				: plan === SUBSCRIPTION_PLAN.ULTIMATE
					? 500
					: 10;

		const updatedUser = await client.user.update({
			where: { id: session.user.id },
			data: {
				subscription: {
					update: {
						plan, // Using enum
						credits,
					},
				},
			},
			select: {
				subscription: {
					select: { plan: true },
				},
			},
		});
		if (updatedUser) {
			return {
				status: 200,
				message: "Subscription updated",
				plan: updatedUser.subscription?.plan,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Helper to map plan string to a dollar (in cents) amount.
 */
function setPlanAmount(item: SUBSCRIPTION_PLAN) {
	if (item === SUBSCRIPTION_PLAN.PRO) return 1500; // $15
	if (item === SUBSCRIPTION_PLAN.ULTIMATE) return 3500; // $35
	return 0; // STANDARD is $0
}

/**
 * Creates a PaymentIntent for upgrading the user’s plan.
 */
export const onGetStripeClientSecret = async (plan: SUBSCRIPTION_PLAN) => {
	const amount = setPlanAmount(plan);
	console.log(`Calculated amount for ${plan}: ${amount}`);
	if (amount < MINIMUM_AMOUNT && plan !== SUBSCRIPTION_PLAN.STANDARD) {
		// If plan is not standard but below minimum, throw
		throw new Error("Amount must be at least $0.50 (50 cents).");
	}
	if (plan === SUBSCRIPTION_PLAN.STANDARD) {
		// free plan => no payment needed
		return { secret: null };
	}
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			currency: "usd",
			amount, // in cents
			automatic_payment_methods: { enabled: true },
		});
		if (paymentIntent) {
			return { secret: paymentIntent.client_secret };
		}
	} catch (error) {
		console.log(error);
	}
};
