// // import { NextRequest, NextResponse } from "next/server";
// // import { getServerSession } from "next-auth/next";
// // import { authOptions } from "../[...nextauth]/route";

// // export async function GET(req: NextRequest) {
// // 	try {
// // 		const session = await getServerSession(authOptions);

// // 		if (!session) {
// // 			return NextResponse.json(
// // 				{ message: "No active session found" },
// // 				{ status: 401 }
// // 			);
// // 		}

// // 		// Respond with the session data
// // 		return NextResponse.json(session, { status: 200 });
// // 	} catch (error) {
// // 		console.error("Session retrieval failed:", error);
// // 		return NextResponse.json(
// // 			{ message: "Failed to retrieve session" },
// // 			{ status: 500 }
// // 		);
// // 	}
// // }

// // /app/api/modify/auth/session/route.ts

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../route";
// // import { authOptions } from "../[...nextauth]/route";

// export async function GET() {
// 	try {
// 		const session = await getServerSession(authOptions);

// 		if (!session) {
// 			return NextResponse.json({}, { status: 200 });
// 		}

// 		return NextResponse.json(session, { status: 200 });
// 	} catch (error) {
// 		console.error("Session retrieval failed:", error);
// 		return NextResponse.json(
// 			{ message: "Failed to retrieve session" },
// 			{ status: 500 }
// 		);
// 	}
// }

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../route";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return NextResponse.json({}, { status: 200 });
		}

		return NextResponse.json(session, { status: 200 });
	} catch (error) {
		console.error("Session retrieval failed:", error);
		return NextResponse.json(
			{ message: "Failed to retrieve session" },
			{ status: 500 }
		);
	}
}
