"use client";

import { useViewportContext } from "@/hooks/useViewportContext";
import { useEffect } from "react";

const RootClientComponent = () => {
	const { width, height, fontSize, deviceInfo } = useViewportContext();

	useEffect(() => {
		console.log("Width: ", width);
		console.log("Height: ", height);
		console.log("Font Size: ", fontSize);
		console.log("Device Info: ", deviceInfo);
	}, [width, height, fontSize, deviceInfo]);

	return (
		<div>
			<h1>Welcome to Root Home Client Component</h1>
		</div>
	);
};

export default RootClientComponent;
