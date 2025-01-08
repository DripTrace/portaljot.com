// types/media.ts
export type TMedia = {
	id: string;
	type: "post" | "image";
	title: string;
	content?: string;
	url?: string;
	author?: string;
	userId?: string;
	width?: number;
	height?: number;
};

export type TPost = {
	postId: string;
	title: string;
	body: string;
	userId: string;
};
