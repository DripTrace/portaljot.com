import * as React from "react";

interface CardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({
    imageSrc,
    imageAlt,
    title,
    description,
}) => {
    return (
        <div className="flex flex-col grow justify-center max-md:mt-4">
            <div className="flex flex-col items-center px-5 py-14 border border-solid border-neutral-700">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="aspect-square w-[38px]"
                />
                <h3 className="mt-5 text-sm font-semibold leading-5 text-white">
                    {title}
                </h3>
                <p className="self-stretch mt-1.5 text-xs leading-4 text-center text-zinc-400">
                    {description}
                </p>
            </div>
        </div>
    );
};

const ConnectWallet: React.FC = () => {
    const cardData = [
        {
            imageSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/c35459868c36c79669c34e301bae7115c8102742e3f2e6ff2df9c841e392e5a7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
            imageAlt: "Artist icon",
            title: "ARTIST",
            description:
                "Ovation elevates the experience of artists, enhancing their visibility and reputation...",
        },
        {
            imageSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/abafb5b1831d8359daa4efc704f69bab58f9af4b356913248f702a175e8f8b3e?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
            imageAlt: "Enthusiast icon",
            title: "ENTHUSIAST",
            description:
                "Ovation allows enthusiasts to connect with their favourite creators and communities...",
        },
        {
            imageSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/b9ea33968c32bb64b75332f727bbf18c669d2013a4b2b526e3d4da1619875b9c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
            imageAlt: "Project icon",
            title: "PROJECT",
            description:
                "Ovation elevates the experience of artists, enhancing their visibility and reputation...",
        },
        {
            imageSrc:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/76ceb77beaa4abf998293f297020fa710f7d3a31ac48a86d7ba77384925510c2?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
            imageAlt: "Trader icon",
            title: "TRADER",
            description:
                "Ovation allows traders to track, trade, and barter NFTs. Traders can explore...",
        },
    ];

    return (
        <div className="flex flex-col max-w-[500px]">
            <header className="flex gap-1 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col px-5">
                    <h1 className="text-3xl font-semibold tracking-normal leading-7 text-white">
                        Create Account
                    </h1>
                    <div className="flex gap-2 mt-1 text-sm leading-5 text-neutral-200">
                        <span>Personal info</span>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa8b98a66d10c8870f7bd50facfab77ab675834d652a04546ba48c33279e89b4?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt=""
                            className="shrink-0 my-auto w-1 border-2 border-lime-300 border-solid aspect-[0.67] stroke-[1.5px] stroke-lime-300"
                        />
                        <span>Choose path</span>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7eb6be2add2fd5bbb6f5d1d10cfcd7359f5e4688b9025ecc53505002effa2f43?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                            alt=""
                            className="shrink-0 my-auto border-2 border-lime-300 border-solid aspect-[0.5] stroke-[1.5px] stroke-lime-300 w-[3px]"
                        />
                        <span className="text-zinc-500">Connect wallet</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center self-start text-xs font-semibold text-center text-white whitespace-nowrap rounded-lg">
                    <button className="justify-center px-8 py-5 rounded bg-neutral-800 max-md:px-5">
                        Skip
                    </button>
                </div>
            </header>
            <main className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                        <Card {...cardData[0]} />
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        <Card {...cardData[1]} />
                    </div>
                </div>
                <div className="mt-4 w-full max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <Card {...cardData[2]} />
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <Card {...cardData[3]} />
                        </div>
                    </div>
                </div>
                <button className="justify-center items-center px-16 py-6 mt-11 w-full text-xs font-semibold text-center whitespace-nowrap bg-lime-300 rounded text-zinc-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                    Next
                </button>
            </main>
        </div>
    );
};

export default ConnectWallet;
