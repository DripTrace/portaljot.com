import { prisma } from "@/lib/client/prisma";
import { Prisma } from "@prisma/client";
// import { Message, User } from "@/types/exotalk/MessageTypes"; // or wherever your interfaces live
import { LanguagesSupported } from "@/store/exotalk/store";

export interface User {
	id: string;
	email: string;
	name: string;
	image: string;
}

export interface Message {
	id?: string;
	input: string;
	timestamp: Date;
	user: User;
	translated?: {
		[K in LanguagesSupported]?: string;
	};
}

/**
 * Create (or add) a message in a specific chat.
 * Equivalent to adding a doc to collection(db, "chats", chatId, "messages").
 */
export async function createMessage(chatId: string, message: Message) {
	const created = await prisma.message.create({
		data: {
			chatId,
			input: message.input,
			timestamp: message.timestamp || new Date(),
			user: JSON.parse(
				JSON.stringify(message.user)
			) as Prisma.InputJsonValue,
			translated: message.translated || {},
		},
	});

	// Convert Prisma result back to your `Message` interface
	return {
		id: created.id,
		input: created.input,
		timestamp: created.timestamp,
		user: created.user as unknown as User, // Double cast to safely convert JSON to User
		translated: created.translated || {},
	} as Message;
}

/**
 * List all messages in a chat (Firestore equivalent: messagesRef(chatId)).
 */
export async function listMessagesForChat(chatId: string): Promise<Message[]> {
	const records = await prisma.message.findMany({
		where: { chatId },
		// If you want them sorted by timestamp asc by default:
		orderBy: { timestamp: "asc" },
	});

	return records.map(
		(r) =>
			({
				id: r.id,
				input: r.input,
				timestamp: r.timestamp,
				user: r.user as unknown as User, // Double cast for safe JSON to User conversion
				translated:
					(r.translated as Record<LanguagesSupported, string>) || {},
			}) as Message
	);
}

/**
 * List a limited number of messages (equivalent to limitedMessagesRef(chatId, limit=25)).
 */
export async function listLimitedMessagesForChat(
	chatId: string,
	limit = 25
): Promise<Message[]> {
	const records = await prisma.message.findMany({
		where: { chatId },
		take: limit,
		orderBy: { timestamp: "asc" }, // If you want ascending by default
	});

	return records.map(
		(r) =>
			({
				id: r.id,
				input: r.input,
				timestamp: r.timestamp,
				user: r.user as unknown as User,
				translated:
					(r.translated as Record<LanguagesSupported, string>) ||
					({} as { [K in LanguagesSupported]?: string }),
			}) as Message
	);
}

/**
 * List messages sorted by timestamp (asc or desc) with optional limit.
 * This covers `sortedMessagesRef(chatId, "asc")`
 * and `limitedSortedMessagesRef(chatId, "desc", 1)`.
 */
export async function listSortedMessagesForChat(
	chatId: string,
	order: "asc" | "desc" = "asc",
	limit?: number
): Promise<Message[]> {
	const records = await prisma.message.findMany({
		where: { chatId },
		orderBy: { timestamp: order },
		...(limit ? { take: limit } : {}),
	});

	return records.map(
		(r) =>
			({
				id: r.id,
				input: r.input,
				timestamp: r.timestamp,
				user: r.user as unknown as User,
				translated: r.translated
					? (r.translated as { [K in LanguagesSupported]?: string })
					: {},
			}) as Message
	);
}
