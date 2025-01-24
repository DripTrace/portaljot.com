// app/api/get-audio/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const filename = searchParams.get("filename");

	if (!filename) {
		return NextResponse.json(
			{ error: "Filename is required" },
			{ status: 400 }
		);
	}

	const filePath = path.join(
		process.cwd(),
		"public",
		"clinicviews",
		"llpmg",
		"audio",
		filename
	);

	try {
		const fileData = await fs.readFile(filePath);
		return new NextResponse(fileData, {
			headers: {
				"Content-Type": "audio/mpeg",
			},
			status: 200,
		});
	} catch (error: any) {
		console.error("Error reading file:", error);
		return NextResponse.json({ error: "File not found" }, { status: 404 });
	}
}
