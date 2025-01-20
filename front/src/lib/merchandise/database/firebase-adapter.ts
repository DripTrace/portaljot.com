// import {
//     runTransaction,
//     collection,
//     query,
//     getDocs,
//     where,
//     limit,
//     doc,
//     getDoc,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     Firestore,
//     FirestoreDataConverter,
// } from "firebase/firestore";

// import type { Account, Awaitable } from "next-auth";

// import type {
//     Adapter,
//     AdapterAccount,
//     AdapterSession,
//     AdapterUser,
//     VerificationToken,
// } from "next-auth/adapters";

// export interface ObinsunUser extends AdapterUser {
//     connections?: string[];
// }

// export const collections = {
//     Users: "users",
//     Sessions: "sessions",
//     Accounts: "accounts",
//     VerificationTokens: "verificationTokens",
// } as const;

// export const format: FirestoreDataConverter<any> = {
//     toFirestore(object) {
//         const newObjectobject: any = {};
//         for (const key in object) {
//             const value = object[key];
//             if (value === undefined) continue;
//             newObjectobject[key] = value;
//         }
//         return newObjectobject;
//     },
//     fromFirestore(snapshot) {
//         if (!snapshot.exists()) return null;
//         const newUser: any = { ...snapshot.data(), id: snapshot.id };
//         for (const key in newUser) {
//             const value = newUser[key];
//             if (value?.toDate) newUser[key] = value.toDate();
//             else newUser[key] = value;
//         }
//         return newUser;
//     },
// };

// export interface FirebaseClient {
//     db: Firestore;
// }

// export function FirebaseAdapter(client: FirebaseClient): Adapter {
//     const { db } = client;

//     const Users = collection(db, collections.Users).withConverter<AdapterUser>(
//         format
//     );

//     const Sessions = collection(
//         db,
//         collections.Sessions
//     ).withConverter<AdapterSession>(format);

//     const Accounts = collection(
//         db,
//         collections.Accounts
//     ).withConverter<Account>(format);

//     const VerificationTokens = collection(
//         db,
//         collections.VerificationTokens
//     ).withConverter<VerificationToken>(format);

//     return {
//         async createUser(user: Omit<AdapterUser, "id">) {
//             const { id } = await addDoc(Users, user);
//             return { ...user, id };
//         },
//         async getUser(id: string) {
//             const userDoc = await getDoc(doc(Users, id));
//             return userDoc.exists() ? (Users.converter!.fromFirestore(userDoc) as AdapterUser) : null;
//         },
//         async getUserByEmail(email: string) {
//             const userQuery = query(
//                 Users,
//                 where("email", "==", email),
//                 limit(1)
//             );
//             const userDocs = await getDocs(userQuery);
//             return userDocs.empty ? null : (Users.converter!.fromFirestore(userDocs.docs[0]) as AdapterUser);
//         },
//         async getUserByAccount({ provider, providerAccountId }: Pick<AdapterAccount, "provider" | "providerAccountId">) {
//             const accountQuery = query(
//                 Accounts,
//                 where("provider", "==", provider),
//                 where("providerAccountId", "==", providerAccountId),
//                 limit(1)
//             );
//             const accountDocs = await getDocs(accountQuery);
//             if (accountDocs.empty) return null;
//             const account = Accounts.converter!.fromFirestore(accountDocs.docs[0]) as AdapterAccount;
//             if (!account) return null;
//             const userDoc = await getDoc(doc(Users, account.userId));
//             return userDoc.exists() ? (Users.converter!.fromFirestore(userDoc) as AdapterUser) : null;
//         },

//         async updateUser(partialUser) {
//             await updateDoc(doc(Users, partialUser.id), partialUser as any);
//             const userDoc = await getDoc(doc(Users, partialUser.id));
//             return Users.converter!.fromFirestore(userDoc as any)!;
//         },

//         async deleteUser(userId) {
//             const userDoc = doc(Users, userId);
//             const accountsQuery = query(
//                 Accounts,
//                 where("userId", "==", userId)
//             );
//             const sessionsQuery = query(
//                 Sessions,
//                 where("userId", "==", userId)
//             );

//             await runTransaction(db, async (transaction) => {
//                 transaction.delete(userDoc);
//                 const accounts = await getDocs(accountsQuery);
//                 accounts.forEach((account) => transaction.delete(account.ref));

//                 const sessions = await getDocs(sessionsQuery);
//                 sessions.forEach((session) => transaction.delete(session.ref));
//             });
//         },

//         async linkAccount(account) {
//             const { id } = await addDoc(Accounts, account);
//             return { ...account, id };
//         },

//         async unlinkAccount({ provider, providerAccountId }) {
//             const accountQuery = query(
//                 Accounts,
//                 where("provider", "==", provider),
//                 where("providerAccountId", "==", providerAccountId),
//                 limit(1)
//             );
//             const accounts = await getDocs(accountQuery);
//             if (accounts.empty) return;
//             await deleteDoc(accounts.docs[0].ref);
//         },

//         async createSession(session) {
//             const { id } = await addDoc(Sessions, session);
//             return { ...session, id };
//         },

//         async getSessionAndUser(sessionToken) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return null;
//             const session = Sessions.converter!.fromFirestore(
//                 sessionDocs.docs[0]
//             );
//             if (!session) return null;

//             const userDoc = await getDoc(doc(Users, session.userId));
//             if (!userDoc.exists()) return null;
//             const user = Users.converter!.fromFirestore(userDoc)!;
//             return { session, user };
//         },

//         async updateSession(partialSession) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", partialSession.sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return null;
//             await updateDoc(sessionDocs.docs[0].ref, partialSession);
//         },

//         async deleteSession(sessionToken) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return;
//             await deleteDoc(sessionDocs.docs[0].ref);
//         },

//         async createVerificationToken(verificationToken) {
//             await addDoc(VerificationTokens, verificationToken);
//             return verificationToken;
//         },

//         async useVerificationToken({ identifier, token }) {
//             const verificationTokensQuery = query(
//                 VerificationTokens,
//                 where("identifier", "==", identifier),
//                 where("token", "==", token),
//                 limit(1)
//             );
//             const verificationTokenDocs = await getDocs(
//                 verificationTokensQuery
//             );
//             if (verificationTokenDocs.empty) return null;

//             await deleteDoc(verificationTokenDocs.docs[0].ref);

//             const verificationToken =
//                 VerificationTokens.converter!.fromFirestore(
//                     verificationTokenDocs.docs[0]
//                 );
//             // @ts-expect-error
//             delete verificationToken.id;
//             return verificationToken;
//         },
//     };
// }

// export interface FirestoreExtension {
//     FirebaseAdapter(client: FirebaseClient): Adapter;
// }

// import {
//     runTransaction,
//     collection,
//     query,
//     getDocs,
//     where,
//     limit,
//     doc,
//     getDoc,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     Firestore,
//     FirestoreDataConverter,
//     DocumentData,
//     WithFieldValue,
//     SnapshotOptions
// } from "firebase/firestore";

// import type { Account, Awaitable, User } from "next-auth";

// import type {
//     Adapter,
//     AdapterSession,
//     AdapterUser,
//     VerificationToken,
//     AdapterAccount,
// } from "next-auth/adapters";
// import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

// type FirestoreAdapterType = AdapterUser | AdapterSession | AdapterAccount | VerificationToken;

// export interface ObinsunUser extends AdapterUser {
//     connections?: string[];
// }

// export const collections = {
//     Users: "users",
//     Sessions: "sessions",
//     Accounts: "accounts",
//     VerificationTokens: "verificationTokens",
// } as const;

// export const format: FirestoreDataConverter<FirestoreAdapterType> = {
//     toFirestore(object: WithFieldValue<FirestoreAdapterType>): DocumentData {
//         const newObject: Record<string, unknown> = {};
//         Object.entries(object).forEach(([key, value]) => {
//             if (value !== undefined) {
//                 newObject[key] = value;
//             }
//         });
//         return newObject;
//     },
//     fromFirestore(
//         snapshot: DocumentSnapshot | QueryDocumentSnapshot,
//         options?: SnapshotOptions
//     ): FirestoreAdapterType {
//         if (!snapshot.exists()) {
//             throw new Error("Document does not exist");
//         }
//         return snapshot.data(options) as FirestoreAdapterType;
//     }
// };

// export interface FirebaseClient {
//     db: Firestore;
// }

// export function FirebaseAdapter(client: FirebaseClient): Adapter {
//     const { db } = client;

//     const Users = collection(db, collections.Users).withConverter<AdapterUser>({
//         toFirestore: (user: AdapterUser) => ({ ...user }),
//         fromFirestore: (snapshot, options) => {
//             const data = snapshot.data(options);
//             return data as AdapterUser;
//         }
//     });

//     const Sessions = collection(
//         db,
//         collections.Sessions
//     ).withConverter<AdapterSession>({
//         toFirestore: (data) => format.toFirestore(data as FirestoreAdapterType),
//         fromFirestore: (snapshot, options) => format.fromFirestore(snapshot, options) as AdapterSession
//     });

//     const Accounts = collection(
//         db,
//         collections.Accounts
//     ).withConverter<FirestoreAdapterType>(format);

//     const VerificationTokens = collection(
//         db,
//         collections.VerificationTokens
//     ).withConverter<VerificationToken>({
//         toFirestore: (token) => token,
//         fromFirestore: (snapshot, options) => snapshot.data(options) as VerificationToken
//     });

//     return {
//         async createUser(user: Omit<AdapterUser, "id">) {
//             const { id } = await addDoc(Users, user);
//             return { ...user, id };
//         },
//         async getUser(id: string) {
//             const userDoc = await getDoc(doc(Users, id));
//             return format.fromFirestore(userDoc.data() as DocumentData) as AdapterUser;
//         },
//         async getUserById(id: string) {
//             const userDoc = await getDoc(doc(Users, id));
//             return userDoc.exists() ? format.fromFirestore(userDoc) as AdapterUser : null;
//         },
//         async getUserByEmail(email: string) {
//             const userQuery = query(
//                 Users,
//                 where("email", "==", email),
//                 limit(1)
//             );
//             const userDocs = await getDocs(userQuery);
//             return userDocs.empty ? null : (format.fromFirestore(userDocs.docs[0]) as AdapterUser);
//         },
//         async getUserByAccount({ provider, providerAccountId }: Pick<AdapterAccount, "provider" | "providerAccountId">) {
//             const accountQuery = query(
//                 Accounts,
//                 where("provider", "==", provider),
//                 where("providerAccountId", "==", providerAccountId),
//                 limit(1)
//             );
//             const accountDocs = await getDocs(accountQuery);
//             if (accountDocs.empty) return null;
//             const account = format.fromFirestore(accountDocs.docs[0]) as AdapterAccount;
//             if (!account) return null;
//             const userDoc = await getDoc(doc(Users, account.userId));
//             return userDoc.exists() ? (format.fromFirestore(userDoc) as AdapterUser) : null;
//         },

//         async updateUser(partialUser: Partial<AdapterUser> & { id: string }) {
//             const { id, ...updateData } = partialUser;
//             await updateDoc(doc(Users, id), updateData);
//             const userDoc = await getDoc(doc(Users, id));
//             return format.fromFirestore(userDoc) as AdapterUser;
//         },

//         async deleteUser(userId) {
//             const userDoc = doc(Users, userId);
//             const accountsQuery = query(
//                 Accounts,
//                 where("userId", "==", userId)
//             );
//             const sessionsQuery = query(
//                 Sessions,
//                 where("userId", "==", userId)
//             );

//             await runTransaction(db, async (transaction) => {
//                 transaction.delete(userDoc);
//                 const accounts = await getDocs(accountsQuery);
//                 accounts.forEach((account) => transaction.delete(account.ref));

//                 const sessions = await getDocs(sessionsQuery);
//                 sessions.forEach((session) => transaction.delete(session.ref));
//             });
//         },

//         async linkAccount(account) {
//             const { id } = await addDoc(Accounts, account);
//             return { ...account, id };
//         },

//         async unlinkAccount({ provider, providerAccountId }) {
//             const accountQuery = query(
//                 Accounts,
//                 where("provider", "==", provider),
//                 where("providerAccountId", "==", providerAccountId),
//                 limit(1)
//             );
//             const accounts = await getDocs(accountQuery);
//             if (accounts.empty) return;
//             await deleteDoc(accounts.docs[0].ref);
//         },

//         async createSession(session) {
//             const { id } = await addDoc(Sessions, session);
//             return { ...session, id };
//         },

//         async getSessionAndUser(sessionToken) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return null;
//             const session = Sessions.converter!.fromFirestore(
//                 sessionDocs.docs[0]
//             );
//             if (!session) return null;

//             const userDoc = await getDoc(doc(Users, session.userId));
//             if (!userDoc.exists()) return null;
//             const user = Users.converter!.fromFirestore(userDoc)!;
//             return { session, user };
//         },

//         async updateSession(partialSession) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", partialSession.sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return null;
//             await updateDoc(sessionDocs.docs[0].ref, partialSession);
//         },

//         async deleteSession(sessionToken) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return;
//             await deleteDoc(sessionDocs.docs[0].ref);
//         },

//         async createVerificationToken(verificationToken) {
//             await addDoc(VerificationTokens, verificationToken);
//             return verificationToken;
//         },

//         async useVerificationToken({ identifier, token }) {
//             const verificationTokensQuery = query(
//                 VerificationTokens,
//                 where("identifier", "==", identifier),
//                 where("token", "==", token),
//                 limit(1)
//             );
//             const verificationTokenDocs = await getDocs(
//                 verificationTokensQuery
//             );
//             if (verificationTokenDocs.empty) return null;

//             await deleteDoc(verificationTokenDocs.docs[0].ref);

//             const verificationToken =
//                 VerificationTokens.converter!.fromFirestore(
//                     verificationTokenDocs.docs[0]
//                 );
//             const { id: _, ...tokenWithoutId } = verificationToken as { id: string } & VerificationToken;
//             return tokenWithoutId;
//         },
//     };
// }

// export interface FirestoreExtension {
//     FirebaseAdapter(client: FirebaseClient): Adapter;
// }

// // Add this type guard function
// function isQueryDocumentSnapshot(doc: DocumentSnapshot): doc is QueryDocumentSnapshot {
//     return (doc as QueryDocumentSnapshot).data !== undefined;
// }

// import {
//     runTransaction,
//     collection,
//     query,
//     getDocs,
//     where,
//     limit,
//     doc,
//     getDoc,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     Firestore,
//     FirestoreDataConverter,
// } from "firebase/firestore";

// import type { Account, Awaitable } from "next-auth";

// import type {
//     Adapter,
//     AdapterSession,
//     AdapterUser,
//     VerificationToken,
// } from "next-auth/adapters";

// export interface ObinsunUser extends AdapterUser {
//     connections?: string[];
// }

// export const collections = {
//     Users: "users",
//     Sessions: "sessions",
//     Accounts: "accounts",
//     VerificationTokens: "verificationTokens",
// } as const;

// export const format: FirestoreDataConverter<any> = {
//     toFirestore(object) {
//         const newObjectobject: any = {};
//         for (const key in object) {
//             const value = object[key];
//             if (value === undefined) continue;
//             newObjectobject[key] = value;
//         }
//         return newObjectobject;
//     },
//     fromFirestore(snapshot) {
//         if (!snapshot.exists()) return null;
//         const newUser: any = { ...snapshot.data(), id: snapshot.id };
//         for (const key in newUser) {
//             const value = newUser[key];
//             if (value?.toDate) newUser[key] = value.toDate();
//             else newUser[key] = value;
//         }
//         return newUser;
//     },
// };

// export interface FirebaseClient {
//     db: Firestore;
// }

// export function FirebaseAdapter(client: FirebaseClient): Adapter {
//     const { db } = client;

//     const Users = collection(db, collections.Users).withConverter<AdapterUser>(
//         format
//     );

//     const Sessions = collection(
//         db,
//         collections.Sessions
//     ).withConverter<AdapterSession>(format);

//     const Accounts = collection(
//         db,
//         collections.Accounts
//     ).withConverter<Account>(format);

//     const VerificationTokens = collection(
//         db,
//         collections.VerificationTokens
//     ).withConverter<VerificationToken>(format);

//     return {
//         async createUser(user) {
//             const { id } = await addDoc(Users, user);
//             return { ...(user as any), id };
//         },
//         async getUser(id) {
//             const userDoc = await getDoc(doc(Users, id));
//             if (!userDoc.exists()) return null;
//             return Users.converter!.fromFirestore(userDoc);
//         },
//         async getUserByEmail(email) {
//             const userQuery = query(
//                 Users,
//                 where("email", "==", email),
//                 limit(1)
//             );
//             const userDocs = await getDocs(userQuery);
//             if (userDocs.empty) return null;
//             return Users.converter!.fromFirestore(userDocs.docs[0]);
//         },
//         async getUserByAccount({ provider, providerAccountId }) {
//             const accountQuery = query(
//                 Accounts,
//                 where("provider", "==", provider),
//                 where("providerAccountId", "==", providerAccountId),
//                 limit(1)
//             );
//             const accountDocs = await getDocs(accountQuery);
//             if (accountDocs.empty) return null;
//             const userDoc = await getDoc(
//                 doc(Users, accountDocs.docs[0].data().userId)
//             );
//             if (!userDoc.exists()) return null;
//             return Users.converter!.fromFirestore(userDoc);
//         },

//         async updateUser(partialUser) {
//             await updateDoc(doc(Users, partialUser.id), partialUser as any);
//             const userDoc = await getDoc(doc(Users, partialUser.id));
//             return Users.converter!.fromFirestore(userDoc as any)!;
//         },

//         async deleteUser(userId) {
//             const userDoc = doc(Users, userId);
//             const accountsQuery = query(
//                 Accounts,
//                 where("userId", "==", userId)
//             );
//             const sessionsQuery = query(
//                 Sessions,
//                 where("userId", "==", userId)
//             );

//             await runTransaction(db, async (transaction) => {
//                 transaction.delete(userDoc);
//                 const accounts = await getDocs(accountsQuery);
//                 accounts.forEach((account) => transaction.delete(account.ref));

//                 const sessions = await getDocs(sessionsQuery);
//                 sessions.forEach((session) => transaction.delete(session.ref));
//             });
//         },

//         async linkAccount(account) {
//             const { id } = await addDoc(Accounts, account);
//             return { ...account, id };
//         },

//         async unlinkAccount({ provider, providerAccountId }) {
//             const accountQuery = query(
//                 Accounts,
//                 where("provider", "==", provider),
//                 where("providerAccountId", "==", providerAccountId),
//                 limit(1)
//             );
//             const accounts = await getDocs(accountQuery);
//             if (accounts.empty) return;
//             await deleteDoc(accounts.docs[0].ref);
//         },

//         async createSession(session) {
//             const { id } = await addDoc(Sessions, session);
//             return { ...session, id };
//         },

//         async getSessionAndUser(sessionToken) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return null;
//             const session = Sessions.converter!.fromFirestore(
//                 sessionDocs.docs[0]
//             );
//             if (!session) return null;

//             const userDoc = await getDoc(doc(Users, session.userId));
//             if (!userDoc.exists()) return null;
//             const user = Users.converter!.fromFirestore(userDoc)!;
//             return { session, user };
//         },

//         async updateSession(partialSession) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", partialSession.sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return null;
//             await updateDoc(sessionDocs.docs[0].ref, partialSession);
//         },

//         async deleteSession(sessionToken) {
//             const sessionQuery = query(
//                 Sessions,
//                 where("sessionToken", "==", sessionToken),
//                 limit(1)
//             );
//             const sessionDocs = await getDocs(sessionQuery);
//             if (sessionDocs.empty) return;
//             await deleteDoc(sessionDocs.docs[0].ref);
//         },

//         async createVerificationToken(verificationToken) {
//             await addDoc(VerificationTokens, verificationToken);
//             return verificationToken;
//         },

//         async useVerificationToken({ identifier, token }) {
//             const verificationTokensQuery = query(
//                 VerificationTokens,
//                 where("identifier", "==", identifier),
//                 where("token", "==", token),
//                 limit(1)
//             );
//             const verificationTokenDocs = await getDocs(
//                 verificationTokensQuery
//             );
//             if (verificationTokenDocs.empty) return null;

//             await deleteDoc(verificationTokenDocs.docs[0].ref);

//             const verificationToken =
//                 VerificationTokens.converter!.fromFirestore(
//                     verificationTokenDocs.docs[0]
//                 );
//             // @ts-expect-error
//             delete verificationToken.id;
//             return verificationToken;
//         },
//     };
// }

// export interface FirestoreExtension {
//     FirebaseAdapter(client: FirebaseClient): Adapter;
// }

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
