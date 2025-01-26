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
