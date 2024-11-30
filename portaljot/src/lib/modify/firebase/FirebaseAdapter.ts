import {
	runTransaction,
	collection,
	query,
	getDocs,
	where,
	limit,
	doc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	Firestore,
	FirestoreDataConverter,
	DocumentData,
	QueryDocumentSnapshot,
	SnapshotOptions,
} from "firebase/firestore";

import type {
	Adapter,
	AdapterAccount,
	AdapterSession,
	AdapterUser,
	VerificationToken,
} from "next-auth/adapters";

export interface ObinsunUser extends AdapterUser {
	connections?: string[];
}

export const collections = {
	Users: "users",
	Sessions: "sessions",
	Accounts: "accounts",
	VerificationTokens: "verificationTokens",
} as const;

export const format: FirestoreDataConverter<DocumentData> = {
	toFirestore(object: DocumentData): DocumentData {
		const newObject: DocumentData = {};
		for (const key in object) {
			const value = object[key];
			if (value !== undefined) {
				newObject[key] = value;
			}
		}
		return newObject;
	},
	fromFirestore(
		snapshot: QueryDocumentSnapshot<DocumentData>,
		options?: SnapshotOptions
	): DocumentData {
		if (!snapshot.exists()) return {};
		const data = snapshot.data(options);
		return Object.entries(data).reduce(
			(acc: DocumentData, [key, value]) => {
				acc[key] =
					value && typeof value.toDate === "function"
						? value.toDate()
						: value;
				return acc;
			},
			{ ...data, id: snapshot.id }
		);
	},
};

export interface FirebaseClient {
	db: Firestore;
}

export function FirebaseAdapter(client: FirebaseClient): Adapter {
	const { db } = client;

	const Users = collection(db, collections.Users).withConverter<AdapterUser>(
		format as FirestoreDataConverter<AdapterUser>
	);

	const Sessions = collection(
		db,
		collections.Sessions
	).withConverter<AdapterSession>(
		format as FirestoreDataConverter<AdapterSession>
	);

	const Accounts = collection(
		db,
		collections.Accounts
	).withConverter<AdapterAccount>(
		format as FirestoreDataConverter<AdapterAccount>
	);

	const VerificationTokens = collection(
		db,
		collections.VerificationTokens
	).withConverter<VerificationToken>(
		format as FirestoreDataConverter<VerificationToken>
	);

	return {
		async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
			const docRef = await addDoc(Users, user);
			return { ...user, id: docRef.id };
		},
		async getUser(id: string): Promise<AdapterUser | null> {
			const userDoc = await getDoc(doc(Users, id));
			return userDoc.exists() ? (userDoc.data() as AdapterUser) : null;
		},
		async getUserByEmail(email: string): Promise<AdapterUser | null> {
			const userQuery = query(
				Users,
				where("email", "==", email),
				limit(1)
			);
			const userDocs = await getDocs(userQuery);
			return userDocs.empty
				? null
				: (userDocs.docs[0].data() as AdapterUser);
		},
		async getUserByAccount({
			provider,
			providerAccountId,
		}: {
			provider: string;
			providerAccountId: string;
		}): Promise<AdapterUser | null> {
			const accountQuery = query(
				Accounts,
				where("provider", "==", provider),
				where("providerAccountId", "==", providerAccountId),
				limit(1)
			);
			const accountDocs = await getDocs(accountQuery);
			if (accountDocs.empty) return null;
			const userDoc = await getDoc(
				doc(Users, accountDocs.docs[0].data().userId)
			);
			return userDoc.exists() ? (userDoc.data() as AdapterUser) : null;
		},

		async updateUser(
			partialUser: Partial<AdapterUser> & { id: string }
		): Promise<AdapterUser> {
			const userRef = doc(Users, partialUser.id);
			await updateDoc(userRef, partialUser);
			const updatedDoc = await getDoc(userRef);
			return updatedDoc.data() as AdapterUser;
		},

		async deleteUser(userId: string): Promise<void> {
			const userDoc = doc(Users, userId);
			const accountsQuery = query(
				Accounts,
				where("userId", "==", userId)
			);
			const sessionsQuery = query(
				Sessions,
				where("userId", "==", userId)
			);

			await runTransaction(db, async (transaction) => {
				transaction.delete(userDoc);
				const accounts = await getDocs(accountsQuery);
				accounts.forEach((account) => transaction.delete(account.ref));
				const sessions = await getDocs(sessionsQuery);
				sessions.forEach((session) => transaction.delete(session.ref));
			});
		},

		async linkAccount(account: AdapterAccount): Promise<void> {
			await addDoc(Accounts, account);
		},

		async unlinkAccount({
			provider,
			providerAccountId,
		}: {
			provider: string;
			providerAccountId: string;
		}): Promise<void> {
			const accountQuery = query(
				Accounts,
				where("provider", "==", provider),
				where("providerAccountId", "==", providerAccountId),
				limit(1)
			);
			const accounts = await getDocs(accountQuery);
			if (!accounts.empty) {
				await deleteDoc(accounts.docs[0].ref);
			}
		},

		async createSession(session: AdapterSession): Promise<AdapterSession> {
			await addDoc(Sessions, session);
			return session;
		},

		async getSessionAndUser(
			sessionToken: string
		): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
			const sessionQuery = query(
				Sessions,
				where("sessionToken", "==", sessionToken),
				limit(1)
			);
			const sessionDocs = await getDocs(sessionQuery);
			if (sessionDocs.empty) return null;
			const session = sessionDocs.docs[0].data() as AdapterSession;
			const userDoc = await getDoc(doc(Users, session.userId));
			if (!userDoc.exists()) return null;
			const user = userDoc.data() as AdapterUser;
			return { session, user };
		},

		async updateSession(
			partialSession: Partial<AdapterSession> & { sessionToken: string }
		): Promise<AdapterSession | null> {
			const sessionQuery = query(
				Sessions,
				where("sessionToken", "==", partialSession.sessionToken),
				limit(1)
			);
			const sessionDocs = await getDocs(sessionQuery);
			if (sessionDocs.empty) return null;
			const sessionRef = sessionDocs.docs[0].ref;
			await updateDoc(sessionRef, partialSession);
			const updatedDoc = await getDoc(sessionRef);
			return updatedDoc.data() as AdapterSession;
		},

		async deleteSession(sessionToken: string): Promise<void> {
			const sessionQuery = query(
				Sessions,
				where("sessionToken", "==", sessionToken),
				limit(1)
			);
			const sessionDocs = await getDocs(sessionQuery);
			if (!sessionDocs.empty) {
				await deleteDoc(sessionDocs.docs[0].ref);
			}
		},

		async createVerificationToken(
			verificationToken: VerificationToken
		): Promise<VerificationToken> {
			await addDoc(VerificationTokens, verificationToken);
			return verificationToken;
		},

		async useVerificationToken({
			identifier,
			token,
		}: {
			identifier: string;
			token: string;
		}): Promise<VerificationToken | null> {
			const verificationTokensQuery = query(
				VerificationTokens,
				where("identifier", "==", identifier),
				where("token", "==", token),
				limit(1)
			);
			const verificationTokenDocs = await getDocs(
				verificationTokensQuery
			);
			if (verificationTokenDocs.empty) return null;
			const verificationToken =
				verificationTokenDocs.docs[0].data() as VerificationToken;
			await deleteDoc(verificationTokenDocs.docs[0].ref);
			return verificationToken;
		},
	};
}

export interface FirestoreExtension {
	FirebaseAdapter(client: FirebaseClient): Adapter;
}
