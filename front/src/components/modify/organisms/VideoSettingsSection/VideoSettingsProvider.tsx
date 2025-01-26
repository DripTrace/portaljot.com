"use client";

import { useState, useMemo, useEffect, type ReactNode } from "react";
import type { Settings } from "@/types/modify";
import { storage } from "@/lib/modify/Storage";
import { VideoSettingsContext } from "./VideoSettingsContext.css";
import {
	DEFAULT_RATIO,
	RATIO_RESOLUTIONS,
} from "@/constants/modify/video-size";

interface VideoSettingsProviderProps {
	children: ReactNode;
}

export const VideoSettingsProvider = ({
	children,
}: VideoSettingsProviderProps) => {
	const [settings, setSettings] = useState<Settings>({
		ratio: DEFAULT_RATIO,
		resolution: RATIO_RESOLUTIONS[DEFAULT_RATIO].prefered,
	});

	useEffect(() => {
		const fetchSettings = async () => {
			const cachedSettings = await storage.getSettings();

			if (cachedSettings) {
				setSettings(cachedSettings);
			}
		};

		fetchSettings();
	}, []);

	useEffect(() => {
		storage.saveSettings(settings);
	}, [settings]);

	const contextValue = useMemo(
		() => ({
			settings,
			setSettings: (value: Partial<Settings>) =>
				setSettings((prevSettings) => ({ ...prevSettings, ...value })),
		}),
		[settings]
	);

	return (
		<VideoSettingsContext.Provider value={contextValue}>
			{children}
		</VideoSettingsContext.Provider>
	);
};
