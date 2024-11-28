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
// import { storage } from "@/lib/modify/Storage";
// import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";

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

	// ... (keep the existing useEffect and fetchVideoBoxes function)

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

//works

// "use client";

// import React, {
// 	createContext,
// 	useState,
// 	useEffect,
// 	useCallback,
// 	Dispatch,
// 	SetStateAction,
// } from "react";
// import { VideoUploadBox } from "./VideoBoxItem";
// import { storage } from "@/lib/modify/Storage";
// import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";

// export interface VideoBoxesContextState {
// 	videoBoxes: VideoUploadBox[];
// 	setVideoBoxes: Dispatch<SetStateAction<VideoUploadBox[]>>;
// 	generatedVideoBoxes: VideoUploadBox[];
// 	setGeneratedVideoBoxes: Dispatch<SetStateAction<VideoUploadBox[]>>;
// 	exportedVideoBoxes: VideoUploadBox[];
// 	setExportedVideoBoxes: Dispatch<SetStateAction<VideoUploadBox[]>>;
// 	fetchVideoBoxes: () => Promise<void>;
// 	refreshVideoBoxes: () => Promise<void>;
// }

// export const VideoBoxesContext = createContext<VideoBoxesContextState | null>(
// 	null
// );

// export const VideoBoxesProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	const [videoBoxes, setVideoBoxes] = useState<VideoUploadBox[]>([]);
// 	const [generatedVideoBoxes, setGeneratedVideoBoxes] = useState<
// 		VideoUploadBox[]
// 	>([]);
// 	const [exportedVideoBoxes, setExportedVideoBoxes] = useState<
// 		VideoUploadBox[]
// 	>([]);
// 	const [populated, setPopulated] = useState(false);

// 	const fetchVideoBoxes = useCallback(async () => {
// 		const rawBoxes = await storage.getVideoRawBoxes();
// 		const uploadedBoxes: VideoUploadBox[] = [];
// 		const generatedBoxes: VideoUploadBox[] = [];
// 		const exportedBoxes: VideoUploadBox[] = [];

// 		for (const box of rawBoxes) {
// 			let bufferWithFileStart: ArrayBuffer;
// 			if (box.buffer instanceof ArrayBuffer) {
// 				bufferWithFileStart = box.buffer;
// 			} else if (ArrayBuffer.isView(box.buffer)) {
// 				bufferWithFileStart = box.buffer.buffer;
// 			} else {
// 				console.error("Unexpected buffer type:", box.buffer);
// 				continue;
// 			}

// 			(bufferWithFileStart as any).fileStart = 0;
// 			const innerBox = await VideoBoxDemuxer.processBuffer(
// 				bufferWithFileStart,
// 				box.resourceId
// 			);
// 			const videoUploadBox: VideoUploadBox = {
// 				name: box.name,
// 				innerBox,
// 				id: box.resourceId,
// 				type: box.type,
// 			};

// 			switch (box.type) {
// 				case "uploaded":
// 					uploadedBoxes.push(videoUploadBox);
// 					break;
// 				case "generated":
// 					generatedBoxes.push(videoUploadBox);
// 					break;
// 				case "exported":
// 					exportedBoxes.push(videoUploadBox);
// 					break;
// 			}
// 		}

// 		setVideoBoxes(uploadedBoxes);
// 		setGeneratedVideoBoxes(generatedBoxes);
// 		setExportedVideoBoxes(exportedBoxes);
// 		setPopulated(true);
// 	}, []);

// 	const refreshVideoBoxes = fetchVideoBoxes;

// 	useEffect(() => {
// 		if (!populated) {
// 			fetchVideoBoxes();
// 		}
// 	}, [fetchVideoBoxes, populated]);

// 	return (
// 		<VideoBoxesContext.Provider
// 			value={{
// 				videoBoxes,
// 				setVideoBoxes,
// 				generatedVideoBoxes,
// 				setGeneratedVideoBoxes,
// 				exportedVideoBoxes,
// 				setExportedVideoBoxes,
// 				fetchVideoBoxes,
// 				refreshVideoBoxes,
// 			}}
// 		>
// 			{children}
// 		</VideoBoxesContext.Provider>
// 	);
// };
