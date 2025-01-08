"use client";

import { useState, useRef, type FC } from "react";
import { Wand2, Upload, X } from "lucide-react";
import { nanoid } from "nanoid";
import { useVideoBoxes } from "./useVideoBoxes";
import { Button } from "../../atoms";
import { storage } from "@/lib/modify/Storage";
import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";

const CAMERA_MOTIONS = [
	"Static",
	"Move Left",
	"Move Right",
	"Move Up",
	"Move Down",
	"Push In",
	"Pull Out",
	"Zoom In",
	"Zoom Out",
	"Pan Left",
	"Pan Right",
	"Orbit Left",
	"Orbit Right",
	"Crane Up",
	"Crane Down",
];

const LUMA_STYLES = [
	"3D Animation",
	"Anime",
	"Cinematic",
	"Digital Art",
	"Photographic",
];

const RUNWAY_MODES = ["standard", "fast"];

interface GenerateSectionProps {
	switchToGeneratedTab: () => void;
}

export const GenerateSection: FC<GenerateSectionProps> = ({
	switchToGeneratedTab,
}) => {
	const [prompt, setPrompt] = useState("");
	const [aspectRatio, setAspectRatio] = useState("16:9");
	const [duration, setDuration] = useState(4);
	const [cameraMotion, setCameraMotion] = useState(CAMERA_MOTIONS[0]);
	const [isGenerating, setIsGenerating] = useState(false);
	const { setGeneratedVideoBoxes, refreshVideoBoxes } = useVideoBoxes();

	// Model and style states
	const [selectedModel, setSelectedModel] = useState<"luma" | "runway">(
		"luma"
	);
	const [lumaStyle, setLumaStyle] = useState(LUMA_STYLES[0]);
	const [runwayMode, setRunwayMode] = useState(RUNWAY_MODES[0]);
	const [negativePrompt, setNegativePrompt] = useState("");

	// Loop toggle
	const [loop, setLoop] = useState(false);

	// Image upload states
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState("");
	const [imagePosition, setImagePosition] = useState<
		"first" | "last" | "both"
	>("first");
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const fileInputRef = useRef<HTMLInputElement>(null);

	/**
	 * Handle increments or decrements to the duration.
	 * - Luma: plus/minus 4, range 4–80
	 * - Runway: plus/minus 5, range 5–10
	 */
	const handleDurationChange = (increment: number) => {
		setDuration((prev) => {
			let newValue = prev + increment;

			if (selectedModel === "runway") {
				// For runway, clamp to [5, 10]
				newValue = Math.max(Math.min(newValue, 10), 5);
				console.log(
					`[GenerateSection] (Runway) handleDurationChange => prev: ${prev}, inc: ${increment}, newValue: ${newValue}`
				);
			} else {
				// For luma, clamp to [4, 80]
				newValue = Math.max(Math.min(newValue, 80), 4);
				console.log(
					`[GenerateSection] (Luma) handleDurationChange => prev: ${prev}, inc: ${increment}, newValue: ${newValue}`
				);
			}
			return newValue;
		});
	};

	/**
	 * Handle file uploads for the reference image.
	 */
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("[GenerateSection] handleImageUpload triggered.");
		const file = event.target.files?.[0];
		if (file) {
			console.log("[GenerateSection] File selected:", file.name);
			setImageFile(file);
			setImageUrl("");
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	/**
	 * Handle direct URL entries for the reference image.
	 */
	const handleImageUrlSubmit = (url: string) => {
		console.log(
			"[GenerateSection] handleImageUrlSubmit triggered with URL:",
			url
		);
		if (url.trim()) {
			setImageUrl(url);
			setImageFile(null);
			setPreviewUrl(url);
		}
	};

	/**
	 * Clear out the currently selected/typed image from state.
	 */
	const clearImage = () => {
		console.log("[GenerateSection] clearImage triggered.");
		setImageFile(null);
		setImageUrl("");
		setPreviewUrl("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	/**
	 * Main handler to generate the video with audio.
	 */
	const handleGenerate = async () => {
		console.log("[GenerateSection] Starting handleGenerate.");
		console.log("[GenerateSection] Current prompt:", prompt);
		console.log("[GenerateSection] Selected model:", selectedModel);
		console.log("[GenerateSection] Duration:", duration);
		console.log("[GenerateSection] Aspect ratio:", aspectRatio);
		console.log("[GenerateSection] Loop:", loop);

		if (!prompt.trim()) {
			console.warn(
				"[GenerateSection] No prompt provided. Generation aborted."
			);
			return;
		}

		setIsGenerating(true);

		try {
			const formData = new FormData();
			formData.append("prompt", prompt);
			formData.append("camera_motion", cameraMotion);
			formData.append("aspect_ratio", aspectRatio);

			// Send loop as "true" or "false" in string form
			formData.append("loop", String(loop));

			formData.append("model", selectedModel);

			// If user selected Luma, pass the direct duration
			// If user selected Runway, clamp it to 5 or 10 before sending
			if (selectedModel === "runway") {
				const forcedDuration = duration <= 5 ? 5 : 10;
				formData.append("duration_seconds", forcedDuration.toString());
				console.log(
					`[GenerateSection] Force-setting duration to ${forcedDuration} for Runway in formData.`
				);
				formData.append("mode", runwayMode);
			} else {
				formData.append("duration_seconds", duration.toString());
				formData.append("style", lumaStyle);
				formData.append("negative_prompt", negativePrompt);
			}

			// Append image references if any
			if (imageFile) {
				console.log(
					"[GenerateSection] Using file as reference image:",
					imageFile.name
				);
				formData.append("image", imageFile);

				// Only send image_position if loop == false
				if (!loop) {
					formData.append("image_position", imagePosition);
				}
			} else if (imageUrl) {
				console.log(
					"[GenerateSection] Using URL as reference image:",
					imageUrl
				);
				formData.append("image_url", imageUrl);

				// Only send image_position if loop == false
				if (!loop) {
					formData.append("image_position", imagePosition);
				}
			}

			console.log(
				"[GenerateSection] Sending formData to /api/generate-video-with-audio..."
			);
			const response = await fetch("/api/generate-video-with-audio", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(
					`Video generation failed: ${response.statusText}`
				);
			}

			console.log(
				"[GenerateSection] Received success response from server."
			);
			const blob = await response.blob();
			const buffer = await blob.arrayBuffer();

			console.log(
				`[GenerateSection] Video buffer received. Size: ${buffer.byteLength} bytes. Storing...`
			);

			const resourceId = nanoid();
			await storage.addVideoRawBox({
				name: prompt,
				buffer,
				resourceId,
				type: "generated",
			});

			console.log("[GenerateSection] Video buffer stored. Demuxing...");
			await VideoBoxDemuxer.processBuffer(buffer, resourceId);

			console.log(
				"[GenerateSection] Demux complete. Refreshing video boxes..."
			);
			await refreshVideoBoxes();

			console.log("[GenerateSection] Switching to 'Generated' tab...");
			switchToGeneratedTab();
		} catch (error) {
			console.error("[GenerateSection] Error generating video:", error);
		} finally {
			setIsGenerating(false);
			console.log("[GenerateSection] handleGenerate complete.");
		}
	};

	return (
		<div className="flex flex-col h-full p-5 space-y-6 overflow-y-auto">
			<h3 className="text-2xl font-normal text-white">
				Generate Video with Audio
			</h3>

			{/* MODEL SELECTION */}
			<div className="space-y-2">
				<p className="text-sm text-gray-400">Model</p>
				<div className="flex space-x-2">
					{["luma", "runway"].map((model) => (
						<button
							key={model}
							className={`px-3 py-1 text-sm rounded-md ${
								selectedModel === model
									? "bg-blue-500 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
							onClick={() => {
								console.log(
									`[GenerateSection] Model switched to: ${model}`
								);
								setSelectedModel(model as "luma" | "runway");

								if (model === "runway") {
									// If user picks runway, clamp to [5, 10] with nearest step of 5
									if (duration < 5) {
										console.log(
											"[GenerateSection] Clamping duration to 5 for Runway."
										);
										setDuration(5);
									} else if (duration > 10) {
										console.log(
											"[GenerateSection] Clamping duration to 10 for Runway."
										);
										setDuration(10);
									}
								}
							}}
						>
							{model.charAt(0).toUpperCase() + model.slice(1)}
						</button>
					))}
				</div>
			</div>

			{/* PROMPT */}
			<textarea
				className="w-full h-32 p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Describe the video and audio you want to generate..."
				value={prompt}
				onChange={(e) => {
					console.log(
						"[GenerateSection] Prompt changed:",
						e.target.value
					);
					setPrompt(e.target.value);
				}}
			/>

			{/* LOOP TOGGLE */}
			<div className="flex items-center space-x-2">
				<input
					type="checkbox"
					id="loopCheckbox"
					className="h-4 w-4 text-blue-500 border-gray-700 bg-gray-900 rounded focus:ring-blue-500"
					checked={loop}
					onChange={(e) => {
						console.log(
							"[GenerateSection] Loop toggled:",
							e.target.checked
						);
						setLoop(e.target.checked);
					}}
				/>
				<label
					htmlFor="loopCheckbox"
					className="text-sm text-gray-300 select-none"
				>
					Loop
				</label>
			</div>

			{/* IMAGE UPLOAD */}
			<div className="space-y-2">
				<p className="text-sm text-gray-400">
					Reference Image (Optional)
				</p>
				<div className="flex flex-col space-y-4">
					<div className="flex items-center space-x-4">
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
						/>
						<Button
							variant="secondary"
							onClick={() => {
								console.log(
									"[GenerateSection] Image upload clicked."
								);
								fileInputRef.current?.click();
							}}
						>
							<div className="size-full flex items-center justify-center gap-[2rem]">
								<Upload className="w-[3rem] h-[3rem] mr-2" />
								Upload Image
							</div>
						</Button>
						<div className="flex-1">
							<input
								type="text"
								placeholder="Or paste HTTPS image URL..."
								className="w-full p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								onBlur={(e) =>
									handleImageUrlSubmit(e.target.value)
								}
							/>
						</div>
					</div>

					{previewUrl && (
						<div className="relative w-40 h-40">
							<img
								src={previewUrl}
								alt="Preview"
								className="object-cover w-full h-full rounded-md"
							/>
							<button
								className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full hover:bg-gray-700"
								onClick={clearImage}
							>
								<X className="w-4 h-4 text-white" />
							</button>
						</div>
					)}

					{/* Only show image position if loop is OFF */}
					{(imageFile || imageUrl) && !loop && (
						<div className="space-y-2">
							<p className="text-sm text-gray-400">
								Image Position
							</p>
							<div className="flex space-x-2">
								{["first", "last", "both"].map((pos) => (
									<button
										key={pos}
										className={`px-3 py-1 text-sm rounded-md ${
											imagePosition === pos
												? "bg-blue-500 text-white"
												: "bg-gray-700 text-gray-300 hover:bg-gray-600"
										}`}
										onClick={() => {
											console.log(
												`[GenerateSection] Image position switched to: ${pos}`
											);
											setImagePosition(
												pos as "first" | "last" | "both"
											);
										}}
									>
										{pos.charAt(0).toUpperCase() +
											pos.slice(1)}
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* MODEL-SPECIFIC OPTIONS */}
			{selectedModel === "luma" && (
				<>
					<div className="space-y-2">
						<p className="text-sm text-gray-400">Style</p>
						<select
							value={lumaStyle}
							onChange={(e) => {
								console.log(
									"[GenerateSection] Luma style changed:",
									e.target.value
								);
								setLumaStyle(e.target.value);
							}}
							className="w-full p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							{LUMA_STYLES.map((style) => (
								<option key={style} value={style}>
									{style}
								</option>
							))}
						</select>
					</div>

					<div className="space-y-2">
						<p className="text-sm text-gray-400">Negative Prompt</p>
						<textarea
							className="w-full h-20 p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Describe what you don't want to see in the video..."
							value={negativePrompt}
							onChange={(e) => {
								console.log(
									"[GenerateSection] Negative prompt changed:",
									e.target.value
								);
								setNegativePrompt(e.target.value);
							}}
						/>
					</div>
				</>
			)}

			{selectedModel === "runway" && (
				<div className="space-y-2">
					<p className="text-sm text-gray-400">Generation Mode</p>
					<select
						value={runwayMode}
						onChange={(e) => {
							console.log(
								"[GenerateSection] Runway mode changed:",
								e.target.value
							);
							setRunwayMode(e.target.value);
						}}
						className="w-full p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{RUNWAY_MODES.map((mode) => (
							<option key={mode} value={mode}>
								{mode.charAt(0).toUpperCase() + mode.slice(1)}
							</option>
						))}
					</select>
				</div>
			)}

			{/* ASPECT RATIO */}
			<div className="space-y-2">
				<p className="text-sm text-gray-400">Aspect Ratio</p>
				<div className="flex space-x-2">
					{["1:1", "16:9", "4:3", "9:16", "21:9", "3:4", "9:21"].map(
						(ratio) => (
							<button
								key={ratio}
								className={`px-3 py-1 text-sm rounded-md ${
									aspectRatio === ratio
										? "bg-blue-500 text-white"
										: "bg-gray-700 text-gray-300 hover:bg-gray-600"
								}`}
								onClick={() => {
									console.log(
										"[GenerateSection] Aspect ratio changed:",
										ratio
									);
									setAspectRatio(ratio);
								}}
							>
								{ratio}
							</button>
						)
					)}
				</div>
			</div>

			{/* DURATION (shared plus/minus approach for both models) */}
			<div className="space-y-2">
				<p className="text-sm text-gray-400">Duration (seconds)</p>
				<div className="flex items-center space-x-2">
					<button
						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={() =>
							handleDurationChange(
								selectedModel === "runway" ? -5 : -4
							)
						}
						disabled={
							(selectedModel === "runway" && duration <= 5) ||
							(selectedModel === "luma" && duration <= 4)
						}
					>
						-
					</button>
					<span className="text-white">{duration}s</span>
					<button
						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={() =>
							handleDurationChange(
								selectedModel === "runway" ? 5 : 4
							)
						}
						disabled={
							(selectedModel === "runway" && duration >= 10) ||
							(selectedModel === "luma" && duration >= 80)
						}
					>
						+
					</button>

					{selectedModel === "luma" && (
						<span className="text-sm text-gray-400">
							(4 to 80 for Luma)
						</span>
					)}
					{selectedModel === "runway" && (
						<span className="text-sm text-gray-400">
							(5 or 10 for Runway)
						</span>
					)}
				</div>
			</div>

			{/* CAMERA MOTION */}
			<div className="space-y-2">
				<p className="text-sm text-gray-400">Camera Motion</p>
				<select
					value={cameraMotion}
					onChange={(e) => {
						console.log(
							"[GenerateSection] Camera motion changed:",
							e.target.value
						);
						setCameraMotion(e.target.value);
					}}
					className="w-full p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{CAMERA_MOTIONS.map((motion) => (
						<option key={motion} value={motion}>
							{motion}
						</option>
					))}
				</select>
			</div>

			{/* GENERATE BUTTON */}
			<Button
				variant="primary"
				onClick={handleGenerate}
				disabled={isGenerating || !prompt.trim()}
			>
				{isGenerating ? (
					<span className="flex items-center">
						<Wand2 className="w-5 h-5 mr-2 animate-spin" />
						Generating...
					</span>
				) : (
					<span className="flex items-center">
						<Wand2 className="w-5 h-5 mr-2" />
						Generate Video with Audio
					</span>
				)}
			</Button>
		</div>
	);
};
