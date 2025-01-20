// APItem.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface APItemProps {
    className: string;
    text: string;
    totalCells: number;
    effect: string;
}

const APItem: React.FC<APItemProps> = ({
    className,
    text,
    totalCells,
    effect,
}) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRefs = useRef<HTMLSpanElement[]>([]);

    // Set CSS variables and initial positions
    const setCSSValues = () => {
        if (!outerRef.current || innerRefs.current.length === 0) return;

        const inner = innerRefs.current[0];
        const computedWidth = window.getComputedStyle(inner).width;
        outerRef.current.style.setProperty("--text-width", computedWidth);
        outerRef.current.style.setProperty("--gsplits", totalCells.toString());

        const offset = parseFloat(computedWidth) / totalCells;
        innerRefs.current.forEach((el, pos) => {
            gsap.set(el, { left: -offset * pos });
        });
    };

    useEffect(() => {
        setCSSValues();

        window.addEventListener("resize", setCSSValues);

        return () => {
            window.removeEventListener("resize", setCSSValues);
        };
    }, [totalCells, text]);

    return (
        <div
            ref={outerRef}
            className={`gtext ${className}`}
            data-effect={effect}
            data-text={text}
        >
            {Array.from({ length: totalCells }, (_, i) => (
                <span key={i} className="gtext__box">
                    <span
                        className="gtext__box-inner"
                        ref={(el) => {
                            if (el) innerRefs.current[i] = el;
                        }}
                    >
                        {text}
                    </span>
                </span>
            ))}
        </div>
    );
};

export default APItem;
