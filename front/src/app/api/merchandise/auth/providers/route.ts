// src/app/api/auth/providers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/modify/auth/route";

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		// Ensure the correct content type is set
		const headers = new Headers();
		headers.set("Content-Type", "application/json");

		// Access the providers from the NextAuth configuration
		const providers = authOptions.providers;

		// Return providers as JSON
		return NextResponse.json(providers, { headers });
	} catch (error) {
		console.error("Error fetching providers:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(): Promise<NextResponse> {
	return NextResponse.json(
		{ message: "Method not allowed" },
		{ status: 405 }
	);
}
