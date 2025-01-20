"use client";

import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";

const WebRTCAudio = forwardRef((props, ref) => {
    const [peerConnection, setPeerConnection] =
        useState<RTCPeerConnection | null>(null);
    const localAudioRef = useRef<HTMLAudioElement>(null);
    const remoteAudioRef = useRef<HTMLAudioElement>(null);
    const [isLogging, setIsLogging] = useState(false);

    useImperativeHandle(ref, () => ({
        startCall: handleStartCall,
    }));

    useEffect(() => {
        console.log("initializing web rtc from webrtc audio");

        const initWebRTC = async () => {
            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            });

            pc.ontrack = (event) => {
                console.log("ontrack event");
                if (remoteAudioRef.current) {
                    remoteAudioRef.current.srcObject = event.streams[0];
                }
            };

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                stream
                    .getTracks()
                    .forEach((track) => pc.addTrack(track, stream));
                if (localAudioRef.current) {
                    localAudioRef.current.srcObject = stream;
                }

                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyzer = audioContext.createAnalyser();
                analyzer.fftSize = 2048;
                source.connect(analyzer);

                setIsLogging(true);
                logAudioData(analyzer);
            } catch (err) {
                console.error("Error accessing media devices:", err);
            }

            setPeerConnection(pc);
        };

        initWebRTC();

        return () => {
            if (peerConnection) {
                peerConnection.close();
            }
            setIsLogging(false);
        };
    }, []);

    const logAudioData = (analyzer: AnalyserNode) => {
        console.log("analyzing audio");
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const logData = () => {
            if (!isLogging) return;

            analyzer.getByteFrequencyData(dataArray);
            const average =
                dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
            console.log(`Audio level: ${average.toFixed(2)}`);

            requestAnimationFrame(logData);
        };

        logData();
    };

    const handleStartCall = async () => {
        console.log("starting call");
        if (!peerConnection) return;

        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            const response = await fetch("/api/llpmg/webrtc-offer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    offer: peerConnection.localDescription,
                }),
            });

            const { answer, consumerParameters } = await response.json();

            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(answer)
            );

            peerConnection.ontrack = (event) => {
                console.log("ontrack event in peer connection");
                const [remoteStream] = event.streams;
                if (remoteAudioRef.current) {
                    remoteAudioRef.current.srcObject = remoteStream;

                    const audioContext = new AudioContext();
                    const source =
                        audioContext.createMediaStreamSource(remoteStream);
                    const analyzer = audioContext.createAnalyser();
                    analyzer.fftSize = 2048;
                    source.connect(analyzer);

                    logAudioData(analyzer);
                }
                console.log("Remote audio track received");
            };

            console.log("Call started");
        } catch (err) {
            console.error("Error starting call:", err);
        }
    };

    return (
        <div>
            <audio ref={localAudioRef} autoPlay muted />
            <audio ref={remoteAudioRef} autoPlay />
        </div>
    );
});

export default WebRTCAudio;
