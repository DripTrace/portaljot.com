"use client";

import React, {
    useState,
    useRef,
    useEffect,
    createContext,
    useContext,
} from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Link from "next/link";

const paths = {
    step1: {
        unfilled: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
        inBetween: {
            curve1: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
            curve2: "M 0 100 V 50 Q 50 100 100 50 V 100 z",
        },
        filled: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
    },
    step2: {
        filled: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
        inBetween: {
            curve1: "M 0 0 V 50 Q 50 0 100 50 V 0 z",
            curve2: "M 0 0 V 50 Q 50 100 100 50 V 0 z",
        },
        unfilled: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
    },
};

interface TransitionLinkProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const TransitionLinkContext =
    createContext<React.FC<TransitionLinkProps> | null>(null);

export const useTransitionLink = () => {
    const context = useContext(TransitionLinkContext);
    if (!context) {
        throw new Error(
            "useTransitionLink must be used within a TransitionLayout"
        );
    }
    return context;
};

export default function TransitionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const overlayPathRef = useRef<SVGPathElement>(null);
    const currentPageRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (nextUrl && !isAnimating) {
            setIsAnimating(true);
            animate(nextUrl);
        }
    }, [nextUrl, isAnimating]);

    const animate = (url: string) => {
        if (!overlayPathRef.current) return;

        gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                setNextUrl(null);
                router.push(url);
            },
        })
            .set(overlayPathRef.current, {
                attr: { d: paths.step1.unfilled },
            })
            .to(overlayPathRef.current, {
                duration: 0.8,
                ease: "power4.in",
                attr: { d: paths.step1.inBetween.curve1 },
            })
            .to(overlayPathRef.current, {
                duration: 0.2,
                ease: "power1",
                attr: { d: paths.step1.filled },
            })
            .set(overlayPathRef.current, {
                attr: { d: paths.step2.filled },
            })
            .to(overlayPathRef.current, {
                duration: 0.2,
                ease: "sine.in",
                attr: { d: paths.step2.inBetween.curve1 },
            })
            .to(overlayPathRef.current, {
                duration: 1,
                ease: "power4",
                attr: { d: paths.step2.unfilled },
            });
    };

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
        <TransitionLinkContext.Provider value={TransitionLink}>
            <div className="relative min-h-screen">
                <div
                    ref={currentPageRef}
                    className="transition-opacity duration-300"
                >
                    {children}
                </div>
                <svg
                    className="fixed inset-0 z-50 pointer-events-none w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        ref={overlayPathRef}
                        className="vector-effect-non-scaling-stroke"
                        d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
                    />
                </svg>
            </div>
        </TransitionLinkContext.Provider>
    );
}
