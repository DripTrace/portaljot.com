//works
"use client";

import {
	useState,
	useEffect,
	useCallback,
	useMemo,
	type FC,
	type ReactNode,
} from "react";
import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";
import { VideoBoxesContext, VideoBoxesContextState } from "./VideoBoxesContext";
import { VideoUploadBox } from "./VideoBoxItem/VideoBoxItem";
import { storage } from "@/lib/modify/Storage";
import { VideoRawBufferBox } from "@/lib/modify/Storage";

export const VideoBoxesProvider: FC<{ children: ReactNode }> = ({
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

	const fetchVideoBoxes = useCallback(async () => {
		const rawBoxes: VideoRawBufferBox[] = await storage.getVideoRawBoxes();
		const uploadedBoxes: VideoUploadBox[] = [];
		const generatedBoxes: VideoUploadBox[] = [];
		const exportedBoxes: VideoUploadBox[] = [];

		for (const box of rawBoxes) {
			let bufferWithFileStart: ArrayBuffer;
			if (box.buffer instanceof ArrayBuffer) {
				bufferWithFileStart = box.buffer;
			} else if (ArrayBuffer.isView(box.buffer)) {
				bufferWithFileStart = box.buffer.buffer;
			} else {
				console.error("Unexpected buffer type:", box.buffer);
				continue;
			}

			(bufferWithFileStart as any).fileStart = 0;
			const innerBox = await VideoBoxDemuxer.processBuffer(
				bufferWithFileStart,
				box.resourceId
			);
			const videoUploadBox: VideoUploadBox = {
				name: box.name,
				innerBox,
				id: box.resourceId,
				type: box.type,
			};

			switch (box.type) {
				case "uploaded":
					uploadedBoxes.push(videoUploadBox);
					break;
				case "generated":
					generatedBoxes.push(videoUploadBox);
					break;
				case "exported":
					exportedBoxes.push(videoUploadBox);
					break;
			}
		}

		setVideoBoxes(uploadedBoxes);
		setGeneratedVideoBoxes(generatedBoxes);
		setExportedVideoBoxes(exportedBoxes);
		setPopulated(true);
	}, []);

	useEffect(() => {
		if (!populated) {
			fetchVideoBoxes();
		}
	}, [fetchVideoBoxes, populated]);

	const contextValue: VideoBoxesContextState = useMemo(
		() => ({
			videoBoxes,
			setVideoBoxes,
			generatedVideoBoxes,
			setGeneratedVideoBoxes,
			exportedVideoBoxes,
			setExportedVideoBoxes,
		}),
		[videoBoxes, generatedVideoBoxes, exportedVideoBoxes]
	);

	return (
		<VideoBoxesContext.Provider value={contextValue}>
			{populated && children}
		</VideoBoxesContext.Provider>
	);
};

//works

// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";
// import { VideoBoxesContext, VideoBoxesContextState } from "./VideoBoxesContext";
// import { VideoUploadBox } from "./VideoBoxItem/VideoBoxItem";
// import { storage } from "@/lib/modify/Storage";
// import { VideoRawBufferBox } from "@/lib/modify/Storage";

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
// 		// Implement the fetchVideoBoxes logic here
// 		// This should be similar to the existing logic in the commented-out section
// 	}, []);

// 	const refreshVideoBoxes = fetchVideoBoxes;

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
