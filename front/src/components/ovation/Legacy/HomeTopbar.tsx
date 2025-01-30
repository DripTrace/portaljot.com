"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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

const HomeTopbar = () => {
    // const [sortCriteria, setSortCriteria] = useState<SortCriteria>('rank');
    // const [isAscending, setIsAscending] = useState(true);
    // const [users, setUsers] = useState([]);

    // const fetchUsers = async () => {
    //     const res = await fetch('/api/users');
    //     const data = await res.json();
    //     setUsers(data[0]);
    // };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    // {
    //     users.map((user, index) => (
    //         <ProfileBar key={index} {...user} />
    //     ))
    // }

    // const toggleSort = (criteria: SortCriteria) => {
    //     if (sortCriteria === criteria) {
    //         setIsAscending(!isAscending);
    //     } else {
    //         setSortCriteria(criteria);
    //         setIsAscending(true); // reset to ascending when criteria changes
    //     }
    // };

    // const sortedUsers = [...users].sort((a, b) => {
    //     const valueA = a[sortCriteria];
    //     const valueB = b[sortCriteria];
    //     if (isAscending) {
    //         return valueA < valueB ? -1 : 1;
    //     } else {
    //         return valueA > valueB ? -1 : 1;
    //     }
    // });

    return (
        <>
            {/* Background Image Container */}
            <div className="background-container">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                >
                    <source src="/ovationnetwork.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div className="content-container items-center text-center justify-center h-screen">
                <div
                    className="flex items-center text-center justify-center bg-black/50 pb-5"
                    style={{ width: "calc(100vw - 17px)" }}
                >
                    <div className="w-96">
                        <Link href={"/"}>
                            <img
                                src="/sidebarLogo.svg"
                                alt="Ovation"
                                className="logo-height pt-5"
                            />
                        </Link>
                    </div>
                    <div className="font-bold px-3 flex justify-end items-end mb-1">
                        <Link
                            href={"/discover"}
                            className="rounded-full px-5 py-1 justify-center text-center hover:bg-white/10 transition duration-100 mt-7 font-bold"
                        >
                            Discover
                        </Link>
                        <Link
                            href={"/comingsoon"}
                            className="rounded-full px-5 py-1 justify-center text-center hover:bg-white/10 transition duration-100 mt-7 font-bold"
                        >
                            Intitiatives
                        </Link>
                        <Link
                            href={"/notifications"}
                            className="rounded-full px-5 py-1 justify-center text-center hover:bg-white/10 transition duration-100 mt-7 font-bold"
                        >
                            Notifications
                        </Link>
                        <Link
                            href={"/profile"}
                            className="rounded-full px-5 py-1 justify-center text-center hover:bg-white/10 transition duration-100 mt-7 font-bold"
                        >
                            Profile
                        </Link>
                    </div>
                    <div className="w-96 justify-end text-right items-end">
                        <Link href={"/signin"}>
                            <button className="rounded-full px-5 py-1 justify-center text-center border-2 hover:bg-white/10 transition duration-100 mt-6 font-bold">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Other content can go here */}
                <div className="flex-col ml-28 text-left">
                    <div className="" style={{ height: "50vh" }}></div>
                    <div className="font-bold text-7xl">
                        The First
                        <div>NFT Superapp</div>
                    </div>
                    <Link href={"/discover"}>
                        <button className="text-2xl mt-5 px-5 py-2 rounded-full font-bold bg-ovteal hover:bg-opacity-80 transition duration-100 mb-10 text-bgcolor">
                            Discover More
                        </button>
                    </Link>
                </div>
            </div>

            <section className="px-4 flex flex-wrap mb-3">
                <ProfileBar />
            </section>
            <Link href={"/discover"}>
                <button className="mt-5 px-5 py-2 rounded-full font-semibold bg-ovteal hover:bg-opacity-80 transition duration-100 mb-10 text-bgcolor">
                    Discover More
                </button>
            </Link>
        </>
    );
};

export default HomeTopbar;
