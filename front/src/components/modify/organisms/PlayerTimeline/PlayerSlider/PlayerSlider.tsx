import type { VideoBox } from "@/lib/modify/VideoBox";
import { SliderControlType } from "@/types/modify";
import { VideoTrackBox } from "@/components/modify/molecules";

import {
	trackBoxStyles,
	sliderBoxStyles,
	trackStyles,
} from "./PlayerSlider.css";

interface PlayerSliderProps {
	timeToPx: number;
	videoBoxes: VideoBox[];
	controlType: SliderControlType;
}

export const PlayerSlider = ({
	timeToPx,
	videoBoxes,
	controlType,
}: PlayerSliderProps) => {
	return (
		<div className={sliderBoxStyles}>
			<div className={trackBoxStyles}></div>
			<div className={trackBoxStyles}></div>
			<div className={trackBoxStyles}>
				<div className={trackStyles}>
					{videoBoxes.map((box) => (
						<VideoTrackBox
							key={box.id}
							box={box}
							timeToPx={timeToPx}
							controlType={controlType}
						/>
					))}
				</div>
			</div>
			<div className={trackBoxStyles}></div>
		</div>
	);
};
