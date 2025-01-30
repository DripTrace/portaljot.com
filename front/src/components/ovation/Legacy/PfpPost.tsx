"use client";
import React, { useState } from "react";
import { PiDotsNine, PiWallet } from "react-icons/pi";
import PostModal from "./PostModal"; // Import the Modal component
import Link from "next/link";
import { MdClose } from "react-icons/md";

const PfpPost = () => {
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
        <section className="fixed w-80 flex flex-col space-y-4 h-56 bg-bgcolor top-0">
            {/* User Profile and Wallet Information */}
            <button
                onClick={showLogout ? handleLogout : toggleLogoutView}
                className="rounded-full m-4 flex items-center justify-between bg-transparent px-6 py-2 text-center text-opacity-100 hover:bg-neutral-800 transition duration-100"
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
                            <div className="text-lg font-bold">Username</div>
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
            <button
                onClick={handleOpenModal}
                className="rounded-full m-4 bg-ovteal text-bgcolor px-6 py-2 text-2xl font-bold text-center text-opacity-100 hover:bg-opacity-80 transition duration-100"
            >
                +Post
            </button>
            <input
                type="text"
                placeholder="Search Ovation"
                className="rounded-full m-4 bg-bgcolor text-white px-6 py-2 text-lg border border-ovteal"
            />

            {/* Modal for Creating Post */}
            <PostModal show={isModalOpen} onClose={handleCloseModal}>
                <textarea
                    className="w-full bg-ovtealdull rounded-xl p-2"
                    placeholder="What's new..."
                ></textarea>
                <div className="flex justify-end">
                    <button className="px-6 py-1.5 bg-ovtealdull text-white rounded-full hover:bg-opacity-80 mt-2 mr-2 font">
                        NFT
                    </button>
                    <button className="px-6 py-1.5 bg-ovtealdull text-white rounded-full hover:bg-opacity-80 mt-2 mr-2 font">
                        Media
                    </button>
                    <button className="px-6 py-1.5 bg-ovtealdull text-white rounded-full hover:bg-opacity-80 mt-2 mr-2 font">
                        Poll
                    </button>
                    <button className="px-6 py-1.5 bg-ovtealdull text-white rounded-full hover:bg-opacity-80 mt-2 mr-14 font">
                        Text
                    </button>
                    <button className="px-6 py-1.5 bg-ovteal text-bgcolor rounded-full hover:bg-opacity-80 mt-2 items font-semibold">
                        Post
                    </button>
                </div>
            </PostModal>
        </section>
    );
};

export default PfpPost;
