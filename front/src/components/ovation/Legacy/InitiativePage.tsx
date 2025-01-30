"use client";

import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth();
import React, { useState, useEffect } from "react";
import {
    PiArrowFatLineUp,
    PiFaders,
    PiMagnifyingGlass,
    PiSortAscending,
    PiSortDescending,
} from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditInitiativeModal from "./InitiativeEdit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type ItemType = {
    id: string;
    initiative_id: number;
    user_id: number;
    name: string;
    description: string;
    category: string;
    username: string;
    pfp_image: string;
    from_id: number;
    target_id: number;
    itiative_id: number;
    requestStatus?: string;
};

export default function Initiative() {
    const [itemsToShow, setItemsToShow] = useState(12);
    const [currentItems, setCurrentItems] = useState<ItemType[]>([]);
    const [isAscending, setIsAscending] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [sortOption, setSortOption] = useState("Follower count"); // New state for sort option
    const [showHoverMessage, setShowHoverMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [currentItem, setCurrentItem] = useState<ItemType | null>(null);
    // const [initiatives, setInitiatives] = useState<Initiative[]>([]);
    useEffect(() => {
        if (session && session.user) {
            setUserId(session.user.id);
        }
    }, [session]);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/initiatives");
            if (!res.ok) {
                toast.error("Error: Something went wrong!");
            }
            const data = await res.json();
            return data[0];
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        async function fetchSession() {
            const fetchDataAndSetItems = async () => {
                const fetchedItems = await fetchData();

                const itemsWithStatus = fetchedItems.map(
                    (item: ItemType, index: number) => {
                        let requestStatus = "none";
                        if (item.user_id === Number(userId)) {
                            requestStatus = "owner";
                        } else if (
                            item.from_id === Number(userId) &&
                            item.target_id === item.initiative_id
                        ) {
                            requestStatus = "requested";
                        }

                        return { ...item, requestStatus, id: index + 1 };
                    }
                );

                setCurrentItems(itemsWithStatus);
                setLoading(false); // Set loading to false after you've fetched your data
            };

            fetchDataAndSetItems();
        }

        fetchSession();
    }, [itemsToShow, sortOption, isAscending, loading, userId]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const handleShowMore = () => {
        setItemsToShow((prev) => prev + 12);
    };

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const handleHoverEnter = () => {
        setShowHoverMessage(true);
    };

    const handleHoverLeave = () => {
        setShowHoverMessage(false);
    };

    const handleRequestCollaboration = async (item: ItemType) => {
        // Prompt the user for a comment
        const comment = window.prompt(
            "Please enter a comment for your collaboration request:"
        );

        // If the user clicked "Cancel", don't proceed with the request
        if (comment === null) {
            return;
        }

        const response = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: item.user_id,
                action: `Requested collaboration on ${item.description}\nComment: ${comment}`,
                from_id: userId,
                target: "initiative",
                target_id: item.initiative_id,
            }),
        });

        if (!response.ok) {
            toast.error("Error: Something went wrong!");
        } else {
            setCurrentItems((prevItems) =>
                prevItems.map((i) =>
                    i.id === item.id ? { ...i, requestStatus: "requested" } : i
                )
            );

            toast.success("Request sent successfully", {
                position: "bottom-right",
            });
        }
    };

    const handleUndoRequest = async (item: ItemType) => {
        const target_id = item.target_id;
        const response = await fetch("/api/events", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: item.user_id,
                target: "initiative",
                target_id: item.initiative_id,
                from_id: userId,
            }),
        });

        if (!response.ok) {
            toast.error("Error: Something went wrong!");
        } else {
            setCurrentItems((prevItems) =>
                prevItems.map((i) =>
                    i.id === item.id ? { ...i, requestStatus: "none" } : i
                )
            );
            toast.success("Request removed!", {
                position: "bottom-right",
            });
        }
    };

    return (
        <main
            style={{ zIndex: 0 }}
            className="ml-[400px] flex w-[1040px] h-full min-h-[1350px] flex-col border-r border-l border-neutral-600 relative"
        >
            {isModalOpen && (
                <EditInitiativeModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    initiative={null}
                    currentItem={currentItem}
                />
            )}
            <div className="border-b border-neutral-600 h-40 bg-bgcolor sticky top-0 z-10">
                <div className="flex text-ovteal justify-center mt-8">
                    <PiArrowFatLineUp size={50} />
                </div>
                <div className="flex w-full">
                    <button
                        onMouseEnter={handleHoverEnter}
                        onMouseLeave={handleHoverLeave}
                        className="rounded-full border border-ovteal ml-4 mt-4 h-12 w-12 flex justify-center items-center text-ovteal hover:bg-white/10 transition duration-100"
                        title="Sort Order"
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
                                    <option value="Newest">Newest</option>
                                    <option value="Most Viewed">
                                        Most Viewed
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
                {currentItems.map((item: any, index: number) => (
                    <div key={index} className="w-1/3 p-6">
                        <div className="rounded-lg border border-neutral-600 bg-bgcolor overflow-hidden w-72 h-96 flex flex-col justify-between">
                            <div>
                                <div className="h-20 bg-ovteal"></div>
                                <div className="p-4">
                                    <div className="relative flex flex-wrap">
                                        <div className="pt-6">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${item.user_id}/${item.pfp_image}`}
                                                alt="Profile"
                                                className="absolute -top-14 left-2 w-20 h-20 rounded-full bg-bgcolor border-4 border-bgcolor object-cover"
                                                onError={(e) => {
                                                    (
                                                        e.target as HTMLImageElement
                                                    ).src = "/defaultPfp.svg";
                                                }}
                                            />
                                            <div className="text-ovteal font-bold">
                                                {item.name}
                                            </div>
                                            <div className="text-neutral-500 text-xs font-light mb-3">
                                                {item.username}
                                            </div>
                                            <div className="text-sm font-light mb-2 h-28 w-[254px] break-words">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 mb-2">
                                <div className="text-sm font-semibold mb-2 border rounded border-ovteal text-center">
                                    {item.category}
                                </div>
                                {item.requestStatus === "none" && (
                                    <button
                                        className="w-full bg-ovteal text-bgcolor rounded py-1 font-bold"
                                        onClick={() =>
                                            handleRequestCollaboration(item)
                                        }
                                    >
                                        Request Collaboration
                                    </button>
                                )}
                                {item.requestStatus === "requested" && (
                                    <button
                                        className="w-full bg-ovteal text-bgcolor rounded py-1 font-bold"
                                        onClick={() => handleUndoRequest(item)}
                                    >
                                        Undo Request
                                    </button>
                                )}
                                {item.requestStatus === "owner" && (
                                    <button
                                        className="w-full bg-ovteal text-bgcolor rounded py-1 font-bold"
                                        onClick={() => {
                                            setCurrentItem(item);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Edit Initiative
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            <button
                onClick={handleShowMore}
                className="bg-ovteal text-bgcolor p-2 rounded-full m-4"
            >
                Show More
            </button>
        </main>
    );
}

//export default InitiativePage;
