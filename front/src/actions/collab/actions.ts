// "use server";

// // import { adminDb } from "@/firebase-admin";
// import liveblocks from "@/lib/collab/liveblocks";
// import { auth } from "@clerk/nextjs/server";
// import { adminDb } from "@/config/collab/firebase-admin";

// export async function createNewDocument() {
// 	// auth().protect(); // Ensure the user is authenticated
// 	const { userId } = await auth();
// 	if (!userId) throw new Error("Unauthorized");

// 	try {
// 		const { sessionClaims } = await auth();
// 		console.log("Session Claims:", sessionClaims);

// 		const docCollectionRef = adminDb.collection("documents");
// 		const docRef = await docCollectionRef.add({ title: "New Doc" });
// 		console.log("Document Reference:", docRef.id);

// 		await adminDb
// 			.collection("users")
// 			.doc(sessionClaims?.email!)
// 			.collection("rooms")
// 			.doc(docRef.id)
// 			.set({
// 				userId: sessionClaims?.email!,
// 				role: "owner",
// 				createdAt: new Date(),
// 				roomId: docRef.id,
// 			});
// 		console.log("Document Created and User Added");

// 		return { docId: docRef.id };
// 	} catch (error) {
// 		console.error("Error creating new document:", error);
// 		throw error; // Re-throw the error after logging it
// 	}
// }

// export async function inviteUserToDocument(roomId: string, email: string) {
// 	// auth().protect(); // Ensure the user is authenticated
// 	const { userId } = await auth();
// 	if (!userId) throw new Error("Unauthorized");

// 	try {
// 		console.log("Invite User to Document:", roomId, email);

// 		await adminDb
// 			.collection("users")
// 			.doc(email)
// 			.collection("rooms")
// 			.doc(roomId)
// 			.set({
// 				userId: email,
// 				role: "editor",
// 				createdAt: new Date(),
// 				roomId,
// 			});
// 		console.log("User Invited");

// 		return { success: true };
// 	} catch (error) {
// 		console.error("Error inviting user to document:", error);
// 		return { success: false };
// 	}
// }

// export async function removeUserFromDocument(roomId: string, email: string) {
// 	// auth().protect(); // Ensure the user is authenticated
// 	const { userId } = await auth();
// 	if (!userId) throw new Error("Unauthorized");

// 	try {
// 		console.log("Remove User from Document:", roomId, email);

// 		await adminDb
// 			.collection("users")
// 			.doc(email)
// 			.collection("rooms")
// 			.doc(roomId)
// 			.delete();
// 		console.log("User Removed");

// 		return { success: true };
// 	} catch (error) {
// 		console.error("Error removing user from document:", error);
// 		return { success: false };
// 	}
// }

// export async function deleteDocument(roomId: string) {
// 	// auth().protect(); // Ensure the user is authenticated
// 	const { userId } = await auth();
// 	if (!userId) throw new Error("Unauthorized");

// 	try {
// 		console.log("Delete Document:", roomId);

// 		await adminDb.collection("documents").doc(roomId).delete();
// 		console.log("Document Deleted");

// 		const query = await adminDb
// 			.collectionGroup("rooms")
// 			.where("roomId", "==", roomId)
// 			.get();
// 		console.log("Rooms Query:", query);

// 		const batch = adminDb.batch();
// 		query.docs.forEach((doc) => {
// 			batch.delete(doc.ref);
// 		});
// 		await batch.commit();
// 		console.log("Batch Commit Done");

// 		await liveblocks.deleteRoom(roomId);
// 		console.log("Liveblocks Room Deleted");

// 		return { success: true };
// 	} catch (error) {
// 		console.error("Error deleting document:", error);
// 		return { success: false };
// 	}
// }

"use server";

import { prisma } from "@/lib/client/prisma"; // Adjust path to your Prisma client
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/modify/auth/route"; // Adjust path to your NextAuth config
import liveblocks from "@/lib/collab/liveblocks"; // Your Liveblocks import
import { redirect } from "next/navigation"; // or `NextResponse` if needed

//
// CREATE NEW DOCUMENT
//
export async function createNewDocument() {
	// Check NextAuth session
	const session = await getServerSession(authOptions);
	if (!session || !session.user?.id) throw new Error("Unauthorized");

	try {
		// 1) Create a new Document in Prisma
		const doc = await prisma.document.create({
			data: {
				title: "New Doc", // or accept a title param
			},
		});

		// 2) Create a membership record linking the user to this document as "owner"
		await prisma.membership.create({
			data: {
				docId: doc.id,
				userId: session.user.id,
				role: "owner",
			},
		});

		console.log("Document created & user membership added:", doc.id);
		return { docId: doc.id };
	} catch (error) {
		console.error("Error creating new document:", error);
		throw error;
	}
}

//
// INVITE USER TO DOCUMENT
//
export async function inviteUserToDocument(roomId: string, email: string) {
	// Check NextAuth session
	const session = await getServerSession(authOptions);
	if (!session || !session.user?.id) throw new Error("Unauthorized");

	try {
		console.log("Invite User to Document:", roomId, email);

		// 1) Lookup the invited user in your Prisma `User` table by email
		const invitedUser = await prisma.user.findUnique({
			where: { email },
		});
		if (!invitedUser) {
			throw new Error(`User with email ${email} not found`);
		}

		// 2) Create a membership record with role = "editor" (or upsert if needed)
		await prisma.membership.create({
			data: {
				docId: roomId,
				userId: invitedUser.id,
				role: "editor",
			},
		});

		console.log("User invited:", invitedUser.id);
		return { success: true };
	} catch (error) {
		console.error("Error inviting user to document:", error);
		return { success: false };
	}
}

//
// REMOVE USER FROM DOCUMENT
//
export async function removeUserFromDocument(roomId: string, email: string) {
	// Check NextAuth session
	const session = await getServerSession(authOptions);
	if (!session || !session.user?.id) throw new Error("Unauthorized");

	try {
		console.log("Remove User from Document:", roomId, email);

		// 1) Lookup the user by email
		const userToRemove = await prisma.user.findUnique({
			where: { email },
		});
		if (!userToRemove) {
			throw new Error(`User with email ${email} not found`);
		}

		// 2) Delete membership record
		await prisma.membership.deleteMany({
			where: {
				docId: roomId,
				userId: userToRemove.id,
			},
		});

		console.log("User removed:", userToRemove.id);
		return { success: true };
	} catch (error) {
		console.error("Error removing user from document:", error);
		return { success: false };
	}
}

//
// DELETE DOCUMENT
//
export async function deleteDocument(roomId: string) {
	// Check NextAuth session
	const session = await getServerSession(authOptions);
	if (!session || !session.user?.id) throw new Error("Unauthorized");

	try {
		console.log("Delete Document:", roomId);

		// 1) Delete the Document record
		await prisma.document.delete({
			where: { id: roomId },
		});

		// If no "onDelete: Cascade" is set in your schema,
		// you may also remove memberships manually:
		// await prisma.membership.deleteMany({
		//   where: { docId: roomId },
		// });

		console.log("Document Deleted in DB");

		// 2) Remove the Liveblocks room
		await liveblocks.deleteRoom(roomId);
		console.log("Liveblocks Room Deleted");

		return { success: true };
	} catch (error) {
		console.error("Error deleting document:", error);
		return { success: false };
	}
}
