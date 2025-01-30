import { profileInfo } from "@/lib/utils/constants";

const Marker = () => {
    const { content } = profileInfo;

    return (
        <div className="marker">
            <div className="profile-image-wrap">
                <div className="profile-image-box">
                    {content.userInfo.userImage.placeHolder}
                </div>
            </div>
            <div className="identity-wrap">
                <div className="identity">
                    <span className="display-name">
                        {content.userInfo.displayName}
                    </span>
                    <div className="connect">
                        {content.userInfo.memberTypeIcon.socialIdentifier({})}
                    </div>
                </div>
            </div>
            <div className="handle-wrap">
                <div className="handle">
                    <span className="user-name">
                        {content.userInfo.username}
                    </span>
                    <div className="ova-stock">
                        <span className="token-mention">
                            {content.userInfo.ovsTokenDetails.tokenMention}
                        </span>
                        <span className="balance">
                            {content.userInfo.ovsTokenDetails.tokenCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marker;
