// "use client";

// import { ncThemeStore } from "@/lib/redux/stores/ncThemeStore";
// import { Provider as NexusConjureProvider } from "react-redux";
// import { useSelector } from "react-redux";
// import { NexusConjureRootState } from "@/lib/redux/stores/ncThemeStore";
// import Image from "next/image";
// import { useViewportContext } from "@/hooks/useViewportContext";
// import { useEffect } from "react";

// function BackgroundImage() {
// 	const { width, height, fontSize, deviceInfo } = useViewportContext();
// 	const getWidth = (width: number, dynamicScreenSize: number) => {
// 		const strWidth = Math.round(width * dynamicScreenSize).toString();
// 		return { strWidth };
// 	};
// 	const { strWidth } = getWidth(width, 30.0);

// 	const theme = useSelector(
// 		(state: NexusConjureRootState) => state.nexusConjure.theme
// 	);

// 	useEffect(() => {
// 		console.log("Width: ", width);
// 		console.log("Height: ", height);
// 		console.log("Font Size: ", fontSize);
// 		console.log("Device Info: ", deviceInfo);
// 	}, [theme]);

// 	return (
// 		<div className="fixed-background">
// 			<Image
// 				src={
// 					theme === "nc-light"
// 						? "/assets/nexusconjurecom-front-0_.svg"
// 						: "/assets/nexusconjure-com-front-0.svg"
// 				}
// 				alt="Background"
// 				// layout="fill"
// 				fill
// 				// objectFit="cover"

// 				quality={100}
// 				priority
// 				style={{ objectFit: "cover" }}
// 			/>
// 		</div>
// 	);
// }

// export default function NexusConjureStoreProvider({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	return (
// 		<NexusConjureProvider store={ncThemeStore}>
// 			<BackgroundImage />
// 			{children}
// 		</NexusConjureProvider>
// 	);
// }

"use client";

import { ncThemeStore } from "@/lib/redux/stores/ncThemeStore";
import { Provider as NexusConjureProvider } from "react-redux";
import { useSelector } from "react-redux";
import { NexusConjureRootState } from "@/lib/redux/stores/ncThemeStore";
import Image from "next/image";
import { useViewportContext } from "@/hooks/useViewportContext";
import { useEffect } from "react";

function BackgroundImage() {
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
        console.log("Device Info Logs: ", deviceInfo.logs);
        console.log("Device Info Errors: ", deviceInfo.errors);
        console.log("Data Sources: ", deviceInfo.sources);
    }, [theme, width, height, fontSize, deviceInfo]);

    return (
        <div className="fixed-background">
            <Image
                src={
                    theme === "nc-light"
                        ? "/assets/nexusconjurecom-front-0_.svg"
                        : "/assets/nexusconjure-com-front-0.svg"
                }
                alt="Background"
                // layout="fill"
                fill
                // objectFit="cover"

                quality={100}
                priority
                style={{ objectFit: "cover" }}
            />
        </div>
    );
}

export default function NexusConjureStoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NexusConjureProvider store={ncThemeStore}>
            {/* <BackgroundImage /> */}
            {children}
        </NexusConjureProvider>
    );
}
