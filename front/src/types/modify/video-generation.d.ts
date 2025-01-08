export interface TextBlock {
	type: "text";
	text: string;
}

export interface VideoGenerationParams {
	model: "luma" | "runway";
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
		position?: "first" | "last" | "both";
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
