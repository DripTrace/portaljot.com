// types.ts
// Type definitions based on OpenAPI schema

export type Keyframe = GenerationKeyframe | ImageKeyframe;
export type AspectRatio =
	| "1:1"
	| "16:9"
	| "9:16"
	| "4:3"
	| "3:4"
	| "21:9"
	| "9:21";
export type GenerationState = "queued" | "dreaming" | "completed" | "failed";
export type GenerationType = "video" | "image";
export type ImageModel = "photon-1" | "photon-flash-1";
export type IMAGE_POSITION = "first" | "last" | "both";
export type FRAME_POSITION = "frame0" | "frame1";
export type LumaRequest = ImageRequest | VideoRequest;

export interface GenerateVideoRequest {
	prompt: string;
	keyframes?: {
		frame0?: Keyframe;
		frame1?: Keyframe;
	};
	loop?: boolean;
	callback_url?: string;
}

export interface Keyframe {
	type: "image" | "generation";
	url?: string;
	id?: string;
}

export interface LumaError extends Error {
	status?: number;
	headers?: Record<string, string>;
}

export interface ImageRef {
	url: string;
	weight: number;
}

export interface ImageIdentity {
	images: string[];
}

export interface CharacterRef {
	identity0?: ImageIdentity;
}

export interface Assets {
	video?: string;
	image?: string;
}

export interface KeyframeBase {
	type: string;
}

export interface GenerationKeyframe extends KeyframeBase {
	type: "generation";
	id: string;
}

export interface ImageKeyframe extends KeyframeBase {
	type: "image";
	url: string;
}

export interface Keyframes {
	frame0?: Keyframe;
	frame1?: Keyframe;
}

export interface BaseRequest {
	generation_type?: GenerationType;
	prompt?: string;
	aspect_ratio?: AspectRatio;
	callback_url?: string;
}

export interface ImageRequest extends BaseRequest {
	generation_type: "image";
	model?: ImageModel;
	image_ref?: ImageRef[];
	style_ref?: ImageRef[];
	character_ref?: CharacterRef;
	modify_image_ref?: {
		url: string;
		weight: number;
	};
}

export interface VideoRequest extends BaseRequest {
	generation_type?: "video";
	loop?: boolean;
	keyframes?: Keyframes;
}

export interface Generation {
	id?: string;
	generation_type?: GenerationType;
	state?: GenerationState;
	failure_reason?: string;
	created_at?: string;
	assets?: Assets;
	model?: string;
	request?: LumaRequest;
}
