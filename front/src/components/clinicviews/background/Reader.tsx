"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const content = `We are a behavioral health practice committed to providing excellent mental health care. Our multidisciplinary team of competent and compassionate clinicians offers comprehensive diagnostic and treatment services for all age groups - children, adolescents, adults, and seniors.`;

const PPC = 10; // Pixels per character
const BUFFER = 40;

export default function Reader() {
    const readerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!readerRef.current || !contentRef.current) return;

        const words = content.split(" ");
        const contentLength = content.length;

        document.documentElement.style.setProperty(
            "--buffer",
            BUFFER.toString()
        );
        document.documentElement.style.setProperty("--ppc", PPC.toString());
        document.documentElement.style.setProperty("--pad", "8");
        document.documentElement.style.setProperty(
            "--content-length",
            (contentLength + 2).toString()
        );

        let cumulation = 10;
        contentRef.current.innerHTML = "";

        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.innerHTML = `<span>${word} </span>`;
            span.style.cssText = `
        --index: ${index};
        --start: ${cumulation};
        --end: ${cumulation + word.length};
      `;
            span.dataset.index = index.toString();
            span.dataset.start = cumulation.toString();
            span.dataset.end = (cumulation + word.length).toString();
            cumulation += word.length + 1;
            if (contentRef.current) {
                contentRef.current.appendChild(span);
            }
        });

        if (!CSS.supports("animation-timeline: scroll()")) {
            gsap.registerPlugin(ScrollTrigger);

            Array.from(contentRef.current.children).forEach((word) => {
                if (word instanceof HTMLElement) {
                    gsap.fromTo(
                        word,
                        { "--active": 0 },
                        {
                            "--active": 1,
                            ease: "steps(1)",
                            scrollTrigger: {
                                trigger: readerRef.current,
                                start: `top top-=${Number(word.dataset.start) * PPC}`,
                                end: `top top-=${Number(word.dataset.end) * PPC}`,
                                scrub: true,
                            },
                        }
                    );
                }
            });
        }
    }, []);

    return (
        <section ref={readerRef} className="reader" id="read">
            <div className="content">
                <div className="sr-only">{content}</div>
                <div ref={contentRef} data-split aria-hidden="true"></div>
            </div>
        </section>
    );
}
