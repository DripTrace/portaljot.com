// import { NextRequest, NextResponse } from "next/server";
// import { generateAudioSegments } from "@/lib/modify/generate";
// import { writeFile } from "fs/promises";
// import { join } from "path";
// import { randomUUID } from "crypto";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// export async function POST(request: NextRequest) {
// 	const tempFiles: string[] = [];

// 	try {
// 		const { segments, duration } = await request.json();

// 		// Generate audio segments
// 		const audioSegments = await generateAudioSegments(segments, duration);

// 		// Store audio segments temporarily
// 		const audioFiles = await Promise.all(
// 			audioSegments.map(async (segment, index) => {
// 				const fileName = `${randomUUID()}_${index}.mp3`;
// 				const filePath = join("/tmp", fileName);
// 				await writeFile(filePath, segment);
// 				tempFiles.push(filePath);
// 				return filePath;
// 			})
// 		);

// 		return NextResponse.json({
// 			success: true,
// 			audioFiles,
// 		});
// 	} catch (error) {
// 		console.error("Error in audio generation:", error);
// 		return NextResponse.json(
// 			{
// 				error: "Audio generation failed",
// 				details: error instanceof Error ? error.message : String(error),
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

export {};
