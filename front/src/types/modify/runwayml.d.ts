// types.ts
export type TaskStatus =
	| "PENDING"
	| "RUNNING"
	| "SUCCEEDED"
	| "FAILED"
	| "THROTTLED";
export type RunwaymlRatios = "1280:768" | "768:1280";
export type RunwaymlDuration = 5 | 10;
export type RunwayRequestTypes = "GET" | "POST" | "DELETE";

export interface RunwayTask {
	id: string;
	status: TaskStatus;
	createdAt: string;
	failureCode?: string;
	output?: string[];
}

export interface ImageToVideoRequest {
	model: "gen3a_turbo";
	promptImage: string;
	promptText?: string;
	seed?: number;
	watermark?: boolean;
	duration?: RunwaymlDurations;
	ratio?: RunwaymlRatios;
}

export interface ApiError {
	error: string;
	code?: string;
	retryAfter?: number;
}
