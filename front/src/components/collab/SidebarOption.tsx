"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface DocumentData {
	id: string;
	title: string;
}

function SidebarOption({ href, id }: { href: string; id: string }) {
	const [data, setData] = useState<DocumentData | null>(null);
	const [loading, setLoading] = useState(true);
	const pathname = usePathname();

	// Determine if this SidebarOption is active based on the current path
	const isActive = href.includes(pathname) && pathname !== "/collab";

	useEffect(() => {
		async function fetchDocument() {
			try {
				const res = await fetch(`/api/collab/documents/${id}`);
				if (!res.ok) {
					throw new Error("Failed to fetch document");
				}
				const doc: DocumentData = await res.json();
				setData(doc);
			} catch (error) {
				console.error("Error fetching document:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchDocument();
	}, [id]);

	if (loading || !data) return null;

	return (
		<Link
			href={href}
			className={`relative border p-2 rounded-md ${
				isActive
					? "bg-gray-300 font-bold border-black"
					: "border-gray-400"
			}`}
		>
			<p className="truncate">{data.title}</p>
		</Link>
	);
}

export default SidebarOption;
