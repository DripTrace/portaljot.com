// "use client";

// import { useState, useEffect, type ReactNode } from "react";
// import { boxStyles, textStyles } from "./FeatureDetectionGuard.css";

// interface FeatureDetectionGuardProps {
// 	children: ReactNode;
// 	fallback?: ReactNode;
// }

// const ESSENTIAL_FEATURES = ["VideoEncoder", "VideoDecoder", "AudioDecoder"];

// export const FeatureDetectionGuard = ({
// 	children,
// 	fallback,
// }: FeatureDetectionGuardProps) => {
// 	const [hasAllFeatures, setHasAllFeatures] = useState(false);

// 	useEffect(() => {
// 		const checkFeatures = () => {
// 			const featuresAvailable = ESSENTIAL_FEATURES.every(
// 				(feature) => feature in window
// 			);
// 			setHasAllFeatures(featuresAvailable);
// 		};

// 		checkFeatures();
// 	}, []);

// 	if (typeof window === "undefined") {
// 		// Server-side rendering, return fallback or null
// 		return fallback || null;
// 	}

// 	if (hasAllFeatures) {
// 		return children;
// 	}

// 	return fallback || null;
// };

// src/components/modify/atoms/FeatureDetectionGuard.tsx

"use client";

import { useState, useEffect, type ReactNode } from "react";

interface FeatureDetectionGuardProps {
	children: ReactNode;
	fallback?: ReactNode;
}

const ESSENTIAL_FEATURES = ["VideoEncoder", "VideoDecoder", "AudioDecoder"];

export const FeatureDetectionGuard = ({
	children,
	fallback,
}: FeatureDetectionGuardProps) => {
	const [hasAllFeatures, setHasAllFeatures] = useState(false);

	useEffect(() => {
		const checkFeatures = () => {
			const featuresAvailable = ESSENTIAL_FEATURES.every(
				(feature) => (window as any)[feature]
			);
			setHasAllFeatures(featuresAvailable);
		};

		checkFeatures();
	}, []);

	if (typeof window === "undefined") {
		return fallback || null;
	}

	if (hasAllFeatures) {
		return <>{children}</>;
	}

	return fallback || null;
};
