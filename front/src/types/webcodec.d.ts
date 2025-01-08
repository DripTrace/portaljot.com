// declare interface EncodedVideoChunk {
// 	type: "key" | "delta";
// 	timestamp: number;
// 	duration?: number;
// 	byteLength: number;
// 	copyTo(destination: Uint8Array): void;
// }

// declare interface EncodedAudioChunk {
// 	type: "key" | "delta";
// 	timestamp: number;
// 	duration?: number;
// 	byteLength: number;
// 	copyTo(destination: Uint8Array): void;
// }

// declare interface AudioData {
// 	timestamp: number;
// 	duration?: number;
// 	numberOfFrames: number;
// 	numberOfChannels: number;
// 	sampleRate: number;
// 	format: AudioSampleFormat;
// 	allocationSize(options?: AudioDataCopyToOptions): number;
// 	copyTo(
// 		destination: AllowSharedBufferSource,
// 		options?: AudioDataCopyToOptions
// 	): void;
// 	clone(): AudioData;
// 	close(): void;
// }

// declare interface VideoFrame {
// 	timestamp: number;
// 	duration?: number;
// 	displayWidth: number;
// 	displayHeight: number;
// 	codedWidth: number;
// 	codedHeight: number;
// 	format: VideoPixelFormat;
// 	allocationSize(options?: VideoFrameCopyToOptions): number;
// 	copyTo(
// 		destination: AllowSharedBufferSource,
// 		options?: VideoFrameCopyToOptions
// 	): Promise<void>;
// 	clone(): VideoFrame;
// 	close(): void;
// }

// declare type AudioSampleFormat =
// 	| "u8"
// 	| "s16"
// 	| "s32"
// 	| "f32"
// 	| "u8-planar"
// 	| "s16-planar"
// 	| "s32-planar"
// 	| "f32-planar";

// declare type VideoPixelFormat =
// 	| "I420"
// 	| "I420A"
// 	| "I422"
// 	| "I444"
// 	| "NV12"
// 	| "RGBA"
// 	| "RGBX"
// 	| "BGRA"
// 	| "BGRX";

// declare interface AudioDataCopyToOptions {
// 	planeIndex?: number;
// 	format?: AudioSampleFormat;
// }

// declare interface VideoFrameCopyToOptions {
// 	rect?: DOMRectInit;
// 	layout?: VideoFrameBufferInit[];
// }

// declare type AllowSharedBufferSource = ArrayBuffer | ArrayBufferView;

// declare interface VideoFrameBufferInit {
// 	offset: number;
// 	stride: number;
// }

// Base interfaces for shared properties
interface BaseMediaData {
	readonly timestamp: number;
	readonly duration: number;
}

interface BaseEncodedChunk extends BaseMediaData {
	readonly type: "key" | "delta";
	readonly byteLength: number;
	copyTo(destination: Uint8Array): void;
}

// Audio Interfaces
declare interface AudioData extends BaseMediaData {
	readonly numberOfFrames: number;
	readonly numberOfChannels: number;
	readonly sampleRate: number;
	readonly format: AudioSampleFormat;
	allocationSize(options?: AudioDataCopyToOptions): number;
	copyTo(
		destination: AllowSharedBufferSource,
		options?: AudioDataCopyToOptions
	): void;
	clone(): AudioData;
	close(): void;
}

declare interface EncodedAudioChunk extends BaseEncodedChunk {}

declare interface AudioDecoderConfig {
	codec: string;
	sampleRate: number;
	numberOfChannels: number;
	description?: BufferSource;
}

declare interface AudioDecoderInit {
	output: (output: AudioData) => void;
	error: (error: Error) => void;
}

declare class AudioDecoder {
	readonly state: CodecState;
	readonly decodeQueueSize: number;

	constructor(init: AudioDecoderInit);

	configure(config: AudioDecoderConfig): void;
	decode(chunk: EncodedAudioChunk): void;
	flush(): Promise<void>;
	reset(): void;
	close(): void;

	static isConfigSupported(
		config: AudioDecoderConfig
	): Promise<AudioDecoderSupport>;
}

declare interface AudioDecoderSupport {
	supported: boolean;
	config: AudioDecoderConfig;
}

// Video Interfaces
declare interface VideoFrame extends BaseMediaData {
	readonly displayWidth: number;
	readonly displayHeight: number;
	readonly codedWidth: number;
	readonly codedHeight: number;
	readonly format: VideoPixelFormat;
	allocationSize(options?: VideoFrameCopyToOptions): number;
	copyTo(
		destination: AllowSharedBufferSource,
		options?: VideoFrameCopyToOptions
	): Promise<void>;
	clone(): VideoFrame;
	close(): void;
}

declare interface EncodedVideoChunk extends BaseEncodedChunk {}

declare interface VideoDecoderConfig {
	codec: string;
	codedWidth: number;
	codedHeight: number;
	description?: BufferSource;
	displayAspectWidth?: number;
	displayAspectHeight?: number;
	colorSpace?: VideoColorSpaceInit;
	hardwareAcceleration?:
		| "no-preference"
		| "prefer-hardware"
		| "prefer-software";
	optimizeForLatency?: boolean;
}

declare interface VideoDecoderInit {
	output: (output: VideoFrame) => void;
	error: (error: Error) => void;
}

declare class VideoDecoder {
	readonly state: CodecState;
	readonly decodeQueueSize: number;

	constructor(init: VideoDecoderInit);

	configure(config: VideoDecoderConfig): void;
	decode(chunk: EncodedVideoChunk): void;
	flush(): Promise<void>;
	reset(): void;
	close(): void;

	static isConfigSupported(
		config: VideoDecoderConfig
	): Promise<VideoDecoderSupport>;
}

// Chunk Constructors and Initialization Types
interface EncodedChunkInit {
	type: "key" | "delta";
	timestamp: number;
	duration?: number;
	data: BufferSource;
}

declare const EncodedAudioChunk: {
	prototype: EncodedAudioChunk;
	new (init: EncodedChunkInit): EncodedAudioChunk;
};

declare const EncodedVideoChunk: {
	prototype: EncodedVideoChunk;
	new (init: EncodedChunkInit): EncodedVideoChunk;
};

// Support Types
declare type CodecState = "unconfigured" | "configured" | "closed";
declare type BufferSource = ArrayBufferView | ArrayBuffer;
declare type AllowSharedBufferSource = ArrayBuffer | ArrayBufferView;

declare type AudioSampleFormat =
	| "u8"
	| "s16"
	| "s32"
	| "f32"
	| "u8-planar"
	| "s16-planar"
	| "s32-planar"
	| "f32-planar";

declare type VideoPixelFormat =
	| "I420"
	| "I420A"
	| "I422"
	| "I444"
	| "NV12"
	| "RGBA"
	| "RGBX"
	| "BGRA"
	| "BGRX";

declare interface VideoColorSpaceInit {
	primaries?: VideoColorPrimaries;
	transfer?: VideoTransferCharacteristics;
	matrix?: VideoMatrixCoefficients;
	fullRange?: boolean;
}

declare type VideoColorPrimaries = "bt709" | "bt470bg" | "smpte170m";
declare type VideoTransferCharacteristics =
	| "bt709"
	| "smpte170m"
	| "iec61966-2-1";
declare type VideoMatrixCoefficients =
	| "rgb"
	| "bt709"
	| "bt470bg"
	| "smpte170m";

// Copy Options
declare interface AudioDataCopyToOptions {
	planeIndex?: number;
	format?: AudioSampleFormat;
}

declare interface VideoFrameCopyToOptions {
	rect?: DOMRectInit;
	layout?: VideoFrameBufferInit[];
}

declare interface VideoFrameBufferInit {
	offset: number;
	stride: number;
}

declare interface VideoDecoderSupport {
	supported: boolean;
	config: VideoDecoderConfig;
}
