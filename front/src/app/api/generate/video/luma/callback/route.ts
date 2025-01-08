import { NextResponse, type NextRequest } from "next/server";

// callback-route.ts
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		// Log the callback data
		console.log("Received generation callback:", {
			generationId: body.id,
			state: body.state,
			assets: body.assets,
		});

		// You can add custom callback handling here
		// For example, updating a database, sending notifications, etc.

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error processing callback:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Unknown error occurred",
			},
			{ status: 500 }
		);
	}
}
