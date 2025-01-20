// src/app/api/font/route.ts
import { NextResponse } from "next/server";
import { getFontPaths } from "@/lib/utils/getFonts";

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
