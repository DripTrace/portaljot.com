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
import { Accordion, AccordionItem } from "@nextui-org/react";

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

const ProfileEdit = ({
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
    return (
        <div className="w-full overflow-y-auto h-screen z-10 flex flex-col">
            <div className="w-full text-left p-1 flex-col z-20 flex-grow">
                <div className="text-xl font-bold my-3">Edit Your Profile</div>
                <Accordion
                    defaultExpandedKeys={["1"]}
                    className="space-y-1 overflow-y-auto h-[80vh]"
                >
                    <AccordionItem
                        key="1"
                        aria-label="Edit Profile Image"
                        title="Edit Profile Image"
                        className="caret-pink-500 text-sm sm:text-base md:text-lg lg:text-xl py-2"
                    >
                        <ProfileImageEdit
                            profilePic={profilePic}
                            setProfilePic={setProfilePic}
                            bannerImage={bannerImage}
                            setBannerImage={setBannerImage}
                        />
                    </AccordionItem>
                    <AccordionItem
                        key="2"
                        aria-label="Edit General Info"
                        title="Edit General Info"
                        className="text-sm sm:text-base md:text-lg lg:text-xl py-2"
                    >
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
                    </AccordionItem>
                    <AccordionItem
                        key="3"
                        aria-label="NFT/Web3 Settings"
                        title="NFT/Web3 Settings"
                        className="text-sm sm:text-base md:text-lg lg:text-xl py-2"
                    ></AccordionItem>
                    <AccordionItem
                        key="4"
                        aria-label="Edit Links"
                        title="Edit Links"
                        className="text-sm sm:text-base md:text-lg lg:text-xl py-2"
                    >
                        <ProfileLinkEdit links={links} setLinks={setLinks} />
                    </AccordionItem>
                    <AccordionItem
                        key="5"
                        aria-label="Edit Experience"
                        title="Edit Experience"
                        className="text-sm sm:text-base md:text-lg lg:text-xl py-2"
                    >
                        <ProfileExperienceEdit
                            experience={experience}
                            setExperience={setExperience}
                        />
                    </AccordionItem>
                </Accordion>
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

export default ProfileEdit;
