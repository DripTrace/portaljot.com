import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
import {
	GetChatbotsByUserData,
	GetChatbotsByUserDataVariables,
} from "@/types/commune/chatbot";
import { serverClient } from "./serverClient";

export async function fetchChatbots(userId: string) {
	console.log("Fetching chatbots for user:", userId);
	if (!userId) {
		console.log("No user id found");
		return null;
	}

	try {
		console.log("Executing query:", GET_CHATBOTS_BY_USER);
		console.log("With variables:", { clerk_user_id: userId });

		const { data, errors } = await serverClient.query<
			GetChatbotsByUserData,
			GetChatbotsByUserDataVariables
		>({
			query: GET_CHATBOTS_BY_USER,
			variables: { clerk_user_id: userId },
		});

		if (errors) {
			console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
			return null;
		}

		if (!data || !data.chatbotsList) {
			console.log("No chatbots data returned");
			return null;
		}

		console.log(
			"Chatbots fetched:",
			JSON.stringify(data.chatbotsList, null, 2)
		);
		return data.chatbotsList;
	} catch (error) {
		console.error("Error fetching chatbots:", error);
		return null;
	}
}
