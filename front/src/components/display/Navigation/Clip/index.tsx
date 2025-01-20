"use client";

import { useState, useRef } from "react";
import {
    ButtonContainer,
    ClipBackground,
    ClipContainer,
    ClipObject,
    ClipShell,
    PlayButton,
    PlayContainer,
    Play,
} from "./ClipElements";
import { ClipProps } from "@/types/display/interfaces";

const Clip: React.FC<ClipProps> = ({
    clipDisplayed,
    redirect,
    show,
    onClose,
    children,
    title,
    Icon,
}) => {
    const [onPlay, setOnPlay] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const playing = () => {
        setOnPlay(true);
    };

    function togglePlay() {
        if (videoRef.current) {
            if (videoRef.current.paused || videoRef.current.ended) {
                videoRef.current.play();
                playing();
            } else {
                videoRef.current.pause();
            }
        }
    }

    const vidEnded = () => {
        setIsEnded(!isEnded);
        redirect();
    };

    return (
        <ClipContainer $isEnded={isEnded}>
            <ClipBackground>
                <ClipShell>
                    <ClipObject
                        ref={videoRef}
                        id="clip"
                        preload="auto"
                        onEnded={vidEnded}
                        onPlaying={playing}
                        src=""
                    >
                        <source src="" type="video/mp4" />
                    </ClipObject>
                </ClipShell>
            </ClipBackground>
            <ButtonContainer>
                <PlayButton onClick={togglePlay} $onPlay={onPlay}>
                    <PlayContainer>
                        <Play />
                    </PlayContainer>
                </PlayButton>
            </ButtonContainer>
        </ClipContainer>
    );
};

export default Clip;
