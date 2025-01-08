// // types/image-generation.ts
// interface BaseGenerationOptions {
// 	prompt: string;
// 	model: "dalle3" | "imagen";
// }

// interface DallE3Options extends BaseGenerationOptions {
// 	model: "dalle3";
// 	size?: "1024x1024" | "1024x1792" | "1792x1024";
// 	quality?: "standard" | "hd";
// 	style?: "vivid" | "natural";
// }

// interface ImagenOptions extends BaseGenerationOptions {
// 	model: "imagen";
// 	sampleCount?: number;
// 	aspectRatio?: "1:1" | "9:16" | "16:9" | "3:4" | "4:3";
// 	negativePrompt?: string;
// 	safetySetting?:
// 		| "block_low_and_above"
// 		| "block_medium_and_above"
// 		| "block_only_high"
// 		| "block_none";
// }

// type GenerationOptions = DallE3Options | ImagenOptions;

// interface ImageGenerationConfig {
// 	instances: Array<{
// 		prompt: string;
// 	}>;
// 	parameters: {
// 		sampleCount?: number; // 1-4 for most models, 1-8 for imagegeneration@002
// 		seed?: number;
// 		negativePrompt?: string;
// 		aspectRatio?: "1:1" | "9:16" | "16:9" | "3:4" | "4:3";
// 		outputOptions?: {
// 			mimeType?: "image/png" | "image/jpeg";
// 			compressionQuality?: number; // 0-100, default 75
// 		};
// 		sampleImageStyle?:
// 			| "photograph"
// 			| "digital_art"
// 			| "landscape"
// 			| "sketch"
// 			| "watercolor"
// 			| "cyberpunk"
// 			| "pop_art";
// 		personGeneration?: "dont_allow" | "allow_adult" | "allow_all";
// 		safetySetting?:
// 			| "block_low_and_above"
// 			| "block_medium_and_above"
// 			| "block_only_high"
// 			| "block_none";
// 		addWatermark?: boolean;
// 		storageUri?: string;
// 	};
// }

// interface ImageGenerationResponse {
// 	predictions: Array<{
// 		bytesBase64Encoded?: string;
// 		mimeType?: string;
// 		raiFilteredReason?: string;
// 		safetyAttributes?: {
// 			categories: string[];
// 			scores: number[];
// 		};
// 	}>;
// }

// types/generation.ts
// export interface BaseGenerationOptions {
// 	prompt: string;
// 	model: "dalle3" | "imagen";
// }

// export interface DallE3Options extends BaseGenerationOptions {
// 	model: "dalle3";
// 	size: "1024x1024" | "1024x1792" | "1792x1024";
// 	quality: "standard" | "hd";
// 	style: "vivid" | "natural";
// }

// export interface ImagenOptions extends BaseGenerationOptions {
// 	model: "imagen";
// 	sampleCount: number;
// 	seed?: number;
// 	negativePrompt?: string;
// 	aspectRatio: "1:1" | "9:16" | "16:9" | "3:4" | "4:3";
// 	outputOptions: {
// 		mimeType: "image/png" | "image/jpeg";
// 		compressionQuality?: number;
// 	};
// 	sampleImageStyle?:
// 		| "photograph"
// 		| "digital_art"
// 		| "landscape"
// 		| "sketch"
// 		| "watercolor"
// 		| "cyberpunk"
// 		| "pop_art";
// 	personGeneration: "dont_allow" | "allow_adult" | "allow_all";
// 	safetySetting:
// 		| "block_low_and_above"
// 		| "block_medium_and_above"
// 		| "block_only_high"
// 		| "block_none";
// 	addWatermark: boolean;
// 	storageUri?: string;
// }

// export type GenerationOptions = DallE3Options | ImagenOptions;

export type DallE3Options = {
	model: "dalle3";
	prompt: string;
	size: "1024x1024" | "1024x1792" | "1792x1024";
	quality: "standard" | "hd";
	style: "vivid" | "natural";
};

export type ImagenOptions = {
	model: "imagen";
	prompt: string;
	sampleCount: number;
	seed?: number;
	negativePrompt?: string;
	aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
	outputOptions: {
		mimeType: string;
		// compressionQuality: number;
	};
	usePreDefinedStyles?: boolean; // Add this line
	sampleImageStyle?: string;
	personGeneration?: "dont_allow" | "allow_adult" | "allow_all";
	safetySetting:
		| "block_medium_and_above"
		| "block_low_and_above"
		| "block_only_high";
	// | "block_none";
	addWatermark: boolean;
};

export type GenerationOptions = DallE3Options | ImagenOptions;
