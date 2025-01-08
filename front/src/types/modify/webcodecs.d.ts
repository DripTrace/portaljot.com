// declare global {
//     interface EncodedVideoChunkMetadata {
//       // Add any properties that you know are available
//       // For example:
//       timestamp: number;
//       // duration is not standard, so we'll remove it
//     }

//     type EncodedVideoChunkOutputCallback = (
//       chunk: EncodedVideoChunk,
//       metadata?: EncodedVideoChunkMetadata
//     ) => void;

//     class VideoEncoder {
//       constructor(init: VideoEncoderInit);
//       configure(config: VideoEncoderConfig): void;
//       encode(frame: VideoFrame, options?: VideoEncoderEncodeOptions): void;
//       flush(): Promise<void>;
//       close(): void;
//       static isConfigSupported(config: VideoEncoderConfig): Promise<VideoEncoderSupport>;
//     }

//     interface VideoEncoderInit {
//       output: EncodedVideoChunkOutputCallback;
//       error: (error: DOMException) => void;
//     }

//     interface VideoEncoderConfig {
//       codec: string;
//       width: number;
//       height: number;
//       bitrate?: number;
//       framerate?: number;
//       hardwareAcceleration?: 'prefer-hardware' | 'prefer-software' | 'no-preference';
//       alpha?: 'keep' | 'discard';
//       scalabilityMode?: string;
//       bitrateMode?: 'constant' | 'variable';
//       latencyMode?: 'quality' | 'realtime';
//     }

//     // Add other necessary interfaces and types
//   }

//   export {};
