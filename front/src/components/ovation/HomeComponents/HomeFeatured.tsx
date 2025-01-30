"use client";

import { HomeInfo } from "@/lib/utils/constants";
import Image from "next/image";
import Link from "next/link";
import ViewAll from "../Buttons/ViewAll";
// import ViewAll from "@/components/ViewAll";

const HomeFeatured = () => {
    const { navigation, introduction, content } = HomeInfo;
    return (
        <div>
            <div className="featured-container">
                <div className="flex mx-4 mt-4 items-center">
                    <div className="text-lg font-medium">
                        {content.featured.name}
                    </div>
                    <div className="flex justify-end flex-grow">
                        <Link href="/">
                            <ViewAll />
                        </Link>
                    </div>
                </div>
                <div className="flex">
                    <div className="feat-img-container">
                        <img
                            src={content.featured.featimg.source}
                            className="feat-img"
                            alt="Descriptive Alt Text"
                        />
                    </div>
                    <div className="flex-col relative w-full mt-4">
                        <div className="flex border-b border-neutral-800 w-kindafull items-center mt-4 py-4">
                            <div className="">
                                <Image
                                    src={
                                        content.featured.featprofile.pfp.source
                                    }
                                    height={
                                        content.featured.featprofile.pfp
                                            .dimensions.height
                                    }
                                    width={
                                        content.featured.featprofile.pfp
                                            .dimensions.width
                                    }
                                    alt={
                                        content.featured.featprofile.pfp
                                            .alternative
                                    }
                                    className="feat-pfp"
                                />
                            </div>
                            <div className="flex-col">
                                <div className="text-2xl ml-2 font-medium">
                                    {content.featured.featprofile.name}
                                </div>
                                <div className="text-sm ml-2 text-neutral-400">
                                    <Link
                                        href={content.featured.featprofile.path}
                                    >
                                        {content.featured.featprofile.user}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-end flex-grow">
                                <div className="">
                                    <button className="px-2 py-1 bg-lime-green text-neutral-900 rounded text-sm font-semibold hover:bg-lime-green/20 hover:text-lime-green transition duration-100">
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-neutral-800 text-neutral-400 relative w-kindafull p-2">
                            {content.featured.featprofile.bio}
                        </div>
                        <div className="flex w-kindafull mt-4 justify-center">
                            <div className="feat-badges">
                                NFT Count:{" "}
                                {content.featured.featprofile.nftcount}
                            </div>
                            <div className="feat-badges">
                                $OVA Tokens: {content.featured.featprofile.$OVA}
                            </div>
                            <div className="feat-badges">
                                Arch Tokens: {content.featured.featprofile.arch}
                            </div>
                            <div className="feat-badges">
                                Badges: {content.featured.featprofile.badges}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeFeatured;
