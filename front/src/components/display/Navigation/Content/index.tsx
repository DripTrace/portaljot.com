"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ContentButton from "./ContentButton";
import { ContentContainer, ContentRoute } from "./ContentElements";
import {
    HomeIcon,
    CameraIcon,
    VideoCameraIcon,
    PencilIcon,
    MicrophoneIcon,
    BriefcaseIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";

const Content: React.FC = () => {
    const router = useRouter();

    return (
        <ContentContainer>
            <ContentRoute>
                <ContentButton
                    title="FEED"
                    Icon={HomeIcon}
                    onClick={() => router.push("/display/boogey/feed")}
                />
            </ContentRoute>
            <ContentRoute>
                <ContentButton
                    title="PHOTOS"
                    Icon={CameraIcon}
                    onClick={() => router.push("/display/boogey/photos")}
                />
            </ContentRoute>
            <ContentRoute>
                <ContentButton
                    title="VIDEOS"
                    Icon={VideoCameraIcon}
                    onClick={() => router.push("/display/boogey/videos")}
                />
            </ContentRoute>
            <ContentRoute>
                <ContentButton
                    title="MUSIC"
                    Icon={MicrophoneIcon}
                    onClick={() => router.push("/display/boogey/music")}
                />
            </ContentRoute>
            <ContentRoute>
                <ContentButton
                    title="BLOG"
                    Icon={PencilIcon}
                    onClick={() => router.push("/display/boogey/blog")}
                />
            </ContentRoute>
            <ContentRoute>
                <ContentButton
                    title="SHOP"
                    Icon={ShoppingCartIcon}
                    onClick={() => router.push("/display/boogey/shop")}
                />
            </ContentRoute>
            <ContentRoute>
                <ContentButton
                    title="CONNECT"
                    Icon={BriefcaseIcon}
                    onClick={() => router.push("/contact")}
                />
            </ContentRoute>
        </ContentContainer>
    );
};

export default Content;
