"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HypePreview = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        window.addEventListener("resize", updateSize);
        updateSize(); // Initial dimension setup

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0 || dimensions.height === 0)
            return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number; // Explicitly typing the animation frame ID

        const drawBlur = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(0.625rem)";
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; // Drawing a semi-transparent white to see the blur effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            animationFrameId = requestAnimationFrame(drawBlur);
        };

        drawBlur();

        return () => {
            cancelAnimationFrame(animationFrameId); // Using the ID to cancel the animation
        };
    }, [dimensions]);

    return (
        <div ref={containerRef} className="preview-wrapper">
            {dimensions.width !== 0 && dimensions.height !== 0 && (
                <>
                    <Image
                        src="/mvp_preview.gif"
                        alt="Background GIF"
                        width={dimensions.width}
                        height={dimensions.height}
                        objectFit="cover"
                        quality={100}
                        className="preview-gif"
                        unoptimized
                    />
                    <canvas ref={canvasRef} className="preview-canvas" />
                </>
            )}
        </div>
    );
};

export default HypePreview;
