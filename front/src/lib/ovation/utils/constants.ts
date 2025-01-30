// constants.ts
import OvationLogo from "@/components/OvationLogo";
import type { JSX } from "react";
import { IconType } from "react-icons";
import { BsChatSquareDots } from "react-icons/bs";
import { CiLink } from "react-icons/ci";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaSlack,
} from "react-icons/fa";
import { FaChartSimple, FaLink, FaRegUser } from "react-icons/fa6";
import {
    HiOutlineBriefcase,
    HiOutlineMapPin,
    HiOutlineWrench,
} from "react-icons/hi2";
import { IoChevronDown, IoWallet } from "react-icons/io5";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LuCalendarDays, LuSunDim } from "react-icons/lu";
import {
    PiArrowFatLineUp,
    PiCircleHalfDuotone,
    PiMagnifyingGlass,
} from "react-icons/pi";
import { SiBlockchaindotcom } from "react-icons/si";
import { TiDownload, TiUser } from "react-icons/ti";

interface SocialLinkLayout {
    name: string;
    username: string;
    url: string;
    icon: IconType;
}

interface Badge {
    label: string;
    state: string;
    level: string;
    value: number;
    description: string;
    // icon: () => JSX.Element;
    icon: IconType;
}

interface BadgeDisplay {
    descriptor: string;
    badge: Badge[];
}

interface BookmarkedItem {
    title: string;
    description: string;
    imageUrl: string;
    views: number;
    collectors: number;
}

interface FeaturedItem {
    title: string;
    description: string;
    imageUrl: string;
    views: number;
    collectors: number;
    items: NFT[];
}

interface Post {
    title: string;
    content: string;
    views: number;
}

interface Event {
    title: string;
    date: string;
    imageUrl: string;
    isVirtual: boolean;
    views: number;
}

interface EventSet {
    title: string;
    date: {
        when: string;
        icon: () => JSX.Element;
    };
    imageUrl: string;
    isVirtual: {
        isVirtual: boolean;
        icon: () => JSX.Element;
    };
    views: number;
}
interface NFT {
    mint: number;
    alternate: string;
    height: number;
    width: number;
    imageUrl: string;
    name: string;
    collection: string;
    valuation: {
        price: number;
        currency: string;
    };
    likes: number;
    artist: string;
}

interface TabContent {
    addIcon: IconType;
    changeIcon: IconType;
    hideText: string;
    favoriteIcon: IconType;
    filtersText: string;
    filtersIcon: IconType;
    nftsHeader: string;
    portfolioFilters: {
        filter: string;
        count: number;
    }[];
    nfts: NFT[];
    stats: {
        nftAssetText: string;
        totalText: string;
        overviewText: string;
        nftText: string;
        createdText: string;
        collectedText: string;
        totalCountText: string;
        assetText: string;
        valueText: string;
        nftsCreated: number;
        nftsCollected: number;
        totalNFTCount: number;
        nftAssets: number;
        countryCurrency: string;
        portfolioValue: number;
        chartIndicies: {
            chartId: number;
            color: string;
            asset: string;
            percentage: number;
        }[];
        magnitude: string;
        graphAxies: {
            dayId: number;
            day: string;
            // value: {
            //     total: number;
            //     magnitude: string;
            // }[];
            value: number;
        }[];
        transactions: {
            transactionHeader: string;
            headerRow: string[];
            transaction: {
                id: number;
                type: string;
                timestamp: string;
                collection: {
                    nftUrl: string;
                    collectionName: string;
                };
                price: {
                    amount: number;
                    token: string;
                };
            }[];
        };
    };
    experience: {
        experienceId: number;
        companyLogo: IconType;
        position: string;
        company: string;
        duration: string;
        description: {
            goals: string;
            efforts: string;
        };
    }[];
}

interface ProfileTabs {
    name: string;
    // isActive: boolean;
    href: string;
}
[];

export const profileTabs = [
    {
        kind: "post",
        name: "posts",
        href: "#posts",
    },
    {
        kind: "reply",
        name: "replies",
        href: "#replies",
    },
    {
        kind: "portfolio",
        name: "portfolios",
        href: "#portfolios",
    },
    {
        kind: "create",
        name: "creations",
        href: "#creations",
    },
    {
        kind: "stat",
        name: "stats",
        href: "#stats",
    },
    {
        kind: "experience",
        name: "experiences",
        href: "#experiences",
    },
];

export type NavigationProps = {
    site: {
        name: string;
        logo: ({
            className,
            id,
        }: {
            className: string;
            id: string;
        }) => JSX.Element;
    };
    tabs: {
        name: string;
        path: string;
        icon: IconType;
        identifier: string;
    }[];
};

export const profileInfo = {
    navigation: {
        site: {
            name: "Ovation",
            logo: OvationLogo,
        },
        tabs: [
            {
                name: "Home",
                path: "/home",
                icon: FaChartSimple,
                identifier: "home",
            },
            {
                name: "Discover",
                path: "/discover",
                icon: TiDownload,
                identifier: "discover",
            },
            {
                name: "Profile",
                path: "/profile",
                icon: FaRegUser,
                identifier: "profile",
            },
        ],
    } as NavigationProps,
    introduction: {
        greeting: {
            weather: LuSunDim,
            message: "Good morning, ",
            name: "John",
        },
        walletInfo: {
            walletId: "0xrxc.....d67579",
            tokenCount: 2000,
            tokenName: "&OVA",
            options: IoChevronDown,
            profileImage: "/me.jpeg",
            alternative: "profile_image",
            dimensions: {
                width: 37.23,
                height: 37.23,
            },
        },
    },
    content: {
        banner: {
            dimensions: {
                width: 1444,
                height: 362,
            },
            source: "/we.webp",
            alternative: "banner_image",
        },
        interactions: [
            {
                interaction: "send",
                action: "Send",
                icon: BsChatSquareDots,
            },
            {
                interaction: "share",
                share: "Share",
                icon: BsChatSquareDots,
            },
            {
                interaction: "post",
                post: "Post",
                icon: BsChatSquareDots,
            },
        ],
        editProfileButton: {
            text: "edit profile",
        },
        userInfo: {
            userImage: {
                source: "/me.jpeg",
                alternative: "user_image",
                dimensions: {
                    width: 175,
                    height: 175,
                },
                placeHolder: "profile image",
            },
            displayName: "The pancake chief",
            memberTypeIcon: {
                socialConnection: "@ Slack",
                socialIdentifier: FaSlack,
            },
            username: "@pancakeguy",
            ovsTokenDetails: {
                tokenMention: "OVA TOKEN: ",
                tokenCount: 2100,
            },
            position: {
                title: "CEO",
                company: "@Slack",
            },
            bio: "Web3 dude, focusing on getting more foes friends and collections, WAGMI, Web3",
            followingCount: {
                followingDescriptor: "Following",
                isOverOneThousand: false,
                count: 752,
                // magnitude: "k" | "m" | "b" | "t" | "q" | "Q" | "s" | "S" | "o" | "O" | "n" | "N" | "d" | "D" | "u" | "U" | "t" | "T" | "q" | "Q" | "s" | "S" | "o" | "O" | "n" | "N" | "d" | "D" | "u" | "U"
                magnitude: "h",
            },
            followerCount: {
                followerDescriptor: "Followers",
                isOverOneThousand: true,
                count: 20,
                magnitude: "k",
            },
            status: [
                {
                    delimiter: "selected",
                    kind: "field",
                    value: "Creator",
                    icon: HiOutlineBriefcase,
                },
                {
                    delimiter: "focus",
                    kind: "domain",
                    value: "Web3",
                    icon: SiBlockchaindotcom,
                },
                {
                    delimiter: "signup",
                    kind: "data",
                    value: "Dec 2021",
                    icon: HiOutlineMapPin,
                },
            ],
            badges: {
                descriptor: "Badges",
                badge: [
                    {
                        label: "Traction",
                        state: "traction",
                        level: "Bronze",
                        value: 4, // Number of badges of this type
                        description: "Portfolio value based badges",
                        icon: PiCircleHalfDuotone,
                    },
                    {
                        label: "Completions",
                        state: "completions",
                        level: "Silver",
                        value: 69, // Number of badges of this type
                        description: "How many projects have been completed",
                        icon: LiaUserCheckSolid,
                    },
                    {
                        label: "Action",
                        state: "action",
                        level: "Gold",
                        value: 420, // Number of badges of this type
                        description: "What is the current action of the user",
                        icon: HiOutlineWrench,
                    },
                    {
                        label: "Rank",
                        state: "rank",
                        level: "Platinum",
                        value: 9001,
                        description: "The user's rank",
                        icon: PiArrowFatLineUp,
                    },
                    // More badges...
                ],
            } as BadgeDisplay,
            socialsHeader: "socials",
            socialLinks: [
                {
                    name: "LinkedIn",
                    username: "Pancake Chief",
                    url: "https://www.linkedin.com/in/russell-palma-6b9700b9/",
                    icon: FaLinkedinIn,
                },
                {
                    name: "FaceBook",
                    username: "Pancake Chief",
                    url: "https://www.linkedin.com/in/russell-palma-6b9700b9/",
                    icon: FaFacebookF,
                },
                {
                    name: "Instagram",
                    username: "Pancake Chief",
                    url: "https://www.linkedin.com/in/russell-palma-6b9700b9/",
                    icon: FaInstagram,
                },
                {
                    name: "Website",
                    username: "Pancake Chief",
                    url: "https://russellpalma.com",
                    icon: CiLink,
                },
                // More social links...
            ] as SocialLinkLayout[],
        },
        bookmarkHeader: "Favorite NFTs",
        bookmarked: [
            {
                title: "MAD LADS",
                description:
                    "NFT stands for Non-Fungible Token. It's a type of digital asset that...",
                imageUrl: "/me.jpeg",
                views: 321,
                collectors: 85,
            },
            {
                title: "LAD MADS",
                description:
                    "This is a description for an nft collection. Here is a small preview of the project...",
                imageUrl: "/me.jpeg",
                views: 420,
                collectors: 69,
            },
            {
                title: "STAB FANS",
                description:
                    "Again, this will act as placeholder data until the database is implemented...",
                imageUrl: "/me.jpeg",
                views: 9991,
                collectors: 2,
            },
            // More featured items...
        ] as BookmarkedItem[],
        featuredHeader: "featured",
        featured: [
            {
                title: "MAD LADS",
                description:
                    "NFT stands for Non-Fungible Token. It's a type of digital asset that...",
                imageUrl: "/me.jpeg",
                views: 321,
                collectors: 85,
                items: [
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad lads",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad pads",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad dads",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad fads",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad labs",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad lags",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad laps",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad lods",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad luds",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                    {
                        imageUrl: "/me.jpeg",
                        name: "mad thuds",
                        collection: "collection0",
                        valuation: {
                            price: 69,
                            currency: "eth",
                        },
                        likes: 9,
                        artist: "dude",
                    },
                ],
            },
            {
                title: "LAD MADS",
                description:
                    "This is a description for an nft collection. Here is a small preview of the project...",
                imageUrl: "/me.jpeg",
                views: 420,
                collectors: 69,
                items: [
                    {
                        imageUrl: "/me.jpeg",
                        name: "lad mads",
                        collection: "collection1",
                        valuation: 420,
                    },
                ],
            },
            {
                title: "STAB FANS",
                description:
                    "Again, this will act as placeholder data until the database is implemented...",
                imageUrl: "/me.jpeg",
                views: 9991,
                collectors: 2,
                items: [
                    {
                        imageUrl: "/me.jpeg",
                        name: "stab fans",
                        collection: "collection2",
                        valuation: 9991,
                    },
                ],
            },
            // More featured items...
        ] as FeaturedItem[],
        textExpansion: " ",
        textDelimeter: "...",
        moreText: "more",
        projectHeader: "project",
        viewsText: "views",
        featuredProject: {
            title: "MAD LADS",
            description:
                "NFT stands for Non-Fungible Token. It's a type of digital asset that...",
            remainingDescription: "yothereisalotmore",
            imageUrl: "/me.jpeg",
            viewCount: 321,
            collectedText: "collected",
            collectedCount: 85,
            items: [
                {
                    mint: 1,
                    imageUrl: "/me.jpeg",
                    name: "mad lads",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 2,
                    imageUrl: "/me.jpeg",
                    name: "mad pads",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 3,
                    imageUrl: "/me.jpeg",
                    name: "mad dads",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 4,
                    imageUrl: "/me.jpeg",
                    name: "mad fads",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 5,
                    imageUrl: "/me.jpeg",
                    name: "mad labs",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 6,
                    imageUrl: "/me.jpeg",
                    name: "mad lags",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 7,
                    imageUrl: "/me.jpeg",
                    name: "mad laps",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 8,
                    imageUrl: "/me.jpeg",
                    name: "mad lods",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 9,
                    imageUrl: "/me.jpeg",
                    name: "mad luds",
                    collection: "collection0",
                    valuation: 321,
                },
                {
                    mint: 10,
                    imageUrl: "/me.jpeg",
                    name: "mad thuds",
                    collection: "collection0",
                    valuation: 321,
                },
            ],
        },
        postsHeader: "post",
        postHeader: "posts",
        posts: [
            {
                title: "WHAT IS NFT",
                content: "NFT stands for Non-Fungible Token. It's a...",
                views: 321,
            },
            {
                title: "SHREK IS LOVE",
                content: "Shreck is life ...",
                views: 100000,
            },
            {
                title: "BUGS LIFE",
                content: "Introducing a review of the best movie ever ...",
                views: 3000,
            },
            // More posts...
        ] as Post[],
        featuredPost: {
            title: "WHAT IS NFT",
            content:
                "NFT stands for Non-Fungible Token. It's a type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content using blockchain technology. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible and can be exchanged on a one-to-one basis, NFTs are indivisible, exchanged on a one-to-",
            remainingContent:
                "one basis , NFT stands for Non-Fungible Token. It's a type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content using blockchain technology. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible and can be exchanged on a one-to-one basis, NFTs are indivisible, exchanged on a one-to-one basis, N.....more NFT stands for Non-Fungible Token. It's a type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content using blockchain technology. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible and can be exchanged on a one-to-one basis, NFTs are indivisible, exchanged on a one-to-one basis, N.....more",
            views: 321,
        },
        eventsHeader: "event",
        events: [
            {
                title: "MINT DAY",
                date: {
                    when: "Wed, 24 Jan, 15:00 - 20:00",
                    icon: LuCalendarDays,
                },
                imageUrl: "/me.jpeg",
                isVirtual: { isVirtual: true, icon: HiOutlineMapPin },
                views: 321,
            },
            {
                title: "STASH PUMP",
                date: {
                    when: "Sat, 31 Aug, 22:00 - 7:00",
                    icon: LuCalendarDays,
                },
                imageUrl: "/me.jpeg",
                isVirtual: { isVirtual: true, icon: HiOutlineMapPin },
                views: 129,
            },
            {
                title: "RIDE N DIE",
                date: {
                    when: "Mon, 4 Jul, 00:00 - 24:00",
                    icon: LuCalendarDays,
                },
                imageUrl: "/me.jpeg",
                isVirtual: { isVirtual: true, icon: HiOutlineMapPin },
                views: 69420,
            },
            // More events...
        ] as EventSet[],
        previewText: "preview",
        featuredEvent: {
            title: "RIDE N DIE",
            date: {
                dateText: "datetime",
                when: "Mon, 4 Jul, 00:00 - 24:00",
                icon: LuCalendarDays,
            },
            imageUrl: "/me.jpeg",
            imageWidth: 50,
            imageHeight: 25,
            alternativeText: "preview",
            isVirtual: {
                isVirtual: true,
                icon: HiOutlineMapPin,
                virtualText: "virtual",
            },
            views: 620,
            calendarNotice: "add to calendar",
        },
        navTabs: [
            "posts",
            "replies",
            "portfolio",
            "created",
            "stats",
            "experience",
        ] as string[],
        nftsHeader: "nfts",
        wrapLeft: "(",
        wrapRight: ")",
        priceText: "price",
        plural: "s",
        tabsContent: {
            nfts: [
                {
                    mint: 0,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 1,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 2,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 3,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 4,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 5,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 6,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 7,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 8,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
                {
                    mint: 9,
                    imageUrl: "/me.jpeg",
                    alternate: "you",
                    height: 40,
                    width: 50,
                    name: "mad lads",
                    collection: "collection0",
                    valuation: {
                        price: 420,
                        currency: "eth",
                    },
                    likes: 9,
                    artist: "dude",
                },
            ] as NFT[],
            portfolioFilters: [
                {
                    filter: "all",
                    count: 20,
                },
                {
                    filter: "complete",
                    count: 4,
                },
                {
                    filter: "domain",
                    count: 4,
                },
                {
                    filter: "collectibles",
                    count: 5,
                },
                {
                    filter: "metaverse",
                    count: 4,
                },
                {
                    filter: "art",
                    count: 4,
                },
                {
                    filter: "public",
                    count: 4,
                },
                {
                    filter: "hidden",
                    count: 4,
                },
            ],
            hideText: "hide",
            filtersText: "filters",
            filtersIcon: IoChevronDown,
            favoriteIcon: IoChevronDown,
            nftsHeader: "nfts",
            stats: {
                // nftsCreated: 23,
                // nftsCollected: 23,
                // totalNFTCount: 23,
                // nftAssets: 10, // Example data
                // portfolioValue: 50000, // Example data
                overviewText: "overview",
                nftText: "nft",
                createdText: "created",
                collectedText: "collected",
                totalCountText: "total",
                assetText: "assets",
                valueText: "value",
                totalText: "total nft count",
                nftAssetText: "nft assets",
                nftsCreated: 23,
                nftsCollected: 23,
                totalNFTCount: 23,
                nftAssets: 10,
                countryCurrency: "$",
                portfolioValue: 69420.09,
                chartIndicies: [
                    {
                        chartId: 0,
                        color: "green",
                        asset: "art",
                        percentage: 10,
                    },
                    {
                        chartId: 1,
                        color: "yellow",
                        asset: "metaverse",
                        percentage: 20,
                    },
                    {
                        chartId: 2,
                        color: "orange",
                        asset: "music",
                        percentage: 30,
                    },
                    {
                        chartId: 3,
                        color: "red",
                        asset: "collectibles",
                        percentage: 40,
                    },
                    {
                        chartId: 4,
                        color: "purple",
                        asset: "pfp",
                        percentage: 50,
                    },
                ],
                magnitude: "k",
                graphAxies: [
                    // day: ["sun", "mon", "tue", "thu", "fri"],
                    // value: {
                    //     total: [0, 2, 4, 8, 10, 12, 14, 16, 18, 20],
                    //     magnitude: "k",
                    // },
                    {
                        dayId: 0,
                        day: "sun",
                        value: 0,
                    },
                    {
                        dayId: 1,
                        day: "mon",
                        value: 42,
                    },
                    {
                        dayId: 2,
                        day: "tue",
                        value: 42,
                    },
                    {
                        dayId: 3,
                        day: "wed",
                        value: 424,
                    },
                    {
                        dayId: 4,
                        day: "thu",
                        value: 42,
                    },
                    {
                        dayId: 5,
                        day: "fri",
                        value: 4,
                    },
                ],
                transactions: {
                    transactionHeader: "transaction history",
                    headerRow: ["type", "timestamp", "collection", "price"],
                    transaction: [
                        {
                            id: 0,
                            type: "recieved",
                            timestamp: "yesterday",
                            collection: {
                                nftUrl: "/me.jpeg",
                                collectionName: "nabruh",
                            },
                            price: {
                                amount: 2,
                                token: "btc",
                            },
                        },
                        {
                            id: 1,
                            type: "recieved",
                            timestamp: "yesterday",
                            collection: {
                                nftUrl: "/me.jpeg",
                                collectionName: "nabruh",
                            },
                            price: {
                                amount: 2,
                                token: "btc",
                            },
                        },
                        {
                            id: 2,
                            type: "sent",
                            timestamp: "today",
                            collection: {
                                nftUrl: "/me.jpeg",
                                collectionName: "nabruh",
                            },
                            price: {
                                amount: 2,
                                token: "btc",
                            },
                        },
                    ],
                },
            },
            addIcon: IoChevronDown,
            changeIcon: IoChevronDown,
            experience: [
                {
                    experienceId: 0,
                    companyLogo: IoChevronDown,
                    position: "CEO",
                    company: "Facebook",
                    duration: "May 2012 - Present",
                    description: {
                        goals: "Define the long-term goals",
                        efforts: "Direction of the company...",
                    },
                },
                {
                    experienceId: 1,
                    companyLogo: IoChevronDown,
                    position: "JANITOR",
                    company: "Sky High",
                    duration: "Feb 1982 - Feb 1983",
                    description: {
                        goals: "It wasn't much work",
                        efforts: "but it was honest work...",
                    },
                },
                {
                    experienceId: 2,
                    companyLogo: IoChevronDown,
                    position: "PRESIDENT OF THE MOON",
                    company: "Mitas",
                    duration: "Dec 681 - Jan 19833",
                    description: {
                        goals: "I",
                        efforts: "made it ...",
                    },
                },
                // More experiences...
            ],
        } as TabContent,
    },
};

export const HomeInfo = {
    navigation: {
        site: {
            name: "Ovation",
            logo: OvationLogo,
        },
        tabs: [
            {
                name: "Home",
                path: "/home",
                icon: FaChartSimple,
            },
            {
                name: "Discover",
                path: "/discover",
                icon: TiDownload,
            },
            {
                name: "Profile",
                path: "/profile",
                icon: FaRegUser,
            },
        ],
    },
    introduction: {
        greeting: {
            weather: LuSunDim,
            message: "Good morning, ",
            name: "John",
        },
        walletInfo: {
            walletId: "0x...d67579",
            tokenCount: 2000,
            tokenName: "&OVA",
            options: IoChevronDown,
            profileImage: "/me.jpeg",
            alternative: "profile_image",
            dimensions: {
                width: 37.23,
                height: 37.23,
            },
        },
    },
    content: {
        searchbg: {
            dimensions: {
                width: 1444,
                height: 90,
            },
            source: "/homeSearchBg.png",
            alternative: "banner_image",
        },
        searchIcon: {
            name: "Search",
            icon: PiMagnifyingGlass,
        },
        getStarted: {
            name: "GET STARTED",
            desc: "Complete your profile to win rewards!",
            tasks: [
                {
                    name: "COMPLETE PROFILE",
                    desc: "Finish you profile to earn 250 $OVA",
                    icon: TiUser,
                    button: "Go to Profile",
                    path: "/profile",
                },
                {
                    name: "SEE HOW YOU RANK AGAINST OTHER WEB3 CREATORS",
                    desc: "50 $OVA for every additional wallet after the first (This wallet must have at least 1 NFT)",
                    icon: IoWallet,
                    button: "Discover",
                    path: "/discover",
                },
                {
                    name: "INVITE USERS",
                    desc: "For every user you invite, earn 50 $0VA",
                    icon: FaLink,
                    button: "Copy Referral Link",
                    path: "/",
                },
            ],
        },
        featured: {
            name: "FEATURED",
            featimg: {
                dimensions: {
                    width: 417,
                    height: 272,
                },
                source: "/featuredNft.png",
                alternative: "Featured Image",
            },
            featprofile: {
                name: "username1.eth",
                user: "@username1",
                path: "/@username1",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "Featured Profile",
                },
                bio: "Passionate NFT holder asdjlasd alksadkljas dlkjasdljalsja al;ksdjajhsf ads asdflasdjh sdghsdfj asdkjksd aksdjksndg a;sd ksdf;lasidlkjhsdfg [asdfkja;skd  a;skd;ajkd aska a s g a SADKLGH;AS  ASKHLADJAS dkalkjfasjjd. askjadlkjaskd nkdjfajal asdjlajapd",
                nftcount: 11,
                $OVA: 10,
                arch: 11,
                badges: 3,
            },
        },
        topbadge: {
            name: "TOP BADGED HOLDER",
            section1: {
                name: "Top Contributor",

                name1: "username1.eth",
                user1: "@username1",
                path1: "/@username1",
                pfp1: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner1: {
                    dimensions: {
                        width: 872,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount1: 1000,

                name2: "username2.eth",
                user2: "@username2",
                path2: "/@username2",
                pfp2: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner2: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount2: 1000,

                name3: "username3.eth",
                user3: "@username3",
                path3: "/@username3",
                pfp3: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner3: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount3: 1000,

                name4: "username4.eth",
                user4: "@username4",
                path4: "/@username4",
                pfp4: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                collectorcount4: 1000,
            },
            section2: {
                name: "Leading NFT Collector",

                name1: "username3.eth",
                user1: "@username3",
                path1: "/@username3",
                pfp1: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner1: {
                    dimensions: {
                        width: 872,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount1: 1000,

                name2: "username2.eth",
                user2: "@username2",
                path2: "/@username2",
                pfp2: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner2: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount2: 1000,

                name3: "username1.eth",
                user3: "@username1",
                path3: "/@username1",
                pfp3: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner3: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount3: 1000,

                name4: "username4.eth",
                user4: "@username4",
                path4: "/@username4",
                pfp4: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                collectorcount4: 1000,
            },

            section3: {
                name: "Top NFT Holders",

                name1: "username2.eth",
                user1: "@username2",
                path1: "/@username2",
                pfp1: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner1: {
                    dimensions: {
                        width: 872,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount1: 1000,

                name2: "username1.eth",
                user2: "@username1",
                path2: "/@username1",
                pfp2: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner2: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount2: 1000,

                name3: "username3.eth",
                user3: "@username3",
                path3: "/@username3",
                pfp3: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner3: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                collectorcount3: 1000,

                name4: "username4.eth",
                user4: "@username4",
                path4: "/@username4",
                pfp4: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                collectorcount4: 1000,
            },
        },
        mostviewed: {
            name: "MOST VIEWED",
            profile0: {
                name: "username0.eth",
                user: "@username0",
                path: "/@username0",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                banner1: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                banner2: {
                    dimensions: {
                        width: 434,
                        height: 332,
                    },
                    source: "/featuredNft.png",
                    alternative: "Banner",
                },
                bio: "Dedicated NFT enthusiast, askdj aslkfda d asklfgjaksljd ap aspfj a[sk d;alfklasjkd;a saj dgsdklj a;lsdk adgkl;ljkas;dfk apgfjaldhnglakdmfa sd;asdkf;askd; as askd;ask d ;asa;jg aga ooajwp sdjkgljks fujapfjalfnxlk askjaaj",
                views: 100,
            },
            profile1: {
                name: "username1.eth",
                user: "@username1",
                path: "/@username1",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 90,
            },
            profile2: {
                name: "username2.eth",
                user: "@username2",
                path: "/@username2",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 80,
            },
            profile3: {
                name: "username3.eth",
                user: "@username3",
                path: "/@username3",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 70,
            },
            profile4: {
                name: "username4.eth",
                user: "@username4",
                path: "/@username4",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 60,
            },
            profile5: {
                name: "username5.eth",
                user: "@username5",
                path: "/@username5",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 50,
            },
            profile6: {
                name: "username6.eth",
                user: "@username6",
                path: "/@username6",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 40,
            },
            profile7: {
                name: "username7.eth",
                user: "@username7",
                path: "/@username7",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 30,
            },
            profile8: {
                name: "username8.eth",
                user: "@username8",
                path: "/@username8",
                pfp: {
                    dimensions: {
                        width: 60,
                        height: 60,
                    },
                    source: "/featurePfp.png",
                    alternative: "PFP",
                },
                views: 20,
            },
        },
    },
};
