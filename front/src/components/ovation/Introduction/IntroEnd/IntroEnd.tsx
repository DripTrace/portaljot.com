import { profileInfo } from "@/lib/utils/constants";
import Image from "next/image";

const IntroEnd = () => {
    const { introduction } = profileInfo;

    return (
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
    );
};

export default IntroEnd;
