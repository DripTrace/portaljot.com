"use client";
import { ArchwayClient } from "@archwayhq/arch3.js/build";
import React, { useEffect, useState } from "react";
// import { ArchwayClient } from "@archwayhq/arch3.js";

type NFT = {
    value: number;
    name: string;
    extension: {
        name: string;
        image: string;
        description: string;
    };
};

type SortOption =
    | "Value: High to Low"
    | "Value: Low to High"
    | "Name: A to Z"
    | "Name: Z to A";

const ProfileContent = () => {
    const [nfts, setNfts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const client = await ArchwayClient.connect(
                "https://rpc.constantine.archway.io:443"
            );
            const contractAddress =
                "archway1hp9hwakpwxvvgvydzhsnazr36qym5m3j73ud5e3yfz9elvhv2flq3a9wqz";

            let startAfter = undefined;
            let more = true;
            const allNfts = [];
            //while (more) {
            const msg = {
                all_tokens: {
                    start_after: startAfter,
                    limit: 30,
                },
            };
            const response = await client.queryContractSmart(
                contractAddress,
                msg
            );
            //@ts-ignore
            allNfts.push(...response.tokens);
            more = response.tokens.length > 0;
            startAfter = response.tokens[response.tokens.length - 1];
            // }

            const nfts = [];
            for (const tokenId of allNfts) {
                const nftInfoMsg = { nft_info: { token_id: tokenId } };
                const nftInfoResponse = await client.queryContractSmart(
                    contractAddress,
                    nftInfoMsg
                );
                //@ts-ignore

                nfts.push(nftInfoResponse);
            }

            setNfts(nfts);
        };

        fetchData();
    }, []);

    const [showPopup, setShowPopup] = useState(false);
    const [sortOption, setSortOption] =
        useState<SortOption>("Value: High to Low");

    const sortOptions: Record<
        SortOption,
        { sortBy: "value" | "name"; ascending: boolean }
    > = {
        "Value: High to Low": { sortBy: "value", ascending: false },
        "Value: Low to High": { sortBy: "value", ascending: true },
        "Name: A to Z": { sortBy: "name", ascending: true },
        "Name: Z to A": { sortBy: "name", ascending: false },
    };

    const chunkArray = (arr: NFT[], chunkSize: number): NFT[][] => {
        const result: NFT[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const getSortedAndChunkedNFTs = (): NFT[][] => {
        const { sortBy, ascending } = sortOptions[sortOption];
        let sortedNFTs = nfts ? [...nfts] : [];

        // Only include NFTs with a defined extension
        sortedNFTs = sortedNFTs.filter((nft) => nft.extension);

        sortedNFTs.sort((a, b) => {
            if (sortBy === "value") {
                return ascending ? a.value - b.value : b.value - a.value;
            } else {
                // sort by name
                return ascending
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
        });

        sortedNFTs = sortedNFTs.slice(0, 10);

        return chunkArray(sortedNFTs, 5);
    };

    const sortedNfts = getSortedAndChunkedNFTs();

    const renderNFTBoxes = (nfts: NFT[]) => {
        return nfts
            .filter((nft) => nft.extension) // Only include NFTs with a defined extension
            .map((nft, index) => (
                <div
                    key={index}
                    className="w-36 h-36 mx-6 rounded-md flex flex-col items-center justify-center p-2"
                >
                    <img
                        className="rounded-md"
                        src={nft.extension.image.replace(
                            "ipfs://",
                            "https://ipfs.io/ipfs/"
                        )}
                        alt={nft.extension.name}
                    />
                </div>
            ));
    };

    const [randomNFTs, setRandomNFTs] = useState<NFT[]>([]);
    useEffect(() => {
        if (nfts && nfts.length > 0) {
            const nftsWithExtension = nfts.filter((nft) => nft.extension);
            const randomIndices = Array.from({ length: 3 }, () =>
                Math.floor(Math.random() * nftsWithExtension.length)
            );
            setRandomNFTs(
                randomIndices.map((index) => nftsWithExtension[index])
            );
        }
    }, [nfts]);

    return (
        <div>
            <div className="mt-5 mb-5 text-xl text-center font-semibold">
                Highlighted NFTs{" "}
                {/* If no NFTS show text 'No NFTs to show...' */}
            </div>
            <div className="w-full flex justify-center">
                {randomNFTs.map((nft, index) => (
                    <div
                        key={index}
                        className={`w-56 h-56 p-2.5 mx-4 rounded-xl flex items-center justify-center ${index === 1 ? "mt-10" : "mt-14"}`}
                    >
                        <img
                            className={`w-46 h-46 object-cover rounded-md`}
                            src={nft.extension.image.replace(
                                "ipfs://",
                                "https://ipfs.io/ipfs/"
                            )}
                            alt={nft.extension.name}
                        />
                    </div>
                ))}
            </div>
            <div className="w-full">
                <div className="mx-4 rounded-lg mt-20 pb-6">
                    <div className="py-2 border-b text-lg px-12 border-ovteal/10 text-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="rounded-full pl-5 bg-ovtealdull border mr-3"
                        />
                        <select
                            className="bg-ovtealdull border rounded-full px-2 py-[3px] mt-[1px]"
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(e.target.value as SortOption)
                            }
                            title="Sort Option"
                        >
                            {Object.keys(sortOptions).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="">
                        {sortedNfts.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="flex justify-center my-6"
                            >
                                {renderNFTBoxes(row)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
