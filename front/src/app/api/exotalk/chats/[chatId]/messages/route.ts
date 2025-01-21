// app/api/chats/[chatId]/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function GET(
	req: NextRequest,
	{ params }: { params: { chatId: string } }
) {
	const { searchParams } = new URL(req.url);
	const limit = searchParams.get("limit")
		? parseInt(searchParams.get("limit")!, 10)
		: 1; // Non-null assertion since we know it exists in this branch
	const order = searchParams.get("order") === "desc" ? "desc" : "asc";

	// Equivalent to "limitedSortedMessagesRef(chatId)"
	// We'll fetch up to `limit` messages, sorted by timestamp ascending/descending.
	const messages = await prisma.message.findMany({
		where: { chatId: params.chatId },
		take: limit,
		orderBy: { timestamp: order },
	});

	return NextResponse.json(messages);
}
