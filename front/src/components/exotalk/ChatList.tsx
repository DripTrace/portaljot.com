// import { authOptions } from "@/auth";
// import { chatMembersCollectionGroupRef } from "@/lib/exotalk/converters/ChatsMembers";
// import { getServerSession } from "next-auth";
// import ChatListRows from "./ChatListRows";
// import { getDocs } from "firebase/firestore";

// async function ChatList() {
// 	const session = await getServerSession(authOptions);

// 	const chatsSnapshot = await getDocs(
// 		chatMembersCollectionGroupRef(session?.user.id!)
// 	);

// 	const initialChats = chatsSnapshot.docs.map((doc) => ({
// 		...doc.data(),
// 		timestamp: null,
// 	}));

// 	return <ChatListRows initialChats={initialChats} />;
// }

// export default ChatList;

import { authOptions } from "@/app/api/modify/auth/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/client/prisma"; // adjust path to your Prisma client
import ChatListRows from "./ChatListRows";

async function ChatList() {
	const session = await getServerSession(authOptions);

	// If there's no session or user.id, handle that gracefully
	if (!session?.user?.id) {
		return <div>Please sign in to see your chats.</div>;
	}

	// Query all ChatMember records where userId matches the logged-in user
	const memberships = await prisma.chatMember.findMany({
		where: {
			userId: session.user.id,
		},
		// You can also include related data if needed, e.g.:
		// include: { chat: true },
	});

	// In the original Firestore code, you spread doc.data() and added `timestamp: null`.
	// For parity, do the same here:
	const initialChats = memberships.map((m) => ({
		...m,
		timestamp: null,
		image: m.image ?? "", // Convert null to empty string
	}));

	return <ChatListRows initialChats={initialChats} />;
}

export default ChatList;
