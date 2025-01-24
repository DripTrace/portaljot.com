// app/api/update-conversation/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

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
		// Parse request body
		const { audio } = await req.json();

		console.log("REQUEST BODY FROM UPDATE CONVERSATION: >>>>\n", {
			audio: audio ? "Audio provided" : "No audio",
		});

		// Validate audio data
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
			// Call OpenAI Whisper for transcription
			const response = await openai.audio.transcriptions.create({
				file: await fs.readFile(tempFilePath),
				model: "whisper-1",
			});

			const transcribedText = response.text;

			// Clean up temporary file
			await fs.unlink(tempFilePath);

			// Validate transcription result
			if (!transcribedText) {
				return NextResponse.json(
					{ error: "Failed to transcribe audio" },
					{ status: 500 }
				);
			}

			return NextResponse.json(
				{ transcription: transcribedText },
				{ status: 200 }
			);
		} catch (error) {
			// Clean up temporary file in case of error
			await fs.unlink(tempFilePath);
			throw error;
		}
	} catch (error) {
		console.error("Error in update-conversation:", error);
		return NextResponse.json(
			{
				error: "Failed to transcribe and update conversation",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
