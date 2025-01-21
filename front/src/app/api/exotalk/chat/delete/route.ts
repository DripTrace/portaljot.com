// // /api/exotalk/chat/delete/route.ts
// import { adminDb } from "@/firebase-admin";
// import { NextResponse } from "next/server";

// export async function DELETE(req: Request) {
// 	const { chatId } = await req.json();

// 	const ref = adminDb.collection("chats").doc(chatId);

// 	const bulkWriter = adminDb.bulkWriter();
// 	const MAX_RETRY_ATTEMPTS = 5;

// 	bulkWriter.onWriteError((error) => {
// 		if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
// 			return true;
// 		} else {
// 			console.log("Failed write at document: ", error.documentRef.path);
// 			return false;
// 		}
// 	});

// 	try {
// 		await adminDb.recursiveDelete(ref, bulkWriter);
// 		return NextResponse.json(
// 			{
// 				success: true,
// 			},
// 			{ status: 200 }
// 		);
// 	} catch (error) {
// 		console.error("Promise rejected: ", error);
// 		return NextResponse.json(
// 			{
// 				success: false,
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function DELETE(req: Request) {
	try {
		const { chatId } = await req.json();

		// If onDelete: Cascade is defined on the foreign keys,
		// deleting this one record will remove related messages & members
		await prisma.chat.delete({
			where: { id: chatId },
		});

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error deleting chat:", error);
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
