import * as React from "react";
import Image from "next/image";

type FilterOptionProps = {
    label: string;
    count: number;
    selected: boolean;
    onClick: () => void;
};

const FilterOption: React.FC<FilterOptionProps> = ({
    label,
    count,
    selected,
    onClick,
}) => (
    <div
        onClick={onClick}
        className={`cursor-pointer justify-center p-3 ${selected ? "bg-white text-neutral-800" : "bg-neutral-800 text-white"} rounded-full transition-transform transform hover:scale-105 active:opacity-70`}
    >
        {`${label}(${count})`}
    </div>
);

type NFTCardProps = {
    imgSrc: string;
    artist: string;
    price: string;
    altText: string;
    isHidden: boolean;
    onHideToggle: () => void;
};

const NFTCard: React.FC<NFTCardProps> = ({
    imgSrc,
    artist,
    price,
    altText,
    isHidden,
    onHideToggle,
}) => (
    <article className="flex flex-col grow self-stretch pb-4 mx-auto w-full rounded-xl border-2 border-solid bg-zinc-900 border-white border-opacity-10 max-md:mt-4">
        <div className="flex overflow-hidden relative flex-col items-end px-16 pt-2 pb-20 w-full aspect-[1.58] max-md:pl-5">
            <Image
                loading="lazy"
                src={imgSrc}
                alt={altText}
                layout="fill"
                objectFit="cover"
                className="transform transition-transform hover:scale-110"
            />
            <Image
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/db394aa35db4e03857f90a1643873987c7942a6ef0a73aab92ed5d46d85e4e79?apiKey=305a6c025418439087e8bfc27b932f06&"
                alt=""
                width={29}
                height={29}
                className="mb-11 border border-solid aspect-square border-neutral-700 max-md:mb-10"
            />
        </div>
        <div className="flex gap-3 justify-between pr-6 mt-4 max-md:pr-5">
            <section className="flex flex-col justify-center">
                <header className="text-xs leading-4 text-neutral-400">
                    Artist
                </header>
                <p className="mt-1 text-sm font-semibold leading-5 text-white">
                    {artist}
                </p>
            </section>
            <section className="flex flex-col justify-center">
                <header className="self-end text-xs leading-4 text-neutral-400">
                    Price
                </header>
                <p className="mt-1 text-sm font-semibold leading-5 text-right text-white">
                    {price}
                </p>
            </section>
        </div>
        <div className="shrink-0 mt-3 h-px border border-solid bg-neutral-700 border-neutral-700" />
        <section className="flex gap-3 justify-between pr-6 mt-3 w-full whitespace-nowrap max-md:pr-5">
            <div className="flex gap-1 py-1 text-xs leading-4 text-center text-white">
                <Image
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b03b4eb6523a3c115507a446381c1171655e91f706f19dc248af41a4eacc3c5d?apiKey=305a6c025418439087e8bfc27b932f06&"
                    alt=""
                    width={17}
                    height={17}
                    className="shrink-0 aspect-[1.06]"
                />
                <p>43</p>
            </div>
            <button
                className={`cursor-pointer justify-center px-3 py-1.5 text-xs font-medium ${isHidden ? "bg-lime-300 text-neutral-900" : "text-lime-300 border border-lime-300 border-solid"} rounded-full transition-transform transform hover:scale-105 active:opacity-70`}
                onClick={onHideToggle}
                // aria-pressed={isHidden}
            >
                {isHidden ? "Hide" : "Unhide"}
            </button>
        </section>
    </article>
);

const PortfolioView: React.FC = () => {
    const [hiddenState, setHiddenState] = React.useState([true, true, false]);

    const toggleHiddenState = (index: number) => {
        setHiddenState((prevState) =>
            prevState.map((isHidden, idx) =>
                idx === index ? !isHidden : isHidden
            )
        );
        console.log(`Toggled hidden state for item ${index}`);
    };

    return (
        <section className="flex flex-col p-6 rounded-2xl border border-solid border-neutral-700 max-w-[983px] max-md:px-5">
            <header className="text-base font-medium text-white uppercase max-md:max-w-full">
                NFTS
            </header>
            <nav className="flex gap-5 justify-between mt-5 w-full whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <section className="flex gap-2 px-0.5 text-xs leading-4 text-neutral-400 max-md:flex-wrap">
                    {[
                        { label: "All", count: 20, selected: true },
                        { label: "Complete", count: 4, selected: false },
                        { label: "Domain", count: 4, selected: false },
                        { label: "Collectibles", count: 4, selected: false },
                        { label: "Metaverse", count: 4, selected: false },
                        { label: "Art", count: 4, selected: false },
                        { label: "Public", count: 4, selected: false },
                        { label: "Hidden", count: 4, selected: false },
                    ].map((filter, idx) => (
                        <FilterOption
                            key={idx}
                            {...filter}
                            onClick={() =>
                                console.log(`${filter.label} filter clicked`)
                            }
                        />
                    ))}
                </section>
                <button
                    className="cursor-pointer flex gap-1.5 px-2.5 py-3 text-sm font-medium text-white rounded-lg border border-solid bg-neutral-800 border-zinc-800 transition-transform transform hover:scale-105 active:opacity-70"
                    onClick={() => console.log("Filters button clicked")}
                >
                    <span className="my-auto">Filters</span>
                    <Image
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bf7e94134b34df863089c0eb0849ab64a9f67357cb6c0415ae7e73ea689669f?apiKey=305a6c025418439087e8bfc27b932f06&"
                        alt=""
                        width={14}
                        height={14}
                        className="shrink-0 w-3.5 aspect-square"
                    />
                </button>
            </nav>
            <main className="mt-11 max-md:mt-10 max-md:max-w-full">
                <section className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {[
                        {
                            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd0797047012c1c81ba1580ecfbe11f46e89eaeea55ae802083bf5bedcff8436?apiKey=305a6c025418439087e8bfc27b932f06&",
                            artist: "Bored Ape",
                            price: "14 ETH",
                            altText: "NFT Image 1",
                        },
                        {
                            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/28e904f3503ac29c887cf5a21daf7b02cba22319ebc0ca990eb1c3ada43c131d?apiKey=305a6c025418439087e8bfc27b932f06&",
                            artist: "Bored Ape",
                            price: "14 ETH",
                            altText: "NFT Image 2",
                        },
                        {
                            imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d570e8f6d5636dacd8914ffc616dd64006497ac54f59df30d061fb1ac21ef18?apiKey=305a6c025418439087e8bfc27b932f06&",
                            artist: "Bored Ape",
                            price: "14 ETH",
                            altText: "NFT Image 3",
                        },
                    ].map((nft, idx) => (
                        <NFTCard
                            key={idx}
                            {...nft}
                            isHidden={hiddenState[idx]}
                            onHideToggle={() => toggleHiddenState(idx)}
                        />
                    ))}
                </section>
            </main>
        </section>
    );
};

export default PortfolioView;
