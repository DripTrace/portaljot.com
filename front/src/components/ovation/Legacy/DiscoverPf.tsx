"use client";

import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DiscoverPfProps {
    id: number;
    username: string;
    banner: string;
    followers: number;
    nftCount: number;
    badge_count: number;
    ova: number;
    pfp_image: string;
    follower_count: number;
    isFollowing: boolean;
    is_following: number;
}

const DiscoverPf: React.FC<DiscoverPfProps> = (props: DiscoverPfProps) => {
    const {
        id,
        username,
        banner,
        follower_count,
        nftCount,
        badge_count,
        ova,
        pfp_image,
        is_following,
    } = props;
    const [isHovering, setIsHovering] = useState(false);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
    const [followerCount, setFollowerCount] = useState(follower_count);
    useEffect(() => {
        if (session && session.user) {
            setUserId(session.user.id);
        }
    }, [session]);

    const discData = {
        id: id,
        name: username,
        username: username,
        pfp: pfp_image,
        banner: banner,
        nfts: nftCount,
        ova: ova,
        badges: badge_count,
        followerCount: follower_count,
        isfollowing: is_following,
    };

    const handleFollow = async () => {
        try {
            const response = await fetch("/api/follow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    profileId: discData.id,
                    action: `${discData.name} followed you`,
                    target: "discover",
                }),
            });

            if (response.ok) {
                toast.success("Request sent successfully");
                setIsFollowing(true);
                setFollowerCount((prevCount) =>
                    prevCount ? prevCount + 1 : 1
                );
                console.log(isFollowing, "isFollowing");
            } else {
                toast.error("Failed to follow");
            }
        } catch (error) {
            console.error("Failed to follow:", error);
            toast.error("An error occurred while trying to follow");
        }
    };
    React.useEffect(() => {
        if (discData.isfollowing === 1) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [discData.isfollowing]);

    return (
        <div className="rounded-lg border border-neutral-600 bg-bgcolor overflow-hidden w-72 h-96">
            <div className="h-20">
                <img
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${discData.id}/${discData.banner}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            "/defaultBanner.png";
                    }}
                />
            </div>
            <div className="h-60 p-4">
                <div className="relative flex">
                    <img
                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${discData.id}/${discData.pfp}`}
                        alt="Profile"
                        className="absolute -top-14 left-2 w-20 h-20 object-cover rounded-full bg-bgcolor border-4 border-neutral-800"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "/defaultPfp.svg";
                        }}
                    />
                    <div className="py-10">
                        {/* Convert name and username to links */}
                        <h3 className="text-ovteal font-bold hover:underline">
                            <Link href={`/profile/${discData.id}`}>
                                {discData.name}
                            </Link>
                        </h3>
                        <p className="text-neutral-500 text-xs font-light mb-3 hover:underline">
                            <Link href={`/profile/${discData.id}`}>
                                @{discData.username}
                            </Link>
                        </p>
                        {/* <div className="text-sm mb-2 h-28 w-[254px] break-words">{discData.description}</div> */}
                        <p className="text-sm mb-2">
                            NFT Count: {discData.nfts}
                        </p>
                        <p className="text-sm mb-2">
                            OVA Tokens: {discData.ova}
                        </p>
                        <p className="text-sm mb-2">
                            ARCH Tokens: {discData.ova}
                        </p>
                        <p className="text-sm mb-2">
                            Badges: {discData.badges}
                        </p>
                    </div>
                    <div className="flex items-center">
                        {isFollowing || discData.id === Number(userId) ? (
                            <div className="rounded-full border-8 border-ovteal bg-bgcolor text-white text-2xl w-24 h-24 flex flex-col items-center justify-center ml-8">
                                <>
                                    <span>{followerCount}</span>
                                    <p className="text-xs text-white">
                                        Followers
                                    </p>
                                </>
                            </div>
                        ) : (
                            <div
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                className="rounded-full border-8 border-ovteal bg-bgcolor text-white text-2xl w-24 h-24 flex flex-col items-center justify-center ml-8 transition-all duration-300 cursor-pointer hover:bg-ovteal hover:border-ovteal"
                            >
                                {isHovering && !isFollowing ? (
                                    <button
                                        className="text-bgcolor font-bold"
                                        onClick={() => handleFollow()}
                                    >
                                        Follow
                                    </button>
                                ) : (
                                    <>
                                        <span>{followerCount}</span>
                                        <p className="text-xs text-white">
                                            Followers
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Link href={`/profile/${discData.id}`}>
                <div className="px-4 mt-6">
                    <button className="text-bgcolor py-1 w-full text-sm font-semibold mb-2 rounded bg-ovteal text-center hover:bg-ovteal/80 transition duration-100">
                        View Profile
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default DiscoverPf;
