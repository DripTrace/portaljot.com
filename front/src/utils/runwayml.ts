// import type { ApiError, RunwayRequestTypes } from "@/types/modify/runwayml";
// import { CONFIG, RUNWAYML_STATUSES } from "../constants/runwayml";
// import RunwayML from "@runwayml/sdk";
// import { runwayClient } from "../client/runwayml";
// import { TaskRetrieveResponse } from "@runwayml/sdk/resources/tasks.mjs";
// import { RUNWAYML_DURATION } from "../modify/generate-bk";
// import { VideoGenerationParams } from "@/types/modify/video-generation";
// import { VideoGenerationResult } from "@/types/modify/vidgen";
// // import { CONFIG } from "../config/runwayml";

// // utils/validate.ts
// export function validateImageUrl(url: string): void {
// 	if (!url.startsWith("https://") && !url.startsWith("data:image/")) {
// 		throw new Error("Image URL must be HTTPS or a data URI");
// 	}

// 	if (url.startsWith("https://")) {
// 		const urlObj = new URL(url);
// 		if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(urlObj.hostname)) {
// 			throw new Error("URLs must use domain names, not IP addresses");
// 		}
// 		if (url.length > 2048) {
// 			throw new Error("URL length cannot exceed 2048 characters");
// 		}
// 	}

// 	if (url.startsWith("data:image/")) {
// 		const base64Length = url.substring(url.indexOf(",") + 1).length;
// 		const sizeInBytes = (base64Length * 3) / 4;
// 		if (sizeInBytes > 5 * 1024 * 1024) {
// 			// 5MB
// 			throw new Error("Data URI size cannot exceed 5MB");
// 		}
// 	}
// }

// // utils/retry.ts
// export function calculateRetryDelay(attempt: number): number {
// 	const baseDelay = Math.min(
// 		CONFIG.MAX_RETRY_DELAY,
// 		CONFIG.BASE_RETRY_DELAY * Math.pow(2, attempt)
// 	);

// 	// Add jitter
// 	const jitter = Math.random() * CONFIG.JITTER_FACTOR * baseDelay;
// 	return baseDelay + jitter;
// }

// export function isRetryableError(
// 	status: number,
// 	failureCode?: string
// ): boolean {
// 	// HTTP status codes that are retryable
// 	if (RUNWAYML_STATUSES.includes(status)) {
// 		return true;
// 	}

// 	// Task failure codes that are retryable
// 	if (failureCode) {
// 		return (
// 			failureCode.startsWith("INTERNAL") ||
// 			failureCode === "INPUT_PREPROCESSING.INTERNAL"
// 		);
// 	}

// 	return false;
// }

// // utils/api.ts
// export async function runwayRequest(
// 	endpoint: string,
// 	method: RunwayRequestTypes,
// 	body?: any,
// 	retryCount = 0
// ): Promise<any> {
// 	try {
// 		const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
// 			method,
// 			headers: {
// 				Authorization: `Bearer ${CONFIG.API_KEY}`,
// 				"X-Runway-Version": CONFIG.API_VERSION,
// 				"Content-Type": "application/json",
// 			},
// 			body: body ? JSON.stringify(body) : undefined,
// 		});

// 		if (!response.ok) {
// 			const error: ApiError = await response.json().catch(() => ({
// 				error: "Unknown error",
// 			}));

// 			if (
// 				retryCount < CONFIG.MAX_RETRIES &&
// 				isRetryableError(response.status)
// 			) {
// 				const retryAfter = response.headers.get("Retry-After");
// 				const delayMs = retryAfter
// 					? parseInt(retryAfter) * 1000
// 					: calculateRetryDelay(retryCount);

// 				await new Promise((resolve) => setTimeout(resolve, delayMs));
// 				return runwayRequest(endpoint, method, body, retryCount + 1);
// 			}

// 			throw new Error(
// 				`Runway API error: ${error.error} (HTTP ${response.status})`
// 			);
// 		}

// 		if (response.status === 204) {
// 			return null;
// 		}

// 		return response.json();
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			throw error;
// 		}
// 		throw new Error("Network error while contacting Runway API");
// 	}
// }

// export const generateRunwayVideo = async (
// 	params: VideoGenerationParams
// ): Promise<VideoGenerationResult> => {
// 	try {
// 		params.duration_seconds = params.duration_seconds <= 7 ? 5 : 10;

// 		const placeholderImageUrl =
// 			"https://placehold.co/1280x768/000000/000000.png";

// 		let promptImage: RunwayML.ImageToVideoCreateParams["promptImage"] = [
// 			{
// 				position: "first",
// 				uri: placeholderImageUrl,
// 			},
// 		];

// 		if (params.image?.url) {
// 			promptImage = [
// 				{
// 					position:
// 						params.image.position === "last" ? "last" : "first",
// 					uri: params.image.url,
// 				},
// 			];
// 		}

// 		const convertAspectRatioToRunway = (
// 			aspectRatio: string
// 		): RunwayML.ImageToVideoCreateParams["ratio"] => {
// 			switch (aspectRatio) {
// 				case "9:16":
// 				case "3:4":
// 					return "768:1280";
// 				default:
// 					return "1280:768";
// 			}
// 		};

// 		const baseParams: RunwayML.ImageToVideoCreateParams = {
// 			model: "gen3a_turbo",
// 			duration: params.duration_seconds as RUNWAYML_DURATION,
// 			ratio: convertAspectRatioToRunway(params.aspect_ratio),
// 			promptText: params.prompt,
// 			promptImage,
// 			watermark: false,
// 		};

// 		console.log(
// 			"Runway request params:",
// 			JSON.stringify(baseParams, null, 2)
// 		);

// 		const task = await runwayClient.imageToVideo.create(baseParams);

// 		let attempts = 0;
// 		const maxAttempts = 60;
// 		let videoTask: TaskRetrieveResponse;

// 		do {
// 			await new Promise((resolve) => setTimeout(resolve, 5000));
// 			videoTask = await runwayClient.tasks.retrieve(task.id);
// 			attempts++;

// 			if (attempts >= maxAttempts) {
// 				throw new Error("Generation timed out");
// 			}
// 		} while (!["SUCCEEDED", "FAILED"].includes(videoTask.status));

// 		if (videoTask.status === "FAILED") {
// 			throw new Error(videoTask.failure || "Unknown error");
// 		}

// 		if (!videoTask.output?.[0]) {
// 			throw new Error("No output URL in successful response");
// 		}

// 		return {
// 			videoUrl: videoTask.output[0],
// 			generationResponseData: videoTask,
// 		};
// 	} catch (error) {
// 		if (error instanceof RunwayML.APIError) {
// 			throw new Error(
// 				`Runway generation failed: ${error.name}: ${error.message}`
// 			);
// 		}
// 		throw error;
// 	}
// };

export {};
