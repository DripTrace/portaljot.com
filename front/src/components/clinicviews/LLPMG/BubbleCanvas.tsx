"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

interface Bubble {
    dur: number;
    spriteDur: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
    step: number;
    x: number;
    y: number;
    n: number;
}

const BubbleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bubblesRef = useRef<Bubble[]>([]);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const mRef = useRef({ x: 0, y: 0 });
    const debounceRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let cw = (canvas.width = window.innerWidth);
        let ch = (canvas.height = window.innerHeight);

        debounceRef.current = gsap.to({}, { duration: 0.07 });

        const img = new Image();
        imgRef.current = img;
        img.src = "https://assets.codepen.io/721952/bubbles_1.webp";

        img.onload = () => {
            for (let i = 0; i < 20; i++) {
                mRef.current.x = gsap.utils.random(150, cw - 150, 1);
                mRef.current.y = gsap.utils.random(150, ch - 150, 1);
                makeBubble(true);
            }
        };

        const handlePointer = (e: PointerEvent) => {
            mRef.current.x = e.clientX;
            mRef.current.y = e.clientY;
            makeBubble();
        };

        window.addEventListener("pointerdown", handlePointer);
        window.addEventListener("pointermove", handlePointer);

        const makeBubble = (auto?: boolean) => {
            if (
                (debounceRef.current?.progress() === 1 || auto) &&
                imgRef.current
            ) {
                debounceRef.current?.play(0);

                const dist = gsap.utils.random(100, 200);
                const scale = gsap.utils.random(0.4, 0.8);
                const b: Bubble = {
                    dur: gsap.utils.random(3, 7),
                    spriteDur: gsap.utils.random(0.12, 0.5),
                    rotate: gsap.utils.random(-9, 9),
                    scaleX: scale,
                    scaleY: scale,
                    step: 0,
                    x: 0,
                    y: 0,
                    n: bubblesRef.current.length,
                };

                bubblesRef.current.push(b);

                gsap.timeline({ defaults: { ease: "none" } })
                    .fromTo(
                        b,
                        {
                            x: mRef.current.x - 75 * scale,
                            y: mRef.current.y - 75 * scale,
                        },
                        {
                            duration: b.dur,
                            rotate: "+=" + gsap.utils.random(-5, 5, 1),
                            motionPath: () =>
                                `M${b.x},${b.y}c${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)} ${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)} ${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)}`,
                        },
                        0
                    )
                    .to(
                        b,
                        {
                            duration: b.dur / 5,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: 3,
                            repeatRefresh: true,
                            scaleX: () => scale + gsap.utils.random(-0.1, 0.1),
                            scaleY: () => scale + gsap.utils.random(-0.1, 0.1),
                        },
                        b.dur / 5
                    )
                    .to(
                        b,
                        {
                            duration: b.spriteDur,
                            step: 8,
                            snap: "step",
                        },
                        b.dur - b.spriteDur * 2
                    );
            }
        };

        gsap.ticker.add(() => {
            ctx.clearRect(0, 0, cw, ch);
            bubblesRef.current.forEach((b) => {
                ctx.save();
                ctx.translate(b.x + b.scaleX * 75, b.y + b.scaleY * 75);
                ctx.rotate(b.rotate);
                ctx.drawImage(
                    imgRef.current!,
                    0,
                    b.step * 150,
                    150,
                    150,
                    -b.scaleX * 75,
                    -b.scaleY * 75,
                    b.scaleX * 150,
                    b.scaleY * 150
                );
                ctx.restore();
            });
        });

        const handleResize = () => {
            cw = canvas.width = window.innerWidth;
            ch = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("pointerdown", handlePointer);
            window.removeEventListener("pointermove", handlePointer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            // className="absolute top-0 left-0 w-full h-full min-h-screen m-0 p-0 w-full h-full overflow-hidden"
            className="absolue top-0 left-0 w-full h-screen overflow-hidden z-40"
        />
    );
};

export default BubbleCanvas;
