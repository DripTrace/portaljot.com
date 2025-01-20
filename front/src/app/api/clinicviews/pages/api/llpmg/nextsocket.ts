import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as HTTPServer } from "http";
import OpenAI from "openai";
import WebSocket from "ws";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

export const config = {
    api: {
        bodyParser: false,
    },
};

interface SocketServer extends HTTPServer {
    io?: SocketIOServer | undefined;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO;
}

type ChatCompletionMessageParam = {
    role: "system" | "user" | "assistant";
    content: string;
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
    if (!res.socket.server.io) {
        console.log("*First use, starting socket.io");
        const io = new SocketIOServer(res.socket.server as any, {
            path: "/api/llpmg/nextsocket",
        });
        res.socket.server.io = io;

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
                        chatResponse.choices[0].message.content;
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

    res.status(200).end();
};

async function textToSpeech(text: string, clientSocket: any) {
    const model = "eleven_turbo_v2";
    const uri = `wss://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/stream-input?model_id=${model}`;

    const ws = new WebSocket(uri, {
        headers: { "xi-api-key": ELEVENLABS_API_KEY as string },
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
        const parsedData = JSON.parse(data.toString());
        if (parsedData.audio) {
            clientSocket.emit("tts-chunk", parsedData.audio);
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

export default ioHandler;
