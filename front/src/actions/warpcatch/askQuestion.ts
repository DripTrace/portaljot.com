// "use server";

// import { Message } from "@/components/Chat";
// import { adminDb } from "../../firebaseAdmin";
// import { auth } from "@clerk/nextjs/server";
// import { generateLangchainCompletion } from "./langchain";
// // import { generateLangchainCompletion } from "@/lib/langchain";

// const FREE_LIMIT = 3;
// const PRO_LIMIT = 100;

// export async function askQuestion(id: string, question: string) {
// 	// try {
// 	auth().protect();
// 	const { userId } = await auth();

// 	console.log("USER IDENTIFIER", id);
// 	// console.log("THE USER ID", userId);
// 	console.log("QUESTION ASKED", question);
// 	console.log("CHAT REFERENCE");
// 	const chatRef = adminDb
// 		.collection("users")
// 		.doc(userId!)
// 		.collection("files")
// 		.doc(id)
// 		.collection("chat");

// 	// console.dir(chatRef, { depth: null });
// 	console.log("CHAT REFERENCE: ", chatRef);
// 	console.log("CREATING USER MESSAGES SNAPSHOT");
// 	const chatSnapshot = await chatRef.get();
// 	console.log("SNAPSHOT RETRIEVEDN\n\n");
// 	// console.log("chatSnapshot", chatSnapshot);
// 	console.log("USER MESSAGES SNAPSHOT: ");
// 	console.log(chatSnapshot);
// 	// console.dir(chatSnapshot, { depth: null });

// 	console.log("RETRIEVING USER MESSAGES");
// 	const userMessages = await chatSnapshot.docs.filter(
// 		(doc) => doc.data().role === "human"
// 	);
// 	console.log("RETRIEVING COMPLETE\n\n");
// 	// console.dir(userMessages, { depth: null });
// 	console.log("USER MESSAGES: ", userMessages);
// 	console.log("USER MESSAGES RETRIEVED\n\n");

// 	// console.log("USER MESSAGES AFTER INITIAL RETRIEVAL: ", userMessages);

// 	// try {
// 	await chatRef.add(userMessages);
// 	// } catch (error) {
// 	// 	console.log("Error adding user messages", error);
// 	// }

// 	const reply = await generateLangchainCompletion(id, question);
// 	console.log("LANG REPLY", reply);

// 	const aiMessage: Message = {
// 		role: "ai",
// 		message: reply,
// 		createdAt: new Date(),
// 	};

// 	await chatRef.add(aiMessage);

// 	return { success: true, message: null };
// 	// } catch (error) {
// 	// 	return { success: false, message: (error as any).message };
// 	// }
// }

"use server";

import { Message } from "@/components/Chat";
import { adminDb } from "../../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { generateLangchainCompletion } from "../lib/langchain";
// import { FREE_LIMIT, PRO_LIMIT } from "@/hooks/useSubscription";

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
