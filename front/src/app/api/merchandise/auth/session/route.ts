import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		// Retrieve session
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json(
				{ message: "No active session found" },
				{ status: 401 }
			);
		}

		// Respond with the session data
		return NextResponse.json(session, { status: 200 });
	} catch (error) {
		console.error("Session retrieval failed:", error);
		return NextResponse.json(
			{
				message: "Failed to retrieve session",
				error: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
