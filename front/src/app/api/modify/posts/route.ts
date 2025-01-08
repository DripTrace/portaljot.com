// app/api/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TPost } from "@/types/modify/post";
import { authOptions } from "../auth/route";

const BACKEND_API_URL =
	process.env.BACKEND_API_URL || "http://127.0.0.1:8001/api/posts/";

// Simple in-memory rate limiting (not suitable for production)
const RATE_LIMIT = 100; // max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const ipRequests: Record<string, { count: number; firstRequest: number }> = {};

export async function GET(request: NextRequest) {
	const ip = request.ip || "unknown";

	// Rate limiting logic
	const currentTime = Date.now();
	if (!ipRequests[ip]) {
		ipRequests[ip] = { count: 1, firstRequest: currentTime };
	} else {
		if (currentTime - ipRequests[ip].firstRequest < RATE_LIMIT_WINDOW) {
			ipRequests[ip].count += 1;
			if (ipRequests[ip].count > RATE_LIMIT) {
				return NextResponse.json(
					{ error: "Too many requests" },
					{ status: 429 }
				);
			}
		} else {
			// Reset rate limit window
			ipRequests[ip] = { count: 1, firstRequest: currentTime };
		}
	}

	// Retrieve query parameters
	const { searchParams } = new URL(request.url);
	const limit = searchParams.get("limit") || "25";
	const offset = searchParams.get("offset") || "0";

	// Retrieve the user's session
	const session = await getServerSession(authOptions);

	if (!session || !session.user?.accessToken) {
		return NextResponse.json(
			{ error: "Not authenticated" },
			{ status: 401 }
		);
	}

	const token = session.user.accessToken;

	try {
		const response = await fetch(
			`${BACKEND_API_URL}?limit=${limit}&offset=${offset}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const data = await response.json();

		if (!response.ok) {
			// Handle token invalidation
			if (
				data.detail &&
				typeof data.detail === "object" &&
				data.detail.code === "token_not_valid"
			) {
				return NextResponse.json(
					{ error: "token_not_valid", detail: data.detail },
					{ status: 401 }
				);
			}

			// Other errors
			throw new Error(
				data.error ||
					data.detail ||
					`HTTP error! status: ${response.status}`
			);
		}

		// Assuming the backend returns { count, results }
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ error: "Failed to fetch posts" },
			{ status: 500 }
		);
	}
}
