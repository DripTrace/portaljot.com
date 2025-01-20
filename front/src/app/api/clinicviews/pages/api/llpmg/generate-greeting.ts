import { NextApiRequest, NextApiResponse } from "next";
import { ElevenLabsClient } from "elevenlabs";
import fs, { createWriteStream, unlink } from "fs";
import { v4 as uuid } from "uuid";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import OpenAI from "openai";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface RemoteCaller {
    remoteCaller: {
        remoteNumber: string;
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { remoteCaller }: RemoteCaller = req.body;
    console.log("REQUEST BODY: >>>>\n", req.body);

    const phoneNumber = remoteCaller.remoteNumber;

    console.log("CALLER PHONE NUMBER: >>>>\n", phoneNumber);

    if (!phoneNumber) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    const greetingText = `Welcome to Loma Linda Psychiatric Medical Group. I see that I'm being called from ${phoneNumber}.
    We're here to assist you with your mental health needs. Please briefly describe the reason for your call.
    Are you a new or returning patient? Do you need help with billing, appointments, prescriptions, or general information?
    Your well-being is our priority, and we're here to provide the support you need.`;

    try {
        // const audio = await client.generate({
        //     voice: "Rachel",
        //     model_id: "eleven_turbo_v2",
        //     text: greetingText,
        // });

        const audio = await openai.audio.speech.create({
            // model: "tts-1",
            model: "tts-1-hd",
            voice: "nova",
            input: greetingText,
        });

        const buffer = Buffer.from(await audio.arrayBuffer());

        console.log("returned audio: >>>>\n", audio);

        const mp3FileName = `${uuid()}.mp3`;
        const mp3FilePath = path.join(
            process.cwd(),
            "public",
            "llpmg",
            "audio",
            mp3FileName
        );

        await fs.promises.writeFile(mp3FilePath, buffer);

        // const mp3FileStream = createWriteStream(mp3FilePath);

        // audio.stream_to_file(mp3FilePath)

        // await new Promise((resolve, reject) => {
        //     audio.pipe(mp3FileStream);
        //     mp3FileStream.on("finish", resolve);
        //     mp3FileStream.on("error", reject);
        // });

        const oggFileName = `${uuid()}.ogg`;
        const oggFilePath = path.join(
            process.cwd(),
            "public",
            "llpmg",
            "audio",
            oggFileName
        );

        await new Promise((resolve, reject) => {
            ffmpeg(mp3FilePath)
                .toFormat("ogg")
                .on("end", resolve)
                .on("error", reject)
                .save(oggFilePath);
        });

        unlink(mp3FilePath, (err) => {
            if (err) {
                console.error("Error deleting original MP3 file:", err);
            }
        });

        res.status(200).json({
            audioUrl: `/llpmg/audio/${oggFileName}`,
            greetingText: greetingText,
        });
    } catch (error) {
        console.error("Error generating or converting audio:", error);
        res.status(500).json({
            error: "Failed to generate or convert audio greeting",
        });
    }
}
