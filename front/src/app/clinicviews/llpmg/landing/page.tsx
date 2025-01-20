import Landing from "@/components/LLPMG/Landing";
import NeuralNoise from "@/components/LLPMG/NeuralNoise";

export const dynamic = "auto";

const LandingPage = () => {
    return (
        <>
            {/* <video
                autoPlay
                muted
                loop
                src="/background/images/calm.mp4"
                className="absolute top-0"
            ></video> */}
            <Landing />
            {/* <NeuralNoise /> */}
        </>
    );
};

export default LandingPage;
