// import ChatBotSessions from "@/components/ChatBotSessions";

// import { GET_USER_CHATBOTS } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetUserChatbotsResponse,
// 	GetUserChatbotsVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";

// export const dynamic = "force-dynamic";
// async function ReviewSessions() {
// 	const { userId } = await auth();
// 	if (!userId) return;

// 	const {
// 		data: { chatbotsByUser },
// 	} = await serverClient.query<
// 		GetUserChatbotsResponse,
// 		GetUserChatbotsVariables
// 	>({
// 		query: GET_USER_CHATBOTS,
// 		variables: { userId: userId },
// 	});

// 	const sortedChatbotsByUser: Chatbot[] = chatbotsByUser.map((chatbot) => ({
// 		...chatbot,
// 		chat_sessions: [...chatbot.chat_sessions].sort(
// 			(a, b) =>
// 				// sort in ascending order
// 				new Date(b.created_at).getTime() -
// 				new Date(a.created_at).getTime()
// 		),
// 	}));

// 	return (
// 		<div className="flex-1 px-10">
// 			<h1 className="text-xl lg:text-3xl font-semibold mt-10">
// 				Chat Sessions
// 			</h1>
// 			<h2 className="mb-5">
// 				Review all the chat sessions the chat bots have had with your
// 				customers.
// 			</h2>

// 			<ChatBotSessions chatbots={sortedChatbotsByUser} />
// 		</div>
// 	);
// }

// export default ReviewSessions;

import ChatBotSessions from "@/components/commune/ChatBotSessions";
import { GET_CHATBOTS } from "@/graphql/commune/queries/queries";
import { serverClient } from "@/lib/commune/server/serverClient";
import { Chatbot, GetChatbotsData } from "@/types/commune/chatbot";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

async function ReviewSessions() {
	const { userId } = await auth();
	if (!userId) return null;

	try {
		const { data } = await serverClient.query<GetChatbotsData>({
			query: GET_CHATBOTS,
		});

		if (!data || !data.chatbotsList) {
			console.log("No chatbots data returned");
			return null;
		}

		// Filter chatbots for the current user
		const userChatbots = data.chatbotsList.filter(
			(chatbot) => chatbot.clerk_user_id === userId
		);

		const sortedChatbotsByUser: Chatbot[] = userChatbots.map((chatbot) => ({
			...chatbot,
			chat_sessions: [...chatbot.chat_sessions].sort(
				(a, b) =>
					// sort in descending order (most recent first)
					new Date(b.created_at).getTime() -
					new Date(a.created_at).getTime()
			),
		}));

		return (
			<div className="flex-1 px-10">
				<h1 className="text-xl lg:text-3xl font-semibold mt-10">
					Chat Sessions
				</h1>
				<h2 className="mb-5">
					Review all the chat sessions the chat bots have had with
					your customers.
				</h2>

				<ChatBotSessions chatbots={sortedChatbotsByUser} />
			</div>
		);
	} catch (error) {
		console.error("Error fetching chatbots:", error);
		return <div>An error occurred while fetching chat sessions.</div>;
	}
}

export default ReviewSessions;
