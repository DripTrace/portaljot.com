// // // app/page.tsx
// // "use client";

// // import { useContext } from "react";// import Player from "@/components/Player";

// // export default function Home() {
// // 	return (
// // 		<div id="foreground" className="full relative">
// // 			{/* Background */}
// // 			<div
// // 				id="background"
// // 				className="full absolute z-0 bg-red-500 overflow-hidden"
// // 			>
// // 				refresh if visible (javascript didn&apos;t load)
// // 				<input
// // 					type="file"
// // 					id="filepicker"
// // 					multiple
// // 					accept="video/mp4,video/x-m4v,video/*,image/*"
// // 					className="hidden"
// // 				/>
// // 			</div>

// // 			{/* Foreground */}
// // 			<div id="foreground" className="full absolute z-5 bg-black">
// // 				<div id="cursor_preview">
// // 					<div></div>
// // 					<canvas></canvas>
// // 				</div>
// // 				<div id="canvas"></div>
// // 				<div id="layer_holder">
// // 					<div
// // 						id="header"
// // 						className="bg-gray-700 text-white text-center text-sm flex justify-around items-center"
// // 					>
// // 						<div id="upload-btn" className="cursor-pointer">
// // 							+ media
// // 						</div>
// // 						<div id="add-text-btn" className="cursor-pointer">
// // 							+ text
// // 						</div>
// // 						<div id="settings-btn" className="cursor-pointer">
// // 							[...]
// // 						</div>
// // 						<div id="export-btn" className="cursor-pointer">
// // 							export
// // 						</div>
// // 						<a
// // 							href="https://github.com/russpalms/mebm_dev"
// // 							target="_blank"
// // 							rel="noreferrer"
// // 						>
// // 							src
// // 						</a>
// // 					</div>
// // 					<div id="layers"></div>
// // 				</div>
// // 				<div id="time"></div>
// // 			</div>
// // 			<Player />
// // 		</div>
// // 	);
// // }

// import Player from "@/components/edit/Player";

// export default function Home() {
// 	return (
// 		<main className="full">
// 			<div id="background" className="full">
// 				refresh if visible (javascript didn&apos;t load)
// 				<input
// 					type="file"
// 					id="filepicker"
// 					multiple
// 					accept="video/mp4,video/x-m4v,video/*,image/*"
// 				/>
// 			</div>
// 			<div id="foreground" className="full">
// 				<Player />
// 			</div>
// 		</main>
// 	);
// }

// Home.tsx
"use client";

import dynamic from "next/dynamic";

const Player = dynamic(() => import("@/components/nexusconjure/edit/Player"), {
	ssr: false,
});

export default function Home() {
	return (
		<main className="full">
			<div id="background" className="full">
				refresh if visible (javascript didn&apos;t load)
				<input
					type="file"
					id="filepicker"
					multiple
					accept="video/mp4,video/x-m4v,video/*,image/*"
				/>
			</div>
			<div id="foreground" className="full">
				<Player />
			</div>
		</main>
	);
}
