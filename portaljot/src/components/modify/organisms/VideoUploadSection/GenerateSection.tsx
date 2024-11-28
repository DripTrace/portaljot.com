// //works
// "use client";

// import { useState } from "react";
// import { Wand2 } from "lucide-react";
// import { nanoid } from "nanoid";
// // import { VideoBox } from "@/lib/modify/VideoBox";
// import { useVideoBoxes } from "./useVideoBoxes";
// import { Button, Slider } from "../../atoms";
// import { storage } from "@/lib/modify/Storage";
// import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";

// const CAMERA_MOTIONS = [
// 	"Static",
// 	"Move Left",
// 	"Move Right",
// 	"Move Up",
// 	"Move Down",
// 	"Push In",
// 	"Pull Out",
// 	"Zoom In",
// 	"Zoom Out",
// 	"Pan Left",
// 	"Pan Right",
// 	"Orbit Left",
// 	"Orbit Right",
// 	"Crane Up",
// 	"Crane Down",
// ];

// interface GenerateSectionProps {
// 	switchToGeneratedTab: () => void;
// }

// export const GenerateSection: React.FC<GenerateSectionProps> = ({
// 	switchToGeneratedTab,
// }) => {
// 	const [prompt, setPrompt] = useState("");
// 	const [aspectRatio, setAspectRatio] = useState("16:9");
// 	const [duration, setDuration] = useState(4);
// 	const [cameraMotion, setCameraMotion] = useState(CAMERA_MOTIONS[0]);
// 	const [isGenerating, setIsGenerating] = useState(false);
// 	const { setGeneratedVideoBoxes, refreshVideoBoxes } = useVideoBoxes();

// 	const handleDurationChange = (increment: number) => {
// 		setDuration((prev) => {
// 			const newValue = prev + increment;
// 			return Math.min(Math.max(newValue, 4), 80);
// 		});
// 	};

// 	const handleGenerate = async () => {
// 		setIsGenerating(true);
// 		try {
// 			const response = await fetch("/api/generate-video-with-audio", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					prompt: `${prompt} ${cameraMotion}`,
// 					aspect_ratio: aspectRatio,
// 					duration_seconds: duration,
// 					loop: true,
// 				}),
// 			});

// 			if (!response.ok) {
// 				throw new Error("Video generation failed");
// 			}

// 			const blob = await response.blob();
// 			const buffer = await blob.arrayBuffer();

// 			const resourceId = nanoid();
// 			await storage.addVideoRawBox({
// 				name: prompt,
// 				buffer,
// 				resourceId,
// 				type: "generated",
// 			});

// 			const box = await VideoBoxDemuxer.processBuffer(buffer, resourceId);

// 			await refreshVideoBoxes(); // Add this line

// 			switchToGeneratedTab();
// 		} catch (error) {
// 			console.error("Error generating video:", error);
// 		} finally {
// 			setIsGenerating(false);
// 		}
// 	};

// 	return (
// 		<div className="flex flex-col h-full p-5 space-y-6 overflow-y-auto">
// 			<h3 className="text-2xl font-normal text-white">
// 				Generate Video with Audio
// 			</h3>

// 			<textarea
// 				className="w-full h-32 p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
// 				placeholder="Describe the video and audio you want to generate..."
// 				value={prompt}
// 				onChange={(e) => setPrompt(e.target.value)}
// 			/>

// 			<div className="space-y-2">
// 				<p className="text-sm text-gray-400">Aspect Ratio</p>
// 				<div className="flex space-x-2">
// 					{["1:1", "16:9", "4:3", "9:16", "21:9", "3:4", "9:21"].map(
// 						(ratio) => (
// 							<button
// 								key={ratio}
// 								className={`px-3 py-1 text-sm rounded-md ${
// 									aspectRatio === ratio
// 										? "bg-blue-500 text-white"
// 										: "bg-gray-700 text-gray-300 hover:bg-gray-600"
// 								}`}
// 								onClick={() => setAspectRatio(ratio)}
// 							>
// 								{ratio}
// 							</button>
// 						)
// 					)}
// 				</div>
// 			</div>

// 			{/* <div className="space-y-2">
// 				<p className="text-sm text-gray-400">Duration (seconds)</p>
// 				<Slider
// 					min={4}
// 					max={20}
// 					value={duration}
// 					title="Duration"
// 					onChange={(newValue) => {
// 						const roundedValue = Math.round(newValue / 4) * 4;
// 						setDuration(Math.min(Math.max(roundedValue, 4), 20));
// 					}}
// 				/>
// 				<p className="text-sm text-gray-400">{duration} seconds</p>
// 			</div> */}
// 			<div className="space-y-2">
// 				<p className="text-sm text-gray-400">Duration (seconds)</p>
// 				<div className="flex items-center space-x-2">
// 					<button
// 						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
// 						onClick={() => handleDurationChange(-4)}
// 						disabled={duration <= 4}
// 					>
// 						-
// 					</button>
// 					<span className="text-white">{duration}s</span>
// 					<button
// 						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
// 						onClick={() => handleDurationChange(4)}
// 						disabled={duration >= 80}
// 					>
// 						+
// 					</button>
// 				</div>
// 			</div>

// 			<div className="space-y-2">
// 				<p className="text-sm text-gray-400">Camera Motion</p>
// 				<select
// 					value={cameraMotion}
// 					onChange={(e) => setCameraMotion(e.target.value)}
// 					className="w-full p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// 				>
// 					{CAMERA_MOTIONS.map((motion) => (
// 						<option key={motion} value={motion}>
// 							{motion}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			<Button
// 				variant="primary"
// 				onClick={handleGenerate}
// 				disabled={isGenerating || !prompt.trim()}
// 			>
// 				{isGenerating ? (
// 					<span className="flex items-center">
// 						<Wand2 className="w-5 h-5 mr-2 animate-spin" />
// 						Generating...
// 					</span>
// 				) : (
// 					<span className="flex items-center">
// 						<Wand2 className="w-5 h-5 mr-2" />
// 						Generate Video with Audio
// 					</span>
// 				)}
// 			</Button>
// 		</div>
// 	);
// };
// //works

// // "use client";

// // import { useState } from "react";
// // import { Wand2 } from "lucide-react";
// // import { nanoid } from "nanoid";
// // import { VideoBox } from "@/lib/modify/VideoBox";
// // import { useVideoBoxes } from "./useVideoBoxes";
// // import { Button, Slider } from "../../atoms";
// // import { storage } from "@/lib/modify/Storage";
// // import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";

// // const CAMERA_MOTIONS = [
// // 	"Static",
// // 	"Move Left",
// // 	"Move Right",
// // 	"Move Up",
// // 	"Move Down",
// // 	"Push In",
// // 	"Pull Out",
// // 	"Zoom In",
// // 	"Zoom Out",
// // 	"Pan Left",
// // 	"Pan Right",
// // 	"Orbit Left",
// // 	"Orbit Right",
// // 	"Crane Up",
// // 	"Crane Down",
// // ];

// // interface GenerateSectionProps {
// // 	switchToGeneratedTab: () => void;
// // }

// // export const GenerateSection: React.FC<GenerateSectionProps> = ({
// // 	switchToGeneratedTab,
// // }) => {
// // 	const [prompt, setPrompt] = useState("");
// // 	const [aspectRatio, setAspectRatio] = useState("16:9");
// // 	const [duration, setDuration] = useState(4);
// // 	const [cameraMotion, setCameraMotion] = useState(CAMERA_MOTIONS[0]);
// // 	const [isGenerating, setIsGenerating] = useState(false);
// // 	const { setGeneratedVideoBoxes, refreshVideoBoxes, fetchVideoBoxes } =
// // 		useVideoBoxes();

// // 	const handleGenerate = async () => {
// // 		setIsGenerating(true);
// // 		try {
// // 			const response = await fetch("/api/generate-video-with-audio", {
// // 				method: "POST",
// // 				headers: {
// // 					"Content-Type": "application/json",
// // 				},
// // 				body: JSON.stringify({
// // 					prompt: `${prompt} ${cameraMotion}`,
// // 					aspect_ratio: aspectRatio,
// // 					duration_seconds: duration,
// // 					loop: true,
// // 				}),
// // 			});

// // 			if (!response.ok) {
// // 				throw new Error("Video generation failed");
// // 			}

// // 			const blob = await response.blob();
// // 			const buffer = await blob.arrayBuffer();

// // 			const resourceId = nanoid();
// // 			await storage.addVideoRawBox({
// // 				name: prompt,
// // 				buffer,
// // 				resourceId,
// // 				type: "generated",
// // 			});

// // 			await fetchVideoBoxes();
// // 			switchToGeneratedTab();
// // 		} catch (error) {
// // 			console.error("Error generating video:", error);
// // 		} finally {
// // 			setIsGenerating(false);
// // 		}
// // 	};

// // 	return (
// // 		<div className="flex flex-col h-full p-5 space-y-6 overflow-y-auto">
// // 			<h3 className="text-2xl font-normal text-white">
// // 				Generate Video with Audio
// // 			</h3>

// // 			<textarea
// // 				className="w-full h-32 p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
// // 				placeholder="Describe the video and audio you want to generate..."
// // 				value={prompt}
// // 				onChange={(e) => setPrompt(e.target.value)}
// // 			/>

// // 			<div className="space-y-2">
// // 				<p className="text-sm text-gray-400">Aspect Ratio</p>
// // 				<div className="flex space-x-2">
// // 					{["1:1", "16:9", "4:3", "9:16", "21:9", "3:4", "9:21"].map(
// // 						(ratio) => (
// // 							<button
// // 								key={ratio}
// // 								className={`px-3 py-1 text-sm rounded-md ${
// // 									aspectRatio === ratio
// // 										? "bg-blue-500 text-white"
// // 										: "bg-gray-700 text-gray-300 hover:bg-gray-600"
// // 								}`}
// // 								onClick={() => setAspectRatio(ratio)}
// // 							>
// // 								{ratio}
// // 							</button>
// // 						)
// // 					)}
// // 				</div>
// // 			</div>

// // 			<div className="space-y-2">
// // 				<p className="text-sm text-gray-400">Duration (seconds)</p>
// // 				<Slider
// // 					min={4}
// // 					max={20}
// // 					value={duration}
// // 					title="Duration"
// // 					onChange={(newValue) => {
// // 						const roundedValue = Math.round(newValue / 4) * 4;
// // 						setDuration(Math.min(Math.max(roundedValue, 4), 20));
// // 					}}
// // 				/>
// // 				<p className="text-sm text-gray-400">{duration} seconds</p>
// // 			</div>

// // 			<div className="space-y-2">
// // 				<p className="text-sm text-gray-400">Camera Motion</p>
// // 				<select
// // 					value={cameraMotion}
// // 					onChange={(e) => setCameraMotion(e.target.value)}
// // 					className="w-full p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // 				>
// // 					{CAMERA_MOTIONS.map((motion) => (
// // 						<option key={motion} value={motion}>
// // 							{motion}
// // 						</option>
// // 					))}
// // 				</select>
// // 			</div>

// // 			<Button
// // 				variant="primary"
// // 				onClick={handleGenerate}
// // 				disabled={isGenerating || !prompt.trim()}
// // 			>
// // 				{isGenerating ? (
// // 					<span className="flex items-center">
// // 						<Wand2 className="w-5 h-5 mr-2 animate-spin" />
// // 						Generating...
// // 					</span>
// // 				) : (
// // 					<span className="flex items-center">
// // 						<Wand2 className="w-5 h-5 mr-2" />
// // 						Generate Video with Audio
// // 					</span>
// // 				)}
// // 			</Button>
// // 		</div>
// // 	);
// // };

"use client";

import { useState, useRef } from "react";
import { Wand2, Upload, X } from "lucide-react";
import { nanoid } from "nanoid";
import { useVideoBoxes } from "./useVideoBoxes";
import { Button, Slider } from "../../atoms";
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

export const GenerateSection: React.FC<GenerateSectionProps> = ({
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

	// Image upload states
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState("");
	const [imagePosition, setImagePosition] = useState<
		"first" | "last" | "both"
	>("first");
	const [previewUrl, setPreviewUrl] = useState<string>("");

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDurationChange = (increment: number) => {
		setDuration((prev) => {
			const newValue = prev + increment;
			return Math.min(
				Math.max(newValue, 4),
				selectedModel === "runway" ? 10 : 80
			);
		});
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
			setImageUrl("");
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		}
	};

	const handleImageUrlSubmit = (url: string) => {
		if (url.trim()) {
			setImageUrl(url);
			setImageFile(null);
			setPreviewUrl(url);
		}
	};

	const clearImage = () => {
		setImageFile(null);
		setImageUrl("");
		setPreviewUrl("");
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleGenerate = async () => {
		setIsGenerating(true);
		try {
			const formData = new FormData();
			formData.append("prompt", prompt);
			formData.append("camera_motion", cameraMotion);
			formData.append("aspect_ratio", aspectRatio);
			formData.append("duration_seconds", duration.toString());
			formData.append("loop", "true");
			formData.append("model", selectedModel);

			if (selectedModel === "luma") {
				formData.append("style", lumaStyle);
				formData.append("negative_prompt", negativePrompt);
			} else {
				formData.append("mode", runwayMode);
			}

			if (imageFile) {
				formData.append("image", imageFile);
				formData.append("image_position", imagePosition);
			} else if (imageUrl) {
				formData.append("image_url", imageUrl);
				formData.append("image_position", imagePosition);
			}

			const response = await fetch("/api/generate-video-with-audio", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(
					`Video generation failed: ${response.statusText}`
				);
			}

			const blob = await response.blob();
			const buffer = await blob.arrayBuffer();

			const resourceId = nanoid();
			await storage.addVideoRawBox({
				name: prompt,
				buffer,
				resourceId,
				type: "generated",
			});

			await VideoBoxDemuxer.processBuffer(buffer, resourceId);
			await refreshVideoBoxes();
			switchToGeneratedTab();
		} catch (error) {
			console.error("Error generating video:", error);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="flex flex-col h-full p-5 space-y-6 overflow-y-auto">
			<h3 className="text-2xl font-normal text-white">
				Generate Video with Audio
			</h3>

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
								setSelectedModel(model as "luma" | "runway");
								if (model === "runway" && duration > 10) {
									setDuration(10);
								}
							}}
						>
							{model.charAt(0).toUpperCase() + model.slice(1)}
						</button>
					))}
				</div>
			</div>

			<textarea
				className="w-full h-32 p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Describe the video and audio you want to generate..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>

			{/* Image Upload Section */}
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
							onClick={() => fileInputRef.current?.click()}
						>
							<Upload className="w-4 h-4 mr-2" />
							Upload Image
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

					{(imageFile || imageUrl) && (
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
										onClick={() =>
											setImagePosition(
												pos as "first" | "last" | "both"
											)
										}
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

			{/* Model-specific options */}
			{selectedModel === "luma" && (
				<>
					<div className="space-y-2">
						<p className="text-sm text-gray-400">Style</p>
						<select
							value={lumaStyle}
							onChange={(e) => setLumaStyle(e.target.value)}
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
							onChange={(e) => setNegativePrompt(e.target.value)}
						/>
					</div>
				</>
			)}

			{selectedModel === "runway" && (
				<div className="space-y-2">
					<p className="text-sm text-gray-400">Generation Mode</p>
					<select
						value={runwayMode}
						onChange={(e) => setRunwayMode(e.target.value)}
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
								onClick={() => setAspectRatio(ratio)}
							>
								{ratio}
							</button>
						)
					)}
				</div>
			</div>

			<div className="space-y-2">
				<p className="text-sm text-gray-400">Duration (seconds)</p>
				<div className="flex items-center space-x-2">
					<button
						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={() => handleDurationChange(-4)}
						disabled={duration <= 4}
					>
						-
					</button>
					<span className="text-white">{duration}s</span>
					<button
						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={() => handleDurationChange(4)}
						disabled={
							duration >= (selectedModel === "runway" ? 10 : 80)
						}
					>
						+
					</button>
					{selectedModel === "runway" && (
						<span className="text-sm text-gray-400">
							(Max 10s for Runway)
						</span>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<p className="text-sm text-gray-400">Camera Motion</p>
				<select
					value={cameraMotion}
					onChange={(e) => setCameraMotion(e.target.value)}
					className="w-full p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{CAMERA_MOTIONS.map((motion) => (
						<option key={motion} value={motion}>
							{motion}
						</option>
					))}
				</select>
			</div>

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
