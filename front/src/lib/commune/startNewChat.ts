// import client from "@/config/commune/apolloClient";
// import { INSERT_MESSAGE } from "@/graphql/commune/mutations/mutations";
// import { gql } from "@apollo/client";

// async function startNewChat(
// 	guestName: string,
// 	guestEmail: string,
// 	chatbotId: number
// ) {
// 	try {
// 		// 1. Create a new guest entry
// 		const guestResult = await client.mutate({
// 			mutation: gql`
// 				mutation insertGuest(
// 					$name: String!
// 					$email: String!
// 					$created_at: DateTime!
// 				) {
// 					insertGuests(
// 						name: $name
// 						email: $email
// 						created_at: $created_at
// 					) {
// 						id
// 					}
// 				}
// 			`,
// 			variables: { name: guestName, email: guestEmail },
// 		});

// 		console.log("guestResult\n", guestResult);

// 		const guestId = guestResult.data.insertGuests.id;

// 		// 2. Initialize a new chat session
// 		const chatSessionResult = await client.mutate({
// 			mutation: gql`
// 				mutation insertChatSession($chatbot_id: Int!, $guest_id: Int!) {
// 					insertChat_sessions(
// 						chatbot_id: $chatbot_id
// 						guest_id: $guest_id
// 					) {
// 						id
// 					}
// 				}
// 			`,
// 			variables: { chatbot_id: chatbotId, guest_id: guestId },
// 		});
// 		const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

// 		// 3. Insert initial message (optional)
// 		await client.mutate({
// 			mutation: INSERT_MESSAGE,
// 			variables: {
// 				chat_session_id: chatSessionId,
// 				sender: "ai",
// 				// TODO: Change this for the dynamic message we want to send in backend
// 				content: `Welcome ${guestName}!\n How can I assist you today? 😃`,
// 			},
// 		});

// 		console.log("New chat session started successfully");
// 		return chatSessionId;
// 	} catch (error) {
// 		console.error("Error starting new chat session:", error);
// 	}
// }

// export default startNewChat;

import client from "@/config/commune/apolloClient";
import { INSERT_MESSAGE } from "@/graphql/commune/mutations/mutations";
import { gql } from "@apollo/client";

async function startNewChat(
	guestName: string,
	guestEmail: string,
	chatbotId: number
) {
	try {
		const currentDate = new Date().toISOString();

		// 1. Create a new guest entry
		const guestResult = await client.mutate({
			mutation: gql`
				mutation insertGuest(
					$name: String!
					$email: String!
					$created_at: DateTime!
				) {
					insertGuests(
						name: $name
						email: $email
						created_at: $created_at
					) {
						id
					}
				}
			`,
			variables: {
				name: guestName,
				email: guestEmail,
				created_at: currentDate,
			},
		});

		console.log("guestResult\n", guestResult);

		const guestId = guestResult.data.insertGuests.id;

		// 2. Initialize a new chat session
		const chatSessionResult = await client.mutate({
			mutation: gql`
				mutation insertChatSession(
					$chatbot_id: Int!
					$guest_id: Int!
					$created_at: DateTime!
				) {
					insertChat_sessions(
						chatbot_id: $chatbot_id
						guest_id: $guest_id
						created_at: $created_at
					) {
						id
					}
				}
			`,
			variables: {
				chatbot_id: chatbotId,
				guest_id: guestId,
				created_at: currentDate,
			},
		});
		const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

		// 3. Insert initial message (optional)
		// await client.mutate({
		// 	mutation: INSERT_MESSAGE,
		// 	variables: {
		// 		chat_session_id: chatSessionId,
		// 		sender: "ai",
		// 		content: `Welcome ${guestName}!\n How can I assist you today? 😃`,
		// 	},
		// });
		await client.mutate({
			mutation: INSERT_MESSAGE,
			variables: {
				chat_session_id: chatSessionId,
				sender: "ai",
				content: `Welcome ${guestName}!\n How can I assist you today? 😃`,
				created_at: currentDate,
			},
		});

		console.log("New chat session started successfully");
		return chatSessionId;
	} catch (error) {
		console.error("Error starting new chat session:", error);
		throw error;
	}
}

export default startNewChat;
