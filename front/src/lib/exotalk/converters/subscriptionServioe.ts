// import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/client/prisma";
import { Subscription } from "@/types/exotalk/Subscription";

/**
 * Create a new Subscription in the database.
 *
 * @param data - partial or full Subscription object
 */
export async function createSubscription(data: Subscription) {
	// Prisma uses 'JsonValue' for JSON fields, so we ensure proper casting for `items` and `priceIds`.
	return prisma.subscription.create({
		data: {
			stripeLink: data.stripeLink,
			quantity: data.quantity,
			status: data.status,
			cancelAtPeriodEnd: data.cancelAtPeriodEnd,

			// JSON fields
			metadata: data.metadata ? data.metadata : {},
			items: JSON.parse(JSON.stringify(data.items || [])),
			priceIds: data.priceIds || [],

			// Relations by ID
			productId: data.productId,
			priceId: data.priceId,

			// Optional fields
			paymentMethod: data.paymentMethod || null,
			latestInvoice: data.latestInvoice || null,

			// Dates
			created: data.created,
			currentPeriodStart: data.currentPeriodStart,
			currentPeriodEnd: data.currentPeriodEnd,
			endedAt: data.endedAt || null,
			cancelAt: data.cancelAt || null,
			canceledAt: data.canceledAt || null,
			trialStart: data.trialStart || null,
			trialEnd: data.trialEnd || null,
		},
	});
}

/**
 * Fetch a Subscription by its ID.
 *
 * @param id - The `Subscription.id` field
 */
export async function getSubscriptionById(id: string) {
	return prisma.subscription.findUnique({
		where: { id },
		include: {
			product: true, // if you want to load the Product relation
			price: true, // if you want to load the Price relation
		},
	});
}

/**
 * Update a Subscription. This can handle partial updates.
 *
 * @param id   - The ID of the subscription to update
 * @param data - Updated fields
 */
export async function updateSubscription(
	id: string,
	data: Partial<Subscription>
) {
	const updateData = {
		...(data.metadata && { metadata: data.metadata }),
		...(data.stripeLink && { stripeLink: data.stripeLink }),
		...(data.quantity !== undefined && { quantity: data.quantity }),
		...(data.items && { items: JSON.parse(JSON.stringify(data.items)) }),
		...(data.paymentMethod !== undefined && {
			paymentMethod: data.paymentMethod,
		}),
		...(data.latestInvoice !== undefined && {
			latestInvoice: data.latestInvoice,
		}),
		...(data.status && { status: data.status }),
		...(data.cancelAtPeriodEnd !== undefined && {
			cancelAtPeriodEnd: data.cancelAtPeriodEnd,
		}),
		...(data.currentPeriodStart && {
			currentPeriodStart: data.currentPeriodStart,
		}),
		...(data.currentPeriodEnd && {
			currentPeriodEnd: data.currentPeriodEnd,
		}),
		...(data.endedAt !== undefined && { endedAt: data.endedAt }),
		...(data.cancelAt !== undefined && { cancelAt: data.cancelAt }),
		...(data.canceledAt !== undefined && { canceledAt: data.canceledAt }),
		...(data.trialStart !== undefined && { trialStart: data.trialStart }),
		...(data.trialEnd !== undefined && { trialEnd: data.trialEnd }),
		...(data.productId && { productId: data.productId }),
		...(data.priceId && { priceId: data.priceId }),
		...(data.priceIds && { priceIds: data.priceIds }),
	};

	return prisma.subscription.update({
		where: { id },
		data: updateData,
	});
}

/**
 * Delete a Subscription by its ID.
 */
export async function deleteSubscription(id: string) {
	return prisma.subscription.delete({
		where: { id },
	});
}
