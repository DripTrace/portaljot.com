// src/app/api/font/route.ts
import { getFontPaths } from "@/utils/nexusconjure/getFonts";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const fonts = getFontPaths();
		return NextResponse.json(fonts);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to load fonts" },
			{ status: 500 }
		);
	}
}
