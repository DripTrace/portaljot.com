"use client";

import useCustomCursor from "@/app/hooks/LLPMGCursor";
import React from "react";

const Cursor: React.FC = () => {
	const { x, y } = useCustomCursor();

	return (
		<>
			<div
				className="custom-cursor"
				style={{ left: `${x}px`, top: `${y}px` }}
			></div>
			<div
				className="custom-cursor-dot"
				style={{ left: `${x}px`, top: `${y}px` }}
			></div>
		</>
	);
};

export default Cursor;
