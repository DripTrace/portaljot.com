// // 0
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
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
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
//             console.error("Socket error:", error.message);
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
//             console.error("Error playing audio:", error);
//         }
//     };

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
//                 socketRef.current?.emit("audioData", audioData.buffer);
//             };
//         } catch (error) {
//             console.error("Error setting up audio handling:", error);
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
//             console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     callee: state.outgoingNumber,
//                     action: "call",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Call initiated with Call ID:", data.callId);
//             setCallId(data.callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             console.log("Hanging up call");
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
//             console.error("Failed to hang up call:", error);
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
//             console.error("Failed to answer call:", error);
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
//             setState((prevState) => ({
//                 ...prevState,
//                 incomingCall: false,
//             }));
//         } catch (error) {
//             console.error("Failed to decline call:", error);
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

//  ------- latest claude
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

//     const socketRef = useRef<Socket | null>(null);
//     const audioContextRef = useRef<AudioContext | null>(null);

//     useEffect(() => {
//         socketRef.current = io({
//             path: "/api/llpmg/sip-ws",
//             addTrailingSlash: false,
//         });

//         socketRef.current.on("connect", () => {
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
//             setState((prevState) => ({
//                 ...prevState,
//                 callActive: false,
//                 incomingCall: false,
//                 outgoingNumber: "",
//             }));
//             onCallStateChange(false);
//         });

//         socketRef.current.on("audioData", (audioData: ArrayBuffer) => {
//             playAudio(audioData);
//         });

//         socketRef.current.on("error", (error: { message: string }) => {
//             console.error("Socket error:", error.message);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: error.message,
//             }));
//         });

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//             }
//         };
//     }, [onCallStateChange]);

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
//             console.error("Error playing audio:", error);
//         }
//     };

//     const handleOutgoingCall = async () => {
//         try {
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     callee: state.outgoingNumber,
//                     action: "call",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ action: "hangup" }),
//             });
//             setState((prevState) => ({ ...prevState, callActive: false }));
//             onCallStateChange(false);
//         } catch (error) {
//             console.error("Failed to hang up call:", error);
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
//         } catch (error) {
//             console.error("Failed to answer call:", error);
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
//             console.error("Failed to decline call:", error);
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
// -------- latest claude

// looking for audio log recording and capturing from browser)
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
//     const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const processorRef = useRef<ScriptProcessorNode | null>(null);

//     const recorderRef = useRef<MediaRecorder | null>(null);
//     const recordedChunksRef = useRef<Blob[]>([]);

//     const startRecording = () => {
//         if (streamRef.current) {
//             const options = { mimeType: "audio/webm" };
//             const mediaRecorder = new MediaRecorder(streamRef.current, options);

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     recordedChunksRef.current.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(recordedChunksRef.current, {
//                     type: "audio/webm",
//                 });
//                 recordedChunksRef.current = []; // Clear recorded chunks for the next session
//                 saveRecording(blob); // Handle saving the recording
//             };

//             mediaRecorder.start();
//             recorderRef.current = mediaRecorder;
//             console.log("Recording started");
//         } else {
//             console.error("No active media stream for recording");
//         }
//     };

//     const finalizeRecording = () => {
//         if (recorderRef.current) {
//             recorderRef.current.stop();
//             console.log("Recording finalized");
//         } else {
//             console.error("No active recorder to finalize");
//         }
//     };

//     const saveRecording = (blob: Blob) => {
//         // Save the recording to a file or upload it to a server
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.style.display = "none";
//         a.href = url;
//         a.download = `call_recording_${new Date().toISOString()}.webm`;
//         document.body.appendChild(a);
//         a.click();
//         URL.revokeObjectURL(url);
//         console.log("Recording saved");
//     };

//     useEffect(() => {
//         socketRef.current = io({
//             path: "/api/llpmg/sip-ws",
//             addTrailingSlash: false,
//         });

//         socketRef.current.on("connect", () => {
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on("connect_error", (err) => {
//             console.error("Connection Error:", err.message);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: err.message,
//             }));
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
//             setState((prevState) => ({
//                 ...prevState,
//                 callActive: false,
//                 incomingCall: false,
//                 outgoingNumber: "",
//             }));
//             onCallStateChange(false);
//             stopAudioHandling();
//             finalizeRecording();
//         });

//         socketRef.current.on("audioData", (audioData: ArrayBuffer) => {
//             playAudio(audioData);
//         });

//         socketRef.current.on("error", (error: { message: string }) => {
//             console.error("Socket error:", error.message);
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

//     const playAudio = async (audioData: ArrayBuffer) => {
//         if (!audioContextRef.current) {
//             audioContextRef.current = new (window.AudioContext ||
//                 (window as any).webkitAudioContext)();
//         }

//         try {
//             const audioBuffer =
//                 await audioContextRef.current.decodeAudioData(audioData);
//             sourceNodeRef.current =
//                 audioContextRef.current.createBufferSource();
//             sourceNodeRef.current.buffer = audioBuffer;
//             sourceNodeRef.current.connect(audioContextRef.current.destination);
//             sourceNodeRef.current.start();
//         } catch (error) {
//             console.error("Error playing audio:", error);
//         }
//     };

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
//                 socketRef.current?.emit("audioData", audioData.buffer);
//             };

//             startRecording();
//         } catch (error) {
//             console.error("Error setting up audio handling:", error);
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
//             console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     callee: state.outgoingNumber,
//                     action: "call",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Call initiated with Call ID:", data.callId);
//             setCallId(data.callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             console.log("Hanging up call");
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
//             finalizeRecording();
//         } catch (error) {
//             console.error("Failed to hang up call:", error);
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
//             console.error("Failed to answer call:", error);
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
//             setState((prevState) => ({
//                 ...prevState,
//                 incomingCall: false,
//             }));
//         } catch (error) {
//             console.error("Failed to decline call:", error);
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
// looking for audio log (recording and capturing from browser)

// saving audio (logs exist, but error)
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
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
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
//             console.error("Socket error:", error.message);
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
//             console.error("Error playing audio:", error);
//         }
//     };

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
//                 socketRef.current?.emit("audioData", audioData.buffer);
//             };
//         } catch (error) {
//             console.error("Error setting up audio handling:", error);
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
//             console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     callee: state.outgoingNumber,
//                     action: "call",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Call initiated with Call ID:", data.callId);
//             setCallId(data.callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             console.log("Hanging up call");
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
//             console.error("Failed to hang up call:", error);
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
//             console.error("Failed to answer call:", error);
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
//             console.error("Failed to decline call:", error);
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
// saving audio (log exists but error)

// trying to clean up log
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
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
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
//             console.error("Socket error:", error.message);
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
//             console.error("Error playing audio:", error);
//         }
//     };

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
//                 socketRef.current?.emit("audioData", audioData.buffer);
//             };
//         } catch (error) {
//             console.error("Error setting up audio handling:", error);
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
//             console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     callee: state.outgoingNumber,
//                     action: "call",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Call initiated with Call ID:", data.callId);
//             setCallId(data.callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             console.log("Hanging up call");
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
//             console.error("Failed to hang up call:", error);
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
//             console.error("Failed to answer call:", error);
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
//             console.error("Failed to decline call:", error);
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
// cleaning logs

// gpt-4o 1st attempt (don't use breaks audio logs)
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
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
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
//             console.error("Socket error:", error.message);
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
//             console.error("Error playing audio:", error);
//         }
//     };

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
//                 socketRef.current?.emit("audioData", audioData.buffer);
//             };
//         } catch (error) {
//             console.error("Error setting up audio handling:", error);
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
//             console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     callee: state.outgoingNumber,
//                     action: "call",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Call initiated with Call ID:", data.callId);
//             setCallId(data.callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             console.log("Hanging up call");
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
//             console.error("Failed to hang up call:", error);
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
//             console.error("Failed to answer call:", error);
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
//             setState((prevState) => ({
//                 ...prevState,
//                 incomingCall: false,
//             }));
//         } catch (error) {
//             console.error("Failed to decline call:", error);
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
// gpt-4o 1st attempt (don't use breaks audio logs)

// sonnet-3.5 1st attempt
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
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setCallId(callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
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
//             console.error("Socket error:", error.message);
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
//             console.error("Error setting up audio handling:", error);
//         }
//     };

//     const sendAudioToServer = async (audioData: ArrayBuffer) => {
//         try {
//             await fetch("/api/llpmg/sip-handler", {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/octet-stream",
//                 },
//                 body: audioData,
//             });
//         } catch (error) {
//             console.error("Failed to send audio data:", error);
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
//             console.error("Error playing audio:", error);
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
//             console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//             const response = await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     callee: state.outgoingNumber,
//                     action: "call",
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Call initiated with Call ID:", data.callId);
//             setCallId(data.callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             onCallStateChange(true);
//             startAudioHandling();
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const handleHangup = async () => {
//         try {
//             console.log("Hanging up call");
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
//             console.error("Failed to hang up call:", error);
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
//             console.error("Failed to answer call:", error);
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
//             console.error("Failed to decline call:", error);
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
// sonnet-3.5 1st attempt

// gpt-4o 2nd attempt after alternate implementation (don't use broken remote hangup)
// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// const SipComponent: React.FC = () => {
//     const [state, setState] = useState({
//         outgoingNumber: "",
//         connectionError: null as string | null,
//         callActive: false,
//         incomingCall: false,
//         callerNumber: "",
//     });
//     const [muted, setMuted] = useState(false);
//     const [held, setHeld] = useState(false);
//     const socketRef = useRef<Socket | null>(null);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const recordedChunksRef = useRef<Blob[]>([]);

//     useEffect(() => {
//         socketRef.current = io({
//             path: "/api/llpmg/sip-ws",
//             addTrailingSlash: false,
//         });

//         socketRef.current.on("connect", () => {
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             setState((prevState) => ({ ...prevState, callActive: true }));
//             startRecording();
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
//             setState((prevState) => ({
//                 ...prevState,
//                 callActive: false,
//                 incomingCall: false,
//                 outgoingNumber: "",
//             }));
//             stopRecording();
//         });

//         socketRef.current.on("audioData", (audioData: ArrayBuffer) => {
//             playAudio(audioData);
//         });

//         socketRef.current.on("error", (error: { message: string }) => {
//             console.error("Socket error:", error.message);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: error.message,
//             }));
//         });

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//             }
//         };
//     }, []);

//     const playAudio = async (audioData: ArrayBuffer) => {
//         const audioContext = new AudioContext();
//         const audioBuffer = await audioContext.decodeAudioData(audioData);
//         const sourceNode = audioContext.createBufferSource();
//         sourceNode.buffer = audioBuffer;
//         sourceNode.connect(audioContext.destination);
//         sourceNode.start();
//     };

//     const startRecording = () => {
//         const remoteAudio = document.getElementById(
//             "remoteAudio"
//         ) as HTMLAudioElement;

//         if (remoteAudio && remoteAudio.srcObject) {
//             const mediaRecorder = new MediaRecorder(
//                 remoteAudio.srcObject as MediaStream
//             );

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     recordedChunksRef.current.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(recordedChunksRef.current, {
//                     type: "audio/ogg; codecs=opus",
//                 });
//                 recordedChunksRef.current = [];
//                 const recordedURL = URL.createObjectURL(blob);
//                 console.log("Recorded audio available at:", recordedURL);
//             };

//             mediaRecorder.start();
//             mediaRecorderRef.current = mediaRecorder;
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//         }
//     };

//     const handleOutgoingCall = useCallback(() => {
//         console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//         socketRef.current?.emit("startCall", { number: state.outgoingNumber });
//     }, [state.outgoingNumber]);

//     const handleHangup = useCallback(() => {
//         console.log("Hanging up call");
//         socketRef.current?.emit("hangupCall");
//     }, []);

//     const toggleMute = useCallback(() => {
//         setMuted((prevMuted) => !prevMuted);
//         // Add logic to mute/unmute the audio stream if necessary
//     }, []);

//     const toggleHold = useCallback(() => {
//         setHeld((prevHeld) => !prevHeld);
//         // Add logic to hold/unhold the call if necessary
//     }, []);

//     return (
//         <div className="bg-black min-h-screen flex items-center justify-center p-6">
//             <div className="bg-opacity-70 bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md">
//                 <audio id="remoteAudio" hidden />
//                 <audio id="localAudio" hidden muted />
//                 {state.connectionError && (
//                     <div className="text-red-500 text-sm mb-4">
//                         {state.connectionError}
//                     </div>
//                 )}
//                 <h3 className="text-white text-2xl mb-6">
//                     LLPMG WebPhone Dashboard
//                 </h3>

//                 {!state.callActive && (
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
//                 {state.callActive && (
//                     <div className="active-call mt-6">
//                         <h4 className="text-white text-xl mb-4">
//                             Call In Progress
//                         </h4>
//                         <div className="grid grid-cols-2 gap-4">
//                             <button
//                                 onClick={toggleMute}
//                                 className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
//                             >
//                                 {muted ? "Unmute" : "Mute"}
//                             </button>
//                             <button
//                                 onClick={toggleHold}
//                                 className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
//                             >
//                                 {held ? "Unhold" : "Hold"}
//                             </button>
//                             <button
//                                 onClick={handleHangup}
//                                 className="col-span-2 py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                             >
//                                 Hang Up
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SipComponent;
// gpt-4o 2nd attempt after alternate implementation (don't use broken remote hangup)

// removed for sonnet-3.5 14th attempt
// sonnet-3.5 2nd attempt
// components/LLPMG/sip/Sip.tsx
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
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
//         muted: false,
//         held: false,
//         // added for sonnet-3.5 9th attempt
//         callInitiated: false, // New state to track call initiation
//         // added for sonnet-3.5 9th attempt
//         // added for sonnet-3.5 10th attempt
//         callState: "idle" as
//             | "idle"
//             | "initiating"
//             | "ringing"
//             | "active"
//             | "ended",
//         // added for sonnet-3.5 10th attempt
//     });

//     const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
//     const socketRef = useRef<Socket | null>(null);
//     const audioContextRef = useRef<AudioContext | null>(null);
//     const streamRef = useRef<MediaStream | null>(null);
//     const processorRef = useRef<ScriptProcessorNode | null>(null);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const recordedChunksRef = useRef<Blob[]>([]);

//     useEffect(() => {
//         socketRef.current = io({
//             path: "/api/llpmg/sip-ws",
//             addTrailingSlash: false,
//         });

//         socketRef.current.on("connect", () => {
//             console.log("Socket.IO connected");
//         });

//         socketRef.current.on(
//             "incomingCall",
//             (data: { callerNumber: string }) => {
//                 console.log("Incoming call detected", data);
//                 setState((prevState) => ({
//                     ...prevState,
//                     incomingCall: true,
//                     callerNumber: data.callerNumber,
//                 }));
//             }
//         );

//         // added for sonnet-3.5 7th attempt
//         socketRef.current.on("callInitiated", ({ callId }) => {
//             console.log("Call initiated with ID:", callId);
//             // removed for sonnet-3.5 9th attempt
//             // setState((prevState) => ({ ...prevState, callActive: true }));
//             // removed for sonnet-3.5 9th attempt
//             // removed for sonnet-3.5 10th attempt
//             // added for sonnet-3.5 9th attempt
//             // setState((prevState) => ({ ...prevState, callInitiated: true }));
//             // added for sonnet-3.5 9th attempt
//             // removed for sonnet-3.5 10th attempt
//             // added for sonnet-3.5 10th attempt
//             setState((prevState) => ({
//                 ...prevState,
//                 callState: "initiating",
//             }));
//             // added for sonnet-3.5 10th attempt
//             onCallStateChange(true);
//             // removed for sonnet-3.5 10th attempt
//             // added for sonnet-3.5 8th attempt
//             // startAudioHandling();
//             // added for sonnet-3.5 8th attempt
//             // removed for sonnet-3.5 10th attempt
//         });
//         // added for sonnet-3.5 7th attempt

//         // added for sonnet-3.5 10th attempt
//         socketRef.current.on("callRinging", () => {
//             console.log("Call is ringing");
//             setState((prev) => ({ ...prev, callState: "ringing" }));
//         });
//         // added for sonnet-3.5 10th attempt

//         socketRef.current.on("callStarted", ({ callId }) => {
//             console.log("Call started with ID:", callId);
//             // added for sonnet-3.5 10th attempt
//             setState((prev) => ({ ...prev, callState: "active" }));
//             // added for sonnet-3.5 10th attempt
//             // removed for sonnet-3.5 7th attempt
//             // setState((prevState) => ({ ...prevState, callActive: true }));
//             // onCallStateChange(true);
//             // removed for sonnet-3.5 7th attempt
//             startAudioHandling();
//             // removed for sonnet-3.5 10th attempt
//             // removing for sonnet-3.5 7th attempt
//             // startRecording();
//             // removing for sonnet-3.5 7th attempt
//             // removed for sonnet-3.5 10th attempt
//         });

//         socketRef.current.on("callEnded", () => {
//             console.log("Call ended event received");
//             setState((prevState) => ({
//                 ...prevState,
//                 callActive: false,
//                 incomingCall: false,
//                 outgoingNumber: "",
//             }));
//             onCallStateChange(false);
//             // removed for sonnet-3.5 9th attempt
//             // stopRecording();
//             // removed for sonnet-3.5 9th attempt
//             stopAudioHandling();

//             // added for sonnet-3.5 10th attempt
//             // Reset to idle state after a short delay
//             setTimeout(() => {
//                 setState((prev) => ({ ...prev, callState: "idle" }));
//             }, 3000);
//             // added for sonnet-3.5 10th attempt
//         });

//         socketRef.current.on("audioData", (audioData: ArrayBuffer) => {
//             playAudio(audioData);
//         });

//         socketRef.current.on("error", (error: { message: string }) => {
//             console.error("Socket error:", error.message);
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
//             console.error("Error setting up audio handling:", error);
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

//     const sendAudioToServer = async (audioData: ArrayBuffer) => {
//         try {
//             await fetch("/api/llpmg/sip-handler", {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/octet-stream",
//                 },
//                 body: audioData,
//             });
//         } catch (error) {
//             console.error("Failed to send audio data:", error);
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
//             console.error("Error playing audio:", error);
//         }
//     };

//     // removed for sonnet-3.5 5th attempt
//     // const handleOutgoingCall = async () => {
//     //     try {
//     //         console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//     //         const response = await fetch("/api/llpmg/sip-handler", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify({
//     //                 callee: state.outgoingNumber,
//     //                 action: "call",
//     //             }),
//     //         });

//     //         if (!response.ok) {
//     //             throw new Error(`HTTP error! status: ${response.status}`);
//     //         }

//     //         const data = await response.json();
//     //         console.log("Call initiated with Call ID:", data.callId);
//     //     } catch (error) {
//     //         console.error("Failed to initiate call:", error);
//     //         setState((prevState) => ({
//     //             ...prevState,
//     //             connectionError: (error as Error).message,
//     //         }));
//     //     }
//     // };
//     // added for sonnet-3.5 5th attempt

//     // removed for sonnet-3.5 11th attempt
//     // const handleOutgoingCall = async () => {
//     //     try {
//     //         console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//     //         const response = await fetch("/api/llpmg/sip-handler", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify({
//     //                 callee: state.outgoingNumber,
//     //                 action: "call",
//     //             }),
//     //         });

//     //         if (!response.ok) {
//     //             // added for sonnet-3.5 6th attempt
//     //             const errorData = await response.json();
//     //             // added for sonnet-3.5 6th attempt
//     //             // removed for sonnet-3.5 6th attempt
//     //             // throw new Error(`HTTP error! status: ${response.status}`);
//     //             // removed for sonnet-3.5 6th attempt
//     //             // added for sonnet-3.5 6th attempt
//     //             throw new Error(
//     //                 errorData.details ||
//     //                     `HTTP error! status: ${response.status}`
//     //             );
//     //             // added for sonnet-3.5 6th attempt
//     //         }

//     //         const data = await response.json();
//     //         console.log("Call initiated with Call ID:", data.callId);
//     //         // removed for sonnet-3.5 8th attempt
//     //         // setState((prevState) => ({ ...prevState, callActive: true }));
//     //         // onCallStateChange(true);
//     //         // startAudioHandling();
//     //         // removed for sonnet-3.5 8th attempt
//     //         // removed for sonnet-3.5 10th attempt
//     //         // added for sonnet-3.5 9th attempt
//     //         // setState((prevState) => ({ ...prevState, callInitiated: true }));
//     //         // added for sonnet-3.5 9th attempt
//     //         // removed for sonnet-3.5 10th attempt
//     //     } catch (error) {
//     //         console.error("Failed to initiate call:", error);
//     //         setState((prevState) => ({
//     //             ...prevState,
//     //             connectionError: (error as Error).message,
//     //             // added for sonnet-3.5 10th attempt
//     //             callState: "idle",
//     //             // added for sonnet-3.5 10th attempt
//     //         }));
//     //     }
//     // };
//     // removed for sonnet-3.5 11th attempt

//     // removed for sonnet-3.5 13th attempt
//     // added for sonnet-3.5 11th attempt
//     // const handleOutgoingCall = async () => {
//     //     try {
//     //         setState((prev) => ({ ...prev, callState: "initiating" }));
//     //         console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
//     //         const response = await fetch("/api/llpmg/sip-handler", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             },
//     //             body: JSON.stringify({
//     //                 action: "call",
//     //                 callee: state.outgoingNumber,
//     //             }),
//     //         });

//     //         if (!response.ok) {
//     //             const errorData = await response.json();
//     //             throw new Error(
//     //                 errorData.error || `HTTP error! status: ${response.status}`
//     //             );
//     //         }

//     //         const data = await response.json();
//     //         console.log("Call initiated with Call ID:", data.callId);
//     //     } catch (error) {
//     //         console.error("Failed to initiate call:", error);
//     //         setState((prev) => ({
//     //             ...prev,
//     //             connectionError: (error as Error).message,
//     //             callState: "idle",
//     //         }));
//     //     }
//     // };
//     // added for sonnet-3.5 11th attempt
//     // removed for sonnet-3.5 13th attempt

//     // added for sonnet-3.5 13th attempt
//     const handleOutgoingCall = async () => {
//         try {
//             setState((prev) => ({ ...prev, callState: "initiating" }));
//             console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
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

//             console.log("Response status:", response.status);
//             const responseData = await response.json();
//             console.log("Response data:", responseData);

//             if (!response.ok) {
//                 throw new Error(
//                     responseData.error ||
//                         `HTTP error! status: ${response.status}`
//                 );
//             }

//             console.log("Call initiated with Call ID:", responseData.callId);
//         } catch (error) {
//             console.error("Failed to initiate call:", error);
//             setState((prev) => ({
//                 ...prev,
//                 connectionError: (error as Error).message,
//                 callState: "idle",
//             }));
//         }
//     };
//     // added for sonnet-3.5 13th attempt

//     const handleHangup = async () => {
//         try {
//             console.log("Hanging up call");
//             await fetch("/api/llpmg/sip-handler", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ action: "hangup" }),
//             });
//         } catch (error) {
//             console.error("Failed to hang up call:", error);
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
//         } catch (error) {
//             console.error("Failed to answer call:", error);
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
//             console.error("Failed to decline call:", error);
//             setState((prevState) => ({
//                 ...prevState,
//                 connectionError: (error as Error).message,
//             }));
//         }
//     };

//     const startRecording = useCallback(() => {
//         if (streamRef.current) {
//             const mediaRecorder = new MediaRecorder(streamRef.current);

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     recordedChunksRef.current.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(recordedChunksRef.current, {
//                     type: "audio/ogg; codecs=opus",
//                 });
//                 recordedChunksRef.current = [];
//                 const recordedURL = URL.createObjectURL(blob);
//                 setRecordedAudio(recordedURL);
//             };

//             mediaRecorder.start();
//             mediaRecorderRef.current = mediaRecorder;
//         }
//     }, []);

//     const stopRecording = useCallback(() => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//         }
//     }, []);

//     const toggleMute = useCallback(() => {
//         setState((prevState) => ({ ...prevState, muted: !prevState.muted }));
//         // Implement mute functionality here
//     }, []);

//     const toggleHold = useCallback(() => {
//         setState((prevState) => ({ ...prevState, held: !prevState.held }));
//         // Implement hold functionality here
//     }, []);

//     // ... (implement other call control functions like handlePark, handleTransfer, handleFlip, handleDTMF, adjustVolume)

//     // removed for sonnet-3.5 10th attempt
//     // return (
//     //     <div className="bg-black min-h-screen flex items-center justify-center p-6">
//     //         <div className="bg-opacity-70 bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md">
//     //             {state.connectionError && (
//     //                 <div className="text-red-500 text-sm mb-4">
//     //                     {state.connectionError}
//     //                 </div>
//     //             )}
//     //             <h3 className="text-white text-2xl mb-6">
//     //                 LLPMG WebPhone Dashboard
//     //             </h3>
//     //             {/* removed for sonnet-3.5 9th attempt */}
//     //             {/* {!state.callActive && !state.incomingCall && ( */}
//     //             {/* removed for sonnet-3.5 9th attempt */}
//     //             {/* addedfor sonnet-3.5 9th attempt */}
//     //             {!state.callActive &&
//     //                 !state.callInitiated &&
//     //                 !state.incomingCall && (
//     //                     // {/* addedfor sonnet-3.5 9th attempt */}
//     //                     <div className="outgoing-call mt-4">
//     //                         <h4 className="text-white text-xl mb-3">
//     //                             Outgoing Call
//     //                         </h4>
//     //                         <input
//     //                             type="text"
//     //                             value={state.outgoingNumber}
//     //                             onChange={(e) =>
//     //                                 setState((prevState) => ({
//     //                                     ...prevState,
//     //                                     outgoingNumber: e.target.value,
//     //                                 }))
//     //                             }
//     //                             placeholder="+1 234 567-8900"
//     //                             className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//     //                         />
//     //                         <button
//     //                             onClick={handleOutgoingCall}
//     //                             className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//     //                         >
//     //                             Call
//     //                         </button>
//     //                     </div>
//     //                 )}
//     //             {state.incomingCall && (
//     //                 <div className="incoming-call mt-6">
//     //                     <h4 className="text-white text-xl mb-4">
//     //                         Incoming Call from {state.callerNumber}
//     //                     </h4>
//     //                     <div className="grid grid-cols-2 gap-4">
//     //                         <button
//     //                             onClick={handleAnswer}
//     //                             className="py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//     //                         >
//     //                             Answer
//     //                         </button>
//     //                         <button
//     //                             onClick={handleDecline}
//     //                             className="py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//     //                         >
//     //                             Decline
//     //                         </button>
//     //                     </div>
//     //                 </div>
//     //                 // {/* removed for sonnet-3.5 9th attempt */}
//     //             )}
//     //             {/* {state.callActive && ( */}
//     //             {/* removed for sonnet-3.5 9th attempt */}
//     //             {/* addedfor sonnet-3.5 9th attempt */}

//     //             {(state.callActive || state.callInitiated) && (
//     //                 // {/* addedfor sonnet-3.5 9th attempt */}

//     //                 <div className="active-call mt-6">
//     //                     <h4 className="text-white text-xl mb-4">
//     //                         Call In Progress
//     //                     </h4>
//     //                     <div className="grid grid-cols-2 gap-4">
//     //                         <button
//     //                             onClick={toggleMute}
//     //                             className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
//     //                         >
//     //                             {state.muted ? "Unmute" : "Mute"}
//     //                         </button>
//     //                         <button
//     //                             onClick={toggleHold}
//     //                             className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
//     //                         >
//     //                             {state.held ? "Unhold" : "Hold"}
//     //                         </button>
//     //                         {/* Add more call control buttons here */}
//     //                         <button
//     //                             onClick={handleHangup}
//     //                             className="col-span-2 py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//     //                         >
//     //                             Hang Up
//     //                         </button>
//     //                     </div>
//     //                 </div>
//     //             )}
//     //             {recordedAudio && (
//     //                 <div className="recording-playback mt-6">
//     //                     <h3 className="text-white text-xl mb-3">
//     //                         Recorded Audio
//     //                     </h3>
//     //                     <audio
//     //                         controls
//     //                         src={recordedAudio}
//     //                         className="w-full rounded-lg bg-gray-800 p-2"
//     //                     ></audio>
//     //                 </div>
//     //             )}
//     //         </div>
//     //     </div>
//     // );
//     // removed for sonnet-3.5 10th attempt

//     // added for sonnet-3.5 10th attempt
//     // Render function
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

//                 {state.callState === "idle" && (
//                     <div className="outgoing-call mt-4">
//                         <h4 className="text-white text-xl mb-3">
//                             Outgoing Call
//                         </h4>
//                         <input
//                             type="text"
//                             value={state.outgoingNumber}
//                             onChange={(e) =>
//                                 setState((prev) => ({
//                                     ...prev,
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
//                 {["initiating", "ringing", "active"].includes(
//                     state.callState
//                 ) && (
//                     <div className="active-call mt-6">
//                         <h4 className="text-white text-xl mb-4">
//                             {state.callState === "initiating"
//                                 ? "Initiating Call..."
//                                 : state.callState === "ringing"
//                                   ? "Ringing..."
//                                   : "Call In Progress"}
//                         </h4>
//                         <button
//                             onClick={handleHangup}
//                             className="w-full py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
//                         >
//                             Hang Up
//                         </button>
//                     </div>
//                 )}
//                 {state.callState === "ended" && (
//                     <div className="call-ended mt-6">
//                         <h4 className="text-white text-xl mb-4">Call Ended</h4>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
//     // added for sonnet-3.5 10th attempt
// };

// export default Sip;
// sonnet-3.5 2nd attempt
// removing for sonnet-3.5 14th attempt

// doesn't work
// added for sonnet-3.5 14th attempt
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface SipProps {
    onCallStateChange: (isActive: boolean) => void;
}

const Sip: React.FC<SipProps> = ({ onCallStateChange }) => {
    const [state, setState] = useState({
        outgoingNumber: "",
        connectionError: null as string | null,
        callState: "idle" as
            | "idle"
            | "initiating"
            | "ringing"
            | "active"
            | "ended",
        incomingCall: false,
        callerNumber: "",
    });

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
            console.log("Socket.IO connected");
        });

        socketRef.current.on("callInitiated", ({ callId }) => {
            console.log("Call initiated with ID:", callId);
            setState((prev) => ({ ...prev, callState: "initiating" }));
            onCallStateChange(true);
        });

        socketRef.current.on("callRinging", () => {
            console.log("Call is ringing");
            setState((prev) => ({ ...prev, callState: "ringing" }));
        });

        socketRef.current.on("callStarted", ({ callId }) => {
            console.log("Call started with ID:", callId);
            setState((prev) => ({ ...prev, callState: "active" }));
            startAudioHandling();
        });

        socketRef.current.on("callEnded", () => {
            console.log("Call ended event received");
            setState((prev) => ({
                ...prev,
                callState: "ended",
                incomingCall: false,
                outgoingNumber: "",
            }));
            onCallStateChange(false);
            stopAudioHandling();

            setTimeout(() => {
                setState((prev) => ({ ...prev, callState: "idle" }));
            }, 3000);
        });

        socketRef.current.on("incomingCall", ({ callerNumber }) => {
            console.log("Incoming call from:", callerNumber);
            setState((prev) => ({ ...prev, incomingCall: true, callerNumber }));
        });

        socketRef.current.on("audioData", (audioData: ArrayBuffer) => {
            playAudio(audioData);
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
            console.error("Error setting up audio handling:", error);
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
            console.error("Failed to send audio data:", error);
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
            console.error("Error playing audio:", error);
        }
    };

    const handleOutgoingCall = async () => {
        try {
            setState((prev) => ({ ...prev, callState: "initiating" }));
            console.log(`Initiating outgoing call to ${state.outgoingNumber}`);
            const response = await fetch("/api/llpmg/sip-handler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "call",
                    callee: state.outgoingNumber,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Call initiated with Call ID:", data.callId);
        } catch (error) {
            console.error("Failed to initiate call:", error);
            setState((prev) => ({
                ...prev,
                connectionError: (error as Error).message,
                callState: "idle",
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
        } catch (error) {
            console.error("Failed to hang up call:", error);
            setState((prev) => ({
                ...prev,
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
        } catch (error) {
            console.error("Failed to answer call:", error);
            setState((prev) => ({
                ...prev,
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
            setState((prev) => ({ ...prev, incomingCall: false }));
        } catch (error) {
            console.error("Failed to decline call:", error);
            setState((prev) => ({
                ...prev,
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

                {state.callState === "idle" && !state.incomingCall && (
                    <div className="outgoing-call mt-4">
                        <h4 className="text-white text-xl mb-3">
                            Outgoing Call
                        </h4>
                        <input
                            type="text"
                            value={state.outgoingNumber}
                            onChange={(e) =>
                                setState((prev) => ({
                                    ...prev,
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
                {["initiating", "ringing", "active"].includes(
                    state.callState
                ) && (
                    <div className="active-call mt-6">
                        <h4 className="text-white text-xl mb-4">
                            {state.callState === "initiating"
                                ? "Initiating Call..."
                                : state.callState === "ringing"
                                  ? "Ringing..."
                                  : "Call In Progress"}
                        </h4>
                        <button
                            onClick={handleHangup}
                            className="w-full py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            Hang Up
                        </button>
                    </div>
                )}
                {state.callState === "ended" && (
                    <div className="call-ended mt-6">
                        <h4 className="text-white text-xl mb-4">Call Ended</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sip;
// added for sonnet-3.5 14th attempt
// doesn't work
