"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ItemProps {
    className: string;
    text: string;
    totalCells: number;
    effect: string;
}

const Item: React.FC<ItemProps> = ({ className, text, totalCells, effect }) => {
    const outerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!outerRef.current) return;

        const el = outerRef.current;
        let newHTML = "";
        for (let i = 0; i < totalCells; ++i) {
            newHTML += `<span class="gtext__box"><span class="gtext__box-inner">${text}</span></span>`;
        }
        el.innerHTML = newHTML;

        const inner = el.querySelectorAll<HTMLSpanElement>(".gtext__box-inner");
        const computedWidth = window.getComputedStyle(inner[0]).width;
        el.style.setProperty("--text-width", computedWidth);
        el.style.setProperty("--gsplits", totalCells.toString());

        const offset = parseFloat(computedWidth) / totalCells;
        inner.forEach((innerEl, pos) => {
            gsap.set(innerEl, { left: -offset * pos });
        });
    }, [text, totalCells]);

    return (
        <div
            ref={outerRef}
            className={`gtext ${className}`}
            data-effect={effect}
            data-text={text}
        ></div>
    );
};

export default Item;
