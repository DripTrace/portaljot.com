"use client";

// import ViewAll from "@/components/ViewAll";
import { HomeInfo } from "@/lib/utils/constants";
import Image from "next/image";
import Link from "next/link";
import ViewAll from "../Buttons/ViewAll";

const HomeMostViewed = () => {
    const {
        navigation,
        introduction,
        content,
    }: {
        navigation: any;
        introduction: any;
        content: { mostviewed: { [key: string]: any } };
    } = HomeInfo;
    return (
        <div className="hcr">
            <div className="flex mx-4 mt-4 items-center">
                <div className="text-lg font-medium">
                    {content.mostviewed.name}
                </div>
                <div className="flex justify-end flex-grow">
                    <Link href="/">
                        <ViewAll />
                    </Link>
                </div>
            </div>
            <div className="mv-container">
                <div className="flex h-28">
                    <Image
                        src={content.mostviewed.profile0.banner1.source}
                        height={
                            content.mostviewed.profile0.banner1.dimensions
                                .height
                        }
                        width={
                            content.mostviewed.profile0.banner1.dimensions.width
                        }
                        alt={content.mostviewed.profile0.banner1.alternative}
                        className="mv-topbanner1"
                    />
                    <Image
                        src={content.mostviewed.profile0.banner2.source}
                        height={
                            content.mostviewed.profile0.banner2.dimensions
                                .height
                        }
                        width={
                            content.mostviewed.profile0.banner2.dimensions.width
                        }
                        alt={content.mostviewed.profile0.banner2.alternative}
                        className="mv-topbanner2"
                    />
                </div>
                <div className="mv-midcontainer">
                    <Image
                        src={content.mostviewed.profile0.pfp.source}
                        height={
                            content.mostviewed.profile0.pfp.dimensions.height
                        }
                        width={content.mostviewed.profile0.pfp.dimensions.width}
                        alt={content.mostviewed.profile0.pfp.alternative}
                        className="feat-pfp"
                    />
                    <div className="mv-namecontainer">
                        <div className="mv-name">
                            {content.mostviewed.profile0.name}
                        </div>
                        <Link
                            className="mv-user"
                            href={content.mostviewed.profile0.path}
                        >
                            {content.mostviewed.profile0.user}
                        </Link>
                    </div>
                    <div className="mv-viewscontainer">
                        <div className="mv-views">
                            Views: {content.mostviewed.profile0.views}
                        </div>
                    </div>
                </div>
                <div className="mv-bio">{content.mostviewed.profile0.bio}</div>
            </div>

            {Object.keys(content.mostviewed)
                .filter(
                    (key) =>
                        key.startsWith("profile") &&
                        parseInt(key.replace("profile", "")) >= 1
                )
                .map((key, index) => {
                    const profile = content.mostviewed[key];
                    return (
                        <div className="mv-container">
                            <div className="mv-midcontainer" key={index}>
                                <Image
                                    src={profile.pfp.source}
                                    height={profile.pfp.dimensions.height}
                                    width={profile.pfp.dimensions.width}
                                    alt={profile.pfp.alternative}
                                    className="feat-pfp"
                                />
                                <div className="mv-namecontainer">
                                    <div className="mv-name">
                                        {profile.name}
                                    </div>
                                    <Link
                                        className="mv-user"
                                        href={profile.path}
                                    >
                                        {profile.user}
                                    </Link>
                                </div>
                                <div className="mv-viewscontainer">
                                    <div className="mv-views">
                                        Views: {profile.views}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default HomeMostViewed;
