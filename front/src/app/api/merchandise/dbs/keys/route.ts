import { keyCreation } from "@/types/merchandise/interfaces/objects/obinsun-objects";
import { NextRequest, NextResponse } from "next/server";

// Initialize keys as an empty array of keyCreation type
let keys: keyCreation[] = [];

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		if (!Array.isArray(body)) {
			throw new Error(
				"Invalid input: expected an array of keyCreation objects"
			);
		}

		console.log("Parsed dbAttributes:", body);

		// Update the keys
		keys = body;

		console.log("Updated keys:", keys);

		return NextResponse.json({ sentKeys: body }, { status: 201 });
	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json(
			{
				error: "Bad Request",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 400 }
		);
	}
}

export function GET() {
	return NextResponse.json({ keys }, { status: 200 });
}

export async function handler(req: NextRequest) {
	try {
		switch (req.method) {
			case "POST":
				return await POST(req);
			case "GET":
				return GET();
			default:
				return NextResponse.json(
					{ error: `Method ${req.method} Not Allowed` },
					{
						status: 405,
						headers: {
							Allow: "GET, POST",
						},
					}
				);
		}
	} catch (e) {
		console.error("There was an error:", e);
		return NextResponse.json(
			{
				error: "Internal Server Error",
				details: e instanceof Error ? e.message : String(e),
			},
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
};
