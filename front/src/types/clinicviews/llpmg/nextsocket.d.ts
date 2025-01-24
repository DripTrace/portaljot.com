import { NextResponse } from "next/server";
import { Server as NetServer } from "http";
import { Socket as NetSocket } from "net";
import { Server as SocketIOServer } from "socket.io";

export interface NextResponseServerIO extends NextResponse {
	socket: NetSocket & {
		server: NetServer & {
			io?: SocketIOServer;
		};
	};
}

/**
 * Ensures the Socket.IO server is attached to the HTTP server instance.
 * @param response - The response object with server capability.
 */
export const initializeSocketServer = (response: NextResponseServerIO) => {
	if (!response.socket.server.io) {
		const io = new SocketIOServer(response.socket.server, {
			path: "/api/socketio",
			cors: {
				origin: process.env.NEXT_PUBLIC_CLIENT_URL,
				methods: ["GET", "POST"],
			},
		});

		response.socket.server.io = io;

		io.on("connection", (socket) => {
			console.log("A client connected:", socket.id);

			socket.on("disconnect", () => {
				console.log("Client disconnected:", socket.id);
			});

			// Example custom event handling
			socket.on("example-event", (data) => {
				console.log("Received data on example-event:", data);
				socket.emit("response-event", { success: true });
			});
		});

		console.log("Socket.IO server initialized.");
	}
};

/**
 * Middleware to handle and ensure the Socket.IO server initialization.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 */
export const handleSocketServer = (
	req: NextRequest,
	res: NextResponseServerIO
) => {
	initializeSocketServer(res);
};
