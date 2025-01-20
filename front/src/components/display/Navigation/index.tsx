"use client";

import { NavigationContainer } from "./NavigationElements";
import Introduction from "./Introduction";
import Content from "./Content";
import Sidebar from "./Introduction/Sidebar";

type NavigationProps = {
    children: React.ReactNode;
    isOpen: boolean;
    toggle: () => void;
    pointer: () => void;
    clipDisplayed: boolean;
    redirect: () => void;
    handleInformationDirect: () => void;
    handleServicesDirect: () => void;
    handlePoliciesDirect: () => void;
    isActive: (id: number) => boolean;
    setActiveTab: (id: number) => void;
};

const Navigation: React.FC<NavigationProps> = ({
    children,
    isOpen,
    toggle,
    pointer,
    clipDisplayed,
    redirect,
    handleInformationDirect,
    handleServicesDirect,
    handlePoliciesDirect,
    isActive,
    setActiveTab,
}) => {
    return (
        <NavigationContainer>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Introduction
                toggle={toggle}
                pointer={pointer}
                handleInformationDirect={handleInformationDirect}
                handleServicesDirect={handleServicesDirect}
                handlePoliciesDirect={handlePoliciesDirect}
                clipDisplayed={clipDisplayed}
                isActive={isActive}
                setActiveTab={setActiveTab}
            />
            {children}
            <Content />
        </NavigationContainer>
    );
};

export default Navigation;
