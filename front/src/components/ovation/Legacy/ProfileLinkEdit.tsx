// ProfileLinkEdit.tsx
"use client";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PiTrash } from "react-icons/pi";
import { toast } from "react-toastify";

type Link = {
    label: string;
    url: string;
    linkId: string;
    userId: string;
};

interface Props {
    links: Link[] | any;
    setLinks: Dispatch<SetStateAction<Link[]>>;
}

const ProfileLinkEdit: React.FC<Props> = ({ links, setLinks }) => {
    const { data: session } = useSession();
    const [userId, setUserId] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [initialLink, setInitialLink] = useState<Link>({
        label: "",
        url: "",
        linkId: "",
        userId: "",
    });
    const [changedLinks, setChangedLinks] = useState<Link[]>([]);
    const [linkChanged, setLinkChanged] = useState(false);

    useEffect(() => {
        if (session && session.user) {
            setUserId(session.user.id);
        }
    }, [session]);

    useEffect(() => {
        if (typeof links === "string") {
            const parsedLinks: Link[] = links.split(",").map((link: string) => {
                const [linkId, userId, url, label] = link
                    .split(";")
                    .map((field) => field.trim());
                return {
                    linkId: linkId,
                    userId: userId,
                    url: url,
                    label: label,
                };
            });
            setLinks(parsedLinks);
        }
    }, [links, setLinks]);

    const addLink = () => {
        setLinks([...links, { label: "", url: "", linkId: undefined }]);
    };

    const handleBlur = async (index: number) => {
        if (!linkChanged) {
            return;
        }
        const link = links[index];
        link.userId = userId;
        if (link.label && link.url) {
            fetch("/api/updateLinks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ link }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    // If this was a new link, update the linkId with the ID returned from the server
                    if (!link.linkId) {
                        const newLinks = [...links];
                        newLinks[index].linkId = data.linkId;
                        setLinks(newLinks);
                    }
                    toast.success("Link saved successfully");
                })
                .catch(() => {
                    toast.error("Failed to save link");
                });
        }
        setLinkChanged(false);
    };
    const deleteLink = (index: number) => {
        const deletedLink = links[index];
        const updatedLinks = links.filter((_: any, i: number) => i !== index);
        setLinks(updatedLinks);

        fetch("/api/updateLinks", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ link: deletedLink }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                toast.success("Link deleted successfully");
            })
            .catch(() => {
                toast.error("Failed to delete link");
            });
    };
    return (
        <>
            <div>
                {links &&
                    Array.isArray(links) &&
                    links.map((link, index) => (
                        <div key={index}>
                            <PiTrash
                                onClick={() => deleteLink(index)}
                                className="ml-2 cursor-pointer"
                            />
                            <div onBlur={() => handleBlur(index)}>
                                <input
                                    id={`label-${index}`}
                                    className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                    placeholder="Label"
                                    value={link.label}
                                    onChange={(e) => {
                                        const newLinks = [...links];
                                        newLinks[index].label = e.target.value;
                                        setLinks(newLinks);
                                        if (
                                            !changedLinks.includes(
                                                newLinks[index]
                                            )
                                        ) {
                                            setChangedLinks([
                                                ...changedLinks,
                                                newLinks[index],
                                            ]);
                                        }
                                        setLinkChanged(true);
                                    }}
                                />
                                <input
                                    id={`url-${index}`}
                                    className="w-full p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                    placeholder="URL"
                                    value={link.url}
                                    onChange={(e) => {
                                        const newLinks = [...links];
                                        newLinks[index].url = e.target.value;
                                        setLinks(newLinks);
                                        if (
                                            !changedLinks.includes(
                                                newLinks[index]
                                            )
                                        ) {
                                            setChangedLinks([
                                                ...changedLinks,
                                                newLinks[index],
                                            ]);
                                        }
                                        setLinkChanged(true);
                                    }}
                                />
                            </div>
                            {links && index < (links as any[]).length - 1 && (
                                <hr className="my-4" />
                            )}{" "}
                            {/* Add a horizontal line between each set, except after the last one */}
                        </div>
                    ))}
            </div>
            <button
                onClick={addLink}
                type="button"
                className="mb-3 p-2 mt-3 text-ovteal bg-bgcolor border rounded-full border-ovteal hover:bg-white/10 transition duration-100"
            >
                Add Link
            </button>
        </>
    );
};

export default ProfileLinkEdit;
