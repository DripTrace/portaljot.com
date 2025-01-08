"use client";

import { useLayoutEffect, useRef } from "react";
// import { VideoFrameDecoder } from "@/lib/VideoFrameDecoder";
import type { VideoBox } from "@/lib/modify/VideoBox";
import { OverlayButton } from "@/components/modify/atoms";

import {
	boxItemStyles,
	canvasBoxStyles,
	canvasStyles,
	boxNameStyles,
} from "./VideoBoxItem.css";
import { VideoFrameDecoder } from "@/lib/modify/VideoFrameDecoder";

export type VideoUploadBox = {
	name: string;
	innerBox: VideoBox;
	id: string;
	frame?: VideoFrame;
	type?: string;
};

interface VideoBoxItemProps {
	item: VideoUploadBox;
	isChosen: boolean;
	onSelect(): void;
	onFrame(videoFrame: VideoFrame): void;
}

export const VideoBoxItem = ({
	item,
	isChosen,
	onSelect,
	onFrame,
}: VideoBoxItemProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useLayoutEffect(() => {
		const drawFrame = (frame: VideoFrame) => {
			const canvas = canvasRef.current!;

			canvas.width = Math.floor(frame.displayWidth / 5);
			canvas.height = Math.floor(frame.displayHeight / 5);

			const ctx = canvas.getContext("2d")!;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
		};

		if (item.frame) {
			drawFrame(item.frame);
			return;
		}

		const videoTrackBuffers = item.innerBox.getVideoTrackBuffers();

		if (videoTrackBuffers.length === 0) return;

		const decoder = new VideoFrameDecoder({
			onDecode: (frame) => {
				drawFrame(frame);
				onFrame(frame);
			},
		});

		const videoTrackBuffer = videoTrackBuffers[0];
		const chunk = videoTrackBuffer.getVideoChunksGroups()[0].videoChunks[0];

		decoder.decode(chunk, videoTrackBuffer.getCodecConfig());
		decoder.flush();

		return () => {
			decoder.reset();
		};
	}, []);

	return (
		<div className={boxItemStyles}>
			<div className={canvasBoxStyles}>
				<canvas ref={canvasRef} className={canvasStyles} />
			</div>
			<div className={boxNameStyles}>{item.name}</div>
			<OverlayButton
				onClick={onSelect}
				bgColor={isChosen ? "white10" : "transparent"}
				bgHoverColor="white15"
				borderRadius="2"
			/>
		</div>
	);
};

// "use client";

// import { useLayoutEffect, useRef } from "react";
// // import { VideoFrameDecoder } from "@/lib/VideoFrameDecoder";
// import { type VideoBox } from "@/lib/modify/VideoBox";
// import { OverlayButton } from "@/components/modify/atoms";

// import {
// 	boxItemStyles,
// 	canvasBoxStyles,
// 	canvasStyles,
// 	boxNameStyles,
// } from "./VideoBoxItem.css";
// import { VideoFrameDecoder } from "@/lib/modify/VideoFrameDecoder";

// export interface VideoUploadBox {
// 	name: string;
// 	innerBox: VideoBox;
// 	id: string;
// 	frame?: VideoFrame; // Change ImageBitmap to VideoFrame
// 	type?: string; // Add this line
// }

// interface VideoBoxItemProps {
// 	videoBox: VideoUploadBox;
// 	onAddToTimeline: () => void;
// 	isChosen?: boolean;
// 	onFrame?: (frame: VideoFrame) => void; // Change ImageBitmap to VideoFrame
// 	onSelect?: () => void; // Add this line
// }

// export const VideoBoxItem: React.FC<VideoBoxItemProps> = ({
// 	videoBox,
// 	onAddToTimeline,
// 	isChosen,
// 	onFrame,
// 	onSelect,
// }) => {
// 	const canvasRef = useRef<HTMLCanvasElement | null>(null);

// 	useLayoutEffect(() => {
// 		const drawFrame = (frame: VideoFrame) => {
// 			const canvas = canvasRef.current;
// 			if (!canvas) return;

// 			canvas.width = Math.floor(frame.displayWidth / 5);
// 			canvas.height = Math.floor(frame.displayHeight / 5);

// 			const ctx = canvas.getContext("2d");
// 			if (!ctx) return;

// 			ctx.clearRect(0, 0, canvas.width, canvas.height);
// 			ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
// 		};

// 		if (videoBox.frame && videoBox.frame instanceof VideoFrame) {
// 			drawFrame(videoBox.frame);
// 			handleFrame(videoBox.frame);
// 		} else {
// 			const videoTrackBuffers = videoBox.innerBox.getVideoTrackBuffers();

// 			if (videoTrackBuffers.length === 0) return;

// 			const decoder = new VideoFrameDecoder({
// 				onDecode: (frame: VideoFrame) => {
// 					drawFrame(frame);
// 					if (onFrame) {
// 						onFrame(frame);
// 					}
// 				},
// 			});

// 			const videoTrackBuffer = videoTrackBuffers[0];
// 			const chunk =
// 				videoTrackBuffer.getVideoChunksGroups()[0].videoChunks[0];

// 			decoder.decode(chunk, videoTrackBuffer.getCodecConfig());
// 			decoder.flush();

// 			return () => {
// 				decoder.reset();
// 			};
// 		}
// 	}, [videoBox, onFrame]);

// 	const handleFrame = (frame: VideoFrame | undefined) => {
// 		if (frame && onFrame) {
// 			onFrame(frame);
// 		}
// 	};

// 	return (
// 		<div className={boxItemStyles}>
// 			<div className={canvasBoxStyles}>
// 				<canvas ref={canvasRef} className={canvasStyles} />
// 				{videoBox.frame && (
// 					<button onClick={() => handleFrame(videoBox.frame)}>
// 						Play
// 					</button>
// 				)}
// 			</div>
// 			<div className={boxNameStyles}>{videoBox.name}</div>
// 			<OverlayButton
// 				onClick={onAddToTimeline}
// 				bgColor={isChosen ? "white10" : "transparent"}
// 				bgHoverColor="white15"
// 				borderRadius="2"
// 			/>
// 		</div>
// 	);
// };
