"use client";

import { createNewDocument } from "@/actions/feature/collab";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

function NewDocumentButton() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleCreateNewDocument = () => {
		startTransition(async () => {
			const { docId } = await createNewDocument();
			router.push(`/collab/doc/${docId}`);
		});
	};

	return (
		<Button onClick={handleCreateNewDocument} disabled={isPending}>
			{isPending ? "Creating…" : "New Document"}
		</Button>
	);
}

export default NewDocumentButton;
