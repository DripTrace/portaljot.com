// /app/exotalk/(user)/chat/[chatId]/page.tsx
import { authOptions } from "@/app/api/modify/auth/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/client/prisma";
import { LanguagesSupported } from "@/store/exotalk/store";
import { redirect } from "next/navigation";
import AdminControls from "@/components/exotalk/AdminControls";
import ChatMembersBadges from "@/components/exotalk/ChatMembersBadges";
import ChatMessages from "@/components/exotalk/ChatMessages";
import ChatInput from "@/components/exotalk/ChatInput";
import { User } from "@/types/exotalk/MessageTypes";

type Props = {
	params: {
		chatId: string;
	};
};

export default async function Chats({ params: { chatId } }: Props) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		// If user not logged in, redirect or handle as needed
		redirect("/exotalk/chat?error=not-logged-in");
	}

	// 1) Load all messages for this chat, sorted by timestamp ascending
	const initialMessages = (
		await prisma.message.findMany({
			where: { chatId },
			orderBy: { timestamp: "asc" },
		})
	).map((msg) => ({
		...msg,
		user: msg.user as unknown as User,
		translated:
			(msg.translated as { [K in LanguagesSupported]?: string }) || {},
	}));

	// 2) Check if the user is a member of this chat
	//    If you store chat membership in ChatMember
	const membership = await prisma.chatMember.findFirst({
		where: {
			chatId,
			userId: session.user.id,
		},
	});

	if (!membership) {
		redirect("/exotalk/chat?error=permission");
	}

	// 3) Render the chat UI with the loaded messages
	return (
		<>
			<AdminControls chatId={chatId} />
			<ChatMembersBadges chatId={chatId} />

			<div className="flex-1">
				<ChatMessages
					chatId={chatId}
					session={session}
					initialMessages={initialMessages}
				/>
			</div>

			<ChatInput chatId={chatId} />
		</>
	);
}
