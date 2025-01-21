// import { db } from "@/firebase";
// import { LanguagesSupported } from "@/store/exotalk/store";
// import {
// 	DocumentData,
// 	FirestoreDataConverter,
// 	QueryDocumentSnapshot,
// 	SnapshotOptions,
// 	collection,
// 	limit,
// 	orderBy,
// 	query,
// } from "firebase/firestore";

// export interface User {
// 	id: string;
// 	email: string;
// 	name: string;
// 	image: string;
// 	// role: string;
// }

// export interface Message {
// 	id?: string;
// 	input: string;
// 	timestamp: Date;
// 	user: User;
// 	translated?: {
// 		[K in LanguagesSupported]?: string;
// 	};
// 	// ... other fields
// }

// const messageConverter: FirestoreDataConverter<Message> = {
// 	toFirestore: function (message: Message): DocumentData {
// 		return {
// 			input: message.input,
// 			timestamp: message.timestamp,
// 			user: message.user,
// 			// ... other fields
// 		};
// 	},
// 	fromFirestore: function (
// 		snapshot: QueryDocumentSnapshot,
// 		options: SnapshotOptions
// 	): Message {
// 		const data = snapshot.data(options);

// 		return {
// 			id: snapshot.id,
// 			input: data.input,
// 			timestamp: data.timestamp?.toDate(),
// 			translated: data.translated,
// 			user: data.user,
// 			// ... other fields
// 		};
// 	},
// };

// export const messagesRef = (chatId: string) =>
// 	collection(db, "chats", chatId, "messages").withConverter(messageConverter);

// export const limitedMessagesRef = (chatId: string) =>
// 	query(messagesRef(chatId), limit(25));

// export const sortedMessagesRef = (chatId: string) =>
// 	query(messagesRef(chatId), orderBy("timestamp", "asc"));

// export const limitedSortedMessagesRef = (chatId: string) =>
// 	query(query(messagesRef(chatId), limit(1)), orderBy("timestamp", "desc"));

// import { prisma } from "@/lib/client/prisma";
// import { Message, User } from "@/types/exotalk/MessageTypes"; // or wherever your interfaces live

// /**
//  * Create (or add) a message in a specific chat.
//  * Equivalent to adding a doc to collection(db, "chats", chatId, "messages").
//  */
// export async function createMessage(chatId: string, message: Message) {
// 	const created = await prisma.message.create({
// 		data: {
// 			chatId,
// 			input: message.input,
// 			timestamp: message.timestamp || new Date(),
// 			user: message.user, // Storing the entire user object as JSON
// 			translated: message.translated || {},
// 		},
// 	});

// 	// Convert Prisma result back to your `Message` interface
// 	return {
// 		id: created.id,
// 		input: created.input,
// 		timestamp: created.timestamp,
// 		user: created.user as User,
// 		translated: created.translated || {},
// 	} as Message;
// }

// /**
//  * List all messages in a chat (Firestore equivalent: messagesRef(chatId)).
//  */
// export async function listMessagesForChat(chatId: string): Promise<Message[]> {
// 	const records = await prisma.message.findMany({
// 		where: { chatId },
// 		// If you want them sorted by timestamp asc by default:
// 		orderBy: { timestamp: "asc" },
// 	});

// 	return records.map((r) => ({
// 		id: r.id,
// 		input: r.input,
// 		timestamp: r.timestamp,
// 		user: r.user as User,
// 		translated: r.translated || {},
// 	}));
// }

// /**
//  * List a limited number of messages (equivalent to limitedMessagesRef(chatId, limit=25)).
//  */
// export async function listLimitedMessagesForChat(
// 	chatId: string,
// 	limit = 25
// ): Promise<Message[]> {
// 	const records = await prisma.message.findMany({
// 		where: { chatId },
// 		take: limit,
// 		orderBy: { timestamp: "asc" }, // If you want ascending by default
// 	});

// 	return records.map((r) => ({
// 		id: r.id,
// 		input: r.input,
// 		timestamp: r.timestamp,
// 		user: r.user as User,
// 		translated: r.translated || {},
// 	}));
// }

// /**
//  * List messages sorted by timestamp (asc or desc) with optional limit.
//  * This covers `sortedMessagesRef(chatId, "asc")`
//  * and `limitedSortedMessagesRef(chatId, "desc", 1)`.
//  */
// export async function listSortedMessagesForChat(
// 	chatId: string,
// 	order: "asc" | "desc" = "asc",
// 	limit?: number
// ): Promise<Message[]> {
// 	const records = await prisma.message.findMany({
// 		where: { chatId },
// 		orderBy: { timestamp: order },
// 		...(limit ? { take: limit } : {}),
// 	});

// 	return records.map((r) => ({
// 		id: r.id,
// 		input: r.input,
// 		timestamp: r.timestamp,
// 		user: r.user as User,
// 		translated: r.translated || {},
// 	}));
// }

export {};
