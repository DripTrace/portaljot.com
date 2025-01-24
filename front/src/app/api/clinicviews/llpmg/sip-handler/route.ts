// app/api/clinicviews/llpmg/sip-ws/route.ts

import { NextRequest, NextResponse } from "next/server";
import Softphone from "@/utils/clinicviews/ref/soft/src/softphone";
import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { Socket as NetSocket } from "net";
import { v4 as uuid } from "uuid";
import { Readable } from "stream";

let softphone: Softphone | null = null;
let io: SocketIOServer | null = null;

// Define interfaces to extend the server and socket types
interface SocketServer extends HTTPServer {
	io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
	server: SocketServer;
}

// Define the structure of chat messages
type ChatCompletionMessageParam = {
	role: "system" | "user" | "assistant";
	content: string;
};

// Handler for POST and PUT requests
export async function POST(req: NextRequest) {
	// Access the underlying Node.js HTTP server
	const res = NextResponse.next();
	const socket = req.socket as unknown as SocketWithIO;
	const server = socket.server as SocketServer;

	if (!server.io) {
		console.log("[SIP-HANDLER] Initializing Socket.IO server");
		const ioServer = new SocketIOServer(server, {
			path: "/api/clinicviews/llpmg/sip-ws",
			addTrailingSlash: false,
		});
		server.io = ioServer;
		io = ioServer;

		io.on("connection", (clientSocket) => {
			console.log("[SIP-HANDLER] New client connected");

			clientSocket.on("audioData", async (audioData: ArrayBuffer) => {
				if (softphone && softphone.currentCallSession) {
					console.log(
						`[SIP-HANDLER] Audio data received from client: ${audioData.byteLength} bytes`
					);
					await softphone.currentCallSession.sendAudio(
						Buffer.from(audioData)
					);
				} else {
					console.error(
						"[SIP-HANDLER] No active call session to send audio data"
					);
				}
			});

			clientSocket.on("disconnect", () => {
				console.log("[SIP-HANDLER] WebSocket connection closed");
			});
		});
	}

	if (!softphone) {
		await initializeSoftphoneAndSocketIO(io);
	}

	try {
		const body = await req.json();
		const { action } = body;

		switch (action) {
			case "initializeSocket":
				return NextResponse.json(
					{
						socketUrl: process.env.WEBSOCKET_URL || "",
					},
					{ status: 200 }
				);

			case "call":
				if (!softphone) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] Softphone not initialized" },
						{ status: 500 }
					);
				}
				try {
					const callSession = await softphone.call(body.callee);
					io?.emit("callStarted", { callId: callSession.callId });
					return NextResponse.json(
						{ callId: callSession.callId },
						{ status: 200 }
					);
				} catch (error: any) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] Failed to initiate call" },
						{ status: 500 }
					);
				}

			case "hangup":
				if (!softphone) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] Softphone not initialized" },
						{ status: 500 }
					);
				}
				try {
					await softphone.hangup();
					io?.emit("callEnded");
					return NextResponse.json(
						{ success: true },
						{ status: 200 }
					);
				} catch (error: any) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] Failed to hang up call" },
						{ status: 500 }
					);
				}

			case "answer":
				if (!softphone || !softphone.lastInviteMessage) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] No incoming call to answer" },
						{ status: 400 }
					);
				}
				try {
					const callSession = await softphone.answer(
						softphone.lastInviteMessage
					);
					io?.emit("callStarted", { callId: callSession.callId });
					return NextResponse.json(
						{ callId: callSession.callId },
						{ status: 200 }
					);
				} catch (error: any) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] Failed to answer call" },
						{ status: 500 }
					);
				}

			case "decline":
				if (!softphone || !softphone.lastInviteMessage) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] No incoming call to decline" },
						{ status: 400 }
					);
				}
				try {
					await softphone.decline(softphone.lastInviteMessage);
					io?.emit("callEnded");
					return NextResponse.json(
						{ success: true },
						{ status: 200 }
					);
				} catch (error: any) {
					return NextResponse.json(
						{ error: "[SIP-HANDLER] Failed to decline call" },
						{ status: 500 }
					);
				}

			default:
				return NextResponse.json(
					{ error: "[SIP-HANDLER] Invalid action" },
					{ status: 400 }
				);
		}
	} catch (error: any) {
		console.error("[SIP-HANDLER] Invalid request body:", error);
		return NextResponse.json(
			{ error: "[SIP-HANDLER] Invalid request body" },
			{ status: 400 }
		);
	}
}

export async function PUT(req: NextRequest) {
	if (!softphone || !softphone.currentCallSession) {
		console.error(
			"[SIP-HANDLER] No active call session to process audio data"
		);
		return NextResponse.json(
			{ error: "[SIP-HANDLER] No active call session" },
			{ status: 400 }
		);
	}

	try {
		const audioData = await getRawBody(req);
		console.log(
			`[SIP-HANDLER] Received audio data: ${audioData.byteLength} bytes`
		);
		console.log(
			`[SIP-HANDLER] Audio data content: ${audioData.toString("hex").slice(0, 100)}...`
		);

		await softphone.currentCallSession.sendAudio(audioData);
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error: any) {
		console.error(
			`[SIP-HANDLER] Failed to process audio data: ${error.message}`
		);
		return NextResponse.json(
			{ error: "[SIP-HANDLER] Failed to process audio data" },
			{ status: 500 }
		);
	}
}

// Helper function to initialize Softphone and Socket.IO
async function initializeSoftphoneAndSocketIO(ioServer: SocketIOServer | null) {
	const sipInfo = {
		username: process.env.SIP_INFO_USERNAME!,
		password: process.env.SIP_INFO_PASSWORD!,
		authorizationId: process.env.SIP_INFO_AUTHORIZATION_ID!,
		domain: process.env.SIP_INFO_DOMAIN!,
	};

	softphone = new Softphone(sipInfo);
	await softphone.register();
	console.log("[SIP-HANDLER] Softphone registered successfully");

	softphone.on("invite", (inviteMessage) => {
		const callerNumber =
			inviteMessage.headers.From.match(/<sip:(.+?)@/)?.[1] || "Unknown";
		ioServer?.emit("incomingCall", { callerNumber });
	});

	softphone.on("callEnded", () => {
		ioServer?.emit("callEnded");
	});

	softphone.on("audioData", (audioData: Buffer) => {
		console.log(
			`[SIP-HANDLER] Forwarding audio data: ${audioData.byteLength} bytes`
		);
		ioServer?.emit("audioData", audioData);
	});
}

// Helper function to parse JSON body
async function parseBody(req: NextRequest): Promise<any> {
	try {
		return await req.json();
	} catch (error) {
		throw new Error("Invalid JSON");
	}
}

// Helper function to get raw body for PUT requests
async function getRawBody(req: NextRequest): Promise<Buffer> {
	const reader = req.body.getReader();
	const chunks: Uint8Array[] = [];
	let done: boolean | undefined = false;

	while (!done) {
		const { value, done: doneReading } = await reader.read();
		if (value) {
			chunks.push(value);
		}
		done = doneReading;
	}

	return Buffer.concat(chunks);
}
