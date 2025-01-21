// import { db } from "@/firebase";
// import {
// 	DocumentData,
// 	FirestoreDataConverter,
// 	QueryDocumentSnapshot,
// 	SnapshotOptions,
// 	collection,
// 	collectionGroup,
// 	doc,
// 	getDocs,
// 	query,
// 	where,
// } from "firebase/firestore";

// export interface ChatMembers {
// 	userId: string;
// 	email: string;
// 	timestamp: Date | null;
// 	isAdmin: boolean;
// 	chatId: string;
// 	image: string;
// 	memberCount?: number; // Add this
// 	maxMembers?: number; // Add this
// }

// export const chatMembersConverter: FirestoreDataConverter<ChatMembers> = {
// 	toFirestore: function (member: ChatMembers): DocumentData {
// 		return {
// 			userId: member.userId,
// 			email: member.email,
// 			timestamp: member.timestamp,
// 			isAdmin: !!member.isAdmin,
// 			chatId: member.chatId,
// 			image: member.image,
// 		};
// 	},
// 	fromFirestore: function (
// 		snapshot: QueryDocumentSnapshot,
// 		options: SnapshotOptions
// 	): ChatMembers {
// 		const data = snapshot.data(options);

// 		return {
// 			userId: snapshot.id,
// 			email: data.email,
// 			timestamp: data.timestamp,
// 			isAdmin: data.isAdmin,
// 			chatId: data.chatId,
// 			image: data.image,
// 		};
// 	},
// };

// export const addChatRef = (chatId: string, userId: string) =>
// 	doc(db, "chats", chatId, "members", userId).withConverter(
// 		chatMembersConverter
// 	);

// export const chatMembersRef = (chatId: string) =>
// 	collection(db, "chats", chatId, "members").withConverter(
// 		chatMembersConverter
// 	);

// export const chatMemberAdminRef = (chatId: string) =>
// 	query(
// 		collection(db, "chats", chatId, "members"),
// 		where("isAdmin", "==", true)
// 	).withConverter(chatMembersConverter);

// export const chatMembersCollectionGroupRef = (userId: string) =>
// 	query(
// 		collectionGroup(db, "members"),
// 		where("userId", "==", userId)
// 	).withConverter(chatMembersConverter);

// export async function getCurrentMemberCount(chatId: string) {
// 	const membersSnapshot = await getDocs(chatMembersRef(chatId));
// 	return membersSnapshot.size;
// }

// export async function canAddUserToChat(chatId: string) {
// 	const currentCount = await getCurrentMemberCount(chatId);
// 	return currentCount < 3;
// }

import { prisma } from "@/lib/client/prisma";
// 1) The ChatMembers interface you shared
export interface ChatMembers {
	userId: string;
	email: string;
	timestamp: Date | null;
	isAdmin: boolean;
	chatId: string;
	image: string;
	memberCount?: number;
	maxMembers?: number;
}

/**
 * 3) Adds a member to a chat (replaces 'addChatRef').
 *    In Firestore, you'd do doc(db, "chats", chatId, "members", userId).
 *    In Prisma, we simply create a record in the 'ChatMember' table.
 */
export async function addChatMember(member: ChatMembers) {
	return prisma.chatMember.create({
		data: {
			chatId: member.chatId,
			userId: member.userId,
			email: member.email,
			timestamp: member.timestamp || null,
			isAdmin: member.isAdmin,
			image: member.image,
		},
	});
}

/**
 * 4) Lists all members for a given chat (replaces 'chatMembersRef').
 *    In Firestore, you'd do collection(db, "chats", chatId, "members").
 *    In Prisma, we query by 'chatId'.
 */
export async function listChatMembers(chatId: string): Promise<ChatMembers[]> {
	const records = await prisma.chatMember.findMany({
		where: { chatId },
	});

	// Convert each record to your ChatMembers interface if needed:
	return records.map((r) => ({
		userId: r.userId,
		email: r.email,
		timestamp: r.timestamp,
		isAdmin: r.isAdmin,
		chatId: r.chatId,
		image: r.image || "",
	}));
}

/**
 * 5) Lists all admin members for a given chat (replaces 'chatMemberAdminRef').
 *    In Firestore, you'd do query(..., where("isAdmin", "==", true)).
 *    In Prisma, we do a simple where clause for isAdmin = true.
 */
export async function getAdminChatMembers(
	chatId: string
): Promise<ChatMembers[]> {
	const records = await prisma.chatMember.findMany({
		where: {
			chatId,
			isAdmin: true,
		},
	});

	return records.map((r) => ({
		userId: r.userId,
		email: r.email,
		timestamp: r.timestamp,
		isAdmin: r.isAdmin,
		chatId: r.chatId,
		image: r.image || "",
	}));
}

/**
 * 6) Lists all ChatMembers across all chats for a given user (replaces 'chatMembersCollectionGroupRef').
 *    In Firestore, you'd do collectionGroup(db, "members") and where("userId", "==", userId).
 *    In Prisma, we simply query the 'ChatMember' table for userId.
 */
export async function listChatsForUser(userId: string): Promise<ChatMembers[]> {
	const records = await prisma.chatMember.findMany({
		where: { userId },
	});

	return records.map((r) => ({
		userId: r.userId,
		email: r.email,
		timestamp: r.timestamp,
		isAdmin: r.isAdmin,
		chatId: r.chatId,
		image: r.image || "",
	}));
}

/**
 * 7) Get how many members are currently in a chat (replaces 'getCurrentMemberCount').
 *    In Firestore, you'd do getDocs(...) and check .size.
 *    In Prisma, we do .count().
 */
export async function getCurrentMemberCount(chatId: string): Promise<number> {
	return prisma.chatMember.count({
		where: { chatId },
	});
}

/**
 * 8) Check if a user can be added to a chat (replaces 'canAddUserToChat').
 *    In Firestore, you'd compare getCurrentMemberCount(chatId) < 3.
 *    In Prisma, same logic:
 */
export async function canAddUserToChat(chatId: string): Promise<boolean> {
	const currentCount = await getCurrentMemberCount(chatId);
	return currentCount < 3;
}
