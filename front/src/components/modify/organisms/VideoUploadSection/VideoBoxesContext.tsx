//works
"use client";

import {
	createContext,
	useState,
	useEffect,
	useCallback,
	type FC,
} from "react";
import { VideoUploadBox } from "./VideoBoxItem";

export interface VideoBoxesContextState {
	videoBoxes: VideoUploadBox[];
	setVideoBoxes: React.Dispatch<React.SetStateAction<VideoUploadBox[]>>;
	generatedVideoBoxes: VideoUploadBox[];
	setGeneratedVideoBoxes: React.Dispatch<
		React.SetStateAction<VideoUploadBox[]>
	>;
	exportedVideoBoxes: VideoUploadBox[];
	setExportedVideoBoxes: React.Dispatch<
		React.SetStateAction<VideoUploadBox[]>
	>;
}

export const VideoBoxesContext = createContext<VideoBoxesContextState | null>(
	null
);

export const VideoBoxesProvider: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [videoBoxes, setVideoBoxes] = useState<VideoUploadBox[]>([]);
	const [generatedVideoBoxes, setGeneratedVideoBoxes] = useState<
		VideoUploadBox[]
	>([]);
	const [exportedVideoBoxes, setExportedVideoBoxes] = useState<
		VideoUploadBox[]
	>([]);
	const [populated, setPopulated] = useState(false);

	return (
		<VideoBoxesContext.Provider
			value={{
				videoBoxes,
				setVideoBoxes,
				generatedVideoBoxes,
				setGeneratedVideoBoxes,
				exportedVideoBoxes,
				setExportedVideoBoxes,
			}}
		>
			{children}
		</VideoBoxesContext.Provider>
	);
};
