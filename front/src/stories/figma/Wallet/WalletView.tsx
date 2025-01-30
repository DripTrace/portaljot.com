import { Connect } from "aws-sdk";
import "./connect-wallet-view.css";
import ConnectWallet from "./ConnectWallet";
import CreateWallet from "./CreateWallet";
import WalletInfo from "./WalletInfo";

export const WalletView: React.FC = () => {
    return (
        <article>
            <section className="">
                {/* <ConnectWallet /> */}
                {/* <CreateWallet /> */}
                <WalletInfo />
            </section>
        </article>
    );
};
