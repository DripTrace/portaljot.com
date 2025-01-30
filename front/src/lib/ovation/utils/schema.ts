// constants.ts

import { IconType } from "react-icons";

interface Statics {
    sidbareLinks: {
        title: string;
        icon: IconType;
        path: string;
        links: {
            title: string;
            path: string;
        }[];
    }[];
}

interface User {
    id: number;
    username: string;
    hashedPassword: string;
    name?: string;
    email: string;
    emailVerified?: boolean;
    roles: "ADMIN" | "MOD" | "USER" | "GUEST";
    accessToken?: string;
    refreshToken?: string;
    firstName?: string;
    lastName?: string;
    dateJoined: Date;
    updatedAt: Date;
    pfpImage?: string;
    ova: number;
    bio?: string;
    website?: string;
    country?: string;
    verificationStatus: boolean;
    followers: number;
    following: number;
    nftCount: number;
    badgeCount: number;
    walletValue: number;
    banner?: string;
    role?: string;
    paths?: string;
    location?: string;
    experience?: string;
    portfolio?: string;
}

export const users: User[] = [
    // First user
    {
        id: 1,
        username: "pancakeguy",
        hashedPassword: "hashed_value",
        name: "The Pancake Chief",
        email: "pancakeguy@example.com",
        emailVerified: true,
        roles: "ADMIN",
        accessToken: "access_token_value",
        refreshToken: "refresh_token_value",
        firstName: "John",
        lastName: "Doe",
        dateJoined: new Date("2024-01-01"),
        updatedAt: new Date("2024-02-01"),
        pfpImage: "/images/johndoe.jpg",
        ova: 2527,
        bio: "Web3 enthusiast, creating decentralized applications.",
        website: "https://johndoe.com",
        country: "US",
        verificationStatus: true,
        followers: 300,
        following: 150,
        nftCount: 5,
        badgeCount: 10,
        walletValue: 500.0,
        banner: "/images/banner.jpg",
        role: "Developer",
        paths: "developer",
        location: "California",
        experience: "3 years in software development",
        portfolio: "https://johndoe.com/portfolio",
    },
    // Second user
    {
        id: 2,
        username: "cryptoqueen",
        hashedPassword: "hashed_password_value",
        name: "Crypto Queen",
        email: "cryptoqueen@example.com",
        emailVerified: true,
        roles: "USER",
        accessToken: "access_token_value_queen",
        refreshToken: "refresh_token_value_queen",
        firstName: "Alice",
        lastName: "Wonderland",
        dateJoined: new Date("2023-08-15"),
        updatedAt: new Date("2024-01-15"),
        pfpImage: "/images/alice.jpg",
        ova: 1375,
        bio: "Blockchain advocate and digital artist.",
        website: "https://alicecrypto.com",
        country: "CA",
        verificationStatus: false,
        followers: 120,
        following: 300,
        nftCount: 12,
        badgeCount: 5,
        walletValue: 350.0,
        banner: "/images/alice-banner.jpg",
        role: "Artist",
        paths: "artist, designer",
        location: "Toronto",
        experience: "5 years in digital art",
        portfolio: "https://alicecrypto.com/portfolio",
    },
    // Add more user entries as needed
];

// Ensure all date fields are Date objects or ISO strings as mentioned previously

// Badge interface and mock data
interface Badge {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    achievementType: "usage" | "milestone" | "other";
    pointValue: number;
    tier: "bronze" | "silver" | "gold" | "platinum";
    hidden: boolean;
    createdAt: Date;
}

export const badges: Badge[] = [
    {
        id: 1,
        name: "First Post",
        description: "Awarded for the first post on the platform",
        imageUrl: "/images/badges/first-post.png",
        achievementType: "milestone",
        pointValue: 100,
        tier: "gold",
        hidden: false,
        createdAt: new Date("2023-12-01"),
    },
    {
        id: 2,
        name: "Top Contributor",
        description: "Awarded for reaching the top of the contributor list",
        imageUrl: "/images/badges/top-contributor.png",
        achievementType: "milestone",
        pointValue: 200,
        tier: "platinum",
        hidden: false,
        createdAt: new Date("2023-11-01"),
    },
    // Additional badges...
];

// Post interface and mock data
interface Post {
    id: number;
    title: string;
    content: string;
    date: Date;
    userId: number;
}

export const posts: Post[] = [
    {
        id: 1,
        title: "Introduction to NFTs",
        content: "This post explores what NFTs are and why they matter.",
        date: new Date("2024-03-11"),
        userId: 1,
    },
    {
        id: 2,
        title: "Blockchain Basics",
        content: "A beginner's guide to understanding blockchain technology.",
        date: new Date("2024-03-15"),
        userId: 2,
    },
    // Additional posts...
];

// Link interface and mock data
export interface Link {
    linkId: number;
    userId: number;
    url: string;
    label: string;
}

export const links: Link[] = [
    {
        linkId: 1,
        userId: 1,
        url: "https://github.com/user1",
        label: "GitHub Profile",
    },
    {
        linkId: 2,
        userId: 2,
        url: "https://twitter.com/user2",
        label: "Twitter Profile",
    },
    // Additional links...
];

// Continue with Experience...

// Experience interface and mock data
interface Experience {
    experienceId: number;
    userId: number;
    latestCompany: string;
    latestRole: string;
    jobDesc: string;
}

export const experiences: Experience[] = [
    {
        experienceId: 1,
        userId: 1,
        latestCompany: "Tech Inc.",
        latestRole: "Software Developer",
        jobDesc: "Developing and maintaining key software solutions.",
    },
    {
        experienceId: 2,
        userId: 2,
        latestCompany: "Creative Studio",
        latestRole: "Graphic Designer",
        jobDesc: "Creating engaging digital artwork for various clients.",
    },
    // Additional experiences...
];

// Path interface and mock data
interface Path {
    pathId: number;
    userId: number;
    path: string;
}

export const paths: Path[] = [
    {
        pathId: 1,
        userId: 1,
        path: "Full Stack Development",
    },
    {
        pathId: 2,
        userId: 2,
        path: "Digital Art & Design",
    },
    // Additional paths...
];

// Like interface and mock data
interface Like {
    id: number;
    userId: number;
    postId: number;
    createdAt: Date;
}

export const likes: Like[] = [
    {
        id: 1,
        userId: 1,
        postId: 1,
        createdAt: new Date("2024-04-01"),
    },
    {
        id: 2,
        userId: 2,
        postId: 2,
        createdAt: new Date("2024-04-02"),
    },
    // Additional likes...
];

// Continue with Follower...

// Follower interface and mock data
interface Follower {
    userId: number;
    followerId: number;
}

export const followers: Follower[] = [
    {
        userId: 1,
        followerId: 2,
    },
    {
        userId: 2,
        followerId: 1,
    },
    // Additional follower relationships...
];

// Event interface and mock data
interface Event {
    id: number;
    userId: number;
    action: string;
    fromId: number;
    target: string;
    targetId?: number;
    timestamp: Date;
    viewed: boolean;
}

export const events: Event[] = [
    {
        id: 1,
        userId: 1,
        action: "Liked a Post",
        fromId: 2,
        target: "post",
        targetId: 1,
        timestamp: new Date("2024-04-15"),
        viewed: false,
    },
    {
        id: 2,
        userId: 2,
        action: "Followed a User",
        fromId: 1,
        target: "user",
        targetId: 2,
        timestamp: new Date("2024-04-16"),
        viewed: true,
    },
    // Additional events...
];

// Token interface and mock data
interface Token {
    userId: number;
    accessToken: string;
}

export const tokens: Token[] = [
    {
        userId: 1,
        accessToken: "some_secure_token_for_user_1",
    },
    {
        userId: 2,
        accessToken: "some_secure_token_for_user_2",
    },
    // Additional tokens...
];

// Continue with Initiative...

// Initiative interface and mock data
interface Initiative {
    initiativeId: number;
    userId: number;
    name: string;
    description: string;
    category: string;
    published: boolean;
    flagged: boolean;
    createdAt: Date;
}

export const initiatives: Initiative[] = [
    {
        initiativeId: 1,
        userId: 1,
        name: "Blockchain for Good",
        description: "Using blockchain to create positive social change.",
        category: "Social",
        published: true,
        flagged: false,
        createdAt: new Date("2024-01-15"),
    },
    // Additional initiatives...
];

// Wallet interface and mock data
interface Wallet {
    id: number;
    address: string;
    userId: number;
}

export const wallets: Wallet[] = [
    {
        id: 1,
        address: "0x123456789abcdef",
        userId: 1,
    },
    // Additional wallets...
];

// AllData interface and mock data
interface AllData {
    username: string;
    badgeId: number;
    badgeName: string;
    badgeDescription: string;
    badgeImageUrl: string;
    badgeAchievementType: string;
    badgePointValue: number;
    badgeTier: string;
    badgeHidden: boolean;
    badgeCreatedAt: Date;
    userBadgeProgressValue: number;
    userBadgeTop: boolean;
    userBadgeEarnedAt: Date;
}

export const allDataEntries: AllData[] = [
    {
        username: "pancakeguy",
        badgeId: 1,
        badgeName: "Community Leader",
        badgeDescription: "Awarded for being an outstanding community leader.",
        badgeImageUrl: "/images/badges/community-leader.png",
        badgeAchievementType: "milestone",
        badgePointValue: 500,
        badgeTier: "platinum",
        badgeHidden: false,
        badgeCreatedAt: new Date("2024-01-10"),
        userBadgeProgressValue: 500,
        userBadgeTop: true,
        userBadgeEarnedAt: new Date("2024-01-20"),
    },
    // Additional allData entries...
];

// ReferenceCode interface and mock data
interface ReferenceCode {
    id: number;
    code: string;
}

export const referenceCodes: ReferenceCode[] = [
    {
        id: 1,
        code: "REF12345",
    },
    {
        id: 2,
        code: "REF67890",
    },
    // Additional reference codes...
];

// NFT interface and mock data
interface NFT {
    id: number;
    userId: number;
    contractAddress: string;
    tokenId: string;
    type: string;
    name: string;
    description: string;
    imageUrl: string;
    metadata: string;
    createdAt: Date;
    updatedAt: Date;
}

export const nfts: NFT[] = [
    {
        id: 1,
        userId: 1,
        contractAddress: "0x123",
        tokenId: "1",
        type: "Art",
        name: "Decentralized Mona Lisa",
        description: "A reimagined classic for the blockchain era.",
        imageUrl: "/images/nfts/mona-lisa.png",
        metadata: JSON.stringify({ artist: "Da Vinci 2.0" }),
        createdAt: new Date("2023-10-10"),
        updatedAt: new Date("2023-10-11"),
    },
    // Additional NFTs...
];

// Collection interface and mock data
interface Collection {
    id: number;
    name: string;
    description: string;
    logoUrl: string;
    websiteUrl: string;
    socialMediaLinks: string;
    contractAddress: string;
    blockchainPlatform: string;
    totalSupply: number;
    circulatingSupply: number;
    floorPrice: number;
    averagePrice: number;
    releaseDate: Date;
    creatorId?: number;
    verified: boolean;
}

export const collections: Collection[] = [
    {
        id: 1,
        name: "Pioneer Punks",
        description: "The first punks on the Mars colony.",
        logoUrl: "/images/collections/pioneer-punks.png",
        websiteUrl: "https://pioneerpunks.space",
        socialMediaLinks: JSON.stringify({
            twitter: "https://twitter.com/pioneer_punks",
        }),
        contractAddress: "0x456",
        blockchainPlatform: "Ethereum",
        totalSupply: 10000,
        circulatingSupply: 8000,
        floorPrice: 2.5,
        averagePrice: 3.7,
        releaseDate: new Date("2024-01-01"),
        creatorId: 1,
        verified: true,
    },
    // Additional collections...
];
export interface Bookmark {
    id?: number; // Optional because it will be auto-generated by IndexedDB
    userId: number;
    postId: number;
}

export const bookmarks: Bookmark[] = [
    {
        userId: 1,
        postId: 101, // Assuming there's a post with id 101
    },
    {
        userId: 2,
        postId: 102, // Assuming there's a post with id 102
    },
];
