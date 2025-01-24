// app/api/clinicviews/llpmg/voice-ws/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import OpenAI from "openai";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY as string;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID as string;

let io: SocketIOServer | null = null;
let isCallActive = false;
let audioChunks: Blob[] = [];

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function GET(req: NextRequest) {
	if (!io) {
		console.log("* Initializing Socket.io server");

		io = new SocketIOServer({
			path: "/api/clinicviews/llpmg/voice-ws",
		});

		io.on("connection", (clientSocket) => {
			console.log("New client connected");
			const callSessionId = uuidv4();

			clientSocket.on("start-call", async (callData) => {
				console.log("Call started:", callData);
				clientSocket.emit("update-ui", {
					status: "call-received",
					data: callData,
				});
				clientSocket.emit("answer-call", callData);
				isCallActive = true;
				startTranscription(callData);
			});

			clientSocket.on("end-call", () => {
				console.log("Call ended");
				isCallActive = false;
				stopTranscription();
				stopWebSocket(clientSocket);
			});

			clientSocket.on(
				"speech-to-text",
				async (audioData: ArrayBuffer) => {
					if (isCallActive) {
						try {
							const audioBlob = new Blob([audioData], {
								type: "audio/wav",
							});
							const transcription =
								await sendToWhisper(audioBlob);
							clientSocket.emit("update-ui", {
								status: "transcription",
								data: transcription.text,
							});

							const processedText = await processWithGPT(
								transcription.text
							);
							const ttsAudioUrl =
								await sendToElevenLabs(processedText);

							clientSocket.emit("tts-audio", ttsAudioUrl ?? "");

							if (
								processedText
									.toLowerCase()
									.includes("end of call")
							) {
								clientSocket.emit("end-call");
							}
						} catch (error) {
							console.error("Error processing speech:", error);
							clientSocket.emit("error", {
								message: "Error processing speech",
							});
						}
					}
				}
			);

			clientSocket.on("disconnect", () => {
				console.log("Client disconnected");
				if (isCallActive) {
					isCallActive = false;
					stopTranscription();
					stopWebSocket(clientSocket);
				}
			});
		});
	}

	return NextResponse.json({ status: "Socket.io server initialized" });
}

function stopWebSocket(clientSocket: any) {
	console.log("Closing WebSocket connection");
	clientSocket.disconnect(true);
}

function startTranscription(callData: any) {
	console.log("Starting transcription for call session");
	audioChunks = [];
}

function stopTranscription() {
	console.log("Stopping transcription");
	const finalAudioBlob = new Blob(audioChunks, { type: "audio/wav" });

	sendToWhisper(finalAudioBlob)
		.then((transcription) => {
			console.log("Final transcription:", transcription.text);
		})
		.catch((error) => {
			console.error("Error during final transcription:", error);
		});

	audioChunks = [];
}

async function sendToWhisper(blob: Blob) {
	const file = new File([blob], "speech.wav", { type: "audio/wav" });
	const transcription = await openai.audio.transcriptions.create({
		file,
		model: "whisper-1",
	});
	return transcription;
}

async function processWithGPT(transcriptionText: string): Promise<string> {
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant handling phone calls for a medical office.",
			},
			{ role: "user", content: transcriptionText },
		],
	});

	return response.choices[0].message?.content ?? "No response from GPT.";
}

async function sendToElevenLabs(text: string): Promise<string | null> {
	const model = "eleven_turbo_v2";
	const uri = `wss://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/stream-input?model_id=${model}`;
	const websocket = new WebSocket(uri, {
		headers: { "xi-api-key": ELEVENLABS_API_KEY },
	});

	return new Promise<string | null>((resolve, reject) => {
		const audioChunks: Buffer[] = [];

		websocket.on("open", () => {
			websocket.send(JSON.stringify({ text }));
			websocket.send(JSON.stringify({ text: "" }));
		});

		websocket.on("message", (data) => {
			const parsedData = JSON.parse(data.toString());
			if (parsedData.audio) {
				const audioBuffer = Buffer.from(parsedData.audio, "base64");
				audioChunks.push(audioBuffer);
			}
		});

		websocket.on("close", () => {
			if (audioChunks.length > 0) {
				const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
				const audioUrl = URL.createObjectURL(audioBlob);
				resolve(audioUrl);
			} else {
				resolve(null);
			}
		});

		websocket.on("error", (error) => {
			console.error("WebSocket error:", error);
			reject(error);
		});
	});
}
