// src/app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json(
				{ message: "Not logged in" },
				{ status: 401 }
			);
		}

		// Destroy the session by clearing cookies
		const response = NextResponse.json(
			{ message: "Logged out successfully" },
			{ status: 200 }
		);

		response.headers.set(
			"Set-Cookie",
			[
				`next-auth.session-token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`,
				`next-auth.csrf-token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`,
			].join(", ")
		);

		return response;
	} catch (error) {
		console.error("Logout failed:", error);
		return NextResponse.json({ message: "Logout failed" }, { status: 500 });
	}
}

export async function GET(): Promise<NextResponse> {
	return NextResponse.json(
		{ message: "Method not allowed" },
		{ status: 405 }
	);
}
