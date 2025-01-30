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

    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new AudioContext();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     const analyser = audioContext.createAnalyser();
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 512;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);
    //     const barWidth = 15;
    //     let x: number;

    //     const animate = () => {
    //         x = 0;
    //         const ctx = canvasRef.current?.getContext("2d");
    //         if (ctx) {
    //             const canvas = canvasRef.current;
    //             if (canvas) {
    //                 ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             }
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(bufferLength, x, barWidth, dataArray, ctx);
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     x: number,
    //     barWidth: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D
    // ) => {
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i] * 1.5;
    //         ctx.save();
    //         const hue = i * 0.6 + 200;
    //         ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    //         ctx.fillRect(x, ctx.canvas.height - barHeight, barWidth, barHeight);
    //         x += barWidth;
    //         ctx.restore();
    //     }
    // };

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (canvas) {
    //         canvas.width = window.innerWidth;
    //         canvas.height = window.innerHeight;
    //     }
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="relative w-full h-full border border-indigo-50"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="absolute top-0 left-0 w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-0 right-0 text-white z-10 cursor-pointer"
    //             aria-label="Upload audio file"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             // className="hidden"
    //             className="absolute top-0 right-[50%]"
    //         />
    //     </div>
    // );

    //*** */
    const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
        const audioContext = new (window.AudioContext || window.AudioContext)();
        const analyser = audioContext.createAnalyser();
        const audioSource = audioContext.createMediaElementSource(audioElement);
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 1024;
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
        const radius = 400;
        const barWidth = (Math.PI * 2) / bufferLength;
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];
            const angle = i * barWidth;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.arc(x, y, barHeight * 0.05, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
            ctx.fill();
            ctx.strokeStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
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
        <div className="absolute top-0 left-0 bg-black w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
            />
            <audio
                ref={audioRef}
                controls
                className="block w-1/2 mx-auto mt-12"
            />
            <label
                htmlFor="fileupload"
                className="absolute top-36 text-white z-10 cursor-pointer"
            >
                Upload Audio
            </label>
            <input
                type="file"
                id="fileupload"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );

    //***** */
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new (window.AudioContext || window.AudioContext)();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 2048;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Semi-transparent black to create a fade effect
    //             ctx.fillRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     const radius = 400;
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i] * 0.2; // Adjust multiplier for particle size
    //         const angle = i * barWidth;
    //         const x = centerX + Math.cos(angle) * (radius + barHeight / 2);
    //         const y = centerY + Math.sin(angle) * (radius + barHeight / 2);
    //         ctx.beginPath();
    //         ctx.arc(x, y, barHeight * 0.15, 0, Math.PI * 2); // Adjust multiplier for particle radius
    //         const hue = (i / bufferLength) * 360;
    //         ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    //         ctx.fill();
    //     }
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** */
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new (window.AudioContext || window.AudioContext)();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 2048;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     const radius = 250;
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     ctx.lineWidth = 2; // You can adjust the line width here
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i] * 1.5;
    //         const angle = i * barWidth;
    //         const x = centerX + Math.cos(angle) * (radius + barHeight);
    //         const y = centerY + Math.sin(angle) * (radius + barHeight);
    //         ctx.beginPath();
    //         ctx.arc(x, y, barHeight * 0.05, 0, Math.PI * 2);
    //         ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.fill();
    //         ctx.strokeStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.stroke();
    //     }
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** */
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new AudioContext();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 1024;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     ctx.save();
    //     const radius = 400; // Radius of the circle
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     const barHeightMultiplier = 0.5; // Controls the height of the bars
    //     let hue = 0;

    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i] * barHeightMultiplier;

    //         const x = centerX + Math.cos(barWidth * i) * (radius + barHeight);
    //         const y = centerY + Math.sin(barWidth * i) * (radius + barHeight);
    //         ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    //         ctx.beginPath();
    //         ctx.arc(x, y, barHeight / 10, 0, Math.PI * 2);
    //         ctx.fill();

    //         hue += 360 / bufferLength;
    //     }
    //     ctx.restore();
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** test*/
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new AudioContext();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 1024;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     ctx.save();
    //     const radius = 400; // Radius of the circle
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     let hue = 0;

    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i] * 0.5;
    //         ctx.beginPath();
    //         ctx.moveTo(centerX, centerY);
    //         ctx.lineTo(
    //             centerX + Math.cos(barWidth * i) * (radius + barHeight),
    //             centerY + Math.sin(barWidth * i) * (radius + barHeight)
    //         );
    //         ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    //         ctx.lineWidth = 2;
    //         ctx.stroke();
    //         hue += 360 / bufferLength;
    //     }
    //     ctx.restore();
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** */
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new (window.AudioContext || window.AudioContext)();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 2048;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     const radius = 400;
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     ctx.globalCompositeOperation = "lighter";
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i];
    //         const angle = i * barWidth;
    //         const x = centerX + Math.cos(angle) * (radius + barHeight / 2);
    //         const y = centerY + Math.sin(angle) * (radius + barHeight / 2);
    //         ctx.beginPath();
    //         ctx.arc(x, y, barHeight * 0.015, 0, Math.PI * 2);
    //         ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.fill();
    //     }
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** bigger balls*/
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new (window.AudioContext || window.AudioContext)();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 256;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     const radius = 250;
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     ctx.globalCompositeOperation = "lighter";
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i] * 1.5;
    //         const angle = i * barWidth;
    //         const x = centerX + Math.cos(angle) * (radius + barHeight);
    //         const y = centerY + Math.sin(angle) * (radius + barHeight);
    //         ctx.beginPath();
    //         ctx.arc(x, y, barHeight * 0.05, 0, Math.PI * 2);
    //         ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.fill();
    //         ctx.strokeStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.stroke();
    //     }
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** gross testing*/
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new (window.AudioContext || window.AudioContext)();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 2048;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     const radius = 150;
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     let hue = 0;
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i];
    //         ctx.save();
    //         ctx.translate(centerX, centerY);
    //         ctx.rotate(i * barWidth);
    //         const color = `hsl(${hue}, 100%, 50%)`;
    //         hue += (360 / bufferLength) * 3; // Increment hue to create a gradient effect
    //         ctx.strokeStyle = color;
    //         ctx.lineWidth = barHeight / 20;
    //         ctx.beginPath();
    //         ctx.moveTo(0, 0); // Move to center
    //         ctx.lineTo(0, radius + barHeight / 2); // Draw to the radius + half bar height
    //         ctx.stroke();
    //         ctx.restore();

    //         // Create particles
    //         if (barHeight > 100) {
    //             // Only create particles for higher frequencies
    //             ctx.fillStyle = color;
    //             for (let j = 0; j < barHeight / 20; j++) {
    //                 // More particles for higher bars
    //                 ctx.beginPath();
    //                 ctx.arc(
    //                     centerX + (Math.random() * 2 - 1) * radius,
    //                     centerY + (Math.random() * 2 - 1) * radius,
    //                     Math.random() * 3,
    //                     0,
    //                     Math.PI * 2
    //                 );
    //                 ctx.fill();
    //             }
    //         }
    //     }
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** hex*/
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new (window.AudioContext || window.AudioContext)();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 2048;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     const radius = 400;
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     ctx.lineWidth = 2;
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i];
    //         const angle = i * barWidth;
    //         const x = centerX + Math.cos(angle) * radius;
    //         const y = centerY + Math.sin(angle) * radius;

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.translate(x, y);
    //         ctx.rotate(angle - Math.PI / 2);
    //         ctx.scale(barHeight / 100, barHeight / 100); // Scale bar height based on frequency

    //         // Draw hexagon and cylindrical shapes
    //         for (let j = 0; j < 6; j++) {
    //             ctx.lineTo(
    //                 Math.cos(((Math.PI * 2) / 6) * j) * 10,
    //                 Math.sin(((Math.PI * 2) / 6) * j) * 10
    //             );
    //         }
    //         ctx.closePath();
    //         ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.fill();
    //         ctx.restore();
    //     }
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );

    //***** odd*/
    // const setupAudioProcessing = (audioElement: HTMLAudioElement) => {
    //     const audioContext = new (window.AudioContext || window.AudioContext)();
    //     const analyser = audioContext.createAnalyser();
    //     const audioSource = audioContext.createMediaElementSource(audioElement);
    //     audioSource.connect(analyser);
    //     analyser.connect(audioContext.destination);
    //     analyser.fftSize = 512;
    //     const bufferLength = analyser.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);

    //     const animate = () => {
    //         const ctx = canvasRef.current?.getContext("2d");
    //         const canvas = canvasRef.current;
    //         if (ctx && canvas) {
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             analyser.getByteFrequencyData(dataArray);
    //             drawVisualiser(
    //                 bufferLength,
    //                 dataArray,
    //                 ctx,
    //                 canvas.width / 2,
    //                 canvas.height / 2
    //             );
    //             requestAnimationFrame(animate);
    //         }
    //     };
    //     animate();
    // };

    // const drawVisualiser = (
    //     bufferLength: number,
    //     dataArray: Uint8Array,
    //     ctx: CanvasRenderingContext2D,
    //     centerX: number,
    //     centerY: number
    // ) => {
    //     const radius = 150;
    //     const barWidth = (Math.PI * 2) / bufferLength;
    //     ctx.lineWidth = 2;
    //     for (let i = 0; i < bufferLength; i++) {
    //         const barHeight = dataArray[i] * 1.5;
    //         const angle = i * barWidth;
    //         const x = centerX + Math.cos(angle) * radius;
    //         const y = centerY + Math.sin(angle) * radius;

    //         ctx.save();
    //         ctx.translate(centerX, centerY);
    //         ctx.rotate(angle - Math.PI / 2);
    //         ctx.beginPath();
    //         ctx.moveTo(0, 0);
    //         ctx.lineTo(barHeight, 0);
    //         ctx.strokeStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.stroke();

    //         // Draw circles at the tips of the lines
    //         ctx.beginPath();
    //         ctx.arc(barHeight, 0, 5, 0, Math.PI * 2);
    //         ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
    //         ctx.fill();

    //         ctx.restore();
    //     }
    // };

    // useEffect(() => {
    //     const resizeCanvas = () => {
    //         const canvas = canvasRef.current;
    //         if (canvas) {
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         }
    //     };
    //     window.addEventListener("resize", resizeCanvas);
    //     resizeCanvas();

    //     return () => window.removeEventListener("resize", resizeCanvas);
    // }, []);

    // return (
    //     <div className="absolute top-0 left-0 bg-black w-full h-full">
    //         <canvas
    //             ref={canvasRef}
    //             className="absolute top-0 left-0 w-full h-full"
    //         />
    //         <audio
    //             ref={audioRef}
    //             controls
    //             className="block w-1/2 mx-auto mt-12"
    //         />
    //         <label
    //             htmlFor="fileupload"
    //             className="absolute top-36 text-white z-10 cursor-pointer"
    //         >
    //             Upload Audio
    //         </label>
    //         <input
    //             type="file"
    //             id="fileupload"
    //             accept="audio/*"
    //             onChange={handleFileChange}
    //             className="hidden"
    //         />
    //     </div>
    // );
};

export default AudioVisualizer;
