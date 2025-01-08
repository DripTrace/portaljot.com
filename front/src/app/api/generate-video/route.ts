// // import {
// // 	NextRequest,
// // 	// , NextResponse
// // } from "next/server";

// // export async function POST(req: NextRequest) {
// // 	const { prompt, aspect_ratio, loop } = await req.json();
// // 	try {
// // 		const response = await fetch(
// // 			"https://api.lumalabs.ai/dream-machine/v1/generations",
// // 			{
// // 				method: "POST",
// // 				headers: {
// // 					Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
// // 					"Content-Type": "application/json",
// // 				},
// // 				body: JSON.stringify({ prompt, aspect_ratio, loop }),
// // 			}
// // 		);

// // 		if (!response.ok) {
// // 			throw new Error("Network response was not ok");
// // 		}

// // 		const data = await response.json();
// // 		return new Response(JSON.stringify(data), {
// // 			status: 200,
// // 			headers: { "Content-Type": "application/json" },
// // 		});
// // 	} catch (error) {
// // 		return new Response(
// // 			JSON.stringify({ error: `Error generating video: ${error}` }),
// // 			{
// // 				status: 500,
// // 				headers: { "Content-Type": "application/json" },
// // 			}
// // 		);
// // 	}
// // }

// import { NextRequest, NextResponse } from "next/server";
// import {
// 	generateVideo,
// 	parseFormData,
// 	parseJsonData,
// } from "@/lib/modify/generate";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// export const maxDuration = 60;

// export async function POST(request: NextRequest) {
// 	try {
// 		const metadata = request.headers
// 			.get("content-type")
// 			?.includes("multipart/form-data")
// 			? await parseFormData(request)
// 			: await parseJsonData(request);

// 		console.log("Starting video generation with params:", {
// 			...metadata,
// 			image: metadata.image ? "present" : "not present",
// 		});

// 		const videoResult = await generateVideo(metadata);

// 		return NextResponse.json({
// 			success: true,
// 			videoUrl: videoResult.videoUrl,
// 			duration: metadata.duration_seconds,
// 			metadata,
// 			generationResponseData: videoResult.generationResponseData,
// 		});
// 	} catch (error) {
// 		console.error("Error in video generation:", error);
// 		return NextResponse.json(
// 			{
// 				error: "Video generation failed",
// 				details: error instanceof Error ? error.message : String(error),
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

export {};
