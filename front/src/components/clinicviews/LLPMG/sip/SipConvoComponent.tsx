"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebPhone, { WebPhoneOptions } from "@/ref/web/src";
import { WebPhoneInvitation, WebPhoneSession } from "@/ref/web/src/session";
import { WebPhoneUserAgent } from "@/ref/web/src/userAgent";
import {
    addPatientMessage,
    addSystemMessage,
    updateConversation,
} from "@/lib/llpmg/redux/reducers/convoReducer";
import { saveConversation } from "@/lib/llpmg/idb/convoDB";

interface SipConvoComponentProps {
    onHangup: () => void;
    initiateAuth: () => void;
    tokenData: any;
    onLogout: () => void;
    setTokenData: (data: any) => void;
}

interface GreetingResponse {
    audioUrl: string;
    greetingText: string;
}

const SipConvoComponent: React.FC<SipConvoComponentProps> = ({
    onHangup,
    initiateAuth,
    tokenData,
    onLogout,
    setTokenData,
}) => {
    const [userAgent, setUserAgent] = useState<WebPhoneUserAgent | null>(null);
    const [session, setSession] = useState<WebPhoneSession | null>(null);
    const [muted, setMuted] = useState(false);
    const [held, setHeld] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [incomingCall, setIncomingCall] = useState<WebPhoneInvitation | null>(
        null
    );
    const [outgoingNumber, setOutgoingNumber] = useState<string>("");
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [callActive, setCallActive] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [transcribedText, setTranscribedText] = useState<string>("");

    const audioContextRef = useRef<AudioContext | null>(null);
    const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
    const remoteMediaRecorderRef = useRef<MediaRecorder | null>(null);
    const remoteRecordedChunksRef = useRef<Blob[]>([]);
    const [remoteRecordedAudioUrl, setRemoteRecordedAudioUrl] = useState<
        string | null
    >(null);

    const transcriptionEnabledRef = useRef<boolean>(false);
    const isPlayingGreetingRef = useRef<boolean>(false);
    const isTranscribingRef = useRef<boolean>(false);
    const silenceTimeoutRef = useRef<number | null>(null);
    const combinedStreamRef = useRef<MediaStream | null>(null);

    const isAnalyzingRef = useRef<boolean>(false);

    const dispatch = useDispatch();
    // const conversation = useSelector((state: any) => state.convo.conversation);

    const stopAllAudioProcessing = useCallback(() => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        if (
            remoteMediaRecorderRef.current &&
            remoteMediaRecorderRef.current.state !== "inactive"
        ) {
            remoteMediaRecorderRef.current.stop();
        }
    }, []);

    const stopRecording = useCallback(async () => {
        if (
            remoteMediaRecorderRef.current &&
            remoteMediaRecorderRef.current.state !== "inactive"
        ) {
            remoteMediaRecorderRef.current.stop();
            await new Promise<void>((resolve) => {
                remoteMediaRecorderRef.current!.onstop = () => {
                    const remoteAudioBlob = new Blob(
                        remoteRecordedChunksRef.current,
                        { type: "audio/webm" }
                    );
                    const remoteAudioUrl = URL.createObjectURL(remoteAudioBlob);
                    setRemoteRecordedAudioUrl(remoteAudioUrl);
                    resolve();
                };
            });
        }
    }, []);

    const initializeWebPhone = useCallback(async (tokenData: any) => {
        try {
            const sipProvisionResponse = await fetch(
                "/api/llpmg/sip-provision",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tokenData }),
                }
            );

            if (!sipProvisionResponse.ok)
                throw new Error(
                    `HTTP error! status: ${sipProvisionResponse.status}`
                );

            const { sipProvisionData } = await sipProvisionResponse.json();
            if (!sipProvisionData)
                throw new Error("SIP Provision Data is undefined");

            const parsedSipProvisionData = JSON.parse(sipProvisionData);
            if (
                !parsedSipProvisionData.sipInfo ||
                !parsedSipProvisionData.sipInfo.length
            )
                throw new Error("Parsed SIP Info is missing or incomplete");

            const options: WebPhoneOptions = {
                logLevel: 1 as 0 | 1 | 2 | 3,
                appName: "LLPMG WebPhone",
                appVersion: "1.0.0",
                media: {
                    remote: remoteAudioRef.current as HTMLAudioElement,
                    local: document.getElementById(
                        "localAudio"
                    ) as HTMLAudioElement,
                },
                audioHelper: {
                    enabled: true,
                    incoming: "/llpmg/audio/incoming.ogg",
                    outgoing: "/llpmg/audio/outgoing.ogg",
                },
            };

            const webPhone = new WebPhone(parsedSipProvisionData, options);
            webPhone.userAgent.on("registered", () => setIsAuthenticated(true));
            webPhone.userAgent.on("unregistered", () =>
                setIsAuthenticated(false)
            );
            webPhone.userAgent.on(
                "invite",
                (incomingSession: WebPhoneInvitation) => {
                    setIncomingCall(incomingSession);
                    webPhone.userAgent.audioHelper.playIncoming(true);
                }
            );

            webPhone.userAgent.start();
            setUserAgent(webPhone.userAgent);
        } catch (error) {
            setConnectionError(
                `Failed to initialize WebPhone: ${(error as Error).message}`
            );
        }
    }, []);

    const handleConversationAnalysis = useCallback(async () => {
        console.log("Starting conversation analysis...");
        if (isAnalyzingRef.current || !callActive || !transcribedText) {
            console.log("Skipping analysis: ", {
                isAnalyzing: isAnalyzingRef.current,
                callActive,
                hasTranscribedText: !!transcribedText,
            });
            return;
        }
        isAnalyzingRef.current = true;

        try {
            console.log("Sending request to analyze-conversation...");
            const analyzeResponse = await fetch(
                "/api/llpmg/analyze-conversation",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ conversation: transcribedText }),
                }
            );

            if (!analyzeResponse.ok) {
                const errorText = await analyzeResponse.text();
                console.error(
                    "Error response from analyze-conversation:",
                    errorText
                );
                throw new Error(
                    `HTTP error! status: ${analyzeResponse.status}`
                );
            }

            const { suggestion } = await analyzeResponse.json();
            console.log("Received suggestion:", suggestion);

            console.log("Sending request to generate-conversation...");
            const generatedResponse = await fetch(
                "/api/llpmg/generate-conversation",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: suggestion }),
                }
            );

            if (!generatedResponse.ok) {
                const errorText = await generatedResponse.text();
                console.error(
                    "Error response from generate-conversation:",
                    errorText
                );
                throw new Error(
                    `HTTP error! status: ${generatedResponse.status}`
                );
            }

            const responseData = await generatedResponse.json();
            console.log("Received response data:", responseData);

            const { audioUrl, suggestionText } = responseData;

            dispatch(addSystemMessage("System: " + suggestionText));
            setTranscribedText(
                (prevText) => prevText + "\nSystem: " + suggestionText
            );
            dispatch(updateConversation(transcribedText));

            console.log("Processing audio...");
            const { stream: responseStream, ended } =
                await createMediaStreamFromAudio(audioUrl);

            await waitForPeerConnection(session!);
            const remoteStream =
                (remoteAudioRef.current?.srcObject as MediaStream) ||
                new MediaStream();
            combinedAudioStreams(
                combinedStreamRef.current!,
                remoteStream,
                responseStream
            );

            await replaceLocalAudioTrack(session!, combinedStreamRef.current!);

            ended.then(async () => {
                transcriptionEnabledRef.current = true;
                await switchBackToMicrophone(session!);
            });

            console.log("Conversation analysis completed successfully.");
        } catch (error) {
            console.error("Error in conversation analysis:", error);
            setConnectionError((error as Error).message);
        } finally {
            isAnalyzingRef.current = false;
        }
    }, [dispatch, transcribedText, callActive, session]);

    const handleKeywordDetection = useCallback(() => {
        const keywordTriggers = ["bye-bye", "thank you", "bye", "thanks"];
        return keywordTriggers.some((keyword) =>
            transcribedText.toLowerCase().includes(keyword)
        );
    }, [transcribedText]);

    useEffect(() => {
        if (!callActive || !transcribedText) {
            console.log(
                "Call not active or no transcribed text. Skipping analysis."
            );
            return;
        }

        const checkForSilenceOrKeyword = () => {
            const isKeywordDetected = handleKeywordDetection();
            console.log(
                "Checking for silence or keyword. Detected:",
                isKeywordDetected
            );
            if (isKeywordDetected) {
                console.log(
                    "Keyword detected. Triggering conversation analysis."
                );
                if (silenceTimeoutRef.current) {
                    clearTimeout(silenceTimeoutRef.current);
                }
                handleConversationAnalysis();
            }
        };

        console.log("Setting up silence timeout.");
        silenceTimeoutRef.current = window.setTimeout(() => {
            console.log(
                "Silence timeout reached. Triggering conversation analysis."
            );
            handleConversationAnalysis();
        }, 10000);

        checkForSilenceOrKeyword();

        return () => {
            if (silenceTimeoutRef.current) {
                console.log("Clearing silence timeout.");
                clearTimeout(silenceTimeoutRef.current);
            }
        };
    }, [
        transcribedText,
        handleConversationAnalysis,
        handleKeywordDetection,
        callActive,
    ]);

    const handleOutgoingCall = useCallback(() => {
        if (!userAgent || !outgoingNumber) {
            setConnectionError("Please enter a valid phone number");
            return;
        }

        userAgent.audioHelper.playOutgoing(true);
        const newSession = userAgent.invite(outgoingNumber, {});
        newSession.on("accepted", () => {
            userAgent.audioHelper.playOutgoing(false);
            handleCallAccepted(newSession);
        });
        newSession.on("terminated", () => handleCallTerminated(newSession));
        setSession(newSession);
    }, [userAgent, outgoingNumber]);

    const toggleMute = useCallback(() => {
        if (session) {
            if (muted) session.unmute?.();
            else session.mute?.();
            setMuted(!muted);
        }
    }, [session, muted]);

    const toggleHold = useCallback(() => {
        if (session) {
            if (held) session.unhold?.();
            else session.hold?.();
            setHeld(!held);
        }
    }, [session, held]);

    const adjustVolume = useCallback((direction: number) => {
        if (remoteAudioRef.current) {
            remoteAudioRef.current.volume = Math.min(
                Math.max(remoteAudioRef.current.volume + direction, 0),
                1
            );
        }
    }, []);

    const handleHangup = useCallback(async () => {
        if (session) {
            try {
                await session.dispose();
            } catch (error) {
                console.error("Error terminating the call:", error);
            }
        }
        await stopRecording();
        stopAllAudioProcessing();
        setSession(null);
        setCallActive(false);
        setCallEnded(true);
        onHangup();
    }, [session, stopRecording, stopAllAudioProcessing, onHangup]);

    const generateGreeting = useCallback(async (callerNumber: string) => {
        try {
            const response = await fetch("/api/llpmg/generate-greeting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    remoteCaller: { remoteNumber: callerNumber },
                }),
            });
            if (response.ok) {
                const data: GreetingResponse = await response.json();
                return { audioUrl: data.audioUrl, text: data.greetingText };
            }
            return null;
        } catch (error) {
            console.error("Error generating greeting:", error);
            return null;
        }
    }, []);

    const createMediaStreamFromAudio = async (
        audioUrl: string
    ): Promise<{ stream: MediaStream; ended: Promise<void> }> => {
        const audioContext = new AudioContext();
        if (audioContext.state === "suspended") await audioContext.resume();
        const response = await fetch(audioUrl);
        if (!response.ok)
            throw new Error(
                `Failed to fetch audio file: ${response.statusText}`
            );
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);
        source.start();
        const ended = new Promise<void>((resolve) => {
            source.onended = () => {
                audioContext.close();
                resolve();
            };
        });
        return { stream: destination.stream, ended };
    };

    const combinedAudioStreams = useCallback((...streams: MediaStream[]) => {
        const audioContext = new AudioContext();
        const destination = audioContext.createMediaStreamDestination();

        streams.forEach((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(destination);
        });

        combinedStreamRef.current = destination.stream;
    }, []);

    const replaceLocalAudioTrack = async (
        session: WebPhoneSession,
        newStream: MediaStream
    ) => {
        const sdh = session.sessionDescriptionHandler as any;
        const peerConnection = sdh.peerConnection as RTCPeerConnection;
        const newAudioTrack = newStream.getAudioTracks()[0];
        const senders = peerConnection.getSenders();
        const audioSender = senders.find(
            (sender: RTCRtpSender) =>
                sender.track && sender.track.kind === "audio"
        );
        if (audioSender) await audioSender.replaceTrack(newAudioTrack);
    };

    const switchBackToMicrophone = async (session: WebPhoneSession) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        const sdh = session.sessionDescriptionHandler as any;
        const peerConnection = sdh.peerConnection as RTCPeerConnection;
        const newAudioTrack = stream.getAudioTracks()[0];
        const senders = peerConnection.getSenders();
        const audioSender = senders.find(
            (sender: RTCRtpSender) =>
                sender.track && sender.track.kind === "audio"
        );
        if (audioSender) await audioSender.replaceTrack(newAudioTrack);
    };

    const startRecording = useCallback(async (session: WebPhoneSession) => {
        remoteRecordedChunksRef.current = [];
        while (!combinedStreamRef.current)
            await new Promise((resolve) => setTimeout(resolve, 100));
        const options = { mimeType: "audio/webm;codecs=opus" };
        const combinedMediaRecorder = new MediaRecorder(
            combinedStreamRef.current!,
            options
        );
        combinedMediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0)
                remoteRecordedChunksRef.current.push(event.data);
        };
        combinedMediaRecorder.start();
        remoteMediaRecorderRef.current = combinedMediaRecorder;
        setupAudioProcessing(combinedStreamRef.current!);
    }, []);

    const setupAudioProcessing = useCallback((stream: MediaStream) => {
        audioContextRef.current = new AudioContext();
        const sourceNode =
            audioContextRef.current.createMediaStreamSource(stream);
        const scriptProcessorNode =
            audioContextRef.current.createScriptProcessor(4096, 1, 1);
        sourceNode.connect(scriptProcessorNode);

        let silenceStart: number | null = null;
        const silenceThreshold = 0.0005;
        const silenceDuration = 300;

        scriptProcessorNode.onaudioprocess = (event: AudioProcessingEvent) => {
            const input = event.inputBuffer.getChannelData(0);
            const sum = input.reduce(
                (acc: number, val: number) => acc + Math.abs(val),
                0
            );
            const average = sum / input.length;
            if (average < silenceThreshold) {
                if (silenceStart === null) silenceStart = Date.now();
                else if (Date.now() - silenceStart >= silenceDuration) {
                    transcribeAudio();
                    silenceStart = null;
                }
            } else silenceStart = null;
        };

        scriptProcessorNode.connect(audioContextRef.current.destination);
    }, []);

    const transcribeAudio = useCallback(async () => {
        if (isTranscribingRef.current) return;
        isTranscribingRef.current = true;
        if (!combinedStreamRef.current) {
            isTranscribingRef.current = false;
            return;
        }

        const stream = combinedStreamRef.current;
        const options = { mimeType: "audio/webm;codecs=opus" };

        const recorder = new MediaRecorder(stream, options);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) chunks.push(event.data);
        };

        recorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: options.mimeType });
            const base64data = await blobToBase64(audioBlob);

            const response = await fetch("/api/llpmg/speech-to-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ audio: base64data }),
            });

            if (response.ok) {
                const data = await response.json();
                const filteredTranscription = filterTranscription(data.result);
                if (filteredTranscription) {
                    setTranscribedText(
                        (prevText) =>
                            prevText + "\nPatient: " + filteredTranscription
                    );
                    dispatch(
                        addPatientMessage("\nPatient: " + filteredTranscription)
                    );
                }
            }

            isTranscribingRef.current = false;
        };

        recorder.start();
        setTimeout(() => recorder.stop(), 5000);
    }, [dispatch]);

    const waitForPeerConnection = async (session: WebPhoneSession) => {
        while (
            !session.sessionDescriptionHandler ||
            !(session.sessionDescriptionHandler as any).peerConnection
        )
            await new Promise((resolve) => setTimeout(resolve, 100));
    };

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = (reader.result as string).split(",")[1];
                base64
                    ? resolve(base64)
                    : reject("Failed to convert blob to base64");
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(blob);
        });
    };

    const filterTranscription = (text: string): string => {
        const wordsToFilter = ["thank you", "bye-bye"];
        const words = text.toLowerCase().split(" ");
        return words.filter((word) => !wordsToFilter.includes(word)).join(" ");
    };

    const handleCallAccepted = useCallback(
        async (session: WebPhoneSession) => {
            console.log("Call accepted", session);
            userAgent?.audioHelper.playOutgoing(false);
            userAgent?.audioHelper.playIncoming(false);
            setCallActive(true);
            setCallEnded(false);
            setSession(session);
            transcriptionEnabledRef.current = false;
            isPlayingGreetingRef.current = true;

            try {
                const remoteNumber =
                    session.remoteIdentity?.uri?.user || "unknown";
                console.log("Remote number:", remoteNumber);
                const greetingData = await generateGreeting(remoteNumber);
                if (greetingData) {
                    const { audioUrl, text } = greetingData;
                    console.log("Greeting generated", { audioUrl, text });
                    const { stream: greetingStream, ended } =
                        await createMediaStreamFromAudio(audioUrl);

                    await waitForPeerConnection(session);
                    const remoteStream =
                        (remoteAudioRef.current?.srcObject as MediaStream) ||
                        new MediaStream();
                    combinedAudioStreams(greetingStream, remoteStream);
                    await replaceLocalAudioTrack(session, greetingStream);
                    await startRecording(session);

                    ended.then(async () => {
                        console.log("Greeting ended");
                        isPlayingGreetingRef.current = false;
                        transcriptionEnabledRef.current = true;
                        await switchBackToMicrophone(session);
                        setTranscribedText(
                            (prevText) => prevText + "\nSystem: " + text
                        );
                        dispatch(addSystemMessage("\nSystem: " + text));
                    });
                } else {
                    console.log("No greeting generated, starting recording");
                    transcriptionEnabledRef.current = true;
                    // added
                    const remoteStream =
                        (remoteAudioRef.current?.srcObject as MediaStream) ||
                        new MediaStream();
                    combinedAudioStreams(remoteStream);
                    await startRecording(session);
                }
            } catch (error) {
                console.error("Error in handleCallAccepted:", error);
                transcriptionEnabledRef.current = true;
                // added
                const remoteStream =
                    (remoteAudioRef.current?.srcObject as MediaStream) ||
                    new MediaStream();
                combinedAudioStreams(remoteStream);
                await startRecording(session);
            }

            session.on("terminated", () => handleCallTerminated(session));
        },
        [
            userAgent,
            dispatch,
            generateGreeting,
            combinedAudioStreams,
            startRecording,
            replaceLocalAudioTrack,
            switchBackToMicrophone,
        ]
    );

    const handleCallTerminated = useCallback(
        async (session: WebPhoneSession) => {
            userAgent?.audioHelper.playOutgoing(false);
            userAgent?.audioHelper.playIncoming(false);
            setCallActive(false);
            setCallEnded(true);
            await stopRecording();
            stopAllAudioProcessing();
            onHangup();

            saveConversation({
                transcript: transcribedText,
                audioUrl: remoteRecordedAudioUrl!,
                date: new Date(),
            });
        },
        [
            userAgent,
            stopRecording,
            stopAllAudioProcessing,
            onHangup,
            transcribedText,
            remoteRecordedAudioUrl,
        ]
    );

    const handleIncomingCall = useCallback(
        (action: "accept" | "decline" | "toVoicemail") => {
            if (!incomingCall) return;
            userAgent?.audioHelper.playIncoming(false);

            switch (action) {
                case "accept":
                    incomingCall.accept();
                    incomingCall.on("accepted", () => {
                        console.log("Incoming call accepted");
                        setCallActive(true);
                        setCallEnded(false);
                        handleCallAccepted(incomingCall);
                    });
                    incomingCall.on("terminated", () => {
                        console.log("Incoming call terminated");
                        handleCallTerminated(incomingCall);
                    });
                    setSession(incomingCall);
                    break;
                case "decline":
                    incomingCall.reject();
                    break;
                case "toVoicemail":
                    incomingCall.toVoicemail?.();
                    break;
            }

            setIncomingCall(null);
        },
        [incomingCall, userAgent, handleCallAccepted, handleCallTerminated]
    );

    const handlePark = useCallback(() => {
        if (session) {
            session.park?.();
        }
    }, [session]);

    const handleTransfer = useCallback(() => {
        if (session) {
            const transferNumber = prompt("Enter the number to transfer to:");
            if (transferNumber) {
                session.transfer?.(transferNumber);
            }
        }
    }, [session]);

    const handleFlip = useCallback(() => {
        if (session) {
            const flipNumber = prompt("Enter the number to flip to:");
            if (flipNumber) {
                session.flip?.(flipNumber);
            }
        }
    }, [session]);

    const handleDTMF = useCallback(() => {
        if (session) {
            const digit = prompt("Enter the DTMF digit:");
            if (digit) {
                session.dtmf?.(digit);
            }
        }
    }, [session]);

    useEffect(() => {
        remoteAudioRef.current = document.getElementById(
            "remoteAudio"
        ) as HTMLAudioElement;
        if (remoteAudioRef.current) {
            remoteAudioRef.current.onloadedmetadata = () => {
                remoteAudioRef.current!.muted = false;
            };
        }
        if (tokenData) {
            const parsedTokenData =
                typeof tokenData === "string"
                    ? JSON.parse(tokenData)
                    : tokenData;
            initializeWebPhone(parsedTokenData);
        }
        return () => stopAllAudioProcessing();
    }, [tokenData, stopAllAudioProcessing, initializeWebPhone]);

    return (
        <div className="bg-black min-h-screen flex items-center justify-center p-6">
            <div className="bg-opacity-70 bg-gray-800 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md">
                <audio id="remoteAudio" ref={remoteAudioRef} hidden />
                <audio id="localAudio" hidden muted />
                {connectionError && (
                    <div className="text-red-500 text-sm mb-4">
                        {connectionError}
                    </div>
                )}
                {!isAuthenticated ? (
                    <div className="auth flex flex-col items-center">
                        <button
                            onClick={() => initiateAuth()}
                            className="auth-button text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            Authorize
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-white text-2xl mb-6">
                            LLPMG WebPhone Dashboard
                        </h3>
                        <button
                            onClick={() => onLogout()}
                            className="text-sm text-gray-400 hover:text-white mb-4"
                        >
                            Logout
                        </button>
                        {!callActive && (
                            <div className="outgoing-call mt-4">
                                <h4 className="text-white text-xl mb-3">
                                    Outgoing Call
                                </h4>
                                <input
                                    type="text"
                                    value={outgoingNumber}
                                    onChange={(e) =>
                                        setOutgoingNumber(e.target.value)
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
                        {callActive && (
                            <div className="active-call mt-6">
                                <h4 className="text-white text-xl mb-4">
                                    Call In Progress
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={toggleMute}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        {muted ? "Unmute" : "Mute"}
                                    </button>
                                    <button
                                        onClick={toggleHold}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        {held ? "Unhold" : "Hold"}
                                    </button>
                                    <button
                                        onClick={handlePark}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        Park
                                    </button>
                                    <button
                                        onClick={handleTransfer}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        Transfer
                                    </button>
                                    <button
                                        onClick={handleFlip}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        Flip
                                    </button>
                                    <button
                                        onClick={handleDTMF}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        Send DTMF
                                    </button>
                                    <button
                                        onClick={() => adjustVolume(0.1)}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        + Volume
                                    </button>
                                    <button
                                        onClick={() => adjustVolume(-0.1)}
                                        className="py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300"
                                    >
                                        - Volume
                                    </button>
                                    <button
                                        onClick={handleHangup}
                                        className="col-span-2 py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                                    >
                                        Hang Up
                                    </button>
                                </div>
                            </div>
                        )}
                        {(callActive || callEnded) && (
                            <div className="transcription mt-6">
                                <h4 className="text-white text-xl mb-4">
                                    {callEnded
                                        ? "Call Transcription"
                                        : "Live Transcription"}
                                </h4>
                                <div className="bg-gray-700 p-4 rounded-lg text-white max-h-40 overflow-y-auto">
                                    {transcribedText ||
                                        "Transcription will appear here..."}
                                </div>
                            </div>
                        )}
                        {callEnded && remoteRecordedAudioUrl && (
                            <div className="recorded-audio mt-6">
                                <h4 className="text-white text-xl mb-4">
                                    Recorded Audio
                                </h4>
                                <h5 className="text-white text-lg mb-2">
                                    Call Audio
                                </h5>
                                <audio
                                    controls
                                    src={remoteRecordedAudioUrl}
                                    className="w-full"
                                />
                            </div>
                        )}
                        {incomingCall && (
                            <div className="incoming-call mt-6">
                                <h3 className="text-white text-xl mb-3">
                                    Incoming Call
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() =>
                                            handleIncomingCall("accept")
                                        }
                                        className="py-2 text-white bg-green-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                                    >
                                        Answer
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleIncomingCall("decline")
                                        }
                                        className="py-2 text-white bg-red-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleIncomingCall("toVoicemail")
                                        }
                                        className="py-2 text-white bg-yellow-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                                    >
                                        To Voicemail
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SipConvoComponent;
