"use server";

import { adminDb, adminStorage } from "@/config/warpcatch/firebaseAdmin";
import { indexName } from "@/lib/warpcatch/langchain";
import pineconeClient from "@/lib/warpcatch/pinecone";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteDocument(docId: string) {
	auth().protect();
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	console.log("Deleting document", docId);

	await adminDb
		.collection(`users`)
		.doc(userId)
		.collection("files")
		.doc(docId)
		.delete();

	// await pineconeClient.deleteIndex(indexName, docId);

	await adminStorage
		.bucket(process.env.FIREBASE_STORAGE_BUCKET_WARPCATCH)
		.file(`users/${userId}/files/${docId}`)
		.delete();

	const index = await pineconeClient.index(indexName);
	await index.namespace(docId).deleteAll();

	revalidatePath(`/warpcatch/dashboard`);
}
