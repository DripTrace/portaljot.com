"use client";

// import ViewAll from "@/components/ViewAll";
import { HomeInfo } from "@/lib/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ViewAll from "../Buttons/ViewAll";

type SectionType = "section1" | "section2" | "section3";

const HomeTopBadgedHolder = () => {
    const { content } = HomeInfo;
    const [activeSection, setActiveSection] = useState<SectionType>("section1");

    const handleSectionClick = (section: SectionType) => {
        setActiveSection(section);
    };

    const sections = ["section1", "section2", "section3"];

    return (
        <div>
            <div className="tbh-container">
                <div className="flex mx-4 my-4 items-center">
                    <div className="text-lg font-medium">
                        {content.topbadge.name}
                    </div>
                    <div className="flex justify-end flex-grow">
                        <Link href="/">
                            <ViewAll />
                        </Link>
                    </div>
                </div>
                <div className="ml-4">
                    {sections.map((section) => (
                        <button
                            key={section}
                            onClick={() =>
                                handleSectionClick(section as SectionType)
                            }
                            className={`section-button ${activeSection === section ? "bg-white/20 text-white" : ""}`}
                        >
                            {/*@ts-nocheck*/}
                            {/*@ts-ignore*/}
                            {content.topbadge[section].name}
                        </button>
                    ))}
                </div>
                <div className="w-kindafull mt-4 flex-col">
                    <div className="h-[334px]">
                        <Image
                            src={content.topbadge[activeSection].banner1.source}
                            height={
                                content.topbadge[activeSection].banner1
                                    .dimensions.height
                            }
                            width={
                                content.topbadge[activeSection].banner1
                                    .dimensions.width
                            }
                            alt={
                                content.topbadge[activeSection].banner1
                                    .alternative
                            }
                            className="top-banner1"
                        />
                        <div className="flex mt-4 py-4 items-center overlay-content">
                            <div className="mr-4 text-xl font-semibold">1</div>
                            <div className="">
                                <Image
                                    src={
                                        content.topbadge[activeSection].pfp1
                                            .source
                                    }
                                    height={
                                        content.topbadge[activeSection].pfp1
                                            .dimensions.height
                                    }
                                    width={
                                        content.topbadge[activeSection].pfp1
                                            .dimensions.width
                                    }
                                    alt={
                                        content.topbadge[activeSection].pfp1
                                            .alternative
                                    }
                                    className="feat-pfp"
                                />
                            </div>
                            <div className="flex-col">
                                <div className="text-2xl ml-2 font-medium">
                                    {content.topbadge[activeSection].name1}
                                </div>
                                <div className="text-sm ml-2 text-neutral-400">
                                    <Link
                                        href={
                                            content.topbadge[activeSection]
                                                .path1
                                        }
                                    >
                                        {content.topbadge[activeSection].user1}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-end flex-grow">
                                <div className="">
                                    <div className="px-2 py-1 bg-white text-neutral-900 rounded-full text-sm font-semibold">
                                        {
                                            content.topbadge[activeSection]
                                                .collectorcount1
                                        }{" "}
                                        Collectors
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-[336px] mt-6">
                        <div className="">
                            <Image
                                src={
                                    content.topbadge[activeSection].banner2
                                        .source
                                }
                                height={
                                    content.topbadge[activeSection].banner2
                                        .dimensions.height
                                }
                                width={
                                    content.topbadge[activeSection].banner2
                                        .dimensions.width
                                }
                                alt={
                                    content.topbadge[activeSection].banner2
                                        .alternative
                                }
                                className="top-banner2"
                            />
                            <div className="flex mt-4 py-4 items-center overlay-content">
                                <div className="mr-4 text-xl font-semibold">
                                    2
                                </div>
                                <div className="">
                                    <Image
                                        src={
                                            content.topbadge[activeSection].pfp2
                                                .source
                                        }
                                        height={
                                            content.topbadge[activeSection].pfp2
                                                .dimensions.height
                                        }
                                        width={
                                            content.topbadge[activeSection].pfp2
                                                .dimensions.width
                                        }
                                        alt={
                                            content.topbadge[activeSection].pfp2
                                                .alternative
                                        }
                                        className="feat-pfp"
                                    />
                                </div>
                                <div className="flex-col">
                                    <div className="text-2xl ml-2 font-medium">
                                        {content.topbadge[activeSection].name2}
                                    </div>
                                    <div className="text-sm ml-2 text-neutral-400">
                                        <Link
                                            href={
                                                content.topbadge[activeSection]
                                                    .path2
                                            }
                                        >
                                            {
                                                content.topbadge[activeSection]
                                                    .user2
                                            }
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-end flex-grow">
                                    <div className="">
                                        <div className="px-2 py-1 bg-white text-neutral-900 rounded-full text-sm font-semibold">
                                            {
                                                content.topbadge[activeSection]
                                                    .collectorcount2
                                            }{" "}
                                            Collectors
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-3">
                            <Image
                                src={
                                    content.topbadge[activeSection].banner3
                                        .source
                                }
                                height={
                                    content.topbadge[activeSection].banner3
                                        .dimensions.height
                                }
                                width={
                                    content.topbadge[activeSection].banner3
                                        .dimensions.width
                                }
                                alt={
                                    content.topbadge[activeSection].banner3
                                        .alternative
                                }
                                className="top-banner2"
                            />
                            <div className="flex mt-4 py-4 items-center overlay-content">
                                <div className="mr-4 text-xl font-semibold">
                                    3
                                </div>
                                <div className="">
                                    <Image
                                        src={
                                            content.topbadge[activeSection].pfp3
                                                .source
                                        }
                                        height={
                                            content.topbadge[activeSection].pfp3
                                                .dimensions.height
                                        }
                                        width={
                                            content.topbadge[activeSection].pfp3
                                                .dimensions.width
                                        }
                                        alt={
                                            content.topbadge[activeSection].pfp3
                                                .alternative
                                        }
                                        className="feat-pfp"
                                    />
                                </div>
                                <div className="flex-col">
                                    <div className="text-2xl ml-2 font-medium">
                                        {content.topbadge[activeSection].name3}
                                    </div>
                                    <div className="text-sm ml-2 text-neutral-400">
                                        <Link
                                            href={
                                                content.topbadge[activeSection]
                                                    .path3
                                            }
                                        >
                                            {
                                                content.topbadge[activeSection]
                                                    .user3
                                            }
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex justify-end flex-grow">
                                    <div className="">
                                        <div className="px-2 py-1 bg-white text-neutral-900 rounded-full text-sm font-semibold">
                                            {
                                                content.topbadge[activeSection]
                                                    .collectorcount3
                                            }{" "}
                                            Collectors
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" rounded-xl mt-4 bg-white/20 py-4 flex items-center">
                        <div className="px-3 text-xl font-semibold">4</div>
                        <div className="ml-1">
                            <Image
                                src={
                                    content.topbadge[activeSection].pfp4.source
                                }
                                height={
                                    content.topbadge[activeSection].pfp4
                                        .dimensions.height
                                }
                                width={
                                    content.topbadge[activeSection].pfp4
                                        .dimensions.width
                                }
                                alt={
                                    content.topbadge[activeSection].pfp4
                                        .alternative
                                }
                                className="feat-pfp"
                            />
                        </div>
                        <div className="flex-col">
                            <div className="text-2xl ml-2 font-medium">
                                {content.topbadge[activeSection].name4}
                            </div>
                            <div className="text-sm ml-2 text-neutral-400">
                                <Link
                                    href={content.topbadge[activeSection].path4}
                                >
                                    {content.topbadge[activeSection].user4}
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-end flex-grow">
                            <div className="">
                                <div className="mr-2 px-2 py-1 bg-white text-neutral-900 rounded-full text-sm font-semibold">
                                    {
                                        content.topbadge[activeSection]
                                            .collectorcount4
                                    }
                                    Collectors
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTopBadgedHolder;
