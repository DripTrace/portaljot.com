// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";

// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import Link from "next/link";
// // import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export const dynamic = "force-dynamic";

// async function fetchChatbots(userId: string) {
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		const { data } = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		return data?.chatbotsByUser || null;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		return null;
// 	}
// }

// async function ViewChatbots() {
// 	// "use server";

// 	// const handleClick = () => {
// 	//   router.refresh();
// 	// };

// 	console.log("viewing chatbots . . .");
// 	// const { userId } = await auth();
// 	// console.log("userId\n", userId);
// 	// const { date, setDate } = useState("");

// 	// useEffect(() => {
// 	// 	setDate(new Date().toISOString());
// 	// });

// 	// if (!userId) {
// 	// 	console.log("No user id found");
// 	// 	return;
// 	// }
// 	// console.log("userId\n", userId);

// 	// try {
// 	// 	const { data } = await serverClient.query<
// 	// 		GetChatbotsByUserData,
// 	// 		GetChatbotsByUserDataVariables
// 	// 	>({
// 	// 		query: GET_CHATBOTS_BY_USER,
// 	// 		variables: { clerk_user_id: userId },
// 	// 	});

// 	// 	console.log("RETRIEVED DATA . . .\n", data);

// 	// 	if (!data || !data.chatbotsByUser) {
// 	// 		console.log("No chatbots data returned");
// 	// 		return <div>No chatbots found. Try creating one!</div>;
// 	// 	}

// 	// } catch (error) {
// 	// 	console.error("Error fetching chatbots:", error);
// 	// 	return (
// 	// 		<div>
// 	// 			An error occurred while fetching your chatbots. Please try again
// 	// 			later.
// 	// 		</div>
// 	// 	);
// 	// }

// 	// console.log("RETRIEVED CHATBOTS . . .\n", chatbotsByUser);
// 	// const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
// 	// 	(a, b) =>
// 	// 		new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// 	// );
// 	// console.log("sortedChatbotsByUser\n", sortedChatbotsByUser);

// 	// try {
// 	//     const { data: chatbotsByUser } = await serverClient.query
// 	//       GetChatbotsByUserData,
// 	//       GetChatbotsByUserDataVariables
// 	//     >({
// 	//       query: GET_CHATBOTS_BY_USER,
// 	//       variables: { clerk_user_id: userId },
// 	//     });

// 	//     if (!data || !data.chatbotsByUser) {
// 	//       console.log("No chatbots data returned");
// 	//       return <div>No chatbots found. Try creating one!</div>;
// 	//     }

// 	//     console.log("RETRIEVED CHATBOTS . . .\n", data.chatbotsByUser);
// 	//     const sortedChatbotsByUser: Chatbot[] = [...data.chatbotsByUser].sort(
// 	//       (a, b) =>
// 	//         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// 	//     );
// 	//     console.log("sortedChatbotsByUser\n", sortedChatbotsByUser);

// 	//     // Rest of your component rendering logic
// 	//   } catch (error) {
// 	//     console.error("Error fetching chatbots:", error);
// 	//     return <div>An error occurred while fetching your chatbots. Please try again later.</div>;
// 	//   }
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	const chatbots = await fetchChatbots(userId);

// 	// Sort chatbots by creation date
// 	const sortedChatbotsByUser: Chatbot[] = chatbots
// 		? [...chatbots].sort(
// 				(a, b) =>
// 					new Date(b.created_at).getTime() -
// 					new Date(a.created_at).getTime()
// 		  )
// 		: [];

// 	async function refresh() {
// 		"use server";
// 		revalidatePath("/view-chatbots");
// 	}

// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<h1 className="text-xl lg:text-3xl font-semibold mb-5">
// 				Active Chatbots
// 			</h1>

// 			{sortedChatbotsByUser.length === 0 && (
// 				<div>
// 					<p>
// 						You have not created any chatbots yet, Click on the
// 						button below to create one.
// 					</p>
// 					<Link href="/create-chatbot">
// 						<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 							Create Chatbot
// 						</Button>
// 					</Link>
// 				</div>
// 			)}

// 			<ul className="flex flex-col space-y-5">
// 				{sortedChatbotsByUser?.map((chatbot) => (
// 					<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
// 						<li
// 							key={chatbot.id}
// 							className="relative p-10 border rounded-md max-w-3xl bg-white"
// 						>
// 							<div className="flex justify-between items-center">
// 								<div className="flex items-center space-x-4">
// 									<Avatar seed={chatbot.name} />
// 									<h2 className="text-xl font-bold">
// 										{chatbot.name}
// 									</h2>
// 								</div>

// 								<p className="absolute top-5 right-5 text-xs text-gray-400">
// 									Created:{" "}
// 									{new Date(
// 										chatbot.created_at
// 									).toLocaleString()}
// 								</p>
// 							</div>

// 							<hr className="mt-2" />

// 							<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 								<h3 className="italic">Characteristics:</h3>

// 								<ul className="text-xs">
// 									{!chatbot.chatbot_characteristics
// 										.length && (
// 										<p>No characteristics added yet.</p>
// 									)}
// 									{chatbot.chatbot_characteristics.map(
// 										(characteristic) => (
// 											<li
// 												className="list-disc break-words"
// 												key={characteristic.id}
// 											>
// 												{characteristic.content}
// 											</li>
// 										)
// 									)}
// 								</ul>

// 								<h3 className="italic">No of Sessions:</h3>
// 								<p>{chatbot.chat_sessions.length}</p>
// 							</div>
// 						</li>
// 					</Link>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

// export default ViewChatbots;

// function RefreshButton() {
// 	const router = useRouter();

// 	return (
// 		<Button
// 			onClick={() => router.refresh()}
// 			className="bg-[#64B5F5] text-white p-3 rounded-md"
// 		>
// 			Refresh
// 		</Button>
// 	);
// }

// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { Suspense } from "react";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// async function fetchChatbots(userId: string): Promise<Chatbot[] | null> {
// 	console.log("Fetching chatbots for user:", userId);
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		console.log(
// 			"GraphQL Endpoint:",
// 			process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
// 		);
// 		console.log("Executing query:", GET_CHATBOTS_BY_USER);

// 		const { data, errors } = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		if (errors) {
// 			console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
// 			return null;
// 		}

// 		console.log("Raw data returned:", JSON.stringify(data, null, 2));

// 		if (!data || !data.chatbotsByUser) {
// 			console.log("No chatbots data returned");
// 			return [];
// 		}

// 		console.log(
// 			"Chatbots fetched:",
// 			JSON.stringify(data.chatbotsByUser, null, 2)
// 		);
// 		return data.chatbotsByUser;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		return null;
// 	}
// }

// function ChatbotList({ chatbots }: { chatbots: Chatbot[] }) {
// 	console.log("Rendering ChatbotList with chatbots:", chatbots);

// 	if (chatbots.length === 0) {
// 		return (
// 			<div>
// 				<p>
// 					You have not created any chatbots yet. Click on the button
// 					below to create one.
// 				</p>
// 				<Link href="/create-chatbot">
// 					<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 						Create Chatbot
// 					</Button>
// 				</Link>
// 			</div>
// 		);
// 	}

// 	return (
// 		<ul className="flex flex-col space-y-5">
// 			{chatbots.map((chatbot) => (
// 				<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
// 					<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 						<div className="flex justify-between items-center">
// 							<div className="flex items-center space-x-4">
// 								<Avatar seed={chatbot.name} />
// 								<h2 className="text-xl font-bold">
// 									{chatbot.name}
// 								</h2>
// 							</div>
// 							<p className="absolute top-5 right-5 text-xs text-gray-400">
// 								Created:{" "}
// 								{new Date(chatbot.created_at).toLocaleString()}
// 							</p>
// 						</div>
// 						<hr className="mt-2" />
// 						<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 							<h3 className="italic">Characteristics:</h3>
// 							<ul className="text-xs">
// 								{!chatbot.chatbot_characteristics.length && (
// 									<p>No characteristics added yet.</p>
// 								)}
// 								{chatbot.chatbot_characteristics.map(
// 									(characteristic) => (
// 										<li
// 											className="list-disc break-words"
// 											key={characteristic.id}
// 										>
// 											{characteristic.content}
// 										</li>
// 									)
// 								)}
// 							</ul>
// 							<h3 className="italic">No of Sessions:</h3>
// 							<p>{chatbot.chat_sessions.length}</p>
// 						</div>
// 					</li>
// 				</Link>
// 			))}
// 		</ul>
// 	);
// }

// async function ChatbotListContainer() {
// 	const { userId } = await auth();

// 	if (!userId) {
// 		console.log("No user id found, returning login message");
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	try {
// 		const chatbots = await fetchChatbots(userId);
// 		console.log("Chatbots fetched in ChatbotListContainer:", chatbots);

// 		if (chatbots === null) {
// 			console.log("No chatbots found or an error occurred");
// 			return <div>No chatbots found. Try creating one!</div>;
// 		}

// 		// Sort chatbots by creation date
// 		const sortedChatbots = [...chatbots].sort(
// 			(a, b) =>
// 				new Date(b.created_at).getTime() -
// 				new Date(a.created_at).getTime()
// 		);

// 		return <ChatbotList chatbots={sortedChatbots} />;
// 	} catch (error) {
// 		console.error("Error in ChatbotListContainer:", error);
// 		return (
// 			<div>
// 				An error occurred while fetching your chatbots. Please try again
// 				later.
// 			</div>
// 		);
// 	}
// }

// export default function ViewChatbots() {
// 	console.log("ViewChatbots component rendering");

// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<h1 className="text-xl lg:text-3xl font-semibold mb-5">
// 				Active Chatbots
// 			</h1>
// 			<Suspense fallback={<div>Loading chatbots...</div>}>
// 				<ChatbotListContainer />
// 			</Suspense>
// 		</div>
// 	);
// }

// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// async function fetchChatbots(userId: string) {
// 	console.log("Fetching chatbots for user:", userId);
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		console.log("Executing query:", GET_CHATBOTS_BY_USER);
// 		console.log("With variables:", { clerk_user_id: userId });

// 		const { data, errors } = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		if (errors) {
// 			console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
// 			return null;
// 		}

// 		console.log("Raw data returned:", JSON.stringify(data, null, 2));

// 		if (!data || !data.chatbotsByUser) {
// 			console.log("No chatbots data returned");
// 			return null;
// 		}

// 		console.log(
// 			"Chatbots fetched:",
// 			JSON.stringify(data.chatbotsByUser, null, 2)
// 		);
// 		return data.chatbotsByUser;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		return null;
// 	}
// }

// export default async function ViewChatbots() {
// 	console.log("ViewChatbots component rendering");
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	const chatbots = await fetchChatbots(userId);

// 	if (chatbots === null) {
// 		return (
// 			<div>
// 				An error occurred while fetching your chatbots. Please try again
// 				later.
// 			</div>
// 		);
// 	}

// 	// Sort chatbots by creation date
// 	const sortedChatbots: Chatbot[] = [...chatbots].sort(
// 		(a, b) =>
// 			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// 	);

// 	console.log("Sorted chatbots:", JSON.stringify(sortedChatbots, null, 2));
// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<div className="flex justify-between items-center mb-5">
// 				<h1 className="text-xl lg:text-3xl font-semibold">
// 					Active Chatbots
// 				</h1>
// 				{/* <RefreshButton /> */}
// 			</div>

// 			{sortedChatbots.length === 0 ? (
// 				<div>
// 					<p>
// 						You have not created any chatbots yet. Click on the
// 						button below to create one.
// 					</p>
// 					<Link href="/create-chatbot">
// 						<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 							Create Chatbot
// 						</Button>
// 					</Link>
// 				</div>
// 			) : (
// 				<ul className="flex flex-col space-y-5">
// 					{sortedChatbots.map((chatbot) => (
// 						<Link
// 							key={chatbot.id}
// 							href={`/edit-chatbot/${chatbot.id}`}
// 						>
// 							<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 								<div className="flex justify-between items-center">
// 									<div className="flex items-center space-x-4">
// 										<Avatar seed={chatbot.name} />
// 										<h2 className="text-xl font-bold">
// 											{chatbot.name}
// 										</h2>
// 									</div>
// 									<p className="absolute top-5 right-5 text-xs text-gray-400">
// 										Created:{" "}
// 										{new Date(
// 											chatbot.created_at
// 										).toLocaleString()}
// 									</p>
// 								</div>
// 								<hr className="mt-2" />
// 								<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 									<h3 className="italic">Characteristics:</h3>
// 									<ul className="text-xs">
// 										{!chatbot.chatbot_characteristics
// 											.length && (
// 											<p>No characteristics added yet.</p>
// 										)}
// 										{chatbot.chatbot_characteristics.map(
// 											(characteristic) => (
// 												<li
// 													className="list-disc break-words"
// 													key={characteristic.id}
// 												>
// 													{characteristic.content}
// 												</li>
// 											)
// 										)}
// 									</ul>
// 									<h3 className="italic">No of Sessions:</h3>
// 									<p>{chatbot.chat_sessions.length}</p>
// 								</div>
// 							</li>
// 						</Link>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// }

// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// async function fetchChatbots(userId: string) {
// 	console.log("Fetching chatbots for user:", userId);
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		console.log(
// 			"GraphQL Endpoint:",
// 			process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
// 		);
// 		console.log("Executing query:", GET_CHATBOTS_BY_USER);
// 		console.log("With variables:", { clerk_user_id: userId });

// 		const result = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		console.log("Full GraphQL result:", JSON.stringify(result, null, 2));

// 		if (result.errors) {
// 			console.error(
// 				"GraphQL Errors:",
// 				JSON.stringify(result.errors, null, 2)
// 			);
// 			return null;
// 		}

// 		if (!result.data || !result.data.chatbotsByUser) {
// 			console.log("No chatbots data returned");
// 			return null;
// 		}

// 		console.log(
// 			"Chatbots fetched:",
// 			JSON.stringify(result.data.chatbotsByUser, null, 2)
// 		);
// 		return result.data.chatbotsByUser;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		return null;
// 	}
// }

// export default async function ViewChatbots() {
// 	console.log("ViewChatbots component rendering");
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	const chatbots = await fetchChatbots(userId);

// 	// Sort chatbots by creation date
// 	const sortedChatbots: Chatbot[] = chatbots
// 		? [...chatbots].sort(
// 				(a, b) =>
// 					new Date(b.created_at).getTime() -
// 					new Date(a.created_at).getTime()
// 		  )
// 		: [];

// 	console.log("Sorted chatbots:", sortedChatbots);

// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<div className="flex justify-between items-center mb-5">
// 				<h1 className="text-xl lg:text-3xl font-semibold">
// 					Active Chatbots
// 				</h1>
// 				{/* <RefreshButton /> */}
// 			</div>

// 			{sortedChatbots.length === 0 ? (
// 				<div>
// 					<p>
// 						You have not created any chatbots yet. Click on the
// 						button below to create one.
// 					</p>
// 					<Link href="/create-chatbot">
// 						<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 							Create Chatbot
// 						</Button>
// 					</Link>
// 				</div>
// 			) : (
// 				<ul className="flex flex-col space-y-5">
// 					{sortedChatbots.map((chatbot) => (
// 						<Link
// 							key={chatbot.id}
// 							href={`/edit-chatbot/${chatbot.id}`}
// 						>
// 							<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 								<div className="flex justify-between items-center">
// 									<div className="flex items-center space-x-4">
// 										<Avatar seed={chatbot.name} />
// 										<h2 className="text-xl font-bold">
// 											{chatbot.name}
// 										</h2>
// 									</div>
// 									<p className="absolute top-5 right-5 text-xs text-gray-400">
// 										Created:{" "}
// 										{new Date(
// 											chatbot.created_at
// 										).toLocaleString()}
// 									</p>
// 								</div>
// 								<hr className="mt-2" />
// 								<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 									<h3 className="italic">Characteristics:</h3>
// 									<ul className="text-xs">
// 										{!chatbot.chatbot_characteristics
// 											.length && (
// 											<p>No characteristics added yet.</p>
// 										)}
// 										{chatbot.chatbot_characteristics.map(
// 											(characteristic) => (
// 												<li
// 													className="list-disc break-words"
// 													key={characteristic.id}
// 												>
// 													{characteristic.content}
// 												</li>
// 											)
// 										)}
// 									</ul>
// 									<h3 className="italic">No of Sessions:</h3>
// 									<p>{chatbot.chat_sessions.length}</p>
// 								</div>
// 							</li>
// 						</Link>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// }

// function RefreshButton() {
//   const router = useRouter();

//   return (
//     <Button
//       onClick={() => router.refresh()}
//       className="bg-[#64B5F5] text-white p-3 rounded-md"
//     >
//       Refresh
//     </Button>
//   );
// }

//no query errors
// app/(admin)/view-chatbots/page.tsx
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import Link from "next/link";
// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import { serverClient } from "@/lib/server/serverClient";
// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";

// export const dynamic = "force-dynamic";

// async function fetchChatbots(userId: string) {
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		const { data } = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		return data?.chatbotsByUser || null;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		return null;
// 	}
// }

// export default async function ViewChatbots() {
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	const chatbots = await fetchChatbots(userId);

// 	// Sort chatbots by creation date
// 	const sortedChatbots: Chatbot[] = chatbots
// 		? [...chatbots].sort(
// 				(a, b) =>
// 					new Date(b.created_at).getTime() -
// 					new Date(a.created_at).getTime()
// 		  )
// 		: [];

// 	async function refresh() {
// 		"use server";
// 		revalidatePath("/view-chatbots");
// 	}

// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<div className="flex justify-between items-center mb-5">
// 				<h1 className="text-xl lg:text-3xl font-semibold">
// 					Active Chatbots
// 				</h1>
// 				<form action={refresh}>
// 					<Button
// 						type="submit"
// 						className="bg-[#64B5F5] text-white p-3 rounded-md"
// 					>
// 						Refresh
// 					</Button>
// 				</form>
// 			</div>

// 			{!sortedChatbots.length ? (
// 				<div>
// 					<p>
// 						You have not created any chatbots yet. Click on the
// 						button below to create one.
// 					</p>
// 					<Link href="/create-chatbot">
// 						<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 							Create Chatbot
// 						</Button>
// 					</Link>
// 				</div>
// 			) : (
// 				<ul className="flex flex-col space-y-5">
// 					{sortedChatbots.map((chatbot) => (
// 						<Link
// 							key={chatbot.id}
// 							href={`/edit-chatbot/${chatbot.id}`}
// 						>
// 							<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 								<div className="flex justify-between items-center">
// 									<div className="flex items-center space-x-4">
// 										<Avatar seed={chatbot.name} />
// 										<h2 className="text-xl font-bold">
// 											{chatbot.name}
// 										</h2>
// 									</div>
// 									<p className="absolute top-5 right-5 text-xs text-gray-400">
// 										Created:{" "}
// 										{new Date(
// 											chatbot.created_at
// 										).toLocaleString()}
// 									</p>
// 								</div>
// 								<hr className="mt-2" />
// 								<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 									<h3 className="italic">Characteristics:</h3>
// 									<ul className="text-xs">
// 										{!chatbot.chatbot_characteristics
// 											.length ? (
// 											<p>No characteristics added yet.</p>
// 										) : (
// 											chatbot.chatbot_characteristics.map(
// 												(characteristic) => (
// 													<li
// 														className="list-disc break-words"
// 														key={characteristic.id}
// 													>
// 														{characteristic.content}
// 													</li>
// 												)
// 											)
// 										)}
// 									</ul>
// 									<h3 className="italic">No of Sessions:</h3>
// 									<p>{chatbot.chat_sessions.length}</p>
// 								</div>
// 							</li>
// 						</Link>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// }

// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import client, { BASE_URL } from "@/graphql/commune/apolloClient";
// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import Link from "next/link";
// import { Suspense } from "react";
// import { cache } from "react";

// export const dynamic = "force-dynamic";

// const fetchChatbots = cache(async (userId: string) => {
// 	console.log("Fetching chatbots for user:", userId);
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		console.log("GraphQL URL:", `${BASE_URL}/api/graphql`);
// 		console.log("Executing query:", GET_CHATBOTS_BY_USER);
// 		console.log("With variables:", { clerk_user_id: userId });

// 		const result = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		console.log("Full GraphQL result:", JSON.stringify(result, null, 2));

// 		if (result.errors) {
// 			console.error(
// 				"GraphQL Errors:",
// 				JSON.stringify(result.errors, null, 2)
// 			);
// 			return null;
// 		}

// 		if (!result.data || !result.data.chatbotsByUser) {
// 			console.log("No chatbots data returned");
// 			return null;
// 		}

// 		console.log(
// 			"Chatbots fetched:",
// 			JSON.stringify(result.data.chatbotsByUser, null, 2)
// 		);
// 		return result.data.chatbotsByUser;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		throw error;
// 	}
// });

// function ChatbotList({ chatbots }: { chatbots: Chatbot[] }) {
// 	return (
// 		<ul className="flex flex-col space-y-5">
// 			{chatbots.map((chatbot) => (
// 				<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
// 					<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 						<div className="flex justify-between items-center">
// 							<div className="flex items-center space-x-4">
// 								<Avatar seed={chatbot.name} />
// 								<h2 className="text-xl font-bold">
// 									{chatbot.name}
// 								</h2>
// 							</div>
// 							<p className="absolute top-5 right-5 text-xs text-gray-400">
// 								Created:{" "}
// 								{new Date(chatbot.created_at).toLocaleString()}
// 							</p>
// 						</div>
// 						<hr className="mt-2" />
// 						<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 							<h3 className="italic">Characteristics:</h3>
// 							<ul className="text-xs">
// 								{!chatbot.chatbot_characteristics.length && (
// 									<p>No characteristics added yet.</p>
// 								)}
// 								{chatbot.chatbot_characteristics.map(
// 									(characteristic) => (
// 										<li
// 											className="list-disc break-words"
// 											key={characteristic.id}
// 										>
// 											{characteristic.content}
// 										</li>
// 									)
// 								)}
// 							</ul>
// 							<h3 className="italic">No of Sessions:</h3>
// 							<p>{chatbot.chat_sessions.length}</p>
// 						</div>
// 					</li>
// 				</Link>
// 			))}
// 		</ul>
// 	);
// }

// async function ChatbotListContainer() {
// 	console.log("ChatbotListContainer rendering");
// 	const { userId } = await auth();

// 	console.log("User ID from auth:", userId);

// 	if (!userId) {
// 		console.log("No user ID, returning login message");
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	console.log("Calling fetchChatbots");
// 	const chatbots = await fetchChatbots(userId);
// 	console.log("Chatbots returned:", chatbots);

// 	if (!chatbots || chatbots.length === 0) {
// 		console.log("No chatbots found, returning create chatbot message");
// 		return (
// 			<div>
// 				<p>
// 					You have not created any chatbots yet. Click on the button
// 					below to create one.
// 				</p>
// 				<Link href="/create-chatbot">
// 					<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 						Create Chatbot
// 					</Button>
// 				</Link>
// 			</div>
// 		);
// 	}

// 	const sortedChatbots = [...chatbots].sort(
// 		(a, b) =>
// 			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// 	);
// 	console.log("Sorted chatbots:", sortedChatbots);

// 	return <ChatbotList chatbots={sortedChatbots} />;
// }

// export default function ViewChatbots() {
// 	console.log("ViewChatbots rendering");

// 	async function refresh() {
// 		"use server";
// 		console.log("Refreshing...");
// 		revalidatePath("/view-chatbots");
// 	}

// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<div className="flex justify-between items-center mb-5">
// 				<h1 className="text-xl lg:text-3xl font-semibold">
// 					Active Chatbots
// 				</h1>
// 				<form action={refresh}>
// 					<Button
// 						type="submit"
// 						className="bg-[#64B5F5] text-white p-3 rounded-md"
// 					>
// 						Refresh
// 					</Button>
// 				</form>
// 			</div>
// 			<Suspense fallback={<div>Loading chatbots...</div>}>
// 				<ChatbotListContainer />
// 			</Suspense>
// 		</div>
// 	);
// }

// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import { Chatbot } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";
// import Link from "next/link";
// import { Suspense } from "react";
// import { fetchChatbots } from "@/lib/server/serverActions";

// export const dynamic = "force-dynamic";

// function ChatbotList({ chatbots }: { chatbots: Chatbot[] }) {
// 	return (
// 		<ul className="flex flex-col space-y-5">
// 			{chatbots.map((chatbot) => (
// 				<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
// 					<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 						{/* ... (rest of the ChatbotList component) ... */}
// 					</li>
// 				</Link>
// 			))}
// 		</ul>
// 	);
// }

// async function ChatbotListContainer() {
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	const chatbots = await fetchChatbots(userId);

// 	if (!chatbots || chatbots.length === 0) {
// 		return (
// 			<div>
// 				<p>
// 					You have not created any chatbots yet. Click on the button
// 					below to create one.
// 				</p>
// 				<Link href="/create-chatbot">
// 					<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 						Create Chatbot
// 					</Button>
// 				</Link>
// 			</div>
// 		);
// 	}

// 	const sortedChatbots = [...chatbots].sort(
// 		(a, b) =>
// 			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// 	);

// 	return <ChatbotList chatbots={sortedChatbots} />;
// }

// export default function ViewChatbots() {
// 	async function refresh() {
// 		"use server";
// 		revalidatePath("/view-chatbots");
// 	}

// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<div className="flex justify-between items-center mb-5">
// 				<h1 className="text-xl lg:text-3xl font-semibold">
// 					Active Chatbots
// 				</h1>
// 				<form action={refresh}>
// 					<Button
// 						type="submit"
// 						className="bg-[#64B5F5] text-white p-3 rounded-md"
// 					>
// 						Refresh
// 					</Button>
// 				</form>
// 			</div>
// 			<Suspense fallback={<div>Loading chatbots...</div>}>
// 				<ChatbotListContainer />
// 			</Suspense>
// 		</div>
// 	);
// }

// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { Suspense } from "react";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// async function fetchChatbots(userId: string) {
// 	console.log("Fetching chatbots for user:", userId);
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		console.log(
// 			"GraphQL Endpoint:",
// 			process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
// 		);
// 		console.log("Executing query:", GET_CHATBOTS_BY_USER);
// 		console.log("With variables:", { clerk_user_id: userId });

// 		// Add a delay before executing the query
// 		await delay(2000);

// 		const { data, errors } = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		if (errors) {
// 			console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
// 			return null;
// 		}

// 		console.log("Raw data returned:", JSON.stringify(data, null, 2));

// 		if (!data || !data.chatbotsByUser) {
// 			console.log("No chatbots data returned");
// 			return null;
// 		}

// 		console.log(
// 			"Chatbots fetched:",
// 			JSON.stringify(data.chatbotsByUser, null, 2)
// 		);
// 		return data.chatbotsByUser;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		return null;
// 	}
// }

// async function ChatbotListContainer() {
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	const chatbots = await fetchChatbots(userId);

// 	if (!chatbots || chatbots.length === 0) {
// 		return (
// 			<div>
// 				<p>
// 					You have not created any chatbots yet. Click on the button
// 					below to create one.
// 				</p>
// 				<Link href="/create-chatbot">
// 					<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 						Create Chatbot
// 					</Button>
// 				</Link>
// 			</div>
// 		);
// 	}

// 	const sortedChatbots = [...chatbots].sort(
// 		(a, b) =>
// 			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// 	);

// 	return (
// 		<ul className="flex flex-col space-y-5">
// 			{sortedChatbots.map((chatbot) => (
// 				<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
// 					<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 						<div className="flex justify-between items-center">
// 							<div className="flex items-center space-x-4">
// 								<Avatar seed={chatbot.name} />
// 								<h2 className="text-xl font-bold">
// 									{chatbot.name}
// 								</h2>
// 							</div>
// 							<p className="absolute top-5 right-5 text-xs text-gray-400">
// 								Created:{" "}
// 								{new Date(chatbot.created_at).toLocaleString()}
// 							</p>
// 						</div>
// 						<hr className="mt-2" />
// 						<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 							<h3 className="italic">Characteristics:</h3>
// 							<ul className="text-xs">
// 								{!chatbot.chatbot_characteristics.length && (
// 									<p>No characteristics added yet.</p>
// 								)}
// 								{chatbot.chatbot_characteristics.map(
// 									(characteristic) => (
// 										<li
// 											className="list-disc break-words"
// 											key={characteristic.id}
// 										>
// 											{characteristic.content}
// 										</li>
// 									)
// 								)}
// 							</ul>
// 							<h3 className="italic">No of Sessions:</h3>
// 							<p>{chatbot.chat_sessions.length}</p>
// 						</div>
// 					</li>
// 				</Link>
// 			))}
// 		</ul>
// 	);
// }

// export default function ViewChatbots() {
// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<h1 className="text-xl lg:text-3xl font-semibold mb-5">
// 				Active Chatbots
// 			</h1>
// 			<Suspense fallback={<div>Loading chatbots...</div>}>
// 				<ChatbotListContainer />
// 			</Suspense>
// 		</div>
// 	);
// }

// import Avatar from "@/components/Avatar";
// import { Button } from "@/components/ui/button";
// import { GET_CHATBOTS_BY_USER } from "@/graphql/commune/queries/queries";
// import { serverClient } from "@/lib/server/serverClient";
// import {
// 	Chatbot,
// 	GetChatbotsByUserData,
// 	GetChatbotsByUserDataVariables,
// } from "@/types/chatbot";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { Suspense } from "react";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// async function fetchChatbots(userId: string) {
// 	console.log("Fetching chatbots for user:", userId);
// 	if (!userId) {
// 		console.log("No user id found");
// 		return null;
// 	}

// 	try {
// 		console.log(
// 			"GraphQL Endpoint:",
// 			process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
// 		);
// 		console.log("Executing query:", GET_CHATBOTS_BY_USER);
// 		console.log("With variables:", { clerk_user_id: userId });

// 		const { data, errors } = await serverClient.query<
// 			GetChatbotsByUserData,
// 			GetChatbotsByUserDataVariables
// 		>({
// 			query: GET_CHATBOTS_BY_USER,
// 			variables: { clerk_user_id: userId },
// 		});

// 		if (errors) {
// 			console.error("GraphQL Errors:", JSON.stringify(errors, null, 2));
// 			return null;
// 		}

// 		console.log("Raw data returned:", JSON.stringify(data, null, 2));

// 		if (!data || !data.chatbotsByUser) {
// 			console.log("No chatbots data returned");
// 			return null;
// 		}

// 		console.log(
// 			"Chatbots fetched:",
// 			JSON.stringify(data.chatbotsByUser, null, 2)
// 		);
// 		return data.chatbotsByUser;
// 	} catch (error) {
// 		console.error("Error fetching chatbots:", error);
// 		return null;
// 	}
// }

// async function ChatbotListContainer() {
// 	const { userId } = await auth();

// 	if (!userId) {
// 		return <div>Please log in to view your chatbots.</div>;
// 	}

// 	const chatbots = await fetchChatbots(userId);

// 	if (!chatbots || chatbots.length === 0) {
// 		return (
// 			<div>
// 				<p>
// 					You have not created any chatbots yet. Click on the button
// 					below to create one.
// 				</p>
// 				<Link href="/create-chatbot">
// 					<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
// 						Create Chatbot
// 					</Button>
// 				</Link>
// 			</div>
// 		);
// 	}

// 	const sortedChatbots = [...chatbots].sort(
// 		(a, b) =>
// 			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
// 	);

// 	return (
// 		<ul className="flex flex-col space-y-5">
// 			{sortedChatbots.map((chatbot) => (
// 				<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
// 					<li className="relative p-10 border rounded-md max-w-3xl bg-white">
// 						<div className="flex justify-between items-center">
// 							<div className="flex items-center space-x-4">
// 								<Avatar seed={chatbot.name} />
// 								<h2 className="text-xl font-bold">
// 									{chatbot.name}
// 								</h2>
// 							</div>
// 							<p className="absolute top-5 right-5 text-xs text-gray-400">
// 								Created:{" "}
// 								{new Date(chatbot.created_at).toLocaleString()}
// 							</p>
// 						</div>
// 						<hr className="mt-2" />
// 						<div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
// 							<h3 className="italic">Characteristics:</h3>
// 							<ul className="text-xs">
// 								{!chatbot.chatbot_characteristics.length && (
// 									<p>No characteristics added yet.</p>
// 								)}
// 								{chatbot.chatbot_characteristics.map(
// 									(characteristic) => (
// 										<li
// 											className="list-disc break-words"
// 											key={characteristic.id}
// 										>
// 											{characteristic.content}
// 										</li>
// 									)
// 								)}
// 							</ul>
// 							<h3 className="italic">No of Sessions:</h3>
// 							<p>{chatbot.chat_sessions.length}</p>
// 						</div>
// 					</li>
// 				</Link>
// 			))}
// 		</ul>
// 	);
// }

// export default function ViewChatbots() {
// 	return (
// 		<div className="flex-1 pb-20 p-10">
// 			<h1 className="text-xl lg:text-3xl font-semibold mb-5">
// 				Active Chatbots
// 			</h1>
// 			<Suspense fallback={<div>Loading chatbots...</div>}>
// 				<ChatbotListContainer />
// 			</Suspense>
// 		</div>
// 	);
// }

"use server";

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchChatbots(userId: string) {
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
