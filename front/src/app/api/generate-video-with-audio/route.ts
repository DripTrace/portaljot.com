// import { NextRequest, NextResponse } from "next/server";
// import { join } from "path";
// import { randomUUID } from "crypto";
// import {
// 	generateVideo,
// 	analyzeVideoWithGemini,
// 	generateAudioSegments,
// 	combineAudioSegments,
// 	combineVideoAndAudio,
// 	parseFormData,
// 	parseJsonData,
// } from "@/lib/modify/generate";
// import { writeFile, unlink, readFile } from "fs/promises";
// import axios from "axios";

// export async function POST(request: NextRequest) {
// 	const requestId = randomUUID();
// 	console.log(`[${requestId}] Starting new video generation request`);

// 	try {
// 		console.log(`[${requestId}] Determining request content type`);
// 		const contentType = request.headers.get("content-type");
// 		const isFormData = contentType?.includes("multipart/form-data");
// 		console.log(
// 			`[${requestId}] Request type: ${isFormData ? "FormData" : "JSON"}`
// 		);

// 		// Parse request data (FormData or JSON)
// 		const metadata = isFormData
// 			? await parseFormData(request, requestId)
// 			: await parseJsonData(request, requestId);

// 		console.log(`[${requestId}] Request metadata parsed:`, {
// 			model: metadata.model,
// 			promptLength: metadata.prompt?.length,
// 			aspect_ratio: metadata.aspect_ratio,
// 			duration_seconds: metadata.duration_seconds,
// 			hasImage: !!metadata.image,
// 		});

// 		// Generate the video
// 		console.log(`[${requestId}] Starting video generation`);
// 		const videoResult = await generateVideo(metadata, requestId);
// 		console.log(`[${requestId}] Video generated successfully:`, {
// 			videoUrl: videoResult.videoUrl?.substring(0, 50) + "...",
// 			hasGenerationData: !!videoResult.generationResponseData,
// 		});

// 		// Analyze the video
// 		console.log(`[${requestId}] Starting video analysis`);
// 		// Make sure to pass `metadata.prompt` as the third argument
// 		const analysisResult = await analyzeVideoWithGemini(
// 			videoResult.videoUrl,
// 			metadata.duration_seconds,
// 			metadata.prompt, // <--- the original prompt
// 			requestId
// 		);
// 		console.log(`[${requestId}] Video analysis completed:`, {
// 			segmentsCount: analysisResult.segments.length,
// 			hasAnalysisText: !!analysisResult.analysisText,
// 		});

// 		// Generate audio from the analysis segments
// 		console.log(`[${requestId}] Starting audio generation`);
// 		const audioSegments = await generateAudioSegments(
// 			analysisResult.segments,
// 			metadata.duration_seconds,
// 			requestId
// 		);
// 		console.log(`[${requestId}] Audio segments generated:`, {
// 			count: audioSegments.length,
// 			totalSize: audioSegments.reduce(
// 				(acc, segment) => acc + segment.length,
// 				0
// 			),
// 		});

// 		// Prepare temporary file paths
// 		const tempDir = "/tmp";
// 		const videoPath = join(tempDir, `${requestId}_video.mp4`);
// 		const combinedAudioPath = join(tempDir, `${requestId}_audio.mp3`);
// 		const outputPath = join(tempDir, `${requestId}_final.mp4`);

// 		// Download the video
// 		console.log(`[${requestId}] Downloading generated video`);
// 		const videoResponse = await axios.get(videoResult.videoUrl, {
// 			responseType: "arraybuffer",
// 		});
// 		console.log(
// 			`[${requestId}] Video downloaded, size: ${videoResponse.data.length} bytes`
// 		);

// 		await writeFile(videoPath, Buffer.from(videoResponse.data));
// 		console.log(`[${requestId}] Video saved to ${videoPath}`);

// 		// Combine all generated audio segments
// 		console.log(
// 			`[${requestId}] Combining ${audioSegments.length} audio segments`
// 		);
// 		await combineAudioSegments(audioSegments, combinedAudioPath, requestId);
// 		console.log(
// 			`[${requestId}] Audio segments combined to ${combinedAudioPath}`
// 		);

// 		// Merge video and audio into a final MP4 file
// 		console.log(`[${requestId}] Combining video and audio`);
// 		await combineVideoAndAudio(
// 			videoPath,
// 			combinedAudioPath,
// 			outputPath,
// 			{
// 				metadata,
// 				analysisResult,
// 				generationResponseData: videoResult.generationResponseData,
// 			},
// 			requestId
// 		);
// 		console.log(`[${requestId}] Video and audio combined to ${outputPath}`);

// 		// Read the final file back from disk
// 		console.log(`[${requestId}] Reading final video file`);
// 		const finalVideo = await readFile(outputPath);
// 		console.log(
// 			`[${requestId}] Final video size: ${finalVideo.length} bytes`
// 		);

// 		// Cleanup
// 		console.log(`[${requestId}] Starting cleanup of temporary files`);
// 		await Promise.all([
// 			unlink(videoPath).catch((err) =>
// 				console.error(`[${requestId}] Cleanup error (video):`, err)
// 			),
// 			unlink(combinedAudioPath).catch((err) =>
// 				console.error(`[${requestId}] Cleanup error (audio):`, err)
// 			),
// 			unlink(outputPath).catch((err) =>
// 				console.error(`[${requestId}] Cleanup error (output):`, err)
// 			),
// 		]);
// 		console.log(`[${requestId}] Cleanup completed`);
// 		console.log(`[${requestId}] Request completed successfully`);

// 		// Return the final MP4 file as the response
// 		return new NextResponse(finalVideo, {
// 			headers: {
// 				"Content-Type": "video/mp4",
// 				"Content-Disposition": `attachment; filename="generated_video.mp4"`,
// 			},
// 		});
// 	} catch (error) {
// 		console.error(`[${requestId}] Error in video generation:`, {
// 			name: error instanceof Error ? error.name : "Unknown",
// 			message: error instanceof Error ? error.message : String(error),
// 			stack: error instanceof Error ? error.stack : undefined,
// 		});

// 		return new NextResponse(
// 			JSON.stringify({
// 				error: "Video generation failed",
// 				details: error instanceof Error ? error.message : String(error),
// 				requestId,
// 			}),
// 			{
// 				status: 500,
// 				headers: { "Content-Type": "application/json" },
// 			}
// 		);
// 	}
// }

/* =============================
   routes/generateVideo/route.ts
   ============================= */

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
} from "@/lib/modify/generate";
import { writeFile, unlink, readFile } from "fs/promises";
import axios from "axios";

export const maxDuration = 5; // Set the maximum duration to 60 seconds
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	const requestId = randomUUID();
	console.log(`[${requestId}] Starting new video generation request`);

	try {
		console.log(`[${requestId}] Determining request content type`);
		const contentType = request.headers.get("content-type");
		const isFormData = contentType?.includes("multipart/form-data");
		console.log(
			`[${requestId}] Request type: ${isFormData ? "FormData" : "JSON"}`
		);

		// Parse request data (FormData or JSON)
		const metadata = isFormData
			? await parseFormData(request, requestId)
			: await parseJsonData(request, requestId);

		console.log(`[${requestId}] Request metadata parsed:`, {
			model: metadata.model,
			promptLength: metadata.prompt?.length,
			aspect_ratio: metadata.aspect_ratio,
			duration_seconds: metadata.duration_seconds,
			hasImage: !!metadata.image,
		});

		// Generate the video
		console.log(`[${requestId}] Starting video generation`);
		const videoResult = await generateVideo(metadata, requestId);
		console.log(`[${requestId}] Video generated successfully:`, {
			videoUrl: videoResult.videoUrl?.substring(0, 50) + "...",
			hasGenerationData: !!videoResult.generationResponseData,
		});

		// Analyze the video
		console.log(`[${requestId}] Starting video analysis`);
		// Make sure to pass `metadata.prompt` as the third argument
		const analysisResult = await analyzeVideoWithGemini(
			videoResult.videoUrl,
			metadata.duration_seconds,
			metadata.prompt, // <--- the original prompt
			requestId
		);
		console.log(`[${requestId}] Video analysis completed:`, {
			segmentsCount: analysisResult.segments.length,
			hasAnalysisText: !!analysisResult.analysisText,
		});

		// Generate audio from the analysis segments
		console.log(`[${requestId}] Starting audio generation`);
		const audioSegments = await generateAudioSegments(
			analysisResult.segments,
			metadata.duration_seconds,
			requestId
		);
		console.log(`[${requestId}] Audio segments generated:`, {
			count: audioSegments.length,
			totalSize: audioSegments.reduce(
				(acc, segment) => acc + segment.length,
				0
			),
		});

		// Prepare temporary file paths
		const tempDir = "/tmp";
		const videoPath = join(tempDir, `${requestId}_video.mp4`);
		const combinedAudioPath = join(tempDir, `${requestId}_audio.mp3`);
		const outputPath = join(tempDir, `${requestId}_final.mp4`);

		// Download the video
		console.log(`[${requestId}] Downloading generated video`);
		const videoResponse = await axios.get(videoResult.videoUrl, {
			responseType: "arraybuffer",
		});
		console.log(
			`[${requestId}] Video downloaded, size: ${videoResponse.data.length} bytes`
		);

		await writeFile(videoPath, Buffer.from(videoResponse.data));
		console.log(`[${requestId}] Video saved to ${videoPath}`);

		// Combine all generated audio segments
		console.log(
			`[${requestId}] Combining ${audioSegments.length} audio segments`
		);
		await combineAudioSegments(audioSegments, combinedAudioPath, requestId);
		console.log(
			`[${requestId}] Audio segments combined to ${combinedAudioPath}`
		);

		// Merge video and audio into a final MP4 file
		console.log(`[${requestId}] Combining video and audio`);
		await combineVideoAndAudio(
			videoPath,
			combinedAudioPath,
			outputPath,
			{
				metadata,
				analysisResult,
				generationResponseData: videoResult.generationResponseData,
			},
			requestId
		);
		console.log(`[${requestId}] Video and audio combined to ${outputPath}`);

		// Read the final file back from disk
		console.log(`[${requestId}] Reading final video file`);
		const finalVideo = await readFile(outputPath);
		console.log(
			`[${requestId}] Final video size: ${finalVideo.length} bytes`
		);

		// Cleanup
		console.log(`[${requestId}] Starting cleanup of temporary files`);
		await Promise.all([
			unlink(videoPath).catch((err) =>
				console.error(`[${requestId}] Cleanup error (video):`, err)
			),
			unlink(combinedAudioPath).catch((err) =>
				console.error(`[${requestId}] Cleanup error (audio):`, err)
			),
			unlink(outputPath).catch((err) =>
				console.error(`[${requestId}] Cleanup error (output):`, err)
			),
		]);
		console.log(`[${requestId}] Cleanup completed`);
		console.log(`[${requestId}] Request completed successfully`);

		// Return the final MP4 file as the response
		return new NextResponse(finalVideo, {
			headers: {
				"Content-Type": "video/mp4",
				"Content-Disposition": `attachment; filename="generated_video.mp4"`,
			},
		});
	} catch (error) {
		console.error(`[${requestId}] Error in video generation:`, {
			name: error instanceof Error ? error.name : "Unknown",
			message: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
		});

		return new NextResponse(
			JSON.stringify({
				error: "Video generation failed",
				details: error instanceof Error ? error.message : String(error),
				requestId,
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
