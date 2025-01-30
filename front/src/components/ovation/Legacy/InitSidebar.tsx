"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    PiWallet,
    PiDotsNine,
    PiHouse,
    PiHouseFill,
    PiHash,
    PiHashBold,
    PiChatsCircle,
    PiChatsCircleFill,
    PiBell,
    PiBellFill,
    PiUserCircle,
    PiUserCircleFill,
    PiList,
    PiListFill,
    PiArrowFatLineUp,
} from "react-icons/pi";
import { MdClose } from "react-icons/md";
import PostModal from "./PostModal";

const NAVIGATION_ITEMS = [
    {
        title: "Home",
        icon: PiHouse,
        path: "/",
    },
    {
        title: "Discover",
        icon: PiHash,
        path: "/discover",
    },
    {
        title: "Initiatives",
        icon: PiArrowFatLineUp,
        path: "/initiatives",
    },
    /*{
    title:'Messages',
    icon:PiChatsCircle,
    path: '/messages'
  },*/
    {
        title: "Notifications",
        icon: PiBell,
        path: "/notifications",
    },
    {
        title: "Profile",
        icon: PiUserCircle,
        path: "/profile",
    },
    /*{
    title:'More',
    icon:PiList,
    path: '/more'
  },*/
];

const InitSidebar = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const toggleLogoutView = () => {
        setShowLogout(!showLogout);
    };

    const handleLogout = () => {
        console.log("Logging out..."); // Replace with your logout logic
    };

    return (
        <section className="fixed w-[275px] flex flex-col items-stretch h-screen space-y-3 ml-32">
            <div className="w-full flex flex-col items-stretch h-screen space-y-2">
                <Link href={"/"}>
                    <img
                        src="/sidebarLogo.svg"
                        alt="Ovation"
                        className="logo-height pt-5 ml-3 mb-6 mt-4"
                    />
                </Link>
                {NAVIGATION_ITEMS.map((item) => (
                    <Link
                        className="hover:bg-white/10 text-2xl transition duration-100 flex items-center justify-start w-fit space-x-2 rounded-3xl p-4"
                        href={item.path}
                        key={item.title}
                    >
                        <div>
                            <item.icon size={26} />
                        </div>
                        <div>{item.title}</div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col">
                <button
                    onClick={handleOpenModal}
                    className=" rounded-full mb-2 mr-5 bg-ovteal text-bgcolor py-1 text-xl font-bold text-center text-opacity-100 hover:bg-opacity-80 transition duration-100"
                >
                    + New Initiative
                </button>
                <PostModal show={isModalOpen} onClose={handleCloseModal}>
                    <div className="font-semibold text-lg">Add Initiative</div>
                    <div className="px-2 text-sm mb-2 text-neutral-400">
                        Initiatives are a social feature that allows users to
                        collaborate over mutual synergies. After creating an
                        initiative, this is posted to your profil and searchable
                        on the initiative page!
                    </div>
                    <div className="font-semibold text-lg">
                        Initiative Category
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="twitterSpaceSpeak"
                            name="initiativeCategory"
                            className="mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label
                            htmlFor="twitterSpaceSpeak"
                            className="cursor-pointer"
                        >
                            Twitter Space - Speak
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="twitterSpaceCohost"
                            name="initiativeCategory"
                            className="mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label
                            htmlFor="twitterSpaceCohost"
                            className="cursor-pointer"
                        >
                            Twitter Space - Cohost
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="openForHire"
                            name="initiativeCategory"
                            className=" mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label htmlFor="openForHire" className="cursor-pointer">
                            Open for Hire
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="hiring"
                            name="initiativeCategory"
                            className=" mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label htmlFor="hiring" className="cursor-pointer">
                            Hiring
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="openForMentorship"
                            name="initiativeCategory"
                            className=" mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label
                            htmlFor="openForMentorship"
                            className="cursor-pointer"
                        >
                            Open for Mentorship
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="podcast"
                            name="initiativeCategory"
                            className=" mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label htmlFor="podcast" className="cursor-pointer">
                            Podcast
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="openToCollaborate"
                            name="initiativeCategory"
                            className=" mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label
                            htmlFor="openToCollaborate"
                            className="cursor-pointer"
                        >
                            Open to Collaborate
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="grants"
                            name="initiativeCategory"
                            className=" mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label htmlFor="grants" className="cursor-pointer">
                            Grants
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="partnerships"
                            name="initiativeCategory"
                            className=" mr-2 appearance-none rounded-full border border-white bg-bgcolor checked:bg-ovteal w-3 h-3"
                        />
                        <label
                            htmlFor="partnerships"
                            className="cursor-pointer"
                        >
                            Partnerships
                        </label>
                    </div>
                    <div className="font-semibold mt-2 text-lg">Initiative</div>
                    <textarea
                        className="w-full bg-ovtealdull rounded-xl p-2"
                        placeholder="Add detail . . ."
                    ></textarea>
                    <div className="flex justify-end">
                        <button
                            onClick={handleCloseModal}
                            className="w-full px-6 py-1.5 bg-ovteal text-bgcolor rounded-full hover:bg-opacity-80 mt-2 items font-semibold outline-none"
                        >
                            Post Initiative
                        </button>
                    </div>
                </PostModal>
                <button
                    onClick={showLogout ? handleLogout : toggleLogoutView}
                    className="rounded-full w-64 mr-5 mb-4 flex items-center justify-between bg-transparent px-6 py-2 text-center text-opacity-100 hover:bg-neutral-800 transition duration-100"
                >
                    {showLogout ? (
                        <>
                            <span className="text-lg font-bold cursor-pointer py-2">
                                Log Out
                            </span>{" "}
                            {/* Add link to logged out page later */}
                            <div
                                onClick={toggleLogoutView}
                                className="ml-auto cursor-pointer"
                            >
                                <MdClose size={26} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="rounded-full bg-ovteal w-12 h-12">
                                <img src="/defaultPfp.svg" alt="Profile" />
                            </div>
                            <div className="flex flex-col justify-center ml-2">
                                <div className="text-lg font-bold">
                                    Username
                                </div>
                                <div className="text-sm flex items-center">
                                    <div className="mr-1">
                                        <PiWallet />
                                    </div>
                                    0000 $OVA
                                </div>
                            </div>
                            <div className="ml-auto">
                                <PiDotsNine size={26} />
                            </div>
                        </>
                    )}
                </button>
                <ul className="text-base text-neutral-700 my-1 ml-6">
                    {/*<li><Link href="/">Terms of Service</Link></li>
              <li><Link href="/">Privacy Policy</Link></li>
              <li><Link href="/">Cookie Policy</Link></li>*/}
                    <li>
                        <Link href="/">Feedback</Link>
                    </li>
                    <li>
                        <Link href="/">Accessibilty</Link>
                    </li>
                    <li>
                        <Link href="/">Ads</Link>
                    </li>
                    <li>
                        <Link href="/">More</Link>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default InitSidebar;
