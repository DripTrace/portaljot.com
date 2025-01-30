"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
    PiPaintBrushBold,
    PiHeartBold,
    PiCirclesThreePlusBold,
    PiFadersBold,
    PiBriefcase,
    PiCalendarCheck,
} from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileContent from "./ProfileContent";
import { useRouter } from "next/router";
import ProfileEdit from "./ProfileEdit";
import ProfileEditTabs from "./ProfileEditTabs";
import PostEditModal from "./PostEditModal";
import ProfileBadges from "./ProfileBadges";
import ProfileBio from "./ProfileBio";
import ProfileLinks from "./ProfileLinks";
import ProfileExperience from "./ProfileExperience";
import ProfileStats from "./ProfileStats";
import ProfileIcons from "./ProfileIcons";
import ProfilePostFetch from "@/components/Legacy/ProfilePostFetch";

type UserProfile = {
    userId: string;
    username: string;
    bio: string;
    pfp_image: string;
    banner: string | null;
    ova: number;
    badge_count: number;
    role: string | null;
    paths: string[];
    datejoined: string;
    location: string;
    links: { url: string; label: string }[];
    badges: { name: string; imageUrl: string; description: string }[];
    badge: string;
    top_badges: { name: string; imageUrl: string; description: string }[];
    experience: {
        experienceId: number;
        latestCompany: string;
        latestRole: string;
        jobDesc: string;
    }[];
    portfolio: string | null;
    followerCount: number;
    followingCount: number;
    isFollowing: boolean;
    usera: string;
    name: string;
    imageUrl: string;
    Posts: string;
};
type ProfileProps = {
    userb: string;
};

export default function Profile({ userb }: ProfileProps) {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [usera, setUsera] = useState<string | null>(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleStatsHoverEnter = () => setShowStatsHoverMessage(true);
    const handleStatsHoverLeave = () => setShowStatsHoverMessage(false);
    const handleWatchlistHoverEnter = () => setShowWatchlistHoverMessage(true);
    const handleWatchlistHoverLeave = () => setShowWatchlistHoverMessage(false);
    const [selectedSection, setSelectedSection] =
        useState<SectionType>("Posts");
    const [showStatsHoverMessage, setShowStatsHoverMessage] = useState(false);
    const [showWatchlistHoverMessage, setShowWatchlistHoverMessage] =
        useState(false);
    const [ctrlClicked, setCtrlClicked] = useState(false);

    type SectionType = "Posts" | "Portfolio" | "Stats";
    const imageUrl = `${process.env.NEXT_PUBLIC_S3_BUCKET}`;
    type NFT = { value: number; name: string };
    useEffect(() => {
        if (session && session.user) {
            setUsera(session.user.id);
        }
    }, [session]);

    const selectSection = (section: SectionType) => {
        setSelectedSection(section);
    };

    useEffect(() => {
        if (userData) {
            setIsFollowing(userData.isFollowing);
            setFollowerCount(userData.followerCount);
        }
    }, [userData]);

    useEffect(() => {
        if (userb && usera) {
            const fetchData = async (userb: string, usera: string) => {
                const response = await fetch(
                    `/api/userData?userId=${userb}&viewerId=${usera}`
                );
                const data = await response.json();
                const userData = data[0];
                if (typeof userData.paths === "string") {
                    userData.paths = userData.paths
                        .split(",")
                        .map((path: string) => path.trim());
                }

                setUserData(userData);
            };

            fetchData(userb, usera);
        }
    }, [userb, usera, isModalOpen]);

    if (!userData) {
        return null;
    }
    const fetchedData = {
        user: userData.username,
        name: userData.username,
        bio: userData.bio,
        pfp: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${userData.userId}/${userData.pfp_image}`,
        banner: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${userData.userId}/${userData.banner}`,

        followers: userData.followerCount,
        following: userData.followingCount,
        ova: userData.ova,
        role: userData.role,
        datejoined: userData.datejoined,
        location: userData.location,
        portfolio: userData.portfolio,
        follower: userData.isFollowing,
    };

    const roleMapping: Record<string, string> = {
        "1": "Enthusiast",
        "2": "Artist",
        "3": "Blogger",
        "5": "Educator",
        "6": "Entrepreneur",
        "7": "Health/Beauty",
        "8": "Editor",
        "9": "Writer",
        "10": "Gamer",
        "11": "Restaurant",
        "12": "Photographer",
        "13": "Software Developer",
        "14": "Video Creator",
        "15": "Influencer",
        "16": "Trader",
        "17": "Musician/Band",
        "18": "NFT Collection",
    };

    const handleFollow = async (usera: string, userb: string) => {
        const response = await fetch("/api/follow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: usera, profileId: userb }),
        });

        if (response.ok) {
            setIsFollowing(true);
            setFollowerCount((prevCount) => prevCount + 1);
            toast.success("Followed successfully");
        } else {
            toast.error("An error occurred while trying to follow");
        }
    };

    const handleUnfollow = async (usera: string, userb: string) => {
        const response = await fetch("/api/follow", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: usera, profileId: userb }),
        });

        if (response.ok) {
            setIsFollowing(false);
            setFollowerCount((prevCount) =>
                prevCount > 0 ? prevCount - 1 : 0
            );
            toast.success("Unfollowed successfully");
        } else {
            toast.error("An error occurred while trying to unfollow");
        }
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCtrlClicked(false);
    };
    const sections = ["Posts", "Portfolio", "Stats"] as const;
    const handleLinkClick = (e: React.MouseEvent) => {
        if (e.ctrlKey) {
            setCtrlClicked(true);
        } else {
            setCtrlClicked(false);
        }
        handleOpenModal();
    };

    return (
        <div className="ml-[400px] w-[1040px] h-full min-h-screen border-r border-l border-neutral-600 relative">
            <div className="w-[1038px] h-[350px] overflow-hidden">
                <img
                    src={fetchedData.banner}
                    alt="Banner"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            "/defaultBanner.png";
                    }}
                />
                <img
                    src={fetchedData.pfp}
                    alt="Profile"
                    className="absolute top-[248px] left-[20px] w-52 h-52 rounded-full bg-bgcolor border-8 border-bgcolor object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/defaultPfp.svg";
                    }}
                />
            </div>
            <div className="flex-col">
                <div className="flex h-full min-h-[1350px] flex-col border-r border-neutral-600">
                    <div className="flex">
                        <div className="w-64 h-28" />
                        <div className="w-64 h-28 flex">
                            <div className="font-bold text-3xl text-white mr-2 mt-4">
                                <span className="text-xl">{"\u{1FA99}"}</span>
                            </div>
                            <div className="text-3xl mr-3 mt-5">
                                {" "}
                                {fetchedData.ova}
                            </div>
                            <div className="font-bold text-3xl text-ovteal mt-5">
                                {" "}
                                $OVA
                            </div>
                        </div>
                        <div className="flex w-1/2 mt-5 pr-3 text-lg justify-end">
                            {Number(usera) === Number(userb) ? (
                                <>
                                    <button
                                        className="h-11 w-32 px-3 py-1 text-bgcolor font-bold bg-ovteal rounded-full hover:bg-opacity-80 transition duration-100"
                                        onClick={handleLinkClick}
                                    >
                                        Edit Profile
                                    </button>

                                    {isModalOpen && (
                                        <PostEditModal
                                            show={isModalOpen}
                                            onClose={handleCloseModal}
                                        >
                                            {ctrlClicked ? (
                                                <ProfileEdit
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            ) : (
                                                <ProfileEditTabs
                                                    handleCloseModal={
                                                        handleCloseModal
                                                    }
                                                />
                                            )}
                                        </PostEditModal>
                                    )}
                                </>
                            ) : isFollowing ? (
                                <button
                                    onClick={() =>
                                        usera && userb
                                            ? handleUnfollow(usera, userb)
                                            : null
                                    }
                                    className="h-11 w-32 px-3 py-1 text-bgcolor font-bold bg-ovteal rounded-full hover:bg-opacity-80 transition duration-100"
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        usera && userb
                                            ? handleFollow(usera, userb)
                                            : null
                                    }
                                    className="h-11 w-32 px-3 py-1 text-bgcolor font-bold bg-ovteal rounded-full hover:bg-opacity-80 transition duration-100"
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end pr-3 text-lg">
                        <div className="font-bold text-white mr-1">
                            {followerCount}
                        </div>
                        <div className="text-white"> Followers</div>
                        <div className="font-bold text-white mr-1 ml-4">
                            {fetchedData.following}
                        </div>
                        <div className="text-white"> Following</div>
                    </div>
                    <div className="flex">
                        <div className="border-r border-neutral-600">
                            <div className="ml-6 text-4xl font-bold mr-2">
                                {fetchedData.name}
                            </div>
                            <div className="ml-6 font-light text-neutral-500">
                                @{fetchedData.user}
                            </div>
                        </div>
                        <div className="flex items-center ml-2">
                            <ProfileIcons paths={userData.paths} />
                        </div>
                    </div>

                    <div className="font-light px-7 mt-11">
                        <ProfileBio bio={fetchedData.bio} />
                    </div>
                    <div className="flex my-11 px-4 items-center justify-center">
                        <div className="flex w-1/4 justify-center items-center">
                            <div className="text-ovteal mr-2">
                                <PiBriefcase size={25} />
                            </div>
                            <div>
                                {fetchedData.role
                                    ? roleMapping[fetchedData.role]
                                    : "Default Role"}{" "}
                            </div>
                        </div>
                        <div className="flex w-1/2 items-center justify-center px-24">
                            <div className="text-ovteal mr-2">
                                <PiCalendarCheck size={25} />
                            </div>
                            <div>
                                {fetchedData.datejoined
                                    ? new Date(
                                          fetchedData.datejoined
                                      ).toLocaleDateString()
                                    : "Loading..."}
                            </div>
                        </div>
                        <div className="flex w-1/4 justify-center items-center">
                            <div className="text-ovteal mr-2">
                                <SlLocationPin size={24} />
                            </div>
                            <div>{fetchedData.location}</div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <ProfileBadges badges={userData.top_badges} />
                    </div>
                    <div className="w-full flex flex-grid grid-rows-1 grid-cols-2 justify-items-left mt-10">
                        <div className="flex w-5/12 mx-4 mt-17">
                            <ProfileLinks links={userData.links} />
                        </div>
                        <div className="mx-4 ml-20 w-7/12">
                            <ProfileExperience
                                experience={userData.experience}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-10 pb-3 border-b border-neutral-500 text-2xl">
                        {sections.map((section) => (
                            <div
                                key={section}
                                className={`mx-4 cursor-pointer ${selectedSection === section ? "text-ovteal font-bold" : "text-neutral-500"}`}
                                onClick={() =>
                                    selectSection(section as SectionType)
                                }
                            >
                                {section}
                            </div>
                        ))}
                    </div>
                    {selectedSection === "Posts" && usera && (
                        <ProfilePostFetch postsString={userData.Posts} />
                    )}
                    {selectedSection === "Portfolio" && (
                        <ProfileContent />
                        // <div>This is NFT content</div>
                    )}
                    {selectedSection === "Stats" && (
                        <div className="flex items-center justify-center">
                            <ProfileStats />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
