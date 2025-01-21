// import { db } from "@/firebase";
// import {
// 	DocumentData,
// 	FirestoreDataConverter,
// 	QueryDocumentSnapshot,
// 	SnapshotOptions,
// 	doc,
// } from "firebase/firestore";

// export interface Customer {
// 	email?: string | null;
// 	stripeId: string;
// 	stripeLink: string;
// }

// const customerConverter: FirestoreDataConverter<Customer> = {
// 	toFirestore: function (customer: Customer): DocumentData {
// 		return {
// 			email: customer.email,
// 			stripeId: customer.stripeId,
// 			stripeLink: customer.stripeLink,
// 		};
// 	},
// 	fromFirestore: function (
// 		snapshot: QueryDocumentSnapshot,
// 		options: SnapshotOptions
// 	): Customer {
// 		const data = snapshot.data(options);

// 		return {
// 			email: data.email,
// 			stripeId: data.stripeId,
// 			stripeLink: data.stripeLink,
// 		};
// 	},
// };

// export const customerRef = (userId: string) =>
// 	doc(db, "customers", userId).withConverter(customerConverter);

import { prisma } from "@/lib/client/prisma";

// Update the Customer interface to match your Prisma schema
export interface Customer {
	userId: string;
	stripeId: string;
	stripeLink: string;
}

/**
 * Fetches a Customer record by userId (the primary key).
 * Equivalent to doc(db, "customers", userId) in Firestore.
 */
export async function getCustomerRef(userId: string): Promise<Customer | null> {
	const record = await prisma.customer.findUnique({
		where: { userId },
	});

	if (!record) {
		return null;
	}

	// Update the return object to match
	return {
		stripeId: record.stripeId,
		stripeLink: record.stripeLink,
		userId: record.userId,
	};
}

/**
 * Creates or updates (upserts) a Customer record by userId.
 * Equivalent to setDoc(doc(db, "customers", userId), {...}) in Firestore.
 */
export async function setCustomerRef(
	userId: string,
	customer: Customer
): Promise<Customer> {
	// upsert: if a record with userId exists, update it; otherwise create new
	const record = await prisma.customer.upsert({
		where: { userId },
		update: {
			stripeId: customer.stripeId,
			stripeLink: customer.stripeLink,
		},
		create: {
			userId,
			stripeId: customer.stripeId,
			stripeLink: customer.stripeLink,
		},
	});

	return {
		userId: record.userId,
		stripeId: record.stripeId,
		stripeLink: record.stripeLink,
	};
}
