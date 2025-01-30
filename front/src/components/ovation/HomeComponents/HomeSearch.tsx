"use client";
import { HomeInfo } from "@/lib/utils/constants";
import Image from "next/image";

const HomeSearch = () => {
    const { navigation, introduction, content } = HomeInfo;
    return (
        <div>
            <Image
                src={content.searchbg.source}
                height={content.searchbg.dimensions.height}
                width={content.searchbg.dimensions.width}
                alt={content.searchbg.alternative}
                className="search-banner"
            />
            <div className="search-container">
                <div className="search-container2">
                    {content.searchIcon.icon({ className: "icon-search mr-2" })}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar mt-5"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
