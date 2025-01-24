"use client";

import { useRouter } from "next/navigation";
import byteSize from "byte-size";
import { useTransition } from "react";
import useSubscription from "@/hooks/warpcatch/useSubscription";
import { DownloadCloud, DownloadIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteDocument } from "@/actions/demonstrate/warpcatch/deleteDocument";

const Document = ({
	id,
	name,
	size,
	downloadUrl,
}: {
	id: string;
	name: string;
	size: number;
	downloadUrl: string;
}) => {
	const router = useRouter();
	const [isDeleting, stertTransaction] = useTransition();
	const { hasActiveMembership } = useSubscription();

	return (
		<div className="flex flex-col w-64 h-80 rounded-xl bg-white dropshadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white cursor-pointer group">
			<div
				className="flex-1"
				onClick={() => {
					router.push(`/warpcatch/dashboard/files/${id}`);
				}}
			>
				<p className="font-semibold line-clamp-2">{name}</p>
				<p className="text-sm text-gray-500 group-hover:text-indigo-100">
					{byteSize(size).value} KB
				</p>
			</div>

			<div className="flex space-x-2 justify-end">
				<Button
					variant="outline"
					disabled={isDeleting || !hasActiveMembership}
					onClick={() => {
						const prompt = window.confirm(
							"Are you sure you want to delete this document?"
						);
						if (prompt) {
							stertTransaction(async () => {
								await deleteDocument(id);
							});
						}
					}}
				>
					<Trash2Icon className="h-6 w-6 text-red-500" />
					{!hasActiveMembership && (
						<span className="text-red-500 ml-2">PRO Feature</span>
					)}
				</Button>

				<Button variant="outline" asChild>
					<a href={downloadUrl} download title="download">
						<DownloadCloud className="h-6 w-6 text-indigo-600" />
					</a>
				</Button>
			</div>
		</div>
	);
};

export default Document;
