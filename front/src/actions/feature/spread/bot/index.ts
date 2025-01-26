"use server";

import { prisma as client } from "@/lib/client/prisma";
import {
	extractEmailsFromString,
	extractURLfromString,
} from "@/lib/spread/utils";
import { onRealTimeChat } from "../conversation";
import { onMailer } from "../mailer";
import OpenAi from "openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";

const openai = new OpenAi({
	apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Stores a new conversation message in a given chatRoom.
 */
export const onStoreConversations = async (
	chatRoomId: string,
	message: string,
	role: "assistant" | "user"
) => {
	await client.chatMessage.create({
		data: {
			message,
			role,
			chatRoomId,
		},
	});
};

/**
 * Fetches chatbot details for a domain by its ID.
 */
export const onGetCurrentChatBot = async (domainId: string) => {
	try {
		const chatbot = await client.domain.findUnique({
			where: { id: domainId },
			select: {
				helpdesk: true,
				name: true,
				chatBot: {
					select: {
						id: true,
						welcomeMessage: true,
						icon: true,
						textColor: true,
						background: true,
						helpdesk: true,
					},
				},
			},
		});
		return chatbot;
	} catch (error) {
		console.log(error);
		return null;
	}
};

/**
 * Keeps track of the current customer's email in memory.
 */
let customerEmail: string | undefined;

/**
 * Main AI ChatBot Assistant logic.
 */
export const onAiChatBotAssistant = async (
	domainId: string,
	chat: { role: "assistant" | "user"; content: string }[],
	author: "user",
	message: string
) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.id) {
			console.log("No authenticated user.");
			return;
		}

		// 1) Get domain & filter questions
		const chatBotDomain = await client.domain.findUnique({
			where: { id: domainId },
			select: {
				name: true,
				filterQuestions: {
					where: { answered: null },
					select: { question: true },
				},
			},
		});
		if (!chatBotDomain) {
			console.log("Domain not found.");
			return;
		}

		// 2) Attempt to extract an email
		const extractedEmail = extractEmailsFromString(message);
		if (extractedEmail) {
			customerEmail = extractedEmail[0];
		}

		// 3) If email found, check if a Customer with that domain+email exists
		if (customerEmail) {
			const checkCustomer = await client.customer.findFirst({
				where: {
					email: customerEmail,
					domainId,
				},
				select: {
					id: true,
					email: true,
					stripeId: true,
					userId: true,
					stripeLink: true,
					domainId: true,
					questions: true,
					chatRoom: {
						select: {
							id: true,
							live: true,
							mailed: true,
						},
					},
				},
			});

			// 3a) If no existing customer, create them
			if (!checkCustomer) {
				const newCustomer = await client.customer.create({
					data: {
						email: customerEmail,
						domainId,
						userId: session.user.id,
						stripeId: "", // Provide default or handle accordingly
						stripeLink: "", // Provide default or handle accordingly
						questions: {
							create: chatBotDomain.filterQuestions.map((q) => ({
								question: q.question,
							})),
						},
						chatRoom: {
							create: [
								{
									live: false,
									mailed: false,
								},
							],
						},
					},
					select: {
						id: true,
						email: true,
					},
				});

				if (newCustomer) {
					console.log("New customer created.");
					const response = {
						role: "assistant" as const,
						content: `Welcome aboard ${
							customerEmail.split("@")[0]
						}! I'm glad to connect with you. Is there anything you need help with?`,
					};
					return { response };
				}
			}

			// If the customer exists, see if there's an existing chatRoom that is live
			if (checkCustomer?.chatRoom?.length) {
				const existingRoom = checkCustomer.chatRoom[0];
				if (existingRoom.live) {
					// Store user message
					await onStoreConversations(
						existingRoom.id,
						message,
						author
					);

					// Real-time chat update
					onRealTimeChat(existingRoom.id, message, "user", author);

					// If not mailed yet, attempt to find a domain user email
					if (!existingRoom.mailed) {
						const domainUserEmail = session.user.email;
						if (domainUserEmail) {
							console.log(
								"Sending mail to domain user:",
								domainUserEmail
							);
							await onMailer(domainUserEmail);
						}
						// Mark as mailed
						const mailed = await client.chatRoom.update({
							where: { id: existingRoom.id },
							data: { mailed: true },
						});
						if (mailed) {
							return { live: true, chatRoom: existingRoom.id };
						}
					}
					return { live: true, chatRoom: existingRoom.id };
				}
			}

			// 3b) If chatRoom isn't live or doesn't exist, store conversation & pass to AI
			if (checkCustomer?.chatRoom?.length) {
				const existingRoom = checkCustomer.chatRoom[0];
				await onStoreConversations(existingRoom.id, message, author);

				const chatCompletion = await openai.chat.completions.create({
					messages: [
						{
							role: "assistant",
							content: `
                You have an array of questions to ask. For each official question, end with (complete).
                If user says something beyond scope, respond with (realtime).
                If they want to book an appointment, link:
                ${process.env.DOMAIN_URL}/portal/${domainId}/appointment/${checkCustomer.id}
                If they want to buy a product, link:
                ${process.env.DOMAIN_URL}/portal/${domainId}/payment/${checkCustomer.id}
                The array of questions: [${chatBotDomain.filterQuestions
					.map((q) => q.question)
					.join(", ")}]
              `,
						},
						...chat,
						{ role: "user", content: message },
					],
					model: "gpt-3.5-turbo",
				});
				const aiContent =
					chatCompletion.choices[0]?.message?.content || "";

				// If AI triggers real-time escalation
				if (aiContent.includes("(realtime)")) {
					const updatedRoom = await client.chatRoom.update({
						where: { id: existingRoom.id },
						data: { live: true },
					});
					if (updatedRoom) {
						const response = {
							role: "assistant" as const,
							content: aiContent.replace("(realtime)", ""),
						};
						await onStoreConversations(
							existingRoom.id,
							response.content,
							"assistant"
						);
						return { response };
					}
				}

				// If chatCompletion exists, handle link or respond with AI text
				if (chatCompletion) {
					const generatedLink = extractURLfromString(aiContent);
					if (generatedLink) {
						const link = generatedLink[0];
						const response = {
							role: "assistant" as const,
							content:
								"Great! you can follow the link to proceed",
							link: link.slice(0, -1),
						};
						await onStoreConversations(
							existingRoom.id,
							`${response.content} ${response.link}`,
							"assistant"
						);
						return { response };
					}
					const response = {
						role: "assistant" as const,
						content: aiContent,
					};
					await onStoreConversations(
						existingRoom.id,
						response.content,
						"assistant"
					);
					return { response };
				}
			}
		}

		// 4) If no email found or no existing customer matched, fallback
		console.log("No customer found or no email extracted.");

		const fallback = await openai.chat.completions.create({
			messages: [
				{
					role: "assistant",
					content: `
            You are a helpful sales rep for ${chatBotDomain.name}.
            Greet the new user warmly, then try to get their email to proceed.
            Remain in character.
          `,
				},
				...chat,
				{ role: "user", content: message },
			],
			model: "gpt-3.5-turbo",
		});
		if (fallback) {
			const response = {
				role: "assistant" as const,
				content: fallback.choices[0]?.message?.content ?? "",
			};
			return { response };
		}
	} catch (error) {
		console.log("Error in onAiChatBotAssistant:", error);
	}
};
