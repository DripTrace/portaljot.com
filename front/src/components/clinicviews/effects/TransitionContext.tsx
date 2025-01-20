// src/components/effects/TransitionContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";

interface TransitionLinkProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

interface TransitionContextType {
    TransitionLink: React.FC<TransitionLinkProps>;
    nextUrl: string | null;
    setNextUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransitionContext = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error(
            "useTransitionContext must be used within a TransitionProvider"
        );
    }
    return context;
};

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.href;
        setNextUrl(href);
    };

    const TransitionLink: React.FC<TransitionLinkProps> = ({
        href,
        className,
        children,
    }) => (
        <Link href={href} onClick={handleLinkClick} className={className}>
            {children}
        </Link>
    );

    return (
        <TransitionContext.Provider
            value={{ TransitionLink, nextUrl, setNextUrl }}
        >
            {children}
        </TransitionContext.Provider>
    );
};
