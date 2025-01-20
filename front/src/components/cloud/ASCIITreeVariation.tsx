"use client";

import React, { ReactNode, useMemo, useState } from "react";
import { motion, AnimationProps } from "framer-motion";
import { CloudDataComplete } from "@/utils/nexusconjure/interfaces";

type AnimationType = "pulse" | "rotate" | "blink" | "bounce" | "shake";

interface SpecialCharProps {
	children: ReactNode;
	animation: AnimationType;
}

const animations: Record<AnimationType, AnimationProps> = {
	pulse: {
		animate: {
			scale: [1, 1.2, 1],
			transition: { duration: 1, repeat: Infinity },
		},
	},
	rotate: {
		animate: {
			rotate: [0, 360],
			transition: { duration: 2, repeat: Infinity },
		},
	},
	blink: {
		animate: {
			opacity: [1, 0, 1],
			transition: { duration: 1, repeat: Infinity },
		},
	},
	bounce: {
		animate: {
			y: [0, -10, 0],
			transition: { duration: 0.5, repeat: Infinity },
		},
	},
	shake: {
		animate: {
			x: [-2, 2, -2, 2, 0],
			transition: { duration: 0.5, repeat: Infinity },
		},
	},
};

const SpecialChar: React.FC<SpecialCharProps> = ({ children, animation }) => {
	return (
		<motion.span
			{...animations[animation]}
			className="text-blue-500 font-bold inline-block"
		>
			{children}
		</motion.span>
	);
};

const AnimatedLine: React.FC<{ children: ReactNode }> = ({ children }) => (
	<motion.div
		initial={{ x: -20, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		transition={{ duration: 0.5 }}
	>
		{children}
	</motion.div>
);

interface ExpandableSectionProps {
	title: string;
	children: ReactNode;
	isExpanded: boolean;
	onToggle: () => void;
	icon: string;
	animation: AnimationType;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
	title,
	children,
	isExpanded,
	onToggle,
	icon,
	animation,
}) => (
	<>
		<AnimatedLine>
			<span onClick={onToggle} style={{ cursor: "pointer" }}>
				<SpecialChar animation={animation}>{icon}</SpecialChar> {title}{" "}
				{isExpanded ? "▼" : "▶"}
			</span>
		</AnimatedLine>
		{isExpanded && children}
	</>
);

const ASCIITreeVariation: React.FC<{ data: CloudDataComplete }> = ({
	data,
}) => {
	const [expandedSections, setExpandedSections] = useState<
		Record<string, boolean>
	>({});

	const toggleSection = (section: string) => {
		setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const expandAll = () => {
		const allSections = Object.keys(data);
		const expandedAll = allSections.reduce(
			(acc, section) => ({ ...acc, [section]: true }),
			{}
		);
		setExpandedSections(expandedAll);
	};

	const formatBytes = (bytes: number): string => {
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		if (bytes === 0) return "0 Bytes";
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${
			sizes[i]
		}`;
	};

	const transformedDigitalOceanDroplets = useMemo(() => {
		const dropletsArray = data?.digitalOcean?.droplets;
		if (
			dropletsArray &&
			typeof dropletsArray === "object" &&
			!Array.isArray(dropletsArray)
		) {
			return Object.values(dropletsArray).filter(
				(
					item
				): item is {
					id: string;
					name: string;
					size: { slug: string };
					region: { slug: string };
					status: string;
					created_at: string;
					memory: number;
					vcpus: number;
					disk: number;
				} => typeof item === "object" && item !== null && "id" in item
			);
		}
		return dropletsArray;
	}, [data?.digitalOcean?.droplets]);

	const renderObject = (
		obj: any,
		depth: number = 0,
		path: string[] = [],
		maxDepth: number = 5
	): ReactNode => {
		if (depth > maxDepth) {
			return <span>[Max Depth Reached]</span>;
		}

		if (typeof obj !== "object" || obj === null) {
			return <span>{JSON.stringify(obj)}</span>;
		}

		if (path.includes(obj)) {
			return <span>[Circular Reference]</span>;
		}

		return (
			<>
				{Object.entries(obj).map(([key, value]) => {
					const newPath = [...path, obj];
					const fullPath = [...path, key].join(".");
					return (
						<React.Fragment key={fullPath}>
							<AnimatedLine>
								{"  ".repeat(depth)}
								<SpecialChar animation="pulse">
									⇢
								</SpecialChar>{" "}
								{key}:{" "}
								{typeof value === "object" && value !== null ? (
									<ExpandableSection
										title=""
										isExpanded={expandedSections[fullPath]}
										onToggle={() => toggleSection(fullPath)}
										icon="▼"
										animation="pulse"
									>
										{renderObject(
											value,
											depth + 1,
											newPath,
											maxDepth
										)}
									</ExpandableSection>
								) : (
									renderObject(
										value,
										depth + 1,
										newPath,
										maxDepth
									)
								)}
							</AnimatedLine>
						</React.Fragment>
					);
				})}
			</>
		);
	};

	return (
		<pre className="text-xs font-mono whitespace-pre overflow-x-auto p-4 bg-gray-900 text-green-400 rounded-lg shadow-lg">
			<AnimatedLine>
				<SpecialChar animation="pulse">☰</SpecialChar> Cloud
				Infrastructure Dashboard
			</AnimatedLine>
			<AnimatedLine>
				<span onClick={expandAll} style={{ cursor: "pointer" }}>
					<SpecialChar animation="rotate">⊞</SpecialChar> Expand All
				</span>
			</AnimatedLine>

			{Object.entries(data).map(([provider, providerData]) => (
				<ExpandableSection
					key={provider}
					title={`${
						provider.charAt(0).toUpperCase() + provider.slice(1)
					} Resources`}
					isExpanded={expandedSections[provider]}
					onToggle={() => toggleSection(provider)}
					icon="⚿"
					animation="pulse"
				>
					{provider === "digitalOcean" ? (
						<>
							<AnimatedLine>
								<SpecialChar animation="bounce">◐</SpecialChar>{" "}
								Account Info
							</AnimatedLine>
							{renderObject(providerData.account, 1)}
							<AnimatedLine>
								<SpecialChar animation="bounce">◑</SpecialChar>{" "}
								Droplets
							</AnimatedLine>
							{Array.isArray(transformedDigitalOceanDroplets) &&
								transformedDigitalOceanDroplets.map(
									(droplet, index) => (
										<React.Fragment key={droplet.id}>
											{renderObject(droplet, 1)}
										</React.Fragment>
									)
								)}
						</>
					) : (
						renderObject(providerData)
					)}
				</ExpandableSection>
			))}

			<AnimatedLine>
				<SpecialChar animation="pulse">☷</SpecialChar> End of
				Infrastructure Overview
			</AnimatedLine>
		</pre>
	);
};

export default ASCIITreeVariation;
