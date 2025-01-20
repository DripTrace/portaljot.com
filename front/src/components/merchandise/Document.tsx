"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSession } from "next-auth/react";
import { selectSelectedImage } from "@/lib/merchandise/state/slices/snapSlice";
import ContentComponent from "@/components/merchandise/ContentComponent";
import { checkSession } from "@/actions/merchandise/checkSession"; // Adjust the import path as needed

const Document = () => {
    const selectedImage = useSelector(selectSelectedImage);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        const loadSession = async () => {
            await checkSession();
        };
        loadSession();
    }, []);

    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage]);

    const exit = () => {
        router.replace("/merchandise/routes/protected/creator/documents");
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        router.replace("/merchandise");
        return null;
    }

    return (
        <ContentComponent title="" description="">
            <div className="relative">
                <img
                    src={selectedImage ?? undefined}
                    onClick={exit}
                    alt=""
                    className="glass-container h-full w-full"
                />
                <div className="absolute top-0 right-0 m-[1rem]">
                    <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        strokeWidth={6}
                        size={50}
                        colors={
                            [
                                ["#004777", 0.33],
                                ["#F7B801", 0.33],
                                ["#A30000", 0.33],
                            ] as any
                        }
                    >
                        {({ remainingTime }) => {
                            if (remainingTime === 0) {
                                exit();
                            }
                            return remainingTime;
                        }}
                    </CountdownCircleTimer>
                </div>
            </div>
        </ContentComponent>
    );
};

export default Document;
