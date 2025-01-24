// app/api/clinicviews/llpmg/sip-ws/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import Softphone from "@/utils/clinicviews/ref/soft/src/softphone";
import { v4 as uuid } from "uuid";

let softphone: Softphone | null = null;
let io: SocketIOServer | null = null;

// Define interfaces to extend the server and socket types
interface SocketServer extends HTTPServer {
	io?: SocketIOServer;
}

export async function POST(req: NextRequest) {
	const socket = req.socket as any as SocketServer;

	if (!socket.server.io) {
		console.log("[SIP-WS] Initializing Socket.io server...");
		const ioServer = new SocketIOServer(socket.server, {
			path: "/api/clinicviews/llpmg/sip-ws",
			addTrailingSlash: false,
		});
		socket.server.io = ioServer;
		io = ioServer;

		io.on("connection", (clientSocket) => {
			console.log("[SIP-WS] New client connected");

			if (!softphone) {
				const sipInfo = {
					username: process.env.SIP_INFO_USERNAME!,
					password: process.env.SIP_INFO_PASSWORD!,
					authorizationId: process.env.SIP_INFO_AUTHORIZATION_ID!,
					domain: process.env.SIP_INFO_DOMAIN!,
				};

				console.log(
					"[SIP-WS] Initializing Softphone with info:",
					JSON.stringify(sipInfo, null, 2)
				);
				softphone = new Softphone(sipInfo);
				softphone.enableDebugMode();
				softphone
					.register()
					.then(() => {
						console.log(
							"[SIP-WS] Softphone registered successfully"
						);

						softphone!.on("invite", (inviteMessage: any) => {
							const callerNumber =
								inviteMessage.headers.From.match(
									/<sip:(.+?)@/
								)?.[1];
							console.log(
								`[SIP-WS] Incoming call detected from ${callerNumber}`
							);
							clientSocket.emit("incomingCall", { callerNumber });
						});

						softphone!.on("callEnded", () => {
							console.log(
								"[SIP-WS] Call ended, emitting event to client"
							);
							clientSocket.emit("callEnded");
						});

						softphone!.on("audioData", (audioData: Buffer) => {
							if (softphone!.currentCallSession) {
								console.log(
									`[SIP-WS] Received audio data from Softphone, size: ${audioData.length} bytes`
								);
								clientSocket.emit("audioData", audioData);
							}
						});
					})
					.catch((error) => {
						console.error(
							"[SIP-WS] Failed to register softphone:",
							error
						);
					});
			}

			clientSocket.on("startCall", async (data: { number: string }) => {
				try {
					if (softphone) {
						console.log(
							`[SIP-WS] Initiating call to ${data.number}`
						);
						const callSession = await softphone.call(
							parseInt(data.number, 10)
						);
						console.log(
							`[SIP-WS] Call initiated with ID: ${callSession.callId}`
						);
						clientSocket.emit("callStarted", {
							callId: callSession.callId,
						});
					} else {
						console.error("[SIP-WS] Softphone not initialized");
						clientSocket.emit("error", {
							message: "Softphone not initialized",
						});
					}
				} catch (error) {
					console.error("[SIP-WS] Error starting call:", error);
					clientSocket.emit("error", {
						message:
							"Failed to start call: " + (error as Error).message,
					});
				}
			});

			clientSocket.on("answerCall", async () => {
				try {
					if (softphone && softphone.lastInviteMessage) {
						console.log("[SIP-WS] Answering incoming call");
						const callSession = await softphone.answer(
							softphone.lastInviteMessage
						);
						console.log(
							`[SIP-WS] Call answered with ID: ${callSession.callId}`
						);
						clientSocket.emit("callAnswered", {
							callId: callSession.callId,
						});
					} else {
						clientSocket.emit("error", {
							message: "[SIP-WS] No incoming call to answer",
						});
					}
				} catch (error) {
					console.error("[SIP-WS] Error answering call:", error);
					clientSocket.emit("error", {
						message: "[SIP-WS] Failed to answer call",
					});
				}
			});

			clientSocket.on("hangupCall", async () => {
				try {
					if (softphone && softphone.currentCallSession) {
						console.log("[SIP-WS] Hanging up call");
						await softphone.hangup();
						clientSocket.emit("callEnded");
					} else {
						clientSocket.emit("error", {
							message: "[SIP-WS] No active call to hang up",
						});
					}
				} catch (error) {
					console.error("[SIP-WS] Error hanging up call:", error);
					clientSocket.emit("error", {
						message: "[SIP-WS] Failed to hang up call",
					});
				}
			});

			clientSocket.on("disconnect", () => {
				console.log("[SIP-WS] Client disconnected");
			});
		});
	}

	try {
		const body = await req.json();
		const { action } = body;

		switch (action) {
			case "initializeSocket":
				return NextResponse.json(
					{ socketUrl: process.env.WEBSOCKET_URL || "" },
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
	} catch (error) {
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
