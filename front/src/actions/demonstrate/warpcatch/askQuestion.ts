"use server";

import { Message } from "@/components/warpcatch/Chat";
import { adminDb } from "@/config/warpcatch/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { generateLangchainCompletion } from "@/lib/warpcatch/langchain";
// import { FREE_LIMIT, PRO_LIMIT } from "@/hooks/warpcatch/useSubscription";

const FREE_LIMIT = 3;
const PRO_LIMIT = 100;

export async function askQuestion(id: string, question: string) {
	try {
		auth().protect();
		const { userId } = await auth();

		console.log("USER IDENTIFIER", id);
		console.log("QUESTION ASKED", question);

		const chatRef = adminDb
			.collection("users")
			.doc(userId!)
			.collection("files")
			.doc(id)
			.collection("chat");

		console.log("CREATING USER MESSAGES SNAPSHOT");
		const chatSnapshot = await chatRef.get();
		console.log("SNAPSHOT RETRIEVED");

		console.log("RETRIEVING USER MESSAGES");
		const userMessages = chatSnapshot.docs
			.filter((doc) => doc.data().role === "human")
			.map((doc) => doc.data());
		console.log("USER MESSAGES RETRIEVED:", userMessages);

		const userRef = await adminDb.collection("users").doc(userId!).get();

		console.log("USER DATA REF:", userRef);

		console.log("USER DATA:", userRef.data());

		if (
			!userRef.data()?.hasActiveMembership ||
			userRef.data() === undefined
		) {
			console.log(
				"FREE MESSAGES LENGTH: ",
				userMessages.length,
				"\nFREE_LIMIT:",
				FREE_LIMIT
			);
			if (userMessages.length >= FREE_LIMIT) {
				return {
					success: false,
					message: `You have reached the free limit of ${FREE_LIMIT} questions. Please upgrade to a pro account to ask more questions.`,
				};
			}
		}

		if (userRef.data()?.hasActiveMembership) {
			console.log(
				"PRO MESSAGES LENGTH: ",
				userMessages.length,
				"\nPRO_LIMIT:",
				PRO_LIMIT
			);
			if (userMessages.length >= PRO_LIMIT) {
				return {
					success: false,
					message: `You have reached the pro limit of ${PRO_LIMIT} questions. Please upgrade to a pro account to ask more questions.`,
				};
			}
		}

		// Add the new question as a user message
		const newMessage: Message = {
			role: "human",
			message: question,
			createdAt: new Date(),
		};

		console.log("ADDING NEW USER MESSAGE");
		try {
			await chatRef.add(newMessage);
			console.log("NEW USER MESSAGE ADDED SUCCESSFULLY");
		} catch (error) {
			console.error("Error adding new user message:", error);
			throw error;
		}

		// Generate AI reply
		console.log("GENERATING AI REPLY");
		const reply = await generateLangchainCompletion(id, question);
		console.log("AI REPLY GENERATED:", reply);

		// Add AI reply to the chat
		const aiMessage: Message = {
			role: "ai",
			message: reply,
			createdAt: new Date(),
		};

		console.log("ADDING AI REPLY TO CHAT");
		try {
			await chatRef.add(aiMessage);
			console.log("AI REPLY ADDED SUCCESSFULLY");
		} catch (error) {
			console.error("Error adding AI reply:", error);
			throw error;
		}

		return { success: true, message: null };
	} catch (error) {
		console.error("Error in askQuestion function:", error);
		return { success: false, message: (error as Error).message };
	}
}
