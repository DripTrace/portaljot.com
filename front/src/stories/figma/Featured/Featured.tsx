import * as React from "react";
import Image from "next/image";

type NFTImageProps = {
    src: string;
    alt: string;
};

const NFTImage: React.FC<NFTImageProps> = ({ src, alt }) => {
    const handleClick = () => {
        console.log(`Image clicked: ${alt}`);
    };

    return (
        <div onClick={handleClick} className="relative group">
            <Image
                loading="lazy"
                src={src}
                alt={alt}
                width={104}
                height={104}
                className="shrink-0 transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
        </div>
    );
};

const images = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/003897f54ecf70c0156ac6c8cc726d27db825b709f7f02cb2c4f8f5df83558f6?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "First favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f09bafbeb9545a48d254e021840a50103e1e307c5ab55d7a14a55e4c12f9899a?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Second favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/675483b87ba909f2c9669064de6067b25fdd90fe0b0e11141526a5d54c799c4f?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Third favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/003897f54ecf70c0156ac6c8cc726d27db825b709f7f02cb2c4f8f5df83558f6?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Fourth favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f09bafbeb9545a48d254e021840a50103e1e307c5ab55d7a14a55e4c12f9899a?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Fifth favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/675483b87ba909f2c9669064de6067b25fdd90fe0b0e11141526a5d54c799c4f?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Sixth favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/003897f54ecf70c0156ac6c8cc726d27db825b709f7f02cb2c4f8f5df83558f6?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "First favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f09bafbeb9545a48d254e021840a50103e1e307c5ab55d7a14a55e4c12f9899a?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Second favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/675483b87ba909f2c9669064de6067b25fdd90fe0b0e11141526a5d54c799c4f?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Third favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/003897f54ecf70c0156ac6c8cc726d27db825b709f7f02cb2c4f8f5df83558f6?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Fourth favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f09bafbeb9545a48d254e021840a50103e1e307c5ab55d7a14a55e4c12f9899a?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Fifth favorite NFT",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/675483b87ba909f2c9669064de6067b25fdd90fe0b0e11141526a5d54c799c4f?apiKey=305a6c025418439087e8bfc27b932f06&",
        alt: "Sixth favorite NFT",
    },
];

const Featured: React.FC = () => {
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(`Button clicked: ${event.currentTarget.textContent}`);
    };

    return (
        <section className="flex flex-col self-stretch px-5 py-4 rounded-3xl bg-zinc-900 max-w-[363px]">
            <header>
                <h2 className="text-sm font-medium uppercase text-zinc-500">
                    FAVOURITE NFT
                </h2>
            </header>
            <div className="flex gap-1.5 py-1.5 mt-4 overflow-x-auto">
                {images.map((image, index) => (
                    <NFTImage key={index} src={image.src} alt={image.alt} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleButtonClick}
                    className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:opacity-75"
                >
                    Load More
                </button>
            </div>
        </section>
    );
};

export default Featured;
