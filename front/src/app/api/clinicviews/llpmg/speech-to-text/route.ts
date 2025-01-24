// app/api/speech-to-text/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};

export async function POST(req: NextRequest) {
	try {
		// Check OpenAI API key configuration
		if (!openai.apiKey) {
			return NextResponse.json(
				{ error: "OpenAI API key not configured" },
				{ status: 500 }
			);
		}

		const body = await req.json();
		const { audio } = body;

		if (!audio) {
			return NextResponse.json(
				{ error: "Audio data is required" },
				{ status: 400 }
			);
		}

		// Convert base64 audio to Buffer
		const audioBuffer = Buffer.from(audio, "base64");
		const tempFileName = `${uuidv4()}.webm`;
		const tempFilePath = path.join("/tmp", tempFileName);

		// Write temporary file
		await fs.writeFile(tempFilePath, audioBuffer);

		try {
			// Send file to OpenAI Whisper for transcription
			const response = await openai.audio.transcriptions.create({
				file: fs.createReadStream(tempFilePath),
				model: "whisper-1",
			});

			const transcribedText = response.text;

			// Cleanup temporary file
			await fs.unlink(tempFilePath);

			// Return transcribed text
			return NextResponse.json(
				{ result: transcribedText },
				{ status: 200 }
			);
		} catch (error) {
			// Cleanup temporary file on error
			await fs.unlink(tempFilePath);
			throw error;
		}
	} catch (error) {
		console.error("Error in speech-to-text conversion:", error);
		return NextResponse.json(
			{
				error: "An error occurred during speech-to-text conversion",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
