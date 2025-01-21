// "use client";

// import { ChatMembers, chatMembersRef } from "@/lib/exotalk/converters/ChatsMembers";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import { Badge } from "@/components/ui/badge";
// import useIsAdmin from "@/hooks/exotalk/useAdminId";
// import UserAvatar from "./UserAvatar";
// import LoadingSpinner from "./loadingSpinner";

// function ChatMembersBadges({ chatId }: { chatId: string }) {
// 	const [members, loading, error] = useCollectionData<ChatMembers>(
// 		chatMembersRef(chatId)
// 	);

// 	const adminId = useIsAdmin({ chatId });

// 	if (loading && !members) return <LoadingSpinner />;

// 	return (
// 		!loading && (
// 			<div className="p-2 border rounded-xl m-5">
// 				<div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
// 					{members?.map((member) => (
// 						<Badge
// 							variant="secondary"
// 							key={member.email}
// 							className="h-14 p-5 pl-2 pr-5 flex space-x-2"
// 						>
// 							<div className="flex items-center space-x-2">
// 								<UserAvatar
// 									name={member.email}
// 									image={member.image}
// 								/>
// 							</div>

// 							<div>
// 								<p>{member.email}</p>
// 								{member.userId === adminId && (
// 									<p className="text-indigo-400 animate-pulse">
// 										Admin
// 									</p>
// 								)}
// 							</div>
// 						</Badge>
// 					))}
// 				</div>
// 			</div>
// 		)
// 	);
// }

// export default ChatMembersBadges;

"use client";

import { useEffect, useState } from "react";
import useIsAdmin from "@/hooks/exotalk/useAdminId";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "./loadingSpinner";
import UserAvatar from "./UserAvatar";

// Matches the shape in your Prisma ChatMember model
export interface ChatMembers {
	userId: string;
	email: string;
	image: string;
	isAdmin: boolean;
	chatId: string;
}

function ChatMembersBadges({ chatId }: { chatId: string }) {
	const [members, setMembers] = useState<ChatMembers[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const adminId = useIsAdmin({ chatId });

	// Fetch chat members from our new endpoint
	useEffect(() => {
		async function fetchChatMembers() {
			try {
				setLoading(true);
				const res = await fetch(`/api/exotalk/chats/${chatId}/members`);
				if (!res.ok) {
					throw new Error("Failed to fetch chat members");
				}
				const data: ChatMembers[] = await res.json();
				setMembers(data);
				setLoading(false);
			} catch (err) {
				setError(err as Error);
				setLoading(false);
			}
		}

		fetchChatMembers();
	}, [chatId]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<div className="p-2 border rounded-xl m-5 text-red-500">
				Error loading members: {error.message}
			</div>
		);
	}

	return (
		<div className="p-2 border rounded-xl m-5">
			<div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
				{members.map((member) => (
					<Badge
						variant="secondary"
						key={member.email}
						className="h-14 p-5 pl-2 pr-5 flex space-x-2"
					>
						<div className="flex items-center space-x-2">
							<UserAvatar
								name={member.email}
								image={member.image}
							/>
						</div>

						<div>
							<p>{member.email}</p>
							{member.userId === adminId && (
								<p className="text-indigo-400 animate-pulse">
									Admin
								</p>
							)}
						</div>
					</Badge>
				))}
			</div>
		</div>
	);
}

export default ChatMembersBadges;
