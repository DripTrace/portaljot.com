"use client";

import { useState, useEffect, type FC } from "react";
import { storage } from "@/lib/modify/Storage";
import { Button } from "@/components/modify/atoms";
import {
	VideoBoxItem,
	VideoUploadBox,
} from "../VideoUploadSection/VideoBoxItem";
import { VideoBox } from "@/lib/modify/VideoBox";
import { useVideoBoxes } from "../VideoUploadSection/useVideoBoxes";

interface ExportedVideosTabProps {
	onAddToTimeline: (videoBox: VideoBox) => void;
}

export const ExportedVideosTab: FC<ExportedVideosTabProps> = ({
	onAddToTimeline,
}) => {
	const { videoBoxes } = useVideoBoxes();
	const { exportedVideoBoxes, refreshVideoBoxes } = useVideoBoxes();
	const [exportedVideos, setExportedVideos] = useState<VideoUploadBox[]>([]);
	const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

	useEffect(() => {
		refreshVideoBoxes();
	}, [refreshVideoBoxes]);

	useEffect(() => {
		setExportedVideos(exportedVideoBoxes);
	}, [exportedVideoBoxes]);

	const handleDownload = async () => {
		if (selectedVideoId) {
			const video = exportedVideos.find(
				(v) => v.innerBox.id === selectedVideoId
			);
			if (video) {
				const rawBox = await storage
					.getVideoRawBoxes()
					.then((boxes) =>
						boxes.find(
							(box) => box.resourceId === video.innerBox.id
						)
					);
				if (rawBox) {
					const blob = new Blob([rawBox.buffer], {
						type: "video/mp4",
					});
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = `${video.name}.mp4`;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				}
			}
		}
	};

	const handleAddToTimeline = () => {
		if (selectedVideoId) {
			const video = exportedVideos.find(
				(v) => v.innerBox.id === selectedVideoId
			);
			if (video) {
				onAddToTimeline(video.innerBox);
			}
		}
	};

	return (
		<div>
			<div className="grid grid-cols-3 gap-4">
				{exportedVideos.map((video) => (
					<VideoBoxItem
						key={video.innerBox.id}
						item={video}
						isChosen={selectedVideoId === video.innerBox.id}
						onSelect={() => setSelectedVideoId(video.innerBox.id)}
						onFrame={() => {}}
					/>
				))}
			</div>
			<div className="mt-4 flex justify-between">
				<Button
					onClick={handleAddToTimeline}
					disabled={!selectedVideoId}
				>
					Add to Timeline
				</Button>
				<Button onClick={handleDownload} disabled={!selectedVideoId}>
					Download
				</Button>
			</div>
		</div>
	);
};
