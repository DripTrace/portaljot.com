// import { runwayRequest } from "@/lib/utils/runwayml";
// import type { RunwayTask } from "@/types/modify/runwayml";
// import { NextResponse, type NextRequest } from "next/server";

// // GET /api/runway/task/[taskId]
// export async function GET(
// 	request: NextRequest,
// 	{ params }: { params: { taskId: string } }
// ) {
// 	try {
// 		const task = (await runwayRequest(
// 			`/tasks/${params.taskId}`,
// 			"GET"
// 		)) as RunwayTask;

// 		// Handle task failure cases
// 		if (task.status === "FAILED") {
// 			const failureCode = task.failureCode;

// 			if (failureCode?.startsWith("SAFETY")) {
// 				return NextResponse.json(
// 					{
// 						error: "Content moderation rejection",
// 						code: failureCode,
// 					},
// 					{ status: 400 }
// 				);
// 			}

// 			if (failureCode?.startsWith("INTERNAL.BAD_OUTPUT")) {
// 				return NextResponse.json(
// 					{
// 						error: "Generation quality check failed",
// 						code: failureCode,
// 					},
// 					{ status: 400 }
// 				);
// 			}
// 		}

// 		// If task succeeded, verify output URLs exist
// 		if (
// 			task.status === "SUCCEEDED" &&
// 			(!task.output || task.output.length === 0)
// 		) {
// 			return NextResponse.json(
// 				{ error: "Task succeeded but no output URLs provided" },
// 				{ status: 500 }
// 			);
// 		}

// 		return NextResponse.json(task);
// 	} catch (error) {
// 		console.error("Error fetching task:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to fetch task status" },
// 			{ status: 500 }
// 		);
// 	}
// }

// // DELETE /api/runway/task/[taskId]
// export async function DELETE(
// 	request: NextRequest,
// 	{ params }: { params: { taskId: string } }
// ) {
// 	try {
// 		await runwayRequest(`/tasks/${params.taskId}`, "DELETE");
// 		return new NextResponse(null, { status: 204 });
// 	} catch (error) {
// 		console.error("Error deleting task:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to delete task" },
// 			{ status: 500 }
// 		);
// 	}
// }

export {};
