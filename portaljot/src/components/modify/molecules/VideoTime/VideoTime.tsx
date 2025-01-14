"use client";

import { useRef, useEffect } from "react";
import { eventsBus } from "@/lib/modify/EventsBus";
import { VideoHelpers } from "@/lib/modify/VideoHelpers";
import {
	videoTimeBoxStyles,
	currentTimeStyles,
	totalDurationStyles,
	slashStyles,
} from "./VideoTime.css";

export const VideoTime = () => {
	const currentTimeRef = useRef<HTMLDivElement | null>(null);
	const totalTimeRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const currentTimeNode = currentTimeRef.current;

		if (!currentTimeNode) {
			throw new Error("currentTimeNode must be specified");
		}

		return eventsBus.subscribe("currentTime", (time) => {
			currentTimeNode.innerText = VideoHelpers.formatTime(time, {
				includeMs: true,
			});
		});
	}, []);

	useEffect(() => {
		const totalTimeNode = totalTimeRef.current;

		if (!totalTimeNode) {
			throw new Error("totalTimeNode must be specified");
		}

		return eventsBus.subscribe("totalDuration", (time) => {
			totalTimeNode.innerText = VideoHelpers.formatTime(time, {
				includeMs: true,
			});
		});
	}, []);

	return (
		<div className={videoTimeBoxStyles}>
			<div ref={currentTimeRef} className={currentTimeStyles}>
				0:00.00
			</div>
			<div className={slashStyles}>/</div>
			<div ref={totalTimeRef} className={totalDurationStyles}>
				0:00.00
			</div>
		</div>
	);
};

// VideoTime.tsx

// "use client";

// import { useRef, useEffect } from "react";
// import { eventsBus } from "@/lib/modify/EventsBus";
// import { VideoHelpers } from "@/lib/modify/VideoHelpers";
// import {
// 	videoTimeBoxStyles,
// 	currentTimeStyles,
// 	totalDurationStyles,
// 	slashStyles,
// } from "./VideoTime.css";

// export const VideoTime = () => {
// 	const currentTimeRef = useRef<HTMLDivElement | null>(null);
// 	const totalTimeRef = useRef<HTMLDivElement | null>(null);

// 	useEffect(() => {
// 		const currentTimeNode = currentTimeRef.current;
// 		if (!currentTimeNode) {
// 			throw new Error("currentTimeNode must be specified");
// 		}

// 		const unsubscribe = eventsBus.subscribe("currentTime", (time) => {
// 			currentTimeNode.innerText = VideoHelpers.formatTime(time, {
// 				includeMs: true,
// 			});
// 		});

// 		return () => {
// 			unsubscribe();
// 		};
// 	}, []);

// 	useEffect(() => {
// 		const totalTimeNode = totalTimeRef.current;
// 		if (!totalTimeNode) {
// 			throw new Error("totalTimeNode must be specified");
// 		}

// 		const unsubscribe = eventsBus.subscribe("totalDuration", (time) => {
// 			totalTimeNode.innerText = VideoHelpers.formatTime(time, {
// 				includeMs: true,
// 			});
// 		});

// 		return () => {
// 			unsubscribe();
// 		};
// 	}, []);

// 	return (
// 		<div className={videoTimeBoxStyles}>
// 			<div ref={currentTimeRef} className={currentTimeStyles}>
// 				0:00.00
// 			</div>
// 			<div className={slashStyles}>/</div>
// 			<div ref={totalTimeRef} className={totalDurationStyles}>
// 				0:00.00
// 			</div>
// 		</div>
// 	);
// };
