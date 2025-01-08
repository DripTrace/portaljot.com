// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { signIn } from "next-auth/react";
// import { authOptions } from "../route";

// export default async function handler(req: NextRequest) {
// 	if (req.method !== "POST") {
// 		return new NextResponse(
// 			JSON.stringify({ message: "Method not allowed" }),
// 			{
// 				status: 405,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);
// 	}

// 	try {
// 		const { email, password } = await req.json();

// 		const result = await signIn("credentials", {
// 			redirect: false,
// 			email,
// 			password,
// 		});

// 		if (!result || result.error) {
// 			return new NextResponse(
// 				JSON.stringify({ message: "Invalid credentials" }),
// 				{
// 					status: 401,
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			);
// 		}

// 		const session = await getServerSession(authOptions);

// 		if (session) {
// 			return new NextResponse(JSON.stringify(session), {
// 				status: 200,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			});
// 		} else {
// 			return new NextResponse(
// 				JSON.stringify({ message: "Session not established" }),
// 				{
// 					status: 401,
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			);
// 		}
// 	} catch (error) {
// 		console.error("Authentication Error:", error);
// 		return new NextResponse(
// 			JSON.stringify({ message: "Internal Server Error" }),
// 			{
// 				status: 500,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);
// 	}
// }

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { authOptions } from "../route";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

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
