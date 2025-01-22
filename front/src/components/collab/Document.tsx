// "use client";

// import { CollaborativeEditor } from "./Editor";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useDocumentData } from "react-firebase-hooks/firestore";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { FormEvent, useEffect, useState, useTransition } from "react";
// import Avatars from "./Avatars";
// import InviteUser from "./InviteUser";
// import ManageUsers from "./ManageUsers";
// import useOwner from "@/lib/collab/useOwner";
// import DeleteDocument from "./DeleteDocument";

// function Document({ id }: { id: string }) {
// 	const [data, loading, error] = useDocumentData(doc(db, "documents", id));
// 	const isOwner = useOwner();
// 	const [input, setInput] = useState("");
// 	const [isUpdating, startTransition] = useTransition();

// 	useEffect(() => {
// 		if (data) {
// 			setInput(data.title);
// 		}
// 	}, [data]);

// 	const updateTitle = (e: FormEvent) => {
// 		e.preventDefault();
// 		if (input.trim()) {
// 			startTransition(async () => {
// 				await updateDoc(doc(db, "documents", id), {
// 					title: input,
// 				});
// 			});
// 		}
// 	};

// 	return (
// 		<div className="flex-1 h-full bg-white p-5">
// 			<div className="flex max-w-6xl mx-auto justify-between pb-5">
// 				<form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
// 					<Input
// 						value={input}
// 						onChange={(e) => setInput(e.target.value)}
// 					/>

// 					<Button type="submit" disabled={!input || isUpdating}>
// 						{isUpdating ? "Updating…" : "Update"}
// 					</Button>

// 					{isOwner && (
// 						<>
// 							<InviteUser />
// 							<DeleteDocument />
// 						</>
// 					)}
// 				</form>
// 			</div>

// 			<div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
// 				<ManageUsers />

// 				<Avatars />
// 			</div>

// 			<hr className="pb-10" />

// 			<CollaborativeEditor />
// 		</div>
// 	);
// }

// export default Document;

"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { CollaborativeEditor } from "./Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Avatars from "./Avatars";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import useOwner from "@/lib/collab/useOwner";
import DeleteDocument from "./DeleteDocument";
import LoadingSpinner from "./loadingSpinner";

type DocumentData = {
	id: string;
	title: string;
};

function Document({ id }: { id: string }) {
	const [documentData, setDocumentData] = useState<DocumentData | null>(null);
	const [input, setInput] = useState("");
	const [isUpdating, startTransition] = useTransition();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isOwner = useOwner(id); // custom hook; presumably checks Prisma or store

	// 1) Fetch the document on mount
	useEffect(() => {
		async function fetchDoc() {
			try {
				setLoading(true);
				const res = await fetch(`/api/collab/documents/${id}`);
				if (!res.ok) {
					throw new Error(`Failed to load document: ${res.status}`);
				}
				const data: DocumentData = await res.json();
				setDocumentData(data);
				setInput(data.title || "");
				setLoading(false);
			} catch (err: any) {
				console.error("Error loading document:", err);
				setError(err.message);
				setLoading(false);
			}
		}
		fetchDoc();
	}, [id]);

	// 2) Handle document title update
	async function updateTitle(e: FormEvent) {
		e.preventDefault();
		if (!input.trim()) return;

		startTransition(async () => {
			try {
				const res = await fetch(`/api/collab/documents/${id}`, {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ title: input }),
				});
				if (!res.ok) {
					throw new Error(`Failed to update document: ${res.status}`);
				}
				const updatedDoc: DocumentData = await res.json();
				setDocumentData(updatedDoc);
			} catch (err: any) {
				console.error("Error updating document:", err);
				setError(err.message);
			}
		});
	}

	if (loading) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <div className="flex-1 p-5 text-red-500">Error: {error}</div>;
	}

	return (
		<div className="flex-1 h-full bg-white p-5">
			<div className="flex max-w-6xl mx-auto justify-between pb-5">
				<form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Document Title..."
					/>

					<Button type="submit" disabled={!input || isUpdating}>
						{isUpdating ? "Updating…" : "Update"}
					</Button>

					{isOwner && (
						<>
							<InviteUser docId={id} />
							<DeleteDocument docId={id} />
						</>
					)}
				</form>
			</div>

			<div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
				<ManageUsers docId={id} />
				<Avatars docId={id} />
			</div>

			<hr className="pb-10" />

			{/* CollaborativeEditor logic would need real-time support ( websockets, Liveblocks, etc.) */}
			<CollaborativeEditor docId={id} />
		</div>
	);
}

export default Document;
