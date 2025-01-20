"use client";

import { useState, useRef, ReactNode } from "react";
import smoothscroll from "smoothscroll-polyfill";
import BoogeyStickman from "@/components/display/animations/BoogeyStickman";
import Navigation from "@/components/display/Navigation";
import Layout from "@/components/display/Layout";

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    const informationRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const policiesRef = useRef<HTMLDivElement>(null);

    const [pointerTransition, setPointerTransition] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [clipDisplayed, setClipDisplayed] = useState(true);
    const [selectedTabId, setSelectedTabId] = useState<number>(0);

    const handleSmoothScroll = (ref: React.RefObject<HTMLDivElement>) => {
        if (typeof window !== "undefined") {
            (window as any).__forceSmoothScrollPolyfill__ = true;
            smoothscroll.polyfill();
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleInformationDirect = () => {
        setSelectedTabId(1);
        handleSmoothScroll(informationRef);
    };

    const handleServicesDirect = () => {
        setSelectedTabId(2);
        handleSmoothScroll(servicesRef);
    };

    const handlePoliciesDirect = () => {
        setSelectedTabId(3);
        handleSmoothScroll(policiesRef);
    };

    const isActive = (id: number) => selectedTabId === id;

    const pointer = () => setPointerTransition(!pointerTransition);
    const toggle = () => setIsOpen(!isOpen);
    const redirect = () => setClipDisplayed(!clipDisplayed);

    return (
        <html lang="en" className="display-html">
            <body className="display-body">
                <BoogeyStickman
                    pointerTransition={pointerTransition}
                    pointerFix={pointerTransition}
                />
                <Navigation
                    pointer={pointer}
                    isOpen={isOpen}
                    toggle={toggle}
                    clipDisplayed={clipDisplayed}
                    redirect={redirect}
                    handleInformationDirect={handleInformationDirect}
                    handleServicesDirect={handleServicesDirect}
                    handlePoliciesDirect={handlePoliciesDirect}
                    isActive={isActive}
                    setActiveTab={setSelectedTabId}
                >
                    {children}
                </Navigation>
            </body>
        </html>
    );
}
