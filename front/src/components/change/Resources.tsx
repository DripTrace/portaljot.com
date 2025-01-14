"use client";

import { useContext } from "react";
import { observer } from "mobx-react";
import { ExportVideoPanel } from "./panels/ExportVideoPanel";
import { AnimationsPanel } from "./panels/AnimationsPanel";
import { AudioResourcesPanel } from "./panels/AudioResourcesPanel";
import { FillPanel } from "./panels/FillPanel";
import { ImageResourcesPanel } from "./panels/ImageResourcesPanel";
import { TextResourcesPanel } from "./panels/TextResourcesPanel";
import { VideoResourcesPanel } from "./panels/VideoResourcesPanel";
import { EffectsPanel } from "./panels/EffectsPanel";
import { StoreContext } from "@/store/change";

export const Resources = observer(() => {
	const store = useContext(StoreContext);
	const selectedMenuOption = store.selectedMenuOption;
	return (
		<div className="bg-slate-200 h-full">
			{selectedMenuOption === "Video" ? <VideoResourcesPanel /> : null}
			{selectedMenuOption === "Audio" ? <AudioResourcesPanel /> : null}
			{selectedMenuOption === "Image" ? <ImageResourcesPanel /> : null}
			{selectedMenuOption === "Text" ? <TextResourcesPanel /> : null}
			{selectedMenuOption === "Animation" ? <AnimationsPanel /> : null}
			{selectedMenuOption === "Effect" ? <EffectsPanel /> : null}
			{selectedMenuOption === "Export" ? <ExportVideoPanel /> : null}
			{selectedMenuOption === "Fill" ? <FillPanel /> : null}
		</div>
	);
});
