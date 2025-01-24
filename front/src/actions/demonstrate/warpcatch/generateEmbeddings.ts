"use server";

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/warpcatch/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
	auth().protect();

	await generateEmbeddingsInPineconeVectorStore(docId);

	revalidatePath("/warpcatch/dashboard");

	return { completed: true };
}
