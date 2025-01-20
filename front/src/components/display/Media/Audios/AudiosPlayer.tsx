// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//     ForwardButton,
//     Forward,
//     Progress,
//     ProgressBar,
//     PlayPauseContainer,
//     BackwardButton,
//     Backward,
//     PlayPause,
//     PauseButton,
//     PlayButton,
//     Controls,
//     Duration,
//     CurrentTime,
//     AudiosContainer,
//     AudioPlayer,
//     AudioObject,
//     Pause,
//     Play,
// } from "./AudiosElements";

// type AudiosPlayerProps = {
//     song: string;
// };

// const AudiosPlayer: React.FC<AudiosPlayerProps> = ({ song }) => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [duration, setDuration] = useState<number>(0);
//     const [currentTime, setCurrentTime] = useState<number>(0);

//     const audioPlayer = useRef<HTMLAudioElement>(null); // reference our audio component
//     const progressBar = useRef<HTMLInputElement>(null); // reference our progress bar
//     const animationRef = useRef<number | null>(null); // reference the animation

//     useEffect(() => {
//         const updateDuration = () => {
//             if (audioPlayer.current) {
//                 const seconds = Math.floor(audioPlayer.current.duration);
//                 setDuration(seconds);
//                 if (progressBar.current) {
//                     progressBar.current.max = String(seconds);
//                 }
//             }
//         };

//         const audioElement = audioPlayer.current;
//         if (audioElement) {
//             audioElement.addEventListener("loadedmetadata", updateDuration);
//         }

//         return () => {
//             if (audioElement) {
//                 audioElement.removeEventListener(
//                     "loadedmetadata",
//                     updateDuration
//                 );
//             }
//         };
//     }, []);

//     const calculateTime = (secs: number) => {
//         const minutes = Math.floor(secs / 60);
//         const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
//         const seconds = Math.floor(secs % 60);
//         const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
//         return `${returnedMinutes}:${returnedSeconds}`;
//     };

//     const togglePlayPause = () => {
//         const prevValue = isPlaying;
//         setIsPlaying(!prevValue);
//         if (!prevValue) {
//             audioPlayer.current?.play();
//             animationRef.current = requestAnimationFrame(whilePlaying);
//         } else {
//             audioPlayer.current?.pause();
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//         }
//     };

//     const whilePlaying = () => {
//         if (progressBar.current && audioPlayer.current) {
//             progressBar.current.value = String(audioPlayer.current.currentTime);
//             changePlayerCurrentTime();
//             animationRef.current = requestAnimationFrame(whilePlaying);
//         }
//     };

//     const changeRange = () => {
//         if (audioPlayer.current && progressBar.current) {
//             audioPlayer.current.currentTime = Number(progressBar.current.value);
//             changePlayerCurrentTime();
//         }
//     };

//     const changePlayerCurrentTime = () => {
//         if (progressBar.current) {
//             progressBar.current.style.setProperty(
//                 "--seek-before-width",
//                 `${(Number(progressBar.current.value) / duration) * 100}%`
//             );
//             setCurrentTime(Number(progressBar.current.value));
//         }
//     };

//     const backThirty = () => {
//         if (progressBar.current) {
//             progressBar.current.value = String(
//                 Number(progressBar.current.value) - 30
//             );
//             changeRange();
//         }
//     };

//     const forwardThirty = () => {
//         if (progressBar.current) {
//             progressBar.current.value = String(
//                 Number(progressBar.current.value) + 30
//             );
//             changeRange();
//         }
//     };

//     return (
//         <AudiosContainer>
//             <AudioPlayer>
//                 <AudioObject ref={audioPlayer} preload="metadata" src={song} />
//                 <Controls>
//                     <BackwardButton onClick={backThirty}>
//                         <Backward /> 30
//                     </BackwardButton>
//                     <PlayPauseContainer>
//                         <PlayPause onClick={togglePlayPause}>
//                             {isPlaying ? (
//                                 <PauseButton>
//                                     <Pause />
//                                 </PauseButton>
//                             ) : (
//                                 <PlayButton>
//                                     <Play />
//                                 </PlayButton>
//                             )}
//                         </PlayPause>
//                     </PlayPauseContainer>
//                     <ForwardButton onClick={forwardThirty}>
//                         30
//                         <Forward />
//                     </ForwardButton>
//                 </Controls>
//                 <Progress>
//                     <CurrentTime>{calculateTime(currentTime)}</CurrentTime>
//                     <ProgressBar
//                         type="range"
//                         defaultValue="0"
//                         ref={progressBar}
//                         onChange={changeRange}
//                     />
//                     <Duration>
//                         {duration &&
//                             !isNaN(duration) &&
//                             calculateTime(duration)}
//                     </Duration>
//                 </Progress>
//             </AudioPlayer>
//         </AudiosContainer>
//     );
// };

// export default AudiosPlayer;

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    ForwardButton,
    Forward,
    PlayPauseContainer,
    BackwardButton,
    Backward,
    PlayPause,
    PauseButton,
    PlayButton,
    Controls,
    Duration,
    CurrentTime,
    AudiosContainer,
    AudioPlayer,
    AudioObject,
    Pause,
    Play,
    Progress,
} from "./AudiosElements";
import CustomSlider from "./CustomSlider";

type AudiosPlayerProps = {
    song: string;
};

const AudiosPlayer: React.FC<AudiosPlayerProps> = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const audioPlayer = useRef<HTMLAudioElement>(null); // reference our audio component
    const animationRef = useRef<number | null>(null); // reference the animation

    useEffect(() => {
        const updateDuration = () => {
            if (audioPlayer.current) {
                const seconds = Math.floor(audioPlayer.current.duration);
                setDuration(seconds);
            }
        };

        const audioElement = audioPlayer.current;
        if (audioElement) {
            audioElement.addEventListener("loadedmetadata", updateDuration);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener(
                    "loadedmetadata",
                    updateDuration
                );
            }
        };
    }, []);

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current?.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current?.pause();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }
    };

    const whilePlaying = () => {
        if (audioPlayer.current) {
            setCurrentTime(audioPlayer.current.currentTime);
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    };

    const changeRange = (newTime: number) => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = (newTime / 100) * duration;
            setCurrentTime(audioPlayer.current.currentTime);
        }
    };

    const backThirty = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = Math.max(
                0,
                audioPlayer.current.currentTime - 30
            );
            setCurrentTime(audioPlayer.current.currentTime);
        }
    };

    const forwardThirty = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = Math.min(
                duration,
                audioPlayer.current.currentTime + 30
            );
            setCurrentTime(audioPlayer.current.currentTime);
        }
    };

    return (
        <AudiosContainer>
            <AudioPlayer>
                <AudioObject ref={audioPlayer} preload="metadata" src={song} />
                <Controls>
                    <BackwardButton onClick={backThirty}>
                        <Backward /> 30
                    </BackwardButton>
                    <PlayPauseContainer>
                        <PlayPause onClick={togglePlayPause}>
                            {isPlaying ? (
                                <PauseButton>
                                    <Pause />
                                </PauseButton>
                            ) : (
                                <PlayButton>
                                    <Play />
                                </PlayButton>
                            )}
                        </PlayPause>
                    </PlayPauseContainer>
                    <ForwardButton onClick={forwardThirty}>
                        30
                        <Forward />
                    </ForwardButton>
                </Controls>
                <CustomSlider
                    value={(currentTime / duration) * 100}
                    onChange={changeRange}
                />
                <Progress>
                    <CurrentTime>{calculateTime(currentTime)}</CurrentTime>
                    <Duration>{calculateTime(duration)}</Duration>
                </Progress>
            </AudioPlayer>
        </AudiosContainer>
    );
};

export default AudiosPlayer;
