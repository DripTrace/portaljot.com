// src/lib/errors/video-generation.ts
export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}

export class GenerationError extends Error {
	constructor(
		message: string,
		public provider?: string,
		public details?: any
	) {
		super(message);
		this.name = "GenerationError";
	}
}

export class AnalysisError extends Error {
	constructor(
		message: string,
		public details?: any
	) {
		super(message);
		this.name = "AnalysisError";
	}
}

export class AudioGenerationError extends Error {
	constructor(
		message: string,
		public segmentIndex?: number,
		public details?: any
	) {
		super(message);
		this.name = "AudioGenerationError";
	}
}

export class CombinationError extends Error {
	constructor(
		message: string,
		public stage: "audio" | "video",
		public details?: any
	) {
		super(message);
		this.name = "CombinationError";
	}
}

// Error handling utilities
export function handleProviderError(error: unknown, provider: string): never {
	if (error instanceof Error) {
		throw new GenerationError(
			`${provider} generation failed: ${error.message}`,
			provider,
			error
		);
	}
	throw new GenerationError(
		`${provider} generation failed with unknown error`,
		provider,
		error
	);
}

export function validateOrThrow(
	condition: boolean,
	message: string
): asserts condition {
	if (!condition) {
		throw new ValidationError(message);
	}
}
