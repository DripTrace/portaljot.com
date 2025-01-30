//ProfileImageEdit.tsx
"use client";
import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";

interface Props {
    setProfilePic: (value: string | null) => void;
    setBannerImage: (value: string | null) => void;
    profilePic: string | null;
    bannerImage: string | null;
}

const ProfileImageEdit: React.FC<Props> = ({
    profilePic,
    setProfilePic,
    bannerImage,
    setBannerImage,
}) => {
    const [userId, setUserId] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        async function fetchSession() {
            const session = await getSession();
            if (session && session.user) {
                setUserId((session.user as { id: string }).id);
            }
        }
        fetchSession();
    }, []);

    async function handleImageChange(
        e: React.ChangeEvent<HTMLInputElement>,
        setImage: (image: string) => void,
        imageType: string
    ) {
        setIsLoading(true);
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("imageType", imageType);

        formData.append("image", file);
        if (userId) {
            formData.append("userId", userId);
        } else {
            console.error("userId is null");
        }
        //@ts-ignore
        for (let pair of formData.entries()) {
            //console.log(pair[0] + ', ' + pair[1]);
        }
        const res = await fetch("/api/uploadImage", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setImage(data.path);
        setIsLoading(false);
    }

    return (
        <>
            <div className="flex justify-evenly mb-6">
                <div className="mb-6">
                    <label
                        className="block text-xl font-bold mb-2"
                        htmlFor="profile-picture"
                    >
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        id="profile-picture"
                        className="hidden"
                        onChange={(e) => {
                            if (userId) {
                                handleImageChange(e, setProfilePic, "profile");
                            }
                        }}
                    />
                    <label
                        htmlFor="profile-picture"
                        className="cursor-pointer inline-block bg-ovteal text-bgcolor font-bold hover:bg-opacity-80 transition duration-100 py-2 px-4 rounded-full"
                    >
                        Choose File
                    </label>
                    <img
                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${userId}/${profilePic}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mt-2 object-cover"
                        onError={(e) => {
                            if (!isLoading) {
                                (e.target as HTMLImageElement).src =
                                    "/defaultPfp.png";
                            }
                        }}
                    />
                </div>
                {/* Banner Image Input */}
                <div className="mb-6">
                    <label
                        className="block text-xl font-bold mb-2"
                        htmlFor="banner-image"
                    >
                        Banner Image
                    </label>
                    <input
                        type="file"
                        id="banner-image"
                        className="hidden"
                        onChange={(e) =>
                            handleImageChange(e, setBannerImage, "banner")
                        }
                    />
                    <label
                        htmlFor="banner-image"
                        className="cursor-pointer inline-block bg-ovteal text-bgcolor font-bold hover:bg-opacity-80 transition duration-100 py-2 px-4 rounded-full"
                    >
                        Choose File
                    </label>
                    <img
                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${process.env.NEXT_PUBLIC_S3_PATH}/${userId}/${bannerImage}`}
                        alt="Banner Image"
                        className="w-64 mt-2 object-cover"
                        onError={(e) => {
                            if (!isLoading) {
                                (e.target as HTMLImageElement).src =
                                    "/defaultBanner.png";
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );
};
export default ProfileImageEdit;
