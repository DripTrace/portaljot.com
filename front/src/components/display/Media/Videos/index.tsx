"use client";

import {
    VideosBackground,
    VideosContainer,
    VideosObject,
    VideosShell,
    PrevVid,
    NextVid,
} from "./VideosElements";
import { useState, useCallback } from "react";
import { featuredVideos } from "./index.data";

const Videos = ({ videos = featuredVideos }) => {
    const [current, setCurrent] = useState(0);
    const length = videos.length;

    const nextVideo = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevVideo = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(videos) || videos.length <= 0) {
        return null;
    }

    const [isPlaying, setIsPlaying] = useState(true);

    const handleContextMenu = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        []
    );

    return (
        <>
            <VideosContainer>
                <VideosBackground>
                    <PrevVid onClick={prevVideo} />
                    <NextVid onClick={nextVideo} />
                    {featuredVideos.map((video, i) => {
                        return (
                            <VideosShell
                                className={
                                    i === current ? "video active" : "video"
                                }
                                key={i}
                            >
                                {i === current && (
                                    <VideosObject
                                        key={i}
                                        controls
                                        muted
                                        src={video.vid}
                                    />
                                )}
                            </VideosShell>
                        );
                    })}
                </VideosBackground>
            </VideosContainer>
        </>
    );
};

export default Videos;
