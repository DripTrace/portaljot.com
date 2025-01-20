// import { IMAGE_POSITION } from "@/types/modify/luma";
// import {
// 	VIDEO_MODEL,
// 	VideoGenerationParams,
// 	VideoGenerationResult,
// } from "@/types/modify/vidgen";
// import { NextRequest } from "next/server";
// import { ASPECT_RATIO, VALID_RATIOS } from "../constants/luma";
// import { VIDGEN_MODELS } from "../constants/vidgen";
// import { generateRunwayVideo } from "./runwayml";
// import { generateLumaVideo } from "./luma";
// import { unlink, writeFile } from "fs/promises";
// import Ffmpeg from "fluent-ffmpeg";
// import { gzipSync } from "zlib";
// import { summarizeWithClaude } from "./claude";
// import { generateAudioSegment } from "./elevenlabs";
// // import { validateGenerationParams } from "../modify/generate-bk";

// export const validateGenerationParams = (
// 	params: VideoGenerationParams
// ): void => {
// 	const { model, prompt, aspect_ratio, duration_seconds } = params;

// 	if (!model || !VIDGEN_MODELS.includes(model)) {
// 		throw new Error("Invalid model specified. Must be 'luma' or 'runway'");
// 	}

// 	if (!prompt?.trim()) {
// 		throw new Error("Prompt is required");
// 	}

// 	if (!aspect_ratio) {
// 		throw new Error("Aspect ratio is required");
// 	}

// 	if (model === "runway") {
// 		if (!VALID_RATIOS.includes(aspect_ratio)) {
// 			throw new Error(
// 				`Runway only supports these aspect ratios: ${VALID_RATIOS.join(", ")}`
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
// };

// export const parseFormData = async (
// 	request: NextRequest
// ): Promise<VideoGenerationParams> => {
// 	const formData = await request.formData();
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
// 	const imageFile = formData.get("image") as File | null;
// 	const imageUrl = formData.get("image_url") as string | null;
// 	const imagePosition = formData.get(
// 		"image_position"
// 	) as IMAGE_POSITION | null;

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
// 		prompt: `${jsonData.prompt}. ${jsonData.camera_motion}`.trim(),
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

// export const generateVideo = async (
// 	params: VideoGenerationParams
// ): Promise<VideoGenerationResult> => {
// 	validateGenerationParams(params);
// 	return params.model === "runway"
// 		? generateRunwayVideo(params)
// 		: generateLumaVideo(params);
// };

// export const fallbackVideoAnalysis = (duration_seconds: number): string[] => {
// 	const segmentCount = Math.ceil(duration_seconds / 20);
// 	return Array.from({ length: segmentCount }, (_, i) => {
// 		const start = i * 20;
// 		const end = Math.min((i + 1) * 20, duration_seconds);
// 		return `Video segment from ${start}s to ${end}s. This segment likely contains visual content related to the overall theme of the video.`;
// 	});
// };

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
// 		const concatContent = tempPaths
// 			.map((path) => `file '${path}'`)
// 			.join("\n");
// 		await writeFile(concatFilePath, concatContent);

// 		// Use simpler ffmpeg command
// 		return new Promise<void>((resolve, reject) => {
// 			Ffmpeg()
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
// 		Ffmpeg()
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

export {};
