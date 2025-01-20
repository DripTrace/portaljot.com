interface Props {
    init?: any;
    isReady?: boolean;
}

const Intro: React.FC<Props> = ({ init, isReady }) => {
    return (
        <header className={isReady ? "hidden intro" : "intro"}>
            <div className="intro__content">
                <h1>Magic Painter</h1>
                <button onClick={init} className="blob-btn">
                    <span className="blob-text">Start painting</span>
                    <span className="blob-btn__inner">
                        <span className="blob-btn__blobs">
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                            <span className="blob-btn__blob"></span>
                        </span>
                    </span>
                </button>
                <p>
                    Created by <strong>Russell Palma</strong>
                </p>
                <p>
                    <a
                        href="https://RussellPalma.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Hashnode
                    </a>{" "}
                    |
                    <a
                        href="https://twitter.com/rPalmPinoy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Twitter
                    </a>{" "}
                    |
                    <a
                        href="https://PalmaView.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Support my work
                    </a>
                    |
                    <a
                        href="https://russpalms.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Personal website
                    </a>
                </p>
            </div>
        </header>
    );
};

export default Intro;
