// import { ISOFile } from "mp4box";
// import { VideoHelpers } from "../VideoHelpers";
// import { VideoFrameChanger } from "../VideoFrameChanger";
// import { VideoBox } from "../VideoBox";
// import {
// 	addSample,
// 	addTrak,
// 	createMP4File,
// 	VIDEO_TIMESCALE,
// 	AUDIO_TIMESCALE,
// } from "./MP4BoxHelpers";

// /*
//  * IN SAFARI: exported video is huge in memory because chunk type is always key
//  */
// const KEYFRAME_INTERVAL_MICROSECONDS = 4 * 1000 * 1000; // 4 seconds

// interface VideoOptions {
// 	width: number;
// 	height: number;
// }

// interface CommonConfig {
// 	codec: string;
// 	width: number;
// 	height: number;
// }

// const QUEUE_WINDOW = 20;
// const MIN_QUEUE_THRESHOLD = 5;
// const INITIAL_CHUNK_OFFSET = 40;

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// interface VideoExportProgressState {
// 	showProgress: boolean;
// 	exported: boolean;
// 	maxEncodedNums: number;
// 	curEncodedNums: number;
// }

// interface VideoExporterProps {
// 	onEmit(state: Partial<VideoExportProgressState>): void;
// }

// /*
//   VideoExporter has flaws:
//     - audio is not resampled, therefore audio with different sample rate turns slower or faster
//     - works incorrectly with videos without audio tracks, existing tracks shift to the left to fill empty space
// */

// export class VideoExporter {
// 	private onEmit: VideoExporterProps["onEmit"];
// 	private videoDecoder: VideoDecoder;
// 	private videoEncoder: VideoEncoder;
// 	private videoCommonConfig: CommonConfig | null = null;
// 	private videoDecoderConfig: VideoDecoderConfig | null = null;
// 	private nextKeyframeTs = 0;
// 	private mp4File: typeof ISOFile;
// 	private videoTrackId: number | null = null;
// 	private frameChanger: VideoFrameChanger;
// 	private videoBoxes: VideoBox[] = [];
// 	private encodingNums = 0;
// 	private encodedNums = 0;

// 	private audioTrackId: number | null = null;

// 	private chunkOffset = INITIAL_CHUNK_OFFSET;
// 	private isFirstVideoSample = true;
// 	private abortController: AbortController;

// 	static getDefaultState(): VideoExportProgressState {
// 		// just random numbers for initial state
// 		return {
// 			showProgress: false,
// 			exported: false,
// 			curEncodedNums: 0,
// 			maxEncodedNums: 100,
// 		};
// 	}

// 	constructor({ onEmit }: VideoExporterProps) {
// 		this.onEmit = onEmit;
// 		this.frameChanger = new VideoFrameChanger();
// 		this.mp4File = createMP4File();
// 		this.abortController = new AbortController();
// 		this.videoDecoder = new VideoDecoder({
// 			output: this.onVideoDecode,
// 			error: console.log,
// 		});
// 		this.videoEncoder = new VideoEncoder({
// 			output: this.onVideoEncode,
// 			error: console.log,
// 		});
// 	}

// 	exportVideo = async (boxes: VideoBox[], options: VideoOptions) => {
// 		this.reset();
// 		this.videoBoxes = boxes;

// 		if (this.videoBoxes.length === 0) return;

// 		const maxEncodedNums = this.extractEncodingFramesNum(boxes);

// 		this.onEmit({
// 			showProgress: true,
// 			exported: false,
// 			curEncodedNums: 0,
// 			maxEncodedNums,
// 		});

// 		const config: CommonConfig = {
// 			codec: "avc1.4d0034",
// 			height: options.height,
// 			width: options.width,
// 		};
// 		this.videoCommonConfig = config;

// 		this.videoEncoder.configure({
// 			...config,
// 			hardwareAcceleration: "prefer-hardware",
// 		});

// 		try {
// 			await this.processVideoAndAudioTracks();

// 			this.onEmit({
// 				exported: true,
// 				curEncodedNums: maxEncodedNums,
// 			});
// 		} catch (error: unknown) {
// 			if (error instanceof DOMException && error.name === "AbortError") {
// 				console.log("Export aborted");
// 			} else if (error instanceof Error) {
// 				console.error("Error during export:", error.message);
// 			} else {
// 				console.error("Unknown error during export");
// 			}
// 		}
// 	};

// 	private async processVideoAndAudioTracks() {
// 		let globalTimestamp = 0;
// 		let firstMp4aBox: any = null;
// 		const allAudioChunks: EncodedAudioChunk[] = [];

// 		for (const videoBox of this.videoBoxes) {
// 			if (this.abortController.signal.aborted) {
// 				throw new DOMException("Aborted", "AbortError");
// 			}

// 			const range = videoBox.getRange();
// 			const boxDuration = videoBox.getDurationInMicroseconds();

// 			// Process video chunks
// 			await this.processVideoChunks(videoBox, globalTimestamp);

// 			// Process audio chunks if present
// 			if (videoBox.hasAudioTracks()) {
// 				const audioChunks = this.processAudioChunksForBox(
// 					videoBox,
// 					globalTimestamp
// 				);
// 				allAudioChunks.push(...audioChunks);

// 				if (!firstMp4aBox && audioChunks.length > 0) {
// 					firstMp4aBox = videoBox
// 						.getAudioTrackBuffers()[0]
// 						.getMp4aBox();
// 				}
// 			}

// 			globalTimestamp += boxDuration;
// 		}

// 		await this.videoDecoder.flush();
// 		await this.videoEncoder.flush();

// 		if (allAudioChunks.length > 0) {
// 			this.processAllAudioChunks(allAudioChunks, firstMp4aBox);
// 		}
// 	}

// 	private async processVideoChunks(
// 		videoBox: VideoBox,
// 		globalTimestamp: number
// 	) {
// 		const range = videoBox.getRange();
// 		let furthestDecodingVideoChunk: EncodedVideoChunk | null = null;

// 		while (true) {
// 			let decodingChunks: {
// 				chunks: EncodedVideoChunk[];
// 				codecConfig: VideoDecoderConfig;
// 			} | null = furthestDecodingVideoChunk
// 				? videoBox.getNextVideoChunks(
// 						furthestDecodingVideoChunk,
// 						QUEUE_WINDOW
// 					)
// 				: videoBox.getVideoChunksDependencies(0);

// 			if (!decodingChunks) break;

// 			const {
// 				chunks,
// 				codecConfig,
// 			}: {
// 				chunks: EncodedVideoChunk[];
// 				codecConfig: VideoDecoderConfig;
// 			} = decodingChunks;

// 			if (this.videoDecoderConfig !== codecConfig) {
// 				this.videoDecoder.configure(codecConfig);
// 				this.videoDecoderConfig = codecConfig;
// 			}

// 			for (const chunk of chunks) {
// 				if (
// 					chunk.timestamp >= range.start * 1e6 &&
// 					chunk.timestamp < range.end * 1e6
// 				) {
// 					const updatedChunk = VideoHelpers.recreateVideoChunk(
// 						chunk,
// 						{
// 							timestamp:
// 								globalTimestamp +
// 								(chunk.timestamp - range.start * 1e6),
// 						}
// 					);
// 					this.videoDecoder.decode(updatedChunk);
// 					this.encodingNums += 1;
// 				}
// 			}

// 			furthestDecodingVideoChunk = chunks[chunks.length - 1];

// 			while (this.encodingNums >= MIN_QUEUE_THRESHOLD) {
// 				await sleep(16);
// 			}

// 			this.onEmit({
// 				curEncodedNums: this.encodedNums,
// 			});
// 		}
// 	}

// 	private processAudioChunksForBox(
// 		videoBox: VideoBox,
// 		globalTimestamp: number
// 	): EncodedAudioChunk[] {
// 		const range = videoBox.getRange();
// 		const audioChunks: EncodedAudioChunk[] = [];

// 		for (const audioTrack of videoBox.getAudioTrackBuffers()) {
// 			const chunks = audioTrack
// 				.getAudioChunks()
// 				.filter(
// 					(chunk) =>
// 						chunk.timestamp / 1e6 >= range.start &&
// 						(chunk.timestamp + chunk.duration!) / 1e6 <= range.end
// 				)
// 				.map((chunk) =>
// 					VideoHelpers.recreateAudioChunk(chunk, {
// 						timestamp:
// 							globalTimestamp +
// 							(chunk.timestamp - range.start * 1e6),
// 					})
// 				);

// 			audioChunks.push(...chunks);
// 		}

// 		return audioChunks;
// 	}

// 	private processAllAudioChunks(chunks: EncodedAudioChunk[], mp4aBox: any) {
// 		if (this.audioTrackId === null) {
// 			this.audioTrackId = addTrak(this.mp4File, {
// 				type: "audio",
// 				mp4a: mp4aBox,
// 			});
// 		}

// 		chunks.forEach((chunk) => {
// 			const uint8 = new Uint8Array(chunk.byteLength);
// 			chunk.copyTo(uint8);

// 			const sampleDuration =
// 				(chunk.duration! * AUDIO_TIMESCALE) / 1_000_000;

// 			this.chunkOffset = addSample(
// 				this.mp4File,
// 				this.audioTrackId,
// 				uint8,
// 				chunk.type === "key",
// 				sampleDuration,
// 				false,
// 				this.chunkOffset
// 			);
// 		});
// 	}

// 	download = () => {
// 		this.mp4File.save("video.mp4");
// 	};

// 	reset = () => {
// 		this.abortController.abort();
// 		this.abortController = new AbortController();

// 		this.videoDecoder.reset();
// 		this.videoEncoder.reset();

// 		this.videoDecoderConfig = null;

// 		this.videoTrackId = null;
// 		this.audioTrackId = null;

// 		this.mp4File = createMP4File();
// 		this.nextKeyframeTs = 0;
// 		this.encodedNums = 0;
// 		this.encodingNums = 0;

// 		this.chunkOffset = INITIAL_CHUNK_OFFSET;
// 		this.isFirstVideoSample = true;
// 	};

// 	private extractEncodingFramesNum = (boxes: VideoBox[]) => {
// 		let framesNum = 0;

// 		boxes.forEach((box) => {
// 			const range = box.getRange();

// 			box.getVideoTrackBuffers().forEach((buffer) => {
// 				buffer.getVideoChunksGroups().forEach((group) => {
// 					group.videoChunks.forEach((chunk) => {
// 						if (
// 							chunk.timestamp >= range.start * 1e6 &&
// 							chunk.timestamp < range.end * 1e6
// 						) {
// 							framesNum += 1;
// 						}
// 					});
// 				});
// 			});
// 		});

// 		return framesNum;
// 	};

// 	private onVideoDecode = (frame: VideoFrame) => {
// 		if (this.abortController.signal.aborted) {
// 			frame.close();
// 			return;
// 		}

// 		if (frame.timestamp < 0) {
// 			frame.close();
// 			return;
// 		}

// 		const videoBox = this.getActiveVideoBoxAt(frame.timestamp / 1e6);

// 		if (!videoBox) {
// 			throw new Error(
// 				"Internal error: videoTrack for decoded frame must present"
// 			);
// 		}

// 		const processedFrame = this.frameChanger.processFrame(
// 			frame,
// 			videoBox.getEffects()
// 		);

// 		frame.close();

// 		let keyFrame = false;
// 		if (processedFrame.timestamp >= this.nextKeyframeTs) {
// 			keyFrame = true;
// 			this.nextKeyframeTs =
// 				processedFrame.timestamp + KEYFRAME_INTERVAL_MICROSECONDS;
// 		}

// 		this.videoEncoder.encode(processedFrame, { keyFrame });
// 		processedFrame.close();
// 	};

// 	private onVideoEncode = (
// 		chunk: EncodedVideoChunk,
// 		metadata?: EncodedVideoChunkMetadata
// 	) => {
// 		if (!this.videoCommonConfig) {
// 			throw new Error("INTERNAL ERROR: commonConfig must be defined");
// 		}

// 		this.encodingNums -= 1;
// 		this.encodedNums += 1;

// 		if (this.videoTrackId === null) {
// 			const description = metadata!.decoderConfig!.description;
// 			this.videoTrackId = addTrak(this.mp4File, {
// 				type: "video",
// 				width: this.videoCommonConfig.width,
// 				height: this.videoCommonConfig.height,
// 				avcDecoderConfigRecord: description,
// 			});
// 		}

// 		const uint8 = new Uint8Array(chunk.byteLength);
// 		chunk.copyTo(uint8);
// 		const sampleDuration = (chunk.duration! * VIDEO_TIMESCALE) / 1_000_000;

// 		this.chunkOffset = addSample(
// 			this.mp4File,
// 			this.videoTrackId,
// 			uint8,
// 			chunk.type === "key",
// 			sampleDuration,
// 			true,
// 			this.chunkOffset,
// 			this.isFirstVideoSample
// 		);

// 		if (this.isFirstVideoSample) {
// 			this.isFirstVideoSample = false;
// 		}
// 	};

// 	private getActiveVideoBoxAt(timeInS: number) {
// 		let videoBox: VideoBox | null = null;
// 		let prefixTimestamp = 0;

// 		for (let i = 0; i < this.videoBoxes.length; i++) {
// 			if (
// 				prefixTimestamp <= timeInS &&
// 				timeInS <= this.videoBoxes[i].getDurationInS() + prefixTimestamp
// 			) {
// 				videoBox = this.videoBoxes[i];
// 				break;
// 			}
// 			prefixTimestamp += this.videoBoxes[i].getDurationInS();
// 		}

// 		return videoBox;
// 	}
// }

export {};
