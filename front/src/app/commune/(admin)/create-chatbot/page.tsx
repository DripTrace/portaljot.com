"use client";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_CHATBOT } from "@/graphql/mutations/mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

function CreateChatbot() {
	const [name, setName] = useState("");
	const { user } = useUser();
	const router = useRouter();
	const [date, setDate] = useState("");

	const [createChatbot, { data, loading, error }] = useMutation(
		CREATE_CHATBOT,
		{
			variables: {
				clerk_user_id: user?.id,
				name: name,
				created_at: date,
			},
		}
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const data = await createChatbot();
			setName(""); // Clear the input field after submission
			console.log("data\n", data);

			router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);
		} catch (err) {
			console.log("data\n", data);
			console.log("error\n", err);
			console.error(err);
		}
	};

	useEffect(() => {
		// setDate(new Date());
		setDate(new Date().toISOString());
		console.log("date\n", date);
		console.log("user\n", user);
		console.log("name\n", name);
		console.log("data\n", data);
	}, [name]);

	if (!user) {
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-center md:flex-row md:space-x-10  bg-white p-10 rounded-md m-10">
			<Avatar seed="create-chatbot" />
			<div>
				<h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
				<h2 className="font-light">
					Create a new chatbot to assist you in your conversations
					with your customers.
				</h2>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col md:flex-row gap-2 mt-5"
				>
					<Input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Chatbot Name"
						className="max-w-lg"
						required
					/>
					<Button type="submit" disabled={loading || !name}>
						{loading ? "Creating..." : "Create Chatbot"}
					</Button>
				</form>
				<p className="text-gray-300 mt-5">
					Example: Customer Support Chatbot
				</p>

				{error && <p>Error: {error.message}</p>}
			</div>
		</div>
	);
}

export default CreateChatbot;
