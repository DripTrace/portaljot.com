// import { IconButton } from "@/components/modify/atoms";
// import { VideoTime } from "../VideoTime";

// import {
// 	playerControlsStyles,
// 	firstControlsStyles,
// 	secondControlsStyles,
// } from "./PlayerControls.css";

// interface PlayerControlsProps {
// 	playing: boolean;
// 	play(): void;
// 	pause(): void;
// 	playBackward(): void;
// 	playForward(): void;
// }

// export const PlayerControls = ({
// 	playing,
// 	play,
// 	pause,
// 	playBackward,
// 	playForward,
// }: PlayerControlsProps) => {
// 	return (
// 		<div className={playerControlsStyles}>
// 			<div className={firstControlsStyles}>
// 				<IconButton
// 					name={playing ? "Pause" : "Play"}
// 					iconSizing="xs"
// 					iconColor="white100"
// 					iconHoverColor="white50"
// 					onClick={() => {
// 						if (playing) {
// 							pause();
// 						} else {
// 							play();
// 						}
// 					}}
// 				/>
// 				<VideoTime />
// 			</div>
// 			<div className={secondControlsStyles}>
// 				<IconButton
// 					name="Backward"
// 					iconSizing="xs"
// 					iconColor="white50"
// 					iconHoverColor="white25"
// 					onClick={playBackward}
// 				/>
// 				<IconButton
// 					name="Forward"
// 					iconSizing="xs"
// 					iconColor="white50"
// 					iconHoverColor="white25"
// 					onClick={playForward}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

import { IconButton } from "@/components/modify/atoms";
import { VideoTime } from "../VideoTime";

import {
	playerControlsStyles,
	firstControlsStyles,
	secondControlsStyles,
} from "./PlayerControls.css";

interface PlayerControlsProps {
	playing: boolean;
	play(): void;
	pause(): void;
	playBackward(): void;
	playForward(): void;
}

export const PlayerControls = ({
	playing,
	play,
	pause,
	playBackward,
	playForward,
}: PlayerControlsProps) => {
	return (
		<div className={playerControlsStyles}>
			<div className={firstControlsStyles}>
				<IconButton
					name={playing ? "Pause" : "Play"}
					iconSizing="md"
					iconColor="white100"
					iconHoverColor="white50"
					onClick={() => {
						if (playing) {
							pause();
						} else {
							play();
						}
					}}
				/>
				<VideoTime />
			</div>
			<div className={secondControlsStyles}>
				<IconButton
					name="Backward"
					iconSizing="md"
					iconColor="white50"
					iconHoverColor="white25"
					onClick={playBackward}
				/>
				<IconButton
					name="Forward"
					iconSizing="md"
					iconColor="white50"
					iconHoverColor="white25"
					onClick={playForward}
				/>
			</div>
		</div>
	);
};
