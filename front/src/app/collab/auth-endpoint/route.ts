// import { adminDb } from "@/firebase-admin";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import liveblocks from "@/lib/liveblocks";

// export async function POST(req: NextRequest) {
// 	auth().protect(); // Ensure the user is authenticated

// 	const { userId, sessionClaims } = await auth();
// 	console.log("userId", userId);
// 	const { room } = await req.json();
// 	console.log("room", room);
// 	console.log("sessionClaims:\n", sessionClaims);

// 	try {
// 		const session = await liveblocks.prepareSession(sessionClaims?.email!, {
// 			userInfo: {
// 				name: sessionClaims?.fullName!,
// 				email: sessionClaims?.email!,
// 				avatar: sessionClaims?.image!,
// 			},
// 		});
// 		console.log("session:\n", session);

// 		const usersInRoom = await adminDb
// 			.collectionGroup("rooms")
// 			.where("userId", "==", sessionClaims?.email)
// 			.get();

// 		console.log("usersInRoom(0):\n", usersInRoom);

// 		const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

// 		console.log("userInRoom(1):\n", userInRoom);

// 		if (userInRoom?.exists) {
// 			session.allow(room, session.FULL_ACCESS);
// 			const { body, status } = await session.authorize();

// 			console.log("userInRoom(2):\n", userInRoom);

// 			return new Response(body, { status });
// 		} else {
// 			console.log("usersInRoom(3):\n", usersInRoom);
// 			return NextResponse.json(
// 				{ message: "You are not in this room" },
// 				{ status: 403 }
// 			);
// 		}
// 	} catch (error) {
// 		console.error(
// 			"Error during Liveblocks session preparation or Firestore access:",
// 			error
// 		);
// 		return NextResponse.json(
// 			{ message: "Internal Server Error" },
// 			{ status: 500 }
// 		);
// 	}
// }

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/modify/auth/route"; // adjust path to your NextAuth config
import { prisma } from "@/lib/client/prisma"; // adjust path to your Prisma client
import liveblocks from "@/lib/collab/liveblocks"; // your Liveblocks import

export async function POST(req: NextRequest) {
	try {
		// 1) Check NextAuth session
		const session = await getServerSession(authOptions);
		if (!session || !session.user?.id) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const body = await req.json();
		const { room } = body;
		console.log("room:", room);

		// 2) Prepare Liveblocks session
		// Typically, you'd want user info (name, email, avatar).
		const userName = session.user.name || "";
		const userEmail = session.user.email || "";
		const userAvatar = session.user.image || "";

		const liveblocksSession = await liveblocks.prepareSession(userEmail, {
			userInfo: {
				name: userName,
				email: userEmail,
				avatar: userAvatar,
			},
		});
		console.log("Liveblocks session:", liveblocksSession);

		// 3) Check membership in your Prisma DB
		const membership = await prisma.membership.findFirst({
			where: {
				docId: room,
				userId: session.user.id,
			},
		});

		if (!membership) {
			return NextResponse.json(
				{ message: "You are not in this room" },
				{ status: 403 }
			);
		}

		// If membership exists, give FULL_ACCESS (adjust if you have other roles)
		liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

		// 4) Authorize the Liveblocks session
		const { body: sessionBody, status } =
			await liveblocksSession.authorize();
		return new Response(sessionBody, { status });
	} catch (error) {
		console.error(
			"Error during Liveblocks session prep or membership check:",
			error
		);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
