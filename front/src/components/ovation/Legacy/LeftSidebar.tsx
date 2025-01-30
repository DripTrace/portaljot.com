"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
    PiWalletBold,
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
import InitiativeModal from "./InitiativeModal";
import PostModal from "./PostModal";
import { useKeplr } from "@/components/Legacy/useKeplr";

type UserData = {
    username: string;
    ova: number;
    image: string;
    pfp_image: string;
};

const LeftSidebar: React.FC = () => {
    const pathname = usePathname();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const { data: session, status } = useSession();
    const { address, balance, connect, disconnect, isWalletConnected } =
        useKeplr();

    useEffect(() => {
        if (session && session.user) {
            setUserId(session.user.id);
        }
    }, [session]);

    useEffect(() => {
        async function fetchData() {
            if (userId) {
                const response = await fetch(`/api/userName?userId=${userId}`);
                const getData = await response.json();
                const data = getData[0];
                if (data.length === 0) {
                    throw new Error("Data array is empty");
                }
                setUserData(data);
            }
        }

        fetchData();
    }, [userId]);

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
        localStorage.removeItem("address");
        localStorage.removeItem("balance");
        signOut({ callbackUrl: "/signin" });
    };

    const NAVIGATION_ITEMS = [
        {
            title: "Home",
            icon: PiHouse,
            path: "/posts",
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
        {
            title: "Messages",
            icon: PiChatsCircle,
            path: "/messages",
        },
        {
            title: "Notifications",
            icon: PiBell,
            path: "/notifications",
        },
        {
            title: "Profile",
            icon: PiUserCircle,
            path: userId ? `/profile/${userId}` : "#",
        },
        /*{
      title:'More',
      icon:PiList,
      path: '/more'
    },*/
    ];

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

            {pathname === "/initiatives" && (
                <div className="flex flex-col">
                    <button
                        onClick={handleOpenModal}
                        className=" rounded-full mb-2 mr-5 bg-ovteal text-bgcolor py-1 text-xl font-bold text-center text-opacity-100 hover:bg-opacity-80 transition duration-100"
                    >
                        + New Initiative
                    </button>
                    {isModalOpen && (
                        <PostModal
                            show={isModalOpen}
                            onClose={handleCloseModal}
                        >
                            <InitiativeModal
                                handleCloseModal={handleCloseModal}
                            />
                        </PostModal>
                    )}
                </div>
            )}

            <div>
                {isWalletConnected ? (
                    <button
                        onClick={disconnect}
                        className="rounded-full w-64 mb-4 mr-5 bg-ovteal text-bgcolor py-1 text-xl font-bold text-center text-opacity-100 hover:bg-opacity-80 transition duration-100 flex items-center justify-center"
                    >
                        <div className="mr-1">
                            <PiWalletBold />
                        </div>
                        <div>Disconnect Wallet</div>
                    </button>
                ) : (
                    <button
                        onClick={connect}
                        className="rounded-full w-64 mb-4 mr-5 bg-ovteal text-bgcolor py-1 text-xl font-bold text-center text-opacity-100 hover:bg-opacity-80 transition duration-100 flex items-center justify-center"
                    >
                        <div className="mr-1">
                            <PiWalletBold />
                        </div>
                        <div>Connect Wallet</div>
                    </button>
                )}

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
                            <img
                                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${userId}/${userData?.pfp_image}`}
                                alt="Profile"
                                className="rounded-full w-12 h-12 object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "/defaultPfp.svg";
                                }}
                            />
                            <div className="flex flex-col justify-center ml-2">
                                <div className="text-lg font-bold">
                                    {userData
                                        ? userData.username
                                        : "Loading..."}
                                </div>
                                <div className="text-sm flex justify-start">
                                    <div className="flex flex-col justify-start">
                                        <p>
                                            <span className="text-base mr-1">
                                                {"\u{1FA99}"}
                                            </span>{" "}
                                            {userData
                                                ? userData.ova + " $OVA"
                                                : "Loading..."}
                                        </p>
                                        {isWalletConnected && (
                                            <div className="flex justify-start items-center">
                                                <img
                                                    src="/ArchwayCircled-Orange.svg"
                                                    alt="Logo"
                                                    className="w-4 ml-2 mr-2"
                                                />
                                                <p>
                                                    {balance
                                                        ? balance + " ARCH"
                                                        : "Loading..."}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <PiDotsNine size={26} />
                            </div>
                        </>
                    )}
                </button>
                <ul className="text-base text-neutral-700 my-1 ml-6 mb-5">
                    <li>
                        <Link href="/">Feedback</Link>
                    </li>
                    <li>
                        <Link href="/service/terms-of-service">
                            Terms of Service
                        </Link>
                    </li>
                    <li>
                        <Link href="/service/privacy-policy">
                            Privacy Policy
                        </Link>
                    </li>
                    {/* <li><Link href="/">Cookie Policy</Link></li> 
          <li><Link href="/">Accessibilty</Link></li>
          <li><Link href="/">Ads</Link></li>
          <li><Link href="/">More</Link></li> */}
                </ul>
            </div>
        </section>
    );
};
export default LeftSidebar;
