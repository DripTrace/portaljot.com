"use client";

import { useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { VideoController } from "@/lib/modify/VideoController";
import { Layout, PlayerCanvas, Sidebar } from "@/components/modify/atoms";
import {
	VideoUploadSection,
	VideoEffectsSection,
	VideoExportSection,
	PlayerTimeline,
	useVideoSettings,
	useVideoBoxesOnTimeline,
} from "@/components/modify/organisms";
import {
	PlayerControls,
	useActiveVideoBox,
} from "@/components/modify/molecules";
import { GenerateSection } from "./organisms/VideoUploadSection/GenerateSection";
import { VideoSettingsSection } from "./organisms/VideoSettingsSection/VideoSettingsSection";

type SidebarKey =
	| "generate"
	| "videos-upload"
	| "video-settings"
	| "effects"
	| "video-export";

export const VideoEditor = () => {
	const [activeSidebarKey, setActiveSidebarKey] =
		useState<SidebarKey>("videos-upload");
	const [activeUploadTab, setActiveUploadTab] = useState<
		"uploaded" | "generated" | "exported"
	>("uploaded");

	const switchToGeneratedTab = () => {
		setActiveSidebarKey("videos-upload");
		setActiveUploadTab("generated");
	};

	const { settings } = useVideoSettings();

	const { videoBoxesOnTimeline, setVideoBoxesOnTimeline } =
		useVideoBoxesOnTimeline();

	const [{ playing }, setControllerState] = useState(
		VideoController.buildDefaultState()
	);

	const [controller] = useState(() => {
		return new VideoController({
			onEmit: (nextValues) =>
				setControllerState((oldValues) => ({
					...oldValues,
					...nextValues,
				})),
		});
	});

	const { activeVideoBox, setActiveVideoBox } = useActiveVideoBox();

	useEffect(() => {
		controller.setVideoSize(settings);
	}, [settings]);

	useEffect(() => {
		if (!activeVideoBox) return;
		setActiveSidebarKey("effects");
	}, [activeVideoBox]);

	useEffect(() => {
		if (!activeVideoBox) return;

		if (!videoBoxesOnTimeline.includes(activeVideoBox)) {
			setActiveVideoBox(null);
		}
	}, [activeVideoBox, videoBoxesOnTimeline]);

	useEffect(() => {
		controller.setVideoBoxes(videoBoxesOnTimeline);
	}, [videoBoxesOnTimeline]);

	useHotkeys("right", () => controller.playForward(), []);
	useHotkeys("left", () => controller.playBackward(), []);
	useHotkeys(
		"space",
		() => (playing ? controller.pause() : controller.play()),
		[playing]
	);

	return (
		<Layout.Box>
			<Layout.Controls>
				<Sidebar<SidebarKey>
					activeKey={activeSidebarKey}
					setActiveKey={setActiveSidebarKey}
					items={[
						{
							icon: "Wand",
							key: "generate",
							content: () => (
								<GenerateSection
									switchToGeneratedTab={switchToGeneratedTab}
								/>
							),
						},
						{
							icon: "Camera",
							key: "videos-upload",
							content: () => (
								<VideoUploadSection
									onMoveToTimeline={(box) => {
										setVideoBoxesOnTimeline((curBoxes) => [
											...curBoxes,
											box.copy(),
										]);
									}}
									activeTab={activeUploadTab}
									setActiveTab={setActiveUploadTab}
								/>
							),
						},
						{
							icon: "Sliders",
							key: "video-settings",
							content: () => (
								<VideoSettingsSection settings={settings} />
							),
						},
						{
							icon: "PaintBrush",
							key: "effects",
							content: () => <VideoEffectsSection />,
						},
						{
							icon: "Export",
							key: "video-export",
							content: () => (
								<VideoExportSection
									videoBoxes={videoBoxesOnTimeline}
									onExportStart={() => {
										controller.pause();
									}}
									onExportComplete={() =>
										setActiveUploadTab("exported")
									}
								/>
							),
						},
					]}
				/>
			</Layout.Controls>
			<Layout.Player>
				<PlayerCanvas ref={controller.setCanvasBox}>
					{videoBoxesOnTimeline.length > 0 && (
						<PlayerControls
							playing={playing}
							play={controller.play}
							pause={controller.pause}
							playBackward={controller.playBackward}
							playForward={controller.playForward}
						/>
					)}
				</PlayerCanvas>
			</Layout.Player>
			<Layout.Track>
				<PlayerTimeline
					videoBoxes={videoBoxesOnTimeline}
					seek={controller.seek}
				/>
			</Layout.Track>
		</Layout.Box>
	);
};
