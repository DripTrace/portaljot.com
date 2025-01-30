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

const HomeTimeline = () => {
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
            <div className="border-b border-neutral-600 h-40 bg-bgcolor sticky top-0">
                <div className="flex text-ovteal justify-center mt-8">
                    <PiHouseFill size={50} />
                </div>
            </div>
            <div className="flex flex-col">
                {Array.from({ length: itemCount }).map((_, i) => (
                    <div
                        key={i}
                        className="border-t-0.5 p-4 border-b flex space-x-4 border-neutral-600"
                    >
                        <div>
                            <div className="w-12 h-12 bg-slate-200 rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-1">
                                <div className="font-bold">Username</div>
                                <div className="text-sm text-neutral-500">
                                    @username
                                </div>
                                <div className="text-neutral-500">
                                    <PiDot />
                                </div>
                                <div className="text-sm text-neutral-500">
                                    Jan 10
                                </div>
                            </div>
                            <div className="text-white text-sm mt-2">
                                skldjf slkdfjksldfj sldkfjslkdjfkls djfklsdj
                                flksdjf lksdj flksdjfklsdj sdlkfjsdlkfjsdkl
                                fskldjflksd fjlksdjf klsdfj klsdfj klsdjf sdjf
                                lksdfj slkdfj sdfkj skldfj slkdfj sdklfj skldf
                                jsdlkfjlsdjfljsfl dfklsjdflksgj
                            </div>
                            <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl mt-1"></div>
                            <div className="flex items-center justify-start space-x-6 w-full mt-2">
                                <button
                                    onClick={() => setLiked(!liked)}
                                    className="rounded-full hover:bg-white/10 p-2 cursor-pointer transition duration-100"
                                >
                                    {liked ? (
                                        <PiHeartFill className="text-red-500" />
                                    ) : (
                                        <PiHeart />
                                    )}
                                </button>
                                <button
                                    onClick={() => setCommented(!commented)}
                                    className="rounded-full hover:bg-white/10 p-2 cursor-pointer transition duration-100"
                                >
                                    {commented ? (
                                        <PiChatCircleFill className="text-blue-500" />
                                    ) : (
                                        <PiChatCircle />
                                    )}
                                </button>
                                <button
                                    onClick={() => setShared(!shared)}
                                    className="rounded-full hover:bg-white/10 p-2 cursor-pointer transition duration-100"
                                >
                                    {shared ? (
                                        <PiShareFatFill className="text-green-500" />
                                    ) : (
                                        <PiShareFat />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {itemCount < 250 && ( // Assuming you have a maximum of 250 items
                    <button
                        onClick={showMoreItems}
                        className="text-white my-4 mx-auto rounded-full hover:bg-white/10 p-2"
                    >
                        Show More
                    </button>
                )}
            </div>
        </main>
    );
};

export default HomeTimeline;
