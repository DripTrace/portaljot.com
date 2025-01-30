"use client";
import React, { useState } from "react";
//import Link from "next/link";
import {
    PiPaintBrush,
    PiHeart,
    PiCirclesThreePlus,
    PiFaders,
    PiCheckBold,
} from "react-icons/pi";

type CheckboxStateKey = "artist" | "enthusiast" | "project" | "trader";

const RegisterPath = () => {
    const [checkedStates, setCheckedStates] = useState({
        artist: false,
        enthusiast: false,
        project: false,
        trader: false,
    });

    const toggleCheckbox = (key: CheckboxStateKey) => {
        setCheckedStates((prevStates) => ({
            ...prevStates,
            [key]: !prevStates[key],
        }));
    };
    const submitProfile = async () => {
        // Get data from local storage
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const referenceCode = localStorage.getItem("referenceCode");
        const email = localStorage.getItem("email");

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                referenceCode,
                email,
                paths: checkedStates,
            }),
        };

        const response = await fetch("/api/createProfile", options); // Declare response here

        if (!response.ok) {
            // Handle error
            const errorData = await response.json();
            console.error("Error updating profile:", errorData.message);
        } else {
            // Clear data from local storage
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            localStorage.removeItem("referenceCode");
            localStorage.removeItem("email");

            window.location.href = "/signin";
        }
    };
    return (
        <section className="w-full h-full min-h-screen flex flex-col items-center justify-center">
            <div className="text-5xl font-bold">Choose your paths</div>
            <div className="mt-32 flex">
                <div className="flex flex-col w-[300px] h-[350px] rounded-3xl relative mx-5 artist-grad">
                    <div className="absolute -top-[75px] left-1/2 transform -translate-x-1/2 w-[160px] h-[160px] rounded-full bg-bgcolor flex items-center justify-center">
                        <div className="w-[150px] h-[150px] rounded-full bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-artistc">
                            <PiPaintBrush size={90} />
                        </div>
                    </div>
                    <div className="text-4xl text-center mt-32 font-light">
                        ARTIST
                    </div>
                    <div className="text-center mt-10 px-3">
                        Ovation elevates the experience of artists, enhancing
                        their visibility...
                    </div>
                    <div
                        onClick={() => toggleCheckbox("artist")}
                        className="absolute bottom-[-23px] left-1/2 transform -translate-x-1/2 w-[45px] h-[45px] rounded-lg flex items-center justify-center cursor-pointer bg-bgcolor"
                    >
                        <div className="w-[45px] h-[45px] rounded-lg bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-artistc  hover:bg-white/10 transition duration-100">
                            {checkedStates.artist && <PiCheckBold size={30} />}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[300px] h-[350px] rounded-3xl relative mx-5 enthusiast-grad">
                    <div className="absolute -top-[75px] left-1/2 transform -translate-x-1/2 w-[160px] h-[160px] rounded-full bg-bgcolor flex items-center justify-center">
                        <div className="w-[150px] h-[150px] rounded-full bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-enthusiastc">
                            <PiHeart size={90} />
                        </div>
                    </div>
                    <div className="text-4xl text-center mt-32 font-light">
                        ENTHUSIAST
                    </div>
                    <div className="text-center mt-10 px-3">
                        Ovation allows enthusiasts to connect with their
                        favorite creators and communities...
                    </div>
                    <div
                        onClick={() => toggleCheckbox("enthusiast")}
                        className="absolute bottom-[-23px] left-1/2 transform -translate-x-1/2 w-[45px] h-[45px] rounded-lg flex items-center justify-center cursor-pointer bg-bgcolor"
                    >
                        <div className="w-[45px] h-[45px] rounded-lg bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-enthusiastc  hover:bg-white/10 transition duration-100">
                            {checkedStates.enthusiast && (
                                <PiCheckBold size={30} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[300px] h-[350px] rounded-3xl relative mx-5 project-grad">
                    <div className="absolute -top-[75px] left-1/2 transform -translate-x-1/2 w-[160px] h-[160px] rounded-full bg-bgcolor flex items-center justify-center">
                        <div className="w-[150px] h-[150px] rounded-full bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-projectc">
                            <PiCirclesThreePlus size={90} />
                        </div>
                    </div>
                    <div className="text-4xl text-center mt-32 font-light">
                        PROJECT
                    </div>
                    <div className="text-center mt-10 px-3">
                        Ovation elevates the presentation of projects, enhancing
                        their visibility...
                    </div>
                    <div
                        onClick={() => toggleCheckbox("project")}
                        className="absolute bottom-[-23px] left-1/2 transform -translate-x-1/2 w-[45px] h-[45px] rounded-lg flex items-center justify-center cursor-pointer bg-bgcolor"
                    >
                        <div className="w-[45px] h-[45px] rounded-lg bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-projectc  hover:bg-white/10 transition duration-100">
                            {checkedStates.project && <PiCheckBold size={30} />}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[300px] h-[350px] rounded-3xl relative mx-5 trader-grad">
                    <div className="absolute -top-[75px] left-1/2 transform -translate-x-1/2 w-[160px] h-[160px] rounded-full bg-bgcolor flex items-center justify-center">
                        <div className="w-[150px] h-[150px] rounded-full bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-traderc">
                            <PiFaders size={90} />
                        </div>
                    </div>
                    <div className="text-4xl text-center mt-32 font-light">
                        TRADER
                    </div>
                    <div className="text-center mt-10 px-3">
                        Ovation allows traders to track, trade, and barter NFTs.
                        Traders can explore...
                    </div>
                    <div
                        onClick={() => toggleCheckbox("trader")}
                        className="absolute bottom-[-23px] left-1/2 transform -translate-x-1/2 w-[45px] h-[45px] rounded-lg flex items-center justify-center cursor-pointer bg-bgcolor"
                    >
                        <div className="w-[45px] h-[45px] rounded-lg bg-bgcolor border-4 border-neutral-400 flex items-center justify-center text-traderc  hover:bg-white/10 transition duration-100">
                            {checkedStates.trader && <PiCheckBold size={30} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <button
                    onClick={submitProfile}
                    className="px-5 py-1 bg-ovteal rounded-full text-center text-bgcolor font-bold text-2xl"
                >
                    Make Your Profile
                </button>
            </div>
        </section>
    );
};

export default RegisterPath;
