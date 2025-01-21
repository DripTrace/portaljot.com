// import { db } from "@/firebase";

// import {
// 	DocumentData,
// 	FirestoreDataConverter,
// 	QueryDocumentSnapshot,
// 	SnapshotOptions,
// 	collection,
// 	doc,
// 	query,
// 	where,
// } from "firebase/firestore";
// import { User } from "next-auth";

// const userConverter: FirestoreDataConverter<User> = {
// 	toFirestore: function (customer: User): DocumentData {
// 		return {
// 			email: customer.email,
// 			image: customer.image,
// 			name: customer.name,
// 		};
// 	},
// 	fromFirestore: function (
// 		snapshot: QueryDocumentSnapshot,
// 		options: SnapshotOptions
// 	): User {
// 		const data = snapshot.data(options);

// 		return {
// 			id: snapshot.id,
// 			email: data.email,
// 			image: data.image,
// 			name: data.name,
// 		};
// 	},
// };

// export const getUserByEmailRef = (email: string) =>
// 	query(collection(db, "users"), where("email", "==", email)).withConverter(
// 		userConverter
// 	);

import { prisma } from "@/lib/client/prisma";
import { User as NextAuthUser } from "next-auth"; // Import NextAuth's User type

/**
 * Fetch a user by their email address from the Prisma database.
 * Returns a NextAuth-compatible user object, or null if not found.
 */
export async function getUserByEmailRef(
	email: string
): Promise<NextAuthUser | null> {
	// Query your "User" table in Prisma
	const userRecord = await prisma.user.findUnique({
		where: { email },
	});

	if (!userRecord) {
		return null; // no user found
	}

	// Convert Prisma user record to NextAuth's User shape
	const user: NextAuthUser = {
		id: userRecord.id,
		email: userRecord.email,
		name: userRecord.name || undefined,
		image: userRecord.image || undefined,
	};

	return user;
}
