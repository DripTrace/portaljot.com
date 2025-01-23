"use server";
import Stripe from "stripe";
import { db } from "@/utils/nexusconjure/db";
import { stripe } from ".";

export const subscriptionCreated = async (
	subscription: Stripe.Subscription,
	customerId: string
) => {
	try {
		const agency = await db.agency.findFirst({
			where: {
				customerId,
			},
			include: {
				SubAccount: true,
			},
		});
		if (!agency) {
			throw new Error(
				"Could not find and agency to upsert the subscription"
			);
		}

		const data = {
			active: subscription.status === "active",
			agencyId: agency.id,
			customerId,
			currentPeriodEndDate: new Date(
				subscription.current_period_end * 1000
			),
			//@ts-ignore
			priceId: subscription.plan.id,
			subscritiptionId: subscription.id,
			//@ts-ignore
			plan: subscription.plan.id,
		};

		const res = await db.subscription.upsert({
			where: {
				agencyId: agency.id,
			},
			create: data,
			update: data,
		});
		console.log(`🟢 Created Subscription for ${subscription.id}`);
	} catch (error) {
		console.log("🔴 Error from Create action", error);
	}
};

export const getConnectAccountProducts = async (stripeAccount: string) => {
	const products = await stripe.products.list(
		{
			limit: 50,
			expand: ["data.default_price"],
		},
		{
			stripeAccount,
		}
	);
	return products.data;
};

// export async function getPrices(): Promise<Price[]> {
// 	const prices = await stripe.prices.list({
// 		product: process.env.NEXT_NEXUSCONJURE_PRODUCT_ID,
// 		active: true,
// 	});
// 	return prices.data.map((price) => ({
// 		id: price.id,
// 		nickname: price.nickname,
// 		unit_amount: price.unit_amount,
// 		recurring: price.recurring
// 			? { interval: price.recurring.interval }
// 			: null,
// 	}));
// }
