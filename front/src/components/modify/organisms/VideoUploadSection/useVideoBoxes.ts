"use client";

//works
import { useContext, useCallback } from "react";
import { VideoBoxesContext } from "./VideoBoxesContext";
// import { storage } from "@/utils/storage";
// import { VideoBoxDemuxer } from "@/utils/videoBoxDemuxer";
// import { nanoid } from "nanoid";
import { storage } from "@/lib/modify/Storage";
import { VideoUploadBox } from "./VideoBoxItem";
import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";
// import { VideoUploadBox } from "@/types/videoUploadBox";

export const useVideoBoxes = () => {
	const context = useContext(VideoBoxesContext);
	if (!context) {
		throw new Error(
			"useVideoBoxes must be used within a VideoBoxesProvider"
		);
	}
	const {
		videoBoxes,
		setVideoBoxes,
		generatedVideoBoxes,
		setGeneratedVideoBoxes,
		exportedVideoBoxes,
		setExportedVideoBoxes,
	} = context;

	const refreshVideoBoxes = useCallback(async () => {
		const rawBoxes = await storage.getVideoRawBoxes();
		const uploadedBoxes: VideoUploadBox[] = [];
		const generatedBoxes: VideoUploadBox[] = [];
		const exportedBoxes: VideoUploadBox[] = [];

		for (const box of rawBoxes) {
			const innerBox = await VideoBoxDemuxer.processBuffer(
				box.buffer,
				box.resourceId
			);
			const videoUploadBox = {
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
	}, []);

	return {
		videoBoxes,
		setVideoBoxes,
		generatedVideoBoxes,
		setGeneratedVideoBoxes,
		exportedVideoBoxes,
		setExportedVideoBoxes,
		refreshVideoBoxes,
	};
};
//works

// import { useContext } from "react";
// import { VideoBoxesContext, VideoBoxesContextState } from "./VideoBoxesContext";

// export const useVideoBoxes = (): VideoBoxesContextState => {
// 	const context = useContext(VideoBoxesContext);
// 	if (!context) {
// 		throw new Error(
// 			"useVideoBoxes must be used within a VideoBoxesProvider"
// 		);
// 	}
// 	return context;
// };
