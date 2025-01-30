import * as React from "react";
import Image from "next/image";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const CustomImage: React.FC<ImageProps> = ({ src, alt, className }) => (
    <Image src={src} alt={alt} className={className} width={500} height={500} />
);

interface TextProps {
    text: string;
    className?: string;
}

const Text: React.FC<TextProps> = ({ text, className }) => (
    <div className={className}>{text}</div>
);

interface ButtonProps {
    text: string;
    icon?: string;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon, className, onClick }) => (
    <button
        className={`flex justify-center items-center p-6 rounded-[50px] ${className}`}
        onClick={onClick}
    >
        <div className="flex gap-2.5 justify-center">
            <div className="my-auto">{text}</div>
            {icon && (
                <CustomImage
                    src={icon}
                    alt=""
                    className="shrink-0 aspect-square w-[18px]"
                />
            )}
        </div>
    </button>
);

const NFTModal: React.FC = () => {
    const handleHideClick = () => {
        console.log("Hide button clicked");
    };

    const handleSendClick = () => {
        console.log("Send button clicked");
    };

    const buttons = [
        {
            text: "Hide",
            icon: "http://b.io/ext_7-",
            className:
                "flex-1 text-white border-2 border-solid bg-neutral-700 border-zinc-800 max-md:px-5",
            onClick: handleHideClick,
        },
        {
            text: "Send",
            className: "flex-1 bg-lime-300 text-zinc-950 max-md:px-5",
            onClick: handleSendClick,
        },
    ];

    return (
        <div className="flex flex-col items-center py-11 bg-neutral-800 max-w-[737px] rounded-[30px]">
            <CustomImage
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f54dd5838c7c34e23365ce46e355e9e7fd347b95eed69bf1cc1825970b805dd3?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                alt="Bored Ape Yacht Club"
                className="w-full aspect-[1.23] max-w-[664px] max-md:max-w-full"
            />
            <div className="flex gap-5 justify-between self-stretch px-9 mt-11 w-full bg-neutral-800 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col justify-center max-md:max-w-full">
                    <Text
                        text="Bored Ape"
                        className="text-3xl font-semibold tracking-normal leading-7 text-white max-md:max-w-full"
                    />
                    <Text
                        text="Bored Ape Yacht Club, often colloquially called Bored Apes or Bored Ape is a non-fungible token collection built on the Ethereum blockchain with the ERC-721 standard"
                        className="mt-3 text-xl tracking-normal leading-8 text-neutral-400 max-md:max-w-full"
                    />
                </div>
                <CustomImage
                    src="http://b.io/ext_9-"
                    alt=""
                    className="shrink-0 self-start w-8 aspect-square"
                />
            </div>
            <div className="flex gap-5 justify-center mt-12 w-full text-lg font-semibold leading-3 whitespace-nowrap max-w-[665px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                {buttons.map((button, index) => (
                    <Button key={index} {...button} />
                ))}
            </div>
        </div>
    );
};

export default NFTModal;
