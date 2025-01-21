// app/api/exotalk/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function POST(req: NextRequest) {
	try {
		const { chatId, userId, email, image } = await req.json();

		// If you store these in `Chat`
		const memberCount = 1;
		const maxMembers = 3;

		// Do it all in one transaction
		await prisma.$transaction([
			// 1) Create the chat record
			prisma.chat.create({
				data: {
					id: chatId,
					memberCount,
					maxMembers,
				},
			}),
			// 2) Create the admin membership
			prisma.chatMember.create({
				data: {
					chatId,
					userId,
					email,
					image,
					isAdmin: true,
				},
			}),
		]);

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (error: any) {
		console.error("Error creating new chat:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
