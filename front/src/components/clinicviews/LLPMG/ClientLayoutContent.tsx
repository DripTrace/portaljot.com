// // "use client";

// // import { useEffect, useState, useRef } from "react";
// // import { useAppSelector } from "@/hooks/useRedux";
// // import { RootState } from "../../store/store";
// // import NeuroCanvas from "./NeuroCanvas"; // Ensure the import path is correct

// // interface ClientLayoutContentProps {
// //     children: React.ReactNode;
// // }

// // const ClientLayoutContent: React.FC<ClientLayoutContentProps> = ({
// //     children,
// // }) => {
// //     const contentRef = useRef<HTMLDivElement>(null);
// //     const [scrollProgress, setScrollProgress] = useState(0);

// //     useEffect(() => {
// //         const handleScroll = () => {
// //             if (contentRef.current) {
// //                 const scrollY = contentRef.current.scrollTop; // Scroll within this section
// //                 const windowHeight = contentRef.current.clientHeight;
// //                 const docHeight = contentRef.current.scrollHeight;
// //                 const maxScroll = docHeight - windowHeight;

// //                 const progress = scrollY / maxScroll;
// //                 setScrollProgress(progress); // Update scroll progress state
// //             }
// //         };

// //         const section = contentRef.current;
// //         if (section) {
// //             section.addEventListener("scroll", handleScroll);
// //         }

// //         return () => {
// //             if (section) {
// //                 section.removeEventListener("scroll", handleScroll);
// //             }
// //         };
// //     }, []);
// //     const [isLoaded, setIsLoaded] = useState(false);
// //     const theme = useAppSelector((state: RootState) => state.ui.theme);

// //     useEffect(() => {
// //         setIsLoaded(true);
// //     }, []);

// //     return (
// //         // <div
// //         //     className={`flex flex-col min-h-screen ${
// //         //         isLoaded ? "opacity-100" : "opacity-0"
// //         //     } transition-opacity duration-300 ${
// //         //         theme === "dark" ? "dark" : ""
// //         //     }`}
// //         // >
// //         //     {children}
// //         // </div>
// //         <div
// //             ref={contentRef}
// //             className={`relative overflow-auto h-screen flex flex-col min-h-screen ${
// //                 isLoaded ? "opacity-100" : "opacity-0"
// //             } transition-opacity duration-300 ${
// //                 theme === "dark" ? "dark" : ""
// //             }`}
// //             style={{ height: "100vh" }}
// //         >
// //             {/* Content */}
// //             {/* <div className="min-h-[200vh] flex flex-col justify-center items-center text-[30vh] text-center">
// //                 Scroll Inside This Area
// //             </div>
// //             <div className="h-[100vh] flex justify-center items-center text-[30vh] text-center">
// //                 More Content to Scroll
// //             </div> */}

// //             {/* NeuroCanvas now receives scrollProgress as a prop */}
// //             {children}
// //             <NeuroCanvas scrollProgress={scrollProgress} />
// //         </div>
// //     );
// // };

// // export default ClientLayoutContent;

// // "use client";

// // import React, { useEffect, useRef } from "react";
// // import { gsap } from "gsap";
// // import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// // gsap.registerPlugin(MotionPathPlugin);

// // interface Bubble {
// //     dur: number;
// //     spriteDur: number;
// //     rotate: number;
// //     scaleX: number;
// //     scaleY: number;
// //     step: number;
// //     x: number;
// //     y: number;
// //     n: number;
// // }

// // const BubbleCanvas: React.FC = () => {
// //     const canvasRef = useRef<HTMLCanvasElement>(null);
// //     const bubblesRef = useRef<Bubble[]>([]);
// //     const imgRef = useRef<HTMLImageElement | null>(null);
// //     const mRef = useRef({ x: 0, y: 0 });
// //     const debounceRef = useRef<gsap.core.Tween | null>(null);

// //     useEffect(() => {
// //         const canvas = canvasRef.current;
// //         if (!canvas) return;

// //         const ctx = canvas.getContext("2d");
// //         if (!ctx) return;

// //         let cw = (canvas.width = window.innerWidth);
// //         let ch = (canvas.height = window.innerHeight);

// //         debounceRef.current = gsap.to({}, { duration: 0.07 });

// //         const img = new Image();
// //         imgRef.current = img;
// //         img.src = "https://assets.codepen.io/721952/bubbles_1.webp";

// //         img.onload = () => {
// //             for (let i = 0; i < 20; i++) {
// //                 mRef.current.x = gsap.utils.random(150, cw - 150, 1);
// //                 mRef.current.y = gsap.utils.random(150, ch - 150, 1);
// //                 makeBubble(true);
// //             }
// //         };

// //         const handlePointer = (e: PointerEvent) => {
// //             mRef.current.x = e.clientX;
// //             mRef.current.y = e.clientY;
// //             makeBubble();
// //         };

// //         window.addEventListener("pointerdown", handlePointer);
// //         window.addEventListener("pointermove", handlePointer);

// //         const makeBubble = (auto?: boolean) => {
// //             if (
// //                 (debounceRef.current?.progress() === 1 || auto) &&
// //                 imgRef.current
// //             ) {
// //                 debounceRef.current?.play(0);

// //                 const dist = gsap.utils.random(100, 200);
// //                 const scale = gsap.utils.random(0.4, 0.8);
// //                 const b: Bubble = {
// //                     dur: gsap.utils.random(3, 7),
// //                     spriteDur: gsap.utils.random(0.12, 0.5),
// //                     rotate: gsap.utils.random(-9, 9),
// //                     scaleX: scale,
// //                     scaleY: scale,
// //                     step: 0,
// //                     x: 0,
// //                     y: 0,
// //                     n: bubblesRef.current.length,
// //                 };

// //                 bubblesRef.current.push(b);

// //                 gsap.timeline({ defaults: { ease: "none" } })
// //                     .fromTo(
// //                         b,
// //                         {
// //                             x: mRef.current.x - 75 * scale,
// //                             y: mRef.current.y - 75 * scale,
// //                         },
// //                         {
// //                             duration: b.dur,
// //                             rotate: "+=" + gsap.utils.random(-5, 5, 1),
// //                             motionPath: () =>
// //                                 `M${b.x},${b.y}c${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)} ${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)} ${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)}`,
// //                         },
// //                         0
// //                     )
// //                     .to(
// //                         b,
// //                         {
// //                             duration: b.dur / 5,
// //                             ease: "sine.inOut",
// //                             yoyo: true,
// //                             repeat: 3,
// //                             repeatRefresh: true,
// //                             scaleX: () => scale + gsap.utils.random(-0.1, 0.1),
// //                             scaleY: () => scale + gsap.utils.random(-0.1, 0.1),
// //                         },
// //                         b.dur / 5
// //                     )
// //                     .to(
// //                         b,
// //                         {
// //                             duration: b.spriteDur,
// //                             step: 8,
// //                             snap: "step",
// //                         },
// //                         b.dur - b.spriteDur * 2
// //                     );
// //             }
// //         };

// //         gsap.ticker.add(() => {
// //             ctx.clearRect(0, 0, cw, ch);
// //             bubblesRef.current.forEach((b) => {
// //                 ctx.save();
// //                 ctx.translate(b.x + b.scaleX * 75, b.y + b.scaleY * 75);
// //                 ctx.rotate(b.rotate);
// //                 ctx.drawImage(
// //                     imgRef.current!,
// //                     0,
// //                     b.step * 150,
// //                     150,
// //                     150,
// //                     -b.scaleX * 75,
// //                     -b.scaleY * 75,
// //                     b.scaleX * 150,
// //                     b.scaleY * 150
// //                 );
// //                 ctx.restore();
// //             });
// //         });

// //         const handleResize = () => {
// //             cw = canvas.width = window.innerWidth;
// //             ch = canvas.height = window.innerHeight;
// //         };

// //         window.addEventListener("resize", handleResize);

// //         return () => {
// //             window.removeEventListener("pointerdown", handlePointer);
// //             window.removeEventListener("pointermove", handlePointer);
// //             window.removeEventListener("resize", handleResize);
// //         };
// //     }, []);

// //     return (
// //         <canvas
// //             ref={canvasRef}
// //             // className="absolute top-0 left-0 w-full h-full min-h-screen m-0 p-0 w-full h-full overflow-hidden"
// //             className="absolute top-0 left-0 w-full h-screen overflow-hidden z-40"
// //         />
// //     );
// // };

// // export default BubbleCanvas;

// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useAppSelector } from "@/hooks/useRedux";
// // import { RootState } from "../../store/store";
// // import BubbleCanvas from "./BubbleCanvas";

// // interface ClientLayoutContentProps {
// //     children: React.ReactNode;
// // }

// // const ClientLayoutContent: React.FC<ClientLayoutContentProps> = ({
// //     children,
// // }) => {
// //     const [isLoaded, setIsLoaded] = useState(false);
// //     const theme = useAppSelector((state: RootState) => state.ui.theme);

// //     useEffect(() => {
// //         setIsLoaded(true);
// //     }, []);

// //     return (
// //         <div
// //             className={`flex flex-col min-h-screen ${
// //                 isLoaded ? "opacity-100" : "opacity-0"
// //             } transition-opacity duration-300 ${
// //                 theme === "dark" ? "dark" : ""
// //             }`}
// //         >
// //             <BubbleCanvas />
// //             {children}
// //         </div>
// //     );
// // };

// // export default ClientLayoutContent;

// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useAppSelector } from "@/hooks/useRedux";
// import { RootState } from "../../store/store";
// import BubbleCanvas from "./BubbleCanvas";
// import { gsap } from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// gsap.registerPlugin(MotionPathPlugin);

// interface Bubble {
//     dur: number;
//     spriteDur: number;
//     rotate: number;
//     scaleX: number;
//     scaleY: number;
//     step: number;
//     x: number;
//     y: number;
//     n: number;
// }

// interface ClientLayoutContentProps {
//     children: React.ReactNode;
// }

// const ClientLayoutContent: React.FC<ClientLayoutContentProps> = ({
//     children,
// }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const bubblesRef = useRef<Bubble[]>([]);
//     const imgRef = useRef<HTMLImageElement | null>(null);
//     const mRef = useRef({ x: 0, y: 0 });
//     const debounceRef = useRef<gsap.core.Tween | null>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         let cw = (canvas.width = window.innerWidth);
//         let ch = (canvas.height = window.innerHeight);

//         debounceRef.current = gsap.to({}, { duration: 0.07 });

//         const img = new Image();
//         imgRef.current = img;
//         img.src = "https://assets.codepen.io/721952/bubbles_1.webp";

//         img.onload = () => {
//             for (let i = 0; i < 20; i++) {
//                 mRef.current.x = gsap.utils.random(150, cw - 150, 1);
//                 mRef.current.y = gsap.utils.random(150, ch - 150, 1);
//                 makeBubble(true);
//             }
//         };

//         const handlePointer = (e: PointerEvent) => {
//             mRef.current.x = e.clientX;
//             mRef.current.y = e.clientY;
//             makeBubble();
//         };

//         window.addEventListener("pointerdown", handlePointer);
//         window.addEventListener("pointermove", handlePointer);

//         const makeBubble = (auto?: boolean) => {
//             if (
//                 (debounceRef.current?.progress() === 1 || auto) &&
//                 imgRef.current
//             ) {
//                 debounceRef.current?.play(0);

//                 const dist = gsap.utils.random(100, 200);
//                 const scale = gsap.utils.random(0.4, 0.8);
//                 const b: Bubble = {
//                     dur: gsap.utils.random(3, 7),
//                     spriteDur: gsap.utils.random(0.12, 0.5),
//                     rotate: gsap.utils.random(-9, 9),
//                     scaleX: scale,
//                     scaleY: scale,
//                     step: 0,
//                     x: 0,
//                     y: 0,
//                     n: bubblesRef.current.length,
//                 };

//                 bubblesRef.current.push(b);

//                 gsap.timeline({ defaults: { ease: "none" } })
//                     .fromTo(
//                         b,
//                         {
//                             x: mRef.current.x - 75 * scale,
//                             y: mRef.current.y - 75 * scale,
//                         },
//                         {
//                             duration: b.dur,
//                             rotate: "+=" + gsap.utils.random(-5, 5, 1),
//                             motionPath: () =>
//                                 `M${b.x},${b.y}c${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)} ${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)} ${gsap.utils.random(-dist, dist, 1)},${gsap.utils.random(-dist, dist, 1)}`,
//                         },
//                         0
//                     )
//                     .to(
//                         b,
//                         {
//                             duration: b.dur / 5,
//                             ease: "sine.inOut",
//                             yoyo: true,
//                             repeat: 3,
//                             repeatRefresh: true,
//                             scaleX: () => scale + gsap.utils.random(-0.1, 0.1),
//                             scaleY: () => scale + gsap.utils.random(-0.1, 0.1),
//                         },
//                         b.dur / 5
//                     )
//                     .to(
//                         b,
//                         {
//                             duration: b.spriteDur,
//                             step: 8,
//                             snap: "step",
//                         },
//                         b.dur - b.spriteDur * 2
//                     );
//             }
//         };

//         gsap.ticker.add(() => {
//             ctx.clearRect(0, 0, cw, ch);
//             bubblesRef.current.forEach((b) => {
//                 ctx.save();
//                 ctx.translate(b.x + b.scaleX * 75, b.y + b.scaleY * 75);
//                 ctx.rotate(b.rotate);
//                 ctx.drawImage(
//                     imgRef.current!,
//                     0,
//                     b.step * 150,
//                     150,
//                     150,
//                     -b.scaleX * 75,
//                     -b.scaleY * 75,
//                     b.scaleX * 150,
//                     b.scaleY * 150
//                 );
//                 ctx.restore();
//             });
//         });

//         const handleResize = () => {
//             cw = canvas.width = window.innerWidth;
//             ch = canvas.height = window.innerHeight;
//         };

//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("pointerdown", handlePointer);
//             window.removeEventListener("pointermove", handlePointer);
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const theme = useAppSelector((state: RootState) => state.ui.theme);

//     useEffect(() => {
//         setIsLoaded(true);
//     }, []);

//     return (
//         <div
//             className={`flex flex-col min-h-screen ${
//                 isLoaded ? "opacity-100" : "opacity-0"
//             } transition-opacity duration-300 ${
//                 theme === "dark" ? "dark" : ""
//             }`}
//         >
//             <canvas
//                 ref={canvasRef}
//                 className="absolute top-0 left-0 w-full h-full min-h-screen m-0 p-0 w-full h-full overflow-hidden"
//                 // className="absolute top-0 left-0 w-full h-full overflow-hidden z-10"
//             />
//             {children}
//         </div>
//     );
// };

// export default ClientLayoutContent;

"use client";

import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "../../store/store";
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

interface ClientLayoutContentProps {
    children: React.ReactNode;
}

const ClientLayoutContent: React.FC<ClientLayoutContentProps> = ({
    children,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<Bubble[]>([]);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const mRef = useRef({ x: 0, y: 0 });
    const debounceRef = useRef<gsap.core.Tween | null>(null);
    const [contentHeight, setContentHeight] = useState(0);

    const [isLoaded, setIsLoaded] = useState(false);
    const theme = useAppSelector((state: RootState) => state.ui.theme);

    useEffect(() => {
        const updateContentHeight = () => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight);
            }
        };

        updateContentHeight();
        window.addEventListener("resize", updateContentHeight);

        return () => {
            window.removeEventListener("resize", updateContentHeight);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let cw = (canvas.width = window.innerWidth);
        let ch = (canvas.height = Math.max(window.innerHeight, contentHeight));

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
            mRef.current.y = e.clientY + window.scrollY;
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
            ch = canvas.height = Math.max(window.innerHeight, contentHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("pointerdown", handlePointer);
            window.removeEventListener("pointermove", handlePointer);
            window.removeEventListener("resize", handleResize);
        };
    }, [contentHeight]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            ref={contentRef}
            className={`flex flex-col min-h-screen w-full ${
                isLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300 ${
                theme === "dark" ? "dark" : ""
            }`}
        >
            {/* <canvas
                ref={canvasRef}
                // className="fixed top-0 left-0 w-full z-0"
                // style={{ height: `${contentHeight}px` }}
                className="fixed top-0 left-0 w-full pointer-events-none"
                style={{
                    height: `${contentHeight}px`,
                    // zIndex: -1, // This ensures the canvas is behind your content
                }}
            /> */}
            {children}
        </div>
    );
};

export default ClientLayoutContent;
