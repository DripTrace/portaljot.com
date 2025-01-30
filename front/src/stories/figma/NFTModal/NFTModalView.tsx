import BAYC from "./BAYC";
import NFTModal from "./NFTModal";
import NFTView from "./NFTView";
import "./nft-modal-view.css";

export const NFTModalView: React.FC = () => {
    return (
        <article>
            <section className="">
                <NFTModal />
                {/* <BAYC /> */}
                {/* <NFTView /> */}
            </section>
        </article>
    );
};
