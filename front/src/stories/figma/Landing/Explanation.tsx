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
}) => {
    return (
        <div className="flex flex-col grow self-stretch px-7 py-16 rounded-3xl border border-solid border-white border-opacity-20 max-md:px-5 max-md:mt-6 max-md:max-w-full">
            <img
                src={imageSrc}
                alt={title}
                className="self-center max-w-full aspect-[1.14] w-[386px]"
            />
            <h3 className="mt-16 text-3xl font-bold leading-10 text-gray-200 uppercase max-md:mt-10 max-md:max-w-full">
                {title}
            </h3>
            <p className="mt-3 text-2xl font-medium leading-8 text-neutral-400 max-md:max-w-full">
                {description}
            </p>
        </div>
    );
};

const featureData = [
    {
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/514dbcbafe2bffde735e826d48a2d27787753b99b7fd5289692fe4bfde173735?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "SOCIAL MEDIA",
        description:
            "On the timeline, users will be enabled to have more meaningful interactions due to real-time data, the ability to create unique posts, recognize post contributions, and filtering.",
    },
    {
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/a3d8056dceb6f61e76a4f216c5f9fbe3be8c9f42ca4a6d3984d15b28314b1377?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "Intelligent Profile & Personalized Portfolio",
        description:
            "Through blockchain interoperability, and an NFT centric UI/UX, users have one pane into their NFT portfolio, notoriety, and social notoriety.",
    },
    {
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/97b6da279b323dcbf4023a38fe0a261a24be921adb462e229c98f860596d7d14?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "EARN $OVA",
        description:
            "Earn $OVA tokens in a variety of ways: Sharing NFTs, Earning badges, Drawing engagement, Interacting on the platform, Owning a Genesis NFT",
    },
    {
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/b62a02127f6d48288e63a6447359f38cdfbfb053641441a88e27d35c558d418c?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "DISCOVER COLLECTIONS",
        description:
            "Discover NFT collections on multiple blockchains by genre, ranking, trending, and other metrics. Users are recommended collections based upon their interests and NFT portfolio.",
    },
];

const Explanation: React.FC = () => {
    return (
        <main className="flex justify-center items-center px-16 pt-20 bg-zinc-950 max-md:px-5">
            <div className="flex flex-col mt-16 w-full max-w-[1226px] max-md:mt-10 max-md:max-w-full">
                <div className="max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        {featureData.slice(0, 2).map((feature, index) => (
                            <div
                                key={index}
                                className={`flex flex-col w-6/12 max-md:ml-0 max-md:w-full ${index === 1 ? "ml-5" : ""}`}
                            >
                                <FeatureCard {...feature} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-14 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        {featureData.slice(2).map((feature, index) => (
                            <div
                                key={index}
                                className={`flex flex-col w-6/12 max-md:ml-0 max-md:w-full ${index === 1 ? "ml-5" : ""}`}
                            >
                                <FeatureCard {...feature} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Explanation;
