"use client";

import { useEffect, useRef } from "react";
import { initShader, resizeCanvas } from "@/lib/llpmg/webGlUtils"; // Ensure the import path is correct

interface NeuroCanvasProps {
    scrollProgress: number;
}

const NeuroCanvas: React.FC<NeuroCanvasProps> = ({ scrollProgress }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL is not supported by your browser.");
            return;
        }

        const { render, cleanup } = initShader(gl);

        const handleResize = () => {
            console.log("Canvas resized");
            resizeCanvas(canvas, gl);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial resize on mount

        const pointer = { x: 0, y: 0, tX: 0, tY: 0 };

        window.addEventListener("mousemove", (e) => {
            pointer.tX = e.clientX;
            pointer.tY = e.clientY;
        });

        let animationFrame: number;

        const animate = (time: number) => {
            render(time, pointer, scrollProgress); // Pass the scrollProgress and mouse position to the shader
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", handleResize);
            cleanup();
        };
    }, [scrollProgress]); // Re-run effect when scrollProgress changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
        />
    );
};

export default NeuroCanvas;
