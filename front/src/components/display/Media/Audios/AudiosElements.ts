import styled from "styled-components";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa";

export const AudiosContainer = styled.div`
    height: 120px;
    width: 400px;
`;

export const AudioPlayer = styled.div`
    --primary: rgba(63, 191, 63, 0.3);
    --secondary: rgba(63, 191, 63, 0.8);

    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
`;

export const AudioObject = styled.audio``;

export const Controls = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ForwardBackward = styled.button`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    font-family: monospace;
    font-size: 2rem;
    cursor: pointer;

    :hover {
        color: var(--primary);
    }
`;

export const ForwardButton = styled(ForwardBackward)`
    height: 100%;
    width: 100%;
`;

export const Forward = styled(BsArrowRightShort)`
    height: 100%;
    width: 100%;
    font-size: 3rem;
`;

export const BackwardButton = styled(ForwardBackward)`
    height: 100%;
    width: 100%;
`;

export const Backward = styled(BsArrowLeftShort)`
    height: 100%;
    width: 100%;
    font-size: 3rem;
`;

export const PlayPauseContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PlayPause = styled.button`
    background: var(--primary);
    border: none;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    font-size: 32px;
    color: var(--secondary);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PlayButton = styled(PlayPause)`
    height: 100%;
    width: 100%;
`;

export const Play = styled(FaPlay)`
    position: relative;
    left: 5px;
`;

export const PauseButton = styled(PlayPause)``;

export const Pause = styled(FaPause)``;

export const Duration = styled.div`
    height: 100%;
    width: 100%;
    font-family: monospace;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CurrentTime = styled(Duration)``;

export const Progress = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ProgressBar = styled.input`
    --bar-bg: rgba(63, 191, 63, 0.1);
    --seek-before-width: 0;
    --seek-before-color: rgba(63, 191, 63, 0.4);
    --knobby: rgba(63, 191, 63, 0.7);
    --selectedKnobby: rgba(63, 191, 63, 1);

    appearance: none;
    background: var(--bar-bg);
    border-radius: 15px;
    position: relative;
    width: 100%;
    height: 11px;
    outline: none;

    /* Progress bar fill color */
    ::-webkit-slider-runnable-track {
        background: var(--bar-bg);
        border-radius: 10px;
        position: relative;
        width: 100%;
        height: 11px;
        outline: none;
    }

    ::-moz-range-track {
        background: var(--bar-bg);
        border-radius: 10px;
        position: relative;
        width: 100%;
        height: 11px;
        outline: none;
    }

    ::-moz-focus-outer {
        border: 0;
    }

    /* Progress bar progress */
    ::before {
        content: "";
        height: 11px;
        width: var(--seek-before-width);
        background-color: var(--seek-before-color);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        cursor: pointer;
    }

    ::-moz-range-progress {
        background-color: var(--seek-before-color);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        height: 11px;
    }

    /* Thumb color */
    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: var(--knobby) !important;
        cursor: pointer;
        position: relative;
        margin: -2px 0 0 0;
        z-index: 3;
        box-sizing: border-box;
    }

    :active::-webkit-slider-thumb {
        transform: scale(1.2);
        background: var(--selectedKnobby) !important;
    }

    ::-moz-range-thumb {
        height: 15px;
        width: 15px;
        border-radius: 50%;
        border: none;
        background-color: var(--knobby) !important;
        cursor: pointer;
        position: relative;
        z-index: 3;
        box-sizing: border-box;
    }

    :active::-moz-range-thumb {
        transform: scale(1.2);
        background: var(--selectedKnobby) !important;
    }

    /* More overrides to catch any other possible pink color */
    &::-webkit-slider-thumb {
        background-color: var(--knobby) !important;
    }

    &::-moz-range-thumb {
        background-color: var(--knobby) !important;
    }

    &::-ms-thumb {
        background-color: var(--knobby) !important;
    }

    &::-ms-fill-lower {
        background-color: var(--seek-before-color) !important;
    }

    &::-ms-fill-upper {
        background-color: var(--bar-bg) !important;
    }

    &::-ms-track {
        background: var(--bar-bg) !important;
    }

    &::-ms-tooltip {
        display: none !important;
    }

    ::-ms-fill-lower {
        background-color: var(--seek-before-color) !important;
    }

    ::-ms-fill-upper {
        background-color: var(--bar-bg) !important;
    }

    ::-ms-track {
        background: var(--bar-bg) !important;
    }

    ::-ms-thumb {
        background-color: var(--knobby) !important;
    }

    ::-ms-tooltip {
        display: none !important;
    }

    /* Prevent any defaults that might bring pink back */
    ::-webkit-slider-runnable-track,
    ::-moz-range-track,
    ::-ms-track {
        background: var(--bar-bg) !important;
    }

    ::-webkit-slider-thumb,
    ::-moz-range-thumb,
    ::-ms-thumb {
        background-color: var(--knobby) !important;
    }
`;

export const AudiosWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
