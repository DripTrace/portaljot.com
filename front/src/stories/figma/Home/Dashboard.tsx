import * as React from "react";
import { useState } from "react";
import Image from "next/image";

const ProfileCard: React.FC<ProfileProps> = ({
    imgSrc,
    altText,
    username,
    handle,
    followStatus,
    nftCount,
    ovaTokens,
    archTokens,
    badges,
    bio,
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget.innerText);
    };

    return (
        <section className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow mt-9 max-md:mt-10">
                <div className="flex gap-3 justify-between py-1 pr-5 w-full whitespace-nowrap max-md:pr-5">
                    <div className="flex gap-2.5">
                        <Image
                            loading="lazy"
                            src={imgSrc}
                            alt={altText}
                            width={60}
                            height={60}
                            className="shrink-0 rounded-full transition-transform transform hover:scale-105"
                        />
                        <div className="flex flex-col my-auto">
                            <div className="text-2xl font-semibold text-white">
                                {username}
                            </div>
                            <div className="flex gap-1 justify-between pr-2.5 mt-1 text-xs tracking-normal text-zinc-400">
                                <div>@{handle}</div>
                                <Image
                                    loading="lazy"
                                    src="/ext_4-"
                                    alt=""
                                    width={11}
                                    height={11}
                                    className="shrink-0 my-auto"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="justify-center px-2 py-1.5 my-auto text-xs font-medium leading-loose bg-lime-300 rounded text-zinc-950 transition-opacity hover:opacity-75"
                        tabIndex={0}
                        onClick={handleClick}
                    >
                        {followStatus}
                    </button>
                </div>
                <hr className="shrink-0 mt-4 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
                <p className="mt-4 text-sm tracking-normal text-zinc-400">
                    {bio}
                </p>
                <hr className="shrink-0 mt-4 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
                <div className="flex gap-2 justify-between pr-5 mt-4 text-xs text-black max-md:pr-5">
                    <div className="justify-center px-2.5 py-1 border border-solid bg-neutral-100 border-black border-opacity-10 rounded-[44.113px]">
                        NFT count: {nftCount}
                    </div>
                    <div className="justify-center px-2.5 py-1 border border-solid bg-neutral-100 border-black border-opacity-10 rounded-[44.113px]">
                        OVA TOKEN: {ovaTokens}
                    </div>
                    <div className="justify-center px-2.5 py-1 border border-solid bg-neutral-100 border-black border-opacity-10 rounded-[44.113px]">
                        Arch Tokens: {archTokens}
                    </div>
                    <div className="justify-center px-2.5 py-1 border border-solid bg-neutral-100 border-black border-opacity-10 rounded-[44.113px]">
                        Badges: {badges}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeaturedCard: React.FC = () => {
    return (
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center w-full bg-white rounded-3xl max-md:mt-10 max-md:max-w-full">
                <Image
                    loading="lazy"
                    src="/ext_5-"
                    alt="Featured Content"
                    width={100}
                    height={100}
                    className="w-full aspect-[1.75] transition-transform transform hover:scale-105"
                />
            </div>
        </div>
    );
};

const profiles: ProfileProps[] = [
    {
        imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/31d0a05d0115fb1a46097ae5a38a58d41fddad7b73ef6ce8c23dcf949f52b37f?apiKey=305a6c025418439087e8bfc27b932f06&",
        altText: "Profile Image",
        username: "username.eth",
        handle: "username",
        followStatus: "FOLLOW",
        nftCount: 11,
        ovaTokens: 10,
        archTokens: 11,
        badges: 3,
        bio: "Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem. #NFTCommunity",
    },
    {
        imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/31d0a05d0115fb1a46097ae5a38a58d41fddad7b73ef6ce8c23dcf949f52b37f?apiKey=305a6c025418439087e8bfc27b932f06&",
        altText: "Profile Image",
        username: "username.eth",
        handle: "username",
        followStatus: "FOLLOW",
        nftCount: 11,
        ovaTokens: 10,
        archTokens: 11,
        badges: 3,
        bio: "Passionate NFT holder exploring the future of digital ownership. Join me in discovering the limitless possibilities of the NFT ecosystem.",
    },
];

export interface ProfileProps {
    imgSrc: string;
    altText: string;
    username: string;
    handle: string;
    followStatus: string;
    nftCount: number;
    ovaTokens: number;
    archTokens: number;
    badges: number;
    bio: string;
}

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col px-7 pt-7 rounded-2xl border-2 border-solid border-white border-opacity-10 max-w-[924px] max-md:px-5">
            <header className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                <h1 className="my-auto text-base font-medium text-white uppercase">
                    Featured
                </h1>
                <button
                    className="justify-center px-4 py-3 text-xs font-semibold border border-solid bg-neutral-100 border-neutral-200 rounded-[400.862px] text-zinc-950 transition-opacity hover:opacity-75"
                    tabIndex={0}
                    onClick={() => console.log("View all clicked")}
                >
                    View all
                </button>
            </header>
            <main className="mt-10 max-md:mt-10 max-md:max-w-full">
                <section className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <FeaturedCard />
                    <div className="flex flex-col w-full">
                        {profiles.map((profile, idx) => (
                            <ProfileCard key={idx} {...profile} />
                        ))}
                    </div>
                </section>
            </main>
            <section className="mt-10 overflow-auto max-h-96">
                <div className="grid grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="aspect-w-1 aspect-h-1">
                            <Image
                                src="/path-to-nft-image.jpg"
                                alt={`NFT ${idx + 1}`}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover transition-transform transform hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
