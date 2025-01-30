import { profileInfo } from "@/lib/utils/constants";

const IntroStart = () => {
    const { introduction } = profileInfo;

    return (
        <div className="introduction-start">
            <div className="introduction-start-weather-icon">
                {introduction.greeting.weather({})}
            </div>
            <h1 className="introduction-start-greeting">
                {introduction.greeting.message}
                {introduction.greeting.name}
            </h1>
        </div>
    );
};

export default IntroStart;
