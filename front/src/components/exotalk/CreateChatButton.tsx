// "use client";

// import { useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
// import {
// 	addChatRef,
// } from "@/lib/exotalk/converters/ChatsMembers";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import LoadingSpinner from "./loadingSpinner";
// import { v4 as uuidv4 } from "uuid";
// import { MessageSquarePlusIcon } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
// 	const { data: session } = useSession();
// 	const router = useRouter();
// 	const [loading, setLoading] = useState(false);
// 	const { toast } = useToast();
// 	// const subscription = useSubscriptionStore((state) => state.subscription);
// 	// console.log(subscription);

// 	const createNewChat = async () => {
// 		if (!session?.user.id) return;

// 		setLoading(true);
// 		toast({
// 			title: "Creating new chat...",
// 			description: "Hold tight while we create your new chat...",
// 			duration: 3000,
// 		});

// 		const chatId = uuidv4();
// 		await setDoc(addChatRef(chatId, session.user.id), {
// 			userId: session.user.id!,
// 			email: session.user.email!,
// 			timestamp: serverTimestamp(),
// 			isAdmin: true,
// 			chatId: chatId,
// 			image: session.user.image || "",
// 			memberCount: 1, // Add this field to track member count
// 			maxMembers: 3, // Add this field to set maximum members
// 		})
// 			.then(() => {
// 				toast({
// 					title: "Success",
// 					description: "Your chat has been created!",
// 					className: "bg-green-600 text-white",
// 					duration: 2000,
// 				});
// 				router.push(`/exotalk/chat/${chatId}`);
// 			})
// 			.catch(() => {
// 				toast({
// 					title: "Error",
// 					description: "There was an error creating your chat!",
// 					variant: "destructive",
// 				});
// 			})
// 			.finally(() => setLoading(false));
// 	};

// 	if (isLarge)
// 		return (
// 			<div>
// 				<Button variant={"default"} onClick={createNewChat}>
// 					{loading ? <LoadingSpinner /> : "Create a New Chat"}
// 				</Button>
// 			</div>
// 		);

// 	return (
// 		<div>
// 			<Button size={"icon"} variant={"ghost"} onClick={createNewChat}>
// 				{loading ? <LoadingSpinner /> : <MessageSquarePlusIcon />}
// 			</Button>
// 		</div>
// 	);
// }

// export default CreateChatButton;

"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "./loadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { MessageSquarePlusIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 1) Import Prisma client
import { prisma } from "@/lib/client/prisma";

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
	const { data: session } = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	// 2) Create a new chat in Prisma, add the user as admin
	const createNewChat = async () => {
		if (!session?.user.id) return;

		setLoading(true);
		toast({
			title: "Creating new chat...",
			description: "Hold tight while we create your new chat...",
			duration: 3000,
		});

		try {
			// We'll generate a custom UUID for the chat ID
			const chatId = uuidv4();

			// Direct server calls from a client component require an API route or server action.
			// Here, we'll do a quick fetch to an API route that calls Prisma:
			const res = await fetch("/api/exotalk/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chatId,
					userId: session.user.id,
					email: session.user.email,
					image: session.user.image ?? "",
				}),
			});

			if (!res.ok) {
				throw new Error(`Failed to create chat: ${res.status}`);
			}

			toast({
				title: "Success",
				description: "Your chat has been created!",
				className: "bg-green-600 text-white",
				duration: 2000,
			});
			router.push(`/exotalk/chat/${chatId}`);
		} catch (error: any) {
			toast({
				title: "Error",
				description:
					error.message || "There was an error creating your chat!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	// 3) Render the button(s)
	if (isLarge) {
		return (
			<div>
				<Button variant="default" onClick={createNewChat}>
					{loading ? <LoadingSpinner /> : "Create a New Chat"}
				</Button>
			</div>
		);
	}

	return (
		<div>
			<Button size="icon" variant="ghost" onClick={createNewChat}>
				{loading ? <LoadingSpinner /> : <MessageSquarePlusIcon />}
			</Button>
		</div>
	);
}

export default CreateChatButton;
