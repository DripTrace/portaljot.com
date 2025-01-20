import { useViewportContext } from "@/hooks/useViewportContext";
import { useEffect } from "react";

export default function Home() {
	const { width, height, fontSize, deviceInfo } = useViewportContext();

	useEffect(() => {
		console.log("Width: ", width);
		console.log("Height: ", height);
		console.log("Font Size: ", fontSize);
		console.log("Device Info: ", deviceInfo);
	}, [width, height, fontSize, deviceInfo]);

	return (
		<div>
			<h1>Welcome to Home Page</h1>
		</div>
	);
}
