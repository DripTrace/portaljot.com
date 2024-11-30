// "use client";

// import CreativeEditorSDK, { Configuration } from "@cesdk/cesdk-js";
// import { useEffect, useRef } from "react";

// interface ComponentProps {
// 	config?: Partial<Configuration>;
// }

// const Component: React.FC<ComponentProps> = ({ config = {} }) => {
// 	const cesdk_container = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		if (cesdk_container.current) {
// 			const fullConfig: Partial<Configuration> = {
// 				license: process.env.NEXT_PUBLIC_IMGLY_LICENSE || "",
// 				// Serve assets from IMG.LY CDN or locally
// 				baseURL:
// 					"https://cdn.img.ly/packages/imgly/cesdk-js/1.36.1/assets",
// 				// Enable local uploads in Asset Library
// 				callbacks: { onUpload: "local" },
// 				...config,
// 			};

// 			CreativeEditorSDK.create(cesdk_container.current, fullConfig).then(
// 				async (instance) => {
// 					// Do something with the instance of CreativeEditor SDK, for example:
// 					// Populate the asset library with default / demo asset sources.
// 					instance.addDefaultAssetSources();
// 					instance.addDemoAssetSources({ sceneMode: "Design" });
// 					await instance.createDesignScene();
// 				}
// 			);
// 		}
// 	}, [config]);

// 	return (
// 		<div
// 			ref={cesdk_container}
// 			style={{ width: "100vw", height: "100vh" }}
// 		></div>
// 	);
// };

// export default Component;

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type { Configuration } from "@cesdk/engine";
import CreativeEditorSDK from "@cesdk/cesdk-js";

interface ComponentProps {
	config?: Partial<Configuration>;
}

const TheComponent: React.FC<ComponentProps> = ({ config = {} }) => {
	const cesdk_container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!cesdk_container.current) return;

		const fullConfig = {
			license: process.env.NEXT_PUBLIC_IMGLY_LICENSE || "",
			baseURL: "https://cdn.img.ly/packages/imgly/cesdk-js/1.36.1/assets",
			...config,
		};

		CreativeEditorSDK.create(cesdk_container.current, fullConfig).then(
			async (instance) => {
				instance.addDefaultAssetSources();
				instance.addDemoAssetSources({ sceneMode: "Design" });
				await instance.createDesignScene();
			}
		);
	}, [config]);

	return (
		<div
			ref={cesdk_container}
			style={{ width: "100vw", height: "100vh" }}
		></div>
	);
};

export default dynamic(() => Promise.resolve(TheComponent), {
	ssr: false,
});
