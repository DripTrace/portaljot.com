import HypeAudioVisual from "@/components/Hype/HypeAudioVisual";
import HypeLogo from "@/components/Hype/HypeLogo";
import HypeMessage from "@/components/Hype/HypeMessage";
import HypePreview from "@/components/Hype/HypePreview";

const HypePage = () => {
    return (
        <>
            {/* <HypePlay /> */}
            <HypePreview />
            <div className="hype">
                <div className="top-hype">
                    <HypeAudioVisual />
                    <HypeLogo />
                </div>
                <div className="bottom-hype">
                    <HypeMessage />
                </div>
            </div>
        </>
    );
};

export default HypePage;
