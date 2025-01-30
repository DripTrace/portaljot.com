"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
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
import exp from "constants";

type Link = {
    label: string;
    url: string;
    linkId: string;
    userId: string;
};

type Experience = {
    company: string;
    role: string;
    jobDescription: string;
    [key: string]: string;
};
type Badge = {
    name: string;
    image: string;
};
type HandleExperienceChange = (
    index: number,
    field: string,
    value: string
) => void;

const EditProfile = () => {
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [links, setLinks] = useState<Link[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [Name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [role, setRole] = useState([]);

    const [experience, setExperience] = useState<Experience[]>([]);

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
                        setBio(user.bio || "");
                        setLocation(user.location || "");
                        setCategory(user.category || "");
                        setProfilePic(user.pfp_image || null);
                        setRole(user.role || null);
                        setBannerImage(user.banner || null);
                        // Parse the links string into an array of objects
                        if (user.links) {
                            const parsedLinks = user.links
                                .split(",")
                                .map((link: string) => {
                                    const [linkId, userId, url, label] = link
                                        .split(";")
                                        .map((field) => field.trim());
                                    return { label, url, linkId, userId };
                                });
                            setLinks(parsedLinks);
                        } else {
                            setLinks([]);
                        }

                        if (typeof user.experience === "string") {
                            const parsedExperience = user.experience
                                .split("|")
                                .map((exp: string) => {
                                    const [
                                        experienceId,
                                        userId,
                                        company,
                                        role,
                                        jobDescription,
                                    ] = exp
                                        .split(";")
                                        .map((field) => field.trim());
                                    return {
                                        experienceId,
                                        userId,
                                        company,
                                        role,
                                        jobDescription,
                                    };
                                });

                            setExperience(parsedExperience);
                        } else {
                            setExperience((prevExperience) => ({
                                ...prevExperience,
                                data: [],
                            }));
                        }
                    });
            }
        }

        fetchData();
    }, []);
    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>,
        setImage: (url: string | null) => void
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setImage(url);
        } else {
            setImage(null);
        }
    };

    const addLink = () => {
        setLinks([...links, { label: "", url: "", linkId: "", userId: "" }]);
    };

    function deleteLink(index: number) {
        setLinks(links.filter((_, i) => i !== index));
    }

    const addExperience = () => {
        setExperience([
            ...experience,
            {
                company: "",
                role: "",
                jobDescription: "",
                key: `exp-${experience.length}`,
                index: experience.length.toString(),
            },
        ]);
    };
    function deleteExperience(index: number) {
        setExperience(experience.filter((_, i) => i !== index));
    }
    const handleSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => Promise<void> = async (event) => {
        event.preventDefault();
        const session = await getSession();

        // create an object with the form data
        const profile = {
            //profilePic,
            //bannerImage,
            userId,
            username,
            bio,
            location,
            //  category: document.getElementById('category').value,
            // add other fields as needed
        };
        const userData = {
            profile: profile ? profile : undefined,
            links: links ? links : undefined, // if links itself is the data
            experience: experience ? experience : undefined,
        };
        // const token = sessionStorage.getItem('token'); // replace with how you get your token

        // send the form data to the server
        const response = await fetch("/api/updateProfile", {
            method: "PUT", // or 'PUT' if you're updating existing data
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.stringify(session?.token)}`,
            },
            body: JSON.stringify(userData),
        });

        // check if the request was successful
        if (response.ok) {
            // navigate to the profile page
            //window.location.href = '/profile';
        } else {
            // handle error...
        }

        // check if the request was successful
        if (response.ok) {
            // navigate to the profile page
            //window.location.href = '/profile';
        } else {
            // handle error...
        }
    };

    return (
        <div className="w-3/4 p-4">
            <form onSubmit={handleSubmit}>
                <section className="w-4/5 p-4 h-full min-h-screen flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold mt-20">
                        Edit Your Profile
                    </div>

                    {/* Edit Profile Section */}
                    <div className="mt-10 w-full max-w-md mx-auto">
                        {/* Profile Picture Input */}
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
                                onChange={(e) =>
                                    handleImageChange(e, setProfilePic)
                                }
                            />
                            <label
                                htmlFor="profile-picture"
                                className="cursor-pointer inline-block bg-ovteal text-bgcolor font-bold hover:bg-opacity-80 transition duration-100 py-2 px-4 rounded-full"
                            >
                                Choose File
                            </label>

                            <img
                                src={`/images/users/${userId}/${profilePic}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full mt-2 object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "/defaultPfp.svg";
                                }}
                            />
                            {/*profilePic && <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full mt-2" />*/}
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
                                    handleImageChange(e, setBannerImage)
                                }
                            />
                            <label
                                htmlFor="banner-image"
                                className="cursor-pointer inline-block bg-ovteal text-bgcolor font-bold hover:bg-opacity-80 transition duration-100 py-2 px-4 rounded-full"
                            >
                                Choose File
                            </label>
                            <img
                                src={`/images/users/${userId}/${bannerImage}`}
                                alt="Banner Image"
                                className="w-64 mt-2 object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "/defaultBanner.png";
                                }}
                            />
                            {/*bannerImage && <img src={bannerImage} alt="Banner" className="w-full h-48 object-cover rounded-2xl mt-2"/>*/}
                        </div>

                        {/* Text Inputs */}
                        <label
                            className="block text-xl font-bold mb-2  mt-10"
                            htmlFor="category"
                        >
                            General Info
                        </label>
                        <div className="mb-6">
                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                placeholder="Username *"
                                value={username} // display the username state variable
                                onChange={(e) => setUsername(e.target.value)} // update the username state variable
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                id="display-name"
                                className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                placeholder="Display Name *"
                                value={Name} // display the displayName state variable
                                onChange={(e) => setName(e.target.value)} // update the displayName state variable
                            />
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
                                className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold placeholder:pl-1 outline-none"
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
                                className="w-full p-2 bg-bgcolor border-b border-ovteal outline-none"
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
                        <label className="block text-xl font-bold mb-2  mt-10">
                            Links
                        </label>
                        {links.map((link, index) => (
                            <div key={index} className="mb-3">
                                <PiTrash
                                    onClick={() => deleteLink(index)}
                                    className="ml-2 cursor-pointer"
                                />
                                {experience &&
                                    index <
                                        (experience as any[]).length - 1}{" "}
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        className="mr-2 p-2 bg-bgcolor border-b border-ovteal outline-none placeholder:pl-1"
                                        value={link.label}
                                        onChange={(e) => {
                                            const newLinks = [...links];
                                            newLinks[index].label =
                                                e.target.value;
                                            setLinks(newLinks);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Link"
                                        className="p-2 bg-bgcolor border-b border-ovteal outline-none placeholder:pl-1 flex-grow"
                                        value={link.url}
                                        onChange={(e) => {
                                            const newLinks = [...links];
                                            newLinks[index].url =
                                                e.target.value;
                                            setLinks(newLinks);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addLink}
                            className="mb-3 p-2 text-ovteal bg-bgcolor border rounded-full border-ovteal hover:bg-white/10 transition duration-100"
                        >
                            Add Link
                        </button>

                        <label className="block text-xl font-bold mb-2  mt-10">
                            Experience
                        </label>
                        <div>
                            {experience &&
                                Array.isArray(experience) &&
                                experience.map((exp, index) => (
                                    <div key={index}>
                                        <PiTrash
                                            onClick={() =>
                                                deleteExperience(index)
                                            }
                                            className="ml-2 cursor-pointer"
                                        />
                                        {experience &&
                                            index <
                                                (experience as any[]).length -
                                                    1}{" "}
                                        <input
                                            id={`company-${index}`}
                                            className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                            placeholder="Company"
                                            value={exp.company}
                                            onChange={(e) => {
                                                const newExperience = [
                                                    ...experience,
                                                ];
                                                newExperience[index].company =
                                                    e.target.value;
                                                setExperience(newExperience);
                                            }}
                                        />
                                        <input
                                            id={`role-${index}`}
                                            className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                            placeholder="Role"
                                            value={exp.role}
                                            onChange={(e) => {
                                                const newExperience = [
                                                    ...experience,
                                                ];
                                                newExperience[index].role =
                                                    e.target.value;
                                                setExperience(newExperience);
                                            }}
                                        />
                                        <input
                                            id={`jobDescription-${index}`}
                                            className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                            placeholder="Job Description"
                                            value={exp.jobDescription}
                                            onChange={(e) => {
                                                const newExperience = [
                                                    ...experience,
                                                ];
                                                newExperience[
                                                    index
                                                ].jobDescription =
                                                    e.target.value;
                                                setExperience(newExperience);
                                            }}
                                        />
                                        {experience &&
                                            index <
                                                (experience as any[]).length -
                                                    1 && (
                                                <hr className="my-4" />
                                            )}{" "}
                                        {/* Add a horizontal line between each set, except after the last one */}
                                    </div>
                                ))}
                        </div>
                        <button
                            onClick={addExperience}
                            className="mb-3 p-2 mt-3 text-ovteal bg-bgcolor border rounded-full border-ovteal hover:bg-white/10 transition duration-100"
                        >
                            Add Experience
                        </button>
                    </div>
                    <div className="mt-20 mb-20">
                        <button
                            type="submit"
                            className="px-5 py-1 bg-ovteal rounded-full text-center text-bgcolor font-bold text-2xl hover:bg-opacity-80 transition duration-100"
                        >
                            Next
                        </button>
                    </div>
                </section>
            </form>
        </div>
    );
};

export default EditProfile;
