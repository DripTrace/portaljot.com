import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as HTTPServer } from "http";
import OpenAI from "openai";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

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

const ioHandler = async (
    req: NextApiRequest,
    res: NextApiResponseWithSocket
) => {
    if (!res.socket.server.io) {
        console.log("* First use, starting socket.io");
        const io = new SocketIOServer(res.socket.server as any, {
            path: "/api/llpmg/voice-ws",
        });
        res.socket.server.io = io;

        io.on("connection", (clientSocket) => {
            console.log("New client connected");

            let callSessionId: string = uuidv4();
            let isCallActive = false;
            let audioChunks: Blob[] = [];

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
                stopWebSocket();
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
                            clientSocket.emit("tts-audio", ttsAudioUrl ?? ""); //
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
                    stopWebSocket();
                }
            });

            function stopWebSocket() {
                console.log("WebSocket connection closing");
                if (clientSocket) {
                    clientSocket.disconnect(true);
                }
            }

            function startTranscription(callData: any) {
                console.log(
                    "Starting transcription for call session:",
                    callSessionId
                );

                audioChunks = [];
                clientSocket.on("audio-data", (chunk: ArrayBuffer) => {
                    const audioBlob = new Blob([chunk], { type: "audio/wav" });
                    audioChunks.push(audioBlob);
                });
            }

            function stopTranscription() {
                console.log(
                    "Stopped transcription for session:",
                    callSessionId
                );

                const finalAudioBlob = new Blob(audioChunks, {
                    type: "audio/wav",
                });

                sendToWhisper(finalAudioBlob)
                    .then((transcription) => {
                        console.log("Final transcription:", transcription.text);
                    })
                    .catch((error) => {
                        console.error(
                            "Error during final transcription:",
                            error
                        );
                    });

                audioChunks = [];
            }
        });
    }

    res.status(200).end();
};

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
            {
                role: "user",
                content: transcriptionText,
            },
        ],
    });

    return response.choices[0].message.content ?? "No response from GPT-3.5";
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

export default ioHandler;
