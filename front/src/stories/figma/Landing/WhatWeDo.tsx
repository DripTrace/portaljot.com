import * as React from "react";

interface FeatureCardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    imageSrc,
    title,
    description,
}) => (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow py-10 rounded-xl max-md:mt-10">
            <img src={imageSrc} alt="" className="w-14 aspect-square" />
            <h3 className="mt-6 text-2xl font-semibold leading-9 text-white uppercase">
                {title}
            </h3>
            <p className="mt-1 text-xl leading-7 text-zinc-400">
                {description}
            </p>
        </div>
    </div>
);

const featureData = [
    {
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/d58b7f19e86b2c0c363c9fea817051ea2091892beab0edd751a3130a6d939ea3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "NFTs Enthusiast",
        description:
            "With our app, you can easily easily complete the loan application process at home.",
    },
    {
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/6799cd9dc0ccc558348b1c4c9be45533a72d5e206a3089d01724529e1ec0bac7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "WALLETS",
        description:
            "With our app, you can easily easily complete the loan application process at home.",
    },
    {
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/e86bb7ca07a29ea7b53e730851edc15ac73b8efa52822eea9f0631bc75370771?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "OVATION",
        description:
            "With our app, you can easily easily complete the loan application process at home.",
    },
];

function WhatWeDo() {
    return (
        <div className="flex justify-center items-center px-16 py-20 bg-zinc-950 max-md:px-5">
            <div className="flex flex-col mt-16 w-full max-w-[1226px] max-md:mt-10 max-md:max-w-full">
                <h1 className="text-5xl font-bold tracking-tighter text-center text-gray-200 uppercase leading-[78px] max-md:max-w-full max-md:text-4xl">
                    Ovation makes web3 easier.
                </h1>
                <p className="self-center mt-2 text-2xl font-medium tracking-tighter leading-9 text-center text-zinc-500 w-[919px] max-md:max-w-full">
                    Artists, projects, and enthusiasts can effortlessly and
                    impactfully showcase their NFTs, contributions, and
                    notoriety
                </p>
                <div className="mt-16 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        {featureData.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>
                <section className="p-10 mt-28 bg-lime-300 rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow justify-center max-md:mt-10 max-md:max-w-full">
                                <h2 className="text-3xl font-bold leading-10 text-zinc-950 max-md:max-w-full">
                                    THE NFT SOCIAL MEDIA PLATFORM
                                </h2>
                                <p className="mt-2 text-2xl font-medium leading-8 text-neutral-500 max-md:max-w-full">
                                    Ovation is a web3 social platform that
                                    brings intelligent profiles, personalized
                                    portfolios, and a blockchain-enabled UI to a
                                    unified NFT social experience.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[38%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col justify-center items-end self-stretch px-16 my-auto text-lg font-medium leading-4 text-lime-300 max-md:mt-10">
                                <div className="flex flex-col justify-center max-w-full bg-red-600 rounded-[50px] w-[197px]">
                                    <button className="justify-center px-6 py-4 rounded-md shadow-2xl bg-zinc-950 max-md:px-5">
                                        See how it works
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default WhatWeDo;
