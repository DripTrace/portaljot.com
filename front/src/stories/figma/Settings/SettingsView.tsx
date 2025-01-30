import Changes from "./Changes";
import Settings from "./Settings";
import Socials from "./Socials";
import "./settings-view.css";

export const SettingsView: React.FC = () => {
    return (
        <article>
            <section className="">
                <Settings />
                {/* <Changes /> */}
                {/* <Socials /> */}
            </section>
        </article>
    );
};
