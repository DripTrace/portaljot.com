import React, { useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { TbWorldWww } from "react-icons/tb";
import { SocialIcon } from "react-social-icons";

import Link from "next/link";

interface LinkData {
    label: string;
    url: string;
}

interface ProfileLinksProps {
    links: string | LinkData[];
}

const ProfileLinks: React.FC<ProfileLinksProps> = ({ links }) => {
    const [processedLinks, setProcessedLinks] = useState<LinkData[]>([]);

    useEffect(() => {
        if (typeof links === "string") {
            const processed = links.split(",").map((link: string) => {
                const [url, label] = link.split(";");
                return { url, label };
            });
            setProcessedLinks(processed);
        } else if (Array.isArray(links)) {
            setProcessedLinks(links);
        }
    }, [links]);

    return (
        <div className="flex flex-col my-4">
            <div className="flex justify-around flex-wrap">
                {processedLinks.map((link, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => (window.location.href = link.url)}
                            className="flex mx-3 my-3 items-center cursor-pointer text-ovteal rounded-full hover:bg-ovteal hover:bg-opacity-30 transition duration-100"
                            title={link.label}
                        >
                            <div className="m-1">
                                <SocialIcon
                                    url={link.url}
                                    style={{ height: 50, width: 50 }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileLinks;
