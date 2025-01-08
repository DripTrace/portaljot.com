// import { NextRequest, NextResponse } from "next/server";
// import {
// 	combineAudioSegments,
// 	combineVideoAndAudio,
// } from "@/lib/modify/generate";
// import { writeFile, readFile, unlink } from "fs/promises";
// import { join } from "path";
// import { randomUUID } from "crypto";
// import axios from "axios";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// export async function POST(request: NextRequest) {
// 	const tempFiles: string[] = [];

// 	try {
// 		const { videoUrl, audioFiles, metadata } = await request.json();

// 		// Create temporary file paths
// 		const videoPath = join("/tmp", `${randomUUID()}.mp4`);
// 		const combinedAudioPath = join("/tmp", `${randomUUID()}_audio.mp3`);
// 		const outputPath = join("/tmp", `${randomUUID()}_final.mp4`);
// 		tempFiles.push(videoPath, combinedAudioPath, outputPath);

// 		// Download the video
// 		const videoResponse = await axios.get(videoUrl, {
// 			responseType: "arraybuffer",
// 			maxContentLength: 100 * 1024 * 1024,
// 			timeout: 30000,
// 		});
// 		await writeFile(videoPath, Buffer.from(videoResponse.data));

// 		// Combine audio segments
// 		await combineAudioSegments(audioFiles, combinedAudioPath);

// 		// Combine video and audio
// 		await combineVideoAndAudio(
// 			videoPath,
// 			combinedAudioPath,
// 			outputPath,
// 			metadata
// 		);

// 		// Read the final video
// 		const finalVideo = await readFile(outputPath);

// 		// Clean up
// 		await Promise.all(
// 			tempFiles.map((file) => unlink(file).catch(console.error))
// 		);

// 		return new NextResponse(finalVideo, {
// 			headers: {
// 				"Content-Type": "video/mp4",
// 				"Content-Disposition": `attachment; filename="generated_video.mp4"`,
// 				"Cache-Control": "no-store, must-revalidate",
// 			},
// 		});
// 	} catch (error) {
// 		// Clean up temp files in case of error
// 		await Promise.all(
// 			tempFiles.map((file) => unlink(file).catch(console.error))
// 		);

// 		console.error("Error in media combination:", error);
// 		return NextResponse.json(
// 			{
// 				error: "Media combination failed",
// 				details: error instanceof Error ? error.message : String(error),
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

export {};
