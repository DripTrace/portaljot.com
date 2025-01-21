// app/api/chats/[chatId]/admin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function GET(
	req: NextRequest,
	{ params }: { params: { chatId: string } }
) {
	const { chatId } = params;

	// Find the admin chat member
	const adminRecord = await prisma.chatMember.findFirst({
		where: { chatId, isAdmin: true },
	});

	// If no admin found, return a 404 or empty
	if (!adminRecord) {
		return NextResponse.json({ adminId: "" }, { status: 200 });
	}

	// Otherwise, return the userId
	return NextResponse.json({ adminId: adminRecord.userId });
}
