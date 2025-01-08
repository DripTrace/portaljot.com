"use client";

import { useContext } from "react";
import { StoreContext } from "@/store/change";
import { observer } from "mobx-react";
import { EffectResource } from "../entity/EffectResource";
import {
	isEditorImageElement,
	isEditorVideoElement,
} from "@/store/change/Store";

export const EffectsPanel = observer(() => {
	const store = useContext(StoreContext);
	const selectedElement = store.selectedElement;
	return (
		<>
			<div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
				Effects
			</div>
			{selectedElement &&
			(isEditorImageElement(selectedElement) ||
				isEditorVideoElement(selectedElement)) ? (
				<EffectResource editorElement={selectedElement} />
			) : null}
		</>
	);
});
