"use client";

import { useContext } from "react";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";
import { StoreContext } from "@/store/change";

export const TimeLine = observer(() => {
	const store = useContext(StoreContext);
	const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;
	return (
		<div className="flex flex-col">
			<SeekPlayer />
			<div className="flex-1 relative ">
				{store.editorElements.map((element) => {
					return <TimeFrameView key={element.id} element={element} />;
				})}
				<div
					className="w-[2px] bg-red-400 absolute top-0 bottom-0 z-20"
					style={{
						left: `${percentOfCurrentTime}%`,
					}}
				></div>
			</div>
		</div>
	);
});
