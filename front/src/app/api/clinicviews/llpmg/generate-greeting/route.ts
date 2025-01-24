// app/api/generate-greeting/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs/promises";
import { unlink } from "fs";
import ffmpeg from "fluent-ffmpeg";
import OpenAI from "openai";

const elevenLabsClient = new ElevenLabsClient({
	apiKey: process.env.ELEVENLABS_API_KEY!,
});

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

interface RemoteCaller {
	remoteCaller: {
		remoteNumber: string;
	};
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};

export async function POST(req: NextRequest) {
	if (req.method !== "POST") {
		return NextResponse.json(
			{ error: "Method not allowed" },
			{ status: 405 }
		);
	}

	try {
		const body = (await req.json()) as RemoteCaller;
		const { remoteCaller } = body;

		console.log("REQUEST BODY:", body);

		const phoneNumber = remoteCaller.remoteNumber;

		console.log("CALLER PHONE NUMBER:", phoneNumber);

		if (!phoneNumber) {
			return NextResponse.json(
				{ error: "Phone number is required" },
				{ status: 400 }
			);
		}

		const greetingText = `Welcome to Loma Linda Psychiatric Medical Group. I see that I'm being called from ${phoneNumber}.
We're here to assist you with your mental health needs. Please briefly describe the reason for your call.
Are you a new or returning patient? Do you need help with billing, appointments, prescriptions, or general information?
Your well-being is our priority, and we're here to provide the support you need.`;

		// Generate speech audio using OpenAI's API
		const audio = await openai.audio.speech.create({
			model: "tts-1-hd",
			voice: "nova",
			input: greetingText,
		});

		const buffer = Buffer.from(await audio.arrayBuffer());

		console.log("Returned audio:", audio);

		const mp3FileName = `${uuid()}.mp3`;
		const mp3FilePath = path.join(
			process.cwd(),
			"public",
			"llpmg",
			"audio",
			mp3FileName
		);

		await fs.writeFile(mp3FilePath, buffer);

		const oggFileName = `${uuid()}.ogg`;
		const oggFilePath = path.join(
			process.cwd(),
			"public",
			"llpmg",
			"audio",
			oggFileName
		);

		// Convert MP3 to OGG using FFmpeg
		await new Promise<void>((resolve, reject) => {
			ffmpeg(mp3FilePath)
				.toFormat("ogg")
				.on("end", () => resolve())
				.on("error", (err) => reject(err))
				.save(oggFilePath);
		});

		// Delete the original MP3 file
		await unlink(mp3FilePath).catch((err) => {
			console.error("Error deleting original MP3 file:", err);
		});

		return NextResponse.json(
			{
				audioUrl: `/clinicviews/llpmg/audio/${oggFileName}`,
				greetingText: greetingText,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error generating or converting audio:", error);
		return NextResponse.json(
			{
				error: "Failed to generate or convert audio greeting",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
