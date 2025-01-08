// import { NextRequest, NextResponse } from "next/server";
// import { analyzeVideoWithGemini } from "@/lib/modify/generate";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// export async function POST(request: NextRequest) {
// 	try {
// 		const { videoUrl, duration } = await request.json();

// 		const analysisResult = await analyzeVideoWithGemini(videoUrl, duration);

// 		return NextResponse.json({
// 			success: true,
// 			analysis: analysisResult,
// 		});
// 	} catch (error) {
// 		console.error("Error in video analysis:", error);
// 		return NextResponse.json(
// 			{
// 				error: "Video analysis failed",
// 				details: error instanceof Error ? error.message : String(error),
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

export {};
