"use server";

import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/modify/auth/route";
import { getServerSession } from "next-auth/next";

export async function logoutAction(req: NextRequest): Promise<NextResponse> {
	try {
		// Retrieve the session using NextAuth
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json(
				{ message: "No active session found" },
				{ status: 401 }
			);
		}

		// Destroy the session by clearing the session token cookie
		const response = NextResponse.json(
			{ message: "Logged out successfully" },
			{ status: 200 }
		);
		response.headers.set(
			"Set-Cookie",
			`next-auth.session-token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`
		);

		return response;
	} catch (error) {
		console.error("Error during logout:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
