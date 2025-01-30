"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
    PiHashBold,
    PiFaders,
    PiMagnifyingGlass,
    PiSortAscending,
    PiSortDescending,
} from "react-icons/pi";
import DiscoverPf from "./DiscoverPf";
import "react-toastify/dist/ReactToastify.css";

type UserData = {
    username: string;
    ova: number;
};
export default function DiscoverMain() {
    const [itemsToShow, setItemsToShow] = useState(12);
    const [currentItems, setCurrentItems] = useState<React.ReactNode[]>([]);
    const [isAscending, setIsAscending] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [sortOption, setSortOption] = useState("Follower count"); // New state for sort option
    const [showHoverMessage, setShowHoverMessage] = useState(false);
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if (session && session.user) {
            setUserId(session.user.id);
        }
    }, [session]);

    useEffect(() => {
        const fetchSessionAndData = async () => {
            if (userId) {
                const res = await fetch(
                    `/api/usersDiscover?currentUserId=${userId}`
                );
                const data = await res.json();
                const fetchedItems = fetchDiscoverPfItems(
                    itemsToShow,
                    sortOption,
                    isAscending,
                    data[0]
                );
                setCurrentItems(fetchedItems);
            }
        };

        fetchSessionAndData();
    }, [itemsToShow, sortOption, isAscending, userId]);

    const fetchDiscoverPfItems = (
        count: number,
        sort: string,
        ascending: boolean,
        data: any[]
    ): React.ReactNode[] => {
        const sortedData = data.sort((a, b) => {
            let comparison = 0;
            switch (sort) {
                case "Follower count":
                    comparison = a.follower_count - b.follower_count;
                    break; // Updated this line
                case "NFT count":
                    comparison = a.nftCount - b.nftCount;
                    break;
                case "Badge count":
                    comparison = a.badge_count - b.badge_count;
                    break;
                case "Wallet Value":
                    comparison = a.walletValue - b.walletValue;
                    break;
                default:
                    comparison = 0;
            }
            return ascending ? comparison : -comparison;
        });

        return sortedData
            .slice(0, count)
            .map((item, i) => <DiscoverPf key={i} {...item} />);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const handleShowMore = () => {
        setItemsToShow((prev) => prev + 12); // Load 12 more items
    };

    const toggleSortOrder = () => {
        setIsAscending(!isAscending); // Toggle the sorting order
    };

    const handleHoverEnter = () => {
        setShowHoverMessage(true);
    };

    const handleHoverLeave = () => {
        setShowHoverMessage(false);
    };

    return (
        <main className="ml-[400px] flex w-[1040px] h-full min-h-[1350px] flex-col border-r border-l border-neutral-600 relative">
            <div className="border-b border-neutral-600 h-40 bg-bgcolor sticky top-0 z-10">
                <div className="flex text-ovteal justify-center mt-8">
                    <PiHashBold size={50} />
                </div>
                <div className="flex w-full">
                    <button
                        onMouseEnter={handleHoverEnter}
                        onMouseLeave={handleHoverLeave}
                        className="rounded-full border border-ovteal ml-4 mt-4 h-12 w-12 flex justify-center items-center text-ovteal hover:bg-white/10 transition duration-100"
                        title="Toggle Faders"
                    >
                        <PiFaders size={22} />
                    </button>
                    {showHoverMessage && (
                        <span className="text-sm text-ovteal absolute mt-16 ml-4 bg-white/10 rounded-full p-2 font-light">
                            Coming Soon
                        </span>
                    )}
                    <div className="rounded-full m-4 bg-bgcolor px-6 py-2 border border-ovteal flex w-[875px]">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-bgcolor text-white text-lg placeholder:text-ovteal w-[550px] placeholder:font-extralight focus:outline-none"
                            />
                            <div className="ml-2 border-r border-ovteal" />
                        </div>
                        <div className="flex justify-start items-center ml-2">
                            <div
                                className="text-ovteal hover:bg-white/10 rounded-full p-1 cursor-pointer"
                                onClick={toggleSortOrder}
                            >
                                {isAscending ? (
                                    <PiSortAscending size={22} />
                                ) : (
                                    <PiSortDescending size={22} />
                                )}
                            </div>
                            <div className="flex justify-start items-center">
                                <div className="rounded-ful text-ovteal font-semibold ml-2 text-lg">
                                    Sort:
                                </div>
                                <select
                                    onChange={handleSortChange}
                                    value={sortOption}
                                    className="rounded-full ml-3 bg-bgcolor font-light text-ovteal focus:outline-none"
                                    title="Sort Option"
                                >
                                    <option value="Follower count">
                                        Follower Count
                                    </option>
                                    <option value="NFT count">NFT Count</option>
                                    <option value="Badge count">
                                        Badge Count
                                    </option>
                                    <option value="Wallet Value">
                                        Wallet Value
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="rounded-full bg-ovteal mr-4 mt-4 h-12 w-12 flex justify-center items-center text-bgcolor hover:bg-opacity-80 transition duration-100"
                        title="Search"
                    >
                        <PiMagnifyingGlass size={22} />
                    </button>
                </div>
            </div>
            <section className="p-4 flex flex-wrap">
                {currentItems.map((item, index) => (
                    <div key={index} className="w-1/3 p-6">
                        {item}
                    </div>
                ))}
            </section>
            <button
                onClick={handleShowMore}
                className="bg-ovteal text-bgcolor p-2 rounded-full m-4  font-bold"
            >
                Show More
            </button>
        </main>
    );
}
