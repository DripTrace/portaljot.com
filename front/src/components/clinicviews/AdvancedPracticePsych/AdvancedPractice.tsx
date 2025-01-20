// // "use client";

// // import { useEffect, useRef, useLayoutEffect } from "react";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import Link from "next/link";

// // gsap.registerPlugin(ScrollTrigger);

// // const AdvancedPractice: React.FC = () => {
// //     const mainRef = useRef<HTMLElement>(null);

// //     useLayoutEffect(() => {
// //         gsap.registerPlugin(ScrollTrigger);
// //         ScrollTrigger.defaults({
// //             scroller: mainRef.current,
// //         });

// //         return () => {
// //             ScrollTrigger.getAll().forEach((t) => t.kill());
// //         };
// //     }, []);

// //     useEffect(() => {
// //         const ctx = gsap.context(() => {
// //             initItems();
// //             initAnimations();
// //         }, mainRef);

// //         return () => ctx.revert();
// //     }, []);

// //     const initItems = () => {
// //         const gtextElements =
// //             mainRef.current?.querySelectorAll<HTMLDivElement>("[data-text]");
// //         gtextElements?.forEach((el) => {
// //             const text = el.getAttribute("data-text") || "";
// //             const effect = el.getAttribute("data-effect");
// //             let totalCells = 6;

// //             if (effect === "1" || effect === "2" || effect === "3") {
// //                 totalCells = 4;
// //             } else if (effect === "4") {
// //                 totalCells = 6;
// //             }

// //             let newHTML = "";
// //             for (let i = 0; i < totalCells; ++i) {
// //                 newHTML += `<span class="gtext__box"><span class="gtext__box-inner">${text}</span></span>`;
// //             }

// //             el.innerHTML = newHTML;

// //             const inner =
// //                 el.querySelectorAll<HTMLSpanElement>(".gtext__box-inner");
// //             const computedWidth = window.getComputedStyle(inner[0]).width;
// //             el.style.setProperty("--text-width", computedWidth);
// //             el.style.setProperty("--gsplits", totalCells.toString());

// //             const offset = parseFloat(computedWidth) / totalCells;
// //             inner.forEach((innerEl, pos) => {
// //                 gsap.set(innerEl, { left: -offset * pos });
// //             });
// //         });
// //     };

// //     const initAnimations = () => {
// //         const items = mainRef.current?.querySelectorAll<HTMLDivElement>(
// //             ".gtext[data-effect]"
// //         );
// //         const images =
// //             mainRef.current?.querySelectorAll<HTMLDivElement>(".deco__item");

// //         items?.forEach((item) => {
// //             const itemInner =
// //                 item.querySelectorAll<HTMLSpanElement>(".gtext__box-inner");

// //             gsap.fromTo(
// //                 itemInner,
// //                 {
// //                     xPercent: (index, _, targets) =>
// //                         index < targets.length / 2
// //                             ? -100 * index - 100
// //                             : 100 * (index - targets.length / 2) + 100,
// //                 },
// //                 {
// //                     xPercent: 0,
// //                     ease: "power1.inOut",
// //                     scrollTrigger: {
// //                         trigger: item,
// //                         start: "top bottom",
// //                         end: "bottom top",
// //                         scrub: 1,
// //                     },
// //                 }
// //             );
// //         });

// //         images?.forEach((image) => {
// //             gsap.fromTo(
// //                 image,
// //                 {
// //                     yPercent: 20,
// //                     scale: 0.8,
// //                 },
// //                 {
// //                     yPercent: 0,
// //                     scale: 1,
// //                     ease: "none",
// //                     scrollTrigger: {
// //                         trigger: image,
// //                         start: "top bottom",
// //                         end: "bottom top",
// //                         scrub: true,
// //                     },
// //                 }
// //             );
// //         });
// //     };

// //     return (
// //         <main ref={mainRef} className="main-container">
// //             <header className="frame frame--header">
// //                 <h1 className="frame__title">Advanced Practice</h1>
// //                 <Link href="/" className="frame__back">
// //                     About Us
// //                 </Link>
// //                 <Link href="/" className="frame__prev">
// //                     Contact
// //                 </Link>
// //                 <Link href="/" className="frame__sub">
// //                     Services
// //                 </Link>
// //             </header>

// //             <div className="deco">
// //                 {[...Array(18)].map((_, i) => (
// //                     <div
// //                         key={i}
// //                         className="deco__item"
// //                         style={{
// //                             backgroundImage: `url(/advanced-practice-psych/img/images/${i + 1}.jpg)`,
// //                         }}
// //                     ></div>
// //                 ))}
// //             </div>

// //             <div className="content">
// //                 <p>
// //                     At Advanced Practice,
// //                     <br />
// //                     We are committed to advancing the knowledge
// //                     <br />
// //                     of mental health professionals.
// //                     <br />
// //                     You'd enhance your skills through our curated programs
// //                     <br />
// //                     and deepen your understanding of psychiatric care.
// //                 </p>

// //                 <h2
// //                     className="gtext size-s font-4 end"
// //                     data-text="Enhance Your Practice"
// //                 >
// //                     Enhance Your Practice
// //                 </h2>
// //             </div>

// //             <div className="content content--full">
// //                 <h3
// //                     className="gtext size-xxl font-5 shadow-1 spaced"
// //                     data-text="expertise"
// //                     data-effect="1"
// //                 >
// //                     expertise
// //                 </h3>
// //             </div>

// //             <div className="content">
// //                 <p>
// //                     For years, we have dedicated ourselves to helping
// //                     <br />
// //                     psychiatric professionals gain new insights and skills.
// //                     <br />
// //                     You'd grow your expertise through our evidence-based
// //                     <br />
// //                     learning modules and expand your knowledge of modern
// //                     psychiatric practice.
// //                 </p>

// //                 <h2
// //                     className="gtext size-s font-5 end"
// //                     data-text="Expand Your Knowledge"
// //                 >
// //                     Expand Your Knowledge
// //                 </h2>
// //             </div>

// //             <div className="content content--full">
// //                 <h3
// //                     className="gtext size-xl font-4 shadow-2 color-1 spaced"
// //                     data-text="education"
// //                     data-effect="2"
// //                 >
// //                     education
// //                 </h3>
// //             </div>

// //             <div className="content">
// //                 <p>
// //                     Through quiet reflection and rigorous study,
// //                     <br />
// //                     You can elevate your psychiatric practice.
// //                     <br />
// //                     You'd find clarity through our well-structured courses
// //                     <br />
// //                     and feel empowered to bring new ideas into your work.
// //                 </p>

// //                 <h2
// //                     className="gtext size-s font-1 end"
// //                     data-text="Start Learning"
// //                 >
// //                     Start Learning
// //                 </h2>
// //             </div>

// //             <div className="content content--full">
// //                 <h3
// //                     className="gtext size-xl font-7 shadow-1 spaced"
// //                     data-text="growth"
// //                     data-effect="3"
// //                 >
// //                     growth
// //                 </h3>
// //             </div>

// //             <div className="content content--full">
// //                 <h2
// //                     className="gtext size-m font-7 end"
// //                     data-text="Continue Your Journey"
// //                 >
// //                     Continue Your Journey
// //                 </h2>
// //             </div>

// //             <div className="content">
// //                 <p>
// //                     In a world of ever-evolving mental health challenges,
// //                     <br />
// //                     We stand ready to help you stay informed.
// //                     <br />
// //                     You'd stay updated on the latest research and techniques
// //                     <br />
// //                     and bring fresh approaches to your practice.
// //                 </p>
// //             </div>

// //             <div className="content content--full">
// //                 <h3
// //                     className="gtext size-xl font-2 shadow-2 color-1 blendmode-1 spaced"
// //                     data-text="innovation"
// //                     data-effect="4"
// //                 >
// //                     innovation
// //                 </h3>
// //             </div>

// //             <div className="content content--full">
// //                 <h2
// //                     className="gtext size-m font-4 end"
// //                     data-text="Embrace New Knowledge"
// //                 >
// //                     Embrace New Knowledge
// //                 </h2>
// //             </div>

// //             <div className="content">
// //                 <p>
// //                     With the right educational resources,
// //                     <br />
// //                     Even the most complex psychiatric challenges can be met.
// //                     <br />
// //                     You'd discover new possibilities through our training
// //                     programs
// //                     <br />
// //                     and explore innovations that lead to improved patient care.
// //                 </p>

// //                 <h2
// //                     className="gtext size-s font-1 end"
// //                     data-text="Lead the Change"
// //                 >
// //                     Lead the Change
// //                 </h2>
// //             </div>

// //             <div className="content content--full">
// //                 <h3
// //                     className="gtext size-xxl font-6 shadow-1 spaced"
// //                     data-text="professionalism"
// //                     data-effect="5"
// //                 >
// //                     professionalism
// //                 </h3>

// //                 <p>
// //                     As you grow in your career,
// //                     <br />
// //                     You'd feel empowered to make a lasting impact in psychiatric
// //                     care.
// //                     <br />
// //                     Our programs are designed to enhance your professional
// //                     journey,
// //                     <br />
// //                     fostering confidence and competence.
// //                 </p>
// //             </div>

// //             <div className="content">
// //                 <h2
// //                     className="gtext size-s font-1 end"
// //                     data-text="Take the Next Step"
// //                 >
// //                     Take the Next Step
// //                 </h2>
// //             </div>

// //             <div className="content content--full">
// //                 <h3
// //                     className="gtext size-xl font-3 shadow-1 spaced"
// //                     data-text="clarity"
// //                     data-effect="6"
// //                 >
// //                     clarity
// //                 </h3>

// //                 <p>
// //                     Our mission at Advanced Practice
// //                     <br />
// //                     is to guide you through every step of your professional
// //                     journey.
// //                     <br />
// //                     You'd gain clarity and confidence as you evolve as a
// //                     psychiatric practitioner,
// //                     <br />
// //                     and embrace the knowledge that will help you thrive.
// //                 </p>
// //             </div>

// //             <footer className="frame frame--footer">
// //                 <span>
// //                     <Link href="https://www.instagram.com/advancedpractice/">
// //                         @advancedpractice
// //                     </Link>
// //                 </span>
// //                 <Link href="https://www.youtube.com/@AdvanCEdpractice-io/videos">
// //                     Subscribe
// //                 </Link>
// //             </footer>
// //         </main>
// //     );
// // };

// // export default AdvancedPractice;

// "use client";

// import { useEffect, useRef, useLayoutEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";

// gsap.registerPlugin(ScrollTrigger);

// const AdvancedPractice: React.FC = () => {
//     const mainRef = useRef<HTMLElement>(null);

//     useLayoutEffect(() => {
//         gsap.registerPlugin(ScrollTrigger);
//         ScrollTrigger.defaults({
//             scroller: mainRef.current,
//         });

//         return () => {
//             ScrollTrigger.getAll().forEach((t) => t.kill());
//         };
//     }, []);

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             initItems();
//             initAnimations();
//         }, mainRef);

//         return () => ctx.revert();
//     }, []);

//     const initItems = () => {
//         const gtextElements =
//             mainRef.current?.querySelectorAll<HTMLDivElement>("[data-text]");
//         gtextElements?.forEach((el) => {
//             const text = el.getAttribute("data-text") || "";
//             const effect = el.getAttribute("data-effect");
//             let totalCells = 6;

//             if (effect === "1" || effect === "2" || effect === "3") {
//                 totalCells = 4;
//             } else if (effect === "4") {
//                 totalCells = 6;
//             }

//             let newHTML = "";
//             for (let i = 0; i < totalCells; ++i) {
//                 newHTML += `<span class="gtext__box"><span class="gtext__box-inner">${text}</span></span>`;
//             }

//             el.innerHTML = newHTML;

//             const inner =
//                 el.querySelectorAll<HTMLSpanElement>(".gtext__box-inner");
//             const computedWidth = window.getComputedStyle(inner[0]).width;
//             el.style.setProperty("--text-width", computedWidth);
//             el.style.setProperty("--gsplits", totalCells.toString());

//             const offset = parseFloat(computedWidth) / totalCells;
//             inner.forEach((innerEl, pos) => {
//                 gsap.set(innerEl, { left: -offset * pos });
//             });
//         });
//     };

//     const initAnimations = () => {
//         const items = mainRef.current?.querySelectorAll<HTMLDivElement>(
//             ".gtext[data-effect]"
//         );
//         const images =
//             mainRef.current?.querySelectorAll<HTMLDivElement>(".deco__item");

//         items?.forEach((item) => {
//             const itemInner =
//                 item.querySelectorAll<HTMLSpanElement>(".gtext__box-inner");
//             const effect = item.getAttribute("data-effect");

//             gsap.fromTo(
//                 itemInner,
//                 {
//                     yPercent: (index, _, targets) =>
//                         index < targets.length / 2 ? -100 : 100,
//                     opacity: 0,
//                 },
//                 {
//                     yPercent: 0,
//                     opacity: 1,
//                     ease: "power2.out",
//                     stagger: 0.03,
//                     scrollTrigger: {
//                         trigger: item,
//                         start: "top bottom",
//                         end: "bottom top",
//                         scrub: 1,
//                     },
//                 }
//             );

//             if (effect === "4") {
//                 gsap.fromTo(
//                     itemInner,
//                     { rotation: (index) => (index % 2 ? 90 : -90) },
//                     {
//                         rotation: 0,
//                         ease: "power2.out",
//                         scrollTrigger: {
//                             trigger: item,
//                             start: "top bottom",
//                             end: "bottom top",
//                             scrub: 1,
//                         },
//                     }
//                 );
//             }
//         });

//         images?.forEach((image) => {
//             gsap.fromTo(
//                 image,
//                 {
//                     yPercent: 20,
//                     scale: 0.8,
//                     rotationX: 20,
//                     rotationY: -20,
//                 },
//                 {
//                     yPercent: -20,
//                     scale: 1,
//                     rotationX: -20,
//                     rotationY: 20,
//                     ease: "none",
//                     scrollTrigger: {
//                         trigger: image,
//                         start: "top bottom",
//                         end: "bottom top",
//                         scrub: true,
//                     },
//                 }
//             );
//         });
//     };

//     return (
//         <main ref={mainRef} className="main-container">
//             <header className="frame frame--header">
//                 <h1 className="frame__title">Advanced Practice</h1>
//                 <Link href="/" className="frame__back">
//                     About Us
//                 </Link>
//                 <Link href="/" className="frame__prev">
//                     Contact
//                 </Link>
//                 <Link href="/" className="frame__sub">
//                     Services
//                 </Link>
//             </header>

//             {/* <div className="deco">
//                 {[...Array(18)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="deco__item"
//                         style={{
//                             backgroundImage: `url(/advanced-practice-psych/img/images/${i + 1}.jpg)`,
//                         }}
//                     ></div>
//                 ))}
//             </div> */}

//             <div className="content">
//                 <p>
//                     At Advanced Practice,
//                     <br />
//                     We are committed to advancing the knowledge
//                     <br />
//                     of mental health professionals.
//                     <br />
//                     You'd enhance your skills through our curated programs
//                     <br />
//                     and deepen your understanding of psychiatric care.
//                 </p>

//                 <h2
//                     className="gtext size-s font-4 end"
//                     data-text="Enhance Your Practice"
//                 >
//                     Enhance Your Practice
//                 </h2>
//             </div>

//             <div className="content content--full">
//                 <h3
//                     className="gtext size-xxl font-5 shadow-1 spaced"
//                     data-text="expertise"
//                     data-effect="1"
//                 >
//                     expertise
//                 </h3>
//             </div>

//             <div className="content">
//                 <p>
//                     For years, we have dedicated ourselves to helping
//                     <br />
//                     psychiatric professionals gain new insights and skills.
//                     <br />
//                     You'd grow your expertise through our evidence-based
//                     <br />
//                     learning modules and expand your knowledge of modern
//                     psychiatric practice.
//                 </p>

//                 <h2
//                     className="gtext size-s font-5 end"
//                     data-text="Expand Your Knowledge"
//                 >
//                     Expand Your Knowledge
//                 </h2>
//             </div>

//             <div className="content content--full">
//                 <h3
//                     className="gtext size-xl font-4 shadow-2 color-1 spaced"
//                     data-text="education"
//                     data-effect="2"
//                 >
//                     education
//                 </h3>
//             </div>

//             <div className="content">
//                 <p>
//                     Through quiet reflection and rigorous study,
//                     <br />
//                     You can elevate your psychiatric practice.
//                     <br />
//                     You'd find clarity through our well-structured courses
//                     <br />
//                     and feel empowered to bring new ideas into your work.
//                 </p>

//                 <h2
//                     className="gtext size-s font-1 end"
//                     data-text="Start Learning"
//                 >
//                     Start Learning
//                 </h2>
//             </div>

//             <div className="content content--full">
//                 <h3
//                     className="gtext size-xl font-7 shadow-1 spaced"
//                     data-text="growth"
//                     data-effect="3"
//                 >
//                     growth
//                 </h3>
//             </div>

//             <div className="content content--full">
//                 <h2
//                     className="gtext size-m font-7 end"
//                     data-text="Continue Your Journey"
//                 >
//                     Continue Your Journey
//                 </h2>
//             </div>

//             <div className="content">
//                 <p>
//                     In a world of ever-evolving mental health challenges,
//                     <br />
//                     We stand ready to help you stay informed.
//                     <br />
//                     You'd stay updated on the latest research and techniques
//                     <br />
//                     and bring fresh approaches to your practice.
//                 </p>
//             </div>

//             <div className="content content--full">
//                 <h3
//                     className="gtext size-xl font-2 shadow-2 color-1 blendmode-1 spaced"
//                     data-text="innovation"
//                     data-effect="4"
//                 >
//                     innovation
//                 </h3>
//             </div>

//             <div className="content content--full">
//                 <h2
//                     className="gtext size-m font-4 end"
//                     data-text="Embrace New Knowledge"
//                 >
//                     Embrace New Knowledge
//                 </h2>
//             </div>

//             <div className="content">
//                 <p>
//                     With the right educational resources,
//                     <br />
//                     Even the most complex psychiatric challenges can be met.
//                     <br />
//                     You'd discover new possibilities through our training
//                     programs
//                     <br />
//                     and explore innovations that lead to improved patient care.
//                 </p>

//                 <h2
//                     className="gtext size-s font-1 end"
//                     data-text="Lead the Change"
//                 >
//                     Lead the Change
//                 </h2>
//             </div>

//             <div className="content content--full">
//                 <h3
//                     className="gtext size-xxl font-6 shadow-1 spaced"
//                     data-text="professionalism"
//                     data-effect="5"
//                 >
//                     professionalism
//                 </h3>

//                 <p>
//                     As you grow in your career,
//                     <br />
//                     You'd feel empowered to make a lasting impact in psychiatric
//                     care.
//                     <br />
//                     Our programs are designed to enhance your professional
//                     journey,
//                     <br />
//                     fostering confidence and competence.
//                 </p>
//             </div>

//             <div className="content">
//                 <h2
//                     className="gtext size-s font-1 end"
//                     data-text="Take the Next Step"
//                 >
//                     Take the Next Step
//                 </h2>
//             </div>

//             <div className="content content--full">
//                 <h3
//                     className="gtext size-xl font-3 shadow-1 spaced"
//                     data-text="clarity"
//                     data-effect="6"
//                 >
//                     clarity
//                 </h3>

//                 <p>
//                     Our mission at Advanced Practice
//                     <br />
//                     is to guide you through every step of your professional
//                     journey.
//                     <br />
//                     You'd gain clarity and confidence as you evolve as a
//                     psychiatric practitioner,
//                     <br />
//                     and embrace the knowledge that will help you thrive.
//                 </p>
//             </div>

//             <footer className="frame frame--footer">
//                 <span>
//                     <Link href="https://www.instagram.com/advancedpractice/">
//                         @advancedpractice
//                     </Link>
//                 </span>
//                 <Link href="https://www.youtube.com/@AdvanCEdpractice-io/videos">
//                     Subscribe
//                 </Link>
//             </footer>
//         </main>
//     );
// };

// export default AdvancedPractice;

"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const AdvancedPractice: React.FC = () => {
    const mainRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.defaults({
            scroller: mainRef.current,
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            initItems();
            initAnimations();
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const initItems = () => {
        const gtextElements =
            mainRef.current?.querySelectorAll<HTMLDivElement>("[data-text]");
        gtextElements?.forEach((el) => {
            const text = el.getAttribute("data-text") || "";
            const effect = el.getAttribute("data-effect");
            let totalCells = 6;

            if (effect === "1" || effect === "2" || effect === "3") {
                totalCells = 4;
            } else if (effect === "4") {
                totalCells = 6;
            }

            let newHTML = "";
            for (let i = 0; i < totalCells; ++i) {
                newHTML += `<span class="gtext__box"><span class="gtext__box-inner">${text}</span></span>`;
            }

            el.innerHTML = newHTML;

            const inner =
                el.querySelectorAll<HTMLSpanElement>(".gtext__box-inner");
            const computedWidth = window.getComputedStyle(inner[0]).width;
            el.style.setProperty("--text-width", computedWidth);
            el.style.setProperty("--gsplits", totalCells.toString());

            const offset = parseFloat(computedWidth) / totalCells;
            inner.forEach((innerEl, pos) => {
                gsap.set(innerEl, { left: -offset * pos });
            });
        });
    };

    const initAnimations = () => {
        const items = mainRef.current?.querySelectorAll<HTMLDivElement>(
            ".gtext[data-effect]"
        );
        const images =
            mainRef.current?.querySelectorAll<HTMLDivElement>(".deco__item");

        items?.forEach((item) => {
            const itemInner =
                item.querySelectorAll<HTMLSpanElement>(".gtext__box-inner");

            gsap.fromTo(
                itemInner,
                {
                    yPercent: (index, _, targets) =>
                        index < targets.length / 2 ? -100 : 100,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    ease: "power2.out",
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );
        });

        images?.forEach((image) => {
            gsap.fromTo(
                image,
                {
                    yPercent: 20,
                    scale: 0.8,
                    opacity: 0.5,
                },
                {
                    yPercent: 0,
                    scale: 1,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: image,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });
    };

    return (
        <main ref={mainRef} className="main-container">
            <header className="frame frame--header">
                <h1 className="frame__title">Advanced Practice</h1>
                <nav className="frame__nav">
                    <Link href="/" className="nav-link">
                        About Us
                    </Link>
                    <Link href="/" className="nav-link">
                        Contact
                    </Link>
                    <Link href="/" className="nav-link">
                        Services
                    </Link>
                </nav>
            </header>

            <div className="deco">
                {[...Array(18)].map((_, i) => (
                    <div
                        key={i}
                        className="deco__item"
                        style={{
                            backgroundImage: `url(/advanced-practice-psych/img/images/${i + 1}.jpg)`,
                        }}
                    ></div>
                ))}
            </div>

            <section className="content">
                <p>
                    At Advanced Practice,
                    <br />
                    We are committed to advancing the knowledge
                    <br />
                    of mental health professionals.
                    <br />
                    You'd enhance your skills through our curated programs
                    <br />
                    and deepen your understanding of psychiatric care.
                </p>

                <h2
                    className="gtext size-s font-4 end"
                    data-text="Enhance Your Practice"
                >
                    Enhance Your Practice
                </h2>
            </section>

            <section className="content content--full bg-light">
                <h3
                    className="gtext size-xxl font-5 shadow-1 spaced"
                    data-text="expertise"
                    data-effect="1"
                >
                    expertise
                </h3>
                <p>
                    For years, we have dedicated ourselves to helping
                    <br />
                    psychiatric professionals gain new insights and skills.
                    <br />
                    You'd grow your expertise through our evidence-based
                    <br />
                    learning modules and expand your knowledge of modern
                    psychiatric practice.
                </p>

                <h2
                    className="gtext size-s font-5 end"
                    data-text="Expand Your Knowledge"
                >
                    Expand Your Knowledge
                </h2>
            </section>

            <section className="content content--full bg-brighter">
                <h3
                    className="gtext size-xl font-4 shadow-2 color-1 spaced"
                    data-text="education"
                    data-effect="2"
                >
                    education
                </h3>
                <p>
                    Through quiet reflection and rigorous study,
                    <br />
                    You can elevate your psychiatric practice.
                    <br />
                    You'd find clarity through our well-structured courses
                    <br />
                    and feel empowered to bring new ideas into your work.
                </p>

                <h2
                    className="gtext size-s font-1 end"
                    data-text="Start Learning"
                >
                    Start Learning
                </h2>
            </section>

            <section className="content content--full">
                <h3
                    className="gtext size-xl font-7 shadow-1 spaced"
                    data-text="growth"
                    data-effect="3"
                >
                    growth
                </h3>

                <h2
                    className="gtext size-m font-7 end"
                    data-text="Continue Your Journey"
                >
                    Continue Your Journey
                </h2>
            </section>

            <section className="content">
                <p>
                    In a world of ever-evolving mental health challenges,
                    <br />
                    We stand ready to help you stay informed.
                    <br />
                    You'd stay updated on the latest research and techniques
                    <br />
                    and bring fresh approaches to your practice.
                </p>
            </section>

            <section className="content content--full bg-light">
                <h3
                    className="gtext size-xl font-2 shadow-2 color-1 blendmode-1 spaced"
                    data-text="innovation"
                    data-effect="4"
                >
                    innovation
                </h3>

                <h2
                    className="gtext size-m font-4 end"
                    data-text="Embrace New Knowledge"
                >
                    Embrace New Knowledge
                </h2>
            </section>

            <section className="content">
                <p>
                    With the right educational resources,
                    <br />
                    Even the most complex psychiatric challenges can be met.
                    <br />
                    You'd discover new possibilities through our training
                    programs
                    <br />
                    and explore innovations that lead to improved patient care.
                </p>

                <h2
                    className="gtext size-s font-1 end"
                    data-text="Lead the Change"
                >
                    Lead the Change
                </h2>
            </section>

            <section className="content content--full">
                <h3
                    className="gtext size-xxl font-6 shadow-1 spaced"
                    data-text="professionalism"
                    data-effect="5"
                >
                    professionalism
                </h3>

                <p>
                    As you grow in your career,
                    <br />
                    You'd feel empowered to make a lasting impact in psychiatric
                    care.
                    <br />
                    Our programs are designed to enhance your professional
                    journey,
                    <br />
                    fostering confidence and competence.
                </p>
            </section>

            <section className="content content--full">
                <h3
                    className="gtext size-xl font-3 shadow-1 spaced"
                    data-text="clarity"
                    data-effect="6"
                >
                    clarity
                </h3>

                <p>
                    Our mission at Advanced Practice
                    <br />
                    is to guide you through every step of your professional
                    journey.
                    <br />
                    You'd gain clarity and confidence as you evolve as a
                    psychiatric practitioner,
                    <br />
                    and embrace the knowledge that will help you thrive.
                </p>
            </section>

            <footer className="frame frame--footer">
                <span>
                    <Link
                        href="https://www.instagram.com/advancedpractice/"
                        className="social-link"
                    >
                        @advancedpractice
                    </Link>
                </span>
                <Link
                    href="https://www.youtube.com/@AdvanCEdpractice-io/videos"
                    className="social-link"
                >
                    Subscribe
                </Link>
            </footer>
        </main>
    );
};

export default AdvancedPractice;
