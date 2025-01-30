"use client";

import { useEffect } from "react";

const HypeLogo = () => {
    useEffect(() => {
        const spans = document.querySelectorAll('span[aria-hidden="true"]');
        spans.forEach((span, index) => {
            const delay = index * 0.25; // Calculate delay based on index
            (span as HTMLElement).style.animationDelay = `${delay}s`; // Use type assertion to specify that span is an HTMLElement
        });
    }, []); // Ensures this runs once after initial render

    return (
        <div className="ovation-wrap">
            <p className="ovation-word">
                {"Ovation".split("").map((letter, index) => (
                    <span key={index} aria-hidden="true">
                        {letter}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default HypeLogo;
