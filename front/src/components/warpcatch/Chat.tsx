"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import { askQuestion, Message } from "@/actions/askQuestion"
// import ChatMessage from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { askQuestion } from "@/actions/askQuestion";
import ChatMessage from "./ChatMessage";
import { useToast } from "./ui/use-toast";

export type Message = {
	id?: string;
	role: "human" | "ai" | "placeholder";
	message: string;
	createdAt: Date;
};

const Chat = ({ id }: { id: string }) => {
	const { user } = useUser();
	const { toast } = useToast();

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isPending, startTransition] = useTransition();
	const bottomOfChatRef = useRef<HTMLDivElement>(null);

	const [snapshot, loading, error] = useCollection(
		user &&
			query(
				collection(db, "users", user?.id, "files", id, "chat"),
				orderBy("createdAt", "asc")
			)
	);

	useEffect(() => {
		bottomOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
	});

	useEffect(() => {
		if (!snapshot) return;
		console.log("CURRENT MESSAGES:", messages);
		const lastMessage = messages.pop();
		console.log("LAST MESSAGE: ", lastMessage);

		if (
			lastMessage?.role === "ai" &&
			lastMessage.message === "Thinking . . ."
		) {
			return;
		}

		const newMessages = snapshot.docs.map((doc) => {
			const { role, message, createdAt } = doc.data();
			// console.log("messages", message);

			return {
				id: doc.id,
				role,
				message,
				createdAt: createdAt.toDate(),
			};
		});
		console.log("THE NEW MESSAGES BEFORE SETTING: ", newMessages);
		setMessages(newMessages);
		console.log("NEW MESSAGES AFTER SETTING: ", newMessages);

		console.log("Updated snapshot", snapshot.docs);
	}, [snapshot]);

	// useEffect(() => {
	// 	console.log("Messages NOW", messages);
	// }[]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// try {
		const q = input;

		setInput("");

		setMessages((prev) => [
			...prev,
			{
				role: "human",
				message: q,
				createdAt: new Date(),
			},
			{
				role: "ai",
				message: "Thinking...",
				createdAt: new Date(),
			},
		]);
		console.log("MESSAGE BEFORE TRANSITION: ", messages);

		startTransition(async () => {
			const { success, message } = await askQuestion(id, q);
			console.log("MESSAGES AFTER TRANSITION: ", q);
			// console.log("Question asked: ", q);
			// console.log("Success: ", success);

			if (!success) {
				toast({
					variant: "destructive",
					title: "Error",
					description: message,
				});

				setMessages((prev) =>
					prev.slice(0, prev.length - 1).concat([
						{
							role: "ai",
							message: `Whoops... ${message}`,
							createdAt: new Date(),
						},
					])
				);
			}
			// else {
			// 	console.log("Question asked successfully");
			// }
		});
		// } catch (error) {
		// 	console.error(error);
		// }

		console.log("MESSAGES AFTER SET: ");

		// useEffect(() => {
		// 	console.log("CHAT INIT");
		// });
	};

	return (
		<div className="flex flex-col h-full overflow-scroll">
			<div className="flex-1 w-full">
				{/* {messages.map((message) => (
					<div key={message.id}>
						<p>{message.message}</p>
					</div>
				))} */}
				{loading ? (
					<div className="flex items-center justify-center">
						<Loader2Icon className="h-20 w-20 text-indigo-600 animate-spin mt-20" />
					</div>
				) : (
					<div className="p-5">
						{messages.length === 0 && (
							<ChatMessage
								key={"placeholder"}
								message={{
									role: "ai",
									message:
										"Ask me anything about the document",
									createdAt: new Date(),
								}}
							/>
						)}

						{messages.map((message, index) => (
							<ChatMessage key={index} message={message} />
						))}

						<div ref={bottomOfChatRef} />
					</div>
				)}
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75"
			>
				<Input
					placeholder="Ask a Question..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="bg-white text-black"
				/>

				<Button type="submit" disabled={!input || isPending}>
					{isPending ? (
						<Loader2Icon className="animate-spin text-indigo-600" />
					) : (
						"Ask"
					)}
				</Button>
			</form>
		</div>
	);
};

export default Chat;
