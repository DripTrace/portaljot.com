// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "../route";
// // import { authOptions } from "../[...nextauth]/route";

// export default async function providersHandler(req: NextRequest) {
// 	try {
// 		// Ensure the correct content type
// 		const response = new NextResponse(
// 			JSON.stringify(authOptions.providers),
// 			{
// 				status: 200,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		);

// 		return response;
// 	} catch (error) {
// 		console.error("Error fetching providers:", error);
// 		return new NextResponse(
// 			JSON.stringify({ error: "Internal Server Error" }),
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
import { authOptions } from "../route";

export async function GET(req: NextRequest) {
	try {
		return NextResponse.json(authOptions.providers, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching providers:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
