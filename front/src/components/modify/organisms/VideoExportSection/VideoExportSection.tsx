//works
"use client";

import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "@/components/modify/atoms";
import { VideoExporter } from "@/lib/modify/VideoExporter";
import type { VideoBox } from "@/lib/modify/VideoBox";
import { useVideoSettings } from "../VideoSettingsSection";
import { useVideoBoxes } from "../VideoUploadSection/useVideoBoxes";
import { storage } from "@/lib/modify/Storage";
// import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";
import {
	sectionBoxStyles,
	titleStyles,
	contentBoxStyles,
	contentLabelStyles,
	resolutionStyles,
	ratioStyles,
	exportButtonBoxStyles,
} from "./VideoExportSection.css";
import { tokens } from "@/styles/modify/ui-tokens";

interface VideoExportSectionProps {
	onExportStart(): void;
	videoBoxes: VideoBox[];
	onExportComplete(): void;
}

export const VideoExportSection: React.FC<VideoExportSectionProps> = ({
	onExportStart,
	videoBoxes,
	onExportComplete,
}) => {
	const { settings } = useVideoSettings();
	const { setVideoBoxes, refreshVideoBoxes } = useVideoBoxes();

	const [
		{ showProgress, curEncodedNums, maxEncodedNums, exported },
		setState,
	] = useState(VideoExporter.getDefaultState());
	const [exporterService] = useState(
		() =>
			new VideoExporter({
				onEmit: (newState) =>
					setState((prevState) => ({ ...prevState, ...newState })),
			})
	);

	useEffect(() => {
		if (exported) {
			const saveExportedVideo = async () => {
				const buffer = exporterService.getExportedBuffer();
				if (buffer) {
					const resourceId = `exported-${Date.now()}`;
					const name = `Exported_${new Date().toLocaleString()}`;

					await storage.addVideoRawBox({
						name,
						buffer,
						resourceId,
						type: "exported",
					});

					await refreshVideoBoxes();
					onExportComplete();
				}
			};

			saveExportedVideo();
		}
	}, [exported, exporterService, refreshVideoBoxes, onExportComplete]);

	const handleExport = () => {
		onExportStart();
		const [width, height] = settings.resolution.split("x").map(Number);
		exporterService.exportVideo(videoBoxes, {
			width,
			height,
		});
	};

	return (
		<div className={sectionBoxStyles}>
			<h3 className={titleStyles}>Video export</h3>
			<div className={contentBoxStyles}>
				<div className={contentLabelStyles}>
					Exported video will be in{" "}
					<span className={ratioStyles}>{settings.ratio}</span>,{" "}
					<span className={resolutionStyles}>
						{settings.resolution}
					</span>
					. If you want to change them, please go to video settings
					section.
				</div>
				<div className={exportButtonBoxStyles}>
					<Button
						maxWidth="18rem"
						variant="secondary"
						onClick={handleExport}
						disabled={videoBoxes.length === 0 || showProgress}
					>
						{showProgress ? "Exporting..." : "Export"}
					</Button>
				</div>
				{showProgress && (
					<div style={{ width: 100, height: 100, margin: "0 auto" }}>
						<CircularProgressbar
							value={curEncodedNums}
							maxValue={maxEncodedNums}
							text={`${Math.round((curEncodedNums * 100) / maxEncodedNums)}%`}
							styles={buildStyles({
								strokeLinecap: "round",
								textSize: "16px",
								pathTransitionDuration: 0.3,
								pathColor: tokens.colors["bright-blue"],
								trailColor: tokens.colors["secondary-bg"],
								textColor: tokens.colors["pale-blue"],
							})}
						/>
					</div>
				)}
				{exported && (
					<div style={{ textAlign: "center", marginTop: "10px" }}>
						Video exported successfully. Check the "Exported" tab to
						view it.
					</div>
				)}
			</div>
		</div>
	);
};

//works

// "use client";

// import React, { useState, useEffect } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { Button } from "@/components/modify/atoms";
// import { VideoExporter } from "@/lib/modify/VideoExporter";
// import { type VideoBox } from "@/lib/modify/VideoBox";
// import { useVideoSettings } from "../VideoSettingsSection";
// import { useVideoBoxes } from "../VideoUploadSection/useVideoBoxes";
// import { storage } from "@/lib/modify/Storage";
// import { VideoBoxDemuxer } from "@/lib/modify/VideoBoxDemuxer";
// import {
// 	sectionBoxStyles,
// 	titleStyles,
// 	contentBoxStyles,
// 	contentLabelStyles,
// 	resolutionStyles,
// 	ratioStyles,
// 	exportButtonBoxStyles,
// } from "./VideoExportSection.css";
// import { tokens } from "@/styles/modify/ui-tokens";

// interface VideoExportSectionProps {
// 	onExportStart(): void;
// 	videoBoxes: VideoBox[];
// 	onExportComplete(): void;
// }

// export const VideoExportSection: React.FC<VideoExportSectionProps> = ({
// 	onExportStart,
// 	videoBoxes,
// 	onExportComplete,
// }) => {
// 	const { settings } = useVideoSettings();
// 	const { setVideoBoxes, refreshVideoBoxes, fetchVideoBoxes } =
// 		useVideoBoxes();

// 	const [
// 		{ showProgress, curEncodedNums, maxEncodedNums, exported },
// 		setState,
// 	] = useState(VideoExporter.getDefaultState());
// 	const [exporterService] = useState(
// 		() =>
// 			new VideoExporter({
// 				onEmit: (newState) =>
// 					setState((prevState) => ({ ...prevState, ...newState })),
// 			})
// 	);

// 	useEffect(() => {
// 		if (exported) {
// 			const saveExportedVideo = async () => {
// 				const buffer = exporterService.getExportedBuffer();
// 				if (buffer) {
// 					const resourceId = `exported-${Date.now()}`;
// 					const name = `Exported Video ${new Date().toLocaleString()}`;

// 					await storage.addVideoRawBox({
// 						name,
// 						buffer,
// 						resourceId,
// 						type: "exported",
// 					});

// 					await fetchVideoBoxes();
// 					onExportComplete();
// 				}
// 			};

// 			saveExportedVideo();
// 		}
// 	}, [exported, exporterService, fetchVideoBoxes, onExportComplete]);

// 	const handleExport = () => {
// 		onExportStart();
// 		const [width, height] = settings.resolution.split("x").map(Number);
// 		exporterService.exportVideo(videoBoxes, {
// 			width,
// 			height,
// 		});
// 	};

// 	return (
// 		<div className={sectionBoxStyles}>
// 			<h3 className={titleStyles}>Video export</h3>
// 			<div className={contentBoxStyles}>
// 				<div className={contentLabelStyles}>
// 					Exported video will be in{" "}
// 					<span className={ratioStyles}>{settings.ratio}</span>,{" "}
// 					<span className={resolutionStyles}>
// 						{settings.resolution}
// 					</span>
// 					. If you want to change them, please go to video settings
// 					section.
// 				</div>
// 				<div className={exportButtonBoxStyles}>
// 					<Button
// 						maxWidth="18rem"
// 						variant="secondary"
// 						onClick={handleExport}
// 						disabled={videoBoxes.length === 0 || showProgress}
// 					>
// 						{showProgress ? "Exporting..." : "Export"}
// 					</Button>
// 				</div>
// 				{showProgress && (
// 					<div style={{ width: 100, height: 100, margin: "0 auto" }}>
// 						<CircularProgressbar
// 							value={curEncodedNums}
// 							maxValue={maxEncodedNums}
// 							text={`${Math.round((curEncodedNums * 100) / maxEncodedNums)}%`}
// 							styles={buildStyles({
// 								strokeLinecap: "round",
// 								textSize: "16px",
// 								pathTransitionDuration: 0.3,
// 								pathColor: tokens.colors["bright-blue"],
// 								trailColor: tokens.colors["secondary-bg"],
// 								textColor: tokens.colors["pale-blue"],
// 							})}
// 						/>
// 					</div>
// 				)}
// 				{exported && (
// 					<div style={{ textAlign: "center", marginTop: "10px" }}>
// 						Video exported successfully. Check the "Exported" tab to
// 						view it.
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
