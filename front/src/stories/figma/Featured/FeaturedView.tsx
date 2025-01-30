import About from "./About";
import Favorites from "./Favorites";
import Featured from "./Featured";
import PortfolioView from "./PortfolioView";
import "./featured-view.css";

export const FeaturedView: React.FC = () => {
    return (
        <article>
            <section className="">
                {/* <Featured /> */}
                {/* <PortfolioView /> */}
                {/* <Favorites /> */}
                <About />
            </section>
        </article>
    );
};
