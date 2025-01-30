import * as React from "react";

type NFTImageProps = {
    src: string;
    alt: string;
};

const NFTImage: React.FC<NFTImageProps> = ({ src, alt }) => {
    return (
        <img
            loading="lazy"
            src={src}
            alt={alt}
            className="shrink-0 max-w-full aspect-[1.49] w-[104px]"
        />
    );
};

const Favorites: React.FC = () => {
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
    ];

    return (
        <section className="flex flex-col self-stretch px-5 py-4 rounded-3xl bg-zinc-900 max-w-[363px]">
            <header>
                <h2 className="text-sm font-medium uppercase text-zinc-500">
                    FAVOURITE NFT
                </h2>
            </header>
            <div className="flex gap-1.5 py-1.5 mt-4">
                {images.map((image, index) => (
                    <NFTImage key={index} src={image.src} alt={image.alt} />
                ))}
            </div>
        </section>
    );
};

export default Favorites;
