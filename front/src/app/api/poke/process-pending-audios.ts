import { prisma } from "@/lib/client/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateAudio } from "@/actions/feature/poke/generateAudio";
import { ProcessPendingAudiosResponse } from "@/types/poke/api";

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		console.log("Received request at /api/poke/process-pending-audios");

		// Authenticate the request using a secret token
		const authHeader = request.headers.get("authorization");
		const secretToken = process.env.AUDIO_PROCESSING_SECRET;

		if (!authHeader || authHeader !== `Bearer ${secretToken}`) {
			console.log("Unauthorized access attempt");
			const response: ProcessPendingAudiosResponse = {
				error: "Unauthorized",
			};
			return NextResponse.json(response, { status: 401 });
		}

		const { resultId, fullText } = await request.json();

		if (!resultId || typeof resultId !== "string") {
			console.log("Invalid or missing resultId");
			const response: ProcessPendingAudiosResponse = {
				error: "Result ID is required and must be a string.",
			};
			return NextResponse.json(response, { status: 400 });
		}

		// Update status to 'processing'
		console.log(
			`Updating audioStatus to 'processing' for result ID: ${resultId}`
		);
		await prisma.quizResult.update({
			where: { id: resultId },
			data: { audioStatus: "processing" },
		});

		try {
			// Generate the audio
			console.log(`Generating audio for result ID: ${resultId}`);
			console.log("Full text for audio generation:", fullText);
			console.log("Calling generateAudio function...");
			const audioBuffer = await generateAudio(fullText);
			console.log(
				"Audio generated successfully, buffer length:",
				audioBuffer.length
			);

			// Update the database with the generated audio and status
			console.log(
				`Updating audioData and audioStatus to 'completed' for result ID: ${resultId}`
			);
			await prisma.quizResult.update({
				where: { id: resultId },
				data: {
					audioData: audioBuffer,
					audioStatus: "completed",
				},
			});

			console.log(
				`Audio generation completed for result ID: ${resultId}`
			);
			const response: ProcessPendingAudiosResponse = {
				message: "Audio processing completed",
			};
			return NextResponse.json(response);
		} catch (error: unknown) {
			console.error(
				`Error generating audio for result ID: ${resultId}:`,
				error
			);

			// Update status to 'failed'
			console.log(
				`Updating audioStatus to 'failed' for result ID: ${resultId}`
			);
			await prisma.quizResult.update({
				where: { id: resultId },
				data: { audioStatus: "failed" },
			});

			const response: ProcessPendingAudiosResponse = {
				error: "Failed to generate audio.",
			};
			return NextResponse.json(response, { status: 500 });
		}
	} catch (error: unknown) {
		console.error("Error processing pending audios:", error);
		const response: ProcessPendingAudiosResponse = {
			error: "An error occurred while processing pending audios.",
		};
		return NextResponse.json(response, { status: 500 });
	}
}
