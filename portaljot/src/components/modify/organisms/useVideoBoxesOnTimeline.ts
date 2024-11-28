"use client";

import { useState, useEffect } from "react";
import { eventsBus } from "@/lib/modify/EventsBus";
import { storage } from "@/lib/modify/Storage";
import { VideoBox } from "@/lib/modify/VideoBox";
import { useVideoBoxes } from "./VideoUploadSection";

export const useVideoBoxesOnTimeline = () => {
	const { videoBoxes } = useVideoBoxes();

	const [videoBoxesOnTimeline, setVideoBoxesOnTimeline] = useState<
		VideoBox[]
	>(() => {
		const boxesOnTimelineMetadata = storage.getTimelineVideoBoxesMetadata();
		const newBoxes: VideoBox[] = [];

		for (const metadata of boxesOnTimelineMetadata) {
			const correspondingVideoBox = videoBoxes.find(
				(box) => box.innerBox.getResourceId() === metadata.resourceId
			);

			// no need to continue if one of them is not found
			if (!correspondingVideoBox) {
				return [];
			}

			const newBoxOnTimeline = correspondingVideoBox.innerBox.copy();
			newBoxOnTimeline.updateEffects(metadata.effects);
			newBoxOnTimeline.updateRange(metadata.range);
			newBoxes.push(newBoxOnTimeline);
		}

		return newBoxes;
	});

	useEffect(() => {
		return eventsBus.subscribe("modifiedVideoBoxId", () => {
			setVideoBoxesOnTimeline((cur) => [...cur]);
		});
	}, []);

	useEffect(() => {
		return eventsBus.subscribe("deletedVideoBoxId", (id) => {
			setVideoBoxesOnTimeline((curTracks) =>
				curTracks.filter((track) => track.id !== id)
			);
		});
	}, []);

	useEffect(() => {
		return eventsBus.subscribe("splittedVideoBox", ({ id, atTime }) => {
			setVideoBoxesOnTimeline((curBoxes) => {
				const nextBoxes: VideoBox[] = [];

				curBoxes.forEach((box) => {
					if (box.id === id) {
						nextBoxes.push(...box.splitAt(atTime));
					} else {
						nextBoxes.push(box);
					}
				});

				return nextBoxes;
			});
		});
	}, []);

	useEffect(() => {
		storage.saveTimelineVideoBoxesMetadata(
			videoBoxesOnTimeline.map((box) => box.getSerializableObject())
		);
	}, [videoBoxesOnTimeline]);

	return { videoBoxesOnTimeline, setVideoBoxesOnTimeline };
};

// src/components/modify/organisms/useVideoBoxesOnTimeline.ts

// "use client";

// import { useState, useEffect } from "react";
// import { eventsBus } from "@/lib/modify/EventsBus";
// import { storage } from "@/lib/modify/Storage";
// import { VideoBox, SerializableVideoBox } from "@/lib/modify/VideoBox";
// import { useVideoBoxes } from "./VideoUploadSection/useVideoBoxes";

// export const useVideoBoxesOnTimeline = () => {
// 	const { videoBoxes } = useVideoBoxes();

// 	const [videoBoxesOnTimeline, setVideoBoxesOnTimeline] = useState<
// 		VideoBox[]
// 	>([]);

// 	useEffect(() => {
// 		const initializeBoxesOnTimeline = async () => {
// 			const boxesOnTimelineMetadata =
// 				await storage.getTimelineVideoBoxesMetadata();
// 			const newBoxes: VideoBox[] = [];

// 			for (const metadata of boxesOnTimelineMetadata) {
// 				const correspondingVideoBox = videoBoxes.find(
// 					(box) =>
// 						box.innerBox.getResourceId() === metadata.resourceId
// 				);

// 				if (!correspondingVideoBox) {
// 					setVideoBoxesOnTimeline([]);
// 					return;
// 				}

// 				const newBoxOnTimeline = correspondingVideoBox.innerBox.copy();
// 				newBoxOnTimeline.id = metadata.id; // Ensure the id is set
// 				newBoxOnTimeline.updateEffects(metadata.effects);
// 				newBoxOnTimeline.updateRange(metadata.range);
// 				// Update other properties as needed
// 				newBoxes.push(newBoxOnTimeline);
// 			}

// 			setVideoBoxesOnTimeline(newBoxes);
// 		};

// 		initializeBoxesOnTimeline();
// 	}, [videoBoxes]);

// 	useEffect(() => {
// 		return eventsBus.subscribe("modifiedVideoBoxId", () => {
// 			setVideoBoxesOnTimeline((cur) => [...cur]);
// 		});
// 	}, []);

// 	useEffect(() => {
// 		return eventsBus.subscribe("deletedVideoBoxId", (id) => {
// 			setVideoBoxesOnTimeline((curTracks) =>
// 				curTracks.filter((track) => track.id !== id)
// 			);
// 		});
// 	}, []);

// 	useEffect(() => {
// 		return eventsBus.subscribe("splittedVideoBox", ({ id, atTime }) => {
// 			setVideoBoxesOnTimeline((curBoxes) => {
// 				const nextBoxes: VideoBox[] = [];

// 				curBoxes.forEach((box) => {
// 					if (box.id === id) {
// 						nextBoxes.push(...box.splitAt(atTime));
// 					} else {
// 						nextBoxes.push(box);
// 					}
// 				});

// 				return nextBoxes;
// 			});
// 		});
// 	}, []);

// 	useEffect(() => {
// 		storage.saveTimelineVideoBoxesMetadata(
// 			videoBoxesOnTimeline.map((box) => box.getSerializableObject())
// 		);
// 	}, [videoBoxesOnTimeline]);

// 	return { videoBoxesOnTimeline, setVideoBoxesOnTimeline };
// };
