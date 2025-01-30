"use client";

// import Gauge from "@/components/Chart/Gauge";
import dynamic from "next/dynamic";

const Gauge = dynamic(() => import("@/components/Chart/Gauge"), {
    ssr: false,
});
import Graph from "@/components/Chart/Graph";
import MilestoneVariants from "@/components/Chart/MilestoneVariations";
import { profileInfo } from "@/lib/utils/constants";
// import { table } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { delimiter } from "path";
import { useState, useEffect, EffectCallback } from "react";

const ProfilePage: React.FC = () => {
    const { navigation, introduction, content } = profileInfo;

    type TabOption =
        | "created"
        | "stats"
        | "portfolio"
        | "posts"
        | "replies"
        | "experience";
    interface ProfilePageProps {
        tabSelect: TabOption;
        handleTabSelect: (tab: TabOption) => void;
    }
    const [tabSelect, setTabSelect] = useState<TabOption>("portfolio");
    const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
    const handleTabSelect = (tab: TabOption) => {
        if (tabSelect == tab) {
            // if (tabSelect == tab && isActiveTab == true) {
            setIsActiveTab(isActiveTab);
            console.log("active state: ", isActiveTab);
            console.log("already on selected tab: ", tabSelect);
            return;
        } else {
            setIsActiveTab(!isActiveTab);
            setTabSelect(tab);
            console.log("activatin state: ", isActiveTab);
            console.log("selected tab: ", tabSelect);
        }
        // console.log("current state: ", tabSelect);
        // console.log("current tab: ", tab);
        // setIsActiveTab(!isActiveTab);
        // setTabSelect(tab);
        // // setIsActiveTab(!isActiveTab);
        // console.log("selected state:", tabSelect);
        // console.log("selected tab:", tab);
    };

    useEffect(() => {
        // setIsActiveTab(!isActiveTab);
        console.log("current state: ", isActiveTab);
        console.log("tab selection: ", tabSelect);
    }, [tabSelect]);

    const renderNavigation = () => (
        <aside className="navigation">
            <div className="navigation-content">
                <Link href="/" passHref className="logo-link">
                    <div>
                        {navigation.site.logo({
                            id: "ovation-logo",
                            className: "logo-container",
                        })}
                    </div>
                    <span className="logo-home">{navigation.site.name}</span>
                </Link>
                <nav className="navigation-container">
                    {navigation.tabs.map((tab) => (
                        <a
                            href={tab.path}
                            className="navigation-tab"
                            key={tab.name}
                        >
                            <div className="navigation-tab-icon">
                                {tab.icon({})}
                            </div>
                            <span className="navigation-tab-text">
                                {tab.identifier}
                            </span>
                        </a>
                    ))}
                </nav>
            </div>
            {/* </div> */}
            <div className="wallet">
                <div className="wallet-wrap">
                    <div className="wallet-nft">
                        <div className="nft-display">n</div>
                    </div>
                    <div className="wallet-details">
                        <div className="wallet-information">
                            <span className="wallet-address-wrap">
                                <h2 className="wallet-address">
                                    0xrxc.....d67579
                                </h2>
                            </span>
                            <div className="currency">
                                <span className="currency-details">
                                    <h3 className="token-amount">429</h3>
                                    <h3 className="token-kind">&ova</h3>
                                </span>
                                <div className="option-icon">c</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );

    const renderIntroduction = () => (
        <header className="introduction-container">
            <div className="introduction-start">
                <div className="introduction-start-weather-icon">
                    {introduction.greeting.weather({})}
                </div>
                <h1 className="introduction-start-greeting">
                    {introduction.greeting.message}
                    {introduction.greeting.name}
                </h1>
            </div>
            <div className="introduction-end">
                <div className="introduction-end-wallet-container">
                    <h2 className="introduction-end-wallet-id">
                        {introduction.walletInfo.walletId}
                    </h2>
                    <div className="introduction-end-wallet-details">
                        <div className="introduction-end-wallet-options">
                            {introduction.walletInfo.options({})}
                        </div>
                        <span className="introduction-end-wallet-text">
                            {introduction.walletInfo.tokenCount}{" "}
                            {introduction.walletInfo.tokenName}
                        </span>
                    </div>
                </div>
                <div className="introduction-end-avatar-wrap">
                    <Image
                        src={introduction.walletInfo.profileImage}
                        alt={introduction.walletInfo.alternative}
                        height={introduction.walletInfo.dimensions.height}
                        width={introduction.walletInfo.dimensions.width}
                        className="introduction-end-avatar"
                        priority
                        // layout="responsive"
                    />
                </div>
            </div>
        </header>
    );

    const renderContent = () => (
        <main className="content">
            <div className="banner">
                <Image
                    src={content.banner.source}
                    height={content.banner.dimensions.height}
                    width={content.banner.dimensions.width}
                    alt={content.banner.alternative}
                    className="content-banner"
                    priority
                />
                <Image
                    src={content.userInfo.userImage.source}
                    height={content.userInfo.userImage.dimensions.height}
                    width={content.userInfo.userImage.dimensions.width}
                    alt={content.userInfo.userImage.alternative}
                    className="profile-image-place"
                    priority
                />
                <div className="profile-actions">
                    <div className="interactions">
                        <div className="interaction-wrap">
                            <div className="interaction">
                                <div className="interaction-icon">i</div>
                            </div>
                            <div className="interaction">
                                <div className="interaction-icon">i</div>
                            </div>
                            <div className="interaction">
                                <div className="interaction-icon">i</div>
                            </div>
                        </div>
                        <div className="profile-edit">
                            <div className="edit-text">edit profile</div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="about">
                <div className="user">
                    <div className="user-wrap">
                        <div className="marker">
                            {/* <Image
                                src={content.userInfo.userImage.source}
                                height={
                                    content.userInfo.userImage.dimensions.height
                                }
                                width={
                                    content.userInfo.userImage.dimensions.width
                                }
                                alt={content.userInfo.userImage.alternative}
                                className="profile-image"
                            /> */}
                            {/* <Image
                                src={content.userInfo.userImage.source}
                                height={
                                    content.userInfo.userImage.dimensions.height
                                }
                                width={
                                    content.userInfo.userImage.dimensions.width
                                }
                                alt={content.userInfo.userImage.alternative}
                                className="profile-image-move"
                            /> */}
                            <div className="profile-image-wrap">
                                <div className="profile-image-box">
                                    profile image
                                </div>
                            </div>
                            <div className="identity-wrap">
                                <div className="identity">
                                    <span className="display-name">
                                        {
                                            profileInfo.content.userInfo
                                                .displayName
                                        }
                                    </span>
                                    <div className="connect">
                                        {profileInfo.content.userInfo.memberTypeIcon.socialIdentifier(
                                            {}
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="handle-wrap">
                                <div className="handle">
                                    <span className="user-name">
                                        {profileInfo.content.userInfo.username}
                                    </span>
                                    <div className="ova-stock">
                                        <span className="token-mention">
                                            {
                                                profileInfo.content.userInfo
                                                    .ovsTokenDetails
                                                    .tokenMention
                                            }
                                        </span>
                                        <span className="balance">
                                            {
                                                profileInfo.content.userInfo
                                                    .ovsTokenDetails.tokenCount
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="information">
                            <div className="describe">
                                {/* <div className="bio">
                                    <span className="latest">
                                        {content.userInfo.position.title}
                                        {content.userInfo.position.company}
                                    </span>
                                    <span className="description">
                                        {content.userInfo.bio}
                                    </span>
                                    <div className="follow">
                                        <span className="follow-container">
                                            <h2 className="follow-count">
                                                {
                                                    content.userInfo
                                                        .followingCount.count
                                                }
                                            </h2>
                                            <h2 className="follow-identifier">
                                                {
                                                    content.userInfo
                                                        .followingCount
                                                        .followingDescriptor
                                                }
                                            </h2>
                                        </span>
                                        <span className="follow-container">
                                            <h2 className="follow-count">
                                                {
                                                    content.userInfo
                                                        .followerCount.count
                                                }
                                                {
                                                    content.userInfo
                                                        .followerCount.magnitude
                                                }
                                            </h2>
                                            <h2 className="follow-identifier">
                                                {
                                                    content.userInfo
                                                        .followerCount
                                                        .followerDescriptor
                                                }
                                            </h2>
                                        </span>
                                    </div>
                                    <div className="status-wrapper">
                                        {content.userInfo.status.map(
                                            (statuses) => (
                                                <div
                                                    key={statuses.delimiter}
                                                    className="status"
                                                >
                                                    <a className="kind">
                                                        {statuses.value}
                                                    </a>
                                                    <div className="kind-icon">
                                                        {statuses.icon({})}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div> */}
                                <div className="badges z-50 bg-white">
                                    <h2 className="badges-header z-50 border border-blue-500">
                                        {content.userInfo.badges.descriptor}
                                    </h2>
                                    <div className="badge-wrapper z-50 border border-amber-600">
                                        {content.userInfo.badges.badge.map(
                                            (metal) => (
                                                <div
                                                    key={metal.label}
                                                    className="tier z-50 border border-pink-700"
                                                >
                                                    <span className="badge-icon z-50 border border-green-300">
                                                        {metal.icon({})}
                                                    </span>
                                                    <span className="badge-identity z-50 border border-purple-400">
                                                        {metal.state}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                {/* <div className="profile-user-socials-section">
                                    <h2 className="profile-user-socials-header">
                                        Socials
                                    </h2>
                                    <div className="profile-user-socials-container">
                                        {content.userInfo.socialLinks.map(
                                            (social) => (
                                                <span
                                                    key={social.name}
                                                    className="profile-user-socials-icon-container "
                                                >
                                                    {social.icon()}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div> */}
                                {/* <div className="profile-user-bookmarks-section">
                                    <div className="bookmark-container">
                                        <div className="bookmark-header-wrap">
                                            <h2 className="profile-user-bookmarks-header">
                                                Favorite NFT
                                            </h2>
                                        </div>
                                        <div className="profile-user-favorite-nft-container">
                                            <div className="favorite-wrap">
                                                {content.bookmarked.map(
                                                    (bookmark) => (
                                                        <div
                                                            key={bookmark.title}
                                                            className="favorites"
                                                        >
                                                            <Image
                                                                src={
                                                                    bookmark.imageUrl
                                                                }
                                                                alt={
                                                                    bookmark.description
                                                                }
                                                                height={70}
                                                                width={103}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <div className="profile-large-area">
                        <div className="profile-featured-section">
                            <div className="profile-featured-header">
                                <h2 className="profile-featured-header-text">
                                    featured
                                </h2>
                            </div>
                            <div className="profile-featured-container">
                                <div className="featured-container">
                                    <div className="project-container-wrap">
                                        {/* <div className="featured-top"> */}
                                        <div className="featured-header">
                                            <h5 className="featured-title">
                                                project
                                            </h5>
                                        </div>
                                        <div className="featured-detail-wrap">
                                            <div className="project">
                                                <div className="project-details">
                                                    <div className="featured-name-wrap">
                                                        <h3 className="featured-name">
                                                            mad lads
                                                        </h3>
                                                    </div>
                                                    <div className="description-wrap">
                                                        <p className="featured-description">
                                                            {
                                                                content
                                                                    .featured[0]
                                                                    .description
                                                            }
                                                            {/* NFT stands for
                                                            Non-Fungible Token.
                                                            It's a type of
                                                            digital asset that */}
                                                            <span className="expand-text">
                                                                {" "}
                                                                <b className="text-expand">
                                                                    ...
                                                                </b>{" "}
                                                                more
                                                            </span>
                                                            yothereisalotmore
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="project-grid-wrap">
                                                    <div className="project-grid">
                                                        {content.featured[0].items.map(
                                                            (project) => (
                                                                <div
                                                                    key={
                                                                        project.name
                                                                    }
                                                                    className="project-container"
                                                                >
                                                                    <Image
                                                                        src={
                                                                            project.imageUrl
                                                                        }
                                                                        alt={
                                                                            project.collection
                                                                        }
                                                                        height={
                                                                            70
                                                                        }
                                                                        width={
                                                                            103
                                                                        }
                                                                        className="project-item"
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </div> */}
                                        {/* <div className="featured-bottom"> */}
                                        <div className="featured-rep-container">
                                            <div className="project-rep-wrap">
                                                <div className="featured-rep-details">
                                                    <span className="featured-rep-wrap">
                                                        <h6 className="featured-rep-count">
                                                            884
                                                        </h6>
                                                        <h6 className="featured-rep-identifier">
                                                            views
                                                        </h6>
                                                    </span>
                                                    <span className="featured-rep-wrap">
                                                        <h6 className="featured-rep-count">
                                                            69
                                                        </h6>
                                                        <h6 className="featured-rep-identifier">
                                                            collected
                                                        </h6>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </div>
                                <div className="featured-container">
                                    <div className="post-container">
                                        <div className="featured-header">
                                            <h5 className="featured-title">
                                                post
                                            </h5>
                                        </div>
                                        <div className="post">
                                            <div className="featured-detail-wrap">
                                                <div className="post-details">
                                                    <div className="featured-name-wrap">
                                                        <h3 className="featured-name">
                                                            what is nft
                                                        </h3>
                                                    </div>
                                                    <div className="content-container">
                                                        <div className="post-content-wrap">
                                                            <span className="post-description-wrap">
                                                                <p className="featured-description">
                                                                    NFT stands
                                                                    for
                                                                    Non-Fungible
                                                                    Token. It's
                                                                    a type of
                                                                    digital
                                                                    asset that
                                                                    represents
                                                                    ownership or
                                                                    proof of
                                                                    authenticity
                                                                    of a unique
                                                                    item or
                                                                    piece of
                                                                    content
                                                                    using
                                                                    blockchain
                                                                    technology.
                                                                    Unlike
                                                                    cryptocurrencies
                                                                    such as
                                                                    Bitcoin or
                                                                    Ethereum,
                                                                    which are
                                                                    fungible and
                                                                    can be
                                                                    exchanged on
                                                                    a one-to-one
                                                                    basis, NFTs
                                                                    are
                                                                    indivisible,
                                                                    exchanged on
                                                                    a one-to-
                                                                    <span className="expand-text">
                                                                        {" "}
                                                                        <b className="text-expand">
                                                                            ...
                                                                        </b>{" "}
                                                                        more{" "}
                                                                    </span>
                                                                    one basis ,
                                                                    NFT stands
                                                                    for
                                                                    Non-Fungible
                                                                    Token. It's
                                                                    a type of
                                                                    digital
                                                                    asset that
                                                                    represents
                                                                    ownership or
                                                                    proof of
                                                                    authenticity
                                                                    of a unique
                                                                    item or
                                                                    piece of
                                                                    content
                                                                    using
                                                                    blockchain
                                                                    technology.
                                                                    Unlike
                                                                    cryptocurrencies
                                                                    such as
                                                                    Bitcoin or
                                                                    Ethereum,
                                                                    which are
                                                                    fungible and
                                                                    can be
                                                                    exchanged on
                                                                    a one-to-one
                                                                    basis, NFTs
                                                                    are
                                                                    indivisible,
                                                                    exchanged on
                                                                    a one-to-one
                                                                    basis,
                                                                    N.....more
                                                                    NFT stands
                                                                    for
                                                                    Non-Fungible
                                                                    Token. It's
                                                                    a type of
                                                                    digital
                                                                    asset that
                                                                    represents
                                                                    ownership or
                                                                    proof of
                                                                    authenticity
                                                                    of a unique
                                                                    item or
                                                                    piece of
                                                                    content
                                                                    using
                                                                    blockchain
                                                                    technology.
                                                                    Unlike
                                                                    cryptocurrencies
                                                                    such as
                                                                    Bitcoin or
                                                                    Ethereum,
                                                                    which are
                                                                    fungible and
                                                                    can be
                                                                    exchanged on
                                                                    a one-to-one
                                                                    basis, NFTs
                                                                    are
                                                                    indivisible,
                                                                    exchanged on
                                                                    a one-to-one
                                                                    basis,
                                                                    N.....more
                                                                </p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="featured-rep-container">
                                            <div className="post-rep-wrap">
                                                <div className="post-rep-details">
                                                    <span className="featured-rep-wrap">
                                                        <h6 className="featured-rep-count">
                                                            896
                                                        </h6>
                                                        <h6 className="featured-rep-identifier">
                                                            views
                                                        </h6>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-container">
                                    <div className="event-container">
                                        <div className="featured-header">
                                            <h5 className="featured-title">
                                                event
                                            </h5>
                                        </div>
                                        <div className="event">
                                            <div className="featured-detail-wrap">
                                                <div className="event-details">
                                                    <div className="featured-name-wrap">
                                                        <h3 className="featured-name">
                                                            mint day
                                                        </h3>
                                                    </div>
                                                    <div className="event-content-wrap">
                                                        <div className="event-content">
                                                            <div className="event-preview">
                                                                preview
                                                            </div>
                                                            <div className="event-properties">
                                                                <div className="event-calendar">
                                                                    <div className="event-type-idon">
                                                                        c
                                                                    </div>
                                                                    <div className="calendar-datetime">
                                                                        datetime
                                                                    </div>
                                                                </div>
                                                                <div className="event-type">
                                                                    <div className="event-type-icon">
                                                                        l
                                                                    </div>
                                                                    <div className="event-type-text">
                                                                        type
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="featured-rep-container">
                                            <div className="event-rep-wrap">
                                                <div className="featured-event-details">
                                                    <span className="featured-rep-wrap">
                                                        <h6 className="featured-rep-count">
                                                            89
                                                        </h6>
                                                        <h6 className="featured-rep-identifier">
                                                            views
                                                        </h6>
                                                    </span>
                                                    <span className="event-button-wrap">
                                                        <h6 className="event-button">
                                                            add to calendar
                                                        </h6>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-tab-section">
                            <div className="profile-tab-section-selection">
                                <button
                                    className={`${tabSelect == "posts" ? "profile-tab-button-selected" : "profile-tab-button"}`}
                                    onClick={() => {
                                        handleTabSelect("posts");
                                    }}
                                >
                                    <h5
                                        className={`${tabSelect == "posts" ? "profile-tab-selected" : "profile-tab"}`}
                                    >
                                        posts
                                    </h5>
                                </button>
                                <button
                                    className={`${tabSelect == "replies" ? "profile-tab-button-selected" : "profile-tab-button"}`}
                                    onClick={() => {
                                        handleTabSelect("replies");
                                    }}
                                >
                                    <h5
                                        className={`${tabSelect == "replies" ? "profile-tab-selected" : "profile-tab"}`}
                                    >
                                        replies
                                    </h5>
                                </button>
                                <button
                                    className={`${tabSelect == "portfolio" ? "profile-tab-button-selected" : "profile-tab-button"}`}
                                    onClick={() => {
                                        handleTabSelect("portfolio");
                                    }}
                                >
                                    <h5
                                        className={`${tabSelect == "portfolio" ? "profile-tab-selected" : "profile-tab"}`}
                                    >
                                        portfolio
                                    </h5>
                                </button>
                                <button
                                    className={`${tabSelect == "created" ? "profile-tab-button-selected" : "profile-tab-button"}`}
                                    onClick={() => {
                                        handleTabSelect("created");
                                    }}
                                >
                                    <h5
                                        className={`${tabSelect == "created" ? "profile-tab-selected" : "profile-tab"}`}
                                    >
                                        created
                                    </h5>
                                </button>
                                <button
                                    className={`${tabSelect == "stats" ? "profile-tab-button-selected" : "profile-tab-button"}`}
                                    onClick={() => {
                                        handleTabSelect("stats");
                                    }}
                                >
                                    <h5
                                        className={`${tabSelect == "stats" ? "profile-tab-selected" : "profile-tab"}`}
                                    >
                                        stats
                                    </h5>
                                </button>
                                <button
                                    className={`${tabSelect == "experience" ? "profile-tab-button-selected" : "profile-tab-button"}`}
                                    onClick={() => {
                                        handleTabSelect("experience");
                                    }}
                                >
                                    <h5
                                        className={`${tabSelect == "experience" ? "profile-tab-selected" : "profile-tab"}`}
                                    >
                                        experience
                                    </h5>
                                </button>
                            </div>
                            <div className="profile-tab-selected-container">
                                {/* <div className="selection">
                                    <div className="post">post</div>
                                </div> */}
                                {/* <div className="selection">
                                    <div className="replies">replies</div>
                                </div> */}
                                <div
                                    className={`${tabSelect == "portfolio" ? "selection" : "hidden"}`}
                                >
                                    <div className="portfolio">
                                        <div className="portfolio-header">
                                            <div className="portfolio-header-text-wrap">
                                                <div className="portfolio-header-text">
                                                    {" "}
                                                    nfts
                                                </div>
                                            </div>
                                            <div className="portfolio-filter-wrap">
                                                <div className="portfolio-collection">
                                                    <div className="portfolio-collection-filter">
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    all
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (20)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    complete
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (4)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    domain
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (4)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    collectibles
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (5)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    metaverse
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (4)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    art
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (4)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    public
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (4)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                        <button className="filters-button">
                                                            <span className="filters">
                                                                <h4 className="filter-name">
                                                                    hidden
                                                                </h4>
                                                                <h4 className="filter-stock">
                                                                    (4)
                                                                </h4>
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="portfolio-filters">
                                                        <div className="portfolio-filter">
                                                            <h4 className="filter-text">
                                                                filters
                                                            </h4>
                                                            <div className="filter-icon">
                                                                i
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="portfolio-wrap">
                                            <div className="portfolio-container">
                                                <div className="portfolio-item">
                                                    <div className="favorite">
                                                        f
                                                    </div>
                                                    <div className="nft">
                                                        nft
                                                    </div>
                                                    <div className="nft-detail-wrap">
                                                        <div className="nft-details">
                                                            <div className="artist-info">
                                                                <h6 className="nft-text-header">
                                                                    artist
                                                                </h6>
                                                                <h3 className="nft-text-detail">
                                                                    name
                                                                </h3>
                                                            </div>
                                                            <div className="nft-info">
                                                                <h6 className="nft-text-header">
                                                                    price
                                                                </h6>
                                                                <span className="nft-price">
                                                                    <h3 className="nft-value">
                                                                        2
                                                                    </h3>
                                                                    <h3 className="nft-currency">
                                                                        eth
                                                                    </h3>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <hr className="detail-separator" />
                                                        <div className="nft-options">
                                                            <div className="nft-rep">
                                                                <div className="nft-favorites">
                                                                    <div className="favorite-icon">
                                                                        h
                                                                    </div>
                                                                    <h5 className="favorite-number">
                                                                        69
                                                                    </h5>
                                                                </div>
                                                                <button className="hide-button">
                                                                    <h5 className="hide">
                                                                        unhide
                                                                    </h5>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="portfolio-item">
                                                    <div className="favorite">
                                                        f
                                                    </div>
                                                    <div className="nft">
                                                        nft
                                                    </div>
                                                    <div className="nft-detail-wrap">
                                                        <div className="nft-details">
                                                            <div className="artist-info">
                                                                <h6 className="nft-text-header">
                                                                    artist
                                                                </h6>
                                                                <h3 className="nft-text-detail">
                                                                    name
                                                                </h3>
                                                            </div>
                                                            <div className="nft-info">
                                                                <h6 className="nft-text-header">
                                                                    price
                                                                </h6>
                                                                <span className="nft-price">
                                                                    <h3 className="nft-value">
                                                                        2
                                                                    </h3>
                                                                    <h3 className="nft-currency">
                                                                        eth
                                                                    </h3>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <hr className="detail-separator" />
                                                        <div className="nft-options">
                                                            <div className="nft-rep">
                                                                <div className="nft-favorites">
                                                                    <div className="favorite-icon">
                                                                        h
                                                                    </div>
                                                                    <h5 className="favorite-number">
                                                                        69
                                                                    </h5>
                                                                </div>
                                                                <button className="hide-button">
                                                                    <h5 className="hide">
                                                                        unhide
                                                                    </h5>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="portfolio-item">
                                                    <div className="favorite">
                                                        f
                                                    </div>
                                                    <div className="nft">
                                                        nft
                                                    </div>
                                                    <div className="nft-detail-wrap">
                                                        <div className="nft-details">
                                                            <div className="artist-info">
                                                                <h6 className="nft-text-header">
                                                                    artist
                                                                </h6>
                                                                <h3 className="nft-text-detail">
                                                                    name
                                                                </h3>
                                                            </div>
                                                            <div className="nft-info">
                                                                <h6 className="nft-text-header">
                                                                    price
                                                                </h6>
                                                                <span className="nft-price">
                                                                    <h3 className="nft-value">
                                                                        2
                                                                    </h3>
                                                                    <h3 className="nft-currency">
                                                                        eth
                                                                    </h3>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <hr className="detail-separator" />
                                                        <div className="nft-options">
                                                            <div className="nft-rep">
                                                                <div className="nft-favorites">
                                                                    <div className="favorite-icon">
                                                                        h
                                                                    </div>
                                                                    <h5 className="favorite-number">
                                                                        69
                                                                    </h5>
                                                                </div>
                                                                <button className="hide-button">
                                                                    <h5 className="hide">
                                                                        unhide
                                                                    </h5>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="portfolio-item">
                                                    <div className="favorite">
                                                        f
                                                    </div>
                                                    <div className="nft">
                                                        nft
                                                    </div>
                                                    <div className="nft-detail-wrap">
                                                        <div className="nft-details">
                                                            <div className="artist-info">
                                                                <h6 className="nft-text-header">
                                                                    artist
                                                                </h6>
                                                                <h3 className="nft-text-detail">
                                                                    name
                                                                </h3>
                                                            </div>
                                                            <div className="nft-info">
                                                                <h6 className="nft-text-header">
                                                                    price
                                                                </h6>
                                                                <span className="nft-price">
                                                                    <h3 className="nft-value">
                                                                        2
                                                                    </h3>
                                                                    <h3 className="nft-currency">
                                                                        eth
                                                                    </h3>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <hr className="detail-separator" />
                                                        <div className="nft-options">
                                                            <div className="nft-rep">
                                                                <div className="nft-favorites">
                                                                    <div className="favorite-icon">
                                                                        h
                                                                    </div>
                                                                    <h5 className="favorite-number">
                                                                        69
                                                                    </h5>
                                                                </div>
                                                                <button className="hide-button">
                                                                    <h5 className="hide">
                                                                        unhide
                                                                    </h5>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="portfolio-item">
                                                    <div className="favorite">
                                                        f
                                                    </div>
                                                    <div className="nft">
                                                        nft
                                                    </div>
                                                    <div className="nft-detail-wrap">
                                                        <div className="nft-details">
                                                            <div className="artist-info">
                                                                <h6 className="nft-text-header">
                                                                    artist
                                                                </h6>
                                                                <h3 className="nft-text-detail">
                                                                    name
                                                                </h3>
                                                            </div>
                                                            <div className="nft-info">
                                                                <h6 className="nft-text-header">
                                                                    price
                                                                </h6>
                                                                <span className="nft-price">
                                                                    <h3 className="nft-value">
                                                                        2
                                                                    </h3>
                                                                    <h3 className="nft-currency">
                                                                        eth
                                                                    </h3>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <hr className="detail-separator" />
                                                        <div className="nft-options">
                                                            <div className="nft-rep">
                                                                <div className="nft-favorites">
                                                                    <div className="favorite-icon">
                                                                        h
                                                                    </div>
                                                                    <h5 className="favorite-number">
                                                                        69
                                                                    </h5>
                                                                </div>
                                                                <button className="hide-button">
                                                                    <h5 className="hide">
                                                                        unhide
                                                                    </h5>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="portfolio-item">
                                                    <div className="favorite">
                                                        f
                                                    </div>
                                                    <div className="nft">
                                                        nft
                                                    </div>
                                                    <div className="nft-detail-wrap">
                                                        <div className="nft-details">
                                                            <div className="artist-info">
                                                                <h6 className="nft-text-header">
                                                                    artist
                                                                </h6>
                                                                <h3 className="nft-text-detail">
                                                                    name
                                                                </h3>
                                                            </div>
                                                            <div className="nft-info">
                                                                <h6 className="nft-text-header">
                                                                    price
                                                                </h6>
                                                                <span className="nft-price">
                                                                    <h3 className="nft-value">
                                                                        2
                                                                    </h3>
                                                                    <h3 className="nft-currency">
                                                                        eth
                                                                    </h3>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <hr className="detail-separator" />
                                                        <div className="nft-options">
                                                            <div className="nft-rep">
                                                                <div className="nft-favorites">
                                                                    <div className="favorite-icon">
                                                                        h
                                                                    </div>
                                                                    <h5 className="favorite-number">
                                                                        69
                                                                    </h5>
                                                                </div>
                                                                <button className="hide-button">
                                                                    <h5 className="hide">
                                                                        unhide
                                                                    </h5>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="selection">
                                    <div className="created">created</div>
                                </div> */}
                                <div
                                    className={`${tabSelect == "stats" ? "selection" : "hidden"}`}
                                >
                                    <div className="stats">
                                        <div className="stats-header">
                                            <div className="stats-header-text-wrap">
                                                <h2 className="stats-header-text">
                                                    overview
                                                </h2>
                                            </div>
                                            <div className="overview">
                                                <div className="overview-content">
                                                    <div className="overview-wrap">
                                                        <span className="stat-title">
                                                            nft(s) created
                                                        </span>
                                                        <h1 className="stat">
                                                            69
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className="overview-content">
                                                    <div className="overview-wrap">
                                                        <span className="stat-title">
                                                            nft(s) collected
                                                        </span>
                                                        <h1 className="stat">
                                                            420
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className="overview-content">
                                                    <div className="overview-wrap">
                                                        <span className="stat-title">
                                                            total nft count
                                                        </span>
                                                        <h1 className="stat">
                                                            489
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stats-content">
                                            <div className="stat-visuals-wrap">
                                                <div className="stat-visuals">
                                                    <div className="stats-wrap">
                                                        <div className="asset">
                                                            <h3 className="stat-header">
                                                                nft asset
                                                            </h3>
                                                            <div className="stat-details">
                                                                <div className="chart-details">
                                                                    {/* <h6 className="chart-values">
                                                                        19%
                                                                    </h6> */}
                                                                    <div className="asset-chart">
                                                                        {/* <MilestoneVariants/> */}
                                                                        {/* {typeof window !==
                                                                            "undefined" && (
                                                                            <Gauge />
                                                                        )} */}

                                                                        <Gauge />
                                                                    </div>
                                                                </div>

                                                                <div className="chart-index">
                                                                    <div className="indices">
                                                                        <div className="index">
                                                                            <div className="indicator">
                                                                                b
                                                                            </div>
                                                                            <h6 className="index-title">
                                                                                art
                                                                            </h6>
                                                                        </div>
                                                                        <div className="index">
                                                                            <div className="indicator">
                                                                                b
                                                                            </div>
                                                                            <h6 className="index-title">
                                                                                metaverse
                                                                            </h6>
                                                                        </div>
                                                                        <div className="index">
                                                                            <div className="indicator">
                                                                                b
                                                                            </div>
                                                                            <h6 className="index-title">
                                                                                music
                                                                            </h6>
                                                                        </div>
                                                                        <div className="index">
                                                                            <div className="indicator">
                                                                                b
                                                                            </div>
                                                                            <h6 className="index-title">
                                                                                collectibles
                                                                            </h6>
                                                                        </div>
                                                                        <div className="index">
                                                                            <div className="indicator">
                                                                                b
                                                                            </div>
                                                                            <h6 className="index-title">
                                                                                pfp
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="stats-wrap">
                                                        <div className="value">
                                                            <h3 className="stat-header">
                                                                value
                                                            </h3>
                                                            <div className="stat-details">
                                                                <div className="graph-details">
                                                                    <h2 className="value-stat">
                                                                        $10922.81
                                                                    </h2>
                                                                    <div className="value-graph">
                                                                        <Graph />
                                                                    </div>
                                                                </div>
                                                                <div className="graph-axis">
                                                                    <div className="axes">
                                                                        <div className="axis">
                                                                            <h6 className="axis-text">
                                                                                sun
                                                                            </h6>
                                                                        </div>
                                                                        <div className="axis">
                                                                            <h6 className="axis-text">
                                                                                mon
                                                                            </h6>
                                                                        </div>
                                                                        <div className="axis">
                                                                            <h6 className="axis-text">
                                                                                tues
                                                                            </h6>
                                                                        </div>
                                                                        <div className="axis">
                                                                            <h6 className="axis-text">
                                                                                wed
                                                                            </h6>
                                                                        </div>
                                                                        <div className="axis">
                                                                            <h6 className="axis-text">
                                                                                thu
                                                                            </h6>
                                                                        </div>
                                                                        <div className="axis">
                                                                            <h6 className="axis-text">
                                                                                fri
                                                                            </h6>
                                                                        </div>
                                                                        <div className="axis">
                                                                            <h6 className="axis-text">
                                                                                sat
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="transactions">
                                                <div className="transaction-wrap">
                                                    <h3 className="transaction-header">
                                                        transaction history
                                                    </h3>
                                                    <div className="transaction-table">
                                                        <table className="table-contents">
                                                            <thead className="table-header">
                                                                <tr className="header-wrap">
                                                                    <th className="table-choice">
                                                                        <div className="header-item">
                                                                            i
                                                                        </div>
                                                                        <h5 className="header-description">
                                                                            type
                                                                        </h5>
                                                                    </th>
                                                                    <th className="header-text-container">
                                                                        <h5 className="header-text">
                                                                            timestamp
                                                                        </h5>
                                                                    </th>
                                                                    <th className="header-text-container">
                                                                        <h5 className="header-text">
                                                                            collection
                                                                        </h5>
                                                                    </th>
                                                                    <th className="header-text-container">
                                                                        <h5 className="header-text">
                                                                            price
                                                                        </h5>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="table-row">
                                                                {/* <div className="table-row-wrap"> */}
                                                                <tr className="row-wrap">
                                                                    {/* <div className="row-container"> */}
                                                                    <td className="row-choice">
                                                                        <div className="row-item">
                                                                            i
                                                                        </div>
                                                                        <h5 className="row-description">
                                                                            type
                                                                        </h5>
                                                                    </td>
                                                                    <td className="row-text">
                                                                        datetime
                                                                    </td>
                                                                    <td className="nft-item">
                                                                        <div className="item-image">
                                                                            g
                                                                        </div>
                                                                        <h4 className="item-text">
                                                                            text
                                                                        </h4>
                                                                    </td>
                                                                    <td className="nft-value-details">
                                                                        <h4 className="nft-value-price">
                                                                            110
                                                                        </h4>
                                                                        <h4 className="nft-value-currency">
                                                                            eth
                                                                        </h4>
                                                                    </td>
                                                                    {/* </div> */}
                                                                </tr>
                                                                <tr className="row-wrap">
                                                                    {/* <div className="row-container"> */}
                                                                    <td className="row-choice">
                                                                        <div className="row-item">
                                                                            i
                                                                        </div>
                                                                        <h5 className="row-description">
                                                                            type
                                                                        </h5>
                                                                    </td>
                                                                    <td className="row-text">
                                                                        datetime
                                                                    </td>
                                                                    <td className="nft-item">
                                                                        <div className="item-image">
                                                                            g
                                                                        </div>
                                                                        <h4 className="item-text">
                                                                            text
                                                                        </h4>
                                                                    </td>
                                                                    <td className="nft-value-details">
                                                                        <h4 className="nft-value-price">
                                                                            110
                                                                        </h4>
                                                                        <h4 className="nft-value-currency">
                                                                            eth
                                                                        </h4>
                                                                    </td>
                                                                    {/* </div> */}
                                                                </tr>
                                                                <tr className="row-wrap">
                                                                    {/* <div className="row-container"> */}
                                                                    <td className="row-choice">
                                                                        <div className="row-item">
                                                                            i
                                                                        </div>
                                                                        <h5 className="row-description">
                                                                            type
                                                                        </h5>
                                                                    </td>
                                                                    <td className="row-text">
                                                                        datetime
                                                                    </td>
                                                                    <td className="nft-item">
                                                                        <div className="item-image">
                                                                            g
                                                                        </div>
                                                                        <h4 className="item-text">
                                                                            text
                                                                        </h4>
                                                                    </td>
                                                                    <td className="nft-value-details">
                                                                        <h4 className="nft-value-price">
                                                                            110
                                                                        </h4>
                                                                        <h4 className="nft-value-currency">
                                                                            eth
                                                                        </h4>
                                                                    </td>
                                                                    {/* </div> */}
                                                                </tr>
                                                                {/* </div> */}
                                                            </tbody>
                                                            {/* <tbody className="table-row">
                                                                <tr className="row-wrap">
                                                                    <td className="row-choice">
                                                                        <div className="row-item">
                                                                            i
                                                                        </div>
                                                                        <h5 className="row-description">
                                                                            type
                                                                        </h5>
                                                                    </td>
                                                                    <td className="row-text">
                                                                        datetime
                                                                    </td>
                                                                    <td className="nft-item">
                                                                        <div className="item-image">
                                                                            g
                                                                        </div>
                                                                        <h4 className="item-text">
                                                                            text
                                                                        </h4>
                                                                    </td>
                                                                    <td className="nft-value-details">
                                                                        <h4 className="nft-value-price">
                                                                            110
                                                                        </h4>
                                                                        <h4 className="nft-value-currency">
                                                                            eth
                                                                        </h4>
                                                                    </td>
                                                                </tr>
                                                                <tr className="row-wrap">
                                                                    <td className="row-choice">
                                                                        <div className="row-item">
                                                                            i
                                                                        </div>
                                                                        <h5 className="row-description">
                                                                            type
                                                                        </h5>
                                                                    </td>
                                                                    <td className="row-text">
                                                                        datetime
                                                                    </td>
                                                                    <td className="nft-item">
                                                                        <div className="item-image">
                                                                            g
                                                                        </div>
                                                                        <h4 className="item-text">
                                                                            text
                                                                        </h4>
                                                                    </td>
                                                                    <td className="nft-value-details">
                                                                        <h4 className="nft-value-price">
                                                                            110
                                                                        </h4>
                                                                        <h4 className="nft-value-currency">
                                                                            eth
                                                                        </h4>
                                                                    </td>
                                                                </tr>
                                                                <tr className="row-wrap">
                                                                    <td className="row-choice">
                                                                        <div className="row-item">
                                                                            i
                                                                        </div>
                                                                        <h5 className="row-description">
                                                                            type
                                                                        </h5>
                                                                    </td>
                                                                    <td className="row-text">
                                                                        datetime
                                                                    </td>
                                                                    <td className="nft-item">
                                                                        <div className="item-image">
                                                                            g
                                                                        </div>
                                                                        <h4 className="item-text">
                                                                            text
                                                                        </h4>
                                                                    </td>
                                                                    <td className="nft-value-details">
                                                                        <h4 className="nft-value-price">
                                                                            110
                                                                        </h4>
                                                                        <h4 className="nft-value-currency">
                                                                            eth
                                                                        </h4>
                                                                    </td>
                                                                </tr>
                                                            </tbody> */}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`${tabSelect == "experience" ? "selection" : "hidden"}`}
                                >
                                    <div className="experience">
                                        <div className="experience-header">
                                            <div className="experience-text-wrap">
                                                <h2 className="experience-text">
                                                    experience
                                                </h2>
                                            </div>

                                            <div className="experience-edit">
                                                <div className="edit-options">
                                                    <div className="add">a</div>
                                                    <div className="change">
                                                        c
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="experience-container">
                                            <div className="experience-wrap">
                                                <div className="experiences">
                                                    <div className="experiences-wrap">
                                                        <div className="job">
                                                            <div className="company-logo">
                                                                com
                                                            </div>
                                                            <div className="position">
                                                                <h1 className="title">
                                                                    title
                                                                </h1>
                                                                <h1 className="company">
                                                                    comapnyname
                                                                </h1>
                                                            </div>
                                                        </div>
                                                        <div className="info">
                                                            <span className="duration">
                                                                duration
                                                            </span>
                                                            <span className="details">
                                                                <p className="goals">
                                                                    goals
                                                                </p>
                                                                <p className="efforts">
                                                                    efforts
                                                                </p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <div className="experiences">
                                                    <div className="experiences-wrap">
                                                        <div className="job">
                                                            <div className="company-logo">
                                                                com
                                                            </div>
                                                            <div className="position">
                                                                <h1 className="title">
                                                                    title
                                                                </h1>
                                                                <h1 className="company">
                                                                    comapnyname
                                                                </h1>
                                                            </div>
                                                        </div>
                                                        <div className="info">
                                                            <span className="duration">
                                                                duration
                                                            </span>
                                                            <span className="details">
                                                                <p className="goals">
                                                                    goals
                                                                </p>
                                                                <p className="efforts">
                                                                    efforts
                                                                </p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                <div className="experiences">
                                                    <div className="experiences-wrap">
                                                        <div className="job">
                                                            <div className="company-logo">
                                                                com
                                                            </div>
                                                            <div className="position">
                                                                <h1 className="title">
                                                                    title
                                                                </h1>
                                                                <h1 className="company">
                                                                    comapnyname
                                                                </h1>
                                                            </div>
                                                        </div>
                                                        <div className="info">
                                                            <span className="duration">
                                                                duration
                                                            </span>
                                                            <span className="details">
                                                                <p className="goals">
                                                                    goals
                                                                </p>
                                                                <p className="efforts">
                                                                    efforts
                                                                </p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );

    return (
        <main className="profile-grid">
            {renderNavigation()}
            {renderIntroduction()}
            {renderContent()}
        </main>
    );
};

export default ProfilePage;
