"use client";

import { useState, useEffect, type ReactNode } from "react";

interface FeatureDetectionGuardProps {
	children: ReactNode;
	fallback?: ReactNode;
}

const ESSENTIAL_FEATURES = ["VideoEncoder", "VideoDecoder", "AudioDecoder"];

interface WindowWithFeatures extends Window {
	VideoEncoder?: unknown;
	VideoDecoder?: unknown;
	AudioDecoder?: unknown;
}

export const FeatureDetectionGuard = ({
	children,
	fallback,
}: FeatureDetectionGuardProps) => {
	const [hasAllFeatures, setHasAllFeatures] = useState(false);

	useEffect(() => {
		const checkFeatures = () => {
			const featuresAvailable = ESSENTIAL_FEATURES.every(
				(feature) =>
					(window as WindowWithFeatures)[
						feature as keyof WindowWithFeatures
					] !== undefined
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
