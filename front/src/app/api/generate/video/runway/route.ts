// // // app/api/runway/route.ts
// // import { NextRequest, NextResponse } from 'next/server';

// // // Types for the API
// // type TaskStatus = 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';

// // interface RunwayTask {
// //   id: string;
// //   status: TaskStatus;
// //   createdAt: string;
// // }

// // interface ImageToVideoRequest {
// //   model: 'gen3a_turbo';
// //   promptImage: string;
// //   promptText?: string;
// //   seed?: number;
// //   watermark?: boolean;
// //   duration?: 5 | 10;
// //   ratio?: '1280:768' | '768:1280';
// // }

// // // Environment variable validation
// // const RUNWAY_API_KEY = process.env.RUNWAY_API_SECRET;
// // const RUNWAY_API_VERSION = '2024-11-06';
// // const RUNWAY_API_URL = 'https://api.runway.ml/v1';

// // if (!RUNWAY_API_KEY) {
// //   throw new Error('RUNWAY_API_SECRET environment variable is not set');
// // }

// // // Helper function to make requests to Runway API
// // async function runwayRequest(
// //   endpoint: string,
// //   method: 'GET' | 'POST' | 'DELETE',
// //   body?: any
// // ) {
// //   const response = await fetch(`${RUNWAY_API_URL}${endpoint}`, {
// //     method,
// //     headers: {
// //       'Authorization': `Bearer ${RUNWAY_API_KEY}`,
// //       'X-Runway-Version': RUNWAY_API_VERSION,
// //       'Content-Type': 'application/json',
// //     },
// //     body: body ? JSON.stringify(body) : undefined,
// //   });

// //   if (!response.ok) {
// //     const error = await response.json().catch(() => ({ message: 'Unknown error' }));
// //     throw new Error(`Runway API error: ${error.message}`);
// //   }

// //   if (response.status === 204) {
// //     return null;
// //   }

// //   return response.json();
// // }

// // // POST /api/runway/generate
// // export async function POST(request: NextRequest) {
// //   try {
// //     const body: ImageToVideoRequest = await request.json();

// //     // Validate required fields
// //     if (!body.model || !body.promptImage) {
// //       return NextResponse.json(
// //         { error: 'Missing required fields: model and promptImage' },
// //         { status: 400 }
// //       );
// //     }

// //     // Start generation task
// //     const task = await runwayRequest('/image_to_video', 'POST', body);
// //     return NextResponse.json(task);
// //   } catch (error) {
// //     console.error('Error generating video:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to generate video' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // GET /api/runway/task/[taskId]
// // export async function GET(
// //   request: NextRequest,
// //   { params }: { params: { taskId: string } }
// // ) {
// //   try {
// //     const task = await runwayRequest(`/tasks/${params.taskId}`, 'GET');
// //     return NextResponse.json(task);
// //   } catch (error) {
// //     console.error('Error fetching task:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to fetch task status' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // DELETE /api/runway/task/[taskId]
// // export async function DELETE(
// //   request: NextRequest,
// //   { params }: { params: { taskId: string } }
// // ) {
// //   try {
// //     await runwayRequest(`/tasks/${params.taskId}`, 'DELETE');
// //     return new NextResponse(null, { status: 204 });
// //   } catch (error) {
// //     console.error('Error deleting task:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to delete task' },
// //       { status: 500 }
// //     );
// //   }
// // }

// // app/api/runway/route.ts
// import { runwayRequest, validateImageUrl } from "@/lib/utils/runwayml";
// import { ImageToVideoRequest } from "@/types/modify/runwayml";
// import { NextRequest, NextResponse } from "next/server";
// // import { validateImageUrl } from '../../../utils/validate';
// // import { runwayRequest } from '../../../utils/api';
// // import type { ImageToVideoRequest, RunwayTask } from '../../../types';

// // POST /api/runway/generate
// export async function POST(request: NextRequest) {
// 	try {
// 		const body: ImageToVideoRequest = await request.json();

// 		// Validate required fields
// 		if (!body.model || !body.promptImage) {
// 			return NextResponse.json(
// 				{ error: "Missing required fields: model and promptImage" },
// 				{ status: 400 }
// 			);
// 		}

// 		// Validate image URL/data URI
// 		try {
// 			validateImageUrl(body.promptImage);
// 		} catch (error) {
// 			return NextResponse.json(
// 				{
// 					error:
// 						error instanceof Error
// 							? error.message
// 							: "Invalid image URL",
// 				},
// 				{ status: 400 }
// 			);
// 		}

// 		// Start generation task
// 		const task = await runwayRequest("/image_to_video", "POST", body);
// 		return NextResponse.json(task);
// 	} catch (error) {
// 		console.error("Error generating video:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to generate video" },
// 			{ status: 500 }
// 		);
// 	}
// }

export {};
