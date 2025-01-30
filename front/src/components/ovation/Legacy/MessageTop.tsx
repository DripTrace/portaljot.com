"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PiChat, PiChatFill, PiWallet, PiDotsNine } from "react-icons/pi";
import { MdClose } from "react-icons/md";

const MessageTop = () => {
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
        <main className="ml-[400px] flex w-[1040px] h-full min-h-[1350px] flex-col border-r border-l border-neutral-600 relative">
            <div className="w-[1030px] h-40 bg-bgcolor sticky top-0 left-0 flex items-center justify-center">
                <div className="flex text-ovteal justify-center mt-8">
                    <PiChatFill size={50} />
                </div>
            </div>
            <div className="border-b border-neutral-600" />
        </main>
    );
};

export default MessageTop;
