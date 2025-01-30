// import "link-view.css";
import { LinkView as LinkViewType } from "./LinkView.mocks";
// import styles from "./LinkView.module.css";

const LinkView: React.FC<{ linkView: LinkViewType }> = ({ linkView }) => {
    return (
        <>
            <div className="link-view p-4 shadow-lg rounded bg-white hover:bg-gray-100 cursor-pointer">
                <a
                    href={linkView.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-500 hover:underline`}
                >
                    {linkView.label}
                </a>
                {/* <HypePage /> */}
                {/* <ProfilePage /> */}
            </div>
            {/* <HypePage /> */}
        </>
    );
};

export default LinkView;
