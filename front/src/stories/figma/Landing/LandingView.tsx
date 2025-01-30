import AsSeenOn from "./AsSeenOn";
import Hero from "./Hero";
import Explanation from "./Explanation";
import WhatWeDo from "./WhatWeDo";
import "./landing-view.css";
import Banner from "./Banner";
import Partners from "./Partners";
import More from "./More";
import Footer from "./Footer";
import Land from "./Land";

export const LandingView: React.FC = () => {
    return (
        <article>
            <section className="">
                {/* <Hero />
                <AsSeenOn />
                <WhatWeDo />
                <Explanation />
                <Banner />
                <Partners />
                <More />
                <Footer /> */}
                <Land />
            </section>
        </article>
    );
};
