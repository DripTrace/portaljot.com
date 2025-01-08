export type VIDEO_MODEL = "luma" | "runway";

export interface GenerateSectionProps {
	switchToGeneratedTab: () => void;
}

export interface VideoGenerationParams {
	model: VIDEO_MODEL;
	prompt: string;
	aspect_ratio: string;
	duration_seconds: number;
	loop?: boolean;
	style?: string;
	negative_prompt?: string;
	mode?: string;
	image?: {
		url?: string;
		buffer?: Buffer;
		position?: IMAGE_POSITION;
	};
}

export interface VideoGenerationResult {
	videoUrl: string;
	generationResponseData: any;
}

export interface VideoAnalysisResult {
	segments: string[];
	analysisText: string | null;
	responseData: any;
}
