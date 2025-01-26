// ./src/app/commune/(admin)/view-chatbots/page.tsx

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Avatar from "@/components/commune/Avatar";
import { Button } from "@/components/ui/button";
import { serverClient } from "@/lib/commune/server/serverClient";
import {
	GET_CHATBOTS,
	GET_CHATBOTS_BY_USER,
} from "@/graphql/commune/queries/queries";
import {
	Chatbot,
	GetChatbotsByUserData,
	GetChatbotsByUserDataVariables,
	GetChatbotsData,
} from "@/types/commune/chatbot";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const delay = async (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

async function fetchChatbots(userId: string): Promise<Chatbot[] | null> {
	if (!userId) {
		console.log("No user id found");
		return null;
	}

	try {
		await delay(2000);

		console.log("Fetching all chatbots");
		const { data, errors } = await serverClient.query<GetChatbotsData>({
			query: GET_CHATBOTS,
		});

		if (errors) {
			console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
			return null;
		}

		if (!data || !data.chatbotsList) {
			console.log("No chatbots data returned");
			return null;
		}

		// Filter chatbots for the current user
		const userChatbots = data.chatbotsList.filter(
			(chatbot) => chatbot.clerk_user_id === userId
		);

		console.log(
			"Chatbots fetched for user:",
			JSON.stringify(userChatbots, null, 2)
		);
		return userChatbots;
	} catch (error) {
		console.error("Error fetching chatbots:", error);
		return null;
	}
}

async function ChatbotList() {
	const { userId } = await auth();

	if (!userId) {
		return <div>Please log in to view your chatbots.</div>;
	}

	const chatbots = await fetchChatbots(userId);

	// Sort chatbots by creation date
	const sortedChatbots: Chatbot[] = chatbots
		? [...chatbots].sort(
				(a, b) =>
					new Date(b.created_at).getTime() -
					new Date(a.created_at).getTime()
			)
		: [];

	if (!sortedChatbots.length) {
		return (
			<div>
				<p>
					You have not created any chatbots yet. Click on the button
					below to create one.
				</p>
				<Link href="/commune/create-chatbot">
					<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
						Create Chatbot
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<ul className="flex flex-col space-y-5">
			{sortedChatbots.map((chatbot) => (
				<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
					<li className="relative p-10 border rounded-md max-w-3xl bg-white">
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-4">
								<Avatar seed={chatbot.name} />
								<h2 className="text-xl font-bold">
									{chatbot.name}
								</h2>
							</div>
							<p className="absolute top-5 right-5 text-xs text-gray-400">
								Created:{" "}
								{new Date(chatbot.created_at).toLocaleString()}
							</p>
						</div>
						<hr className="mt-2" />
						<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
							<h3 className="italic">Characteristics:</h3>
							<ul className="text-xs">
								{!chatbot.chatbot_characteristics.length ? (
									<p>No characteristics added yet.</p>
								) : (
									chatbot.chatbot_characteristics.map(
										(characteristic) => (
											<li
												className="list-disc break-words"
												key={characteristic.id}
											>
												{characteristic.content}
											</li>
										)
									)
								)}
							</ul>
							<h3 className="italic">No of Sessions:</h3>
							<p>{chatbot.chat_sessions.length}</p>
						</div>
					</li>
				</Link>
			))}
		</ul>
	);
}

export default async function ViewChatbots() {
	async function refresh() {
		revalidatePath("/commune/view-chatbots");
	}

	return (
		<div className="flex-1 pb-20 p-10">
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-xl lg:text-3xl font-semibold">
					Active Chatbots
				</h1>
				<form action={refresh}>
					<Button
						type="submit"
						className="bg-[#64B5F5] text-white p-3 rounded-md"
					>
						Refresh
					</Button>
				</form>
			</div>
			<Suspense fallback={<div>Loading chatbots...</div>}>
				<ChatbotList />
			</Suspense>
		</div>
	);
}
