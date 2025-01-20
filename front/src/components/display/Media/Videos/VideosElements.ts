import styled from "styled-components";
import ReactPlayer from "react-player";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

export const VideosContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    z-index: 1;
`;

export const Video = styled.div`
    opacity: 0;
    transition-duration: 1s ease;
`;

export const ActiveVideo = styled(Video)`
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
`;

export const VideosShell = styled.div``;

export const VideosBackground = styled.div`
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const VideosObject = styled.video`
    width: 60vw;
    height: 70vh;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 25px;
`;

export const VideoPlayer = styled.div`
    flex: 0.7;
`;

export const VideoList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ReactPlayerVideo = styled(ReactPlayer)`
    height: 100%;
    width: 100%;
`;

export const PrevVid = styled(FaArrowAltCircleLeft)`
    position: absolute;
    top: 50%;
    left: 3vw;
    font-size: 3rem;
    cursor: pointer;
    z-index: 10;
    user-select: none;
`;

export const NextVid = styled(FaArrowAltCircleRight)`
    position: absolute;
    top: 50%;
    right: 3vw;
    font-size: 3rem;
    cursor: pointer;
    z-index: 10;
    user-select: none;
`;
