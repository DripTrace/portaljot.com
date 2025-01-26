import {
	createFile,
	type MP4File,
	type MP4Info,
	type MP4ArrayBuffer,
	type MP4Sample,
	type TrakBox,
} from "mp4box";
import { AudioDataDecoder } from "./AudioDataDecoder";
import { AudioTrackBuffer } from "./AudioTrackBuffer";
import { VideoFrameDecoder } from "./VideoFrameDecoder";
import { VideoTrackBuffer } from "./VideoTrackBuffer";
import { VideoBox } from "./VideoBox";
import { VideoHelpers } from "./VideoHelpers";

const extractSamples = (mp4File: MP4File, trackId: number) => {
	return new Promise<MP4Sample[]>((resolve) => {
		mp4File.onSamples = (_, __, samples) => {
			resolve(samples);
		};
		mp4File.setExtractionOptions(trackId, null, {
			nbSamples: Infinity,
		});
		mp4File.start();
	});
};

const processBuffer = async (
	buffer: ArrayBuffer | ArrayBufferView,
	resourceId: string
): Promise<VideoBox> => {
	const mp4File = createFile();

	const infoPromise = new Promise<MP4Info>((resolve) => {
		mp4File.onReady = resolve;
	});

	// Ensure buffer is an ArrayBuffer with proper type checking
	let arrayBuffer: ArrayBuffer;
	if (buffer instanceof ArrayBuffer) {
		arrayBuffer = buffer;
	} else if (ArrayBuffer.isView(buffer)) {
		// Explicitly handle the ArrayBufferView case
		const view = buffer as ArrayBufferView;
		if (view.buffer instanceof ArrayBuffer) {
			arrayBuffer = view.buffer;
		} else {
			throw new Error(
				"Invalid ArrayBufferView: underlying buffer is not an ArrayBuffer"
			);
		}
	} else {
		throw new Error("Unexpected buffer type");
	}

	// Cast to MP4ArrayBuffer and set fileStart
	const mp4Buffer = arrayBuffer as MP4ArrayBuffer;
	(mp4Buffer as any).fileStart = 0;

	mp4File.appendBuffer(mp4Buffer);
	mp4File.flush();

	const info = await infoPromise;

	const videoTrackBuffers: VideoTrackBuffer[] = [];
	const audioTrackBuffers: AudioTrackBuffer[] = [];

	for (const track of info.videoTracks) {
		const samples = await extractSamples(mp4File, track.id);
		const trak = mp4File.getTrackById(track.id);
		const codecConfig = VideoFrameDecoder.buildConfig(track, trak);
		const trackBuffer = new VideoTrackBuffer({
			samples,
			videoDecoderConfig: codecConfig,
		});
		videoTrackBuffers.push(trackBuffer);
	}

	for (const track of info.audioTracks) {
		const samples = await extractSamples(mp4File, track.id);
		const trak: TrakBox = mp4File.getTrackById(track.id);
		const codecConfig = AudioDataDecoder.buildConfig(track, trak);

		const mp4a = trak.mdia.minf.stbl.stsd.entries.find(
			VideoHelpers.isMp4aEntry
		);

		const trackBuffer = new AudioTrackBuffer(
			track,
			samples,
			codecConfig,
			mp4a
		);
		audioTrackBuffers.push(trackBuffer);
	}

	return new VideoBox({ videoTrackBuffers, audioTrackBuffers, resourceId });
};

export const VideoBoxDemuxer = {
	processBuffer,
};
