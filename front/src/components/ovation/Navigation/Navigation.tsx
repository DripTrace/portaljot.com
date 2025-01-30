"use client";

import { profileInfo } from "@/lib/utils/constants";
import { NavigationTabs, Logo, Wallet } from "@/components";

const Navigation = () => {
    const { navigation, introduction } = profileInfo;

    return (
        <aside className="navigation">
            <div className="navigation-content">
                <Logo site={navigation.site} tabs={navigation.tabs} />
                <NavigationTabs />
            </div>
            <Wallet />
        </aside>
    );
};

export default Navigation;
