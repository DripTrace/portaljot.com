"use client";

import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

// Use require for importing audio files
// const music = require("/assets/russell/audio/ATLiens_-_Witch_Doctor_-_G-Rex_and_Peekaboo_Remix.mp3");

// Define theme interface
interface Theme {
    text: string;
    body: string;
}

const Box = styled.div`
    display: flex;
    cursor: pointer;
    position: fixed;
    left: 8rem;
    top: 3rem;
    z-index: 10;

    & > *:nth-child(1) {
        animation-delay: 0.2s;
    }
    & > *:nth-child(2) {
        animation-delay: 0.3s;
    }
    & > *:nth-child(3) {
        animation-delay: 0.4s;
    }
    & > *:nth-child(4) {
        animation-delay: 0.5s;
    }
    & > *:nth-child(5) {
        animation-delay: 0.8s;
    }
`;

const play = keyframes`
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(2);
  }
  100% {
    transform: scaleY(1);
  }
`;

interface LineProps {
    isPlaying: boolean;
    theme: Theme;
}

const Line = styled.span<LineProps>`
    background: ${(props) => props.theme.text};
    border: 1px solid ${(props) => props.theme.body};

    animation: ${play} 1s ease infinite;
    animation-play-state: ${(props) =>
        props.isPlaying ? "running" : "paused"};
    height: 1rem;
    width: 2px;
    margin: 0 0.1rem;
`;

const SoundBar: React.FC = () => {
    const ref = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        setIsPlaying(!isPlaying);

        if (ref.current) {
            if (!isPlaying) {
                ref.current.play();
            } else {
                ref.current.pause();
            }
        }
    };

    return (
        <Box onClick={handleClick}>
            <Line isPlaying={isPlaying} />
            <Line isPlaying={isPlaying} />
            <Line isPlaying={isPlaying} />
            <Line isPlaying={isPlaying} />
            <Line isPlaying={isPlaying} />

            <audio
                src={
                    "assets/russell/audio/ATLiens_-_Witch_Doctor_-_G-Rex_and_Peekaboo_Remix.mp3"
                }
                ref={ref}
                loop
            />
        </Box>
    );
};

export default SoundBar;
