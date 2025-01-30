"use client";

import { profileInfo } from "@/lib/utils/constants";
import Image from "next/image";
import { useEffect } from "react";

const Information = () => {
    const { content } = profileInfo;

    useEffect(() => {
        console.log("what the actual fuck");
    }, []);

    return (
        <div className="information">
            <div className="describe">
                <div className="bio">
                    <span className="latest">
                        {content.userInfo.position.title}
                        {content.userInfo.position.company}
                    </span>
                    <span className="description">{content.userInfo.bio}</span>
                    <div className="follow">
                        <span className="follow-container">
                            <h2 className="follow-count">
                                {content.userInfo.followingCount.count}
                            </h2>
                            <h2 className="follow-identifier">
                                {
                                    content.userInfo.followingCount
                                        .followingDescriptor
                                }
                            </h2>
                        </span>
                        <span className="follow-container">
                            <h2 className="follow-count">
                                {content.userInfo.followerCount.count}
                                {content.userInfo.followerCount.magnitude}
                            </h2>
                            <h2 className="follow-identifier">
                                {
                                    content.userInfo.followerCount
                                        .followerDescriptor
                                }
                            </h2>
                        </span>
                    </div>
                    <div className="status-wrapper">
                        {content.userInfo.status.map((statuses) => (
                            <div key={statuses.delimiter} className="status">
                                <a className="kind">{statuses.value}</a>
                                <div className="kind-icon">
                                    {statuses.icon({})}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="badges">
                    <h2 className="badges-header">
                        {content.userInfo.badges.descriptor}
                    </h2>
                    <div className="badge-wrapper">
                        {content.userInfo.badges.badge.map((metal) => (
                            <div key={metal.label} className="tier">
                                <span className="badge-icon">
                                    {metal.icon({})}
                                </span>
                                <span className="badge-identity">
                                    {metal.state}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="profile-user-socials-section">
                    <h2 className="profile-user-socials-header">
                        content.userInfo.socialsHeader
                    </h2>
                    <div className="profile-user-socials-container">
                        {content.userInfo.socialLinks.map((social) => (
                            <span
                                key={social.name}
                                className="profile-user-socials-icon-container "
                            >
                                {social.icon({})}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="profile-user-bookmarks-section">
                    <div className="bookmark-container">
                        <div className="bookmark-header-wrap">
                            <h2 className="profile-user-bookmarks-header">
                                {content.bookmarkHeader}
                            </h2>
                        </div>
                        <div className="profile-user-favorite-nft-container">
                            <div className="favorite-wrap">
                                {content.bookmarked.map((bookmark) => (
                                    <div
                                        key={bookmark.title}
                                        className="favorites"
                                    >
                                        <Image
                                            src={bookmark.imageUrl}
                                            alt={bookmark.description}
                                            height={70}
                                            width={103}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;
