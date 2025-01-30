"use client";
import React, { useState, useEffect } from "react";
import { PiBriefcase, PiCalendarCheck } from "react-icons/pi";
import { SlLocationPin, SlClose } from "react-icons/sl";
import ProfileContent from "@/components/Legacy/ProfileContent";
import { useRouter } from "next/router";
import ProfileBadges from "@/components/Legacy/ProfileBadges";
import ProfileBio from "@/components/Legacy/ProfileBio";
import ProfileLinks from "@/components/Legacy/ProfileLinks";
import ProfileExperience from "@/components/Legacy/ProfileExperience";
import ProfileStats from "@/components/Legacy/ProfileStats";
import ProfileIcons from "@/components/Legacy/ProfileIcons";
import ProfilePostFetch from "@/components/Legacy/ProfilePostFetch";
import { Avatar } from "@nextui-org/react";
import { toast } from "react-toastify";

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

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const { id } = router.query;
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [selectedSection, setSelectedSection] =
        useState<SectionType>("Posts");
    const [error, setError] = useState<string | null>(null);
    type SectionType = "Posts" | "Portfolio" | "Stats";
    type NFT = { value: number; name: string };

    const selectSection = (section: SectionType) => {
        setSelectedSection(section);
    };

    useEffect(() => {
        if (id) {
            const userData = async () => {
                const response = await fetch(`/api/openUserData?user=${id}`);
                const [data] = await response.json();

                if (!data) {
                    // Set an error message when data is undefined
                    setError("User does not exist");
                } else {
                    if (typeof data.paths === "string") {
                        data.paths = data.paths
                            .split(",")
                            .map((path: string) => path.trim());
                    }
                    setUserId(data.userId);
                    setUserData(data);
                }
            };

            userData();
        }
    }, [id]);

    if (!userData) {
        return null;
    }

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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const name = form.elements.namedItem("name") as HTMLInputElement;
        const email = form.elements.namedItem("email") as HTMLInputElement;
        const comments = form.elements.namedItem(
            "comments"
        ) as HTMLInputElement;

        if (!name.value || !email.value) {
            alert("Name and email are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert("Invalid email");
            return;
        }
        const data = {
            name: name.value,
            email: email.value,
            comments: comments.value,
        };

        try {
            const response = await fetch("/api/emailList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toast.error("Error submitting form");
                throw new Error("Network response was not ok");
            }

            toast.success("Form submitted successfully");
            setIsOpen(false);
        } catch (err) {
            toast.error("Error submitting form1");
        }
    };
    const baseUrl = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${userData.userId}/`;
    return (
        <>
            <div
                className="sticky-element cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                Join our <br /> Mailing List
            </div>
            <div className="flex justify-center w-full">
                {isOpen && (
                    <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="modal-content p-4 rounded-lg shadow-lg w-1/3 h-3/4 signin-grad">
                            Join our Mailing List for updates!
                            <span
                                className="close cursor-pointer float-right"
                                onClick={() => setIsOpen(false)}
                            >
                                <SlClose
                                    className="close cursor-pointer float-right text-2xl"
                                    onClick={() => setIsOpen(false)}
                                />
                            </span>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 w-3/4 h-1/2"
                            >
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full p-2 border rounded  text-white shadow-md"
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full p-2 border rounded  text-white shadow-md"
                                    />
                                </label>
                                <label>
                                    Comments:
                                    <textarea
                                        name="comments"
                                        className="w-full p-2 border rounded  text-white shadow-md"
                                    ></textarea>
                                </label>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="h-11 w-32 px-3 py-1 text-bgcolor font-bold bg-ovteal rounded-full hover:bg-opacity-80 transition duration-100"
                                />
                            </form>
                        </div>
                    </div>
                )}
                <div className="openProfile-grad mx-auto mb-11 h-auto mt-10 w-3/5 sm:w-full md:w-4/5 border-r border-l border-neutral-600 relative rounded-xl overflow-hidden">
                    {/* Banner section */}
                    <div className="w-full h-[10%] overflow-hidden">
                        <img
                            src={`${baseUrl}${userData.banner}`}
                            alt="Banner"
                            className="w-full h-full object-fit"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "/defaultBanner.png";
                            }}
                        />
                        <Avatar
                            src={`${baseUrl}${userData.pfp_image}`}
                            alt="Profile"
                            radius="full"
                            className="avatar border-bgcolor border-8 background-bgcolor"
                            onError={() => {
                                const e = {
                                    target: {
                                        src: "/defaultPfp.svg",
                                    },
                                };
                                (e.target as HTMLImageElement).src =
                                    "/defaultPfp.svg";
                            }}
                        />
                    </div>

                    <div className="flex-col justify-center">
                        <div className="flex h-full flex-col border-r border-neutral-600">
                            <div className="flex">
                                <div className="w-64 h-28" />
                                <div className="w-64 h-28 flex">
                                    <div className="font-bold text-3xl text-white mr-2 mt-4">
                                        <span className="text-xl">
                                            {"\u{1FA99}"}
                                        </span>
                                    </div>
                                    <div className="text-3xl mr-3 mt-5">
                                        {" "}
                                        {userData.ova}
                                    </div>
                                    <div className="font-bold text-3xl text-ovteal mt-5">
                                        {" "}
                                        $OVA
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pr-3 text-lg">
                                <div className="font-bold text-white mr-1">
                                    {userData.followerCount}
                                </div>
                                <div className="text-white"> Followers</div>
                                <div className="font-bold text-white mr-1 ml-4">
                                    {userData.followingCount}
                                </div>
                                <div className="text-white"> Following</div>
                            </div>
                            <div className="flex">
                                <div className="border-r border-neutral-600">
                                    <div className="ml-6 text-xl font-bold mr-2">
                                        {userData.username}
                                    </div>
                                    <div className="ml-6 font-light text-neutral-500">
                                        @{userData.username}
                                    </div>
                                </div>
                                <div className="flex items-center ml-2">
                                    <ProfileIcons paths={userData.paths} />
                                </div>
                            </div>

                            <div className="font-light px-4 mt-3">
                                <ProfileBio bio={userData.bio} />
                            </div>
                            <div className="flex mt-3 px-4 items-center justify-center">
                                <div className="flex w-1/4 justify-center items-center">
                                    <div className="text-ovteal mr-2">
                                        <PiBriefcase size={25} />
                                    </div>
                                    <div>
                                        {userData.role
                                            ? roleMapping[userData.role]
                                            : "Default Role"}{" "}
                                    </div>
                                </div>
                                <div className="flex w-1/2 items-center justify-center px-24">
                                    <div className="text-ovteal mr-2">
                                        <PiCalendarCheck size={25} />
                                    </div>
                                    <div>
                                        {userData.datejoined
                                            ? new Date(
                                                  userData.datejoined
                                              ).toLocaleDateString()
                                            : "Loading..."}
                                    </div>
                                </div>
                                <div className="flex w-1/4 justify-center items-center">
                                    <div className="text-ovteal mr-2">
                                        <SlLocationPin size={24} />
                                    </div>
                                    <div>{userData.location}</div>
                                </div>
                            </div>
                            <div className="flex mt-4 justify-center items-center">
                                <ProfileBadges badges={userData.top_badges} />
                            </div>
                            <div className="w-full flex flex-grid grid-rows-1 grid-cols-2 justify-items-stretch mt-10">
                                <div className="flex w-7/12 mx-4">
                                    <ProfileLinks links={userData.links} />
                                </div>
                                <div className="mx-4 ml-20 w-5/12">
                                    <ProfileExperience
                                        experience={userData.experience}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mt-10 pb-3 border-b border-neutral-500 text-2xl">
                                <div
                                    className={`mx-4 cursor-pointer ${selectedSection === "Posts" ? "text-ovteal font-bold" : "text-neutral-500"}`}
                                    onClick={() => selectSection("Posts")}
                                >
                                    Posts
                                </div>
                                <div
                                    className={`mx-4 cursor-pointer ${selectedSection === "Portfolio" ? "text-ovteal font-bold" : "text-neutral-500"}`}
                                    onClick={() => selectSection("Portfolio")}
                                >
                                    Portfolio
                                </div>
                                <div
                                    className={`mx-4 cursor-pointer ${selectedSection === "Stats" ? "text-ovteal font-bold" : "text-neutral-500"}`}
                                    onClick={() => selectSection("Stats")}
                                >
                                    Stats
                                </div>
                            </div>
                            {selectedSection === "Posts" && userId && (
                                <ProfilePostFetch
                                    postsString={userData.Posts}
                                />
                            )}
                            {selectedSection === "Portfolio" && (
                                // <ProfileContent />
                                <div>This is NFT content</div>
                            )}
                            {selectedSection === "Stats" && (
                                <div className="flex items-center justify-center">
                                    <ProfileStats />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
