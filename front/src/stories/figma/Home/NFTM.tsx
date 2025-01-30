import * as React from "react";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
    <img loading="lazy" src={src} alt={alt} className={className} />
);

interface TextProps {
    title: string;
    description: string;
}

const TextContent: React.FC<TextProps> = ({ title, description }) => (
    <div className="flex flex-col justify-center max-md:max-w-full">
        <h2 className="text-3xl font-semibold tracking-normal leading-7 text-white max-md:max-w-full">
            {title}
        </h2>
        <p className="mt-3 text-xl tracking-normal leading-8 text-neutral-400 max-md:max-w-full">
            {description}
        </p>
    </div>
);

interface ButtonProps {
    text: string;
    icon?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, icon, className }) => (
    <div
        className={`flex flex-1 justify-center items-center p-6 rounded-[50px] max-md:px-5 ${className}`}
    >
        <div className="flex gap-2.5 justify-center">
            <span className="my-auto">{text}</span>
            {icon && (
                <Image
                    src={icon}
                    alt=""
                    className="shrink-0 aspect-square w-[18px]"
                />
            )}
        </div>
    </div>
);

function NFTM() {
    const data = {
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6dfd21b960a18d985dcfa2d5b3c69fa26e52b6c70b3058a4ce83b5ed0a18697b?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/090f256e2326a4f8b85c1754998f24d38fcda6540283070d1385fe26e1ba8c02?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        title: "Bored Ape",
        description:
            "Bored Ape Yacht Club, often colloquially called Bored Apes or Bored Ape is a non-fungible token collection built on the Ethereum blockchain with the ERC-721 standard",
        buttons: [
            {
                text: "Hide",
                icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b23052df7c239179a7cc5fe98be78ca966f7163e0166dad051dffd923bb15905?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
                className:
                    "text-white border-2 border-solid bg-neutral-700 border-zinc-800",
            },
            {
                text: "Send",
                className: "bg-lime-300 text-zinc-950",
            },
        ],
    };

    return (
        <div className="flex justify-center items-center px-16 py-20 bg-black bg-opacity-80 max-md:px-5">
            <div className="flex flex-col items-center py-11 mt-48 max-w-full bg-neutral-800 rounded-[30px] w-[737px] max-md:mt-10">
                <Image
                    src={data.image}
                    alt="Bored Ape"
                    className="max-w-full aspect-[1.23] w-[664px]"
                />
                <div className="flex gap-5 justify-between self-stretch px-9 mt-11 bg-neutral-800 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
                    <TextContent
                        title={data.title}
                        description={data.description}
                    />
                    <Image
                        src={data.icon}
                        alt=""
                        className="shrink-0 self-start w-8 aspect-square"
                    />
                </div>
                <div className="flex gap-5 justify-center mt-12 max-w-full text-lg font-semibold leading-3 whitespace-nowrap w-[665px] max-md:flex-wrap max-md:mt-10">
                    {data.buttons.map((button, index) => (
                        <Button
                            key={index}
                            text={button.text}
                            icon={button.icon}
                            className={button.className}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NFTM;
