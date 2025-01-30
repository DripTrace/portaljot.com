"use client";

import { profileInfo } from "@/lib/utils/constants";
import React, { useEffect, useRef } from "react";

const HypeAudioVisual: React.FC = () => {
    const { navigation, introduction, content } = profileInfo;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    // const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const audio = audioRef.current;
            if (audio) {
                // audio.src = URL.createObjectURL(files[0]);
                audio.src = "/HorizonTriumph.mp3";
                audio.load();
                audio.play();
                setupAudioProcessing(audio);
            }
        }
    };

    const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
        const audioContext = new (window.AudioContext || window.AudioContext)();
        const analyser = audioContext.createAnalyser();
        const audioSource = audioContext.createMediaElementSource(audioElement);
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const animate = () => {
            const ctx = canvasRef.current?.getContext("2d");
            const canvas = canvasRef.current;
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                analyser.getByteFrequencyData(dataArray);
                drawVisualiser(
                    bufferLength,
                    dataArray,
                    ctx,
                    canvas.width / 2,
                    canvas.height / 2
                );
                requestAnimationFrame(animate);
            }
        };
        animate();
    };

    const drawVisualiser = (
        bufferLength: number,
        dataArray: Uint8Array,
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number
    ) => {
        const radius = 240;
        const barWidth = (Math.PI * 2) / bufferLength;
        ctx.strokeStyle = "#fff";

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];
            const angle = i * barWidth;
            const x = centerX + Math.cos(angle) * (radius + barHeight);
            const y = centerY + Math.sin(angle) * (radius + barHeight);

            ctx.beginPath();
            ctx.moveTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    return (
        <div className="audio-visual-wrapper">
            <div className="visual-wrapper">
                <canvas ref={canvasRef} className="audio-visual-canvas" />
            </div>
            <audio
                ref={audioRef}
                controls
                className="audio-visual"
                loop
                autoPlay={true}
                src="/HorizonTriumph.mp3"
            />
            <div className="logo-outline-test">
                {navigation.site.logo({
                    id: "ovation-logo",
                    className: "logo-container-test",
                })}
            </div>
            <label htmlFor="fileupload" className="audio-visual-label">
                play
            </label>
            <input
                type="file"
                id="fileupload"
                accept="audio/*"
                // src="/HorizonTriumph.mp3"
                onChange={handleFileChange}
                className="audio-visual-input"
            />
        </div>
    );
};

export default HypeAudioVisual;
