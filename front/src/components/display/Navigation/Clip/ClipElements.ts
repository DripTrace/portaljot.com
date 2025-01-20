import styled from "styled-components";
import ReactPlayer from "react-player";
import { IoIosPlay } from "react-icons/io";

interface ClipContainerProps {
    $isEnded: boolean;
}

interface PlayButtonProps {
    $onPlay: boolean;
}

export const ClipContainer = styled.aside<ClipContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    height: 100%;
    width: 100%;
    transition: all 0.5s ease-in;
    position: ${({ $isEnded }) => ($isEnded ? "fixed" : "absolute")};
    opacity: ${({ $isEnded }) => ($isEnded ? "0" : "100%")};
    bottom: ${({ $isEnded }) => ($isEnded ? "-100%" : "0")};
    :before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
                180deg,
                rgba(63, 191, 63, 0.1) 0%,
                /* rgba(63, 191, 63, 0.2) 10%
				rgba(63, 191, 63, 0.3) 20%
				rgba(63, 191, 63, 0.4) 30%
				rgba(63, 191, 63, 0.5) 40%
				rgba(63, 191, 63, 0.6) 50%
				rgba(63, 191, 63, 0.7) 60%
				rgba(63, 191, 63, 0.8) 70%
				rgba(63, 191, 63, 0.9) 80%
				rgba(63, 191, 63, 1.0) 90% */
                    rgba(63, 150, 63, 0.3) 100%
            ),
            linear-gradient(180deg, rgba(63, 191, 63, 0.1) 0%, transparent 100%);
        z-index: 102;
    }
`;

export const ClipBackground = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const ClipShell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
`;

export const ClipObject = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
`;

export const Player = styled(ReactPlayer)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
`;

export const PlayerWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    padding-top: 56.25%;
`;

export const ButtonContainer = styled.div`
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PlayContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(64, 255, 0, 0.5);
    width: inherit;
    height: inherit;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.5s;
    position: relative;
    z-index: 201;
`;

export const PlayButton = styled.button<PlayButtonProps>`
    display: ${({ $onPlay }) => ($onPlay ? "none" : "flex")};
    align-items: center;
    justify-content: center;
    position: relative;
    height: 10em;
    width: 10em;
    background-color: transparent;
    border-radius: 50%;
    border: none;
    z-index: 201;

    @keyframes pulsePlay {
        from {
            transform: scale(1);
            opacity: 0.5;
        }

        to {
            transform: scale(1.5);
            opacity: 0;
        }
    }

    &::before {
        position: absolute;
        content: "";
        display: block;
        background-color: #40ff00;
        border-radius: 50%;
        animation: pulsePlay 1.5s ease-out infinite;
        opacity: 0.2;
        height: 100%;
        width: 100%;
        z-index: 202;
    }
`;

export const Play = styled(IoIosPlay)`
    font-size: 10em;
    padding-left: 10px;
    z-index: 202;
    color: lightgreen;
`;
