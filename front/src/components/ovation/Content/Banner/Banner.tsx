import Image from "next/image";
import { profileInfo } from "@/lib/utils/constants";

const Banner = () => {
    const { content } = profileInfo;

    return (
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
                        {content.interactions.map((interaction) => (
                            <div
                                className="interaction"
                                key={interaction.interaction}
                            >
                                <div className="interaction-icon">
                                    {interaction.icon({})}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="profile-edit">
                        <div className="edit-text">
                            {content.editProfileButton.text}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
