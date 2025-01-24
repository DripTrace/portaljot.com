// app/api/clinicviews/llpmg/nextsocket/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import type { Socket as NetSocket } from "net";
import type { Server as HTTPServer } from "http";
import OpenAI from "openai";
import WebSocket from "ws";

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID!;

// Define interfaces to extend the server and socket types
interface SocketServer extends HTTPServer {
	io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
	server: SocketServer;
}

interface NextResponseWithSocket extends NextResponse {
	socket: SocketWithIO;
}

// Extend the NextRequest interface to include the socket property
interface NextRequestWithSocket extends NextRequest {
	socket: SocketWithIO;
}

// Define the structure of chat messages
type ChatCompletionMessageParam = {
	role: "system" | "user" | "assistant";
	content: string;
};

// Extend the global object to store the socket.io server instance
declare global {
	// eslint-disable-next-line no-var
	var io: SocketIOServer | undefined;
}

// Handler for the Socket.io server initialization and connection
export async function POST(req: NextRequest) {
	// Access the underlying Node.js HTTP server
	const res = NextResponse.next();
	const socket = req as NextRequestWithSocket; // Cast req to the new interface
	const server = socket.socket.server as SocketServer;

	if (!server.io) {
		console.log("*First use, starting socket.io");
		const io = new SocketIOServer(server, {
			path: "/api/clinicviews/llpmg/nextsocket",
		});
		server.io = io;

		io.on("connection", (clientSocket) => {
			console.log("New client connected");

			let conversationHistory: ChatCompletionMessageParam[] = [
				{
					role: "system",
					content:
						"You are a helpful assistant handling phone calls for a medical office.",
				},
			];

			clientSocket.on("call-received", async (callData) => {
				clientSocket.emit("update-ui", {
					status: "call-received",
					data: callData,
				});

				const initialGreeting =
					"Hello, thank you for calling. How may I assist you today?";
				await textToSpeech(initialGreeting, clientSocket);

				conversationHistory.push({
					role: "assistant",
					content: initialGreeting,
				});
			});

			clientSocket.on("dtmf-received", async (dtmfData: string) => {
				try {
					conversationHistory.push({
						role: "user",
						content: `User pressed: ${dtmfData}`,
					});

					const chatResponse = await openai.chat.completions.create({
						model: "gpt-3.5-turbo",
						messages: conversationHistory,
					});

					const assistantResponse =
						chatResponse.choices[0]?.message?.content;
					if (assistantResponse) {
						conversationHistory.push({
							role: "assistant",
							content: assistantResponse,
						});

						clientSocket.emit("update-ui", {
							status: "assistant-response",
							data: assistantResponse,
						});

						await textToSpeech(assistantResponse, clientSocket);

						if (
							assistantResponse
								.toLowerCase()
								.includes("end of call")
						) {
							clientSocket.emit("end-call");
						}
					}
				} catch (error) {
					console.error("Error in processing DTMF:", error);
					clientSocket.emit("error", {
						message: "Error processing DTMF",
					});
				}
			});

			clientSocket.on("disconnect", () => {
				console.log("Client disconnected");
			});
		});
	}

	return res;
}

// Function to handle text-to-speech using ElevenLabs
async function textToSpeech(
	text: string,
	clientSocket: SocketIOServer["socket"]
) {
	const model = "eleven_turbo_v2";
	const uri = `wss://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/stream-input?model_id=${model}`;

	const ws = new WebSocket(uri, {
		headers: { "xi-api-key": ELEVENLABS_API_KEY },
	});

	ws.on("open", () => {
		ws.send(
			JSON.stringify({
				text: " ",
				voice_settings: {
					stability: 0.5,
					similarity_boost: 0.8,
				},
				generation_config: {
					chunk_length_schedule: [120, 160, 250, 290],
				},
			})
		);

		ws.send(JSON.stringify({ text }));
		ws.send(JSON.stringify({ text: "" }));
	});

	ws.on("message", (data) => {
		try {
			const parsedData = JSON.parse(data.toString());
			if (parsedData.audio) {
				clientSocket.emit("tts-chunk", parsedData.audio);
			}
		} catch (err) {
			console.error("Error parsing WebSocket message:", err);
		}
	});

	ws.on("close", () => {
		clientSocket.emit("tts-complete");
	});

	ws.on("error", (error) => {
		console.error("WebSocket error:", error);
		clientSocket.emit("error", { message: "Error generating speech" });
	});
}
