// src/app/api/authenticate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import { signIn } from "next-auth/react";

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = await req.json();
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (!result || result.error) {
			return NextResponse.json(
				{ message: "Invalid credentials" },
				{ status: 401 }
			);
		}

		const session = await getServerSession(authOptions);

		if (session) {
			return NextResponse.json(session, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "Session not established" },
				{ status: 401 }
			);
		}
	} catch (error) {
		console.error("Authentication Error:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function GET(req: NextRequest): Promise<NextResponse> {
	return NextResponse.json(
		{ message: "Method not allowed" },
		{ status: 405 }
	);
}
