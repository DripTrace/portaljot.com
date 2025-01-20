// sonnet-3.5 2nd attempt (audio logs don't end after hangup)
"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface SipProps {
    onCallStateChange: (isActive: boolean) => void;
}

const Sip: React.FC<SipProps> = ({ onCallStateChange }) => {
    const [state, setState] = useState({
        outgoingNumber: "",
        connectionError: null as string | null,
        callActive: false,
        incomingCall: false,
        callerNumber: "",
    });

    const [callId, setCallId] = useState("");
    const socketRef = useRef<Socket | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);

    useEffect(() => {
        socketRef.current = io({
            path: "/api/llpmg/sip-ws",
            addTrailingSlash: false,
        });

        socketRef.current.on("connect", () => {
            console.log("[Sip] Socket.IO connected");
        });

        socketRef.current.on(
            "incomingCall",
            (data: { callerNumber: string }) => {
                console.log("[Sip] Incoming call detected", data);
                setState((prevState) => ({
                    ...prevState,
                    incomingCall: true,
                    callerNumber: data.callerNumber,
                }));
            }
        );

        socketRef.current.on("callStarted", ({ callId }) => {
            console.log("[Sip] Call started with ID:", callId);
            setCallId(callId);
            setState((prevState) => ({ ...prevState, callActive: true }));
            onCallStateChange(true);
            startAudioHandling();
        });

        socketRef.current.on("callEnded", () => {
            console.log("[Sip] Call ended event received");
            setState((prevState) => ({
                ...prevState,
                callActive: false,
                incomingCall: false,
                outgoingNumber: "",
            }));
            onCallStateChange(false);
            stopAudioHandling();
        });

        socketRef.current.on("audioData", (audioData: ArrayBuffer) => {
            playAudio(audioData);
        });

        socketRef.current.on("error", (error: { message: string }) => {
            console.error("[Sip] Socket error:", error.message);
            setState((prevState) => ({
                ...prevState,
                connectionError: error.message,
            }));
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            stopAudioHandling();
        };
    }, [onCallStateChange]);

    const startAudioHandling = async () => {
        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            audioContextRef.current = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
            const source = audioContextRef.current.createMediaStreamSource(
                streamRef.current
            );
            processorRef.current =
                audioContextRef.current.createScriptProcessor(1024, 1, 1);

            source.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current.destination);

            processorRef.current.onaudioprocess = (e) => {
                const audioData = e.inputBuffer.getChannelData(0);
                sendAudioToServer(audioData.buffer);
            };
        } catch (error) {
            console.error("[Sip] Error setting up audio handling:", error);
        }
    };

    const sendAudioToServer = async (audioData: ArrayBuffer) => {
        try {
            await fetch("/api/llpmg/sip-handler", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/octet-stream",
                },
                body: audioData,
            });
        } catch (error) {
            console.error("[Sip] Failed to send audio data:", error);
        }
    };

    const playAudio = async (audioData: ArrayBuffer) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext ||
                (window as any).webkitAudioContext)();
        }

        try {
            const audioBuffer =
                await audioContextRef.current.decodeAudioData(audioData);
            const sourceNode = audioContextRef.current.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(audioContextRef.current.destination);
            sourceNode.start();
        } catch (error) {
            console.error("[Sip] Error playing audio:", error);
        }
    };

    const stopAudioHandling = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (processorRef.current) {
            processorRef.current.disconnect();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
    };

    const handleOutgoingCall = async () => {
        try {
            console.log(
                `[Sip] Initiating outgoing call to ${state.outgoingNumber}`
            );
            const response = await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    callee: state.outgoingNumber,
                    action: "call",
                }),
            });

            if (!response.ok) {
                throw new Error(`[Sip] HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Call initiated with Call ID:", data.callId);
            setCallId(data.callId);
            setState((prevState) => ({ ...prevState, callActive: true }));
            onCallStateChange(true);
            startAudioHandling();
        } catch (error) {
            console.error("Failed to initiate call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    const handleHangup = async () => {
        try {
            console.log("Hanging up call");
            await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "hangup" }),
            });
            setState((prevState) => ({ ...prevState, callActive: false }));
            onCallStateChange(false);
            stopAudioHandling();
        } catch (error) {
            console.error("Failed to hang up call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    const handleAnswer = async () => {
        try {
            await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "answer" }),
            });
            setState((prevState) => ({
                ...prevState,
                callActive: true,
                incomingCall: false,
            }));
            onCallStateChange(true);
            startAudioHandling();
        } catch (error) {
            console.error("Failed to answer call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    const handleDecline = async () => {
        try {
            await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "decline" }),
            });
            setState((prevState) => ({ ...prevState, incomingCall: false }));
        } catch (error) {
            console.error("Failed to decline call:", error);
            setState((prevState) => ({
                ...prevState,
                connectionError: (error as Error).message,
            }));
        }
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center p-6">
            <div className="bg-opacity-70 bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md">
                {state.connectionError && (
                    <div className="text-red-500 text-sm mb-4">
                        {state.connectionError}
                    </div>
                )}
                <h3 className="text-white text-2xl mb-6">
                    LLPMG WebPhone Dashboard
                </h3>

                {!state.callActive && !state.incomingCall && (
                    <div className="outgoing-call mt-4">
                        <h4 className="text-white text-xl mb-3">
                            Outgoing Call
                        </h4>
                        <input
                            type="text"
                            value={state.outgoingNumber}
                            onChange={(e) =>
                                setState((prevState) => ({
                                    ...prevState,
                                    outgoingNumber: e.target.value,
                                }))
                            }
                            placeholder="+1 234 567-8900"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <button
                            onClick={handleOutgoingCall}
                            className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            Call
                        </button>
                    </div>
                )}
                {state.incomingCall && (
                    <div className="incoming-call mt-6">
                        <h4 className="text-white text-xl mb-4">
                            Incoming Call from {state.callerNumber}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleAnswer}
                                className="py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                Answer
                            </button>
                            <button
                                onClick={handleDecline}
                                className="py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                )}
                {state.callActive && (
                    <div className="active-call mt-6">
                        <h4 className="text-white text-xl mb-4">
                            Call In Progress
                        </h4>
                        <button
                            onClick={handleHangup}
                            className="w-full py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            Hang Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sip;
// sonnet-3.5 2nd attempt

// number 0
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// interface SipProps {
//     onCallStateChange: (isActive: boolean) => void;
// }

// const Sip: React.FC<SipProps> = ({ onCallStateChange }) => {
//     const [state, setState] = useState({
//         outgoingNumber: "",
//         connectionError: null as string | null,
//         callActive: false,
//         incomingCall: false,
//         callerNumber: "",
//     });

//     const [callId, setCallId] = useState("");
//     const socketRef = useRef<Socket | null>(null);
//     const audioContextRef = useRef<AudioContext | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const processorRef = useRef<ScriptProcessorNode | null>(null);

//     useEffect(() => {
//         socketRef.current = io({
//             path: "/api/llpmg/sip-ws",
//             addTrailingSlash: false,
//         });

//         socketRef.current.on("connect", () => {
//             console.log("[Sip] Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("[Sip] Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("[Sip] Call started with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callAnswered", ({ callId }) => {
//             console.log("[Sip] Call answered with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({
//                 ...prevState,
//                 callActive: true,
//                 incomingCall: false,
//             }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("[Sip] Call ended event received");
//             setState((prevState) => ({
//                 ...prevState,
//                 callActive: false,
//                 incomingCall: false,
//                 outgoingNumber: "",
//             }));
//             onCallStateChange(false);
//             stopAudioHandling();
//         });

//         socketRef.current.on("audioData", (audioData: ArrayBuffer) => {
//             playAudio(audioData);
//         });

//         socketRef.current.on("error", (error: { message: string }) => {
//             console.error("[Sip] Socket error:", error.message);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: error.message,
//             }));
//         });

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//             }
//             stopAudioHandling();
//         };
//     }, [onCallStateChange]);

//     const startAudioHandling = async () => {
//         try {
//             streamRef.current = await navigator.mediaDevices.getUserMedia({
//                 audio: true,
//             });
//             audioContextRef.current = new (window.AudioContext ||
//                 (window as any).webkitAudioContext)();
//             const source = audioContextRef.current.createMediaStreamSource(
//                 streamRef.current
//             );
//             processorRef.current =
//                 audioContextRef.current.createScriptProcessor(1024, 1, 1);

//             source.connect(processorRef.current);
//             processorRef.current.connect(audioContextRef.current.destination);

//             processorRef.current.onaudioprocess = (e) => {
//                 const audioData = e.inputBuffer.getChannelData(0);
//                 sendAudioToServer(audioData.buffer);
//             };
//         } catch (error) {
//             console.error("[Sip] Error setting up audio handling:", error);
//         }
//     };

//     const sendAudioToServer = async (audioData: ArrayBuffer) => {
//         if (socketRef.current && state.callActive) {
//             console.log(
//                 `[Sip] Sending audio data to server, size: ${audioData.byteLength} bytes`
//             );
//             socketRef.current.emit("audioData", audioData);
//         } else {
//             console.warn(
//                 "[Sip] Attempted to send audio without an active call or socket connection"
//             );
//         }
//     };

//     const playAudio = async (audioData: ArrayBuffer) => {
//         if (!audioContextRef.current) {
//             audioContextRef.current = new (window.AudioContext ||
//                 (window as any).webkitAudioContext)();
//         }

//         try {
//             const audioBuffer =
//                 await audioContextRef.current.decodeAudioData(audioData);
//             const sourceNode = audioContextRef.current.createBufferSource();
//             sourceNode.buffer = audioBuffer;
//             sourceNode.connect(audioContextRef.current.destination);
//             sourceNode.start();
//         } catch (error) {
//             console.error("[Sip] Error playing audio:", error);
//         }
//     };

//     const stopAudioHandling = () => {
//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach((track) => track.stop());
//         }
//         if (processorRef.current) {
//             processorRef.current.disconnect();
//         }
//         if (audioContextRef.current) {
//             audioContextRef.current.close();
//         }
//     };

//     const handleOutgoingCall = async () => {
//         try {
//             console.log(
//                 `[Sip] Initiating outgoing call to ${state.outgoingNumber}`
//             );
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     action: "call",
//                     callee: state.outgoingNumber,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(
//                     `HTTP error! status: ${response.status}, message: ${errorData.error || "Unknown error"}`
//                 );
//             }

//             const data = await response.json();
//             console.log("[Sip] Call initiated with Call ID:", data.callId);
//             setCallId(data.callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("[Sip] Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             console.log("[Sip] Hanging up call");
//             await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ action: "hangup" }),
//             });
//             setState((prevState) => ({ ...prevState, callActive: false }));
//             onCallStateChange(false);
//             stopAudioHandling();
//         } catch (error) {
//             console.error("[Sip] Failed to hang up call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleAnswer = async () => {
//         try {
//             await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ action: "answer" }),
//             });
//             setState((prevState) => ({
//                 ...prevState,
//                 callActive: true,
//                 incomingCall: false,
//             }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("[Sip] Failed to answer call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleDecline = async () => {
//         try {
//             await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ action: "decline" }),
//             });
//             setState((prevState) => ({ ...prevState, incomingCall: false }));
//         } catch (error) {
//             console.error("[Sip] Failed to decline call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     return (
//         <div className="bg-black min-h-screen flex items-center justify-center p-6">
//             <div className="bg-opacity-70 bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md">
//                 {state.connectionError && (
//                     <div className="text-red-500 text-sm mb-4">
//                         {state.connectionError}
//                     </div>
//                 )}
//                 <h3 className="text-white text-2xl mb-6">
//                     LLPMG WebPhone Dashboard
//                 </h3>

//                 {!state.callActive && !state.incomingCall && (
//                     <div className="outgoing-call mt-4">
//                         <h4 className="text-white text-xl mb-3">
//                             Outgoing Call
//                         </h4>
//                         <input
//                             type="text"
//                             value={state.outgoingNumber}
//                             onChange={(e) =>
//                                 setState((prevState) => ({
//                                     ...prevState,
//                                     outgoingNumber: e.target.value,
//                                 }))
//                             }
//                             placeholder="+1 234 567-8900"
//                             className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//                         />
//                         <button
//                             onClick={handleOutgoingCall}
//                             className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                         >
//                             Call
//                         </button>
//                     </div>
//                 )}
//                 {state.incomingCall && (
//                     <div className="incoming-call mt-6">
//                         <h4 className="text-white text-xl mb-4">
//                             Incoming Call from {state.callerNumber}
//                         </h4>
//                         <div className="grid grid-cols-2 gap-4">
//                             <button
//                                 onClick={handleAnswer}
//                                 className="py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                             >
//                                 Answer
//                             </button>
//                             <button
//                                 onClick={handleDecline}
//                                 className="py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                             >
//                                 Decline
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {state.callActive && (
//                     <div className="active-call mt-6">
//                         <h4 className="text-white text-xl mb-4">
//                             Call In Progress
//                         </h4>
//                         <button
//                             onClick={handleHangup}
//                             className="w-full py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                         >
//                             Hang Up
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Sip;
// number 0
