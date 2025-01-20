import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import Softphone from "@/ref/soft/src/softphone";
import { NextApiResponseServerIO } from "@/types/llpmg/nextsocket";

export const config = {
    api: {
        bodyParser: false,
    },
};

let softphone: Softphone | null = null;
let io: ServerIO | null = null;

const SocketHandler = async (
    req: NextApiRequest,
    res: NextApiResponseServerIO
) => {
    if (!res.socket.server.io) {
        console.log("[SIP-WS] Initializing Socket.io server...");
        const httpServer: NetServer = res.socket.server as any;
        io = new ServerIO(httpServer, {
            path: "/api/llpmg/sip-ws",
            addTrailingSlash: false,
        });
        res.socket.server.io = io;

        io.on("connection", (socket: Socket) => {
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
                            socket.emit("incomingCall", { callerNumber });
                        });

                        softphone!.on("callEnded", () => {
                            console.log(
                                "[SIP-WS] Call ended, emitting event to client"
                            );
                            socket.emit("callEnded");
                        });

                        softphone!.on("audioData", (audioData: Buffer) => {
                            if (softphone!.currentCallSession) {
                                console.log(
                                    `[SIP-WS] Received audio data from Softphone, size: ${audioData.length} bytes`
                                );
                                socket.emit("audioData", audioData);
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

            socket.on("startCall", async (data: { number: string }) => {
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
                        socket.emit("callStarted", {
                            callId: callSession.callId,
                        });
                    } else {
                        console.error("[SIP-WS] Softphone not initialized");
                        socket.emit("error", {
                            message: "Softphone not initialized",
                        });
                    }
                } catch (error) {
                    console.error("[SIP-WS] Error starting call:", error);
                    socket.emit("error", {
                        message:
                            "Failed to start call: " + (error as Error).message,
                    });
                }
            });

            socket.on("answerCall", async () => {
                try {
                    if (softphone && softphone.lastInviteMessage) {
                        console.log("[SIP-WS] Answering incoming call");
                        const callSession = await softphone.answer(
                            softphone.lastInviteMessage
                        );
                        console.log(
                            `[SIP-WS] Call answered with ID: ${callSession.callId}`
                        );
                        socket.emit("callAnswered", {
                            callId: callSession.callId,
                        });
                    } else {
                        socket.emit("error", {
                            message: "[SIP-WS] No incoming call to answer",
                        });
                    }
                } catch (error) {
                    console.error("[SIP-WS] Error answering call:", error);
                    socket.emit("error", {
                        message: "[SIP-WS] Failed to answer call",
                    });
                }
            });

            socket.on("hangupCall", async () => {
                try {
                    if (softphone && softphone.currentCallSession) {
                        console.log("[SIP-WS] Hanging up call");
                        await softphone.hangup();
                        socket.emit("callEnded");
                    } else {
                        socket.emit("error", {
                            message: "[SIP-WS] No active call to hang up",
                        });
                    }
                } catch (error) {
                    console.error("[SIP-WS] Error hanging up call:", error);
                    socket.emit("error", {
                        message: "[SIP-WS] Failed to hang up call",
                    });
                }
            });

            socket.on("disconnect", () => {
                console.log("[SIP-WS] Client disconnected");
            });
        });
    }

    if (req.method === "GET") {
        res.end();
    }
};

export default SocketHandler;
