"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { NexusConjureRootState } from "@/lib/redux/stores/ncThemeStore";
import { useViewportContext } from "@/hooks/useViewportContext";
import { useEffect } from "react";
import Background0 from "../nexusconjure/Background0";

export default function BackgroundImage() {
	const { width, height, fontSize, deviceInfo } = useViewportContext();
	const getWidth = (width: number, dynamicScreenSize: number) => {
		const strWidth = Math.round(width * dynamicScreenSize).toString();
		return { strWidth };
	};
	const { strWidth } = getWidth(width, 30.0);

	const theme = useSelector(
		(state: NexusConjureRootState) => state.nexusConjure.theme
	);

	useEffect(() => {
		console.log("Width: ", width);
		console.log("Height: ", height);
		console.log("Font Size: ", fontSize);
		console.log("Device Info: ", deviceInfo);
	}, []);

	return (
		<div className="background-image-container">
			{/* <Image
				src={
					theme === "nc-light"
						? "/assets/nexusconjurecom-front-0_.svg"
						: "/assets/nexusconjure-com-front-0.svg"
				}
				width={1792}
				height={1080}
				alt="Background"
				className="background-image"
				layout="fill"
				objectFit="cover"
				quality={100}
				priority
			/> */}
			<Background0 id="background-0" className="background-image" />
		</div>
	);
}
