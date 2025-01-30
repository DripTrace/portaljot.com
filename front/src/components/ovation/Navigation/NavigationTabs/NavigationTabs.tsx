import { profileInfo } from "@/lib/utils/constants";

const NavigationTabs = () => {
    const { navigation } = profileInfo;

    return (
        <nav className="navigation-container">
            {navigation.tabs.map((tab) => (
                <a href={tab.path} className="navigation-tab" key={tab.name}>
                    <div className="navigation-tab-icon">{tab.icon({})}</div>
                    <span className="navigation-tab-text">
                        {tab.identifier}
                    </span>
                </a>
            ))}
        </nav>
    );
};

export default NavigationTabs;
