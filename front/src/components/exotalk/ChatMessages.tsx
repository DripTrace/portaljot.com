// "use client";

// import { Message, sortedMessagesRef } from "@/types/exotalk/MessageTypes";
// import { useLanguageStore } from "@/store/exotalk/store";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import LoadingSpinner from "./loadingSpinner";
// import { Session } from "next-auth";
// import { createRef, useEffect } from "react";
// import UserAvatar from "./UserAvatar";
// import { MessageCircleIcon } from "lucide-react";

// function ChatMessages({
// 	chatId,
// 	initialMessages,
// 	session,
// }: {
// 	chatId: string;
// 	initialMessages: Message[];
// 	session: Session | null;
// }) {
// 	const language = useLanguageStore((state) => state.language);
// 	const messagesEndRef = createRef<HTMLDivElement>();

// 	const [messages, loading, error] = useCollectionData<Message>(
// 		sortedMessagesRef(chatId),
// 		{
// 			initialValue: initialMessages,
// 		}
// 	);

// 	useEffect(() => {
// 		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages, messagesEndRef]);

// 	return (
// 		<div className="p-5">
// 			{!loading && messages?.length === 0 && (
// 				<div className="flex flex-col justify-center items-center p-20 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
// 					<MessageCircleIcon className="h-10 w-10" />

// 					<h2>
// 						<span className="font-bold">Invite a friend</span> &{" "}
// 						<span className="font-bold">
// 							Send your first message in ANY language
// 						</span>{" "}
// 						below to get started!
// 					</h2>
// 					<p>The AI will auto-detect & translate it all for you</p>
// 				</div>
// 			)}

// 			{messages?.map((message) => {
// 				const isSender = message.user.id === session?.user.id;

// 				return (
// 					<div key={message.id} className="flex my-2 items-end">
// 						<div
// 							className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
// 								isSender
// 									? "ml-auto bg-violet-600 text-white rounded-br-none"
// 									: "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"
// 							}`}
// 						>
// 							<p
// 								className={`text-xs italic font-extralight line-clamp-1 ${
// 									isSender ? "text-right" : "text-left"
// 								}`}
// 							>
// 								{message.user.name.split(" ")[0]}
// 							</p>

// 							<div className="flex space-x-2">
// 								<p>
// 									{message.translated?.[language] ||
// 										message.input}
// 								</p>
// 								{!message.translated && <LoadingSpinner />}
// 							</div>
// 						</div>

// 						<UserAvatar
// 							name={message.user.name}
// 							image={message.user.image}
// 							className={`${!isSender && "-order-1"}`}
// 						/>
// 					</div>
// 				);
// 			})}
// 			<div ref={messagesEndRef} />
// 		</div>
// 	);
// }

// export default ChatMessages;

"use client";

import { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import { useLanguageStore } from "@/store/exotalk/store";
import LoadingSpinner from "./loadingSpinner";
import UserAvatar from "./UserAvatar";
import { MessageCircleIcon } from "lucide-react";

/**
 * Match your original Message interface (or import it from a shared file).
 */
export interface Message {
	id?: string;
	input: string;
	timestamp: string | Date;
	user: {
		id: string;
		name: string;
		email: string;
		image: string;
	};
	translated?: Record<string, string>; // keyed by language
}

function ChatMessages({
	chatId,
	initialMessages,
	session,
}: {
	chatId: string;
	initialMessages: Message[];
	session: Session | null;
}) {
	const language = useLanguageStore((state) => state.language);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// We'll store the messages in local state, starting with `initialMessages`.
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// On mount, optionally fetch the updated/sorted messages from our new endpoint
	useEffect(() => {
		async function fetchMessages() {
			try {
				setLoading(true);
				// Sort ascending by default, like sortedMessagesRef(chatId, "asc")
				const res = await fetch(
					`/api/exotalk/chats/${chatId}/messages?order=asc`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch messages");
				}
				const data: Message[] = await res.json();
				setMessages(data);
				setLoading(false);
			} catch (err) {
				setError((err as Error).message);
				setLoading(false);
			}
		}

		fetchMessages();
	}, [chatId]);

	// Scroll to the bottom whenever `messages` changes
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Loading/error states
	if (loading && messages.length === 0) {
		return (
			<div className="p-5">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-5 text-red-600">
				Error loading messages: {error}
			</div>
		);
	}

	// If there are no messages after loading, show the 'Invite friend' prompt
	if (!loading && messages.length === 0) {
		return (
			<div className="p-5">
				<div className="flex flex-col justify-center items-center p-20 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
					<MessageCircleIcon className="h-10 w-10" />
					<h2>
						<span className="font-bold">Invite a friend</span> &{" "}
						<span className="font-bold">
							Send your first message in ANY language
						</span>{" "}
						below to get started!
					</h2>
					<p>The AI will auto-detect & translate it all for you</p>
				</div>
			</div>
		);
	}

	// Otherwise, render the messages
	return (
		<div className="p-5">
			{messages.map((message) => {
				const isSender = message.user.id === session?.user.id;
				return (
					<div key={message.id} className="flex my-2 items-end">
						<div
							className={`flex flex-col relative space-y-2 p-4 w-fit mx-2 rounded-lg ${
								isSender
									? "ml-auto bg-violet-600 text-white rounded-br-none"
									: "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"
							}`}
						>
							<p
								className={`text-xs italic font-extralight ${
									isSender ? "text-right" : "text-left"
								}`}
							>
								{message.user.name.split(" ")[0]}
							</p>

							<div className="flex space-x-2">
								<p>
									{message.translated?.[language] ||
										message.input}
								</p>
								{!message.translated && <LoadingSpinner />}
							</div>
						</div>

						<UserAvatar
							name={message.user.name}
							image={message.user.image}
							className={`${!isSender && "-order-1"}`}
						/>
					</div>
				);
			})}
			<div ref={messagesEndRef} />
		</div>
	);
}

export default ChatMessages;
