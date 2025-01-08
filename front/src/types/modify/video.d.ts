// src/types/video.ts
import type { RunwayMLImageToVideoParams } from "@/lib/client/runwayml";

export interface BaseVideoParams {
	prompt: string;
	aspect_ratio: string;
	duration_seconds: number;
}

export interface LumaParams extends BaseVideoParams {
	model: "luma";
	loop?: boolean;
	style?: string;
	negative_prompt?: string;
	mode?: string;
}

export interface RunwayParams extends BaseVideoParams {
	model: "runway";
	mode?: "standard" | "fast";
	image_url?: string;
	image_position?: "first" | "last";
}

export type VideoGenerationRequest = LumaParams | RunwayParams;

export interface VideoAnalysisFrame {
	timestamp: number;
	description: string | null;
}

export interface VideoSegment {
	start: number;
	end: number;
	description: string;
}

export interface AudioGenerationConfig {
	maxDuration: number;
	minDuration: number;
	maxSegments: number;
	maxCharactersPerPrompt: number;
}

export interface ProcessingMetadata {
	requestId: string;
	startTime: number;
	modelUsed: string;
	processingSteps: Array<{
		name: string;
		startTime: number;
		endTime: number;
		success: boolean;
		error?: string;
	}>;
}

export type VideoProvider = "luma" | "runway";
export type AudioProvider = "elevenlabs";
export type AnalysisProvider = "gemini";

export interface ProviderConfig {
	video: {
		provider: VideoProvider;
		apiKey: string;
		baseUrl: string;
		timeout: number;
		maxRetries: number;
	};
	audio: {
		provider: AudioProvider;
		apiKey: string;
		baseUrl: string;
		timeout: number;
		maxRetries: number;
	};
	analysis: {
		provider: AnalysisProvider;
		apiKey: string;
		baseUrl: string;
		timeout: number;
		maxRetries: number;
	};
}

// Export constants used across the application
export const VIDEO_PROVIDERS = ["luma", "runway"] as const;
export const AUDIO_PROVIDERS = ["elevenlabs"] as const;
export const ANALYSIS_PROVIDERS = ["gemini"] as const;

export const ASPECT_RATIOS = {
	SQUARE: "1:1",
	LANDSCAPE: "16:9",
	PORTRAIT: "9:16",
	ULTRAWIDE: "21:9",
	CLASSIC: "4:3",
} as const;

export const MAX_DURATIONS = {
	luma: 80,
	runway: 10,
} as const;

export const MIN_DURATION = 4;
