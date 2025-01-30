"use client";
import React, { useState } from "react";
import {
    PiHouseFill,
    PiDot,
    PiHeart,
    PiHeartFill,
    PiChatCircle,
    PiChatCircleFill,
    PiShareFat,
    PiShareFatFill,
} from "react-icons/pi";

const ComingSoon = () => {
    const initialItemCount = 5;
    const [itemCount, setItemCount] = useState(initialItemCount);
    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);
    const [shared, setShared] = useState(false);

    const showMoreItems = () => {
        setItemCount((prevCount) => prevCount + 5);
    };
    return (
        <main className="ml-[400px] flex w-[720px] h-full min-h-[1350px] flex-col border-r border-l border-neutral-600">
            <div className="flex justify-center items-center pt-40 font-bold text-2xl">
                Coming Soon
            </div>
        </main>
    );
};

export default ComingSoon;
