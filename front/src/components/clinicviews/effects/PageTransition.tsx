// "use client";

// import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";

// const paths = {
//     step1: {
//         unfilled: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
//         inBetween: {
//             curve1: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
//             curve2: "M 0 100 V 50 Q 50 100 100 50 V 100 z",
//         },
//         filled: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
//     },
//     step2: {
//         filled: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
//         inBetween: {
//             curve1: "M 0 0 V 50 Q 50 0 100 50 V 0 z",
//             curve2: "M 0 0 V 50 Q 50 100 100 50 V 0 z",
//         },
//         unfilled: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
//     },
// };

// const PageTransition: React.FC = () => {
//     const [isAnimating, setIsAnimating] = useState(false);
//     const [page, setPage] = useState(1);
//     const overlayPathRef = useRef<SVGPathElement>(null);
//     const frameRef = useRef<HTMLDivElement>(null);
//     const landingElRef = useRef<HTMLDivElement>(null);

//     const switchPages = () => {
//         if (page === 2) {
//             frameRef.current?.classList.add("frame--view-open");
//             landingElRef.current?.classList.add("view--open");
//         } else {
//             frameRef.current?.classList.remove("frame--view-open");
//             landingElRef.current?.classList.remove("view--open");
//         }
//     };

//     const reveal = () => {
//         if (isAnimating || !overlayPathRef.current) return;
//         setIsAnimating(true);
//         setPage(2);

//         gsap.timeline({
//             onComplete: () => setIsAnimating(false),
//         })
//             .set(overlayPathRef.current, {
//                 attr: { d: paths.step1.unfilled },
//             })
//             .to(
//                 overlayPathRef.current,
//                 {
//                     duration: 0.8,
//                     ease: "power4.in",
//                     attr: { d: paths.step1.inBetween.curve1 },
//                 },
//                 0
//             )
//             .to(overlayPathRef.current, {
//                 duration: 0.2,
//                 ease: "power1",
//                 attr: { d: paths.step1.filled },
//                 onComplete: switchPages,
//             })
//             .set(overlayPathRef.current, {
//                 attr: { d: paths.step2.filled },
//             })
//             .to(overlayPathRef.current, {
//                 duration: 0.2,
//                 ease: "sine.in",
//                 attr: { d: paths.step2.inBetween.curve1 },
//             })
//             .to(overlayPathRef.current, {
//                 duration: 1,
//                 ease: "power4",
//                 attr: { d: paths.step2.unfilled },
//             });
//     };

//     const unreveal = () => {
//         if (isAnimating || !overlayPathRef.current) return;
//         setIsAnimating(true);
//         setPage(1);

//         gsap.timeline({
//             onComplete: () => setIsAnimating(false),
//         })
//             .set(overlayPathRef.current, {
//                 attr: { d: paths.step2.unfilled },
//             })
//             .to(
//                 overlayPathRef.current,
//                 {
//                     duration: 0.8,
//                     ease: "power4.in",
//                     attr: { d: paths.step2.inBetween.curve2 },
//                 },
//                 0
//             )
//             .to(overlayPathRef.current, {
//                 duration: 0.2,
//                 ease: "power1",
//                 attr: { d: paths.step2.filled },
//                 onComplete: switchPages,
//             })
//             .set(overlayPathRef.current, {
//                 attr: { d: paths.step1.filled },
//             })
//             .to(overlayPathRef.current, {
//                 duration: 0.2,
//                 ease: "sine.in",
//                 attr: { d: paths.step1.inBetween.curve2 },
//             })
//             .to(overlayPathRef.current, {
//                 duration: 1,
//                 ease: "power4",
//                 attr: { d: paths.step1.unfilled },
//             });
//     };

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src =
//             "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js";
//         script.async = true;
//         document.body.appendChild(script);
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     return (
//         <main className="grid grid-cols-1 grid-rows-[100vh]">
//             <div
//                 ref={frameRef}
//                 className="col-start-1 col-end-2 row-start-1 row-end-2 p-6 pb-[10vh] text-center relative z-100 pointer-events-none"
//             >
//                 <h1 className="text-base font-medium m-0">
//                     Sketch 021: SVG Path Page Transition (Vertical)
//                 </h1>
//                 <nav className="my-2 mb-8">
//                     <a
//                         href="https://github.com/codrops/codrops-sketches/tree/main/021-svg-path-page-transition-vertical"
//                         className="pointer-events-auto mr-4"
//                     >
//                         GitHub
//                     </a>
//                     <a
//                         href="https://tympanus.net/codrops/sketches"
//                         className="pointer-events-auto"
//                     >
//                         Archive
//                     </a>
//                 </nav>
//                 <button
//                     onClick={reveal}
//                     className="text-black border border-black rounded-full min-w-[150px] py-4 px-8 hover:text-[#634c18] focus:text-[#634c18] transition-colors duration-300 pointer-events-auto"
//                 >
//                     Open
//                 </button>
//             </div>
//             <div className="view col-start-1 col-end-2 row-start-1 row-end-2 grid place-items-center bg-[#f3efe6]"></div>
//             <div
//                 ref={landingElRef}
//                 className="view col-start-1 col-end-2 row-start-1 row-end-2 grid place-items-center bg-[#cbb37e] pointer-events-none opacity-0 transition-opacity duration-300"
//             >
//                 <button
//                     onClick={unreveal}
//                     className="text-black border border-black rounded-full min-w-[150px] py-4 px-8 hover:text-[#634c18] focus:text-[#634c18] transition-colors duration-300"
//                 >
//                     Back
//                 </button>
//             </div>
//             <svg
//                 className="col-start-1 col-end-2 row-start-1 row-end-2 relative z-1000 pointer-events-none w-full h-full"
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//             >
//                 <path
//                     ref={overlayPathRef}
//                     className="vector-effect-non-scaling-stroke"
//                     d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
//                 />
//             </svg>
//         </main>
//     );
// };

// export default PageTransition;

// "use client";

// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";

// const paths = {
//     step1: {
//         unfilled: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
//         inBetween: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
//         filled: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
//     },
//     step2: {
//         filled: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
//         inBetween: "M 0 0 V 50 Q 50 100 100 50 V 0 z",
//         unfilled: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
//     },
// };

// const PageTransition: React.FC = () => {
//     const overlayPathRef = useRef<SVGPathElement>(null);
//     const frameRef = useRef<HTMLDivElement>(null);
//     const landingElRef = useRef<HTMLDivElement>(null);
//     const timeline = useRef<gsap.core.Timeline | null>(null);

//     const animate = (reverse = false) => {
//         if (timeline.current) timeline.current.kill();

//         timeline.current = gsap.timeline({
//             defaults: { duration: 0.3, ease: "power2.inOut" },
//         });

//         if (!reverse) {
//             timeline.current
//                 .set(landingElRef.current, { display: "grid", opacity: 0 })
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step1.inBetween },
//                     duration: 0.15,
//                     ease: "power1.in",
//                 })
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step1.filled },
//                     duration: 0.15,
//                     ease: "power1.out",
//                 })
//                 .to(frameRef.current, { opacity: 0 }, "<")
//                 .to(landingElRef.current, { opacity: 1 }, "<")
//                 .set(overlayPathRef.current, {
//                     attr: { d: paths.step2.filled },
//                 })
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step2.inBetween },
//                     duration: 0.15,
//                     ease: "power1.in",
//                 })
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step2.unfilled },
//                     duration: 0.15,
//                     ease: "power1.out",
//                 });
//         } else {
//             timeline.current
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step2.inBetween },
//                     duration: 0.15,
//                     ease: "power1.in",
//                 })
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step2.filled },
//                     duration: 0.15,
//                     ease: "power1.out",
//                 })
//                 .to(frameRef.current, { opacity: 1 }, "<")
//                 .to(landingElRef.current, { opacity: 0 }, "<")
//                 .set(overlayPathRef.current, {
//                     attr: { d: paths.step1.filled },
//                 })
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step1.inBetween },
//                     duration: 0.15,
//                     ease: "power1.in",
//                 })
//                 .to(overlayPathRef.current, {
//                     attr: { d: paths.step1.unfilled },
//                     duration: 0.15,
//                     ease: "power1.out",
//                 })
//                 .set(landingElRef.current, { display: "none" });
//         }
//     };

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src =
//             "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js";
//         script.async = true;
//         document.body.appendChild(script);
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     return (
//         <main className="grid grid-cols-1 grid-rows-[100vh]">
//             <div
//                 ref={frameRef}
//                 className="col-start-1 col-end-2 row-start-1 row-end-2 p-6 pb-[10vh] text-center relative z-20"
//             >
//                 <h1 className="text-base font-medium m-0">
//                     Sketch 021: SVG Path Page Transition (Vertical)
//                 </h1>
//                 <nav className="my-2 mb-8">
//                     <a
//                         href="https://github.com/codrops/codrops-sketches/tree/main/021-svg-path-page-transition-vertical"
//                         className="mr-4"
//                     >
//                         GitHub
//                     </a>
//                     <a href="https://tympanus.net/codrops/sketches">Archive</a>
//                 </nav>
//                 <button
//                     onClick={() => animate()}
//                     className="text-black border border-black rounded-full min-w-[150px] py-4 px-8 hover:text-[#634c18] focus:text-[#634c18] transition-colors duration-300"
//                 >
//                     Open
//                 </button>
//             </div>
//             <div
//                 ref={landingElRef}
//                 className="view col-start-1 col-end-2 row-start-1 row-end-2 place-items-center bg-[#cbb37e] hidden z-20"
//             >
//                 <button
//                     onClick={() => animate(true)}
//                     className="text-black border border-black rounded-full min-w-[150px] py-4 px-8 hover:text-[#634c18] focus:text-[#634c18] transition-colors duration-300"
//                 >
//                     Back
//                 </button>
//             </div>
//             <svg
//                 className="col-start-1 col-end-2 row-start-1 row-end-2 absolute inset-0 z-30 pointer-events-none w-full h-full"
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//             >
//                 <path
//                     ref={overlayPathRef}
//                     className="vector-effect-non-scaling-stroke"
//                     d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
//                 />
//             </svg>
//         </main>
//     );
// };

// export default PageTransition;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const paths = {
    step1: {
        unfilled: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
        inBetween: {
            curve1: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
            curve2: "M 0 100 V 50 Q 50 100 100 50 V 100 z",
        },
        filled: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
    },
    step2: {
        filled: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
        inBetween: {
            curve1: "M 0 0 V 50 Q 50 0 100 50 V 0 z",
            curve2: "M 0 0 V 50 Q 50 100 100 50 V 0 z",
        },
        unfilled: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
    },
};

const PageTransition: React.FC = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const overlayPathRef = useRef<SVGPathElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const landingElRef = useRef<HTMLDivElement>(null);

    const reveal = () => {
        if (isAnimating || !overlayPathRef.current) return;
        setIsAnimating(true);

        gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                if (landingElRef.current) {
                    landingElRef.current.style.pointerEvents = "auto";
                }
            },
        })
            .set(overlayPathRef.current, {
                attr: { d: paths.step1.unfilled },
            })
            .to(overlayPathRef.current, {
                duration: 0.8,
                ease: "power4.in",
                attr: { d: paths.step1.inBetween.curve1 },
            })
            .to(overlayPathRef.current, {
                duration: 0.2,
                ease: "power1",
                attr: { d: paths.step1.filled },
                onComplete: () => {
                    if (frameRef.current) frameRef.current.style.opacity = "0";
                    if (landingElRef.current) {
                        landingElRef.current.style.opacity = "1";
                        landingElRef.current.style.display = "grid";
                    }
                },
            })
            .set(overlayPathRef.current, {
                attr: { d: paths.step2.filled },
            })
            .to(overlayPathRef.current, {
                duration: 0.2,
                ease: "sine.in",
                attr: { d: paths.step2.inBetween.curve1 },
            })
            .to(overlayPathRef.current, {
                duration: 1,
                ease: "power4",
                attr: { d: paths.step2.unfilled },
            });
    };

    const unreveal = () => {
        if (isAnimating || !overlayPathRef.current) return;
        setIsAnimating(true);

        gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                if (landingElRef.current) {
                    landingElRef.current.style.display = "none";
                }
            },
        })
            .set(overlayPathRef.current, {
                attr: { d: paths.step2.unfilled },
            })
            .to(overlayPathRef.current, {
                duration: 0.8,
                ease: "power4.in",
                attr: { d: paths.step2.inBetween.curve2 },
            })
            .to(overlayPathRef.current, {
                duration: 0.2,
                ease: "power1",
                attr: { d: paths.step2.filled },
                onComplete: () => {
                    if (frameRef.current) frameRef.current.style.opacity = "1";
                    if (landingElRef.current) {
                        landingElRef.current.style.opacity = "0";
                        landingElRef.current.style.pointerEvents = "none";
                    }
                },
            })
            .set(overlayPathRef.current, {
                attr: { d: paths.step1.filled },
            })
            .to(overlayPathRef.current, {
                duration: 0.2,
                ease: "sine.in",
                attr: { d: paths.step1.inBetween.curve2 },
            })
            .to(overlayPathRef.current, {
                duration: 1,
                ease: "power4",
                attr: { d: paths.step1.unfilled },
            });
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <main className="grid grid-cols-1 grid-rows-[100vh]">
            <div
                ref={frameRef}
                className="col-start-1 col-end-2 row-start-1 row-end-2 p-6 pb-[10vh] text-center relative z-20"
            >
                <h1 className="text-base font-medium m-0">
                    Sketch 021: SVG Path Page Transition (Vertical)
                </h1>
                <nav className="my-2 mb-8">
                    <a
                        href="https://github.com/codrops/codrops-sketches/tree/main/021-svg-path-page-transition-vertical"
                        className="mr-4"
                    >
                        GitHub
                    </a>
                    <a href="https://tympanus.net/codrops/sketches">Archive</a>
                </nav>
                <button
                    onClick={reveal}
                    className="text-black border border-black rounded-full min-w-[150px] py-4 px-8 hover:text-[#634c18] focus:text-[#634c18] transition-colors duration-300"
                >
                    Open
                </button>
            </div>
            <div
                ref={landingElRef}
                className="view col-start-1 col-end-2 row-start-1 row-end-2 place-items-center bg-[#cbb37e] hidden opacity-0 z-20 pointer-events-none"
            >
                <button
                    onClick={unreveal}
                    className="text-black border border-black rounded-full min-w-[150px] py-4 px-8 hover:text-[#634c18] focus:text-[#634c18] transition-colors duration-300"
                >
                    Back
                </button>
            </div>
            <svg
                className="col-start-1 col-end-2 row-start-1 row-end-2 absolute inset-0 z-30 pointer-events-none w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    ref={overlayPathRef}
                    className="vector-effect-non-scaling-stroke"
                    d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
                />
            </svg>
        </main>
    );
};

export default PageTransition;
