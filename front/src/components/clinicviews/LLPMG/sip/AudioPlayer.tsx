"use client";

import React, { useEffect, useRef } from "react";

interface AudioPlayerProps {
    callId: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ callId }) => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

    useEffect(() => {
        console.log("connecting to sip-ws in audio player");
        // const ws = new WebSocket("ws://localhost/api/llpmg/sip-ws");
        const ws = new WebSocket(
            `ws://${process.env.LLPMG_DOMAIN}/api/llpmg/sip-ws`
        );
        audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();

        ws.onopen = () => {
            console.log("WebSocket connected");
            ws.send(JSON.stringify({ type: "join", callId }));
        };

        ws.onmessage = (event) => {
            console.log("Received audio data:", event.data); // Debug statement

            const arrayBuffer = event.data;
            audioContextRef.current!.decodeAudioData(
                arrayBuffer,
                (buffer) => {
                    console.log("Decoded audio data:", buffer); // Debug statement

                    if (sourceNodeRef.current) {
                        sourceNodeRef.current.stop();
                    }
                    sourceNodeRef.current =
                        audioContextRef.current!.createBufferSource();
                    sourceNodeRef.current.buffer = buffer;
                    sourceNodeRef.current.connect(
                        audioContextRef.current!.destination
                    );
                    sourceNodeRef.current.start();
                },
                (error) => {
                    console.error("Error decoding audio data:", error); // Debug statement
                }
            );
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error); // Debug statement
        };

        ws.onclose = () => {
            console.log("WebSocket closed"); // Debug statement
        };

        return () => {
            ws.close();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [callId]);

    return <div>Audio Player Active</div>;
};

export default AudioPlayer;
