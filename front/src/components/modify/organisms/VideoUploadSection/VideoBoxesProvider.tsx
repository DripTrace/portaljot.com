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

	const isArrayBufferLike = (
		buffer: unknown
	): buffer is ArrayBuffer | SharedArrayBuffer | ArrayBufferView => {
		return (
			buffer instanceof ArrayBuffer ||
			(typeof SharedArrayBuffer !== "undefined" &&
				buffer instanceof SharedArrayBuffer) ||
			ArrayBuffer.isView(buffer)
		);
	};

	const fetchVideoBoxes = useCallback(async () => {
		const rawBoxes: VideoRawBufferBox[] = await storage.getVideoRawBoxes();
		const uploadedBoxes: VideoUploadBox[] = [];
		const generatedBoxes: VideoUploadBox[] = [];
		const exportedBoxes: VideoUploadBox[] = [];

		for (const box of rawBoxes) {
			let bufferWithFileStart: ArrayBuffer | undefined;

			if (
				box.buffer &&
				typeof box.buffer === "object" &&
				"byteLength" in box.buffer
			) {
				if (isArrayBufferLike(box.buffer)) {
					if (box.buffer instanceof ArrayBuffer) {
						bufferWithFileStart = box.buffer;
					} else if (ArrayBuffer.isView(box.buffer)) {
						bufferWithFileStart = box.buffer.buffer as ArrayBuffer;
					} else {
						// Must be SharedArrayBuffer at this point
						bufferWithFileStart = box.buffer as ArrayBuffer;
					}
				} else {
					console.error(
						"Invalid buffer: buffer is not an ArrayBuffer-like object.",
						box.buffer
					);
					continue;
				}
			} else {
				console.error(
					"Invalid buffer: buffer is not an object, lacks byteLength, or is null/undefined.",
					box.buffer
				);
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
