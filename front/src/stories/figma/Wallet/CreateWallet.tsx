import * as React from "react";
import Image from "next/image";

interface WalletItemProps {
    name: string;
    imageSrc: string;
    imageAlt: string;
    onClick: () => void;
}

const WalletItem: React.FC<WalletItemProps> = ({
    name,
    imageSrc,
    imageAlt,
    onClick,
}) => (
    <div
        className="flex flex-col flex-1 justify-center whitespace-nowrap cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200"
        onClick={onClick}
    >
        <div className="flex flex-col justify-center px-5 py-2.5 border border-solid border-neutral-700">
            <div className="flex gap-5 justify-between">
                <div className="my-auto">{name}</div>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={38}
                    height={38}
                    className="shrink-0 aspect-square"
                />
            </div>
        </div>
    </div>
);

const walletData: WalletItemProps[] = [
    {
        name: "Metamask",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/845cecb922295ef6ce04503bb06a042f87a2b39b73a065393385ad02878253c8?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "Metamask logo",
        onClick: () => console.log("Metamask clicked"),
    },
    {
        name: "Binance Chain",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/347cd2daac53280d645ddead9573df3507b5c3a3f33ef1cc06619fffed787703?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "Binance Chain logo",
        onClick: () => console.log("Binance Chain clicked"),
    },
    {
        name: "Trust Wallet",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/4afd028339c212f771325b6fc8c19ba253c70c661de27129613b55cdebfaa463?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "Trust Wallet logo",
        onClick: () => console.log("Trust Wallet clicked"),
    },
    {
        name: "WalletConnect",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/866c2ac5a07ea9a89c800b1eadb29922e469660f716239de1747178f32a2cf60?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "WalletConnect logo",
        onClick: () => console.log("WalletConnect clicked"),
    },
    {
        name: "Phantom",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/9870dc890dbe415e9381643c607a97a784462441f7334e7000318ad567eb2f8a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "Phantom logo",
        onClick: () => console.log("Phantom clicked"),
    },
    {
        name: "OKX",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/c342d692c86b9bf6e8c5984b4e2d4594b885bf9be9334b1fa547ed02a1b58007?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "OKX logo",
        onClick: () => console.log("OKX clicked"),
    },
    {
        name: "Coinmarket",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/ec6b841a86a4badcef4f7bc2f05c754844a1a69d4a1c7a8359c85e0d2a1c9eb0?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "Coinmarket logo",
        onClick: () => console.log("Coinmarket clicked"),
    },
    {
        name: "SafePal",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/5fa73c2e0145d333f71904c839312ecc25bff6b1a0a9f0db7446ab3a2f6e81d7?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "SafePal logo",
        onClick: () => console.log("SafePal clicked"),
    },
    {
        name: "TokenPocket",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/5addb3ed5d93a1113d7510d76d0cd2f0f3790d8b168177eec93cdb90e63b6208?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "TokenPocket logo",
        onClick: () => console.log("TokenPocket clicked"),
    },
    {
        name: "BraveWallet",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/55b571b451cb288fb7aeba1bdab660aea14eb2c04b04f3822e363e80b918503f?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "BraveWallet logo",
        onClick: () => console.log("BraveWallet clicked"),
    },
    {
        name: "OperaWallet",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/3b4778c9899c7dd1fabe9b2d7a094fa5e0ee7e9360b1d46c2ebd440e79908c3a?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "OperaWallet logo",
        onClick: () => console.log("OperaWallet clicked"),
    },
    {
        name: "MathWallet",
        imageSrc:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/29b1c6889cb71e950a2dc911b583d7f8ccae040143e9545b7b1838b60e8f0c53?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&",
        imageAlt: "MathWallet logo",
        onClick: () => console.log("MathWallet clicked"),
    },
];

const MyComponent: React.FC = () => {
    return (
        <div className="flex flex-col text-sm font-semibold leading-5 max-w-[500px]">
            <h1 className="w-full text-3xl tracking-normal leading-7 text-white max-md:max-w-full">
                Create Account
            </h1>
            <div className="flex gap-2 pr-5 mt-1 text-neutral-200 max-md:flex-wrap">
                <div>Personal info</div>
                <Image
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a81cdad86f5ea4a6f7d5eca415084e22690b014a5245f7f42295a651fc84afd8?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt=""
                    width={1}
                    height={1}
                    className="shrink-0 my-auto border-2 border-lime-300 border-solid aspect-[0.67] stroke-[1.5px] stroke-lime-300"
                />
                <div>Choose path</div>
                <Image
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fece9edc40b6fe4799859434e810e56d8279d504a61e7da23c32655d9058624?apiKey=a40a32ad6fc34ba2a6c684a63b787c17&"
                    alt=""
                    width={3}
                    height={1}
                    className="shrink-0 my-auto border-2 border-lime-300 border-solid aspect-[0.5] stroke-[1.5px] stroke-lime-300"
                />
                <div>Connect wallet</div>
            </div>
            <div className="flex flex-wrap gap-4 mt-11 text-white max-md:mt-10">
                {walletData.map((wallet, index) => (
                    <WalletItem
                        key={index}
                        name={wallet.name}
                        imageSrc={wallet.imageSrc}
                        imageAlt={wallet.imageAlt}
                        onClick={wallet.onClick}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center p-0.5 mt-11 w-full text-xs leading-5 text-center max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-2">
                    <div className="text-stone-300">Wallet not listed?</div>
                    <div
                        className="text-lime-300 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200"
                        onClick={() => console.log("Connect manually clicked")}
                    >
                        Connect manually
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
