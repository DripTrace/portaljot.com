// actions/feature/merchandise/authenticateUser.ts
"use server";

import { authOptions } from "@/app/api/modify/auth/route";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function authenticateUser(
	req: NextRequest
): Promise<NextResponse> {
	try {
		// Extract email and password from the request body
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password are required" },
				{ status: 400 }
			);
		}

		// Send a request to the credentials callback for authentication
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/merchandise/auth/callback/credentials`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			}
		);

		if (!res.ok) {
			const error = await res.json();
			console.error("Authentication failed:", error);
			return NextResponse.json(
				{ error: "Failed to authenticate" },
				{ status: res.status }
			);
		}

		const data = await res.json();
		console.log("Response from credentials callback:", data);

		// Retrieve the server session using NextAuth
		const session = await getServerSession(authOptions);

		if (!session) {
			console.error("Session not established after authentication");
			return NextResponse.json(
				{ error: "Session not established" },
				{ status: 500 }
			);
		}

		console.log("Session established:", session);

		// Return the session details
		return NextResponse.json({ session }, { status: 200 });
	} catch (error) {
		console.error("Error during authentication:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
