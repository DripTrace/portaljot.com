"use client";
import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth();
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import {
    PiTrash,
    PiPaintBrush,
    PiHeart,
    PiCirclesThreePlus,
    PiFaders,
    PiCheckBold,
} from "react-icons/pi";
import { getSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordModal from "@/components/Legacy/ProfileEditPassword";
import ProfileExperienceEdit from "./ProfileExperienceEdit";
import { Experience } from "@/types";
import exp from "constants";
import ProfileLinkEdit from "./ProfileLinkEdit";
import ProfileImageEdit from "./ProfileImageEdit";
import ProfileGeneralEdit from "./ProfileGeneralEdit";
import { Tab, Tabs } from "@nextui-org/react";

type Link = {
    label: string;
    url: string;
    linkId: string;
    userId: string;
};

type Badge = {
    name: string;
    image: string;
};

const ProfileEditTabs = ({
    handleCloseModal,
}: {
    handleCloseModal: () => void;
}) => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [links, setLinks] = useState<Link[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [experience, setExperience] = useState<Experience[]>([]);
    const [email, setEmail] = useState("");
    const [activeTab, setActiveTab] = useState("1");

    useEffect(() => {
        async function fetchSession() {
            const session = await getSession();
            if (session && session.user) {
                setUserId((session.user as { id: string }).id);
                return (session.user as { id: string }).id;
            }

            return null;
        }

        async function fetchData() {
            const userId = await fetchSession();
            if (userId) {
                fetch(`/api/userEdit?userId=${userId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const user = data[0]; // get the first user from the array
                        setUserId(user.userId);
                        setUsername(user.username || "");
                        setName(user.username || "");
                        setEmail(user.email || "");
                        setBio(user.bio || "");
                        setLocation(user.location || "");
                        setCategory(user.category || "");
                        setProfilePic(user.pfp_image || null);
                        setRole(user.role || null);
                        setBannerImage(user.banner || null);
                        setCategory(user.role || "");
                        setLinks(user.links);
                        setExperience(user.experience);
                    });
            }
        }

        fetchData();
    }, []);

    const handlePasswordModalOpen = () => {
        setShowPasswordModal(true);
    };

    const handlePasswordModalClose = () => {
        setShowPasswordModal(false);
    };
    const tabs = [
        {
            id: "1",
            label: "Edit Profile Image",
            content: (
                <ProfileImageEdit
                    profilePic={profilePic}
                    setProfilePic={setProfilePic}
                    bannerImage={bannerImage}
                    setBannerImage={setBannerImage}
                />
            ),
        },
        {
            id: "2",
            label: "Edit General Info",
            content: (
                <>
                    <button
                        type="button"
                        onClick={handlePasswordModalOpen}
                        className="h-[2rem] px-3 bg-ovteal rounded-full text-center text-bgcolor font-bold hover:bg-opacity-80 transition duration-100 text-xs sm:text-xs md:text-sm lg:text-base whitespace-nowrap"
                    >
                        Change Password
                    </button>
                    <ProfileGeneralEdit
                        username={username}
                        setUsername={setUsername}
                        email={email}
                        setEmail={setEmail}
                        bio={bio}
                        setBio={setBio}
                        location={location}
                        setLocation={setLocation}
                        category={category}
                        setCategory={setCategory}
                        role={role}
                        setRole={setRole}
                    />
                </>
            ),
        },
        {
            id: "3",
            label: "Edit Links",
            content: <ProfileLinkEdit links={links} setLinks={setLinks} />,
        },
        {
            id: "4",
            label: "Edit Experience",
            content: (
                <ProfileExperienceEdit
                    experience={experience}
                    setExperience={setExperience}
                />
            ),
        },
        {
            id: "5",
            label: "NFT/Web3 Settings",
            content: <div>NFT/Web3 Settings content</div>,
        },
    ];
    return (
        <div className="overflow-y-scroll h-screen z-10 flex flex-col">
            <div className="w-full text-left p-1 flex-col z-20 flex-grow">
                <div className="text-lg my-3">Edit Your Profile in Tabs</div>
                <div className="flex mt-1 space-x-1 overflow-x-auto">
                    {tabs.map((tab, index) => (
                        <div
                            key={tab.id}
                            onClick={() =>
                                index !== tabs.length - 1 &&
                                setActiveTab(tab.id)
                            }
                            className={`cursor-pointer p-2 flex-grow text-center ${activeTab === tab.id ? "bg-ovteal text-bgcolor" : "bg-gray-400 text-bgcolor bg-opacity-50 hover:bg-ovteal hover:bg-opacity-50"} ${index === 0 ? "rounded-l-full" : ""} ${index === tabs.length - 1 ? "rounded-r-full" : ""}`}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        hidden={activeTab !== tab.id}
                        className="mb-3"
                    >
                        <div className="mt-3"> {tab.content} </div>
                    </div>
                ))}
            </div>

            {showPasswordModal && (
                <ChangePasswordModal
                    show={showPasswordModal}
                    handleClose={handlePasswordModalClose}
                />
            )}
        </div>
    );
};

export default ProfileEditTabs;
