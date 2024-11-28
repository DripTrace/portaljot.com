// // // import { NextRequest, NextResponse } from "next/server";
// // // import axios, { AxiosError } from "axios";
// // // import ffmpeg from "fluent-ffmpeg";
// // // import { writeFile, unlink, readFile } from "fs/promises";
// // // import { join } from "path";
// // // import { randomUUID } from "crypto";
// // // import { GoogleGenerativeAI } from "@google/generative-ai";
// // // import { ChatAnthropic } from "@langchain/anthropic";
// // // import { HumanMessage } from "@langchain/core/messages";
// // // import { exec } from "child_process";
// // // import { promisify } from "util";
// // // import fs from "fs/promises";
// // // import path from "path";

// // // interface TextBlock {
// // // 	type: "text";
// // // 	text: string;
// // // }

// // // const LUMA_API_URL = "https://api.lumalabs.ai/dream-machine/v1/generations";
// // // const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/sound-generation";

// // // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
// // // const chatModel = new ChatAnthropic({
// // // 	modelName: "claude-3-5-sonnet-20240620",
// // // 	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
// // // });

// // // const execAsync = promisify(exec);

// // // async function waitForVideoGeneration(generationId: string) {
// // // 	const maxAttempts = 30;
// // // 	const delayMs = 5000;

// // // 	for (let i = 0; i < maxAttempts; i++) {
// // // 		console.log(`Waiting for video generation, attempt ${i + 1}`);
// // // 		const response = await axios.get(`${LUMA_API_URL}/${generationId}`, {
// // // 			headers: {
// // // 				Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// // // 			},
// // // 		});

// // // 		console.log(`Video generation status:`, response.data.state);

// // // 		if (
// // // 			response.data.state === "completed" &&
// // // 			response.data.assets?.video
// // // 		) {
// // // 			console.log("Video generation completed");
// // // 			return response.data.assets.video;
// // // 		}

// // // 		if (response.data.state === "failed") {
// // // 			console.error(
// // // 				"Video generation failed:",
// // // 				response.data.failure_reason
// // // 			);
// // // 			throw new Error(
// // // 				`Video generation failed: ${response.data.failure_reason}`
// // // 			);
// // // 		}

// // // 		await new Promise((resolve) => setTimeout(resolve, delayMs));
// // // 	}

// // // 	console.error("Video generation timed out");
// // // 	throw new Error("Video generation timed out");
// // // }

// // // async function analyzeVideoWithGemini(videoUrl: string, duration: number) {
// // // 	console.log("Starting video analysis with Gemini");
// // // 	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // // 	const tempDir = "/tmp";
// // // 	const videoPath = path.join(tempDir, `${randomUUID()}.mp4`);
// // // 	const framesDir = path.join(tempDir, `frames_${randomUUID()}`);

// // // 	try {
// // // 		// Download the video
// // // 		const videoResponse = await axios.get(videoUrl, {
// // // 			responseType: "arraybuffer",
// // // 		});
// // // 		await fs.writeFile(videoPath, Buffer.from(videoResponse.data));

// // // 		// Create frames directory
// // // 		await fs.mkdir(framesDir, { recursive: true });

// // // 		// Extract frames (1 frame per second)
// // // 		await execAsync(
// // // 			`ffmpeg -i ${videoPath} -vf fps=1 ${path.join(framesDir, "frame%d.jpg")}`
// // // 		);

// // // 		// Read and encode frames
// // // 		const frameFiles = await fs.readdir(framesDir);
// // // 		const encodedFrames = await Promise.all(
// // // 			frameFiles.map(async (file) => {
// // // 				const framePath = path.join(framesDir, file);
// // // 				const frameData = await fs.readFile(framePath);
// // // 				return {
// // // 					inlineData: {
// // // 						mimeType: "image/jpeg",
// // // 						data: frameData.toString("base64"),
// // // 					},
// // // 				};
// // // 			})
// // // 		);

// // // 		const segmentCount = Math.ceil(duration / 20);
// // // 		const prompt = `Analyze these ${frameFiles.length} video frames and provide a detailed description of events happening at specific times.
// // // 		Break down your analysis into ${segmentCount} segments of up to 20 seconds each, with the last segment potentially being shorter.
// // // 		For each segment, describe what's happening at specific second marks (e.g., "At 4s, X happens").
// // // 		Ensure your descriptions are accurate to the second and cover the entire duration of the video (${duration} seconds).`;

// // // 		console.log("Sending prompt to Gemini:", prompt);
// // // 		const result = await model.generateContent([prompt, ...encodedFrames]);
// // // 		const response = await result.response;
// // // 		const text = response.text();
// // // 		console.log("Received analysis from Gemini:", text);

// // // 		const segments = text
// // // 			.split(/Segment \d+:/g)
// // // 			.filter(Boolean)
// // // 			.map((s) => s.trim());
// // // 		console.log(
// // // 			`Extracted ${segments.length} segments from Gemini analysis`
// // // 		);
// // // 		return segments;
// // // 	} catch (error) {
// // // 		console.error("Error in video analysis:", error);
// // // 		throw error;
// // // 	} finally {
// // // 		// Clean up temporary files
// // // 		await fs.rm(videoPath, { force: true });
// // // 		await fs.rm(framesDir, { recursive: true, force: true });
// // // 	}
// // // }

// // // function adjustTimeReferences(segment: string, segmentIndex: number): string {
// // // 	const timeRegex = /At (\d+)s/g;
// // // 	return segment.replace(timeRegex, (match, seconds) => {
// // // 		const adjustedSeconds = (parseInt(seconds) - segmentIndex * 20) % 20;
// // // 		return `At ${adjustedSeconds}s`;
// // // 	});
// // // }

// // // async function summarizeWithClaude(
// // // 	description: string,
// // // 	segmentDuration: number
// // // ) {
// // // 	console.log(
// // // 		"Starting summarization with Claude for sound effect generation"
// // // 	);
// // // 	const maxCharacters = 450;
// // // 	try {
// // // 		const response = await chatModel.invoke([
// // // 			new HumanMessage(
// // // 				`Create a sound effect description for this ${segmentDuration}-second video segment. Describe key sounds, their timing, and ambient noise. Focus on creating an immersive audio experience. Keep it under ${maxCharacters} characters:\n\n${description}`
// // // 			),
// // // 		]);

// // // 		let summary = response.content;

// // // 		if (typeof summary === "string" && summary.length > maxCharacters) {
// // // 			summary = summary.slice(0, maxCharacters - 3) + "...";
// // // 		}

// // // 		console.log("Received sound effect description from Claude:", summary);
// // // 		console.log("Description character count:", summary.length);
// // // 		return summary;
// // // 	} catch (error) {
// // // 		console.error("Error in Claude summarization for sound effect:", error);
// // // 		throw error;
// // // 	}
// // // }

// // // async function generateAudioSegment(prompt: string, duration: number) {
// // // 	console.log(
// // // 		`Generating sound effect with prompt: ${prompt}, duration: ${duration}s`
// // // 	);
// // // 	console.log("Prompt character count:", prompt.length);

// // // 	// Ensure duration is at least 0.5 seconds
// // // 	const adjustedDuration = Math.max(duration, 0.5);

// // // 	try {
// // // 		const response = await axios.post(
// // // 			ELEVENLABS_API_URL,
// // // 			{
// // // 				text: prompt,
// // // 				duration_seconds: adjustedDuration,
// // // 				prompt_influence: 0.5, // You can adjust this value between 0 and 1
// // // 			},
// // // 			{
// // // 				headers: {
// // // 					"xi-api-key": process.env.ELEVENLABS_API_KEY,
// // // 					"Content-Type": "application/json",
// // // 				},
// // // 				responseType: "arraybuffer",
// // // 			}
// // // 		);

// // // 		console.log("Sound effect generated successfully");
// // // 		return Buffer.from(response.data);
// // // 	} catch (error) {
// // // 		if (axios.isAxiosError(error)) {
// // // 			const axiosError = error as AxiosError;
// // // 			console.error(
// // // 				"Error generating sound effect:",
// // // 				axiosError.response?.data
// // // 					? JSON.parse(
// // // 							Buffer.from(
// // // 								axiosError.response.data as ArrayBuffer
// // // 							).toString()
// // // 						)
// // // 					: axiosError.message
// // // 			);
// // // 		} else {
// // // 			console.error(
// // // 				"Error generating sound effect:",
// // // 				(error as Error).message
// // // 			);
// // // 		}
// // // 		throw error;
// // // 	}
// // // }

// // // async function combineAudioSegments(
// // // 	audioSegments: Buffer[],
// // // 	outputPath: string
// // // ) {
// // // 	console.log("Combining audio segments");
// // // 	return new Promise<void>((resolve, reject) => {
// // // 		const command = ffmpeg();
// // // 		audioSegments.forEach((segment, index) => {
// // // 			const tempPath = `/tmp/segment_${index}.mp3`;
// // // 			writeFile(tempPath, segment);
// // // 			command.input(tempPath);
// // // 		});

// // // 		command
// // // 			.on("error", (err) => {
// // // 				console.error("Error combining audio segments:", err);
// // // 				reject(err);
// // // 			})
// // // 			.on("end", () => {
// // // 				console.log("Audio segments combined successfully");
// // // 				resolve();
// // // 			})
// // // 			.mergeToFile(outputPath, "/tmp");
// // // 	});
// // // }

// // // async function combineVideoAndAudio(
// // // 	videoPath: string,
// // // 	audioPath: string,
// // // 	outputPath: string
// // // ) {
// // // 	console.log("Combining video and audio");
// // // 	return new Promise<void>((resolve, reject) => {
// // // 		ffmpeg()
// // // 			.input(videoPath)
// // // 			.input(audioPath)
// // // 			.outputOptions("-c:v copy")
// // // 			.outputOptions("-c:a aac")
// // // 			.outputOptions("-shortest")
// // // 			.on("error", (err) => {
// // // 				console.error("Error combining video and audio:", err);
// // // 				reject(err);
// // // 			})
// // // 			.on("end", () => {
// // // 				console.log("Video and audio combined successfully");
// // // 				resolve();
// // // 			})
// // // 			.save(outputPath);
// // // 	});
// // // }

// // // export async function POST(request: NextRequest) {
// // // 	try {
// // // 		const { prompt, aspect_ratio, duration_seconds, loop } =
// // // 			await request.json();

// // // 		const initialVideoResponse = await axios.post(
// // // 			LUMA_API_URL,
// // // 			{ prompt, aspect_ratio, loop },
// // // 			{
// // // 				headers: {
// // // 					Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// // // 					"Content-Type": "application/json",
// // // 				},
// // // 			}
// // // 		);

// // // 		console.log(
// // // 			"Initial Video Response:",
// // // 			JSON.stringify(initialVideoResponse.data, null, 2)
// // // 		);

// // // 		let videoUrl = await waitForVideoGeneration(
// // // 			initialVideoResponse.data.id
// // // 		);
// // // 		let lastGenerationId = initialVideoResponse.data.id;

// // // 		if (duration_seconds > 4) {
// // // 			const numExtensions = Math.ceil(duration_seconds / 4) - 1;
// // // 			for (let i = 0; i < numExtensions; i++) {
// // // 				const extendResponse = await axios.post(
// // // 					LUMA_API_URL,
// // // 					{
// // // 						prompt,
// // // 						aspect_ratio,
// // // 						keyframes: {
// // // 							frame0: {
// // // 								type: "generation",
// // // 								id: lastGenerationId,
// // // 							},
// // // 						},
// // // 					},
// // // 					{
// // // 						headers: {
// // // 							Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// // // 							"Content-Type": "application/json",
// // // 						},
// // // 					}
// // // 				);
// // // 				videoUrl = await waitForVideoGeneration(extendResponse.data.id);
// // // 				lastGenerationId = extendResponse.data.id;
// // // 			}
// // // 		}

// // // 		console.log("Video generation completed, starting analysis");
// // // 		const videoSegments = await analyzeVideoWithGemini(
// // // 			videoUrl,
// // // 			duration_seconds
// // // 		);

// // // 		console.log("Video analysis completed, generating audio segments");
// // // 		const audioSegments = [];
// // // 		let remainingDuration = duration_seconds;
// // // 		for (let i = 0; i < videoSegments.length; i++) {
// // // 			const segmentDuration = Math.min(remainingDuration, 20);
// // // 			const adjustedSegment = adjustTimeReferences(videoSegments[i], i);
// // // 			const summary = await summarizeWithClaude(
// // // 				adjustedSegment,
// // // 				segmentDuration
// // // 			);
// // // 			const audioBuffer = await generateAudioSegment(
// // // 				Array.isArray(summary)
// // // 					? summary
// // // 							.map((s) =>
// // // 								typeof s === "string" ? s : JSON.stringify(s)
// // // 							)
// // // 							.join(" ")
// // // 					: String(summary),
// // // 				segmentDuration
// // // 			);
// // // 			audioSegments.push(audioBuffer);
// // // 			remainingDuration -= segmentDuration;
// // // 		}

// // // 		const tempDir = "/tmp";
// // // 		const videoPath = join(tempDir, `${randomUUID()}.mp4`);
// // // 		const combinedAudioPath = join(
// // // 			tempDir,
// // // 			`${randomUUID()}_combined_audio.mp3`
// // // 		);
// // // 		const outputPath = join(tempDir, `${randomUUID()}_output.mp4`);

// // // 		console.log("Downloading generated video");
// // // 		await writeFile(
// // // 			videoPath,
// // // 			Buffer.from(
// // // 				await axios
// // // 					.get(videoUrl, { responseType: "arraybuffer" })
// // // 					.then((res) => res.data)
// // // 			)
// // // 		);

// // // 		console.log("Combining audio segments");
// // // 		await combineAudioSegments(audioSegments, combinedAudioPath);

// // // 		console.log("Combining video and audio");
// // // 		await combineVideoAndAudio(videoPath, combinedAudioPath, outputPath);

// // // 		console.log("Reading final video file");
// // // 		const videoBuffer = await readFile(outputPath);

// // // 		console.log("Cleaning up temporary files");
// // // 		await Promise.all([
// // // 			unlink(videoPath),
// // // 			unlink(combinedAudioPath),
// // // 			unlink(outputPath),
// // // 		]);

// // // 		console.log("Sending response");
// // // 		return new NextResponse(videoBuffer, {
// // // 			headers: {
// // // 				"Content-Type": "video/mp4",
// // // 				"Content-Disposition": `attachment; filename="generated_video.mp4"`,
// // // 			},
// // // 		});
// // // 	} catch (error) {
// // // 		console.error("Error in video generation:", error);
// // // 		return new NextResponse(
// // // 			JSON.stringify({ error: "Video generation failed" }),
// // // 			{
// // // 				status: 500,
// // // 				headers: { "Content-Type": "application/json" },
// // // 			}
// // // 		);
// // // 	}
// // // }
// // // app/api/generate-video-with-audio/route.ts

// // import { NextRequest, NextResponse } from "next/server";
// // import axios from "axios";
// // import { writeFile, unlink, readFile } from "fs/promises";
// // import { join } from "path";
// // import { randomUUID } from "crypto";
// // import {
// // 	adjustTimeReferences,
// // 	analyzeVideoWithGemini,
// // 	combineAudioSegments,
// // 	combineVideoAndAudio,
// // 	fallbackVideoAnalysis,
// // 	generateAudioSegment,
// // 	LUMA_API_URL,
// // 	summarizeWithClaude,
// // 	waitForVideoGeneration,
// // } from "@/lib/modify/generate";

// // export async function POST(request: NextRequest) {
// // 	try {
// // 		const { prompt, aspect_ratio, duration_seconds, loop } =
// // 			await request.json();

// // 		const initialVideoResponse = await axios.post(
// // 			LUMA_API_URL,
// // 			{ prompt, aspect_ratio, loop },
// // 			{
// // 				headers: {
// // 					Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// // 					"Content-Type": "application/json",
// // 				},
// // 			}
// // 		);

// // 		console.log(
// // 			"Initial Video Response:",
// // 			JSON.stringify(initialVideoResponse.data, null, 2)
// // 		);

// // 		let videoUrl = await waitForVideoGeneration(
// // 			initialVideoResponse.data.id
// // 		);
// // 		let lastGenerationId = initialVideoResponse.data.id;

// // 		if (duration_seconds > 4) {
// // 			const numExtensions = Math.ceil(duration_seconds / 4) - 1;
// // 			for (let i = 0; i < numExtensions; i++) {
// // 				const extendResponse = await axios.post(
// // 					LUMA_API_URL,
// // 					{
// // 						prompt,
// // 						aspect_ratio,
// // 						keyframes: {
// // 							frame0: {
// // 								type: "generation",
// // 								id: lastGenerationId,
// // 							},
// // 						},
// // 					},
// // 					{
// // 						headers: {
// // 							Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// // 							"Content-Type": "application/json",
// // 						},
// // 					}
// // 				);
// // 				videoUrl = await waitForVideoGeneration(extendResponse.data.id);
// // 				lastGenerationId = extendResponse.data.id;
// // 			}
// // 		}

// // 		console.log("Video generation completed, starting analysis");
// // 		let videoSegments;
// // 		try {
// // 			videoSegments = await analyzeVideoWithGemini(
// // 				videoUrl,
// // 				duration_seconds
// // 			);
// // 		} catch (error) {
// // 			console.error("Error in video analysis:", error);
// // 			videoSegments = fallbackVideoAnalysis(duration_seconds);
// // 		}

// // 		console.log(`Extracted ${videoSegments.length} segments from analysis`);

// // 		console.log("Video analysis completed, generating audio segments");
// // 		const audioSegments = [];
// // 		let remainingDuration = duration_seconds;
// // 		for (let i = 0; i < videoSegments.length; i++) {
// // 			const segmentDuration = Math.min(remainingDuration, 20);
// // 			const adjustedSegment = adjustTimeReferences(videoSegments[i], i);
// // 			const summary = await summarizeWithClaude(
// // 				adjustedSegment,
// // 				segmentDuration
// // 			);
// // 			const audioBuffer = await generateAudioSegment(
// // 				Array.isArray(summary)
// // 					? summary
// // 							.map((s) =>
// // 								typeof s === "string" ? s : JSON.stringify(s)
// // 							)
// // 							.join(" ")
// // 					: String(summary),
// // 				segmentDuration
// // 			);
// // 			audioSegments.push(audioBuffer);
// // 			remainingDuration -= segmentDuration;
// // 		}

// // 		const tempDir = "/tmp";
// // 		const videoPath = join(tempDir, `${randomUUID()}.mp4`);
// // 		const combinedAudioPath = join(
// // 			tempDir,
// // 			`${randomUUID()}_combined_audio.mp3`
// // 		);
// // 		const outputPath = join(tempDir, `${randomUUID()}_output.mp4`);

// // 		console.log("Downloading generated video");
// // 		await writeFile(
// // 			videoPath,
// // 			Buffer.from(
// // 				await axios
// // 					.get(videoUrl, { responseType: "arraybuffer" })
// // 					.then((res) => res.data)
// // 			)
// // 		);

// // 		console.log("Combining audio segments");
// // 		await combineAudioSegments(audioSegments, combinedAudioPath);

// // 		console.log("Combining video and audio");
// // 		await combineVideoAndAudio(videoPath, combinedAudioPath, outputPath);

// // 		console.log("Reading final video file");
// // 		const videoBuffer = await readFile(outputPath);

// // 		console.log("Cleaning up temporary files");
// // 		await Promise.all([
// // 			unlink(videoPath),
// // 			unlink(combinedAudioPath),
// // 			unlink(outputPath),
// // 		]);

// // 		console.log("Sending response");
// // 		return new NextResponse(videoBuffer, {
// // 			headers: {
// // 				"Content-Type": "video/mp4",
// // 				"Content-Disposition": `attachment; filename="generated_video.mp4"`,
// // 			},
// // 		});
// // 	} catch (error) {
// // 		console.error("Error in video generation:", error);
// // 		return new NextResponse(
// // 			JSON.stringify({ error: "Video generation failed" }),
// // 			{
// // 				status: 500,
// // 				headers: { "Content-Type": "application/json" },
// // 			}
// // 		);
// // 	}
// // }

// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";
// import { writeFile, unlink, readFile } from "fs/promises";
// import { join } from "path";
// import { randomUUID } from "crypto";
// import {
// 	adjustTimeReferences,
// 	analyzeVideoWithGemini,
// 	combineAudioSegments,
// 	combineVideoAndAudio,
// 	fallbackVideoAnalysis,
// 	generateAudioSegment,
// 	LUMA_API_URL,
// 	summarizeWithClaude,
// 	waitForVideoGeneration,
// } from "@/lib/modify/generate";

// export async function POST(request: NextRequest) {
// 	try {
// 		const metadata: any = {};

// 		const { prompt, aspect_ratio, duration_seconds, loop } =
// 			await request.json();

// 		metadata.prompt = prompt;
// 		metadata.aspect_ratio = aspect_ratio;
// 		metadata.duration_seconds = duration_seconds;
// 		metadata.loop = loop;

// 		const initialVideoResponse = await axios.post(
// 			LUMA_API_URL,
// 			{ prompt, aspect_ratio, loop },
// 			{
// 				headers: {
// 					Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);

// 		metadata.initialVideoResponse = initialVideoResponse.data;

// 		console.log(
// 			"Initial Video Response:",
// 			JSON.stringify(initialVideoResponse.data, null, 2)
// 		);

// 		let videoUrlResult = await waitForVideoGeneration(
// 			initialVideoResponse.data.id
// 		);
// 		let videoUrl = videoUrlResult.videoUrl;
// 		let lastGenerationId = initialVideoResponse.data.id;

// 		metadata.initialGenerationResponse =
// 			videoUrlResult.generationResponseData;

// 		if (duration_seconds > 4) {
// 			const numExtensions = Math.ceil(duration_seconds / 4) - 1;
// 			const extensionResponses = [];
// 			const extensionGenerationResponses = [];

// 			for (let i = 0; i < numExtensions; i++) {
// 				const extendResponse = await axios.post(
// 					LUMA_API_URL,
// 					{
// 						prompt,
// 						aspect_ratio,
// 						keyframes: {
// 							frame0: {
// 								type: "generation",
// 								id: lastGenerationId,
// 							},
// 						},
// 					},
// 					{
// 						headers: {
// 							Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// 							"Content-Type": "application/json",
// 						},
// 					}
// 				);

// 				extensionResponses.push(extendResponse.data);

// 				videoUrlResult = await waitForVideoGeneration(
// 					extendResponse.data.id
// 				);
// 				videoUrl = videoUrlResult.videoUrl;
// 				lastGenerationId = extendResponse.data.id;

// 				extensionGenerationResponses.push(
// 					videoUrlResult.generationResponseData
// 				);
// 			}

// 			metadata.extensionResponses = extensionResponses;
// 			metadata.extensionGenerationResponses =
// 				extensionGenerationResponses;
// 		}

// 		console.log("Video generation completed, starting analysis");

// 		let videoSegments: string[];
// 		try {
// 			const analysisResult = await analyzeVideoWithGemini(
// 				videoUrl,
// 				duration_seconds
// 			);
// 			videoSegments = analysisResult.segments;
// 			metadata.geminiAnalysisText = analysisResult.analysisText;
// 			metadata.geminiResponseData = analysisResult.responseData;
// 		} catch (error) {
// 			console.error("Error in video analysis:", error);
// 			videoSegments = fallbackVideoAnalysis(duration_seconds);
// 			metadata.videoAnalysisError =
// 				error instanceof Error ? error.message : String(error);
// 		}

// 		metadata.videoSegments = videoSegments;

// 		console.log(`Extracted ${videoSegments.length} segments from analysis`);

// 		console.log("Video analysis completed, generating audio segments");
// 		const audioSegments = [];
// 		const summaries = [];
// 		const summarizeResponses = [];
// 		const audioPrompts = [];
// 		let remainingDuration = duration_seconds;
// 		for (let i = 0; i < videoSegments.length; i++) {
// 			const segmentDuration = Math.min(remainingDuration, 20);
// 			const adjustedSegment = adjustTimeReferences(videoSegments[i], i);
// 			const { summary, response } = await summarizeWithClaude(
// 				adjustedSegment,
// 				segmentDuration
// 			);
// 			summaries.push(summary);
// 			summarizeResponses.push(response);

// 			const audioPrompt = Array.isArray(summary)
// 				? summary
// 						.map((s) =>
// 							typeof s === "string" ? s : JSON.stringify(s)
// 						)
// 						.join(" ")
// 				: String(summary);

// 			audioPrompts.push(audioPrompt);

// 			const audioBuffer = await generateAudioSegment(
// 				audioPrompt,
// 				segmentDuration
// 			);
// 			audioSegments.push(audioBuffer);
// 			remainingDuration -= segmentDuration;
// 		}

// 		metadata.summaries = summaries;
// 		metadata.summarizeResponses = summarizeResponses;
// 		metadata.audioPrompts = audioPrompts;

// 		const tempDir = "/tmp";
// 		const videoPath = join(tempDir, `${randomUUID()}.mp4`);
// 		const combinedAudioPath = join(
// 			tempDir,
// 			`${randomUUID()}_combined_audio.mp3`
// 		);
// 		const outputPath = join(tempDir, `${randomUUID()}_output.mp4`);

// 		console.log("Downloading generated video");
// 		await writeFile(
// 			videoPath,
// 			Buffer.from(
// 				await axios
// 					.get(videoUrl, { responseType: "arraybuffer" })
// 					.then((res) => res.data)
// 			)
// 		);

// 		console.log("Combining audio segments");
// 		await combineAudioSegments(audioSegments, combinedAudioPath);

// 		console.log("Combining video and audio");
// 		await combineVideoAndAudio(
// 			videoPath,
// 			combinedAudioPath,
// 			outputPath,
// 			metadata
// 		);

// 		console.log("Reading final video file");
// 		const videoBuffer = await readFile(outputPath);

// 		console.log("Cleaning up temporary files");
// 		await Promise.all([
// 			unlink(videoPath),
// 			unlink(combinedAudioPath),
// 			unlink(outputPath),
// 		]);

// 		console.log("Sending response");
// 		return new NextResponse(videoBuffer, {
// 			headers: {
// 				"Content-Type": "video/mp4",
// 				"Content-Disposition": `attachment; filename="generated_video.mp4"`,
// 			},
// 		});
// 	} catch (error) {
// 		console.error("Error in video generation:", error);
// 		return new NextResponse(
// 			JSON.stringify({ error: "Video generation failed" }),
// 			{
// 				status: 500,
// 				headers: { "Content-Type": "application/json" },
// 			}
// 		);
// 	}
// }

import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { randomUUID } from "crypto";
import {
	generateVideo,
	analyzeVideoWithGemini,
	generateAudioSegments,
	combineAudioSegments,
	combineVideoAndAudio,
	parseFormData,
	parseJsonData,
	VideoGenerationParams,
} from "@/lib/modify/generate";
import { writeFile, unlink, readFile } from "fs/promises";
import axios from "axios";

export async function POST(request: NextRequest) {
	try {
		const metadata = request.headers
			.get("content-type")
			?.includes("multipart/form-data")
			? await parseFormData(request)
			: await parseJsonData(request);

		console.log("Starting video generation with params:", {
			...metadata,
			image: metadata.image ? "present" : "not present",
		});

		const videoResult = await generateVideo(metadata);
		const analysisResult = await analyzeVideoWithGemini(
			videoResult.videoUrl,
			metadata.duration_seconds
		);

		const audioSegments = await generateAudioSegments(
			analysisResult.segments,
			metadata.duration_seconds
		);

		const tempDir = "/tmp";
		const videoPath = join(tempDir, `${randomUUID()}.mp4`);
		const combinedAudioPath = join(tempDir, `${randomUUID()}_audio.mp3`);
		const outputPath = join(tempDir, `${randomUUID()}_final.mp4`);

		console.log("Downloading generated video");
		await writeFile(
			videoPath,
			Buffer.from(
				(
					await axios.get(videoResult.videoUrl, {
						responseType: "arraybuffer",
					})
				).data
			)
		);

		console.log("Combining audio segments");
		await combineAudioSegments(audioSegments, combinedAudioPath);

		console.log("Combining video and audio");
		await combineVideoAndAudio(videoPath, combinedAudioPath, outputPath, {
			...metadata,
			analysisResult,
			generationResponseData: videoResult.generationResponseData,
		});

		console.log("Reading final video file");
		const finalVideo = await readFile(outputPath);

		console.log("Cleaning up temporary files");
		await Promise.all([
			unlink(videoPath).catch(console.error),
			unlink(combinedAudioPath).catch(console.error),
			unlink(outputPath).catch(console.error),
		]);

		return new NextResponse(finalVideo, {
			headers: {
				"Content-Type": "video/mp4",
				"Content-Disposition": `attachment; filename="generated_video.mp4"`,
			},
		});
	} catch (error) {
		console.error("Error in video generation:", error);
		return new NextResponse(
			JSON.stringify({
				error: "Video generation failed",
				details: error instanceof Error ? error.message : String(error),
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
