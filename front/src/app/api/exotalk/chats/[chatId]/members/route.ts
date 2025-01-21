import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function GET(
	req: NextRequest,
	{ params }: { params: { chatId: string } }
) {
	const chatMembers = await prisma.chatMember.findMany({
		where: { chatId: params.chatId },
		// optionally order them
	});
	return NextResponse.json(chatMembers);
}
