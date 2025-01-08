// // utils.ts
// import { writeFile, readFile, unlink } from "fs/promises";
// import {
// 	FRAME_POSITION,
// 	Generation,
// 	GenerationKeyframe,
// 	ImageKeyframe,
// 	Keyframe,
// 	LumaError,
// 	LumaRequest,
// 	VideoRequest,
// } from "@/types/modify/luma";
// import { ERROR_MESSAGES, LUMA_API_URL, VALIDATION } from "../constants/luma";
// import LumaAI from "lumaai";
// import {
// 	VideoGenerationParams,
// 	VideoGenerationResult,
// } from "@/types/modify/vidgen";
// import axios from "axios";

// export async function downloadAndProcessVideo(
// 	videoUrl: string,
// 	generationId: string
// ): Promise<Buffer> {
// 	const response = await fetch(videoUrl);

// 	if (!response.ok) {
// 		throw new Error(`Failed to download video: ${response.statusText}`);
// 	}

// 	const videoData = Buffer.from(await response.arrayBuffer());
// 	const fileName = `${generationId}.mp4`;

// 	// Write file temporarily
// 	await writeFile(fileName, videoData);
// 	const fileData = await readFile(fileName);
// 	await unlink(fileName);

// 	return fileData;
// }

// // Type guard for image/video keyframes
// export function isImageKeyframe(
// 	keyframe: Keyframe | undefined
// ): keyframe is ImageKeyframe {
// 	return keyframe?.type === "image";
// }

// export function isGenerationKeyframe(
// 	keyframe: Keyframe | undefined
// ): keyframe is GenerationKeyframe {
// 	return keyframe?.type === "generation";
// }

// // Validate generation parameters
// export function validateGenerationParams(
// 	params: LumaRequest
// ): { error: string } | null {
// 	if (!params.prompt && !(params as VideoRequest).keyframes) {
// 		return { error: ERROR_MESSAGES.PROMPT_REQUIRED };
// 	}

// 	if (params.prompt) {
// 		if (params.prompt.length < VALIDATION.PROMPT_MIN_LENGTH) {
// 			return { error: ERROR_MESSAGES.PROMPT_TOO_SHORT };
// 		}
// 		if (params.prompt.length > VALIDATION.PROMPT_MAX_LENGTH) {
// 			return { error: ERROR_MESSAGES.PROMPT_TOO_LONG };
// 		}
// 	}

// 	const videoParams = params as VideoRequest;
// 	if (videoParams.loop && videoParams.keyframes) {
// 		if (isImageKeyframe(videoParams.keyframes.frame1)) {
// 			return { error: ERROR_MESSAGES.LOOP_END_FRAME };
// 		}
// 		if (
// 			isImageKeyframe(videoParams.keyframes.frame0) &&
// 			isImageKeyframe(videoParams.keyframes.frame1)
// 		) {
// 			return { error: ERROR_MESSAGES.LOOP_KEYFRAMES };
// 		}
// 		if (isGenerationKeyframe(videoParams.keyframes.frame1)) {
// 			return { error: ERROR_MESSAGES.LOOP_EXTEND_REVERSE };
// 		}
// 	}

// 	return null;
// }

// // Download generated content
// export async function downloadContent(url: string): Promise<ArrayBuffer> {
// 	const response = await fetch(url);

// 	if (!response.ok) {
// 		throw new Error(`Failed to download content: ${response.statusText}`);
// 	}

// 	return await response.arrayBuffer();
// }

// // Map errors to responses
// export function mapErrorResponse(error: unknown): {
// 	status: number;
// 	message: string;
// } {
// 	if (error instanceof Error) {
// 		const lumaError = error as LumaError;
// 		if (lumaError.status) {
// 			return {
// 				status: lumaError.status,
// 				message: lumaError.message,
// 			};
// 		}
// 		return { status: 500, message: error.message };
// 	}
// 	return {
// 		status: 500,
// 		message: "An unexpected error occurred",
// 	};
// }

// export async function waitForGeneration(
// 	client: LumaAI,
// 	generationId: string,
// 	maxAttempts = 20
// ): Promise<Generation> {
// 	let attempts = 0;
// 	let lastError: Error | null = null;

// 	while (attempts < maxAttempts) {
// 		try {
// 			const generation = await client.generations.get(generationId);

// 			if (generation.state === "completed") {
// 				return generation;
// 			} else if (generation.state === "failed") {
// 				throw new Error(
// 					generation.failure_reason ||
// 						"Generation failed without reason"
// 				);
// 			}

// 			console.log(
// 				`Generation ${generationId} dreaming... Attempt ${attempts + 1}/${maxAttempts}`
// 			);
// 			await new Promise((r) => setTimeout(r, 3000));
// 			attempts++;
// 		} catch (error) {
// 			lastError = error as Error;
// 			const lumaError = error as LumaError;

// 			if (lumaError.status === 429) {
// 				const retryAfter = lumaError.headers?.["retry-after"];
// 				if (retryAfter) {
// 					const waitTime = parseInt(retryAfter) * 1000;
// 					await new Promise((r) => setTimeout(r, waitTime));
// 					continue;
// 				}
// 			}

// 			await new Promise((r) => setTimeout(r, 5000));
// 			attempts++;
// 		}
// 	}

// 	throw new Error(lastError?.message || "Generation timed out");
// }

// export async function waitForVideoGeneration(generationId: string) {
// 	const maxAttempts = 30;
// 	const delayMs = 5000;

// 	for (let i = 0; i < maxAttempts; i++) {
// 		console.log(`Waiting for video generation, attempt ${i + 1}`);
// 		const response = await axios.get(`${LUMA_API_URL}/${generationId}`, {
// 			headers: {
// 				Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 			},
// 		});

// 		console.log(`Video generation status:`, response.data.state);

// 		if (
// 			response.data.state === "completed" &&
// 			response.data.assets?.video
// 		) {
// 			console.log("Video generation completed");
// 			return response.data.assets.video;
// 		}

// 		if (response.data.state === "failed") {
// 			console.error(
// 				"Video generation failed:",
// 				response.data.failure_reason
// 			);
// 			throw new Error(
// 				`Video generation failed: ${response.data.failure_reason}`
// 			);
// 		}

// 		await new Promise((resolve) => setTimeout(resolve, delayMs));
// 	}

// 	console.error("Video generation timed out");
// 	throw new Error("Video generation timed out");
// }

// export const generateLumaVideo = async (
// 	params: VideoGenerationParams
// ): Promise<VideoGenerationResult> => {
// 	let requestBody: any = {
// 		prompt: params.prompt,
// 		aspect_ratio: params.aspect_ratio,
// 		loop: params.loop,
// 		duration_seconds: params.duration_seconds,
// 	};

// 	if (params.style) requestBody.style = params.style;
// 	if (params.negative_prompt)
// 		requestBody.negative_prompt = params.negative_prompt;

// 	if (params.image?.url) {
// 		requestBody.keyframes = {};
// 		const addKeyframe = (position: FRAME_POSITION) => {
// 			requestBody.keyframes[position] = {
// 				type: "image",
// 				url: params.image!.url,
// 			};
// 		};

// 		if (params.image.position === "both") {
// 			addKeyframe("frame0");
// 			addKeyframe("frame1");
// 		} else if (params.image.position === "last") {
// 			addKeyframe("frame1");
// 		} else {
// 			addKeyframe("frame0");
// 		}
// 	}

// 	const headers = {
// 		Accept: "application/json",
// 		Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 		"Content-Type": "application/json",
// 	};

// 	const response = await axios.post(LUMA_API_URL, requestBody, {
// 		headers,
// 		timeout: 30000,
// 	});

// 	// const maxAttempts = 30;
// 	// const delayMs = 5000;

// 	console.log(
// 		"Initial Video Response:",
// 		JSON.stringify(response.data, null, 2)
// 	);

// 	let videoUrl = await waitForVideoGeneration(response.data.id);
// 	let lastGenerationId = response.data.id;

// 	if (requestBody.duration_seconds > 4) {
// 		const numExtensions = Math.ceil(requestBody.duration_seconds / 4) - 1;
// 		for (let i = 0; i < numExtensions; i++) {
// 			const extendResponse = await axios.post(
// 				LUMA_API_URL,
// 				{
// 					prompt: requestBody.prompt,
// 					aspect_ratio: requestBody.aspect_ratio,
// 					keyframes: {
// 						frame0: {
// 							type: "generation",
// 							id: lastGenerationId,
// 						},
// 					},
// 				},
// 				{
// 					headers,
// 				}
// 			);
// 			videoUrl = await waitForVideoGeneration(extendResponse.data.id);
// 			lastGenerationId = extendResponse.data.id;
// 		}
// 	}

// 	return { videoUrl, generationResponseData: lastGenerationId };

// 	// for (let i = 0; i < maxAttempts; i++) {
// 	// 	const statusResponse = await axios.get(
// 	// 		`${LUMA_API_URL}/${response.data.id}`,
// 	// 		{
// 	// 			headers: {
// 	// 				Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 	// 			},
// 	// 			timeout: 10000,
// 	// 		}
// 	// 	);

// 	// 	if (
// 	// 		statusResponse.data.state === "completed" &&
// 	// 		statusResponse.data.assets?.video
// 	// 	) {
// 	// 		return {
// 	// 			videoUrl: statusResponse.data.assets.video,
// 	// 			generationResponseData: statusResponse.data,
// 	// 		};
// 	// 	}

// 	// 	if (statusResponse.data.state === "failed") {
// 	// 		throw new Error(
// 	// 			`Luma generation failed: ${statusResponse.data.failure_reason}`
// 	// 		);
// 	// 	}

// 	// 	await new Promise((resolve) => setTimeout(resolve, delayMs));
// 	// }

// 	// throw new Error("Luma generation timed out");
// };

export {};
