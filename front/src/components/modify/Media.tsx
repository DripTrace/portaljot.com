// types/media.ts
export type TMedia = {
	id: string;
	type: "post" | "image";
	title: string;
	content?: string;
	url?: string;
	author?: string;
	userId?: string;
	body?: string;
	postId?: string;
};

import Image from "next/image";

export const MediaCard = ({ item }: { item: TMedia }) => {
	switch (item.type) {
		case "post":
			return (
				<div className="p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold text-blue-400 mb-2">
						{item.title}
					</h2>
					<p className="text-gray-300 text-sm mb-4">
						by {item.userId || item.author}
					</p>
					<p className="text-gray-200">{item.content || item.body}</p>
				</div>
			);

		case "image":
			return (
				<div className="p-4 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg">
					<div className="relative h-48 w-full mb-4">
						<Image
							src={item.url || ""}
							alt={item.title}
							fill
							className="rounded-lg object-cover"
						/>
					</div>
					<h3 className="text-xl font-semibold text-blue-400">
						{item.title}
					</h3>
					{item.author && (
						<p className="text-gray-300 text-sm">
							by {item.author}
						</p>
					)}
				</div>
			);

		default:
			return null;
	}
};
