import type { VideoBox } from "@/lib/modify/VideoBox";
import { createContext } from "react";

export interface ActiveVideoBoxContextState {
	activeVideoBox: VideoBox | null;
	setActiveVideoBox(nextVideoBox: VideoBox | null): void;
}

export const ActiveVideoBoxContext =
	createContext<ActiveVideoBoxContextState | null>(null);

// src/components/modify/molecules/ActiveVideoBoxProvider/ActiveVideoBoxContext.ts

// src/components/modify/molecules/ActiveVideoBoxProvider/ActiveVideoBoxContext.ts

// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";
// import { VideoBox } from "@/lib/modify/VideoBox";

// export interface ActiveVideoBoxContextState {
// 	activeVideoBox: VideoBox | null;
// 	setActiveVideoBox: (box: VideoBox | null) => void;
// }

// export const ActiveVideoBoxContext =
// 	createContext<ActiveVideoBoxContextState | null>(null);

// export const ActiveVideoBoxProvider = ({
// 	children,
// }: {
// 	children: ReactNode;
// }) => {
// 	const [activeVideoBox, setActiveVideoBox] = useState<VideoBox | null>(null);

// 	return (
// 		<ActiveVideoBoxContext.Provider
// 			value={{ activeVideoBox, setActiveVideoBox }}
// 		>
// 			{children}
// 		</ActiveVideoBoxContext.Provider>
// 	);
// };

// export const useActiveVideoBox = () => {
// 	const context = useContext(ActiveVideoBoxContext);

// 	if (!context) {
// 		throw new Error(
// 			"useActiveVideoBox must be used within ActiveVideoBoxProvider"
// 		);
// 	}

// 	return context;
// };
