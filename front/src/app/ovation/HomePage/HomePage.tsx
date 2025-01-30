"use client";

import HomeFeatured from "@/components/HomeComponents/HomeFeatured";
import HomeGetStarted from "@/components/HomeComponents/HomeGetStarted";
import HomeMostViewed from "@/components/HomeComponents/HomeMostViewed";
import HomeSearch from "@/components/HomeComponents/HomeSearch";
import HomeTopBadgedHolder from "@/components/HomeComponents/HomeTopBadgeHolder";
// import HomeFeatured from "@/components/HomeFeatured";
// import HomeGetStarted from "@/components/HomeGetStarted";
// import HomeMostViewed from "@/components/HomeMostViewed";
// import HomeSearch from "@/components/HomeSearch";
// import HomeTopBadgedHolder from "@/components/HomeTopBadgedHolder";
import { HomeInfo } from "@/lib/utils/constants";
import Image from "next/image";
import Link from "next/link";

const HomePage: React.FC = () => {
    const { navigation, introduction, content } = HomeInfo;

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
                                {tab.name}
                            </span>
                        </a>
                    ))}
                </nav>
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
            <div
                className="introduction-end"
                // style={{
                //     left: "calc((50% - 5.107rem) + 38.529rem)",
                //     top: "calc(50% - 1.263rem)",
                // }}
            >
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
                <Image
                    src={introduction.walletInfo.profileImage}
                    alt={introduction.walletInfo.alternative}
                    height={introduction.walletInfo.dimensions.height}
                    width={introduction.walletInfo.dimensions.width}
                    className="introduction-end-avatar"
                />
            </div>
        </header>
    );

    const renderContent = () => (
        <main className="main-content">
            <HomeSearch />
            <HomeGetStarted />
            <div className="home-content">
                <div className="hcl">
                    <HomeFeatured />
                    <HomeTopBadgedHolder />
                </div>
                <HomeMostViewed />
            </div>
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

export default HomePage;
