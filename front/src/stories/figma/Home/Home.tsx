import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import "@/src/styles/globals.css";

interface ProfileImageProps {
    src: string;
    alt: string;
    className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, className }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={src}
                alt={alt}
                width={50}
                height={50}
                className={`shrink-0 border-4 border-black border-solid aspect-square  stroke-[3.704px] stroke-black w-[50px] ${className} ${
                    isHovered ? "scale-105" : "scale-100"
                } transition-transform duration-300 ease-in-out`}
            />
        </div>
    );
};

// const idk = "fill-[url('/me.jpeg')_lightgray_50%_/_cover_no-repeat]";

interface ViewCountProps {
    count: number;
}

const ViewCount: React.FC<ViewCountProps> = ({ count }) => (
    <div className="justify-center px-2 py-1.5 my-auto text-xs text-black bg-lime-300 rounded-[50px]">
        {count} Views
    </div>
);

interface ProfileInfoProps {
    username: string;
    viewCount: number;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ username, viewCount }) => (
    <div className="flex flex-col justify-center p-4 mt-4 w-full rounded-2xl border border-solid bg-zinc-900 border-neutral-700 border-opacity-50">
        <div className="flex gap-1.5 justify-between px-0.5 w-full">
            <div className="flex gap-1.5 whitespace-nowrap">
                <ProfileImage
                    src={`http://b.io/ext_29-`}
                    alt={`${username}'s profile`}
                />
                <div className="flex flex-col self-start">
                    <div className="text-xl font-semibold text-white">
                        {username}
                    </div>
                    <div className="flex gap-1 justify-center pr-1.5 mt-1.5 text-sm tracking-normal text-zinc-500">
                        <div>@{username.split(".")[0]}</div>
                        <Image
                            src="http://b.io/ext_30-"
                            alt=""
                            width={13}
                            height={13}
                            className="shrink-0 my-auto aspect-square w-[13px]"
                        />
                    </div>
                </div>
            </div>
            <ViewCount count={viewCount} />
        </div>
    </div>
);

const profiles = [
    { username: "username1.eth", viewCount: 32 },
    { username: "username2.eth", viewCount: 32 },
    { username: "username3.eth", viewCount: 32 },
    { username: "username4.eth", viewCount: 32 },
    { username: "username5.eth", viewCount: 32 },
];

function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleButtonClick = () => {
        console.log("Button clicked");
    };

    return (
        <div className="border-l border-solid bg-neutral-900 border-zinc-950 border-opacity-10">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <nav className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow px-6 pt-8 pb-20 mx-auto w-full border-r border-solid bg-neutral-900 border-white border-opacity-10 max-md:px-5">
                        <Image
                            src="http://b.io/ext_31-"
                            alt=""
                            width={214}
                            height={41}
                            className="self-center max-w-full aspect-[5.26] w-[214px]"
                        />
                        <div className="flex flex-col justify-center items-start px-8 py-4 mt-14 w-full text-lg font-medium capitalize whitespace-nowrap bg-white rounded-[50px] text-neutral-900 max-md:px-5 max-md:mt-10">
                            <div className="flex gap-3.5 justify-center">
                                <Image
                                    src="http://b.io/ext_32-"
                                    alt=""
                                    width={22}
                                    height={22}
                                    className="shrink-0 aspect-square w-[22px]"
                                />
                                <div>Home</div>
                            </div>
                        </div>
                        <div
                            className={`flex flex-col justify-center items-start px-8 py-5 mt-5 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:px-5 ${
                                isMenuOpen ? "max-h-[200px]" : "max-h-0"
                            } overflow-hidden transition-all duration-300`}
                        >
                            <div className="flex gap-3.5 justify-center">
                                <Image
                                    src="http://b.io/ext_33-"
                                    alt=""
                                    width={22}
                                    height={22}
                                    className="shrink-0 my-auto aspect-square w-[22px]"
                                />
                                <div>Discover</div>
                            </div>
                        </div>
                        <div
                            className="flex gap-3.5 justify-center self-start mt-9 ml-8 text-lg tracking-normal leading-7 whitespace-nowrap text-zinc-400 max-md:ml-2.5 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Image
                                src="http://b.io/ext_34-"
                                alt=""
                                width={22}
                                height={22}
                                className="shrink-0 my-auto aspect-square w-[22px]"
                            />
                            <div>Profile</div>
                        </div>
                        <div className="flex gap-2.5 justify-between mt-[971px] max-md:mt-10">
                            <Image
                                src="http://b.io/ext_35-"
                                alt=""
                                width={60}
                                height={60}
                                className="shrink-0 aspect-square w-[60px]"
                            />
                            <div className="flex flex-col justify-center my-auto">
                                <div className="text-lg font-semibold leading-5 text-white">
                                    0xrxc.....d67579
                                </div>
                                <div className="flex gap-1 pr-3.5 mt-2 text-sm font-medium leading-5 text-zinc-400">
                                    <div>2,000 &OVA</div>
                                    <Image
                                        src="http://b.io/ext_36-"
                                        alt=""
                                        width={14}
                                        height={14}
                                        className="shrink-0 my-auto w-3.5 aspect-square"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:max-w-full">
                        <header className="flex gap-5 justify-end items-start p-7 w-full border-l border-solid bg-neutral-900 border-white border-opacity-10 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                            <div className="flex gap-2.5 text-2xl font-medium capitalize text-white text-opacity-80">
                                <Image
                                    src="http://b.io/ext_37-"
                                    alt=""
                                    width={39}
                                    height={40}
                                    className="shrink-0 aspect-[0.97] w-[39px]"
                                />
                                <div className="flex-auto my-auto">
                                    Good morning, John
                                </div>
                            </div>
                            <div className="flex gap-2.5 justify-between">
                                <div className="flex flex-col justify-center">
                                    <div className="text-sm font-semibold tracking-normal leading-5 text-stone-300">
                                        {" "}
                                        0xrxc.....d67579
                                    </div>
                                    <div className="flex gap-1 self-end mt-1 text-xs font-medium leading-4 text-lime-300">
                                        <Image
                                            src="http://b.io/ext_38-"
                                            alt=""
                                            width={11}
                                            height={10}
                                            className="shrink-0 my-auto aspect-[1.1] w-[11px]"
                                        />
                                        <div>2,000 &OVA</div>
                                    </div>
                                </div>
                                <Image
                                    src="http://b.io/ext_39-"
                                    alt=""
                                    width={37}
                                    height={37}
                                    className="shrink-0 self-start aspect-square w-[37px]"
                                />
                            </div>
                        </header>
                        <section className="flex flex-col justify-center text-base bg-white text-zinc-500 max-md:max-w-full">
                            <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 w-full min-h-[395px] max-md:px-5 max-md:max-w-full">
                                <Image
                                    src="http://b.io/ext_40-"
                                    alt=""
                                    fill
                                    className="object-cover absolute inset-0 size-full"
                                />
                                <form className="flex relative gap-3.5 px-5 py-5 mt-20 mb-14 bg-white rounded-xl border border-solid border-stone-300 max-md:flex-wrap max-md:my-10">
                                    <Image
                                        src="http://b.io/ext_41-"
                                        alt=""
                                        width={27}
                                        height={26}
                                        className="shrink-0 aspect-[1.04] w-[27px]"
                                    />
                                    <label htmlFor="search" className="sr-only">
                                        Search assets
                                    </label>
                                    <input
                                        type="text"
                                        id="search"
                                        placeholder="Search assets"
                                        className="flex-auto my-auto max-md:max-w-full"
                                    />
                                </form>
                            </div>
                        </section>
                        <div className="justify-between mx-6 mt-7 max-md:mr-2.5 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                <section className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
                                    <div className="flex flex-col grow py-0.5 max-md:mt-5 max-md:max-w-full">
                                        <div className="flex flex-col px-7 pt-7 pb-16 rounded-2xl border-2 border-solid border-white border-opacity-10 max-md:px-5 max-md:max-w-full">
                                            <div className="flex gap-5 justify-between pr-3.5 max-md:flex-wrap max-md:max-w-full">
                                                <div className="my-auto text-base font-medium text-white uppercase">
                                                    Featured
                                                </div>
                                                <button
                                                    className="justify-center px-4 py-3 text-xs font-semibold border border-solid bg-neutral-100 border-neutral-200 rounded-[400.862px] text-zinc-950 opacity-100 hover:opacity-80 transition-opacity duration-200"
                                                    onClick={handleButtonClick}
                                                >
                                                    View all
                                                </button>
                                            </div>
                                            <div className="mt-10 max-md:mt-10 max-md:max-w-full">
                                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                                                        <div className="flex flex-col grow justify-center w-full bg-white rounded-3xl max-md:mt-10 max-md:max-w-full">
                                                            <Image
                                                                src="http://b.io/ext_42-"
                                                                alt=""
                                                                width={1000}
                                                                height={649}
                                                                className="w-full aspect-[1.54]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                                        <div className="flex flex-col self-stretch my-auto max-md:mt-10">
                                                            <div className="flex gap-3 justify-between py-1 pr-6 w-full whitespace-nowrap max-md:pr-5">
                                                                <div className="flex gap-2.5">
                                                                    <Image
                                                                        src="http://b.io/ext_43-"
                                                                        alt=""
                                                                        width={
                                                                            60
                                                                        }
                                                                        height={
                                                                            60
                                                                        }
                                                                        className="shrink-0 aspect-square w-[60px]"
                                                                    />
                                                                    <div className="flex flex-col my-auto">
                                                                        <div className="text-2xl font-semibold text-white">
                                                                            username.eth
                                                                        </div>
                                                                        <div className="flex gap-1 justify-between pr-2.5 mt-1 text-xs tracking-normal text-zinc-400">
                                                                            <div>
                                                                                @username
                                                                            </div>
                                                                            <Image
                                                                                src="http://b.io/ext_44-"
                                                                                alt=""
                                                                                width={
                                                                                    11
                                                                                }
                                                                                height={
                                                                                    11
                                                                                }
                                                                                className="shrink-0 my-auto aspect-square w-[11px]"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    className="justify-center px-2 py-1.5 my-auto text-xs font-medium leading-loose bg-lime-300 rounded-[500px] text-zinc-950 opacity-100 hover:opacity-80 transition-opacity duration-200"
                                                                    onClick={
                                                                        handleButtonClick
                                                                    }
                                                                >
                                                                    FOLLOW
                                                                </button>
                                                            </div>
                                                            <hr className="shrink-0 mt-4 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
                                                            <p className="mt-4 text-sm tracking-normal text-zinc-400">
                                                                Passionate NFT
                                                                holder exploring
                                                                the future of
                                                                digital
                                                                ownership. Join
                                                                me in
                                                                discovering the
                                                                limitless
                                                                possibilities of
                                                                the NFT
                                                                ecosystem.
                                                                #NFTCommunity{" "}
                                                            </p>
                                                            <hr className="shrink-0 mt-4 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
                                                            <div className="flex gap-2 justify-between pr-6 mt-4 text-xs text-white max-md:pr-5">
                                                                <div className="justify-center px-2.5 py-1 border border-solid bg-zinc-900 border-neutral-700 rounded-[44.113px]">
                                                                    NFT count:
                                                                    11
                                                                </div>
                                                                <div className="justify-center px-2.5 py-1 border border-solid bg-zinc-900 border-neutral-700 rounded-[44.113px]">
                                                                    OVA TOKEN:
                                                                    10
                                                                </div>
                                                                <div className="justify-center px-2.5 py-1 border border-solid bg-zinc-900 border-neutral-700 rounded-[44.113px]">
                                                                    Arch Tokens:
                                                                    11
                                                                </div>
                                                                <div className="justify-center px-2.5 py-1 border border-solid bg-zinc-900 border-neutral-700 rounded-[44.113px]">
                                                                    Badges: 3
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
                                    <div className="flex flex-col grow px-5 py-7 mt-1 rounded-xl border-2 border-solid border-white border-opacity-10 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                                        <div className="flex gap-5 justify-between px-0.5">
                                            <div className="my-auto text-base font-medium text-white uppercase">
                                                Most viewed
                                            </div>
                                            <button
                                                className="justify-center px-4 py-3 text-xs font-semibold border border-solid bg-neutral-100 border-neutral-200 rounded-[400.862px] text-zinc-950 opacity-100 hover:opacity-80 transition-opacity duration-200"
                                                onClick={handleButtonClick}
                                            >
                                                View all
                                            </button>
                                        </div>
                                        <div className="flex flex-col px-4 py-4 mt-10 w-full rounded-2xl border border-solid bg-zinc-900 border-neutral-700 border-opacity-50 max-md:mt-10">
                                            <div className="flex gap-2.5 px-0.5">
                                                <Image
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f740889733b87967994a954bd4816bd01a6d9accd273a4789ef06f32f7a81de?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                    alt=""
                                                    width={70}
                                                    height={101}
                                                    className="shrink-0 aspect-[0.69] w-[70px]"
                                                />
                                                <Image
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/abac7d7b-491b-47eb-bb76-b9237bedd691?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                    alt=""
                                                    width={1000}
                                                    height={649}
                                                    className="flex-1 shrink-0 self-start w-full aspect-[1.54]"
                                                />
                                                <Image
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5541c65cf2ff4571ecad908ec624b731990f5b8349a9af80e582788e5562867c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                    alt=""
                                                    width={76}
                                                    height={101}
                                                    className="shrink-0 aspect-[0.75] w-[76px]"
                                                />
                                            </div>
                                            <div className="flex gap-1.5 justify-between px-0.5 mt-10 max-md:mt-10">
                                                <div className="flex flex-col whitespace-nowrap">
                                                    <div className="text-xl font-semibold text-white">
                                                        username.eth
                                                    </div>
                                                    <div className="flex gap-1 justify-center pr-1.5 mt-1.5 text-sm tracking-normal text-zinc-400">
                                                        <div>@username</div>
                                                        <Image
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f52112db5261f1cb33ec6e1e758b7812b1f00e0d050a3d552affa3982b24c541?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                                                            alt=""
                                                            width={13}
                                                            height={13}
                                                            className="shrink-0 my-auto aspect-square w-[13px]"
                                                        />
                                                    </div>
                                                </div>
                                                <ViewCount count={32} />
                                            </div>
                                            <hr className="shrink-0 mt-3 h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10" />
                                            <p className="mt-3 text-sm tracking-normal text-zinc-400">
                                                Dedicated NFT enthusiast,
                                                embracing the digital revolution
                                                one token at a time. Let's
                                                explore the world of blockchain
                                                art together! 🌐🎨 #NFTCommunity
                                            </p>
                                        </div>
                                        {profiles.map((profile, index) => (
                                            <ProfileInfo
                                                key={index}
                                                username={profile.username}
                                                viewCount={profile.viewCount}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
