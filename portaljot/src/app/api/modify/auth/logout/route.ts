// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../route";
// // import { authOptions } from "../[...nextauth]/route";

// export default async function logout(req: NextRequest) {
// 	try {
// 		const session = await getServerSession(authOptions);

// 		if (!session) {
// 			return new NextResponse(
// 				JSON.stringify({ message: "Not logged in" }),
// 				{
// 					status: 401,
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			);
// 		}

// 		// Destroy the session
// 		const response = new NextResponse(
// 			JSON.stringify({ message: "Logged out successfully" }),
// 			{
// 				status: 200,
// 				headers: {
// 					"Content-Type": "application/json",
// 					"Set-Cookie": [
// 						`next-auth.session-token=; Max-Age=0; path=/`,
// 						`next-auth.csrf-token=; Max-Age=0; path=/`,
// 					].join("; "), // Combine array into a single string
// 				},
// 			}
// 		);

// 		return response;
// 	} catch (error) {
// 		console.error("Logout failed:", error);
// 		return new NextResponse(JSON.stringify({ message: "Logout failed" }), {
// 			status: 500,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 	}
// }

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../route";
// import { authOptions } from "../[...nextauth]/route";

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return new NextResponse(
				JSON.stringify({ message: "Not logged in" }),
				{
					status: 401,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		// Destroy the session
		const response = new NextResponse(
			JSON.stringify({ message: "Logged out successfully" }),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Set-Cookie": [
						`next-auth.session-token=; Max-Age=0; path=/`,
						`next-auth.csrf-token=; Max-Age=0; path=/`,
					].join("; "), // Combine array into a single string
				},
			}
		);

		return response;
	} catch (error) {
		console.error("Logout failed:", error);
		return new NextResponse(JSON.stringify({ message: "Logout failed" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
