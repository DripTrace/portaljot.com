// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Check, X } from "lucide-react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// interface Price {
// 	id: string;
// 	unit_amount: number;
// 	recurring: {
// 		interval: "month" | "year";
// 	};
// }

// interface Product {
// 	id: string;
// 	name: string;
// 	description: string;
// 	metadata: {
// 		features: string;
// 	};
// 	prices: Price[];
// }

// export default function LandingComponent() {
// 	const pricingRef = useRef<HTMLDivElement>(null);
// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [billingPeriod, setBillingPeriod] = useState<"month" | "year">(
// 		"year"
// 	);
// 	const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
// 	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

// 	const handleCardHover = (index: number | null) => {
// 		setHoveredCard(index);
// 	};

// 	useEffect(() => {
// 		async function fetchProducts() {
// 			const response = await fetch("/api/stripe/get-products");
// 			const data = await response.json();
// 			setProducts(
// 				data
// 					.filter((product: Product) =>
// 						[
// 							"NexusConjure Elite Package",
// 							"Digital Catalyst Suite",
// 							"Pixel Novice Path",
// 						].includes(product.name)
// 					)
// 					.sort((a: Product, b: Product) => {
// 						const aPrice =
// 							a.prices.find(
// 								(p) => p.recurring.interval === "year"
// 							)?.unit_amount || 0;
// 						const bPrice =
// 							b.prices.find(
// 								(p) => p.recurring.interval === "year"
// 							)?.unit_amount || 0;
// 						return aPrice - bPrice; // Sort by yearly price, lowest first
// 					})
// 			);
// 		}
// 		fetchProducts();
// 	}, []);

// 	useEffect(() => {
// 		const timer = setInterval(() => {
// 			setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
// 		}, 1000);
// 		return () => clearInterval(timer);
// 	}, []);

// 	const scrollToPricing = () => {
// 		window.scrollTo({
// 			top: document.documentElement.scrollHeight,
// 			behavior: "smooth",
// 		});
// 	};

// 	const formatTime = (time: number) => {
// 		const hours = Math.floor(time / 3600);
// 		const minutes = Math.floor((time % 3600) / 60);
// 		const seconds = time % 60;
// 		return `${hours.toString().padStart(2, "0")}:${minutes
// 			.toString()
// 			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
// 	};

// 	const borderColors = [
// 		["#3b82f6", "#22d3ee", "#10b981"],
// 		["#8b5cf6", "#ec4899", "#ef4444"],
// 		["#facc15", "#f97316", "#ef4444"],
// 	];

// 	const analyzeFeatures = (
// 		features: string[],
// 		prevTierFeatures: string[] = []
// 	) => {
// 		const analyzedFeatures = features.map((feature) => {
// 			const [quantity, ...rest] = feature.split(" ");
// 			const numericQuantity = parseInt(quantity);
// 			if (!isNaN(numericQuantity)) {
// 				const prevFeature = prevTierFeatures.find((f) =>
// 					f.includes(rest.join(" "))
// 				);
// 				if (prevFeature) {
// 					const [prevQuantity] = prevFeature.split(" ");
// 					const prevNumericQuantity = parseInt(prevQuantity);
// 					if (!isNaN(prevNumericQuantity)) {
// 						const difference =
// 							numericQuantity - prevNumericQuantity;
// 						if (difference > 0) {
// 							return `+${difference} ${rest.join(
// 								" "
// 							)} (${numericQuantity} total)`;
// 						}
// 					}
// 				}
// 				return feature;
// 			}
// 			return feature;
// 		});

// 		const higherTierFeatures = features.filter(
// 			(f) => !prevTierFeatures.includes(f)
// 		);
// 		return { analyzedFeatures, higherTierFeatures };
// 	};

// 	const addPlusToUnlimited = (features: string[]) => {
// 		return features.map((feature) =>
// 			feature.includes("Unlimited") ? `+ ${feature}` : feature
// 		);
// 	};

// 	const filterFeatures = (features: string[], productName: string) => {
// 		if (productName === "Digital Catalyst Suite") {
// 			return features.filter(
// 				(feature) =>
// 					!feature.includes("Unlimited Sub accounts") &&
// 					!feature.includes("Unlimited Team members")
// 			);
// 		}
// 		if (productName === "Pixel Novice Path") {
// 			return features.filter(
// 				(feature) =>
// 					!feature.includes("15 Sub accounts") &&
// 					!feature.includes("10 Team members") &&
// 					!feature.includes("Unlimited Sub accounts") &&
// 					!feature.includes("Unlimited Team members")
// 			);
// 		}
// 		return features;
// 	};

// 	const getTopTierFeatures = () => {
// 		const topTier = products[products.length - 1];
// 		return topTier
// 			? topTier.metadata.features.split(",").map((f) => f.trim())
// 			: [];
// 	};

// 	return (
// 		<>
// 			<section className="landing-hero">
// 				<div className="landing-hero-content">
// 					<h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center leading-tight nexusconjure-title">
// 						<span className="letter animate-squeeze">N</span>
// 						<span className="letter animate-rotate">e</span>
// 						<span className="letter animate-flip">x</span>
// 						<span className="letter animate-bounce">u</span>
// 						<span className="letter animate-fade">s</span>
// 						<span className="letter animate-slide">C</span>
// 						<span className="letter animate-zoom">o</span>
// 						<span className="letter animate-shake">n</span>
// 						<span className="letter animate-tilt">j</span>
// 						<span className="letter animate-swing">u</span>
// 						<span className="letter animate-pulse">r</span>
// 						<span className="letter animate-wobble">e</span>
// 					</h1>
// 					<p className="landing-subtitle">
// 						Run your agency, in one place
// 					</p>
// 					<button
// 						className="landing-cta-button"
// 						onClick={scrollToPricing}
// 					>
// 						View Pricing
// 					</button>
// 				</div>
// 				<div className="landing-preview-container">
// 					<Image
// 						src="/assets/preview.png"
// 						alt="NexusConjure preview"
// 						width={1200}
// 						height={800}
// 						className="landing-preview-image"
// 					/>
// 				</div>
// 			</section>

// 			<section ref={pricingRef} className="pricing-section">
// 				<h2 className="pricing-title">Choose what fits you right</h2>
// 				<p className="pricing-subtitle">
// 					Our straightforward pricing plans are tailored to meet your
// 					needs. If you&apos;re not ready to commit you can get
// 					started for free.
// 				</p>
// 				<div className="pricing-offer-timer">
// 					Limited Time Offer! Ends in: {formatTime(timeLeft)}
// 				</div>

// 				<div className="pricing-toggle">
// 					<Button
// 						variant={
// 							billingPeriod === "month" ? "default" : "outline"
// 						}
// 						onClick={() => setBillingPeriod("month")}
// 						className="pricing-toggle-button pricing-toggle-button-left"
// 					>
// 						Monthly
// 					</Button>
// 					<Button
// 						variant={
// 							billingPeriod === "year" ? "default" : "outline"
// 						}
// 						onClick={() => setBillingPeriod("year")}
// 						className="pricing-toggle-button pricing-toggle-button-right"
// 					>
// 						Annually
// 					</Button>
// 				</div>

// 				<div className="pricing-cards">
// 					{products.map((product, index) => {
// 						const yearlyPrice = product.prices.find(
// 							(p) => p.recurring.interval === "year"
// 						);
// 						const monthlyPrice = product.prices.find(
// 							(p) => p.recurring.interval === "month"
// 						);

// 						let displayPrice, interval, originalPrice;
// 						if (billingPeriod === "year" && yearlyPrice) {
// 							displayPrice = (
// 								yearlyPrice.unit_amount /
// 								100 /
// 								12
// 							).toFixed(2);
// 							originalPrice = (
// 								(yearlyPrice.unit_amount / 100 / 12) *
// 								1.2
// 							).toFixed(2);
// 							interval = "month";
// 						} else if (monthlyPrice) {
// 							displayPrice = (
// 								monthlyPrice.unit_amount / 100
// 							).toFixed(2);
// 							originalPrice = (
// 								(monthlyPrice.unit_amount / 100) *
// 								1.2
// 							).toFixed(2);
// 							interval = "month";
// 						} else {
// 							displayPrice = "N/A";
// 							originalPrice = "N/A";
// 							interval = "month";
// 						}

// 						const savings =
// 							billingPeriod === "year" &&
// 							yearlyPrice &&
// 							monthlyPrice
// 								? (
// 										(monthlyPrice.unit_amount * 12 -
// 											yearlyPrice.unit_amount) /
// 										100
// 								  ).toFixed(2)
// 								: "0.00";
// 						const savingsPercentage =
// 							billingPeriod === "year" &&
// 							yearlyPrice &&
// 							monthlyPrice
// 								? (
// 										((monthlyPrice.unit_amount * 12 -
// 											yearlyPrice.unit_amount) /
// 											(monthlyPrice.unit_amount * 12)) *
// 										100
// 								  ).toFixed(0)
// 								: "0";

// 						const prevTier = products[index - 1];
// 						const prevTierFeatures = prevTier
// 							? prevTier.metadata.features
// 									.split(",")
// 									.map((f) => f.trim())
// 							: [];
// 						const { analyzedFeatures, higherTierFeatures } =
// 							analyzeFeatures(
// 								product.metadata.features
// 									.split(",")
// 									.map((f) => f.trim()),
// 								prevTierFeatures
// 							);

// 						const cleanedFeatures = filterFeatures(
// 							analyzedFeatures,
// 							product.name
// 						);

// 						const finalFeatures =
// 							index > 0
// 								? addPlusToUnlimited(cleanedFeatures)
// 								: cleanedFeatures;

// 						const description =
// 							index > 0
// 								? `Includes Everything in ${prevTier.name}`
// 								: product.description;

// 						const topTierFeatures = getTopTierFeatures();

// 						const isHovered = hoveredCard === index;
// 						const isOtherCardHovered =
// 							hoveredCard !== null && hoveredCard !== index;

// 						return (
// 							<motion.div
// 								key={product.id}
// 								className="pricing-card-container"
// 								style={
// 									{
// 										"--color-1": borderColors[index][0],
// 										"--color-2": borderColors[index][1],
// 										"--color-3": borderColors[index][2],
// 										transform: isHovered
// 											? "scale(1.05)"
// 											: isOtherCardHovered
// 											? "scale(0.95)"
// 											: "scale(1)",
// 										zIndex: isHovered ? 20 : 10,
// 										transition: "all 0.3s ease-in-out",
// 									} as React.CSSProperties
// 								}
// 								onMouseEnter={() => handleCardHover(index)}
// 								onMouseLeave={() => handleCardHover(null)}
// 								initial={{ height: "auto" }}
// 								animate={{ height: "auto" }}
// 								exit={{ height: "auto" }}
// 								transition={{
// 									duration: 0.5,
// 									ease: "easeInOut",
// 								}}
// 							>
// 								<Card
// 									className="pricing-card"
// 									style={{
// 										animation: isHovered
// 											? "flashBorder 0.5s linear infinite"
// 											: "flashBorder 4s linear infinite",
// 									}}
// 								>
// 									<div className="pricing-card-content">
// 										<div>
// 											<CardTitle className="pricing-card-title">
// 												{product.name}
// 											</CardTitle>
// 											<CardDescription className="pricing-card-description">
// 												{product.description}
// 											</CardDescription>
// 											<div className="pricing-card-price-container">
// 												<span className="pricing-card-original-price">
// 													${originalPrice}
// 												</span>
// 												<AnimatePresence mode="wait">
// 													<motion.span
// 														key={displayPrice}
// 														className="pricing-card-current-price"
// 														initial={{
// 															opacity: 0,
// 															y: 20,
// 														}}
// 														animate={{
// 															opacity: 1,
// 															y: 0,
// 														}}
// 														exit={{
// 															opacity: 0,
// 															y: -20,
// 														}}
// 														transition={{
// 															duration: 0.2,
// 														}}
// 													>
// 														<span className="pricing-card-price-amount">
// 															${displayPrice}
// 														</span>
// 														<span className="pricing-card-price-interval">
// 															/ {interval}
// 														</span>
// 													</motion.span>
// 												</AnimatePresence>
// 											</div>
// 											{billingPeriod === "year" && (
// 												<p className="pricing-card-savings">
// 													Save ${savings} annually
// 													<br />({savingsPercentage}%
// 													off)
// 												</p>
// 											)}
// 											{index > 0 && (
// 												<div className="pricing-card-includes">
// 													{description}
// 													<hr />
// 												</div>
// 											)}
// 											{index === 0 && (
// 												<div className="pricing-card-includes">
// 													Includes Everything on Intro
// 													<hr />
// 												</div>
// 											)}
// 										</div>
// 										<ul className="pricing-card-features">
// 											{finalFeatures.map(
// 												(feature, featureIndex) => (
// 													<li
// 														key={featureIndex}
// 														className="pricing-card-feature"
// 													>
// 														<Check className="pricing-card-feature-icon" />
// 														<span>{feature}</span>
// 													</li>
// 												)
// 											)}
// 											{index < products.length - 1 &&
// 												products[
// 													index + 1
// 												].metadata.features
// 													.split(",")
// 													.map(
// 														(
// 															feature,
// 															featureIndex
// 														) => {
// 															if (
// 																!product.metadata.features.includes(
// 																	feature
// 																) &&
// 																!feature.includes(
// 																	"accounts"
// 																) &&
// 																!feature.includes(
// 																	"members"
// 																)
// 															) {
// 																return (
// 																	<li
// 																		key={`not-included-${featureIndex}`}
// 																		className="pricing-card-feature not-included"
// 																	>
// 																		<X className="pricing-card-feature-icon" />
// 																		<span>
// 																			{feature.trim()}
// 																		</span>
// 																	</li>
// 																);
// 															}
// 															return null;
// 														}
// 													)}
// 											{index === 0 &&
// 												topTierFeatures.map(
// 													(feature, featureIndex) => {
// 														if (
// 															!feature.includes(
// 																"Unlimited Sub accounts"
// 															) &&
// 															!feature.includes(
// 																"Unlimited Team members"
// 															)
// 														) {
// 															return (
// 																<li
// 																	key={`not-included-top-${featureIndex}`}
// 																	className="pricing-card-feature not-included"
// 																>
// 																	<X className="pricing-card-feature-icon" />
// 																	<span>
// 																		{feature.trim()}
// 																	</span>
// 																</li>
// 															);
// 														}
// 														return null;
// 													}
// 												)}
// 										</ul>
// 										<Button className="pricing-card-cta-button">
// 											Get Started
// 										</Button>
// 									</div>
// 								</Card>
// 							</motion.div>
// 						);
// 					})}
// 				</div>
// 			</section>
// 		</>
// 	);
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useViewportContext } from "@/hooks/useViewportContext";

interface Price {
    id: string;
    unit_amount: number;
    recurring: {
        interval: "month" | "year";
    };
}

interface Product {
    id: string;
    name: string;
    description: string;
    metadata: {
        features: string;
    };
    prices: Price[];
}

export default function LandingComponent() {
    const pricingRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [billingPeriod, setBillingPeriod] = useState<"month" | "year">(
        "year"
    );
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const { width, height, fontSize, deviceInfo } = useViewportContext();
    const getWidth = (width: number, dynamicScreenSize: number) => {
        const strWidth = Math.round(width * dynamicScreenSize).toString();
        return { strWidth };
    };
    const { strWidth } = getWidth(width, 30.0);

    useEffect(() => {
        console.log("Width: ", width);
        console.log("Height: ", height);
        console.log("Font Size: ", fontSize);
        console.log("Device Info: ", deviceInfo);
    }, [strWidth]);

    const handleCardHover = (index: number | null) => {
        setHoveredCard(index);
    };

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("/api/stripe/get-products");
            const data = await response.json();
            setProducts(
                data
                    .filter((product: Product) =>
                        [
                            "NexusConjure Elite Package",
                            "Digital Catalyst Suite",
                            "Pixel Novice Path",
                        ].includes(product.name)
                    )
                    .sort((a: Product, b: Product) => {
                        const aPrice =
                            a.prices.find(
                                (p) => p.recurring.interval === "year"
                            )?.unit_amount || 0;
                        const bPrice =
                            b.prices.find(
                                (p) => p.recurring.interval === "year"
                            )?.unit_amount || 0;
                        return aPrice - bPrice; // Sort by yearly price, lowest first
                    })
            );
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const scrollToPricing = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const borderColors = [
        ["#3b82f6", "#22d3ee", "#10b981"],
        ["#8b5cf6", "#ec4899", "#ef4444"],
        ["#facc15", "#f97316", "#ef4444"],
    ];

    const analyzeFeatures = (
        features: string[],
        prevTierFeatures: string[] = []
    ) => {
        const analyzedFeatures = features.map((feature) => {
            const [quantity, ...rest] = feature.split(" ");
            const numericQuantity = parseInt(quantity);
            if (!isNaN(numericQuantity)) {
                const prevFeature = prevTierFeatures.find((f) =>
                    f.includes(rest.join(" "))
                );
                if (prevFeature) {
                    const [prevQuantity] = prevFeature.split(" ");
                    const prevNumericQuantity = parseInt(prevQuantity);
                    if (!isNaN(prevNumericQuantity)) {
                        const difference =
                            numericQuantity - prevNumericQuantity;
                        if (difference > 0) {
                            return `+${difference} ${rest.join(
                                " "
                            )} (${numericQuantity} total)`;
                        }
                    }
                }
                return feature;
            }
            return feature;
        });

        const higherTierFeatures = features.filter(
            (f) => !prevTierFeatures.includes(f)
        );
        return { analyzedFeatures, higherTierFeatures };
    };

    const addPlusToUnlimited = (features: string[]) => {
        return features.map((feature) =>
            feature.includes("Unlimited") ? `+ ${feature}` : feature
        );
    };

    const filterFeatures = (features: string[], productName: string) => {
        if (productName === "Digital Catalyst Suite") {
            return features.filter(
                (feature) =>
                    !feature.includes("Unlimited Sub accounts") &&
                    !feature.includes("Unlimited Team members")
            );
        }
        if (productName === "Pixel Novice Path") {
            return features.filter(
                (feature) =>
                    !feature.includes("15 Sub accounts") &&
                    !feature.includes("10 Team members") &&
                    !feature.includes("Unlimited Sub accounts") &&
                    !feature.includes("Unlimited Team members")
            );
        }
        return features;
    };

    const getTopTierFeatures = () => {
        const topTier = products[products.length - 1];
        return topTier
            ? topTier.metadata.features.split(",").map((f) => f.trim())
            : [];
    };

    return (
        <>
            {/* <div className="background-image-container">
				<Image
					src="/assets/nexusconjurecom-front-0_.svg"
					alt="Background"
					className="background-image background-image-light"
				/>
				<Image
					src="/assets/nexusconjure-com-front-0.svg"
					alt="Background"
					className="background-image background-image-dark"
				/>
			</div> */}
            <div className="content-wrapper">
                <section className="landing-hero">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
                    <div className="landing-hero-content">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center leading-tight nexusconjure-title text-nowrap">
                            <span className="letter animate-squeeze">N</span>
                            <span className="letter animate-rotate">e</span>
                            <span className="letter animate-flip">x</span>
                            <span className="letter animate-bounce">u</span>
                            <span className="letter animate-fade">s</span>
                            <span className="letter animate-slide">C</span>
                            <span className="letter animate-zoom">o</span>
                            <span className="letter animate-shake">n</span>
                            <span className="letter animate-tilt">j</span>
                            <span className="letter animate-swing">u</span>
                            <span className="letter animate-pulse">r</span>
                            <span className="letter animate-wobble">e</span>
                        </h1>
                        <p className="landing-subtitle">
                            Run your agency, in one place
                        </p>
                        <button
                            className="landing-cta-button"
                            onClick={scrollToPricing}
                        >
                            View Pricing
                        </button>
                    </div>
                    <div className="landing-preview-container">
                        <Image
                            src="/assets/preview.png"
                            alt="NexusConjure preview"
                            width={1200}
                            height={800}
                            className="landing-preview-image"
                            priority
                        />
                    </div>
                </section>

                <section ref={pricingRef} className="pricing-section">
                    <h2 className="pricing-title">
                        Choose what fits you right
                    </h2>
                    <p className="pricing-subtitle">
                        Our straightforward pricing plans are tailored to meet
                        your needs. If you&apos;re not ready to commit you can
                        get started for free.
                    </p>
                    <div className="pricing-offer-timer">
                        Limited Time Offer! Ends in: {formatTime(timeLeft)}
                    </div>

                    <div className="pricing-toggle">
                        <Button
                            variant={
                                billingPeriod === "month"
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => setBillingPeriod("month")}
                            className="pricing-toggle-button pricing-toggle-button-left"
                        >
                            Monthly
                        </Button>
                        <Button
                            variant={
                                billingPeriod === "year" ? "default" : "outline"
                            }
                            onClick={() => setBillingPeriod("year")}
                            className="pricing-toggle-button pricing-toggle-button-right"
                        >
                            Annually
                        </Button>
                    </div>

                    <div className="pricing-cards">
                        {products.map((product, index) => {
                            const yearlyPrice = product.prices.find(
                                (p) => p.recurring.interval === "year"
                            );
                            const monthlyPrice = product.prices.find(
                                (p) => p.recurring.interval === "month"
                            );

                            let displayPrice, interval, originalPrice;
                            if (billingPeriod === "year" && yearlyPrice) {
                                displayPrice = (
                                    yearlyPrice.unit_amount /
                                    100 /
                                    12
                                ).toFixed(2);
                                originalPrice = (
                                    (yearlyPrice.unit_amount / 100 / 12) *
                                    1.2
                                ).toFixed(2);
                                interval = "month";
                            } else if (monthlyPrice) {
                                displayPrice = (
                                    monthlyPrice.unit_amount / 100
                                ).toFixed(2);
                                originalPrice = (
                                    (monthlyPrice.unit_amount / 100) *
                                    1.2
                                ).toFixed(2);
                                interval = "month";
                            } else {
                                displayPrice = "N/A";
                                originalPrice = "N/A";
                                interval = "month";
                            }

                            const savings =
                                billingPeriod === "year" &&
                                yearlyPrice &&
                                monthlyPrice
                                    ? (
                                          (monthlyPrice.unit_amount * 12 -
                                              yearlyPrice.unit_amount) /
                                          100
                                      ).toFixed(2)
                                    : "0.00";
                            const savingsPercentage =
                                billingPeriod === "year" &&
                                yearlyPrice &&
                                monthlyPrice
                                    ? (
                                          ((monthlyPrice.unit_amount * 12 -
                                              yearlyPrice.unit_amount) /
                                              (monthlyPrice.unit_amount * 12)) *
                                          100
                                      ).toFixed(0)
                                    : "0";

                            const prevTier = products[index - 1];
                            const prevTierFeatures = prevTier
                                ? prevTier.metadata.features
                                      .split(",")
                                      .map((f) => f.trim())
                                : [];
                            const { analyzedFeatures, higherTierFeatures } =
                                analyzeFeatures(
                                    product.metadata.features
                                        .split(",")
                                        .map((f) => f.trim()),
                                    prevTierFeatures
                                );

                            const cleanedFeatures = filterFeatures(
                                analyzedFeatures,
                                product.name
                            );

                            const finalFeatures =
                                index > 0
                                    ? addPlusToUnlimited(cleanedFeatures)
                                    : cleanedFeatures;

                            const description =
                                index > 0
                                    ? `Includes Everything in ${prevTier.name}`
                                    : product.description;

                            const topTierFeatures = getTopTierFeatures();

                            const isHovered = hoveredCard === index;
                            const isOtherCardHovered =
                                hoveredCard !== null && hoveredCard !== index;

                            return (
                                <motion.div
                                    key={product.id}
                                    className="pricing-card-container"
                                    style={
                                        {
                                            "--color-1": borderColors[index][0],
                                            "--color-2": borderColors[index][1],
                                            "--color-3": borderColors[index][2],
                                            transform: isHovered
                                                ? "scale(1.05)"
                                                : isOtherCardHovered
                                                  ? "scale(0.95)"
                                                  : "scale(1)",
                                            zIndex: isHovered ? 20 : 10,
                                            transition: "all 0.3s ease-in-out",
                                        } as React.CSSProperties
                                    }
                                    onMouseEnter={() => handleCardHover(index)}
                                    onMouseLeave={() => handleCardHover(null)}
                                    initial={{ height: "auto" }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: "auto" }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Card
                                        className="pricing-card"
                                        style={{
                                            animation: isHovered
                                                ? "flashBorder 0.5s linear infinite"
                                                : "flashBorder 4s linear infinite",
                                        }}
                                    >
                                        <div className="pricing-card-content">
                                            <div>
                                                <CardTitle className="pricing-card-title">
                                                    {product.name}
                                                </CardTitle>
                                                <CardDescription className="pricing-card-description">
                                                    {product.description}
                                                </CardDescription>
                                                <div className="pricing-card-price-container">
                                                    <span className="pricing-card-original-price">
                                                        ${originalPrice}
                                                    </span>
                                                    <AnimatePresence mode="wait">
                                                        <motion.span
                                                            key={displayPrice}
                                                            className="pricing-card-current-price"
                                                            initial={{
                                                                opacity: 0,
                                                                y: 20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                y: -20,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                        >
                                                            <span className="pricing-card-price-amount">
                                                                ${displayPrice}
                                                            </span>
                                                            <span className="pricing-card-price-interval">
                                                                / {interval}
                                                            </span>
                                                        </motion.span>
                                                    </AnimatePresence>
                                                </div>
                                                {billingPeriod === "year" && (
                                                    <p className="pricing-card-savings">
                                                        Save ${savings} annually
                                                        <br />(
                                                        {savingsPercentage}%
                                                        off)
                                                    </p>
                                                )}
                                                {index > 0 && (
                                                    <div className="pricing-card-includes">
                                                        {description}
                                                        <hr />
                                                    </div>
                                                )}
                                                {index === 0 && (
                                                    <div className="pricing-card-includes">
                                                        Includes Everything on
                                                        Intro
                                                        <hr />
                                                    </div>
                                                )}
                                            </div>
                                            <ul className="pricing-card-features">
                                                {finalFeatures.map(
                                                    (feature, featureIndex) => (
                                                        <li
                                                            key={featureIndex}
                                                            className="pricing-card-feature"
                                                        >
                                                            <Check className="pricing-card-feature-icon" />
                                                            <span>
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                                {index < products.length - 1 &&
                                                    products[
                                                        index + 1
                                                    ].metadata.features
                                                        .split(",")
                                                        .map(
                                                            (
                                                                feature,
                                                                featureIndex
                                                            ) => {
                                                                if (
                                                                    !product.metadata.features.includes(
                                                                        feature
                                                                    ) &&
                                                                    !feature.includes(
                                                                        "accounts"
                                                                    ) &&
                                                                    !feature.includes(
                                                                        "members"
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <li
                                                                            key={`not-included-${featureIndex}`}
                                                                            className="pricing-card-feature not-included"
                                                                        >
                                                                            <X className="pricing-card-feature-icon" />
                                                                            <span>
                                                                                {feature.trim()}
                                                                            </span>
                                                                        </li>
                                                                    );
                                                                }
                                                                return null;
                                                            }
                                                        )}
                                                {index === 0 &&
                                                    topTierFeatures.map(
                                                        (
                                                            feature,
                                                            featureIndex
                                                        ) => {
                                                            if (
                                                                !feature.includes(
                                                                    "Unlimited Sub accounts"
                                                                ) &&
                                                                !feature.includes(
                                                                    "Unlimited Team members"
                                                                )
                                                            ) {
                                                                return (
                                                                    <li
                                                                        key={`not-included-top-${featureIndex}`}
                                                                        className="pricing-card-feature not-included"
                                                                    >
                                                                        <X className="pricing-card-feature-icon" />
                                                                        <span>
                                                                            {feature.trim()}
                                                                        </span>
                                                                    </li>
                                                                );
                                                            }
                                                            return null;
                                                        }
                                                    )}
                                            </ul>
                                            <Button className="pricing-card-cta-button">
                                                Get Started
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}
