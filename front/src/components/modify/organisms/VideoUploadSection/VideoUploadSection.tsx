"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import {
	Button,
	FileUploadButton,
	useFileReader,
} from "@/components/modify/atoms";
import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";
import { VideoBox } from "@/lib/modify/VideoBox";
import { storage } from "@/lib/modify/Storage";
import { VideoBoxItem, type VideoUploadBox } from "./VideoBoxItem";
import { useVideoBoxes } from "./useVideoBoxes";
import {
	uploadSectionBoxStyles,
	videosBoxStyles,
	controlsBoxStyles,
	videosListStyles,
	titleStyles,
	boxBorderStyles,
	contentLabelStyles,
	tabsStyles,
	tabStyles,
	activeTabStyles,
} from "./VideoUploadSection.css";

interface VideoUploadSectionProps {
	onMoveToTimeline(videoBox: VideoBox): void;
	activeTab: "uploaded" | "generated" | "exported";
	setActiveTab: (tab: "uploaded" | "generated" | "exported") => void;
}

export const VideoUploadSection = ({
	onMoveToTimeline,
	activeTab,
	setActiveTab,
}: VideoUploadSectionProps) => {
	const {
		videoBoxes,
		setVideoBoxes,
		generatedVideoBoxes,
		setGeneratedVideoBoxes,
		exportedVideoBoxes,
		setExportedVideoBoxes,
	} = useVideoBoxes();
	const [selectedBox, setSelectedBox] = useState<VideoUploadBox | null>(null);

	let currentBoxes: VideoUploadBox[] = [];

	switch (activeTab) {
		case "uploaded":
			currentBoxes = videoBoxes;
			break;
		case "generated":
			currentBoxes = generatedVideoBoxes;
			break;
		case "exported":
			currentBoxes = exportedVideoBoxes;
			break;
	}

	const { readFile } = useFileReader({
		onOutput: async (name, data) => {
			const resourceId = nanoid();
			await storage.addVideoRawBox({
				name,
				buffer: data,
				resourceId,
				type: "uploaded",
			});
			const box = await VideoBoxDemuxer.processBuffer(data, resourceId);
			setVideoBoxes([
				...videoBoxes,
				{ innerBox: box, name, id: resourceId },
			]);
		},
	});

	const updateBoxFrame = (frame: VideoFrame, boxId: string) => {
		const updateBoxes = (
			boxes: VideoUploadBox[],
			setBoxes: (boxes: VideoUploadBox[]) => void
		) => {
			const nextBoxes = boxes.map((box: VideoUploadBox) => {
				if (box.innerBox.id !== boxId) return box;
				return { ...box, frame };
			});
			setBoxes(nextBoxes);
		};

		switch (activeTab) {
			case "uploaded":
				updateBoxes(videoBoxes, setVideoBoxes);
				break;
			case "generated":
				updateBoxes(generatedVideoBoxes, setGeneratedVideoBoxes);
				break;
			case "exported":
				updateBoxes(exportedVideoBoxes, setExportedVideoBoxes);
				break;
		}
	};

	const handleDownload = async () => {
		if (!selectedBox) return;

		const { resourceId } = selectedBox.innerBox.getSerializableObject();
		const name = selectedBox.name;

		const rawBoxes = await storage.getVideoRawBoxes();
		const rawBox = rawBoxes.find((box) => box.resourceId === resourceId);
		if (rawBox) {
			const blob = new Blob([rawBox.buffer], { type: "video/mp4" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${name}.mp4`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	};

	return (
		<div className={uploadSectionBoxStyles}>
			<div className={tabsStyles}>
				<button
					className={`${tabStyles} ${activeTab === "uploaded" ? activeTabStyles : ""}`}
					onClick={() => setActiveTab("uploaded")}
				>
					Uploaded
				</button>
				<button
					className={`${tabStyles} ${activeTab === "generated" ? activeTabStyles : ""}`}
					onClick={() => setActiveTab("generated")}
				>
					Generated
				</button>
				<button
					className={`${tabStyles} ${activeTab === "exported" ? activeTabStyles : ""}`}
					onClick={() => setActiveTab("exported")}
				>
					Exported
				</button>
			</div>
			<div className={videosBoxStyles}>
				<h3 className={titleStyles}>
					{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
					videos
				</h3>
				{!currentBoxes || currentBoxes.length === 0 ? (
					<div className={boxBorderStyles}>
						<div className={contentLabelStyles}>
							{activeTab === "uploaded"
								? "To proceed with editing, please upload a video first"
								: activeTab === "generated"
									? "No generated videos yet. Use the generate tab to create videos."
									: "No exported videos yet. Export a video to see it here."}
						</div>
					</div>
				) : (
					<div className={videosListStyles}>
						{currentBoxes.map((box: VideoUploadBox) => (
							<VideoBoxItem
								key={box.innerBox.id}
								item={box}
								onSelect={() => setSelectedBox(box)}
								isChosen={
									selectedBox?.innerBox.id === box.innerBox.id
								}
								onFrame={(frame) =>
									updateBoxFrame(frame, box.innerBox.id)
								}
							/>
						))}
					</div>
				)}
			</div>
			<div className={controlsBoxStyles}>
				{activeTab === "uploaded" && (
					<FileUploadButton variant="primary" onUpload={readFile}>
						Upload
					</FileUploadButton>
				)}
				<Button
					variant="secondary"
					onClick={() => {
						if (selectedBox) {
							onMoveToTimeline(selectedBox.innerBox);
						}
					}}
					disabled={selectedBox === null}
				>
					Move to timeline
				</Button>
				{activeTab === "exported" && (
					<Button
						variant="secondary"
						onClick={handleDownload}
						disabled={selectedBox === null}
					>
						Download
					</Button>
				)}
			</div>
		</div>
	);
};
