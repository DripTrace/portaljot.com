// ProfileGeneralEdit.tsx
"use client";
import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Session } from "next-auth";

interface Props {
    username: string;
    setUsername: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    bio: string;
    setBio: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    role: string;
    setRole: (value: string) => void;
}

const ProfileGeneralEdit: React.FC<Props> = ({
    username,
    setUsername,
    bio,
    setBio,
    location,
    setLocation,
    category,
    setCategory,
    email,
    setEmail,
}) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
            if (session && session.user) {
                setUserId(session?.user?.id);
            }
        };
        fetchSession();
    }, [session]);

    const handleSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => Promise<void> = async (event) => {
        event.preventDefault();

        const profile = {
            userId,
            username,
            email,
            bio,
            location,
            role: category,
        };

        const response = await fetch("/api/updateProfile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.stringify(session?.token)}`,
            },
            body: JSON.stringify(profile),
        });

        if (response.ok) {
            toast.success("Your changes have been saved!");
        } else {
            const errorData = await response.json(); // get the error message from the response body
            console.log("Error:", errorData); // log the error message

            toast.error(`An error occurred please try again later!`);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="w-full flex">
                    <div className="w-3/4">
                        <div className="mb-6">
                            <input
                                type="text"
                                id="username"
                                className="w-1/2 p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                placeholder="Username *"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                id="email"
                                className="w-1/2 p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                placeholder="Email Address*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <textarea
                        id="bio"
                        className="w-full p-2 bg-bgcolor border border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                        rows={6}
                        placeholder="Bio"
                        value={bio} // display the bio state variable
                        onChange={(e) => setBio(e.target.value)} // update the bio state variable
                    ></textarea>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        id="location"
                        className="w-1/3 p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold placeholder:pl-1 outline-none"
                        placeholder="Location"
                        value={location} // display the location state variable
                        onChange={(e) => setLocation(e.target.value)} // update the location state variable
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-xl font-bold mb-2  mt-10"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        className="w-1/3 p-2 bg-bgcolor border-b border-ovteal outline-none"
                        value={category as string}
                        onChange={(event) => {
                            setCategory(event.target.value);
                            console.log("category", category);
                        }}
                    >
                        <option value="1">Enthusiast</option>
                        <option value="2">Artist</option>
                        <option value="3">Blogger</option>
                        <option value="5">Educator</option>
                        <option value="6">Entrepreneur</option>
                        <option value="7">Health/Beauty</option>
                        <option value="8">Editor</option>
                        <option value="9">Writer</option>
                        <option value="10">Gamer</option>
                        <option value="11">Restaurant</option>
                        <option value="12">Photographer</option>
                        <option value="13">Software Developer</option>
                        <option value="14">Video Creator</option>
                        <option value="15">Influencer</option>
                        <option value="16">Trader</option>
                        <option value="17">Musician/Band</option>
                        <option value="18">NFT Collection</option>
                    </select>
                </div>
                <div className="mt-20 mb-20">
                    <button
                        type="submit"
                        className="px-5 py-1 bg-ovteal rounded-full text-center text-bgcolor font-bold text-2xl hover:bg-opacity-80 transition duration-100"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};
export default ProfileGeneralEdit;
