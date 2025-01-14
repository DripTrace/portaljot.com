"use client";

import {
	useState,
	useRef,
	useEffect,
	type CSSProperties,
	type MouseEvent,
} from "react";

import { type VideoBox } from "@/lib/modify/VideoBox";
import { VideoTrackController } from "@/lib/modify/VideoTrackController";
import { SliderControlType } from "@/types/modify";
import { eventsBus } from "@/lib/modify/EventsBus";

import { useActiveVideoBox } from "../ActiveVideoBoxProvider";
import { Z_INDEXES } from "@/constants/modify/ui";
import { OverlayButton } from "@/components/modify/atoms";

import {
	trackBoxStyles,
	frameBoxStyles,
	trimMovingThumbBoxStyles,
	trimMovingThumbStyles,
} from "./VideoTrackBox.css";
import scissorsUrl from "./icons/scissors.svg";
import trashUrl from "./icons/trash.svg";

const PREVIEW_HEIGHT = 50;
const PREVIEW_DIMENSIONS = {
	HEIGHT: PREVIEW_HEIGHT,
	WIDTH: Math.floor((PREVIEW_HEIGHT * 16) / 9), // preserve ratio 16:9
};

const findPreviewFrames = (
	videoFrames: VideoFrame[],
	timeToPx: number,
	trackBoxWidth: number,
	rangeStart: number
) => {
	const previewsNum = Math.ceil(trackBoxWidth / PREVIEW_DIMENSIONS.WIDTH);
	const previewFrames: VideoFrame[] = [];

	for (let i = 0; i < previewsNum; i++) {
		const previewPosition = (i + 0.5) * PREVIEW_DIMENSIONS.WIDTH;
		const middleTimeInMicros =
			rangeStart * 1e6 + Math.floor((previewPosition * 1e6) / timeToPx);

		let appropriateFrame: VideoFrame | null = null;
		let delta: number | null = null;

		videoFrames.forEach((frame) => {
			const nextDelta = Math.abs(frame.timestamp - middleTimeInMicros);

			if (!delta || nextDelta < delta) {
				delta = nextDelta;
				appropriateFrame = frame;
			}
		});

		if (appropriateFrame) {
			previewFrames.push(appropriateFrame);
		}
	}

	return previewFrames;
};

const CONTROL_CURSOR: Record<SliderControlType, CSSProperties["cursor"]> = {
	default: "pointer",
	trim: `url("${scissorsUrl}"), col-resize`,
	delete: `url("${trashUrl}"), not-allowed`,
};

interface VideoTrackBoxProps {
	timeToPx: number;
	box: VideoBox;
	controlType: SliderControlType;
}

export const VideoTrackBox = ({
	timeToPx,
	box,
	controlType,
}: VideoTrackBoxProps) => {
	const [{ videoFrames }, setVideoTrackState] = useState(
		VideoTrackController.getDefaultState()
	);
	const [trackPreviewer] = useState(
		() => new VideoTrackController({ onEmit: setVideoTrackState })
	);

	const { activeVideoBox, setActiveVideoBox } = useActiveVideoBox();

	useEffect(() => {
		trackPreviewer.setVideoBox(box);
		return trackPreviewer.reset;
	}, [box.id]);

	const trackBoxWidth = box.getDurationInS() * timeToPx;
	const rangeStart = box.getRange().start;
	const previewFrames = videoFrames
		? findPreviewFrames(videoFrames, timeToPx, trackBoxWidth, rangeStart)
		: [];

	const selectOrDelete = () => {
		if (controlType === "default") {
			setActiveVideoBox(box);
		} else if (controlType === "delete") {
			eventsBus.dispatch("deletedVideoBoxId", box.id);
		}
	};

	return (
		<div
			className={trackBoxStyles({
				active: box.id === activeVideoBox?.id,
			})}
			style={{ width: trackBoxWidth, height: PREVIEW_DIMENSIONS.HEIGHT }}
		>
			{controlType === "trim" && (
				<TrimHandler trackId={box.id} timeToPx={timeToPx} />
			)}
			{controlType !== "trim" && (
				<OverlayButton
					onClick={selectOrDelete}
					bgHoverColor="white10"
					zIndex={Z_INDEXES.TIMELINE_TRACK}
					cursor={CONTROL_CURSOR[controlType]}
				/>
			)}
			{previewFrames.map((frame, index) => (
				<PrewiewBox frame={frame} key={index} />
			))}
		</div>
	);
};

interface PreviewBoxProps {
	frame: VideoFrame;
}

const PrewiewBox = ({ frame }: PreviewBoxProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			throw new Error("canvas must be specified");
		}

		const ctx = canvas.getContext("2d")!;

		// @TODO: preserve ratio
		canvas.width = PREVIEW_DIMENSIONS.WIDTH * 4;
		canvas.height = PREVIEW_DIMENSIONS.HEIGHT * 4;
		canvas.style.width = `${PREVIEW_DIMENSIONS.WIDTH}px`;
		canvas.style.height = `${PREVIEW_DIMENSIONS.HEIGHT}px`;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
	}, [frame]);

	return (
		<div
			className={frameBoxStyles}
			style={{
				width: PREVIEW_DIMENSIONS.WIDTH,
				height: PREVIEW_DIMENSIONS.HEIGHT,
			}}
		>
			<canvas ref={canvasRef} />
		</div>
	);
};

const extractPosition = (event: MouseEvent) => {
	const rect = event.currentTarget.getBoundingClientRect();
	return event.clientX - rect.left;
};

interface TrimHandlerProps {
	timeToPx: number;
	trackId: string;
}

const TrimHandler = ({ timeToPx, trackId }: TrimHandlerProps) => {
	const thumbRef = useRef<HTMLDivElement | null>(null);

	const updateThumbPositioning = (event: MouseEvent) => {
		if (!thumbRef.current) return;

		const position = extractPosition(event);
		thumbRef.current.style.left = `${position}px`;
	};

	const onMouseEnter = (event: MouseEvent) => {
		if (!thumbRef.current) return;
		thumbRef.current.style.display = "block";
		updateThumbPositioning(event);
	};

	const onMouseLeave = (event: MouseEvent) => {
		if (!thumbRef.current) return;
		thumbRef.current.style.display = "none";
		updateThumbPositioning(event);
	};

	const onClick = (event: MouseEvent) => {
		const position = extractPosition(event);
		const time = position / timeToPx;
		eventsBus.dispatch("splittedVideoBox", {
			id: trackId,
			atTime: time,
		});
	};

	return (
		<div
			className={trimMovingThumbBoxStyles}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={updateThumbPositioning}
			onClick={onClick}
			style={{
				cursor: CONTROL_CURSOR["trim"],
			}}
		>
			<div ref={thumbRef} className={trimMovingThumbStyles} />
		</div>
	);
};
