import { profileInfo } from "@/lib/utils/constants";
import Image from "next/image";

const Wallet = () => {
    const { introduction } = profileInfo;

    return (
        <div className="wallet">
            <div className="wallet-wrap">
                <div className="wallet-nft">
                    <Image
                        className="nft-display"
                        src={introduction.walletInfo.profileImage}
                        alt={introduction.walletInfo.alternative}
                        width={introduction.walletInfo.dimensions.width}
                        height={introduction.walletInfo.dimensions.height}
                    />
                </div>
                <div className="wallet-details">
                    <div className="wallet-information">
                        <span className="wallet-address-wrap">
                            <h2 className="wallet-address">
                                {introduction.walletInfo.walletId}
                            </h2>
                        </span>
                        <div className="currency">
                            <span className="currency-details">
                                <h3 className="token-amount">
                                    {introduction.walletInfo.tokenCount}
                                </h3>
                                <h3 className="token-kind">
                                    {introduction.walletInfo.tokenName}
                                </h3>
                            </span>
                            <div className="option-icon">
                                {introduction.walletInfo.options({})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
