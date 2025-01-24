// /app/api/poke/upload-pokemon-png/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client/prisma";

export async function POST(req: NextRequest) {
	try {
		const { pokemonName, pngBase64, resultId } = await req.json();

		// Update the database to store the PNG base64 image in the dedicated field
		const existingData = await prisma.quizResult.findUnique({
			where: { id: resultId },
			select: { pokemonResultPngs: true },
		});

		const updatedPngMap = {
			...((existingData?.pokemonResultPngs as Record<string, string>) ??
				{}),
			[pokemonName]: pngBase64,
		};

		const updatedResult = await prisma.quizResult.update({
			where: { id: resultId },
			data: {
				pokemonResultPngs: updatedPngMap,
			},
		});

		return NextResponse.json({ success: true, updatedResult });
	} catch (error) {
		console.error("Failed to upload PNG:", error);
		return NextResponse.json(
			{ success: false, error: "Upload failed" },
			{ status: 500 }
		);
	}
}
