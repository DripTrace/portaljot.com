"use client";

import { useState, type MouseEvent } from "react";
import { TIMELINE_PADDING } from "@/constants/modify/ui";
import type { VideoBox } from "@/lib/modify/VideoBox";
import { TimelineTicks, SliderThumb } from "@/components/modify/molecules";
import {
	IconButton,
	OverlayButton,
	type IconName,
} from "@/components/modify/atoms";
import { SliderControlType } from "@/types/modify";

import { Z_INDEXES } from "@/constants/modify/ui";
import { PlayerSlider } from "./PlayerSlider";
import {
	timelineBoxStyles,
	headerBoxStyles,
	sliderBoxStyles,
	sliderInnerBoxStyles,
	zoomingControlsBoxStyles,
	timelineControlsBoxStyles,
} from "./PlayerTimeline.css";

const MIN_TIME_TO_PX = 1;
const MAX_TIME_TO_PX = 512;

interface PlayerSliderProps {
	videoBoxes: VideoBox[];
	seek(time: number): void;
}

interface ControlItem {
	type: SliderControlType;
	icon: IconName;
}

const CONTROL_ITEMS: ControlItem[] = [
	{
		type: "default",
		icon: "Cursor",
	},
	{
		type: "trim",
		icon: "Scissors",
	},
	{
		type: "delete",
		icon: "Trash",
	},
];

export const PlayerTimeline = ({ videoBoxes, seek }: PlayerSliderProps) => {
	const [activeControlType, setActiveControlType] =
		useState<SliderControlType>("default");
	const [timeToPx, setTimeToPx] = useState(32);

	const zoom = () => {
		setTimeToPx((prev) => Math.min(prev * 2, MAX_TIME_TO_PX));
	};

	const unzoom = () => {
		setTimeToPx((prev) => Math.max(prev / 2, MIN_TIME_TO_PX));
	};

	const onSliderClick = (event: MouseEvent<HTMLButtonElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const position = event.clientX - rect.left;
		const time = (position - TIMELINE_PADDING.LEFT) / timeToPx;
		seek(time);
	};

	return (
		<div className={timelineBoxStyles}>
			<div className={headerBoxStyles}>
				<TimelineTicks timeToPx={timeToPx} />
				<div className={zoomingControlsBoxStyles}>
					<IconButton
						name="Plus"
						iconColor={
							timeToPx === MAX_TIME_TO_PX ? "white25" : "white80"
						}
						iconHoverColor={
							timeToPx === MAX_TIME_TO_PX ? "white25" : "white50"
						}
						iconSizing="md"
						p="1"
						onClick={zoom}
						disabled={timeToPx === MAX_TIME_TO_PX}
					/>
					<IconButton
						name="Minus"
						iconColor={
							timeToPx === MIN_TIME_TO_PX ? "white25" : "white80"
						}
						iconHoverColor={
							timeToPx === MIN_TIME_TO_PX ? "white25" : "white50"
						}
						iconSizing="md"
						p="1"
						onClick={unzoom}
						disabled={timeToPx === MIN_TIME_TO_PX}
					/>
				</div>
			</div>
			<div className={sliderBoxStyles}>
				<div className={timelineControlsBoxStyles}>
					{CONTROL_ITEMS.map((item) => (
						<IconButton
							key={item.type}
							name={item.icon}
							active={activeControlType === item.type}
							iconColor="pale-gray"
							iconActiveColor="pale-blue"
							bgHoverColor="white5"
							iconSizing="md"
							p="4"
							onClick={() => setActiveControlType(item.type)}
						/>
					))}
				</div>
				<div className={sliderInnerBoxStyles}>
					{activeControlType === "default" && (
						<OverlayButton
							onClick={onSliderClick}
							bgHoverColor="transparent"
							bgColor="transparent"
							zIndex={Z_INDEXES.TIMELINE_BG}
						/>
					)}
					<PlayerSlider
						videoBoxes={videoBoxes}
						timeToPx={timeToPx}
						controlType={activeControlType}
					/>
					<SliderThumb timeToPx={timeToPx} />
				</div>
			</div>
		</div>
	);
};
