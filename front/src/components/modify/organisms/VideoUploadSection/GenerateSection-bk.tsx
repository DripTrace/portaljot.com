//works
"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { nanoid } from "nanoid";
// import { VideoBox } from "@/lib/modify/VideoBox";
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

	const handleDurationChange = (increment: number) => {
		setDuration((prev) => {
			const newValue = prev + increment;
			return Math.min(Math.max(newValue, 4), 80);
		});
	};

	const handleGenerate = async () => {
		setIsGenerating(true);
		try {
			const response = await fetch("/api/generate-video-with-audio", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: `${prompt} ${cameraMotion}`,
					aspect_ratio: aspectRatio,
					duration_seconds: duration,
					loop: true,
				}),
			});

			if (!response.ok) {
				throw new Error("Video generation failed");
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

			const box = await VideoBoxDemuxer.processBuffer(buffer, resourceId);

			await refreshVideoBoxes(); // Add this line

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

			<textarea
				className="w-full h-32 p-2 text-sm bg-gray-800 text-white border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Describe the video and audio you want to generate..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>

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

			{/* <div className="space-y-2">
				<p className="text-sm text-gray-400">Duration (seconds)</p>
				<Slider
					min={4}
					max={20}
					value={duration}
					title="Duration"
					onChange={(newValue) => {
						const roundedValue = Math.round(newValue / 4) * 4;
						setDuration(Math.min(Math.max(roundedValue, 4), 20));
					}}
				/>
				<p className="text-sm text-gray-400">{duration} seconds</p>
			</div> */}
			<div className="space-y-2">
				<p className="text-sm text-gray-400">Duration (seconds)</p>
				<div className="flex items-center space-x-2">
					<button
						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
						onClick={() => handleDurationChange(-4)}
						disabled={duration <= 4}
					>
						-
					</button>
					<span className="text-white">{duration}s</span>
					<button
						className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
						onClick={() => handleDurationChange(4)}
						disabled={duration >= 80}
					>
						+
					</button>
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
//works

// "use client";

// import { useState } from "react";
// import { Wand2 } from "lucide-react";
// import { nanoid } from "nanoid";
// import { VideoBox } from "@/lib/modify/VideoBox";
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
// 	const { setGeneratedVideoBoxes, refreshVideoBoxes, fetchVideoBoxes } =
// 		useVideoBoxes();

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

// 			await fetchVideoBoxes();
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

// 			<div className="space-y-2">
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
