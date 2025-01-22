// "use client";

// import { db } from "@/config/collab/firebase";
// import { useUser } from "@clerk/nextjs";
// import { useRoom } from "@liveblocks/react/suspense";
// import { collectionGroup, query, where } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useCollection } from "react-firebase-hooks/firestore";

// function useOwner() {
// 	const { user } = useUser();
// 	const room = useRoom();
// 	const [isOwner, setIsOwner] = useState(false);
// 	const [usersInRoom] = useCollection(
// 		user &&
// 			query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
// 	);

// 	useEffect(() => {
// 		if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
// 			const owners = usersInRoom.docs.filter(
// 				(doc) => doc.data().role === "owner"
// 			);

// 			if (
// 				owners.some(
// 					(owner) =>
// 						owner.data().userId ===
// 						user?.emailAddresses[0].toString()
// 				)
// 			) {
// 				setIsOwner(true);
// 			}
// 		}
// 	}, [usersInRoom, user]);

// 	return isOwner;
// }

// export default useOwner;

"use client";

import { useSession } from "next-auth/react";
import { useRoom } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";

// Define the shape of a membership record returned from the API.
interface Membership {
	userId: string;
	role: "owner" | "editor";
}

function useOwner() {
	const { data: session } = useSession();
	const room = useRoom();
	const [isOwner, setIsOwner] = useState(false);

	useEffect(() => {
		async function fetchMemberships() {
			if (!room?.id || !session?.user?.email) return;
			try {
				const res = await fetch(`/api/collab/rooms/${room.id}/members`);
				if (!res.ok) {
					throw new Error("Failed to fetch room memberships");
				}
				const memberships: Membership[] = await res.json();
				// Filter memberships for "owner" role and check if the current user's email is present.
				const owners = memberships.filter((m) => m.role === "owner");
				const isUserOwner = owners.some(
					(owner) => owner.userId === session.user.email
				);
				setIsOwner(isUserOwner);
			} catch (error) {
				console.error("Error fetching memberships:", error);
				setIsOwner(false);
			}
		}

		fetchMemberships();
	}, [room?.id, session?.user?.email]);

	return isOwner;
}

export default useOwner;
