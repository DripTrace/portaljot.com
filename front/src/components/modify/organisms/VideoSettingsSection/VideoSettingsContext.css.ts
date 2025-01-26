import { createContext } from "react";
import type { Settings } from "@/types/modify";

export interface VideoSettingsContextState {
	settings: Settings;
	setSettings(settings: Partial<Settings>): void;
}

export const VideoSettingsContext =
	createContext<VideoSettingsContextState | null>(null);
