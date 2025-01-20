"use client";

import { compose, withState, withHandlers } from "recompose";
import {
    ButtonShell,
    ButtonTag,
    GreenHubProductionsLogo,
    IntroductionContainer,
    IntroductionLink,
    LinkMenu,
    LogoShell,
    MenuIcon,
    MobileMenu,
    SigninButton,
} from "./IntroductionElements";
import Link from "next/link";

type HandlerProps = {
    selectedTabId: number;
    setSelectedTabId: (id: number) => void;
};

type IntroductionProps = {
    toggle: () => void;
    pointer: () => void;
    handleInformationDirect: () => void;
    handleServicesDirect: () => void;
    handlePoliciesDirect: () => void;
    clipDisplayed: boolean;
    isActive: (id: number) => boolean;
    setActiveTab: (id: number) => void;
};

export const enhancer = compose<IntroductionProps, IntroductionProps>(
    withState("selectedTabId", "setSelectedTabId", 0),
    withHandlers<
        HandlerProps,
        {
            isActive: (id: number) => boolean;
            setActiveTab: (id: number) => void;
        }
    >({
        isActive:
            ({ selectedTabId }) =>
            (id: number) => {
                return selectedTabId === id;
            },
        setActiveTab:
            ({ setSelectedTabId }) =>
            (id: number) => {
                setSelectedTabId(id);
            },
    })
);

type TabProps = {
    content: string;
    isActive: boolean;
    onActiveTab: () => void;
    scrollToSection: () => void;
};

export const Tab: React.FC<TabProps> = ({
    content,
    isActive,
    onActiveTab,
    scrollToSection,
}) => {
    return (
        <IntroductionLink
            isActive={isActive}
            onClick={() => {
                onActiveTab();
                scrollToSection();
            }}
        >
            {content}
        </IntroductionLink>
    );
};

type TabsProps = {
    introductionItems: {
        id: number;
        label: string;
        scrollToSection: () => void;
    }[];
    isActive: (id: number) => boolean;
    setActiveTab: (id: number) => void;
};

export const Tabs: React.FC<TabsProps> = ({
    introductionItems,
    isActive,
    setActiveTab,
}) => {
    return (
        <LinkMenu>
            {introductionItems.map((introductionItem, i) => (
                <Tab
                    key={i}
                    content={introductionItem.label}
                    isActive={isActive(introductionItem.id)}
                    onActiveTab={() => setActiveTab(introductionItem.id)}
                    scrollToSection={introductionItem.scrollToSection}
                />
            ))}
        </LinkMenu>
    );
};

const Introduction: React.ComponentType<IntroductionProps> = enhancer(
    ({
        toggle,
        pointer,
        handleInformationDirect,
        handleServicesDirect,
        handlePoliciesDirect,
        clipDisplayed,
        isActive,
        setActiveTab,
    }) => {
        const introductionItems = [
            {
                id: 1,
                label: "Information",
                scrollToSection: () =>
                    document.getElementById("information")?.scrollIntoView({
                        behavior: "smooth",
                    }),
            },
            {
                id: 2,
                label: "Services",
                scrollToSection: () =>
                    document.getElementById("services")?.scrollIntoView({
                        behavior: "smooth",
                    }),
            },
            {
                id: 3,
                label: "Policies",
                scrollToSection: () =>
                    document.getElementById("policies")?.scrollIntoView({
                        behavior: "smooth",
                    }),
            },
        ];

        const toggleHome = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        return (
            <IntroductionContainer>
                <Link href="/display" passHref>
                    <LogoShell>
                        <GreenHubProductionsLogo
                            onClick={toggleHome}
                            onMouseEnter={pointer}
                            onMouseLeave={pointer}
                        >
                            Green Spot Productions
                        </GreenHubProductionsLogo>
                    </LogoShell>
                </Link>
                <MobileMenu onClick={toggle}>
                    <MenuIcon />
                </MobileMenu>
                <Tabs
                    introductionItems={introductionItems}
                    isActive={isActive}
                    setActiveTab={setActiveTab}
                />
                <ButtonShell>
                    <Link href="/display/signin" passHref>
                        <SigninButton>
                            <ButtonTag>Sign In</ButtonTag>
                        </SigninButton>
                    </Link>
                </ButtonShell>
            </IntroductionContainer>
        );
    }
);

export default Introduction;
