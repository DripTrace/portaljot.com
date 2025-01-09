// // generate.ts

// import { ChatAnthropic } from "@langchain/anthropic";
// import { HumanMessage } from "@langchain/core/messages";
// import { writeFile, unlink } from "fs/promises";
// import ffmpeg from "fluent-ffmpeg";
// import axios, { AxiosError, isAxiosError } from "axios";
// import { gzipSync } from "zlib";
// import { NextRequest } from "next/server";
// import RunwayML from "@runwayml/sdk";
// import type { TaskRetrieveResponse } from "@runwayml/sdk/resources/tasks.mjs";
// import { runwayClient } from "../client/runwayml";

// export type RUNWAYML_DURATION = 5 | 10;
// export type VIDEO_MODEL = "luma" | "runway";
// export type IMAGE_POSITION = "first" | "last" | "both";
// export type FRAME_POSITION = "frame0" | "frame1";

// export const ASPECT_RATIO = [
// 	"1:1",
// 	"16:9",
// 	"4:3",
// 	"9:16",
// 	"21:9",
// 	"3:4",
// 	"9:21",
// ];

// export const CAMERA_MOTIONS = [
// 	"Static",
// 	"Move Left",
// 	"Move Right",
// 	"Move Up",
// 	"Move Down",
// 	"Push In",
// 	"Pull Out",
// 	"Zoom In",
// 	"Zoom Out",
// 	"Pan Left",
// 	"Pan Right",
// 	"Orbit Left",
// 	"Orbit Right",
// 	"Crane Up",
// 	"Crane Down",
// ];

// export const LUMA_STYLES = [
// 	"3D Animation",
// 	"Anime",
// 	"Cinematic",
// 	"Digital Art",
// 	"Photographic",
// ];

// export const RUNWAY_MODES = ["standard", "fast"];

// export const LUMA_API_URL =
// 	"https://api.lumalabs.ai/dream-machine/v1/generations";
// export const ELEVENLABS_API_URL =
// 	"https://api.elevenlabs.io/v1/sound-generation";

// export interface VideoGenerationParams {
// 	model: VIDEO_MODEL;
// 	prompt: string;
// 	aspect_ratio: string;
// 	duration_seconds: number;
// 	loop?: boolean;
// 	style?: string;
// 	negative_prompt?: string;
// 	mode?: string;
// 	image?: {
// 		url?: string;
// 		buffer?: Buffer;
// 		position?: IMAGE_POSITION;
// 	};
// }

// export interface VideoGenerationResult {
// 	videoUrl: string;
// 	generationResponseData: any;
// }

// export interface VideoAnalysisResult {
// 	segments: string[];
// 	analysisText: string | null;
// 	responseData: any;
// }

// const chatModel = new ChatAnthropic({
// 	modelName: "claude-3-5-sonnet-20240620",
// 	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
// });

// export const parseFormData = async (
// 	request: NextRequest,
// 	requestId: string
// ): Promise<VideoGenerationParams> => {
// 	console.log(`[${requestId}] Starting form data parsing`);
// 	const formData = await request.formData();
// 	console.log(
// 		`[${requestId}] Raw formData keys:`,
// 		Array.from(formData.keys())
// 	);

// 	const metadata: VideoGenerationParams = {
// 		model: formData.get("model") as VIDEO_MODEL,
// 		prompt: `${formData.get("prompt")}. ${formData.get("camera_motion")}`.trim(),
// 		aspect_ratio: formData.get("aspect_ratio") as string,
// 		duration_seconds: Number(formData.get("duration_seconds")),
// 		loop: formData.get("loop") === "true",
// 		style: formData.get("style") as string,
// 		negative_prompt: formData.get("negative_prompt") as string,
// 		mode: formData.get("mode") as string,
// 	};

// 	console.log(`[${requestId}] Parsed metadata:`, {
// 		model: metadata.model,
// 		promptLength: metadata.prompt.length,
// 		aspect_ratio: metadata.aspect_ratio,
// 		duration: metadata.duration_seconds,
// 		loop: metadata.loop,
// 		style: metadata.style,
// 		negative_prompt: metadata.negative_prompt,
// 		mode: metadata.mode,
// 	});

// 	const imageFile = formData.get("image") as File | null;
// 	const imageUrl = formData.get("image_url") as string | null;
// 	const imagePosition = formData.get(
// 		"image_position"
// 	) as IMAGE_POSITION | null;

// 	if (imageFile || imageUrl) {
// 		console.log(`[${requestId}] Processing image data`);
// 		metadata.image = { position: imagePosition || "first" };

// 		if (imageFile) {
// 			console.log(`[${requestId}] Converting image file to buffer`);
// 			metadata.image.buffer = Buffer.from(await imageFile.arrayBuffer());
// 			console.log(
// 				`[${requestId}] Image buffer size: ${metadata.image.buffer.byteLength} bytes`
// 			);
// 		} else if (imageUrl) {
// 			console.log(`[${requestId}] Using image URL: ${imageUrl}`);
// 			metadata.image.url = imageUrl;
// 		}
// 	}

// 	validateGenerationParams(metadata);
// 	console.log(`[${requestId}] Form data validation successful`);
// 	console.log(
// 		`[${requestId}] Returning metadata from parseFormData:`,
// 		JSON.stringify(metadata, null, 2)
// 	);
// 	return metadata;
// };

// export const parseJsonData = async (
// 	request: NextRequest,
// 	requestId: string
// ): Promise<VideoGenerationParams> => {
// 	console.log(`[${requestId}] Starting JSON data parsing`);
// 	const jsonData = await request.json();
// 	console.log(
// 		`[${requestId}] Raw JSON data:`,
// 		JSON.stringify(jsonData, null, 2)
// 	);

// 	const metadata: VideoGenerationParams = {
// 		model: jsonData.model,
// 		prompt: `${jsonData.prompt}. ${jsonData.camera_motion}`.trim(),
// 		aspect_ratio: jsonData.aspect_ratio,
// 		duration_seconds: jsonData.duration_seconds,
// 		loop: jsonData.loop,
// 		style: jsonData.style,
// 		negative_prompt: jsonData.negative_prompt,
// 		mode: jsonData.mode,
// 	};

// 	console.log(`[${requestId}] Parsed metadata from JSON:`, {
// 		model: metadata.model,
// 		promptLength: metadata.prompt.length,
// 		aspect_ratio: metadata.aspect_ratio,
// 		duration: metadata.duration_seconds,
// 		loop: metadata.loop,
// 		style: metadata.style,
// 		negative_prompt: metadata.negative_prompt,
// 		mode: metadata.mode,
// 	});

// 	if (jsonData.image_url) {
// 		console.log(
// 			`[${requestId}] Processing image URL from JSON: ${jsonData.image_url}`
// 		);
// 		metadata.image = {
// 			url: jsonData.image_url,
// 			position: jsonData.image_position || "first",
// 		};
// 	}

// 	validateGenerationParams(metadata);
// 	console.log(`[${requestId}] JSON data validation successful`);
// 	console.log(
// 		`[${requestId}] Returning metadata from parseJsonData:`,
// 		JSON.stringify(metadata, null, 2)
// 	);
// 	return metadata;
// };

// export const validateGenerationParams = (
// 	params: VideoGenerationParams
// ): void => {
// 	console.log(`Validating generation parameters for model: ${params.model}`);
// 	const { model, prompt, aspect_ratio, duration_seconds } = params;

// 	if (!model || !["luma", "runway"].includes(model)) {
// 		throw new Error("Invalid model specified. Must be 'luma' or 'runway'");
// 	}
// 	if (!prompt?.trim()) {
// 		throw new Error("Prompt is required");
// 	}
// 	if (!aspect_ratio) {
// 		throw new Error("Aspect ratio is required");
// 	}

// 	if (model === "runway") {
// 		const validRatios = ["16:9", "9:16", "4:3", "3:4"];
// 		if (!validRatios.includes(aspect_ratio)) {
// 			throw new Error(
// 				`Runway only supports these aspect ratios: ${validRatios.join(", ")}`
// 			);
// 		}
// 	} else {
// 		if (!ASPECT_RATIO.includes(aspect_ratio)) {
// 			throw new Error(
// 				`Invalid aspect ratio. Must be one of: ${ASPECT_RATIO.join(", ")}`
// 			);
// 		}
// 	}

// 	if (!duration_seconds || duration_seconds < 4) {
// 		throw new Error("Duration must be at least 4 seconds");
// 	}

// 	if (model === "runway") {
// 		if (duration_seconds !== 5 && duration_seconds !== 10) {
// 			throw new Error(
// 				"Runway model only supports durations of 5 or 10 seconds"
// 			);
// 		}
// 	} else if (model === "luma" && duration_seconds > 80) {
// 		throw new Error("Luma model supports maximum duration of 80 seconds");
// 	}

// 	console.log("Generation parameters validated successfully.");
// };

// async function waitForVideoGeneration(
// 	generationId: string,
// 	requestId: string
// ): Promise<string> {
// 	console.log(
// 		`[${requestId}] waitForVideoGeneration started for ID: ${generationId}`
// 	);
// 	const maxAttempts = 30;
// 	const delayMs = 5000;

// 	for (let i = 0; i < maxAttempts; i++) {
// 		console.log(
// 			`[${requestId}] Checking generation status, attempt ${i + 1}/${maxAttempts}`
// 		);
// 		const response = await axios.get(`${LUMA_API_URL}/${generationId}`, {
// 			headers: { Authorization: `Bearer ${process.env.LUMA_API_KEY}` },
// 		});
// 		console.log(`[${requestId}] Current state: ${response.data.state}`);

// 		if (
// 			response.data.state === "completed" &&
// 			response.data.assets?.video
// 		) {
// 			console.log(`[${requestId}] Generation completed successfully`);
// 			console.log(
// 				`[${requestId}] Final video URL: ${response.data.assets.video}`
// 			);
// 			return response.data.assets.video;
// 		}

// 		if (response.data.state === "failed") {
// 			console.error(
// 				`[${requestId}] Generation failed:`,
// 				response.data.failure_reason
// 			);
// 			throw new Error(
// 				`Video generation failed: ${response.data.failure_reason}`
// 			);
// 		}

// 		console.log(
// 			`[${requestId}] Still in progress, waiting ${delayMs}ms...`
// 		);
// 		await new Promise((resolve) => setTimeout(resolve, delayMs));
// 	}

// 	throw new Error("Video generation timed out");
// }

// const generateRunwayVideo = async (
// 	params: VideoGenerationParams,
// 	requestId: string
// ): Promise<VideoGenerationResult> => {
// 	console.log(
// 		`[${requestId}] Starting Runway video generation with params:`,
// 		params
// 	);

// 	try {
// 		params.duration_seconds = params.duration_seconds <= 7 ? 5 : 10;
// 		const placeholderImageUrl =
// 			"https://placehold.co/1280x768/000000/000000.png";

// 		let promptImage: RunwayML.ImageToVideoCreateParams["promptImage"] = [
// 			{ position: "first", uri: placeholderImageUrl },
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

// 		console.log(`[${requestId}] Runway request params:`, baseParams);
// 		const task = await runwayClient.imageToVideo.create(baseParams);
// 		console.log(`[${requestId}] Task created, ID: ${task.id}`);

// 		let attempts = 0;
// 		const maxAttempts = 60;
// 		let videoTask: TaskRetrieveResponse;

// 		do {
// 			await new Promise((resolve) => setTimeout(resolve, 5000));
// 			videoTask = await runwayClient.tasks.retrieve(task.id);
// 			attempts++;
// 			console.log(
// 				`[${requestId}] Checking task status: ${videoTask.status}, attempt ${attempts}/${maxAttempts}`
// 			);
// 			if (attempts >= maxAttempts) {
// 				throw new Error("Generation timed out");
// 			}
// 		} while (!["SUCCEEDED", "FAILED"].includes(videoTask.status));

// 		if (videoTask.status === "FAILED") {
// 			console.error(
// 				`[${requestId}] Runway task failed:`,
// 				videoTask.failure
// 			);
// 			if (
// 				(videoTask as any)?.failure?.includes(
// 					"You do not have enough credits to run this task."
// 				)
// 			) {
// 				throw new Error(
// 					"You do not have enough Runway credits to run this task."
// 				);
// 			}
// 			throw new Error(videoTask.failure || "Unknown error");
// 		}

// 		if (!videoTask.output?.[0]) {
// 			throw new Error("No output URL in successful response");
// 		}

// 		console.log(`[${requestId}] Runway generation completed successfully`);
// 		console.log(`[${requestId}] Final video URL: ${videoTask.output[0]}`);

// 		return {
// 			videoUrl: videoTask.output[0],
// 			generationResponseData: videoTask,
// 		};
// 	} catch (error) {
// 		console.error(`[${requestId}] Runway generation failed:`, error);
// 		if (error instanceof RunwayML.APIError) {
// 			if (
// 				error.status === 400 &&
// 				(error.error as any)?.error ===
// 					"You do not have enough credits to run this task."
// 			) {
// 				throw new Error(
// 					"You do not have enough Runway credits to run this task."
// 				);
// 			}
// 			throw new Error(
// 				`Runway generation failed: ${error.name}: ${error.message}`
// 			);
// 		}
// 		throw error;
// 	}
// };

// const generateLumaVideo = async (
// 	params: VideoGenerationParams,
// 	requestId: string
// ): Promise<VideoGenerationResult> => {
// 	console.log(
// 		`[${requestId}] Starting Luma video generation with params:`,
// 		params
// 	);

// 	try {
// 		const requestBody: any = {
// 			prompt: params.prompt,
// 			aspect_ratio: params.aspect_ratio,
// 			loop: params.loop,
// 			duration_seconds: params.duration_seconds,
// 		};

// 		if (params.style) requestBody.style = params.style;
// 		if (params.negative_prompt)
// 			requestBody.negative_prompt = params.negative_prompt;

// 		if (params.image?.url) {
// 			requestBody.keyframes = {};
// 			const addKeyframe = (position: FRAME_POSITION) => {
// 				requestBody.keyframes[position] = {
// 					type: "image",
// 					url: params.image!.url,
// 				};
// 			};

// 			if (params.image.position === "both") {
// 				addKeyframe("frame0");
// 				addKeyframe("frame1");
// 			} else if (params.image.position === "last") {
// 				addKeyframe("frame1");
// 			} else {
// 				addKeyframe("frame0");
// 			}
// 		}

// 		const headers = {
// 			Accept: "application/json",
// 			Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 			"Content-Type": "application/json",
// 		};

// 		console.log(
// 			`[${requestId}] Sending initial Luma request with body:`,
// 			requestBody
// 		);
// 		const response = await axios.post(LUMA_API_URL, requestBody, {
// 			headers,
// 			timeout: 30000,
// 		});
// 		console.log(
// 			`[${requestId}] Initial response from Luma:`,
// 			response.data
// 		);

// 		let videoUrl = await waitForVideoGeneration(
// 			response.data.id,
// 			requestId
// 		);
// 		let lastGenerationId = response.data.id;

// 		if (requestBody.duration_seconds > 4) {
// 			const numExtensions =
// 				Math.ceil(requestBody.duration_seconds / 4) - 1;
// 			console.log(
// 				`[${requestId}] Extending video ${numExtensions} times`
// 			);

// 			for (let i = 0; i < numExtensions; i++) {
// 				console.log(
// 					`[${requestId}] Processing extension ${i + 1}/${numExtensions} from generation ID ${lastGenerationId}`
// 				);

// 				const extendResponse = await axios.post(
// 					LUMA_API_URL,
// 					{
// 						prompt: requestBody.prompt,
// 						aspect_ratio: requestBody.aspect_ratio,
// 						keyframes: {
// 							frame0: {
// 								type: "generation",
// 								id: lastGenerationId,
// 							},
// 						},
// 					},
// 					{ headers }
// 				);
// 				console.log(
// 					`[${requestId}] Luma extend response:`,
// 					extendResponse.data
// 				);

// 				videoUrl = await waitForVideoGeneration(
// 					extendResponse.data.id,
// 					requestId
// 				);
// 				lastGenerationId = extendResponse.data.id;
// 			}
// 		}

// 		console.log(`[${requestId}] Luma generation completed successfully`);
// 		console.log(`[${requestId}] Final Luma video URL: ${videoUrl}`);

// 		return {
// 			videoUrl,
// 			generationResponseData: lastGenerationId,
// 		};
// 	} catch (error) {
// 		if (
// 			isAxiosError(error) &&
// 			error.response?.status === 400 &&
// 			(error.response.data as any)?.detail === "Insufficient credits"
// 		) {
// 			throw new Error(
// 				"You do not have enough Luma credits to run this task."
// 			);
// 		}
// 		console.error(`[${requestId}] Luma generation failed:`, error);
// 		throw error;
// 	}
// };

// export const generateVideo = async (
// 	params: VideoGenerationParams,
// 	requestId: string
// ): Promise<VideoGenerationResult> => {
// 	console.log(
// 		`[${requestId}] generateVideo called with model: ${params.model}`
// 	);
// 	validateGenerationParams(params);

// 	try {
// 		const result =
// 			params.model === "runway"
// 				? await generateRunwayVideo(params, requestId)
// 				: await generateLumaVideo(params, requestId);

// 		console.log(`[${requestId}] Video generation completed successfully`);
// 		console.log(`[${requestId}] Returning result:`, result);
// 		return result;
// 	} catch (error) {
// 		console.error(`[${requestId}] Video generation failed:`, error);
// 		throw error;
// 	}
// };

// export async function compressVideoForAnalysis(
// 	videoBuffer: Buffer,
// 	requestId: string,
// 	targetWidth = 160,
// 	targetHeight = 90
// ): Promise<Buffer> {
// 	console.log(
// 		`[${requestId}] [compressVideoForAnalysis] Starting compression process`
// 	);
// 	const inputPath = `/tmp/${requestId}_analysis_input.mp4`;
// 	const outputPath = `/tmp/${requestId}_analysis_output.mp4`;

// 	console.log(`[${requestId}] Writing original video buffer to ${inputPath}`);
// 	await writeFile(inputPath, videoBuffer);
// 	console.log(
// 		`[${requestId}] Original video size: ${videoBuffer.byteLength} bytes`
// 	);

// 	return new Promise<Buffer>((resolve, reject) => {
// 		console.log(
// 			`[${requestId}] Initializing FFmpeg command to compress video...`
// 		);
// 		ffmpeg(inputPath)
// 			.on("start", (cmd) => {
// 				console.log(`[${requestId}] FFmpeg command: ${cmd}`);
// 			})
// 			.videoCodec("libx264")
// 			.audioCodec("aac")
// 			.format("mp4")
// 			.size(`${targetWidth}x${targetHeight}`)
// 			.outputOptions([
// 				"-an",
// 				"-preset veryfast",
// 				"-b:v 200k",
// 				"-movflags faststart",
// 				"-y",
// 			])
// 			.on("progress", (progress) => {
// 				console.log(
// 					`[${requestId}] [FFmpeg Progress] frames: ${progress.frames}, fps: ${progress.currentFps}, kbps: ${progress.currentKbps}, time: ${progress.timemark}`
// 				);
// 			})
// 			.on("error", async (err) => {
// 				console.error(`[${requestId}] Compression error:`, err);
// 				await cleanup();
// 				reject(err);
// 			})
// 			.on("end", async () => {
// 				console.log(
// 					`[${requestId}] Compression completed successfully`
// 				);
// 				try {
// 					const compressedBuffer = await import("fs/promises").then(
// 						(fs) => fs.readFile(outputPath)
// 					);
// 					console.log(
// 						`[${requestId}] Compressed file size: ${compressedBuffer.byteLength} bytes`
// 					);
// 					await cleanup();
// 					resolve(compressedBuffer);
// 				} catch (readErr) {
// 					console.error(
// 						`[${requestId}] Failed to read compressed file:`,
// 						readErr
// 					);
// 					await cleanup();
// 					reject(readErr);
// 				}
// 			})
// 			.save(outputPath);

// 		async function cleanup() {
// 			console.log(`[${requestId}] Cleaning up temporary files`);
// 			await Promise.allSettled([
// 				unlink(inputPath).catch(() => null),
// 				unlink(outputPath).catch(() => null),
// 			]);
// 			console.log(`[${requestId}] Cleanup completed`);
// 		}
// 	});
// }

// export const fallbackVideoAnalysis = (originalPrompt: string): string[] => {
// 	return [originalPrompt];
// };

// export const analyzeVideoWithGemini = async (
// 	videoUrl: string,
// 	duration_seconds: number,
// 	originalPrompt: string,
// 	requestId: string,
// 	retries = 3
// ): Promise<VideoAnalysisResult> => {
// 	console.log(`[${requestId}] Starting video analysis for URL: ${videoUrl}`);

// 	for (let attempt = 0; attempt < retries; attempt++) {
// 		try {
// 			console.log(
// 				`[${requestId}] Analysis attempt ${attempt + 1}/${retries}`
// 			);
// 			const videoResponse = await axios.get(videoUrl, {
// 				responseType: "arraybuffer",
// 				timeout: 30000,
// 			});
// 			const videoBuffer: Buffer = videoResponse.data;
// 			console.log(
// 				`[${requestId}] Video downloaded, size: ${videoBuffer.byteLength} bytes`
// 			);

// 			let finalVideoBuffer = videoBuffer;
// 			if (finalVideoBuffer.byteLength > 200_000) {
// 				console.log(
// 					`[${requestId}] Video is bigger than 200 KB, compressing...`
// 				);
// 				finalVideoBuffer = await compressVideoForAnalysis(
// 					finalVideoBuffer,
// 					requestId
// 				);
// 			}

// 			if (finalVideoBuffer.byteLength > 200_000) {
// 				console.log(
// 					`[${requestId}] Still bigger than 200 KB after compression. Using fallback.`
// 				);
// 				return {
// 					segments: fallbackVideoAnalysis(originalPrompt),
// 					analysisText: null,
// 					responseData: null,
// 				};
// 			}

// 			const videoBase64 = finalVideoBuffer.toString("base64");
// 			const segmentCount = Math.ceil(duration_seconds / 20) || 1;

// 			const systemPrompt = {
// 				text: "You are a concise visual analyst. Summarize key events. No filler.",
// 				author: "system",
// 			};
// 			const userPrompt = {
// 				text: `Analyze this ${duration_seconds}-second video in ${segmentCount} segments. Focus on visuals only.`,
// 				author: "user",
// 			};

// 			const payload = {
// 				contents: [
// 					{
// 						parts: [
// 							systemPrompt,
// 							userPrompt,
// 							{
// 								inlineData: {
// 									mimeType: "video/mp4",
// 									data: videoBase64,
// 								},
// 							},
// 						],
// 					},
// 				],
// 				generationConfig: {
// 					temperature: 0.4,
// 					topK: 32,
// 					topP: 1,
// 					maxOutputTokens: 4096,
// 				},
// 			};

// 			console.log(`[${requestId}] Sending analysis request to Gemini`);
// 			const response = await axios.post(
// 				`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${process.env.GOOGLE_API_KEY}`,
// 				payload,
// 				{
// 					headers: { "Content-Type": "application/json" },
// 					maxContentLength: Infinity,
// 					maxBodyLength: Infinity,
// 				}
// 			);

// 			if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
// 				throw new Error("Invalid Gemini API response format");
// 			}

// 			let analysisText =
// 				response.data.candidates[0].content.parts[0].text;
// 			analysisText = analysisText.trim();

// 			const segments = analysisText
// 				.split(/Segment \d+:/i)
// 				.filter((seg: string) => seg.trim().length > 0)
// 				.map((seg: string) => seg.trim());

// 			return { segments, analysisText, responseData: response.data };
// 		} catch (error) {
// 			console.error(
// 				`[${requestId}] Attempt ${attempt + 1} failed:`,
// 				error
// 			);
// 			if (attempt === retries - 1) {
// 				console.log(`[${requestId}] Using fallback analysis`);
// 				return {
// 					segments: fallbackVideoAnalysis(originalPrompt),
// 					analysisText: null,
// 					responseData: null,
// 				};
// 			}
// 			const backoffTime = 2000 * (attempt + 1);
// 			console.log(`[${requestId}] Waiting ${backoffTime}ms before retry`);
// 			await new Promise((resolve) => setTimeout(resolve, backoffTime));
// 		}
// 	}

// 	throw new Error("Unexpected error in video analysis");
// };

// export const adjustTimeReferences = (
// 	segment: string,
// 	segmentIndex: number,
// 	requestId: string
// ): string => {
// 	console.log(
// 		`[${requestId}] Adjusting time references for segment ${segmentIndex + 1}`
// 	);
// 	const timeRegex = /At (\d+)s/g;
// 	return segment.replace(timeRegex, (_match, seconds) => {
// 		const adjustedSeconds = (parseInt(seconds) - segmentIndex * 20) % 20;
// 		return `At ${adjustedSeconds}s`;
// 	});
// };

// export const generateAudioSegments = async (
// 	segments: string[],
// 	totalDuration: number,
// 	requestId: string
// ): Promise<Buffer[]> => {
// 	console.log(
// 		`[${requestId}] Starting audio generation for ${segments.length} segments`
// 	);
// 	const audioSegments: Buffer[] = [];
// 	let remainingDuration = totalDuration;

// 	for (let i = 0; i < segments.length; i++) {
// 		console.log(
// 			`[${requestId}] Processing segment ${i + 1}/${segments.length}`
// 		);
// 		const segmentDuration = Math.min(remainingDuration, 20);
// 		const adjustedSegment = adjustTimeReferences(segments[i], i, requestId);
// 		console.log(`[${requestId}] Summarizing segment ${i + 1} with Claude`);
// 		const { summary } = await summarizeWithClaude(
// 			adjustedSegment,
// 			segmentDuration,
// 			requestId
// 		);

// 		const audioPrompt = Array.isArray(summary)
// 			? summary
// 					.map((s) => (typeof s === "string" ? s : JSON.stringify(s)))
// 					.join(" ")
// 			: String(summary);

// 		console.log(
// 			`[${requestId}] Generating audio for segment ${i + 1}, duration: ${segmentDuration}s`
// 		);
// 		const audioBuffer = await generateAudioSegment(
// 			audioPrompt,
// 			segmentDuration,
// 			requestId
// 		);
// 		audioSegments.push(audioBuffer);
// 		remainingDuration -= segmentDuration;
// 	}

// 	console.log(`[${requestId}] Completed audio generation for all segments`);
// 	return audioSegments;
// };

// export const summarizeWithClaude = async (
// 	description: string,
// 	segmentDuration: number,
// 	requestId: string
// ): Promise<{ summary: string; response: any }> => {
// 	console.log(
// 		`[${requestId}] Starting Claude summarization for ${segmentDuration}s segment:\n${description}`
// 	);
// 	const maxCharacters = 450;

// 	try {
// 		const response = await chatModel.invoke([
// 			new HumanMessage(
// 				`Create a sound effect description for this ${segmentDuration}-second video segment. Keep it under ${maxCharacters} characters:\n\n${description}`
// 			),
// 		]);

// 		console.log(`[${requestId}] Raw Claude response:`, response);

// 		let summaryContent = response.content;
// 		let summary = "";

// 		if (typeof summaryContent === "string") {
// 			summary = summaryContent;
// 		} else if (Array.isArray(summaryContent)) {
// 			summary = summaryContent
// 				.map((part) => {
// 					if (typeof part === "string") return part;
// 					if ("type" in part && part.type === "text")
// 						return part.text;
// 					return "";
// 				})
// 				.join(" ")
// 				.trim();
// 		}

// 		if (summary.length > maxCharacters) {
// 			summary = summary.slice(0, maxCharacters - 3) + "...";
// 		}

// 		console.log(
// 			`[${requestId}] Summary generated, length: ${summary.length} characters`
// 		);
// 		return { summary, response };
// 	} catch (error) {
// 		console.error(`[${requestId}] Error in summarization:`, error);
// 		throw error;
// 	}
// };

// export const generateAudioSegment = async (
// 	prompt: string,
// 	duration: number,
// 	requestId: string
// ): Promise<Buffer> => {
// 	console.log(
// 		`[${requestId}] Generating audio segment of ${duration}s with prompt:\n${prompt}`
// 	);
// 	const adjustedDuration = Math.max(duration, 0.5);

// 	try {
// 		const response = await axios.post(
// 			ELEVENLABS_API_URL,
// 			{
// 				text: prompt,
// 				duration_seconds: adjustedDuration,
// 				prompt_influence: 0.7,
// 			},
// 			{
// 				headers: {
// 					"xi-api-key": process.env.ELEVENLABS_API_KEY,
// 					"Content-Type": "application/json",
// 				},
// 				responseType: "arraybuffer",
// 			}
// 		);

// 		console.log(
// 			`[${requestId}] Audio segment generated successfully, size: ${response.data.length} bytes`
// 		);
// 		return Buffer.from(response.data);
// 	} catch (error) {
// 		console.error(`[${requestId}] Audio generation failed:`, error);
// 		if (isAxiosError(error)) {
// 			const axiosError = error as AxiosError;
// 			const errorData = axiosError.response?.data
// 				? JSON.parse(
// 						Buffer.from(
// 							axiosError.response.data as ArrayBuffer
// 						).toString()
// 					)
// 				: axiosError.message;
// 			throw new Error(
// 				`Audio generation failed: ${JSON.stringify(errorData)}`
// 			);
// 		}
// 		throw error;
// 	}
// };

// export const combineAudioSegments = async (
// 	audioSegments: Buffer[],
// 	outputPath: string,
// 	requestId: string
// ): Promise<void> => {
// 	console.log(`[${requestId}] Starting audio segments combination`);
// 	const tempPaths: string[] = [];
// 	const concatFilePath = "/tmp/concat.txt";

// 	try {
// 		console.log(
// 			`[${requestId}] Writing ${audioSegments.length} segments to temporary files`
// 		);
// 		for (let index = 0; index < audioSegments.length; index++) {
// 			const tempPath = `/tmp/audio_${index}.mp3`;
// 			await writeFile(tempPath, audioSegments[index]);
// 			tempPaths.push(tempPath);
// 			console.log(
// 				`[${requestId}] Written segment ${index + 1} to ${tempPath}, size: ${audioSegments[index].byteLength} bytes`
// 			);
// 		}

// 		const concatContent = tempPaths
// 			.map((path) => `file '${path}'`)
// 			.join("\n");
// 		await writeFile(concatFilePath, concatContent);
// 		console.log(
// 			`[${requestId}] Created concatenation file at ${concatFilePath}, contents:\n${concatContent}`
// 		);

// 		await new Promise<void>((resolve, reject) => {
// 			console.log(`[${requestId}] Starting FFmpeg audio combination`);
// 			ffmpeg()
// 				.input(concatFilePath)
// 				.inputOptions(["-f", "concat", "-safe", "0"])
// 				.output(outputPath)
// 				.outputOptions(["-c", "copy"])
// 				.on("error", async (err) => {
// 					console.error(`[${requestId}] FFmpeg error:`, err);
// 					await cleanup();
// 					reject(err);
// 				})
// 				.on("end", async () => {
// 					console.log(`[${requestId}] FFmpeg processing completed`);
// 					await cleanup();
// 					resolve();
// 				})
// 				.run();
// 		});
// 	} catch (err) {
// 		console.error(`[${requestId}] Error in audio combination:`, err);
// 		await cleanup();
// 		throw err;
// 	}

// 	async function cleanup() {
// 		console.log(`[${requestId}] Cleaning up temporary files`);
// 		try {
// 			await Promise.all([
// 				...tempPaths.map((path) => unlink(path).catch(console.error)),
// 				unlink(concatFilePath).catch(console.error),
// 			]);
// 			console.log(`[${requestId}] Cleanup completed`);
// 		} catch (error) {
// 			console.error(`[${requestId}] Cleanup error:`, error);
// 		}
// 	}
// };

// export const combineVideoAndAudio = async (
// 	videoPath: string,
// 	audioPath: string,
// 	outputPath: string,
// 	metadata: unknown,
// 	requestId: string
// ): Promise<void> => {
// 	console.log(`[${requestId}] Starting video and audio combination`);
// 	console.log(`[${requestId}] Video path: ${videoPath}`);
// 	console.log(`[${requestId}] Audio path: ${audioPath}`);
// 	console.log(`[${requestId}] Output path: ${outputPath}`);
// 	console.log(`[${requestId}] Metadata:`, metadata);

// 	const metadataString = JSON.stringify(metadata);
// 	const compressedMetadata = gzipSync(metadataString).toString("base64");
// 	console.log(
// 		`[${requestId}] Compressed metadata (base64): ${compressedMetadata.slice(0, 50)}...`
// 	);

// 	await new Promise<void>((resolve, reject) => {
// 		console.log(`[${requestId}] Initializing FFmpeg process`);
// 		ffmpeg()
// 			.input(videoPath)
// 			.input(audioPath)
// 			.outputOptions([
// 				"-c:v",
// 				"copy",
// 				"-c:a",
// 				"aac",
// 				"-shortest",
// 				`-metadata comment=${compressedMetadata}`,
// 			])
// 			.on("error", (err: Error) => {
// 				console.error(`[${requestId}] FFmpeg error:`, err);
// 				reject(err);
// 			})
// 			.on("end", () => {
// 				console.log(
// 					`[${requestId}] Video and audio combination completed`
// 				);
// 				resolve();
// 			})
// 			.save(outputPath);
// 	});
// };

// generate.ts

import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import { writeFile, unlink } from "fs/promises";
import ffmpeg from "fluent-ffmpeg";
import axios, { AxiosError, isAxiosError } from "axios";
import { gzipSync } from "zlib";
import { NextRequest } from "next/server";
import RunwayML from "@runwayml/sdk";
import type { TaskRetrieveResponse } from "@runwayml/sdk/resources/tasks.mjs";
import { runwayClient } from "../client/runwayml";

export type RUNWAYML_DURATION = 5 | 10;
export type VIDEO_MODEL = "luma" | "runway";
export type IMAGE_POSITION = "first" | "last" | "both";
export type FRAME_POSITION = "frame0" | "frame1";

export const ASPECT_RATIO = [
	"1:1",
	"16:9",
	"4:3",
	"9:16",
	"21:9",
	"3:4",
	"9:21",
];

export const CAMERA_MOTIONS = [
	"Static",
	"Move Left",
	"Move Right",
	"Move Up",
	"Move Down",
	"Push In",
	"Pull Out",
	"Zoom In",
	"Zoom Out",
	"Pan Left",
	"Pan Right",
	"Orbit Left",
	"Orbit Right",
	"Crane Up",
	"Crane Down",
];

export const LUMA_STYLES = [
	"3D Animation",
	"Anime",
	"Cinematic",
	"Digital Art",
	"Photographic",
];

export const RUNWAY_MODES = ["standard", "fast"];

export const LUMA_API_URL =
	"https://api.lumalabs.ai/dream-machine/v1/generations";
export const ELEVENLABS_API_URL =
	"https://api.elevenlabs.io/v1/sound-generation";

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

const chatModel = new ChatAnthropic({
	modelName: "claude-3-5-sonnet-20240620",
	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
});

export const parseFormData = async (
	request: NextRequest,
	requestId: string
): Promise<VideoGenerationParams> => {
	console.log(`[${requestId}] Starting form data parsing`);
	const formData = await request.formData();
	console.log(
		`[${requestId}] Raw formData keys:`,
		Array.from(formData.keys())
	);

	const metadata: VideoGenerationParams = {
		model: formData.get("model") as VIDEO_MODEL,
		prompt: `${formData.get("prompt")}. ${formData.get("camera_motion")}`.trim(),
		aspect_ratio: formData.get("aspect_ratio") as string,
		duration_seconds: Number(formData.get("duration_seconds")),
		loop: formData.get("loop") === "true",
		style: formData.get("style") as string,
		negative_prompt: formData.get("negative_prompt") as string,
		mode: formData.get("mode") as string,
	};

	console.log(`[${requestId}] Parsed metadata:`, {
		model: metadata.model,
		promptLength: metadata.prompt.length,
		aspect_ratio: metadata.aspect_ratio,
		duration: metadata.duration_seconds,
		loop: metadata.loop,
		style: metadata.style,
		negative_prompt: metadata.negative_prompt,
		mode: metadata.mode,
	});

	const imageFile = formData.get("image") as File | null;
	const imageUrl = formData.get("image_url") as string | null;
	const imagePosition = formData.get(
		"image_position"
	) as IMAGE_POSITION | null;

	if (imageFile || imageUrl) {
		console.log(`[${requestId}] Processing image data`);
		metadata.image = { position: imagePosition || "first" };

		if (imageFile) {
			console.log(`[${requestId}] Converting image file to buffer`);
			metadata.image.buffer = Buffer.from(await imageFile.arrayBuffer());
			console.log(
				`[${requestId}] Image buffer size: ${metadata.image.buffer.byteLength} bytes`
			);
		} else if (imageUrl) {
			console.log(`[${requestId}] Using image URL: ${imageUrl}`);
			metadata.image.url = imageUrl;
		}
	}

	validateGenerationParams(metadata);
	console.log(`[${requestId}] Form data validation successful`);
	console.log(
		`[${requestId}] Returning metadata from parseFormData:`,
		JSON.stringify(metadata, null, 2)
	);
	return metadata;
};

export const parseJsonData = async (
	request: NextRequest,
	requestId: string
): Promise<VideoGenerationParams> => {
	console.log(`[${requestId}] Starting JSON data parsing`);
	const jsonData = await request.json();
	console.log(
		`[${requestId}] Raw JSON data:`,
		JSON.stringify(jsonData, null, 2)
	);

	const metadata: VideoGenerationParams = {
		model: jsonData.model,
		prompt: `${jsonData.prompt}. ${jsonData.camera_motion}`.trim(),
		aspect_ratio: jsonData.aspect_ratio,
		duration_seconds: jsonData.duration_seconds,
		loop: jsonData.loop,
		style: jsonData.style,
		negative_prompt: jsonData.negative_prompt,
		mode: jsonData.mode,
	};

	console.log(`[${requestId}] Parsed metadata from JSON:`, {
		model: metadata.model,
		promptLength: metadata.prompt.length,
		aspect_ratio: metadata.aspect_ratio,
		duration: metadata.duration_seconds,
		loop: metadata.loop,
		style: metadata.style,
		negative_prompt: metadata.negative_prompt,
		mode: metadata.mode,
	});

	if (jsonData.image_url) {
		console.log(
			`[${requestId}] Processing image URL from JSON: ${jsonData.image_url}`
		);
		metadata.image = {
			url: jsonData.image_url,
			position: jsonData.image_position || "first",
		};
	}

	validateGenerationParams(metadata);
	console.log(`[${requestId}] JSON data validation successful`);
	console.log(
		`[${requestId}] Returning metadata from parseJsonData:`,
		JSON.stringify(metadata, null, 2)
	);
	return metadata;
};

export const validateGenerationParams = (
	params: VideoGenerationParams
): void => {
	console.log(`Validating generation parameters for model: ${params.model}`);
	const { model, prompt, aspect_ratio, duration_seconds } = params;

	if (!model || !["luma", "runway"].includes(model)) {
		throw new Error("Invalid model specified. Must be 'luma' or 'runway'");
	}
	if (!prompt?.trim()) {
		throw new Error("Prompt is required");
	}
	if (!aspect_ratio) {
		throw new Error("Aspect ratio is required");
	}

	if (model === "runway") {
		const validRatios = ["16:9", "9:16", "4:3", "3:4"];
		if (!validRatios.includes(aspect_ratio)) {
			throw new Error(
				`Runway only supports these aspect ratios: ${validRatios.join(", ")}`
			);
		}
	} else {
		if (!ASPECT_RATIO.includes(aspect_ratio)) {
			throw new Error(
				`Invalid aspect ratio. Must be one of: ${ASPECT_RATIO.join(", ")}`
			);
		}
	}

	if (!duration_seconds || duration_seconds < 4) {
		throw new Error("Duration must be at least 4 seconds");
	}

	if (model === "runway") {
		if (duration_seconds !== 5 && duration_seconds !== 10) {
			throw new Error(
				"Runway model only supports durations of 5 or 10 seconds"
			);
		}
	} else if (model === "luma" && duration_seconds > 80) {
		throw new Error("Luma model supports maximum duration of 80 seconds");
	}

	console.log("Generation parameters validated successfully.");
};

async function waitForVideoGeneration(
	generationId: string,
	requestId: string
): Promise<string> {
	console.log(
		`[${requestId}] waitForVideoGeneration started for ID: ${generationId}`
	);
	const maxAttempts = 30;
	const delayMs = 5000;

	for (let i = 0; i < maxAttempts; i++) {
		console.log(
			`[${requestId}] Checking generation status, attempt ${i + 1}/${maxAttempts}`
		);
		const response = await axios.get(`${LUMA_API_URL}/${generationId}`, {
			headers: { Authorization: `Bearer ${process.env.LUMA_API_KEY}` },
		});
		console.log(`[${requestId}] Current state: ${response.data.state}`);

		if (
			response.data.state === "completed" &&
			response.data.assets?.video
		) {
			console.log(`[${requestId}] Generation completed successfully`);
			console.log(
				`[${requestId}] Final video URL: ${response.data.assets.video}`
			);
			return response.data.assets.video;
		}

		if (response.data.state === "failed") {
			console.error(
				`[${requestId}] Generation failed:`,
				response.data.failure_reason
			);
			throw new Error(
				`Video generation failed: ${response.data.failure_reason}`
			);
		}

		console.log(
			`[${requestId}] Still in progress, waiting ${delayMs}ms...`
		);
		await new Promise((resolve) => setTimeout(resolve, delayMs));
	}

	throw new Error("Video generation timed out");
}

const generateRunwayVideo = async (
	params: VideoGenerationParams,
	requestId: string
): Promise<VideoGenerationResult> => {
	console.log(
		`[${requestId}] Starting Runway video generation with params:`,
		params
	);

	try {
		params.duration_seconds = params.duration_seconds <= 7 ? 5 : 10;
		const placeholderImageUrl =
			"https://placehold.co/1280x768/000000/000000.png";

		let promptImage: RunwayML.ImageToVideoCreateParams["promptImage"] = [
			{ position: "first", uri: placeholderImageUrl },
		];

		if (params.image?.url) {
			promptImage = [
				{
					position:
						params.image.position === "last" ? "last" : "first",
					uri: params.image.url,
				},
			];
		}

		const convertAspectRatioToRunway = (
			aspectRatio: string
		): RunwayML.ImageToVideoCreateParams["ratio"] => {
			switch (aspectRatio) {
				case "9:16":
				case "3:4":
					return "768:1280";
				default:
					return "1280:768";
			}
		};

		const baseParams: RunwayML.ImageToVideoCreateParams = {
			model: "gen3a_turbo",
			duration: params.duration_seconds as RUNWAYML_DURATION,
			ratio: convertAspectRatioToRunway(params.aspect_ratio),
			promptText: params.prompt,
			promptImage,
			watermark: false,
		};

		console.log(`[${requestId}] Runway request params:`, baseParams);
		const task = await runwayClient.imageToVideo.create(baseParams);
		console.log(`[${requestId}] Task created, ID: ${task.id}`);

		let attempts = 0;
		const maxAttempts = 60;
		let videoTask: TaskRetrieveResponse;

		do {
			await new Promise((resolve) => setTimeout(resolve, 5000));
			videoTask = await runwayClient.tasks.retrieve(task.id);
			attempts++;
			console.log(
				`[${requestId}] Checking task status: ${videoTask.status}, attempt ${attempts}/${maxAttempts}`
			);
			if (attempts >= maxAttempts) {
				throw new Error("Generation timed out");
			}
		} while (!["SUCCEEDED", "FAILED"].includes(videoTask.status));

		if (videoTask.status === "FAILED") {
			console.error(
				`[${requestId}] Runway task failed:`,
				videoTask.failure
			);
			if (
				(videoTask as any)?.failure?.includes(
					"You do not have enough credits to run this task."
				)
			) {
				throw new Error(
					"You do not have enough Runway credits to run this task."
				);
			}
			throw new Error(videoTask.failure || "Unknown error");
		}

		if (!videoTask.output?.[0]) {
			throw new Error("No output URL in successful response");
		}

		console.log(`[${requestId}] Runway generation completed successfully`);
		console.log(`[${requestId}] Final video URL: ${videoTask.output[0]}`);

		return {
			videoUrl: videoTask.output[0],
			generationResponseData: videoTask,
		};
	} catch (error) {
		console.error(`[${requestId}] Runway generation failed:`, error);
		if (error instanceof RunwayML.APIError) {
			if (
				error.status === 400 &&
				(error.error as any)?.error ===
					"You do not have enough credits to run this task."
			) {
				throw new Error(
					"You do not have enough Runway credits to run this task."
				);
			}
			throw new Error(
				`Runway generation failed: ${error.name}: ${error.message}`
			);
		}
		throw error;
	}
};

const generateLumaVideo = async (
	params: VideoGenerationParams,
	requestId: string
): Promise<VideoGenerationResult> => {
	console.log(
		`[${requestId}] Starting Luma video generation with params:`,
		params
	);

	try {
		const requestBody: any = {
			prompt: params.prompt,
			aspect_ratio: params.aspect_ratio,
			loop: params.loop,
			duration_seconds: params.duration_seconds,
		};

		if (params.style) requestBody.style = params.style;
		if (params.negative_prompt)
			requestBody.negative_prompt = params.negative_prompt;

		if (params.image?.url) {
			requestBody.keyframes = {};
			const addKeyframe = (position: FRAME_POSITION) => {
				requestBody.keyframes[position] = {
					type: "image",
					url: params.image!.url,
				};
			};

			if (params.image.position === "both") {
				addKeyframe("frame0");
				addKeyframe("frame1");
			} else if (params.image.position === "last") {
				addKeyframe("frame1");
			} else {
				addKeyframe("frame0");
			}
		}

		const headers = {
			Accept: "application/json",
			Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
			"Content-Type": "application/json",
		};

		console.log(
			`[${requestId}] Sending initial Luma request with body:`,
			requestBody
		);
		const response = await axios.post(LUMA_API_URL, requestBody, {
			headers,
			timeout: 30000,
		});
		console.log(
			`[${requestId}] Initial response from Luma:`,
			response.data
		);

		let videoUrl = await waitForVideoGeneration(
			response.data.id,
			requestId
		);
		let lastGenerationId = response.data.id;

		if (requestBody.duration_seconds > 4) {
			const numExtensions =
				Math.ceil(requestBody.duration_seconds / 4) - 1;
			console.log(
				`[${requestId}] Extending video ${numExtensions} times`
			);

			for (let i = 0; i < numExtensions; i++) {
				console.log(
					`[${requestId}] Processing extension ${i + 1}/${numExtensions} from generation ID ${lastGenerationId}`
				);

				const extendResponse = await axios.post(
					LUMA_API_URL,
					{
						prompt: requestBody.prompt,
						aspect_ratio: requestBody.aspect_ratio,
						keyframes: {
							frame0: {
								type: "generation",
								id: lastGenerationId,
							},
						},
					},
					{ headers }
				);
				console.log(
					`[${requestId}] Luma extend response:`,
					extendResponse.data
				);

				videoUrl = await waitForVideoGeneration(
					extendResponse.data.id,
					requestId
				);
				lastGenerationId = extendResponse.data.id;
			}
		}

		console.log(`[${requestId}] Luma generation completed successfully`);
		console.log(`[${requestId}] Final Luma video URL: ${videoUrl}`);

		return {
			videoUrl,
			generationResponseData: lastGenerationId,
		};
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === 400 &&
			(error.response.data as any)?.detail === "Insufficient credits"
		) {
			throw new Error(
				"You do not have enough Luma credits to run this task."
			);
		}
		console.error(`[${requestId}] Luma generation failed:`, error);
		throw error;
	}
};

export const generateVideo = async (
	params: VideoGenerationParams,
	requestId: string
): Promise<VideoGenerationResult> => {
	console.log(
		`[${requestId}] generateVideo called with model: ${params.model}`
	);
	validateGenerationParams(params);

	try {
		const result =
			params.model === "runway"
				? await generateRunwayVideo(params, requestId)
				: await generateLumaVideo(params, requestId);

		console.log(`[${requestId}] Video generation completed successfully`);
		console.log(`[${requestId}] Returning result:`, result);
		return result;
	} catch (error) {
		console.error(`[${requestId}] Video generation failed:`, error);
		throw error;
	}
};

export async function compressVideoForAnalysis(
	videoBuffer: Buffer,
	requestId: string,
	targetWidth = 160,
	targetHeight = 90
): Promise<Buffer> {
	console.log(
		`[${requestId}] [compressVideoForAnalysis] Starting compression process`
	);
	const inputPath = `/tmp/${requestId}_analysis_input.mp4`;
	const outputPath = `/tmp/${requestId}_analysis_output.mp4`;

	console.log(`[${requestId}] Writing original video buffer to ${inputPath}`);
	await writeFile(inputPath, videoBuffer);
	console.log(
		`[${requestId}] Original video size: ${videoBuffer.byteLength} bytes`
	);

	return new Promise<Buffer>((resolve, reject) => {
		console.log(
			`[${requestId}] Initializing FFmpeg command to compress video...`
		);
		ffmpeg(inputPath)
			.on("start", (cmd) => {
				console.log(`[${requestId}] FFmpeg command: ${cmd}`);
			})
			.videoCodec("libx264")
			.audioCodec("aac")
			.format("mp4")
			.size(`${targetWidth}x${targetHeight}`)
			.outputOptions([
				"-an",
				"-preset veryfast",
				"-b:v 200k",
				"-movflags faststart",
				"-y",
			])
			.on("progress", (progress) => {
				console.log(
					`[${requestId}] [FFmpeg Progress] frames: ${progress.frames}, fps: ${progress.currentFps}, kbps: ${progress.currentKbps}, time: ${progress.timemark}`
				);
			})
			.on("error", async (err) => {
				console.error(`[${requestId}] Compression error:`, err);
				await cleanup();
				reject(err);
			})
			.on("end", async () => {
				console.log(
					`[${requestId}] Compression completed successfully`
				);
				try {
					const compressedBuffer = await import("fs/promises").then(
						(fs) => fs.readFile(outputPath)
					);
					console.log(
						`[${requestId}] Compressed file size: ${compressedBuffer.byteLength} bytes`
					);
					await cleanup();
					resolve(compressedBuffer);
				} catch (readErr) {
					console.error(
						`[${requestId}] Failed to read compressed file:`,
						readErr
					);
					await cleanup();
					reject(readErr);
				}
			})
			.save(outputPath);

		async function cleanup() {
			console.log(`[${requestId}] Cleaning up temporary files`);
			await Promise.allSettled([
				unlink(inputPath).catch(() => null),
				unlink(outputPath).catch(() => null),
			]);
			console.log(`[${requestId}] Cleanup completed`);
		}
	});
}

export const fallbackVideoAnalysis = (originalPrompt: string): string[] => {
	return [originalPrompt];
};

export const analyzeVideoWithGemini = async (
	videoUrl: string,
	duration_seconds: number,
	originalPrompt: string,
	requestId: string,
	retries = 3
): Promise<VideoAnalysisResult> => {
	console.log(`[${requestId}] Starting video analysis for URL: ${videoUrl}`);

	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			console.log(
				`[${requestId}] Analysis attempt ${attempt + 1}/${retries}`
			);
			const videoResponse = await axios.get(videoUrl, {
				responseType: "arraybuffer",
				timeout: 30000,
			});
			const videoBuffer: Buffer = videoResponse.data;
			console.log(
				`[${requestId}] Video downloaded, size: ${videoBuffer.byteLength} bytes`
			);

			let finalVideoBuffer = videoBuffer;
			if (finalVideoBuffer.byteLength > 200_000) {
				console.log(
					`[${requestId}] Video is bigger than 200 KB, compressing...`
				);
				finalVideoBuffer = await compressVideoForAnalysis(
					finalVideoBuffer,
					requestId
				);
			}

			if (finalVideoBuffer.byteLength > 200_000) {
				console.log(
					`[${requestId}] Still bigger than 200 KB after compression. Using fallback.`
				);
				return {
					segments: fallbackVideoAnalysis(originalPrompt),
					analysisText: null,
					responseData: null,
				};
			}

			const videoBase64 = finalVideoBuffer.toString("base64");
			const segmentCount = Math.ceil(duration_seconds / 20) || 1;

			const systemPrompt = {
				text: "You are a concise visual analyst. Summarize key events. No filler.",
				author: "system",
			};
			const userPrompt = {
				text: `Analyze this ${duration_seconds}-second video in ${segmentCount} segments. Focus on visuals only.`,
				author: "user",
			};

			const payload = {
				contents: [
					{
						parts: [
							systemPrompt,
							userPrompt,
							{
								inlineData: {
									mimeType: "video/mp4",
									data: videoBase64,
								},
							},
						],
					},
				],
				generationConfig: {
					temperature: 0.4,
					topK: 32,
					topP: 1,
					maxOutputTokens: 4096,
				},
			};

			console.log(`[${requestId}] Sending analysis request to Gemini`);
			const response = await axios.post(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${process.env.GOOGLE_API_KEY}`,
				payload,
				{
					headers: { "Content-Type": "application/json" },
					maxContentLength: Infinity,
					maxBodyLength: Infinity,
				}
			);

			if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
				throw new Error("Invalid Gemini API response format");
			}

			let analysisText =
				response.data.candidates[0].content.parts[0].text;
			analysisText = analysisText.trim();

			const segments = analysisText
				.split(/Segment \d+:/i)
				.filter((seg: string) => seg.trim().length > 0)
				.map((seg: string) => seg.trim());

			return { segments, analysisText, responseData: response.data };
		} catch (error) {
			console.error(
				`[${requestId}] Attempt ${attempt + 1} failed:`,
				error
			);
			if (attempt === retries - 1) {
				console.log(`[${requestId}] Using fallback analysis`);
				return {
					segments: fallbackVideoAnalysis(originalPrompt),
					analysisText: null,
					responseData: null,
				};
			}
			const backoffTime = 2000 * (attempt + 1);
			console.log(`[${requestId}] Waiting ${backoffTime}ms before retry`);
			await new Promise((resolve) => setTimeout(resolve, backoffTime));
		}
	}

	throw new Error("Unexpected error in video analysis");
};

export const adjustTimeReferences = (
	segment: string,
	segmentIndex: number,
	requestId: string
): string => {
	console.log(
		`[${requestId}] Adjusting time references for segment ${segmentIndex + 1}`
	);
	const timeRegex = /At (\d+)s/g;
	return segment.replace(timeRegex, (_match, seconds) => {
		const adjustedSeconds = (parseInt(seconds) - segmentIndex * 20) % 20;
		return `At ${adjustedSeconds}s`;
	});
};

export const generateAudioSegments = async (
	segments: string[],
	totalDuration: number,
	requestId: string
): Promise<Buffer[]> => {
	console.log(
		`[${requestId}] Starting audio generation for ${segments.length} segments`
	);
	const audioSegments: Buffer[] = [];
	let remainingDuration = totalDuration;

	for (let i = 0; i < segments.length; i++) {
		console.log(
			`[${requestId}] Processing segment ${i + 1}/${segments.length}`
		);
		const segmentDuration = Math.min(remainingDuration, 20);
		const adjustedSegment = adjustTimeReferences(segments[i], i, requestId);
		console.log(`[${requestId}] Summarizing segment ${i + 1} with Claude`);
		const { summary } = await summarizeWithClaude(
			adjustedSegment,
			segmentDuration,
			requestId
		);

		const audioPrompt = Array.isArray(summary)
			? summary
					.map((s) => (typeof s === "string" ? s : JSON.stringify(s)))
					.join(" ")
			: String(summary);

		console.log(
			`[${requestId}] Generating audio for segment ${i + 1}, duration: ${segmentDuration}s`
		);
		const audioBuffer = await generateAudioSegment(
			audioPrompt,
			segmentDuration,
			requestId
		);
		audioSegments.push(audioBuffer);
		remainingDuration -= segmentDuration;
	}

	console.log(`[${requestId}] Completed audio generation for all segments`);
	return audioSegments;
};

export const summarizeWithClaude = async (
	description: string,
	segmentDuration: number,
	requestId: string
): Promise<{ summary: string; response: any }> => {
	console.log(
		`[${requestId}] Starting Claude summarization for ${segmentDuration}s segment:\n${description}`
	);
	const maxCharacters = 450;

	try {
		const response = await chatModel.invoke([
			new HumanMessage(
				`Create a sound effect description for this ${segmentDuration}-second video segment. Keep it under ${maxCharacters} characters:\n\n${description}`
			),
		]);

		console.log(`[${requestId}] Raw Claude response:`, response);

		let summaryContent = response.content;
		let summary = "";

		if (typeof summaryContent === "string") {
			summary = summaryContent;
		} else if (Array.isArray(summaryContent)) {
			summary = summaryContent
				.map((part) => {
					if (typeof part === "string") return part;
					if ("type" in part && part.type === "text")
						return part.text;
					return "";
				})
				.join(" ")
				.trim();
		}

		if (summary.length > maxCharacters) {
			summary = summary.slice(0, maxCharacters - 3) + "...";
		}

		console.log(
			`[${requestId}] Summary generated, length: ${summary.length} characters`
		);
		return { summary, response };
	} catch (error) {
		console.error(`[${requestId}] Error in summarization:`, error);
		throw error;
	}
};

export const generateAudioSegment = async (
	prompt: string,
	duration: number,
	requestId: string
): Promise<Buffer> => {
	console.log(
		`[${requestId}] Generating audio segment of ${duration}s with prompt:\n${prompt}`
	);
	const adjustedDuration = Math.max(duration, 0.5);

	try {
		const response = await axios.post(
			ELEVENLABS_API_URL,
			{
				text: prompt,
				duration_seconds: adjustedDuration,
				prompt_influence: 0.7,
			},
			{
				headers: {
					"xi-api-key": process.env.ELEVENLABS_API_KEY,
					"Content-Type": "application/json",
				},
				responseType: "arraybuffer",
			}
		);

		console.log(
			`[${requestId}] Audio segment generated successfully, size: ${response.data.length} bytes`
		);
		return Buffer.from(response.data);
	} catch (error) {
		console.error(`[${requestId}] Audio generation failed:`, error);
		if (isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const errorData = axiosError.response?.data
				? JSON.parse(
						Buffer.from(
							axiosError.response.data as ArrayBuffer
						).toString()
					)
				: axiosError.message;
			throw new Error(
				`Audio generation failed: ${JSON.stringify(errorData)}`
			);
		}
		throw error;
	}
};

export const combineAudioSegments = async (
	audioSegments: Buffer[],
	outputPath: string,
	requestId: string
): Promise<void> => {
	console.log(`[${requestId}] Starting audio segments combination`);
	const tempPaths: string[] = [];
	const concatFilePath = "/tmp/concat.txt";

	try {
		console.log(
			`[${requestId}] Writing ${audioSegments.length} segments to temporary files`
		);
		for (let index = 0; index < audioSegments.length; index++) {
			const tempPath = `/tmp/audio_${index}.mp3`;
			await writeFile(tempPath, audioSegments[index]);
			tempPaths.push(tempPath);
			console.log(
				`[${requestId}] Written segment ${index + 1} to ${tempPath}, size: ${audioSegments[index].byteLength} bytes`
			);
		}

		const concatContent = tempPaths
			.map((path) => `file '${path}'`)
			.join("\n");
		await writeFile(concatFilePath, concatContent);
		console.log(
			`[${requestId}] Created concatenation file at ${concatFilePath}, contents:\n${concatContent}`
		);

		await new Promise<void>((resolve, reject) => {
			console.log(`[${requestId}] Starting FFmpeg audio combination`);
			ffmpeg()
				.input(concatFilePath)
				.inputOptions(["-f", "concat", "-safe", "0"])
				.output(outputPath)
				.outputOptions(["-c", "copy"])
				.on("error", async (err) => {
					console.error(`[${requestId}] FFmpeg error:`, err);
					await cleanup();
					reject(err);
				})
				.on("end", async () => {
					console.log(`[${requestId}] FFmpeg processing completed`);
					await cleanup();
					resolve();
				})
				.run();
		});
	} catch (err) {
		console.error(`[${requestId}] Error in audio combination:`, err);
		await cleanup();
		throw err;
	}

	async function cleanup() {
		console.log(`[${requestId}] Cleaning up temporary files`);
		try {
			await Promise.all([
				...tempPaths.map((path) => unlink(path).catch(console.error)),
				unlink(concatFilePath).catch(console.error),
			]);
			console.log(`[${requestId}] Cleanup completed`);
		} catch (error) {
			console.error(`[${requestId}] Cleanup error:`, error);
		}
	}
};

export const combineVideoAndAudio = async (
	videoPath: string,
	audioPath: string,
	outputPath: string,
	metadata: unknown,
	requestId: string
): Promise<void> => {
	console.log(`[${requestId}] Starting video and audio combination`);
	console.log(`[${requestId}] Video path: ${videoPath}`);
	console.log(`[${requestId}] Audio path: ${audioPath}`);
	console.log(`[${requestId}] Output path: ${outputPath}`);
	console.log(`[${requestId}] Metadata:`, metadata);

	const metadataString = JSON.stringify(metadata);
	const compressedMetadata = gzipSync(metadataString).toString("base64");
	console.log(
		`[${requestId}] Compressed metadata (base64): ${compressedMetadata.slice(0, 50)}...`
	);

	await new Promise<void>((resolve, reject) => {
		console.log(`[${requestId}] Initializing FFmpeg process`);
		ffmpeg()
			.input(videoPath)
			.input(audioPath)
			.outputOptions([
				"-c:v",
				"copy",
				"-c:a",
				"aac",
				"-shortest",
				`-metadata comment=${compressedMetadata}`,
			])
			.on("error", (err: Error) => {
				console.error(`[${requestId}] FFmpeg error:`, err);
				reject(err);
			})
			.on("end", () => {
				console.log(
					`[${requestId}] Video and audio combination completed`
				);
				resolve();
			})
			.save(outputPath);
	});
};
