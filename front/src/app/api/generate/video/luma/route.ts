// import { NextRequest, NextResponse } from "next/server";
// import { LumaAI } from "lumaai";
// import { initLumaClient } from "@/lib/client/luma";
// import { Generation, LumaRequest, VideoRequest } from "@/types/modify/luma";
// import {
// 	downloadContent,
// 	mapErrorResponse,
// 	validateGenerationParams,
// 	waitForGeneration,
// } from "@/lib/utils/luma";

// export async function POST(req: NextRequest) {
// 	try {
// 		const client = initLumaClient();
// 		const body = (await req.json()) as LumaRequest;

// 		const validationError = validateGenerationParams(body);
// 		if (validationError) {
// 			return NextResponse.json(
// 				{ success: false, error: validationError.error },
// 				{ status: 400 }
// 			);
// 		}

// 		let generation: Generation;

// 		// For video generations only
// 		if (!body.generation_type || body.generation_type === "video") {
// 			const videoRequest = body as VideoRequest;
// 			generation = await client.generations.create(videoRequest);
// 		} else {
// 			// Image generations are not supported in this endpoint
// 			return NextResponse.json(
// 				{
// 					success: false,
// 					error: "Image generations not supported in this endpoint",
// 				},
// 				{ status: 400 }
// 			);
// 		}

// 		if (!generation.id) {
// 			throw new Error("Generation ID not returned");
// 		}

// 		const completedGeneration = await waitForGeneration(
// 			client,
// 			generation.id
// 		);

// 		const contentUrl =
// 			body.generation_type === "video"
// 				? completedGeneration.assets?.video
// 				: completedGeneration.assets?.image;
// 		if (!contentUrl) {
// 			throw new Error("No content URL in generation response");
// 		}

// 		const contentData = await downloadContent(contentUrl);
// 		const contentType = "video/mp4";
// 		const fileName = `${completedGeneration.id}.mp4`;

// 		return new NextResponse(contentData, {
// 			status: 200,
// 			headers: {
// 				"Content-Type": contentType,
// 				"Content-Disposition": `attachment; filename="${fileName}"`,
// 			},
// 		});
// 	} catch (error) {
// 		console.error("Error in generation:", error);
// 		const { status, message } = mapErrorResponse(error);
// 		return NextResponse.json(
// 			{ success: false, error: message },
// 			{ status }
// 		);
// 	}
// }

// export async function GET(req: NextRequest) {
// 	try {
// 		const client = initLumaClient();
// 		const { searchParams } = new URL(req.url);
// 		const generationId = searchParams.get("id");
// 		const action = searchParams.get("action");

// 		switch (action) {
// 			case "camera-motions":
// 				const cameras = await client.generations.cameraMotion.list();
// 				return NextResponse.json({ success: true, cameras });

// 			case "credits":
// 				const credits = await client.get("/credits");
// 				return NextResponse.json({ success: true, credits });

// 			default:
// 				if (generationId) {
// 					const generation =
// 						await client.generations.get(generationId);
// 					return NextResponse.json({ success: true, generation });
// 				} else {
// 					const limit = searchParams.get("limit")
// 						? parseInt(searchParams.get("limit")!)
// 						: 100;
// 					const offset = searchParams.get("offset")
// 						? parseInt(searchParams.get("offset")!)
// 						: 0;
// 					const generations = await client.generations.list({
// 						limit,
// 						offset,
// 					});
// 					return NextResponse.json({ success: true, generations });
// 				}
// 		}
// 	} catch (error) {
// 		console.error("Error in GET request:", error);
// 		const { status, message } = mapErrorResponse(error);
// 		return NextResponse.json(
// 			{ success: false, error: message },
// 			{ status }
// 		);
// 	}
// }

// export async function DELETE(req: NextRequest) {
// 	try {
// 		const client = initLumaClient();
// 		const { searchParams } = new URL(req.url);
// 		const generationId = searchParams.get("id");

// 		if (!generationId) {
// 			return NextResponse.json(
// 				{ success: false, error: "Generation ID is required" },
// 				{ status: 400 }
// 			);
// 		}

// 		await client.generations.delete(generationId);
// 		return NextResponse.json({
// 			success: true,
// 			message: `Generation ${generationId} deleted successfully`,
// 		});
// 	} catch (error) {
// 		console.error("Error in delete request:", error);
// 		const { status, message } = mapErrorResponse(error);
// 		return NextResponse.json(
// 			{ success: false, error: message },
// 			{ status }
// 		);
// 	}
// }

export {};
