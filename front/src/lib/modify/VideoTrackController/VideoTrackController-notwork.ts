import { VideoTrackDecoder } from "./VideoTrackDecoder";
import { type VideoBox } from "../VideoBox";

const MAX_TRACK_FRAMES = 20;

interface VideoKeyFrame {
	chunk: EncodedVideoChunk;
	codecConfig: VideoDecoderConfig;
}

interface VideoTrackControllerState {
	videoFrames: VideoFrame[] | null;
}

interface VideoTrackControllerProps {
	onEmit: (state: Partial<VideoTrackControllerState>) => void;
}

export class VideoTrackController {
	private onEmit: VideoTrackControllerProps["onEmit"];

	constructor({ onEmit }: VideoTrackControllerProps) {
		this.onEmit = onEmit;
	}

	setVideoBox(videoBox: VideoBox): Promise<void> {
		// Implement this method
		return new Promise((resolve, reject) => {
			// Your implementation here
		});
	}
}
