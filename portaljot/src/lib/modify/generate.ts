// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { ChatAnthropic } from "@langchain/anthropic";
// import { HumanMessage } from "@langchain/core/messages";
// import { exec } from "child_process";
// import { promisify } from "util";
// import { writeFile, unlink } from "fs/promises";
// import ffmpeg from "fluent-ffmpeg";
// import axios, { AxiosError, isAxiosError } from "axios";
// import { gzipSync } from "zlib";
// import { NextRequest } from "next/server";
// import RunwayML from "@runwayml/sdk";
// import sharp from "sharp";

// export interface TextBlock {
// 	type: "text";
// 	text: string;
// }

// export interface VideoGenerationParams {
// 	model: "luma" | "runway";
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
// 		position?: "first" | "last" | "both";
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

// export const LUMA_API_URL =
// 	"https://api.lumalabs.ai/dream-machine/v1/generations";
// export const ELEVENLABS_API_URL =
// 	"https://api.elevenlabs.io/v1/sound-generation";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
// const chatModel = new ChatAnthropic({
// 	modelName: "claude-3-5-sonnet-20240620",
// 	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
// });

// const runwayClient = new RunwayML({
// 	apiKey: process.env.RUNWAY_API_KEY,
// 	maxRetries: 2,
// 	timeout: 60000,
// });

// const execAsync = promisify(exec);

// export const imageToBase64 = async (
// 	buffer: Buffer,
// 	mimeType = "image/jpeg"
// ): Promise<string> => {
// 	return `data:${mimeType};base64,${buffer.toString("base64")}`;
// };

// export const getMimeType = (buffer: Buffer): string => {
// 	const signatures: Record<string, string> = {
// 		ffd8ffe0: "image/jpeg",
// 		"89504e47": "image/png",
// 		"47494638": "image/gif",
// 		"424d": "image/bmp",
// 	};
// 	const hex = buffer.toString("hex", 0, 4).toLowerCase();
// 	return signatures[hex] || "image/jpeg";
// };

// export const parseFormData = async (
// 	request: NextRequest
// ): Promise<VideoGenerationParams> => {
// 	const formData = await request.formData();
// 	const metadata: VideoGenerationParams = {
// 		model: formData.get("model") as "luma" | "runway",
// 		prompt: `${formData.get("prompt")}. ${formData.get("camera_motion")}`.trim(),
// 		aspect_ratio: formData.get("aspect_ratio") as string,
// 		duration_seconds: Number(formData.get("duration_seconds")),
// 		loop: formData.get("loop") === "true",
// 		style: formData.get("style") as string,
// 		negative_prompt: formData.get("negative_prompt") as string,
// 		mode: formData.get("mode") as string,
// 	};

// 	const imageFile = formData.get("image") as File | null;
// 	const imageUrl = formData.get("image_url") as string | null;
// 	const imagePosition = formData.get("image_position") as
// 		| "first"
// 		| "last"
// 		| "both"
// 		| null;

// 	if (imageFile || imageUrl) {
// 		metadata.image = {
// 			position: imagePosition || "first",
// 		};

// 		if (imageFile) {
// 			metadata.image.buffer = Buffer.from(await imageFile.arrayBuffer());
// 		} else if (imageUrl) {
// 			metadata.image.url = imageUrl;
// 		}
// 	}

// 	validateGenerationParams(metadata);
// 	return metadata;
// };

// export const parseJsonData = async (
// 	request: NextRequest
// ): Promise<VideoGenerationParams> => {
// 	const jsonData = await request.json();
// 	const metadata: VideoGenerationParams = {
// 		model: jsonData.model,
// 		prompt: `${jsonData.prompt} ${jsonData.camera_motion}.trim()`,
// 		aspect_ratio: jsonData.aspect_ratio,
// 		duration_seconds: jsonData.duration_seconds,
// 		loop: jsonData.loop,
// 		style: jsonData.style,
// 		negative_prompt: jsonData.negative_prompt,
// 		mode: jsonData.mode,
// 	};

// 	if (jsonData.image_url) {
// 		metadata.image = {
// 			url: jsonData.image_url,
// 			position: jsonData.image_position || "first",
// 		};
// 	}

// 	validateGenerationParams(metadata);
// 	return metadata;
// };

// export interface VideoGenerationParams {
// 	model: "luma" | "runway";
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
// 		position?: "first" | "last" | "both";
// 	};
// }

// const generateRunwayVideo = async (
// 	params: VideoGenerationParams
// ): Promise<VideoGenerationResult> => {
// 	try {
// 		// Ensure duration is either 5 or 10 seconds
// 		if (params.duration_seconds !== 5 && params.duration_seconds !== 10) {
// 			params.duration_seconds = params.duration_seconds <= 7 ? 5 : 10;
// 		}

// 		// Use a publicly accessible placeholder image with correct aspect ratio
// 		const placeholderImageUrl =
// 			"https://placehold.co/1280x768/000000/000000.png";

// 		// Set up the prompt image
// 		let promptImage: RunwayML.ImageToVideoCreateParams["promptImage"] = [
// 			{
// 				position: "first",
// 				uri: placeholderImageUrl,
// 			},
// 		];

// 		// If an image is provided, use it instead of placeholder
// 		if (params.image?.url) {
// 			promptImage = [
// 				{
// 					position:
// 						params.image.position === "last" ? "last" : "first",
// 					uri: params.image.url,
// 				},
// 			];
// 		}

// 		// Convert user-friendly aspect ratios to Runway's supported ratios
// 		const convertAspectRatioToRunway = (
// 			aspectRatio: string
// 		): RunwayML.ImageToVideoCreateParams["ratio"] => {
// 			switch (aspectRatio) {
// 				case "9:16":
// 				case "3:4":
// 					return "768:1280";
// 				case "16:9":
// 				case "4:3":
// 				case "1:1":
// 				default:
// 					return "1280:768";
// 			}
// 		};

// 		const baseParams: RunwayML.ImageToVideoCreateParams = {
// 			model: "gen3a_turbo",
// 			duration: params.duration_seconds as 5 | 10,
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
// 		let videoTask;

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
// 			const errorMessage = `${error.name}: ${error.message}`;
// 			throw new Error(`Runway generation failed: ${errorMessage}`);
// 		} else if (error instanceof Error) {
// 			throw new Error(`Runway generation failed: ${error.message}`);
// 		}
// 		throw new Error("Runway generation failed: Unknown error");
// 	}
// };

// // Update the validation function to match Runway's supported ratios
// export const validateGenerationParams = (
// 	params: VideoGenerationParams
// ): void => {
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

// 	// Different aspect ratio validation for Runway vs Luma
// 	if (model === "runway") {
// 		const validRatios = ["16:9", "9:16", "4:3", "3:4"];
// 		if (!validRatios.includes(aspect_ratio)) {
// 			throw new Error(
// 				`Runway only supports these aspect ratios: ${validRatios.join(", ")}`
// 			);
// 		}
// 	} else {
// 		const validRatios = [
// 			"1:1",
// 			"16:9",
// 			"4:3",
// 			"9:16",
// 			"21:9",
// 			"3:4",
// 			"9:21",
// 		];
// 		if (!validRatios.includes(aspect_ratio)) {
// 			throw new Error(
// 				`Invalid aspect ratio. Must be one of: ${validRatios.join(", ")}`
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
// };

// // Helper function for aspect ratio conversion
// const convertAspectRatioToRunway = (
// 	aspectRatio: string
// ): "1280:768" | "768:1280" => {
// 	// Runway Gen-3 Turbo supports specific aspect ratios[3]
// 	switch (aspectRatio) {
// 		case "9:16":
// 		case "3:4":
// 		case "9:21":
// 			return "768:1280";
// 		default:
// 			return "1280:768";
// 	}
// };

// // Helper function to validate image aspect ratio
// const validateImageAspectRatio = async (imageUrl: string): Promise<boolean> => {
// 	try {
// 		const response = await fetch(imageUrl, { method: "HEAD" });
// 		if (!response.ok) {
// 			throw new Error("Failed to fetch image");
// 		}

// 		// Create an image element to check dimensions
// 		const img = new Image();
// 		await new Promise((resolve, reject) => {
// 			img.onload = resolve;
// 			img.onerror = reject;
// 			img.src = imageUrl;
// 		});

// 		const ratio = img.width / img.height;
// 		return ratio >= 0.5 && ratio <= 2.0;
// 	} catch (error) {
// 		throw new Error(
// 			`Failed to validate image aspect ratio: ${(error as Error).message}`
// 		);
// 	}
// };

// // Function to generate video using Luma API
// const generateLumaVideo = async (
// 	params: VideoGenerationParams
// ): Promise<VideoGenerationResult> => {
// 	// Construct the request body
// 	const requestBody: any = {
// 		prompt: params.prompt,
// 		aspect_ratio: params.aspect_ratio,
// 		loop: params.loop,
// 	};

// 	// Add optional parameters if they exist
// 	if (params.style) requestBody.style = params.style;
// 	if (params.negative_prompt)
// 		requestBody.negative_prompt = params.negative_prompt;

// 	// Handle image keyframes if provided
// 	if (params.image?.url) {
// 		requestBody.keyframes = {};
// 		const addKeyframe = (position: "frame0" | "frame1") => {
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

// 	// Fixed header format by removing the string template literal and extra quotes
// 	const headers = {
// 		Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 		"Content-Type": "application/json",
// 	};

// 	// Make the initial generation request
// 	const response = await axios.post(LUMA_API_URL, requestBody, {
// 		headers,
// 		timeout: 30000,
// 	});

// 	// Poll for completion
// 	const maxAttempts = 30;
// 	const delayMs = 5000;

// 	for (let i = 0; i < maxAttempts; i++) {
// 		const statusResponse = await axios.get(
// 			`${LUMA_API_URL}/${response.data.id}`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 				},
// 				timeout: 10000,
// 			}
// 		);

// 		if (
// 			statusResponse.data.state === "completed" &&
// 			statusResponse.data.assets?.video
// 		) {
// 			return {
// 				videoUrl: statusResponse.data.assets.video,
// 				generationResponseData: statusResponse.data,
// 			};
// 		}

// 		if (statusResponse.data.state === "failed") {
// 			throw new Error(
// 				`Luma generation failed: ${statusResponse.data.failure_reason}`
// 			);
// 		}

// 		await new Promise((resolve) => setTimeout(resolve, delayMs));
// 	}

// 	throw new Error("Luma generation timed out");
// };

// export const generateVideo = async (
// 	params: VideoGenerationParams
// ): Promise<VideoGenerationResult> => {
// 	validateGenerationParams(params);
// 	return params.model === "runway"
// 		? generateRunwayVideo(params)
// 		: generateLumaVideo(params);
// };

// // export const analyzeVideoWithGemini = async (
// // 	videoUrl: string,
// // 	duration_seconds: number,
// // 	retries = 3
// // ): Promise<VideoAnalysisResult> => {
// // 	for (let attempt = 0; attempt < retries; attempt++) {
// // 		try {
// // 			const videoResponse = await axios.get(videoUrl, {
// // 				responseType: "arraybuffer",
// // 			});
// // 			const videoBuffer = Buffer.from(videoResponse.data, "binary");
// // 			const base64Video = videoBuffer.toString("base64");

// // 			const payload = {
// // 				contents: [
// // 					{
// // 						parts: [
// // 							{
// // 								text: Analyze this ${duration_seconds}-second video and provide a detailed description of the visual content, focusing on key events, scene changes, and notable elements. Break down your analysis into ${Math.ceil(
// // 									duration_seconds / 20
// // 								)} segments, each covering up to 20 seconds of the video. For each segment, include timestamps for significant events.,
// // 							},
// // 							{
// // 								inlineData: {
// // 									mimeType: "video/mp4",
// // 									data: base64Video,
// // 								},
// // 							},
// // 						],
// // 					},
// // 				],
// // 				generationConfig: {
// // 					temperature: 0.4,
// // 					topK: 32,
// // 					topP: 1,
// // 					maxOutputTokens: 4096,
// // 				},
// // 			};

// // 			const response = await axios.post(
// // 				https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${process.env.GOOGLE_API_KEY},
// // 				payload,
// // 				{
// // 					headers: { "Content-Type": "application/json" },
// // 				}
// // 			);

// // 			const analysisText =
// // 				response.data.candidates[0].content.parts[0].text;
// // 			const segments = analysisText
// // 				.split(/Segment \d+:/g)
// // 				.filter(Boolean)
// // 				.map((segment: string) => segment.trim());

// // 			return { segments, analysisText, responseData: response.data };
// // 		} catch (error) {
// // 			console.error(Analysis attempt ${attempt + 1} failed:, error);
// // 			if (attempt === retries - 1) {
// // 				return {
// // 					segments: fallbackVideoAnalysis(duration_seconds),
// // 					analysisText: null,
// // 					responseData: null,
// // 				};
// // 			}
// // 			await new Promise((resolve) =>
// // 				setTimeout(resolve, 1000 * (attempt + 1))
// // 			);
// // 		}
// // 	}
// // 	throw new Error("Unexpected error in video analysis");
// // };

// export const analyzeVideoWithGemini = async (
// 	videoUrl: string,
// 	duration_seconds: number,
// 	retries = 3
// ): Promise<VideoAnalysisResult> => {
// 	for (let attempt = 0; attempt < retries; attempt++) {
// 		try {
// 			// Download video and convert to base64 in smaller chunks
// 			const videoResponse = await axios.get(videoUrl, {
// 				responseType: "arraybuffer",
// 				maxContentLength: 50 * 1024 * 1024, // 50MB limit
// 				timeout: 30000,
// 			});

// 			// Convert to base64 more efficiently
// 			const videoBase64 = Buffer.from(videoResponse.data).toString(
// 				"base64"
// 			);

// 			const payload = {
// 				contents: [
// 					{
// 						parts: [
// 							{
// 								text: `Analyze this ${duration_seconds}-second video and provide a detailed description of the visual content, focusing on key events, scene changes, and notable elements. Break down your analysis into ${Math.ceil(duration_seconds / 20)} segments, each covering up to 20 seconds of the video. For each segment, include timestamps for significant events.`,
// 							},
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

// 			// Make request with chunked encoding disabled
// 			const response = await axios.post(
// 				`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${process.env.GOOGLE_API_KEY}`,
// 				payload,
// 				{
// 					headers: {
// 						"Content-Type": "application/json",
// 						"Accept-Encoding": "gzip, deflate",
// 					},
// 					maxContentLength: Infinity,
// 					maxBodyLength: Infinity,
// 					decompress: true,
// 				}
// 			);

// 			if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
// 				throw new Error("Invalid response format from Gemini API");
// 			}

// 			const analysisText =
// 				response.data.candidates[0].content.parts[0].text;
// 			const segments = analysisText
// 				.split(/Segment \d+:/g)
// 				.filter(Boolean)
// 				.map((segment: string) => segment.trim());

// 			return { segments, analysisText, responseData: response.data };
// 		} catch (error) {
// 			console.error(`Analysis attempt ${attempt + 1} failed:`, error);

// 			if (attempt === retries - 1) {
// 				// On final retry, return fallback analysis
// 				return {
// 					segments: fallbackVideoAnalysis(duration_seconds),
// 					analysisText: null,
// 					responseData: null,
// 				};
// 			}

// 			// Wait longer between retries
// 			await new Promise((resolve) =>
// 				setTimeout(resolve, 2000 * (attempt + 1))
// 			);
// 		}
// 	}

// 	throw new Error("Unexpected error in video analysis");
// };

// export const fallbackVideoAnalysis = (duration_seconds: number): string[] => {
// 	const segmentCount = Math.ceil(duration_seconds / 20);
// 	return Array.from({ length: segmentCount }, (_, i) => {
// 		const start = i * 20;
// 		const end = Math.min((i + 1) * 20, duration_seconds);
// 		return `Video segment from ${start}s to ${end}s. This segment likely contains visual content related to the overall theme of the video.`;
// 	});
// };

// export const adjustTimeReferences = (
// 	segment: string,
// 	segmentIndex: number
// ): string => {
// 	const timeRegex = /At (\d+)s/g;
// 	return segment.replace(timeRegex, (match, seconds) => {
// 		const adjustedSeconds = (parseInt(seconds) - segmentIndex * 20) % 20;
// 		return `At ${adjustedSeconds}s`;
// 	});
// };

// export const generateAudioSegments = async (
// 	segments: string[],
// 	totalDuration: number
// ): Promise<Buffer[]> => {
// 	const audioSegments: Buffer[] = [];
// 	let remainingDuration = totalDuration;

// 	for (let i = 0; i < segments.length; i++) {
// 		const segmentDuration = Math.min(remainingDuration, 20);
// 		const adjustedSegment = adjustTimeReferences(segments[i], i);
// 		const { summary } = await summarizeWithClaude(
// 			adjustedSegment,
// 			segmentDuration
// 		);

// 		const audioPrompt = Array.isArray(summary)
// 			? summary
// 					.map((s) => (typeof s === "string" ? s : JSON.stringify(s)))
// 					.join(" ")
// 			: String(summary);

// 		const audioBuffer = await generateAudioSegment(
// 			audioPrompt,
// 			segmentDuration
// 		);
// 		audioSegments.push(audioBuffer);
// 		remainingDuration -= segmentDuration;
// 	}

// 	return audioSegments;
// };

// export const summarizeWithClaude = async (
// 	description: string,
// 	segmentDuration: number
// ): Promise<{ summary: string; response: any }> => {
// 	const maxCharacters = 450;
// 	try {
// 		const response = await chatModel.invoke([
// 			new HumanMessage(
// 				`Create a sound effect description for this ${segmentDuration}-second video segment. Describe key sounds, their timing, and ambient noise. Focus on creating an immersive audio experience. Keep it under ${maxCharacters} characters:\n\n${description}`
// 			),
// 		]);

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

// 		return { summary, response };
// 	} catch (error) {
// 		console.error("Error in summarization:", error);
// 		throw error;
// 	}
// };

// export const generateAudioSegment = async (
// 	prompt: string,
// 	duration: number
// ): Promise<Buffer> => {
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

// 		return Buffer.from(response.data);
// 	} catch (error) {
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

// // export const combineAudioSegments = async (
// // 	audioSegments: Buffer[],
// // 	outputPath: string
// // ): Promise<void> => {
// // 	const tempPaths: string[] = [];

// // 	return new Promise<void>(async (resolve, reject) => {
// // 		try {
// // 			for (let index = 0; index < audioSegments.length; index++) {
// // 				const tempPath = /tmp/segment_${index}.mp3;
// // 				await writeFile(tempPath, audioSegments[index]);
// // 				tempPaths.push(tempPath);
// // 			}

// // 			const command = ffmpeg();
// // 			tempPaths.forEach((tempPath) => {
// // 				command.input(tempPath);
// // 			});

// // 			command
// // 				.on("error", async (err: Error) => {
// // 					await Promise.all(
// // 						tempPaths.map((path) =>
// // 							unlink(path).catch(console.error)
// // 						)
// // 					);
// // 					reject(err);
// // 				})
// // 				.on("end", async () => {
// // 					await Promise.all(
// // 						tempPaths.map((path) =>
// // 							unlink(path).catch(console.error)
// // 						)
// // 					);
// // 					resolve();
// // 				})
// // 				.mergeToFile(outputPath, "/tmp");
// // 		} catch (err) {
// // 			await Promise.all(
// // 				tempPaths.map((path) => unlink(path).catch(console.error))
// // 			);
// // 			reject(err);
// // 		}
// // 	});
// // };

// // export const combineAudioSegments = async (
// // 	audioSegments: Buffer[],
// // 	outputPath: string
// // ): Promise<void> => {
// // 	const tempPaths: string[] = [];
// // 	const concatFilePath = "/tmp/concat.txt";

// // 	try {
// // 		// First write all audio segments to temp files
// // 		for (let index = 0; index < audioSegments.length; index++) {
// // 			const tempPath = /tmp/segment_${index}.mp3;
// // 			await writeFile(tempPath, audioSegments[index]);
// // 			tempPaths.push(tempPath);
// // 		}

// // 		// Then create the concat file with the paths of the segments we just wrote
// // 		const concatContent = tempPaths
// // 			.map((path) => file '${path}')
// // 			.join("\n");
// // 		await writeFile(concatFilePath, concatContent);

// // 		return new Promise<void>((resolve, reject) => {
// // 			ffmpeg()
// // 				.input(concatFilePath)
// // 				.inputOptions(["-f", "concat", "-safe", "0"])
// // 				.outputOptions("-c copy")
// // 				.on("error", async (err: Error) => {
// // 					await cleanup();
// // 					reject(err);
// // 				})
// // 				.on("end", async () => {
// // 					await cleanup();
// // 					resolve();
// // 				})
// // 				.save(outputPath);
// // 		});
// // 	} catch (err) {
// // 		await cleanup();
// // 		throw err;
// // 	}

// // 	async function cleanup() {
// // 		try {
// // 			// Clean up temp files
// // 			for (const path of tempPaths) {
// // 				await unlink(path).catch((e) =>
// // 					console.error(Error deleting ${path}:, e)
// // 				);
// // 			}
// // 			await unlink(concatFilePath).catch((e) =>
// // 				console.error(Error deleting concat file:, e)
// // 			);
// // 		} catch (error) {
// // 			console.error("Cleanup error:", error);
// // 		}
// // 	}
// // };

// // export const combineVideoAndAudio = async (
// // 	videoPath: string,
// // 	audioPath: string,
// // 	outputPath: string,
// // 	metadata: unknown
// // ): Promise<void> => {
// // 	const metadataString = JSON.stringify(metadata);
// // 	const compressedMetadata = gzipSync(metadataString).toString("base64");

// // 	return new Promise<void>((resolve, reject) => {
// // 		ffmpeg()
// // 			.input(videoPath)
// // 			.input(audioPath)
// // 			.outputOptions("-c:v copy")
// // 			.outputOptions("-c:a aac")
// // 			.outputOptions("-shortest")
// // 			.outputOptions(-metadata comment=${compressedMetadata})
// // 			.on("error", (err: Error) => {
// // 				reject(err);
// // 			})
// // 			.on("end", () => {
// // 				resolve();
// // 			})
// // 			.save(outputPath);
// // 	});
// // };

// export const combineAudioSegments = async (
// 	audioSegments: Buffer[],
// 	outputPath: string
// ): Promise<void> => {
// 	const tempPaths: string[] = [];
// 	const concatFilePath = "/tmp/concat.txt";

// 	try {
// 		// Write each audio segment to a temporary file
// 		for (let index = 0; index < audioSegments.length; index++) {
// 			const tempPath = `/tmp/audio_${index}.mp3`;
// 			await writeFile(tempPath, audioSegments[index]);
// 			tempPaths.push(tempPath);
// 		}

// 		// Create concatenation file with absolute paths
// 		// const concatContent = tempPaths
// 		// 	.map((path) => file '${path}')
// 		// 	.join("\n");
// 		// await writeFile(concatFilePath, concatContent);

// 		const concatContent = tempPaths
// 			.map((path) => `file '${path}'`) // Corrected to use backticks
// 			.join("\n");
// 		await writeFile(concatFilePath, concatContent);

// 		// Use simpler ffmpeg command
// 		return new Promise<void>((resolve, reject) => {
// 			ffmpeg()
// 				.input(concatFilePath)
// 				.inputOptions(["-f", "concat", "-safe", "0"])
// 				.output(outputPath)
// 				.outputOptions(["-c", "copy"])
// 				.on("error", async (err) => {
// 					console.error("FFmpeg error:", err);
// 					await cleanup();
// 					reject(err);
// 				})
// 				.on("end", async () => {
// 					await cleanup();
// 					resolve();
// 				})
// 				.run();
// 		});
// 	} catch (err) {
// 		await cleanup();
// 		throw err;
// 	}

// 	async function cleanup() {
// 		try {
// 			await Promise.all([
// 				...tempPaths.map((path) => unlink(path).catch(console.error)),
// 				unlink(concatFilePath).catch(console.error),
// 			]);
// 		} catch (error) {
// 			console.error("Cleanup error:", error);
// 		}
// 	}
// };

// export const combineVideoAndAudio = async (
// 	videoPath: string,
// 	audioPath: string,
// 	outputPath: string,
// 	metadata: unknown
// ): Promise<void> => {
// 	const metadataString = JSON.stringify(metadata);
// 	const compressedMetadata = gzipSync(metadataString).toString("base64");

// 	return new Promise<void>((resolve, reject) => {
// 		ffmpeg()
// 			.input(videoPath)
// 			.input(audioPath)
// 			.outputOptions([
// 				"-c:v",
// 				"copy",
// 				"-c:a",
// 				"aac",
// 				"-shortest",
// 				"-metadata",
// 				`comment=${compressedMetadata}`,
// 			])
// 			.on("error", (err: Error) => {
// 				console.error("FFmpeg error:", err);
// 				reject(err);
// 			})
// 			.on("end", () => {
// 				resolve();
// 			})
// 			.save(outputPath);
// 	});
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
// import { exec } from "child_process";
// import { promisify } from "util";
import { writeFile, unlink } from "fs/promises";
import ffmpeg from "fluent-ffmpeg";
import axios, { AxiosError, isAxiosError } from "axios";
import { gzipSync } from "zlib";
import { NextRequest } from "next/server";
import RunwayML from "@runwayml/sdk";

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

export const LUMA_API_URL =
	"https://api.lumalabs.ai/dream-machine/v1/generations";
export const ELEVENLABS_API_URL =
	"https://api.elevenlabs.io/v1/sound-generation";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const chatModel = new ChatAnthropic({
	modelName: "claude-3-5-sonnet-20240620",
	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
});

const runwayClient = new RunwayML({
	apiKey: process.env.RUNWAY_API_KEY,
	maxRetries: 2,
	timeout: 60000,
});

export const parseFormData = async (
	request: NextRequest
): Promise<VideoGenerationParams> => {
	const formData = await request.formData();
	const metadata: VideoGenerationParams = {
		model: formData.get("model") as "luma" | "runway",
		prompt: `${formData.get("prompt")}. ${formData.get("camera_motion")}`.trim(),
		aspect_ratio: formData.get("aspect_ratio") as string,
		duration_seconds: Number(formData.get("duration_seconds")),
		loop: formData.get("loop") === "true",
		style: formData.get("style") as string,
		negative_prompt: formData.get("negative_prompt") as string,
		mode: formData.get("mode") as string,
	};

	const imageFile = formData.get("image") as File | null;
	const imageUrl = formData.get("image_url") as string | null;
	const imagePosition = formData.get("image_position") as
		| "first"
		| "last"
		| "both"
		| null;

	if (imageFile || imageUrl) {
		metadata.image = {
			position: imagePosition || "first",
		};

		if (imageFile) {
			metadata.image.buffer = Buffer.from(await imageFile.arrayBuffer());
		} else if (imageUrl) {
			metadata.image.url = imageUrl;
		}
	}

	validateGenerationParams(metadata);
	return metadata;
};

export const parseJsonData = async (
	request: NextRequest
): Promise<VideoGenerationParams> => {
	const jsonData = await request.json();
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

	if (jsonData.image_url) {
		metadata.image = {
			url: jsonData.image_url,
			position: jsonData.image_position || "first",
		};
	}

	validateGenerationParams(metadata);
	return metadata;
};

export const validateGenerationParams = (
	params: VideoGenerationParams
): void => {
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
		const validRatios = [
			"1:1",
			"16:9",
			"4:3",
			"9:16",
			"21:9",
			"3:4",
			"9:21",
		];
		if (!validRatios.includes(aspect_ratio)) {
			throw new Error(
				`Invalid aspect ratio. Must be one of: ${validRatios.join(", ")}`
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
};

const generateRunwayVideo = async (
	params: VideoGenerationParams
): Promise<VideoGenerationResult> => {
	try {
		params.duration_seconds = params.duration_seconds <= 7 ? 5 : 10;

		const placeholderImageUrl =
			"https://placehold.co/1280x768/000000/000000.png";

		let promptImage: RunwayML.ImageToVideoCreateParams["promptImage"] = [
			{
				position: "first",
				uri: placeholderImageUrl,
			},
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
			duration: params.duration_seconds as 5 | 10,
			ratio: convertAspectRatioToRunway(params.aspect_ratio),
			promptText: params.prompt,
			promptImage,
			watermark: false,
		};

		console.log(
			"Runway request params:",
			JSON.stringify(baseParams, null, 2)
		);

		const task = await runwayClient.imageToVideo.create(baseParams);

		let attempts = 0;
		const maxAttempts = 60;
		let videoTask;

		do {
			await new Promise((resolve) => setTimeout(resolve, 5000));
			videoTask = await runwayClient.tasks.retrieve(task.id);
			attempts++;

			if (attempts >= maxAttempts) {
				throw new Error("Generation timed out");
			}
		} while (!["SUCCEEDED", "FAILED"].includes(videoTask.status));

		if (videoTask.status === "FAILED") {
			throw new Error(videoTask.failure || "Unknown error");
		}

		if (!videoTask.output?.[0]) {
			throw new Error("No output URL in successful response");
		}

		return {
			videoUrl: videoTask.output[0],
			generationResponseData: videoTask,
		};
	} catch (error) {
		if (error instanceof RunwayML.APIError) {
			throw new Error(
				`Runway generation failed: ${error.name}: ${error.message}`
			);
		}
		throw error;
	}
};

const generateLumaVideo = async (
	params: VideoGenerationParams
): Promise<VideoGenerationResult> => {
	const requestBody: any = {
		prompt: params.prompt,
		aspect_ratio: params.aspect_ratio,
		loop: params.loop,
	};

	if (params.style) requestBody.style = params.style;
	if (params.negative_prompt)
		requestBody.negative_prompt = params.negative_prompt;

	if (params.image?.url) {
		requestBody.keyframes = {};
		const addKeyframe = (position: "frame0" | "frame1") => {
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
		Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
		"Content-Type": "application/json",
	};

	const response = await axios.post(LUMA_API_URL, requestBody, {
		headers,
		timeout: 30000,
	});

	const maxAttempts = 30;
	const delayMs = 5000;

	for (let i = 0; i < maxAttempts; i++) {
		const statusResponse = await axios.get(
			`${LUMA_API_URL}/${response.data.id}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
				},
				timeout: 10000,
			}
		);

		if (
			statusResponse.data.state === "completed" &&
			statusResponse.data.assets?.video
		) {
			return {
				videoUrl: statusResponse.data.assets.video,
				generationResponseData: statusResponse.data,
			};
		}

		if (statusResponse.data.state === "failed") {
			throw new Error(
				`Luma generation failed: ${statusResponse.data.failure_reason}`
			);
		}

		await new Promise((resolve) => setTimeout(resolve, delayMs));
	}

	throw new Error("Luma generation timed out");
};

export const generateVideo = async (
	params: VideoGenerationParams
): Promise<VideoGenerationResult> => {
	validateGenerationParams(params);
	return params.model === "runway"
		? generateRunwayVideo(params)
		: generateLumaVideo(params);
};

export const analyzeVideoWithGemini = async (
	videoUrl: string,
	duration_seconds: number,
	retries = 3
): Promise<VideoAnalysisResult> => {
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const videoResponse = await axios.get(videoUrl, {
				responseType: "arraybuffer",
				maxContentLength: 50 * 1024 * 1024, // 50MB limit
				timeout: 30000,
			});

			const videoBase64 = Buffer.from(videoResponse.data).toString(
				"base64"
			);

			const payload = {
				contents: [
					{
						parts: [
							{
								text: `Analyze this ${duration_seconds}-second video and provide a detailed description of the visual content, focusing on key events, scene changes, and notable elements. Break down your analysis into ${Math.ceil(
									duration_seconds / 20
								)} segments, each covering up to 20 seconds of the video. For each segment, include timestamps for significant events.`,
							},
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

			const response = await axios.post(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${process.env.GOOGLE_API_KEY}`,
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						"Accept-Encoding": "gzip, deflate",
					},
					maxContentLength: Infinity,
					maxBodyLength: Infinity,
					decompress: true,
				}
			);

			if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
				throw new Error("Invalid response format from Gemini API");
			}

			const analysisText =
				response.data.candidates[0].content.parts[0].text;
			const segments = analysisText
				.split(/Segment \d+:/g)
				.filter(Boolean)
				.map((segment: string) => segment.trim());

			return { segments, analysisText, responseData: response.data };
		} catch (error) {
			console.error(`Analysis attempt ${attempt + 1} failed:`, error);

			if (attempt === retries - 1) {
				return {
					segments: fallbackVideoAnalysis(duration_seconds),
					analysisText: null,
					responseData: null,
				};
			}

			await new Promise((resolve) =>
				setTimeout(resolve, 2000 * (attempt + 1))
			);
		}
	}

	throw new Error("Unexpected error in video analysis");
};

export const fallbackVideoAnalysis = (duration_seconds: number): string[] => {
	const segmentCount = Math.ceil(duration_seconds / 20);
	return Array.from({ length: segmentCount }, (_, i) => {
		const start = i * 20;
		const end = Math.min((i + 1) * 20, duration_seconds);
		return `Video segment from ${start}s to ${end}s. This segment likely contains visual content related to the overall theme of the video.`;
	});
};

export const adjustTimeReferences = (
	segment: string,
	segmentIndex: number
): string => {
	const timeRegex = /At (\d+)s/g;
	return segment.replace(timeRegex, (match, seconds) => {
		const adjustedSeconds = (parseInt(seconds) - segmentIndex * 20) % 20;
		return `At ${adjustedSeconds}s`;
	});
};

export const generateAudioSegments = async (
	segments: string[],
	totalDuration: number
): Promise<Buffer[]> => {
	const audioSegments: Buffer[] = [];
	let remainingDuration = totalDuration;

	for (let i = 0; i < segments.length; i++) {
		const segmentDuration = Math.min(remainingDuration, 20);
		const adjustedSegment = adjustTimeReferences(segments[i], i);
		const { summary } = await summarizeWithClaude(
			adjustedSegment,
			segmentDuration
		);

		const audioPrompt = Array.isArray(summary)
			? summary
					.map((s) => (typeof s === "string" ? s : JSON.stringify(s)))
					.join(" ")
			: String(summary);

		const audioBuffer = await generateAudioSegment(
			audioPrompt,
			segmentDuration
		);
		audioSegments.push(audioBuffer);
		remainingDuration -= segmentDuration;
	}

	return audioSegments;
};

export const summarizeWithClaude = async (
	description: string,
	segmentDuration: number
): Promise<{ summary: string; response: any }> => {
	const maxCharacters = 450;
	try {
		const response = await chatModel.invoke([
			new HumanMessage(
				`Create a sound effect description for this ${segmentDuration}-second video segment. Describe key sounds, their timing, and ambient noise. Focus on creating an immersive audio experience. Keep it under ${maxCharacters} characters:\n\n${description}`
			),
		]);

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

		return { summary, response };
	} catch (error) {
		console.error("Error in summarization:", error);
		throw error;
	}
};

export const generateAudioSegment = async (
	prompt: string,
	duration: number
): Promise<Buffer> => {
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

		return Buffer.from(response.data);
	} catch (error) {
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
	outputPath: string
): Promise<void> => {
	const tempPaths: string[] = [];
	const concatFilePath = "/tmp/concat.txt";

	try {
		// Write each audio segment to a temporary file
		for (let index = 0; index < audioSegments.length; index++) {
			const tempPath = `/tmp/audio_${index}.mp3`;
			await writeFile(tempPath, audioSegments[index]);
			tempPaths.push(tempPath);
		}

		// Create concatenation file with absolute paths
		const concatContent = tempPaths
			.map((path) => `file '${path}'`)
			.join("\n");
		await writeFile(concatFilePath, concatContent);

		// Use simpler ffmpeg command
		return new Promise<void>((resolve, reject) => {
			ffmpeg()
				.input(concatFilePath)
				.inputOptions(["-f", "concat", "-safe", "0"])
				.output(outputPath)
				.outputOptions(["-c", "copy"])
				.on("error", async (err) => {
					console.error("FFmpeg error:", err);
					await cleanup();
					reject(err);
				})
				.on("end", async () => {
					await cleanup();
					resolve();
				})
				.run();
		});
	} catch (err) {
		await cleanup();
		throw err;
	}

	async function cleanup() {
		try {
			await Promise.all([
				...tempPaths.map((path) => unlink(path).catch(console.error)),
				unlink(concatFilePath).catch(console.error),
			]);
		} catch (error) {
			console.error("Cleanup error:", error);
		}
	}
};

export const combineVideoAndAudio = async (
	videoPath: string,
	audioPath: string,
	outputPath: string,
	metadata: unknown
): Promise<void> => {
	const metadataString = JSON.stringify(metadata);
	const compressedMetadata = gzipSync(metadataString).toString("base64");

	return new Promise<void>((resolve, reject) => {
		ffmpeg()
			.input(videoPath)
			.input(audioPath)
			.outputOptions([
				"-c:v",
				"copy",
				"-c:a",
				"aac",
				"-shortest",
				"-metadata",
				`comment=${compressedMetadata}`,
			])
			.on("error", (err: Error) => {
				console.error("FFmpeg error:", err);
				reject(err);
			})
			.on("end", () => {
				resolve();
			})
			.save(outputPath);
	});
};
