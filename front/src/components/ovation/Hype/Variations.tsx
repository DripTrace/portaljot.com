"use client";

// $$$$$$

import React, { useEffect, useRef } from "react";

const AudioVisualizer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const audio = audioRef.current;
            if (audio) {
                audio.src = URL.createObjectURL(files[0]);
                audio.load();
                audio.play();
                setupAudioProcessing(audio);
            }
        }
    };

    const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const barWidth = 15;
        let x: number;

        const animate = () => {
            x = 0;
            const ctx = canvasRef.current?.getContext("2d");
            if (ctx) {
                const canvas = canvasRef.current;
                if (canvas) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                analyser.getByteFrequencyData(dataArray);
                drawVisualiser(bufferLength, x, barWidth, dataArray, ctx);
                requestAnimationFrame(animate);
            }
        };
        animate();
    };

    const drawVisualiser = (
        bufferLength: number,
        x: number,
        barWidth: number,
        dataArray: Uint8Array,
        ctx: CanvasRenderingContext2D
    ) => {
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] * 1.5;
            ctx.save();
            const hue = i * 0.6 + 200;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(x, ctx.canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
            ctx.restore();
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);

    return (
        <div className="absolute top-0 left-0 bg-black w-full h-full">
            <canvas
                ref={canvasRef}
                className="relative w-full h-full border border-indigo-50"
            />
            <audio
                ref={audioRef}
                controls
                className="absolute top-0 left-0 w-1/2 mx-auto mt-12"
            />
            <label
                htmlFor="fileupload"
                className="absolute top-0 right-0 text-white z-10 cursor-pointer"
                aria-label="Upload audio file"
            >
                Upload Audio
            </label>
            <input
                type="file"
                id="fileupload"
                accept="audio/*"
                onChange={handleFileChange}
                // className="hidden"
                className="absolute top-0 right-[50%]"
            />
        </div>
    );
};

export default AudioVisualizer;
