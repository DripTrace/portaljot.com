// "use client";

// import { Message, limitedSortedMessagesRef } from "@/lib/exotalk/converters/MessageTypes";
// import { useRouter } from "next/navigation";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import Image from "next/image";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useSession } from "next-auth/react";
// import { useLanguageStore } from "@/store/exotalk/store";
// import UserAvatar from "./UserAvatar";

// function ChatListRow({ chatId }: { chatId: string }) {
// 	const [messages, loading, error] = useCollectionData<Message>(
// 		limitedSortedMessagesRef(chatId)
// 	);
// 	const language = useLanguageStore((state) => state.language);
// 	const { data: session } = useSession();

// 	const router = useRouter();

// 	function prettyUUID(n = 4) {
// 		return chatId.substring(0, n);
// 	}

// 	const row = (message?: Message) => (
// 		<div
// 			key={chatId}
// 			onClick={() => router.push(`/chat/${chatId}`)}
// 			className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
// 		>
// 			<UserAvatar
// 				name={message?.user.name || session?.user.name}
// 				image={message?.user.image || session?.user.image}
// 			/>

// 			<div className="flex-1">
// 				<p className="font-bold">
// 					{!message && "New Chat"}
// 					{message &&
// 						[message?.user.name || session?.user.name]
// 							.toString()
// 							.split(" ")[0]}
// 				</p>

// 				<p className="text-gray-400 line-clamp-1">
// 					{message?.translated?.[language] ||
// 						"Get the conversation started..."}
// 				</p>
// 			</div>

// 			<div className="text-xs text-gray-400 text-right">
// 				<p className="mb-auto">
// 					{message
// 						? new Date(message.timestamp).toLocaleTimeString()
// 						: "No messages yet"}
// 				</p>
// 				<p className="">chat #{prettyUUID()}</p>
// 			</div>
// 		</div>
// 	);

// 	return (
// 		<div className="">
// 			{loading && (
// 				<div className="flex p-5 items-center space-x-2">
// 					<Skeleton className="h-12 w-12 rounded-full" />
// 					<div className="space-y-2 flex-1">
// 						<Skeleton className="h-4 w-full" />
// 						<Skeleton className="h-4 w-1/4" />
// 					</div>
// 				</div>
// 			)}

// 			{messages?.length === 0 && !loading && row()}

// 			{messages?.map((message) => row(message))}
// 		</div>
// 	);
// }

// export default ChatListRow;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguageStore } from "@/store/exotalk/store";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "./UserAvatar";

/**
 * Matches what you had in Firestore:
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

function ChatListRow({ chatId }: { chatId: string }) {
	// "messages" is the result of our fetch, "loading" tracks fetch state, "error" tracks any error
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const language = useLanguageStore((state) => state.language);
	const { data: session } = useSession();
	const router = useRouter();

	// On mount, fetch the latest message(s) from your new API route
	useEffect(() => {
		async function fetchMessages() {
			try {
				setLoading(true);
				// We'll fetch just 1 message, sorted descending (the newest one)
				const res = await fetch(
					`/api/exotalk/chats/${chatId}/messages?limit=1&order=desc`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch messages");
				}
				const data: Message[] = await res.json();
				setMessages(data);
				setLoading(false);
			} catch (err) {
				setError(err as Error);
				setLoading(false);
			}
		}

		fetchMessages();
	}, [chatId]);

	// Used for partial display of chatId
	function prettyUUID(n = 4) {
		return chatId.substring(0, n);
	}

	// Renders a single row
	function row(message?: Message) {
		return (
			<div
				key={chatId}
				onClick={() => router.push(`/chat/${chatId}`)}
				className="flex p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
			>
				<UserAvatar
					name={message?.user.name || session?.user.name}
					image={message?.user.image || session?.user.image}
				/>

				<div className="flex-1">
					<p className="font-bold">
						{!message && "New Chat"}
						{message &&
							(message.user.name || session?.user.name)?.split(
								" "
							)[0]}
					</p>
					<p className="text-gray-400 line-clamp-1">
						{message?.translated?.[language] ||
							"Get the conversation started..."}
					</p>
				</div>

				<div className="text-xs text-gray-400 text-right">
					<p className="mb-auto">
						{message
							? new Date(message.timestamp).toLocaleTimeString()
							: "No messages yet"}
					</p>
					<p>chat #{prettyUUID()}</p>
				</div>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex p-5 items-center space-x-2">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2 flex-1">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-1/4" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex p-5 items-center space-x-2 text-red-500">
				Error loading chat: {error.message}
			</div>
		);
	}

	// If no messages found, show a "new chat" row
	if (messages.length === 0) {
		return row();
	}

	// If we have messages, render them
	return <>{messages.map((m) => row(m))}</>;
}

export default ChatListRow;
