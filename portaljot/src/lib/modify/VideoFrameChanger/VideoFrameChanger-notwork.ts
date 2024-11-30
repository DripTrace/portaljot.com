import { type VideoBoxEffects } from "../VideoBox";
import {
	TexturePerPixelProcessor,
	TextureSpatialConvolutionProcessor,
} from "./texture-processors";

export class VideoFrameChanger {
	private perPixelProcessor: TexturePerPixelProcessor;
	private spatialConvolutionProcessor: TextureSpatialConvolutionProcessor;

	constructor() {
		this.perPixelProcessor = new TexturePerPixelProcessor();
		this.spatialConvolutionProcessor =
			new TextureSpatialConvolutionProcessor();
	}

	processFrame = (frame: VideoFrame, effects: VideoBoxEffects) => {
		if (frame.codedWidth === 0 || frame.codedHeight === 0) {
			console.warn(
				"Invalid frame dimensions:",
				frame.codedWidth,
				frame.codedHeight
			);
			return frame; // Return the original frame if dimensions are invalid
		}

		const init = {
			codedHeight: frame.codedHeight,
			codedWidth: frame.codedWidth,
			displayWidth: frame.displayWidth,
			displayHeight: frame.displayHeight,
			duration: frame.duration ?? undefined,
			timestamp: frame.timestamp,
			format: frame.format!,
		};

		let processedByPixelCanvas: HTMLCanvasElement | OffscreenCanvas;
		let processedCanvas: HTMLCanvasElement | OffscreenCanvas;

		try {
			processedByPixelCanvas = this.perPixelProcessor.processTexture(
				frame,
				effects
			);
			processedCanvas = this.spatialConvolutionProcessor.processTexture(
				processedByPixelCanvas,
				effects
			);
		} catch (error) {
			console.error("Error processing frame:", error);
			return frame; // Return the original frame if processing fails
		}

		if (processedCanvas.width === 0 || processedCanvas.height === 0) {
			console.warn(
				"Invalid processed canvas dimensions:",
				processedCanvas.width,
				processedCanvas.height
			);
			return frame; // Return the original frame if processed canvas is invalid
		}

		let newFrame: VideoFrame;
		try {
			newFrame = new VideoFrame(processedCanvas, init);
		} catch (error) {
			console.error("Error creating new VideoFrame:", error);
			return frame; // Return the original frame if we can't create a new one
		}

		frame.close(); // Close the original frame only after we've successfully created a new one

		return newFrame;
	};
}
