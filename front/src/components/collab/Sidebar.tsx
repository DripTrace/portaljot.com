// "use client";
// import SidebarOption from "./SidebarOption";
// import NewDocumentButton from "./NewDocumentButton";
// import { useUser } from "@clerk/nextjs";
// import { useCollection } from "react-firebase-hooks/firestore";
// import {
// 	collectionGroup,
// 	DocumentData,
// 	query,
// 	where,
// } from "firebase/firestore";
// import { db } from "@/firebase";

// import {
// 	Drawer,
// 	DrawerClose,
// 	DrawerContent,
// 	DrawerDescription,
// 	DrawerFooter,
// 	DrawerHeader,
// 	DrawerTitle,
// 	DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { MenuIcon } from "lucide-react";
// import { useEffect, useState } from "react";

// interface RoomDocument extends DocumentData {
// 	createdAt: string;
// 	role: "owner" | "editor";
// 	roomId: string;
// 	userId: string;
// }

// function Sidebar() {
// 	const { user } = useUser();
// 	const [groupedData, setGroupedData] = useState<{
// 		owner: RoomDocument[];
// 		editor: RoomDocument[];
// 	}>({ owner: [], editor: [] });

// 	const [data, loading, error] = useCollection(
// 		user &&
// 			query(
// 				collectionGroup(db, "rooms"),
// 				where("userId", "==", user?.emailAddresses[0].toString())
// 			)
// 	);

// 	useEffect(() => {
// 		if (!data) return;

// 		const grouped = data.docs.reduce<{
// 			owner: RoomDocument[];
// 			editor: RoomDocument[];
// 		}>(
// 			(acc, curr) => {
// 				const roomData = curr.data() as RoomDocument;

// 				if (roomData.role === "owner") {
// 					acc.owner.push({ id: curr.id, ...roomData });
// 				} else {
// 					acc.editor.push({ id: curr.id, ...roomData });
// 				}
// 				return acc;
// 			},
// 			{ owner: [], editor: [] }
// 		);
// 		setGroupedData(grouped);
// 	}, [data]);

// 	const menuOptions = (
// 		<>
// 			<NewDocumentButton />

// 			<div className="flex py-4 flex-col space-y-4 md:max-w-36">
// 				{groupedData.owner.length === 0 ? (
// 					<h2 className="text-gray-500 font-semibold text-sm">
// 						No documents found
// 					</h2>
// 				) : (
// 					<>
// 						<h2 className="text-gray-500 font-semibold text-sm">
// 							My Documents
// 						</h2>
// 						{groupedData.owner.map((doc) => (
// 							<SidebarOption
// 								key={doc.id}
// 								id={doc.id}
// 								href={`/collab/doc/${doc.id}`}
// 							/>
// 						))}
// 					</>
// 				)}

// 				{groupedData.editor.length > 0 && (
// 					<>
// 						<h2 className="text-gray-500 font-semibold text-sm">
// 							Shared with Me
// 						</h2>
// 						{groupedData.editor.map((doc) => (
// 							<SidebarOption
// 								key={doc.id}
// 								id={doc.id}
// 								href={`/collab/doc/${doc.id}`}
// 							/>
// 						))}
// 					</>
// 				)}
// 			</div>
// 		</>
// 	);

// 	return (
// 		<div className="p-2 md:p-5 bg-gray-200 relative">
// 			<div className="sticky top-5 left-5 md:hidden">
// 				<Drawer direction="left">
// 					<DrawerTrigger className="bg-gray-300 rounded-lg border">
// 						<MenuIcon
// 							className="p-2 hover:opacity-30 rounded-lg"
// 							size={40}
// 						/>
// 					</DrawerTrigger>
// 					<DrawerContent className="h-full w-80 fixed z-50 overflow-y-auto rounded-none">
// 						<DrawerHeader>
// 							<DrawerTitle>Menu</DrawerTitle>
// 						</DrawerHeader>
// 						<div className="flex flex-col space-y-4 p-4">
// 							{menuOptions}
// 						</div>
// 						<DrawerFooter>
// 							<DrawerClose>
// 								<Button variant="outline">Close</Button>
// 							</DrawerClose>
// 						</DrawerFooter>
// 					</DrawerContent>
// 				</Drawer>
// 			</div>

// 			<div className="hidden md:inline">{menuOptions}</div>
// 		</div>
// 	);
// }

// export default Sidebar;

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";
import NewDocumentButton from "./NewDocumentButton";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// Define an interface that matches the shape returned by the API.
export interface RoomDocument {
	id: string;
	role: "owner" | "editor";
	docId: string;
	document: {
		title: string | null;
		createdAt: string;
	};
	userId: string;
}

interface GroupedRooms {
	owner: RoomDocument[];
	editor: RoomDocument[];
}

function Sidebar() {
	const { data: session } = useSession();
	const router = useRouter();
	const [groupedData, setGroupedData] = useState<GroupedRooms>({
		owner: [],
		editor: [],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchRooms() {
			if (!session?.user?.email) return;
			try {
				setLoading(true);
				const res = await fetch(
					`/api/collab/rooms?userEmail=${encodeURIComponent(session.user.email)}`
				);
				if (!res.ok) {
					throw new Error(`Failed to fetch rooms: ${res.status}`);
				}
				const data: RoomDocument[] = await res.json();
				// Group by role:
				const grouped = data.reduce<GroupedRooms>(
					(acc, doc) => {
						if (doc.role === "owner") {
							acc.owner.push(doc);
						} else {
							acc.editor.push(doc);
						}
						return acc;
					},
					{ owner: [], editor: [] }
				);
				setGroupedData(grouped);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchRooms();
	}, [session]);

	const menuOptions = (
		<>
			<NewDocumentButton />
			<div className="flex py-4 flex-col space-y-4 md:max-w-36">
				{groupedData.owner.length === 0 ? (
					<h2 className="text-gray-500 font-semibold text-sm">
						No documents found
					</h2>
				) : (
					<>
						<h2 className="text-gray-500 font-semibold text-sm">
							My Documents
						</h2>
						{groupedData.owner.map((doc) => (
							<SidebarOption
								key={doc.id}
								id={doc.docId}
								href={`/collab/doc/${doc.docId}`}
							/>
						))}
					</>
				)}
				{groupedData.editor.length > 0 && (
					<>
						<h2 className="text-gray-500 font-semibold text-sm">
							Shared with Me
						</h2>
						{groupedData.editor.map((doc) => (
							<SidebarOption
								key={doc.id}
								id={doc.docId}
								href={`/collab/doc/${doc.docId}`}
							/>
						))}
					</>
				)}
			</div>
		</>
	);

	return (
		<div className="p-2 md:p-5 bg-gray-200 relative">
			<div className="sticky top-5 left-5 md:hidden">
				<Drawer direction="left">
					<DrawerTrigger className="bg-gray-300 rounded-lg border">
						<MenuIcon
							className="p-2 hover:opacity-30 rounded-lg"
							size={40}
						/>
					</DrawerTrigger>
					<DrawerContent className="h-full w-80 fixed z-50 overflow-y-auto rounded-none">
						<DrawerHeader>
							<DrawerTitle>Menu</DrawerTitle>
							<DrawerDescription />
						</DrawerHeader>
						<div className="flex flex-col space-y-4 p-4">
							{menuOptions}
						</div>
						<DrawerFooter>
							<DrawerClose>
								<Button variant="outline">Close</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<div className="hidden md:inline">{menuOptions}</div>
		</div>
	);
}

export default Sidebar;
