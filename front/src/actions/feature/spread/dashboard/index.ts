"use server";

import { prisma as client } from "@/lib/client/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_SPREAD || "", {
	apiVersion: "2024-12-18.acacia",
});

/**
 * Gets the total number of clients (customers) for the authenticated user.
 */
export const getUserClients = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return 0;

		// Count all customers where the domain belongs to the current user
		const clients = await client.customer.count({
			where: {
				Domain: {
					userId: session.user.id,
				},
			},
		});
		return clients || 0;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves the user's Stripe balance if they've connected their Stripe account.
 */
export const getUserBalance = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		// Find the user's stripeId in your DB
		const connectedStripe = await client.user.findUnique({
			where: { id: session.user.id },
			select: { stripeId: true },
		});
		if (connectedStripe?.stripeId) {
			const transactions = await stripe.balance.retrieve({
				stripeAccount: connectedStripe.stripeId,
			});
			if (transactions) {
				const sales = transactions.pending.reduce(
					(sum, item) => sum + item.amount,
					0
				);
				return sales / 100; // Convert cents to dollars
			}
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves plan info, credits, domain count, and client count for the authenticated user.
 */
export const getUserPlanInfo = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		const planData = await client.user.findUnique({
			where: { id: session.user.id },
			select: {
				_count: {
					select: {
						domains: true,
					},
				},
				subscription: {
					select: {
						plan: true,
						credits: true,
						clients: true,
					},
				},
			},
		});
		if (planData) {
			return {
				plan: planData.subscription?.plan,
				credits: planData.subscription?.credits || 0,
				domains: planData._count.domains,
				clients: planData.subscription?.clients || 0,
			};
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves the sum of all product prices for the authenticated user.
 */
export const getUserTotalProductPrices = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return 0;

		const products = await client.product.findMany({
			where: {
				Domain: {
					userId: session.user.id,
				},
			},
			select: {
				price: true,
			},
		});
		if (products) {
			return products.reduce((acc, p) => acc + p.price, 0);
		}
		return 0;
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves user transactions from Stripe if the user has a connected Stripe ID.
 */
export const getUserTransactions = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) return null;

		const connectedStripe = await client.user.findUnique({
			where: { id: session.user.id },
			select: { stripeId: true },
		});
		if (connectedStripe?.stripeId) {
			const transactions = await stripe.charges.list({
				stripeAccount: connectedStripe.stripeId,
			});
			return transactions;
		}
	} catch (error) {
		console.log(error);
	}
};
