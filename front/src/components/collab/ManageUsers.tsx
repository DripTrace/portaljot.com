// "use client";

// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useState, useTransition } from "react";
// import { removeUserFromDocument } from "@/actions/collab/actions";
// import { toast } from "sonner";
// import { collectionGroup, query, where } from "firebase/firestore";
// import { useUser } from "@clerk/nextjs";
// import { useCollection } from "react-firebase-hooks/firestore";
// import { db } from "@/firebase";
// import { useRoom } from "@liveblocks/react/suspense";
// import useOwner from "@/lib/collab/useOwner";

// function ManageUsers() {
// 	const { user } = useUser();
// 	const room = useRoom();
// 	const [usersInRoom] = useCollection(
// 		user &&
// 			query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
// 	);
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [isPending, startTransition] = useTransition();
// 	const isOwner = useOwner();

// 	const handleDelete = async (userId: string) => {
// 		startTransition(async () => {
// 			if (!user) return;
// 			const { success } = await removeUserFromDocument(room.id, userId);
// 			if (success) {
// 				toast("User removed successfully");
// 			} else {
// 				toast("Failed to remove user");
// 			}
// 		});
// 	};

// 	return (
// 		<Dialog open={isOpen} onOpenChange={setIsOpen}>
// 			<Button asChild variant="outline">
// 				<DialogTrigger>
// 					Users ({usersInRoom?.docs.length})
// 				</DialogTrigger>
// 			</Button>
// 			<DialogContent>
// 				<DialogHeader>
// 					<DialogTitle>Users with Access</DialogTitle>
// 					<DialogDescription>
// 						Below is a list of users who have access to this
// 						document.
// 					</DialogDescription>
// 				</DialogHeader>

// 				<hr className="my-2" />

// 				<div className="flex flex-col space-y-2">
// 					{usersInRoom?.docs.map((doc) => (
// 						<div
// 							key={doc.data().userId}
// 							className="flex items-center justify-between"
// 						>
// 							<p className="font-light">
// 								{doc.data().userId ===
// 								user?.emailAddresses[0].toString()
// 									? `You (${doc.data().userId})`
// 									: doc.data().userId}
// 							</p>
// 							<div className="flex items-center gap-2">
// 								<Button variant="outline">
// 									{doc.data().role}
// 								</Button>
// 								{isOwner &&
// 									doc.data().userId !==
// 										user?.emailAddresses[0].toString() && (
// 										<Button
// 											variant="destructive"
// 											onClick={() =>
// 												handleDelete(doc.data().userId)
// 											}
// 											disabled={isPending}
// 											size="sm"
// 										>
// 											{isPending ? "Removing…" : "X"}
// 										</Button>
// 									)}
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }

// export default ManageUsers;

"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRoom } from "@liveblocks/react/suspense";
import useOwner from "@/lib/collab/useOwner";
import { removeUserFromDocument } from "@/actions/collab/actions"; // Your Prisma-based action
// Define the membership type as returned by the API
type Membership = {
	userId: string;
	role: string;
};

function ManageUsers() {
	const { data: session } = useSession();
	const room = useRoom();
	const [memberships, setMemberships] = useState<Membership[]>([]);
	const [isLoadingMembers, setIsLoadingMembers] = useState<boolean>(true);
	const [isPending, startTransition] = useTransition();
	const isOwner = useOwner();

	// Fetch room memberships from our Prisma-backed API
	useEffect(() => {
		async function fetchMembers() {
			try {
				setIsLoadingMembers(true);
				const res = await fetch(`/api/collab/rooms/${room.id}/members`);
				if (!res.ok) {
					throw new Error(
						`Failed to fetch room members: ${res.status}`
					);
				}
				const data: Membership[] = await res.json();
				setMemberships(data);
			} catch (error: any) {
				console.error("Error fetching room members:", error.message);
			} finally {
				setIsLoadingMembers(false);
			}
		}
		if (room?.id) {
			fetchMembers();
		}
	}, [room]);

	const handleDelete = async (userId: string) => {
		startTransition(async () => {
			if (!session?.user?.id) return;
			const { success } = await removeUserFromDocument(room.id, userId);
			if (success) {
				toast("User removed successfully");
				setMemberships((prev) =>
					prev.filter((m) => m.userId !== userId)
				);
			} else {
				toast("Failed to remove user");
			}
		});
	};

	return (
		<Dialog>
			<Button asChild variant="outline">
				<DialogTrigger>
					{isLoadingMembers
						? "Loading..."
						: `Users (${memberships.length})`}
				</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Users with Access</DialogTitle>
					<DialogDescription>
						Below is a list of users who have access to this
						document.
					</DialogDescription>
				</DialogHeader>

				<hr className="my-2" />

				<div className="flex flex-col space-y-2">
					{memberships.map((membership) => (
						<div
							key={membership.userId}
							className="flex items-center justify-between"
						>
							<p className="font-light">
								{membership.userId === session?.user.email
									? `You (${membership.userId})`
									: membership.userId}
							</p>
							<div className="flex items-center gap-2">
								<Button variant="outline">
									{membership.role}
								</Button>
								{isOwner &&
									membership.userId !==
										session?.user.email && (
										<Button
											variant="destructive"
											onClick={() =>
												handleDelete(membership.userId)
											}
											disabled={isPending}
											size="sm"
										>
											{isPending ? "Removing…" : "X"}
										</Button>
									)}
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ManageUsers;
