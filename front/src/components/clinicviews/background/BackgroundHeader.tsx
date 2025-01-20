// "use client";

// import Link from "next/link";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTheme } from "next-themes";

// gsap.registerPlugin(ScrollTrigger);

// export default function BackgroundHeader() {
//     const { theme } = useTheme();
//     const headerRef = useRef<HTMLElement>(null);
//     const videoContainerRef = useRef<HTMLDivElement>(null);
//     const textRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (headerRef.current && videoContainerRef.current && textRef.current) {
//             gsap.to(videoContainerRef.current, {
//                 y: "5%",
//                 scale: 1.05,
//                 scrollTrigger: {
//                     trigger: headerRef.current,
//                     start: "top top",
//                     end: "bottom top",
//                     scrub: true,
//                 },
//             });

//             gsap.to(textRef.current, {
//                 y: "-50%",
//                 opacity: 0,
//                 scrollTrigger: {
//                     trigger: headerRef.current,
//                     start: "top top",
//                     end: "center top",
//                     scrub: true,
//                 },
//             });
//         }
//     }, []);

//     return (
//         <header ref={headerRef} className="relative h-screen overflow-hidden">
//             <div className="absolute inset-0 bg-grid-pattern opacity-10 z-10"></div>
//             <div ref={videoContainerRef} className="absolute inset-0">
//                 <video
//                     autoPlay
//                     muted
//                     loop
//                     className="w-full h-full object-cover"
//                     src="/background/images/calm.mp4"
//                 />
//                 <div
//                     className={`absolute inset-0 ${theme === "dark" ? "bg-black/30" : "bg-white/30"} transition-colors duration-500`}
//                 ></div>
//             </div>
//             <div
//                 ref={textRef}
//                 className="absolute inset-0 flex flex-col justify-center items-center z-20"
//             >
//                 <h1 className="text-center">
//                     <span className="block text-sm sm:text-lg text-accent uppercase">
//                         LOMA LINDA
//                     </span>
//                     <span className="text-2xl sm:text-4xl md:text-6xl">
//                         Psychiatric Medical Group
//                     </span>
//                 </h1>
//                 <p className="mt-4 text-xl max-w-2xl text-center px-4">
//                     Dedicated to providing excellent mental health care for all
//                     age groups
//                 </p>
//             </div>
//             <Link
//                 href="#read"
//                 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 aspect-square grid place-items-center text-white z-20"
//             >
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="w-9 h-9"
//                 >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
//                     />
//                 </svg>
//             </Link>
//         </header>
//     );
// }

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundHeader() {
    const { theme } = useTheme();
    const headerRef = useRef<HTMLElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (headerRef.current && videoContainerRef.current && textRef.current) {
            gsap.to(videoContainerRef.current, {
                y: "5%",
                scale: 1.05,
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(textRef.current, {
                y: "-50%",
                opacity: 0,
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top top",
                    end: "center top",
                    scrub: true,
                },
            });
        }
    }, []);

    return (
        <header ref={headerRef} className="relative h-screen overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10"></div>
            <div ref={videoContainerRef} className="absolute inset-0">
                <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                    src="/background/images/calm.mp4"
                />
                <div
                    className={`absolute inset-0 ${theme === "dark" ? "bg-black/30" : "bg-white/30"} transition-colors duration-500`}
                ></div>
            </div>
            <div
                ref={textRef}
                className="absolute inset-0 flex flex-col justify-center items-center z-20"
            >
                <h1 className="text-center">
                    <span className="block text-sm sm:text-lg text-accent uppercase">
                        LOMA LINDA
                    </span>
                    <span className="text-2xl sm:text-4xl md:text-6xl">
                        Psychiatric Medical Group
                    </span>
                </h1>
                <p className="mt-4 text-xl max-w-2xl text-center px-4">
                    Dedicated to providing excellent mental health care for all
                    age groups
                </p>
            </div>
            <Link
                href="#read"
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 aspect-square grid place-items-center text-white z-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-9 h-9"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                </svg>
            </Link>
        </header>
    );
}
