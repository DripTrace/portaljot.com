"use client";

import { useEffect, useRef } from "react";

const HypeMessage = () => {
    const words = [
        "GET READY",
        "NFT SUPERAPP",
        "MVP LAUNCH DAY",
        "May 31st",
        // "MVP",
        // "DAO",
        // "DeFi",
        // "IPFS",
        // "ETH",
        // "SOL",
        // "LUNA",
        // "AVAX",
        // "FTM",
        // "MATIC",
        // "BSC",
        // "ALGO",
        // "ATOM",
        // "XTZ",
        // "DOT",
        // "KSM",
        // "ADA",
        // "LINK",
        // "UNI",
        // "AAVE",
        // "SUSHI",
        // "YFI",
        // "COMP",
        // "SNX",
        // "CRV",
        // "BAL",
        // "MKR",
        // "1INCH",
        // "REN",
        // "RUNE",
        // "BNT",
        // "ZRX",
        // "GRT",
        // "UMA",
        // "LRC",
        // "OCEAN",
    ];
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (wrapper) {
            wrapper.innerHTML = ""; // Clear previous content
            words.forEach((word, index) => {
                const div = document.createElement("div");
                div.className = "word-properties";
                div.textContent = word;
                div.style.animationDelay = `${index * 3}s`; // Custom delay for each word
                wrapper.appendChild(div);
            });
        }
    }, []);

    return <div ref={wrapperRef} className="word-wrapper-properties" />;
};

export default HypeMessage;
