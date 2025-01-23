"use client";

import React, {
	useState,
	useRef,
	useEffect,
	createContext,
	useContext,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import Link from "next/link";

const paths = {
	forward: {
		initial: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
		halfway: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
		final: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
	},
	backward: {
		initial: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
		halfway: "M 0 0 V 50 Q 50 100 100 50 V 0 z",
		final: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
	},
};

interface TransitionLinkProps {
	href: string;
	className?: string;
	children: React.ReactNode;
}

export const TransitionLinkContext =
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

export function TransitionLayout({ children }: { children: React.ReactNode }) {
	const [isAnimating, setIsAnimating] = useState(false);
	const [nextUrl, setNextUrl] = useState<string | null>(null);
	const overlayPathRef = useRef<SVGPathElement>(null);
	const currentPageRef = useRef<HTMLDivElement>(null);
	const nextPageRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (nextUrl && !isAnimating) {
			setIsAnimating(true);
			const isForward = nextUrl.length > (pathname?.length ?? 0);
			animate(nextUrl, isForward);
		}
	}, [nextUrl, isAnimating, pathname]);

	const animate = (url: string, isForward: boolean) => {
		if (
			!overlayPathRef.current ||
			!currentPageRef.current ||
			!nextPageRef.current
		)
			return;

		const direction = isForward ? "forward" : "backward";
		const tl = gsap.timeline({
			onComplete: () => {
				setIsAnimating(false);
				setNextUrl(null);
				router.push(url);
			},
		});

		tl.set(nextPageRef.current, {
			yPercent: isForward ? 100 : -100,
			opacity: 1,
			display: "block",
		})
			.set(overlayPathRef.current, {
				attr: { d: paths[direction].initial },
			})
			.to(overlayPathRef.current, {
				duration: 0.6,
				ease: "power2.inOut",
				attr: { d: paths[direction].halfway },
			})
			.to(
				currentPageRef.current,
				{
					yPercent: isForward ? -100 : 100,
					duration: 0.6,
					ease: "power2.inOut",
				},
				0
			)
			.to(
				nextPageRef.current,
				{
					yPercent: 0,
					duration: 0.6,
					ease: "power2.inOut",
				},
				0
			)
			.to(overlayPathRef.current, {
				duration: 0.4,
				ease: "power2.inOut",
				attr: { d: paths[direction].final },
			})
			.set(overlayPathRef.current, {
				attr: { d: paths[direction].initial },
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
			<div className="relative overflow-hidden min-h-screen">
				<div ref={currentPageRef} className="transition-transform">
					{children}
				</div>
				<div
					ref={nextPageRef}
					className="absolute top-0 left-0 w-full min-h-screen hidden"
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
						className="vector-effect-non-scaling-stroke fill-current text-white"
						d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
					/>
				</svg>
			</div>
		</TransitionLinkContext.Provider>
	);
}
