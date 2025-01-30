"use client";
import React, { useState, useEffect } from "react";
import {
    PiHouseFill,
    PiFaders,
    PiMagnifyingGlass,
    PiSortAscending,
    PiSortDescending,
} from "react-icons/pi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import ProfileBar from "./ProfileBar";

type User = {
    rank: number;
    name: string;
    user: string;
    pfp: string;
    badges: number;
    followers: number;
    portfoliovalue: number;
    fnftholder: boolean;
};

type SortCriteria = "rank" | "followers" | "portfoliovalue";

const HomeRank = () => {
    const [sortCriteria, setSortCriteria] = useState<SortCriteria>("rank");
    const [isAscending, setIsAscending] = useState(true);

    const profileBars = {
        Users: [
            {
                rank: 1,
                name: "User 1",
                user: "@userone",
                pfp: "/defaultPfp.svg",
                badges: 3,
                followers: 57,
                portfoliovalue: 50000,
                fnftholder: true,
            },
            {
                rank: 2,
                name: "User 4",
                user: "@userfour",
                pfp: "/defaultPfp.svg",
                badges: 2,
                followers: 23,
                portfoliovalue: 1000,
                fnftholder: false,
            },
            {
                rank: 3,
                name: "User 2",
                user: "@usertwo",
                pfp: "/defaultPfp.svg",
                badges: 0,
                followers: 2,
                portfoliovalue: 100000,
                fnftholder: true,
            },
            {
                rank: 4,
                name: "User 5",
                user: "@userfive",
                pfp: "/defaultPfp.svg",
                badges: 1,
                followers: 16,
                portfoliovalue: 52,
                fnftholder: false,
            },
            {
                rank: 5,
                name: "User 3",
                user: "@userthree",
                pfp: "/defaultPfp.svg",
                badges: 1,
                followers: 16,
                portfoliovalue: 123,
                fnftholder: true,
            },
        ],
    };

    const toggleSort = (criteria: SortCriteria) => {
        if (sortCriteria === criteria) {
            setIsAscending(!isAscending);
        } else {
            setSortCriteria(criteria);
            setIsAscending(true); // reset to ascending when criteria changes
        }
    };

    const sortedUsers = [...profileBars.Users].sort((a, b) => {
        const valueA = a[sortCriteria];
        const valueB = b[sortCriteria];
        if (isAscending) {
            return valueA < valueB ? -1 : 1;
        } else {
            return valueA > valueB ? -1 : 1;
        }
    });

    return (
        <main className="ml-[400px] flex w-[1040px] h-full min-h-[1350px] flex-col border-r border-l border-neutral-600 relative">
            <div className="border-b border-neutral-600 h-40 bg-bgcolor sticky top-0 z-10">
                <div className="flex text-ovteal justify-center mt-8 text-4xl font-bold">
                    <PiHouseFill />
                    <div className="px-2">Global Web3 Rank</div>
                </div>
                <div className="flex w-full">
                    <div className="rounded-full m-4 bg-bgcolor px-6 py-2 border border-ovteal flex w-[950px]">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-bgcolor text-white text-lg placeholder:text-ovteal w-[890px] placeholder:font-extralight focus:outline-none"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="rounded-full bg-ovteal mr-4 mt-4 h-12 w-12 flex justify-center items-center text-bgcolor hover:bg-opacity-80 transition duration-100"
                        aria-label="Search"
                    >
                        <PiMagnifyingGlass size={22} />
                    </button>
                </div>
            </div>
            <div className="w-full flex bg-ovtealdull h-12 sticky top-40 z-10 items-center">
                <button
                    className={`px-2 ml-2 font-semibold hover:bg-white/10 p-1 rounded-full ${sortCriteria === "rank" ? "text-ovteal" : ""}`}
                    onClick={() => toggleSort("rank")}
                >
                    #
                </button>
                <div className="ml-20 font-semibold mr-1">Profile</div>
                <div className="ml-60 font-semibold">Badges</div>
                <button
                    className={`ml-14 px-2 font-semibold hover:bg-white/10 p-1 rounded-full ${sortCriteria === "followers" ? "text-ovteal" : ""}`}
                    onClick={() => toggleSort("followers")}
                >
                    Followers
                </button>
                <button
                    className={`ml-12 px-2 font-semibold hover:bg-white/10 p-1 rounded-full ${sortCriteria === "portfoliovalue" ? "text-ovteal" : ""}`}
                    onClick={() => toggleSort("portfoliovalue")}
                >
                    Portfolio Value
                </button>
                <div className="ml-16 font-semibold">Founder NFT Holder</div>
            </div>
            <section className="px-4 flex flex-wrap">
                <ProfileBar />
            </section>
        </main>
    );
};

export default HomeRank;
