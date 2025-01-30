import * as React from "react";

interface HeroProps {
    title: string;
    description: string;
    ctaText: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, ctaText }) => {
    return (
        <section className="flex overflow-hidden relative flex-col items-center px-20 pt-20 w-full font-medium min-h-[529px] max-md:px-5 max-md:max-w-full">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/15833cedaebf3dd41b3d117f63a1b9e8d0e533e3da5a3ad6a237ffdb9b62b50d?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                alt=""
                className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative gap-3 justify-between px-4 py-2 mt-10 text-lg leading-7 text-lime-400 border border-solid border-neutral-500 rounded-[30px] max-md:flex-wrap">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/74fc0af8c268cf99982920f507b9946ed7e2382811dfba18fcf5bc9869f4d859?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt=""
                    className="shrink-0 self-start aspect-square w-[25px]"
                />
                <div className="max-md:max-w-full">
                    DISCOVER, SHARE, & EARN | PERSONALIZED NFT PORTFOLIO
                </div>
            </div>
            <h1 className="relative mt-6 text-6xl font-bold text-center text-gray-200 leading-[75px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
                {title}
            </h1>
            <p className="relative mt-2.5 text-2xl tracking-tighter leading-9 text-center text-zinc-400 w-[683px] max-md:max-w-full">
                {description}
            </p>
            <button className="relative z-10 justify-center items-start p-6 mt-12 -mb-8 max-w-full text-lg font-semibold leading-3 bg-lime-300 rounded-[50px] text-zinc-950 w-[165px] max-md:px-5 max-md:mt-10 max-md:mb-2.5">
                {ctaText}
            </button>
        </section>
    );
};

const MyComponent: React.FC = () => {
    return (
        <div className="flex flex-col">
            <Hero
                title="THE NFT SOCIAL MEDIA PLATFORM"
                description="Ovation is a web3 social platform that brings intelligent profiles, personalized portfolios, and a blockchain-enabled UI to a unified NFT social experience."
                ctaText="Launch app"
            />
            <div className="flex justify-center items-center self-center px-16 py-20 mt-44 w-full bg-neutral-800 max-w-[958px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/82e40cd63c7a5660d07b08d48118760bfa73035d7764655caf398174a7965246?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt=""
                    className="mt-14 mb-7 max-w-full aspect-square w-[150px] max-md:mt-10"
                />
            </div>
        </div>
    );
};

export default MyComponent;
