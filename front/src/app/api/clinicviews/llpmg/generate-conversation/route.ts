// app/api/generate-conversation/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs/promises";
import { unlink } from "fs";
import Ffmpeg from "fluent-ffmpeg";
import OpenAI from "openai";

// Initialize ElevenLabsClient with the API key from environment variables
const elevenLabsClient = new ElevenLabsClient({
	apiKey: process.env.ELEVENLABS_API_KEY!,
});

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

// Define the structure of the incoming request
interface GenerateRequest {
	text: string;
}

// Define the structure of the successful response
interface GenerateResponse {
	audioUrl: string;
	suggestionText: string;
}

export async function POST(req: NextRequest) {
	try {
		// Parse the JSON body from the incoming request
		const body = (await req.json()) as GenerateRequest;
		const { text } = body;

		console.log("REQUEST BODY FROM GENERATE CONVERSATION: >>>>\n", body);

		// Validate that the 'text' field is provided
		if (!text) {
			return NextResponse.json(
				{ error: "Text is required" },
				{ status: 400 }
			);
		}

		console.log("CREATING UPDATE FOR CONVERSATION: >>>>\n");

		// Generate speech audio using OpenAI's API
		const audio = await openai.audio.speech.create({
			model: "tts-1-hd",
			voice: "nova",
			input: text,
		});

		// Generate a unique filename for the MP3 file
		const mp3FileName = `${uuid()}.mp3`;
		const mp3FilePath = path.join(
			process.cwd(),
			"public",
			"clinicviews",
			"llpmg",
			"audio",
			mp3FileName
		);

		// Convert the audio response to a Buffer and save it as an MP3 file
		const buffer = Buffer.from(await audio.arrayBuffer());
		await fs.writeFile(mp3FilePath, buffer);

		// Generate a unique filename for the OGG file
		const oggFileName = `${uuid()}.ogg`;
		const oggFilePath = path.join(
			process.cwd(),
			"public",
			"clinicviews",
			"llpmg",
			"audio",
			oggFileName
		);

		// Convert the MP3 file to OGG format using FFmpeg
		await new Promise<void>((resolve, reject) => {
			Ffmpeg(mp3FilePath)
				.toFormat("ogg")
				.on("end", () => resolve())
				.on("error", (err) => reject(err))
				.save(oggFilePath);
		});

		// Delete the original MP3 file to conserve storage
		await unlink(mp3FilePath, (err) => {
			if (err) {
				console.error("Error deleting original MP3 file:", err);
			}
		});

		// Respond with the URL to the OGG audio file and the suggestion text
		return NextResponse.json(
			{
				audioUrl: `/clinicviews/llpmg/audio/${oggFileName}`,
				suggestionText: text,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error in generate-conversation:", error);
		return NextResponse.json(
			{
				error: "Failed to generate speech audio for the conversation",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}

// Note: In the Next.js App Router, configuring body size limits is handled differently.
// If you need to adjust the size limit, consider using middleware or other server configurations.
