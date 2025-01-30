// import GaugeChart from "./GaugeChart";
import StatsTable from "./StatsTable";
import "./profile-stats-view.css";

export const ProfileStatsView: React.FC = () => {
    return (
        <article>
            <section className="">
                {/* <GaugeChart /> */}
                <StatsTable />
            </section>
        </article>
    );
};
