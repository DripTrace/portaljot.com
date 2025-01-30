import Gauge from "@/components/Chart/Gauge";
import dynamic from "next/dynamic";

// const Gauge = dynamic(() => import("@/components/Chart/Gauge"), {
//     ssr: false,
//     loading: () => <div>Loading...</div>,
// });
import Graph from "@/components/Chart/Graph";
import { profileInfo } from "@/lib/utils/constants";
import { ComponentType, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
// import { ClientOnly } from "@/components/Error";
// import DynamicGauge from "@/components/Error/DynamicGauge";

// function useClientOnly<T extends ComponentType<any>>(Component: T): T | null {
//     const [ClientOnlyComponent, setClientOnlyComponent] = useState<T | null>(
//         null
//     );

//     useEffect(() => {
//         setClientOnlyComponent(() => Component);
//     }, [Component]);

//     return ClientOnlyComponent;
// }

// const DynamicGauge = dynamic(
//     () => import("@/components/Error/ClientOnly").then((mod) => mod.default),
//     {
//         ssr: false,
//         loading: () => <p>Loading...</p>,
//     }
// );

// const GaugeComponent = dynamic(() => import("@/components/Chart/Gauge"), {
//     ssr: false,
// });

// function useClientOnly<T extends ComponentType<P>, P = {}>(
//     Component: T
// ): T | null {
//     const [ClientOnlyComponent, setClientOnlyComponent] = useState<T | null>(
//         null
//     );

//     useEffect(() => {
//         setClientOnlyComponent(() => Component);
//     }, [Component]);

//     return ClientOnlyComponent;
// }

const Tabs = () => {
    // const ClientGauge = useClientOnly(Gauge);
    // const ClientGauge = useClientOnly<ComponentType<any>>(Gauge);

    // const [isMounted, setIsMounted] = useState(false);

    const { content } = profileInfo;

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
    };

    //     function useClientOnly<T extends ComponentType<P>, P =  const [ClientOnlyComponent, setClientOnlyComponent] = useState<T | null>(null);

    //     useEffect(() => {
    //       setClientOnlyComponent(() => Component);
    //     }, [Component]);

    //     return ClientOnlyComponent;
    //   }

    // const useClientOnly = <T extends ReactNode>(
    //     callback: () => T
    // ): T | null => {
    //     const [output, setOutput] = useState<T | null>(null);

    //     useEffect(() => {
    //         setOutput(callback());
    //     }, [callback]);

    //     return output;
    // };

    // const Gauge = useClientOnly(() => <Gauge/>);

    useEffect(() => {
        console.log("current state: ", isActiveTab);
        console.log("tab selection: ", tabSelect);
    }, [tabSelect]);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    return (
        // <ErrorBoundary>
        <div className="profile-tab-section">
            <div className="profile-tab-section-selection">
                {/* {content.navTabs.map((tab) => (
                    <button
                    className={`${tabSelect == tab ? "profile-tab-button-selected" : "profile-tab-button"}`}
                    onClick={() => {
                        handleTabSelect(tab);
                    }}
                >
                    <h5
                        className={`${tabSelect == tab ? "profile-tab-selected" : "profile-tab"}`}
                    >
                        {tab}
                    </h5>
                </button>
                ))} */}
                <button
                    className={`${tabSelect == `${content.navTabs[0]}` ? "profile-tab-button-selected" : "profile-tab-button"}`}
                    onClick={() => {
                        handleTabSelect("posts");
                    }}
                >
                    <h5
                        className={`${tabSelect == `${content.navTabs[0]}` ? "profile-tab-selected" : "profile-tab"}`}
                    >
                        {content.navTabs[0]}
                    </h5>
                </button>
                <button
                    className={`${tabSelect == `${content.navTabs[1]}` ? "profile-tab-button-selected" : "profile-tab-button"}`}
                    onClick={() => {
                        handleTabSelect("replies");
                    }}
                >
                    <h5
                        className={`${tabSelect == `${content.navTabs[1]}` ? "profile-tab-selected" : "profile-tab"}`}
                    >
                        {content.navTabs[1]}
                    </h5>
                </button>
                <button
                    className={`${tabSelect == `${content.navTabs[2]}` ? "profile-tab-button-selected" : "profile-tab-button"}`}
                    onClick={() => {
                        handleTabSelect("portfolio");
                    }}
                >
                    <h5
                        className={`${tabSelect == `${content.navTabs[2]}` ? "profile-tab-selected" : "profile-tab"}`}
                    >
                        {content.navTabs[2]}
                    </h5>
                </button>
                <button
                    className={`${tabSelect == `${content.navTabs[3]}` ? "profile-tab-button-selected" : "profile-tab-button"}`}
                    onClick={() => {
                        handleTabSelect("created");
                    }}
                >
                    <h5
                        className={`${tabSelect == `${content.navTabs[3]}` ? "profile-tab-selected" : "profile-tab"}`}
                    >
                        {content.navTabs[3]}
                    </h5>
                </button>
                <button
                    className={`${tabSelect == `${content.navTabs[4]}` ? "profile-tab-button-selected" : "profile-tab-button"}`}
                    onClick={() => {
                        handleTabSelect("stats");
                    }}
                >
                    <h5
                        className={`${tabSelect == `${content.navTabs[4]}` ? "profile-tab-selected" : "profile-tab"}`}
                    >
                        {content.navTabs[4]}
                    </h5>
                </button>
                <button
                    className={`${tabSelect == `${content.navTabs[5]}` ? "profile-tab-button-selected" : "profile-tab-button"}`}
                    onClick={() => {
                        handleTabSelect("experience");
                    }}
                >
                    <h5
                        className={`${tabSelect == `${content.navTabs[5]}` ? "profile-tab-selected" : "profile-tab"}`}
                    >
                        {content.navTabs[5]}
                    </h5>
                </button>
            </div>
            <div className="profile-tab-selected-container">
                <div
                    className={`${tabSelect == "portfolio" ? "selection" : "hidden"}`}
                >
                    <div className="portfolio">
                        <div className="portfolio-header">
                            <div className="portfolio-header-text-wrap">
                                <div className="portfolio-header-text">
                                    {content.nftsHeader}
                                </div>
                            </div>
                            <div className="portfolio-filter-wrap">
                                <div className="portfolio-collection">
                                    <div className="portfolio-collection-filter">
                                        {content.tabsContent.portfolioFilters.map(
                                            (filters) => (
                                                <button className="filters-button">
                                                    <span className="filters">
                                                        <h4 className="filter-name">
                                                            {filters.filter}
                                                        </h4>
                                                        <h4 className="filter-stock">
                                                            {content.wrapLeft}
                                                            {filters.count}
                                                            {content.wrapRight}
                                                        </h4>
                                                    </span>
                                                </button>
                                            )
                                        )}
                                    </div>
                                    <div className="portfolio-filters">
                                        <div className="portfolio-filter">
                                            <h4 className="filter-text">
                                                {
                                                    content.tabsContent
                                                        .filtersText
                                                }
                                            </h4>
                                            <div className="filter-icon">
                                                {content.tabsContent.filtersIcon(
                                                    {}
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="portfolio-wrap">
                            <div className="portfolio-container">
                                {content.tabsContent.nfts.map((nft) => (
                                    <div
                                        className="portfolio-item"
                                        key={nft.mint}
                                    >
                                        <div className="favorite">
                                            {content.tabsContent.favoriteIcon(
                                                {}
                                            )}
                                        </div>
                                        <Image
                                            className="nft"
                                            src={nft.imageUrl}
                                            alt={nft.alternate}
                                            height={nft.height}
                                            width={nft.width}
                                        />
                                        <div className="nft-detail-wrap">
                                            <div className="nft-details">
                                                <div className="artist-info">
                                                    <h6 className="nft-text-header">
                                                        {nft.artist}
                                                    </h6>
                                                    <h3 className="nft-text-detail">
                                                        {nft.name}
                                                    </h3>
                                                </div>
                                                <div className="nft-info">
                                                    <h6 className="nft-text-header">
                                                        {content.priceText}
                                                    </h6>
                                                    <span className="nft-price">
                                                        <h3 className="nft-value">
                                                            {
                                                                nft.valuation
                                                                    .price
                                                            }
                                                        </h3>
                                                        <h3 className="nft-currency">
                                                            {
                                                                nft.valuation
                                                                    .currency
                                                            }
                                                        </h3>
                                                    </span>
                                                </div>
                                            </div>
                                            <hr className="detail-separator" />
                                            <div className="nft-options">
                                                <div className="nft-rep">
                                                    <div className="nft-favorites">
                                                        <div className="favorite-icon">
                                                            {content.tabsContent.favoriteIcon(
                                                                {}
                                                            )}
                                                        </div>
                                                        <h5 className="favorite-number">
                                                            {nft.likes}
                                                        </h5>
                                                    </div>
                                                    <button className="hide-button">
                                                        <h5 className="hide">
                                                            {
                                                                content
                                                                    .tabsContent
                                                                    .hideText
                                                            }
                                                        </h5>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                    {content.tabsContent.stats.overviewText}
                                </h2>
                            </div>
                            <div className="overview">
                                <div className="overview-content">
                                    <div className="overview-wrap">
                                        <span className="stat-title">
                                            {content.tabsContent.stats.nftText}
                                            {content.wrapLeft}
                                            {content.plural}
                                            {content.wrapRight}
                                            {content.textExpansion}
                                            {
                                                content.tabsContent.stats
                                                    .createdText
                                            }
                                        </span>
                                        <h1 className="stat">
                                            {
                                                content.tabsContent.stats
                                                    .nftsCreated
                                            }
                                        </h1>
                                    </div>
                                </div>
                                <div className="overview-content">
                                    <div className="overview-wrap">
                                        <span className="stat-title">
                                            {content.tabsContent.stats.nftText}
                                            {content.wrapLeft}
                                            {content.plural}
                                            {content.wrapRight}
                                            {content.textExpansion}
                                            {
                                                content.tabsContent.stats
                                                    .collectedText
                                            }
                                        </span>
                                        <h1 className="stat">
                                            {
                                                content.tabsContent.stats
                                                    .nftsCollected
                                            }
                                        </h1>
                                    </div>
                                </div>
                                <div className="overview-content">
                                    <div className="overview-wrap">
                                        <span className="stat-title">
                                            {
                                                content.tabsContent.stats
                                                    .totalText
                                            }
                                        </span>
                                        <h1 className="stat">
                                            {
                                                content.tabsContent.stats
                                                    .totalNFTCount
                                            }
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
                                                {
                                                    content.tabsContent.stats
                                                        .nftAssetText
                                                }
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
                                                        {/* {isMounted && <Gauge />} */}
                                                        {/* {Gauge} */}
                                                        {/* {ClientGauge && (
                                                            <ClientGauge />
                                                        )} */}
                                                        {/* <ClientOnly>
                                                            <DynamicGauge />
                                                        </ClientOnly> */}
                                                        {/* <DynamicGauge
                                                            component={
                                                                GaugeComponent
                                                            }
                                                        /> */}
                                                        {/* <DynamicGauge /> */}
                                                    </div>
                                                </div>

                                                <div className="chart-index">
                                                    <div className="indices">
                                                        {content.tabsContent.stats.chartIndicies.map(
                                                            (stat) => (
                                                                <div
                                                                    className="index"
                                                                    key={
                                                                        stat.chartId
                                                                    }
                                                                >
                                                                    <div className="indicator">
                                                                        {
                                                                            stat
                                                                                .color[0]
                                                                        }
                                                                    </div>
                                                                    <h6 className="index-title">
                                                                        {
                                                                            stat.asset
                                                                        }
                                                                    </h6>
                                                                </div>
                                                            )
                                                        )}
                                                        {/* <div className="index">
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
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stats-wrap">
                                        <div className="value">
                                            <h3 className="stat-header">
                                                {
                                                    content.tabsContent.stats
                                                        .valueText
                                                }
                                            </h3>
                                            <div className="stat-details">
                                                <div className="graph-details">
                                                    <h2 className="value-stat">
                                                        {
                                                            content.tabsContent
                                                                .stats
                                                                .countryCurrency
                                                        }
                                                        {
                                                            content.tabsContent
                                                                .stats
                                                                .portfolioValue
                                                        }
                                                    </h2>
                                                    <div className="value-graph">
                                                        <Graph />
                                                    </div>
                                                </div>
                                                <div className="graph-axis">
                                                    <div className="axes">
                                                        {content.tabsContent.stats.graphAxies.map(
                                                            (graph) => (
                                                                <div
                                                                    className="axis"
                                                                    key={
                                                                        graph.dayId
                                                                    }
                                                                >
                                                                    <h6 className="axis-text">
                                                                        {
                                                                            graph.day
                                                                        }
                                                                    </h6>
                                                                </div>
                                                            )
                                                        )}
                                                        {/* <div className="axis">
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
                                                        </div> */}
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
                                        {
                                            content.tabsContent.stats
                                                .transactions.transactionHeader
                                        }
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
                                                            {
                                                                content
                                                                    .tabsContent
                                                                    .stats
                                                                    .transactions
                                                                    .headerRow[0]
                                                            }
                                                        </h5>
                                                    </th>
                                                    <th className="header-text-container">
                                                        <h5 className="header-text">
                                                            {
                                                                content
                                                                    .tabsContent
                                                                    .stats
                                                                    .transactions
                                                                    .headerRow[1]
                                                            }
                                                        </h5>
                                                    </th>
                                                    <th className="header-text-container">
                                                        <h5 className="header-text">
                                                            {
                                                                content
                                                                    .tabsContent
                                                                    .stats
                                                                    .transactions
                                                                    .headerRow[2]
                                                            }
                                                        </h5>
                                                    </th>
                                                    <th className="header-text-container">
                                                        <h5 className="header-text">
                                                            {
                                                                content
                                                                    .tabsContent
                                                                    .stats
                                                                    .transactions
                                                                    .headerRow[3]
                                                            }
                                                        </h5>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-row">
                                                {content.tabsContent.stats.transactions.transaction.map(
                                                    (t) => (
                                                        <tr className="row-wrap">
                                                            <td className="row-choice">
                                                                <div className="row-item">
                                                                    i
                                                                </div>
                                                                <h5 className="row-description">
                                                                    {t.type}
                                                                </h5>
                                                            </td>
                                                            <td className="row-text">
                                                                {t.timestamp}
                                                            </td>
                                                            <td className="nft-item">
                                                                <div className="item-image">
                                                                    g
                                                                </div>
                                                                <h4 className="item-text">
                                                                    {
                                                                        t
                                                                            .collection
                                                                            .collectionName
                                                                    }
                                                                </h4>
                                                            </td>
                                                            <td className="nft-value-details">
                                                                <h4 className="nft-value-price">
                                                                    {
                                                                        t.price
                                                                            .amount
                                                                    }
                                                                </h4>
                                                                <h4 className="nft-value-currency">
                                                                    {
                                                                        t.price
                                                                            .token
                                                                    }
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                                {/* <tr className="row-wrap">
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
                                                </tr> */}
                                            </tbody>
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
                                    {content.navTabs[5]}
                                </h2>
                            </div>

                            <div className="experience-edit">
                                <div className="edit-options">
                                    <div className="add">
                                        {content.tabsContent.addIcon({})}
                                    </div>
                                    <div className="change">
                                        {content.tabsContent.changeIcon({})}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="experience-container">
                            <div className="experience-wrap">
                                {content.tabsContent.experience.map(
                                    (experiences) => (
                                        <div
                                            className="experiences"
                                            key={experiences.experienceId}
                                        >
                                            <div className="experiences-wrap">
                                                <div className="job">
                                                    <div className="company-logo">
                                                        {experiences.companyLogo(
                                                            {}
                                                        )}
                                                    </div>
                                                    <div className="position">
                                                        <h1 className="title">
                                                            {
                                                                experiences.position
                                                            }
                                                        </h1>
                                                        <h1 className="company">
                                                            {
                                                                experiences.company
                                                            }
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className="info">
                                                    <span className="duration">
                                                        {experiences.duration}
                                                    </span>
                                                    <span className="details">
                                                        <p className="goals">
                                                            {
                                                                experiences
                                                                    .description
                                                                    .goals
                                                            }
                                                        </p>
                                                        <p className="efforts">
                                                            {
                                                                experiences
                                                                    .description
                                                                    .efforts
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // {/* </ErrorBoundary> */}
    );
};

export default Tabs;
