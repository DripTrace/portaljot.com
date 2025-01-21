// prismaSubscriptions.ts
import { prisma } from "@/lib/client/prisma";

// If you already have a Subscription interface in "@/types/Subscription", you can import that.
// Otherwise, define it here for completeness:
export interface Subscription {
	id?: string;
	cancel_at_period_end: boolean;
	created: Date;
	current_period_start: Date;
	items: any; // e.g. Stripe.SubscriptionItem[] (serialized as JSON in DB)
	latest_invoice?: string;
	metadata?: Record<string, any>;
	payment_method?: string;
	price: string; // Could be a foreign key (priceId) in your schema
	prices: string[]; // Possibly a JSON array of multiple price IDs
	product: string; // Could be a foreign key (productId) in your schema
	quantity: number;
	status:
		| "active"
		| "canceled"
		| "incomplete"
		| "incomplete_expired"
		| "past_due"
		| "trialing"
		| "unpaid";
	stripeLink: string;
	cancel_at?: Date | null;
	canceled_at?: Date | null;
	current_period_end: Date;
	ended_at?: Date | null;
	trial_start?: Date | null;
	trial_end?: Date | null;
	// If you need to associate a subscription to a specific user:
	userId?: string; // foreign key to your User table
}

/**
 * Get all Subscriptions for a given user ID
 * (Equivalent to Firestore's 'collection(db, "customers", userId, "subscriptions")'
 *  but now purely via Prisma.)
 */
export async function getSubscriptionsForUser(
	userId: string
): Promise<Subscription[]> {
	// You'll need a 'userId' column in your Subscription table to filter by user
	const subs = await prisma.subscription.findMany({
		where: { userId },
	});

	// The data returned by Prisma is already typed (if your schema matches).
	// Optionally, you can transform each row into your Subscription interface.
	// For example:
	return subs.map((row) => ({
		id: row.id,
		cancel_at_period_end: row.cancelAtPeriodEnd,
		created: row.created,
		current_period_start: row.currentPeriodStart,
		items: row.items,
		latest_invoice: row.latestInvoice || undefined,
		metadata:
			typeof row.metadata === "object" && row.metadata !== null
				? (row.metadata as Record<string, any>)
				: {},
		payment_method: row.paymentMethod || undefined,
		price: row.priceId, // if your schema calls the FK "priceId"
		prices: (Array.isArray(row.priceIds) ? row.priceIds : []).filter(
			(p): p is string => typeof p === "string"
		),
		product: row.productId, // if your schema calls the FK "productId"
		quantity: row.quantity,
		status: row.status as Subscription["status"], // cast if you use an enum
		stripeLink: row.stripeLink,
		cancel_at: row.cancelAt,
		canceled_at: row.canceledAt,
		current_period_end: row.currentPeriodEnd,
		ended_at: row.endedAt,
		trial_start: row.trialStart,
		trial_end: row.trialEnd,
		userId: row.userId || undefined,
	}));
}

/**
 * Create a new Subscription for a user
 */
export async function createSubscriptionForUser(
	userId: string,
	subData: Subscription
) {
	const newSub = await prisma.subscription.create({
		data: {
			userId, // link to the user
			cancelAtPeriodEnd: subData.cancel_at_period_end,
			created: subData.created,
			currentPeriodStart: subData.current_period_start,
			items: subData.items,
			latestInvoice: subData.latest_invoice || null,
			metadata: subData.metadata || {},
			paymentMethod: subData.payment_method || null,
			priceId: subData.price, // link to your Price table by ID
			priceIds: subData.prices, // store multiple price IDs as JSON
			productId: subData.product, // link to your Product table by ID
			quantity: subData.quantity,
			status: subData.status,
			stripeLink: subData.stripeLink,
			cancelAt: subData.cancel_at || null,
			canceledAt: subData.canceled_at || null,
			currentPeriodEnd: subData.current_period_end,
			endedAt: subData.ended_at || null,
			trialStart: subData.trial_start || null,
			trialEnd: subData.trial_end || null,
		},
	});

	// Convert prisma object to your Subscription interface
	return {
		id: newSub.id,
		cancel_at_period_end: newSub.cancelAtPeriodEnd,
		created: newSub.created,
		current_period_start: newSub.currentPeriodStart,
		items: newSub.items,
		latest_invoice: newSub.latestInvoice || undefined,
		metadata: newSub.metadata || {},
		payment_method: newSub.paymentMethod || undefined,
		price: newSub.priceId,
		prices: newSub.priceIds || [],
		product: newSub.productId,
		quantity: newSub.quantity,
		status: newSub.status as Subscription["status"],
		stripeLink: newSub.stripeLink,
		cancel_at: newSub.cancelAt,
		canceled_at: newSub.canceledAt,
		current_period_end: newSub.currentPeriodEnd,
		ended_at: newSub.endedAt,
		trial_start: newSub.trialStart,
		trial_end: newSub.trialEnd,
		userId: newSub.userId || undefined,
	};
}

/**
 * Update an existing Subscription
 */
export async function updateSubscription(
	subscriptionId: string,
	updates: Partial<Subscription>
) {
	const updated = await prisma.subscription.update({
		where: { id: subscriptionId },
		data: {
			...(updates.cancel_at_period_end !== undefined && {
				cancelAtPeriodEnd: updates.cancel_at_period_end,
			}),
			...(updates.created && { created: updates.created }),
			...(updates.current_period_start && {
				currentPeriodStart: updates.current_period_start,
			}),
			...(updates.items && { items: updates.items }),
			...(updates.latest_invoice !== undefined && {
				latestInvoice: updates.latest_invoice,
			}),
			...(updates.metadata && { metadata: updates.metadata }),
			...(updates.payment_method !== undefined && {
				paymentMethod: updates.payment_method,
			}),
			...(updates.price && { priceId: updates.price }),
			...(updates.prices && { priceIds: updates.prices }),
			...(updates.product && { productId: updates.product }),
			...(updates.quantity !== undefined && {
				quantity: updates.quantity,
			}),
			...(updates.status && { status: updates.status }),
			...(updates.stripeLink && { stripeLink: updates.stripeLink }),
			...(updates.cancel_at !== undefined && {
				cancelAt: updates.cancel_at,
			}),
			...(updates.canceled_at !== undefined && {
				canceledAt: updates.canceled_at,
			}),
			...(updates.current_period_end && {
				currentPeriodEnd: updates.current_period_end,
			}),
			...(updates.ended_at !== undefined && {
				endedAt: updates.ended_at,
			}),
			...(updates.trial_start !== undefined && {
				trialStart: updates.trial_start,
			}),
			...(updates.trial_end !== undefined && {
				trialEnd: updates.trial_end,
			}),
			...(updates.userId && { userId: updates.userId }),
		},
	});

	// Return in Subscription form
	return {
		id: updated.id,
		cancel_at_period_end: updated.cancelAtPeriodEnd,
		created: updated.created,
		current_period_start: updated.currentPeriodStart,
		items: updated.items,
		latest_invoice: updated.latestInvoice || undefined,
		metadata: updated.metadata || {},
		payment_method: updated.paymentMethod || undefined,
		price: updated.priceId,
		prices: updated.priceIds || [],
		product: updated.productId,
		quantity: updated.quantity,
		status: updated.status as Subscription["status"],
		stripeLink: updated.stripeLink,
		cancel_at: updated.cancelAt,
		canceled_at: updated.canceledAt,
		current_period_end: updated.currentPeriodEnd,
		ended_at: updated.endedAt,
		trial_start: updated.trialStart,
		trial_end: updated.trialEnd,
		userId: updated.userId || undefined,
	};
}

/**
 * Delete a Subscription
 */
export async function deleteSubscription(subscriptionId: string) {
	return prisma.subscription.delete({
		where: { id: subscriptionId },
	});
}
