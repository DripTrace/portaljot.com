// "use client";

// import { chatMemberAdminRef } from "@/lib/exotalk/converters/ChatsMembers";
// import { getDocs } from "firebase/firestore";
// import { useEffect, useState } from "react";

// function useAdminId({ chatId }: { chatId: string }) {
// 	const [adminId, setAdminId] = useState<string>("");

// 	useEffect(() => {
// 		const fetchAdminStatus = async () => {
// 			const adminId = (
// 				await getDocs(chatMemberAdminRef(chatId))
// 			).docs.map((doc) => doc.id)[0];

// 			setAdminId(adminId);
// 		};

// 		fetchAdminStatus();
// 	}, [chatId]);

// 	return adminId;
// }

// export default useAdminId;

"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to fetch the admin user's ID for a given chat from your Prisma-based API route.
 */
function useAdminId({ chatId }: { chatId: string }) {
	const [adminId, setAdminId] = useState<string>("");

	useEffect(() => {
		async function fetchAdmin() {
			try {
				const res = await fetch(`/api/exotalk/chats/${chatId}/admin`);
				if (!res.ok) {
					throw new Error("Failed to fetch admin ID");
				}
				const data = await res.json();
				setAdminId(data.adminId ?? "");
			} catch (error) {
				console.error("Error fetching admin ID:", error);
			}
		}

		fetchAdmin();
	}, [chatId]);

	return adminId;
}

export default useAdminId;
