// import { INSERT_MESSAGE } from "@/graphql/mutations/mutations";
// import {
// 	GET_CHATBOT_BY_ID,
// 	GET_MESSAGES_BY_CHAT_SESSION_ID,
// } from "@/graphql/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	GetChatbotByIdResponse,
// 	MessagesByChatSessionIdResponse,
// } from "@/types/chatbot";
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// const openai = new OpenAI({
// 	apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: NextRequest) {
// 	// const { chat_session_id, chatbot_id, content, name, created_at } =
// 	// 	await req.json();
// 	// const { chat_session_id, chatbot_id, content, name, created_at } =
// 	// 	await req.json();
// 	let body;
// 	try {
// 		body = await req.json();
// 	} catch (error) {
// 		console.error("Error parsing request body:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to parse request body" },
// 			{ status: 400 }
// 		);
// 	}
// 	// const body = await req.json();
// 	// let body = await req.json();
// 	const { chat_session_id, chatbot_id, content, name, created_at } = body;

// 	console.log(
// 		"Received message from chat session",
// 		chat_session_id,
// 		":",
// 		content,
// 		"(chatbot:",
// 		chatbot_id,
// 		") at",
// 		created_at
// 	);
// 	const currentDate = new Date().toISOString();

// 	// console.log("request:\n", req.json());
// 	console.log(
// 		`Received message from chat session ${chat_session_id}: ${content} (chatbot: ${chatbot_id}) at ${created_at}`
// 	);

// 	try {
// 		// Step 1: Fetch chatbot characteristics
// 		const { data } = await serverClient.query<GetChatbotByIdResponse>({
// 			query: GET_CHATBOT_BY_ID,
// 			variables: { id: chatbot_id, created_at: created_at },
// 		});
// 		await serverClient.mutate({
// 			mutation: INSERT_MESSAGE,
// 			variables: {
// 				chat_session_id,
// 				content,
// 				sender: "user",
// 				created_at: currentDate,
// 			},
// 		});

// 		const chatbot = data.chatbots;

// 		if (!chatbot) {
// 			return NextResponse.json(
// 				{ error: "Chatbot not found" },
// 				{ status: 404 }
// 			);
// 		}

// 		// Step 2: Fetch previous messages
// 		const { data: messagesData } =
// 			await serverClient.query<MessagesByChatSessionIdResponse>({
// 				query: GET_MESSAGES_BY_CHAT_SESSION_ID,
// 				variables: { chat_session_id, created_at },
// 				fetchPolicy: "no-cache",
// 			});

// 		const previousMessages = messagesData.chat_sessions.messages;
// 		const formattedPreviousMessages: ChatCompletionMessageParam[] =
// 			previousMessages.map((message) => ({
// 				role: message.sender === "ai" ? "system" : "user",
// 				name: message.sender === "ai" ? "system" : name,
// 				content: message.content,
// 			}));

// 		// Combine characteristics into a system prompt
// 		const systemPrompt = chatbot.chatbot_characteristics
// 			.map((c) => c.content)
// 			.join(" + ");

// 		console.log(systemPrompt);

// 		// const messages: ChatCompletionMessageParam[] = [
// 		// 	{
// 		// 		role: "system",
// 		// 		name: "system",
// 		// 		content: `You are a helpful assistant talking to ${name}. If a generic question is asked which is not relevant or in the same scope or domain as the points in mentioned in the key information section, kindly inform the user theyre only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked about: ${systemPrompt}`,
// 		// 	},
// 		// 	...formattedPreviousMessages,
// 		// 	{
// 		// 		role: "user",
// 		// 		name: name,
// 		// 		content: content,
// 		// 	},
// 		// ];
// 		const sanitizeName = (name: string) =>
// 			name.replace(/[^a-zA-Z0-9_-]/g, "_");

// 		const messages: ChatCompletionMessageParam[] = [
// 			{
// 				role: "system",
// 				name: "system",
// 				content: `You are a helpful assistant talking to ${sanitizeName(
// 					name
// 				)}. If a generic question is asked which is not relevant or in the same scope or domain as the points in mentioned in the key information section, kindly inform the user theyre only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked about: ${systemPrompt}`,
// 			},
// 			...formattedPreviousMessages,
// 			{
// 				role: "user",
// 				name: `${sanitizeName(name)}`,
// 				content: content,
// 			},
// 		];

// 		// Step 3: Send the message to OpenAI's completions API
// 		const openaiResponse = await openai.chat.completions.create({
// 			messages: messages,
// 			model: "gpt-4o",
// 			temperature: 0.5,
// 		});

// 		console.log("OPENAI_RESPONSE > > >\n", openaiResponse);

// 		const aiResponse =
// 			openaiResponse?.choices?.[0]?.message?.content?.trim();

// 		if (!aiResponse) {
// 			return NextResponse.json(
// 				{ error: "Failed to generate AI response" },
// 				{ status: 500 }
// 			);
// 		}

// 		console.log("AI_RESPONSE > > >\n", aiResponse);

// 		// Step 4: Save the user's message in the database
// 		await serverClient.mutate({
// 			mutation: INSERT_MESSAGE,
// 			variables: { chat_session_id, content, sender: "user" },
// 		});

// 		// Step 5: Save the AI's response in the database
// 		// const aiMessageResult = await serverClient.mutate({
// 		// 	mutation: INSERT_MESSAGE,
// 		// 	variables: { chat_session_id, content: aiResponse, sender: "ai" },
// 		// });
// 		const aiMessageResult = await serverClient.mutate({
// 			mutation: INSERT_MESSAGE,
// 			variables: {
// 				chat_session_id,
// 				content: aiResponse,
// 				sender: "ai",
// 				created_at: currentDate,
// 			},
// 		});

// 		// Step 6: Return the AI's response to the client
// 		return NextResponse.json({
// 			id: aiMessageResult.data.insertMessages.id,
// 			content: aiResponse,
// 		});
// 	} catch (error) {
// 		console.error("Error sending message:", error);
// 		return NextResponse.json({ error }, { status: 500 });
// 	}
// 	// } catch (error) {
// 	// 	console.error("Error processing request:", error);
// 	// 	return NextResponse.json(
// 	// 		{ error: "Failed to process request" },
// 	// 		{ status: 400 }
// 	// 	);
// 	// }
// }

import { INSERT_MESSAGE } from "@/graphql/mutations/mutations";
import {
	GET_CHATBOT_BY_ID,
	GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
	GetChatbotByIdResponse,
	MessagesByChatSessionIdResponse,
} from "@/types/chatbot";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
	let body;
	try {
		body = await req.json();
	} catch (error) {
		console.error("Error parsing request body:", error);
		return NextResponse.json(
			{ error: "Failed to parse request body" },
			{ status: 400 }
		);
	}

	const { chat_session_id, chatbot_id, content, name, created_at } = body;

	console.log(
		"Received message from chat session",
		chat_session_id,
		":",
		content,
		"(chatbot:",
		chatbot_id,
		") at",
		created_at
	);

	const currentDate = new Date().toISOString();

	try {
		// Step 1: Fetch chatbot characteristics
		const { data } = await serverClient.query<GetChatbotByIdResponse>({
			query: GET_CHATBOT_BY_ID,
			variables: { id: chatbot_id, created_at: created_at },
		});

		await serverClient.mutate({
			mutation: INSERT_MESSAGE,
			variables: {
				chat_session_id,
				content,
				sender: "user",
				created_at: currentDate,
			},
		});

		const chatbot = data.chatbots;

		if (!chatbot) {
			return NextResponse.json(
				{ error: "Chatbot not found" },
				{ status: 404 }
			);
		}

		// Step 2: Fetch previous messages
		const { data: messagesData } =
			await serverClient.query<MessagesByChatSessionIdResponse>({
				query: GET_MESSAGES_BY_CHAT_SESSION_ID,
				variables: { chat_session_id, created_at },
				fetchPolicy: "no-cache",
			});

		const sanitizeName = (name: string) =>
			name.replace(/[^a-zA-Z0-9_-]/g, "_");
		const previousMessages = messagesData.chat_sessions.messages;
		const formattedPreviousMessages: ChatCompletionMessageParam[] =
			previousMessages.map((message) => ({
				role: message.sender === "ai" ? "system" : "user",
				name: message.sender === "ai" ? "system" : sanitizeName(name),
				content: message.content,
			}));

		// Combine characteristics into a system prompt
		const systemPrompt = chatbot.chatbot_characteristics
			.map((c) => c.content)
			.join(" + ");

		console.log(systemPrompt);

		const messages: ChatCompletionMessageParam[] = [
			{
				role: "system",
				name: "system",
				content: `You are a helpful assistant talking to ${sanitizeName(
					name
				)}. If a generic question is asked which is not relevant or in the same scope or domain as the points in mentioned in the key information section, kindly inform the user they're only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked about: ${systemPrompt}`,
			},
			...formattedPreviousMessages,
			{
				role: "user",
				name: sanitizeName(name),
				content: content,
			},
		];

		// Step 3: Send the message to OpenAI's completions API
		const openaiResponse = await openai.chat.completions.create({
			messages: messages,
			model: "gpt-4",
			temperature: 0.5,
		});

		console.log("OPENAI_RESPONSE > > >\n", openaiResponse);

		const aiResponse =
			openaiResponse?.choices?.[0]?.message?.content?.trim();

		if (!aiResponse) {
			return NextResponse.json(
				{ error: "Failed to generate AI response" },
				{ status: 500 }
			);
		}

		console.log("AI_RESPONSE > > >\n", aiResponse);

		// Step 4: Save the user's message in the database
		await serverClient.mutate({
			mutation: INSERT_MESSAGE,
			variables: { chat_session_id, content, sender: "user" },
		});

		// Step 5: Save the AI's response in the database
		const aiMessageResult = await serverClient.mutate({
			mutation: INSERT_MESSAGE,
			variables: {
				chat_session_id,
				content: aiResponse,
				sender: "ai",
				created_at: currentDate,
			},
		});

		// Step 6: Return the AI's response to the client
		return NextResponse.json({
			id: aiMessageResult.data.insertMessages.id,
			content: aiResponse,
		});
	} catch (error) {
		console.error("Error sending message:", error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
