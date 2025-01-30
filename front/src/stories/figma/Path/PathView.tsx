import { Connect } from "aws-sdk";
import "./path-card-view.css";
import PathCardView from "./PathCardView";
// import PathCardView from "./ArtistCard";

export const PathView: React.FC = () => {
    return (
        <article>
            <section className="">
                <PathCardView />
            </section>
        </article>
    );
};
