// // // app/components/Player.tsx
// // "use client";

// // import { useEffect } from "react";
// // import {
// // 	setupPlayer,
// // 	addText,
// // 	uploadMedia,
// // 	updateSettings,
// // 	exportToJson,
// // } from "@/lib/playerFunctions";

// // const Player = () => {
// // 	useEffect(() => {
// // 		// Initialize the player when the component mounts
// // 		setupPlayer();

// // 		// Set up event listeners for buttons
// // 		const uploadBtn = document.getElementById("upload-btn");
// // 		const addTextBtn = document.getElementById("add-text-btn");
// // 		const settingsBtn = document.getElementById("settings-btn");
// // 		const exportBtn = document.getElementById("export-btn");

// // 		uploadBtn?.addEventListener("click", uploadMedia);
// // 		addTextBtn?.addEventListener("click", addText);
// // 		settingsBtn?.addEventListener("click", updateSettings);
// // 		exportBtn?.addEventListener("click", exportToJson);

// // 		// Clean up event listeners when component unmounts
// // 		return () => {
// // 			uploadBtn?.removeEventListener("click", uploadMedia);
// // 			addTextBtn?.removeEventListener("click", addText);
// // 			settingsBtn?.removeEventListener("click", updateSettings);
// // 			exportBtn?.removeEventListener("click", exportToJson);
// // 		};
// // 	}, []);

// // 	return null; // The Player component manipulates the DOM directly
// // };

// // export default Player;

// "use client";

// import { useEffect, useRef, useState } from "react";
// import styles from "./Player.module.css";
// import { PlayerClass } from "../../lib/edit/playerClasses";

// const Player = () => {
// 	const [player, setPlayer] = useState<PlayerClass | null>(null);
// 	const canvasRef = useRef<HTMLDivElement>(null);
// 	const timelineRef = useRef<HTMLDivElement>(null);
// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	useEffect(() => {
// 		if (canvasRef.current && timelineRef.current) {
// 			const newPlayer = new PlayerClass(
// 				canvasRef.current,
// 				timelineRef.current
// 			);
// 			setPlayer(newPlayer);

// 			const resizeObserver = new ResizeObserver(() => {
// 				newPlayer.resize();
// 			});
// 			resizeObserver.observe(canvasRef.current);
// 			resizeObserver.observe(timelineRef.current);

// 			return () => {
// 				resizeObserver.disconnect();
// 			};
// 		}
// 	}, []);

// 	const handleAddMedia = () => {
// 		fileInputRef.current?.click();
// 	};

// 	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const files = event.target.files;
// 		if (files && player) {
// 			for (let i = 0; i < files.length; i++) {
// 				player.addFile(files[i]);
// 			}
// 		}
// 	};

// 	return (
// 		<div id="foreground" className={styles.full}>
// 			<input
// 				type="file"
// 				ref={fileInputRef}
// 				style={{ display: "none" }}
// 				onChange={handleFileChange}
// 				multiple
// 				accept="video/mp4,video/x-m4v,video/*,image/*,audio/*"
// 			/>
// 			<div id="cursor_preview" className={styles.cursorPreview}>
// 				<div></div>
// 				<canvas></canvas>
// 			</div>
// 			<div id="canvas" ref={canvasRef} className={styles.canvas}></div>
// 			<div id="layer_holder" className={styles.layerHolder}>
// 				<div id="header" className={styles.header}>
// 					<div onClick={handleAddMedia}>+ media</div>
// 					<div>+ text</div>
// 					<div>[...]</div>
// 					<div id="export">export</div>
// 					<a
// 						href="https://github.com/bwasti/mebm"
// 						target="_blank"
// 						rel="noopener noreferrer"
// 					>
// 						src
// 					</a>
// 				</div>
// 				<div id="layers">
// 					{player?.layers.map((layer, index) => (
// 						<div key={index} className={styles.layer}>
// 							{layer.name}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 			<div id="time" className={styles.time}>
// 				<div ref={timelineRef} className={styles.timelineCanvas}></div>
// 			</div>
// 		</div>
// 	);
// };

// export default Player;

// Player.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import { PlayerClass } from "../../lib/edit/playerClasses";

const Player = () => {
	const [player, setPlayer] = useState<PlayerClass | null>(null);
	const canvasRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!canvasRef.current || !timelineRef.current) return;

		const newPlayer = new PlayerClass(
			canvasRef.current,
			timelineRef.current
		);
		setPlayer(newPlayer);

		const resizeObserver = new ResizeObserver(() => {
			newPlayer.resize();
		});

		resizeObserver.observe(canvasRef.current);
		resizeObserver.observe(timelineRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const handleAddMedia = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && player) {
			for (let i = 0; i < files.length; i++) {
				player.addFile(files[i]);
			}
		}
	};

	return (
		<div id="foreground" className={styles.full}>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
				multiple
				accept="video/mp4,video/x-m4v,video/*,image/*,audio/*"
			/>
			<div id="cursor_preview" className={styles.cursorPreview}>
				<div></div>
				<canvas></canvas>
			</div>
			<div id="canvas" ref={canvasRef} className={styles.canvas}></div>
			<div id="layer_holder" className={styles.layerHolder}>
				<div id="header" className={styles.header}>
					<div onClick={handleAddMedia}>+ media</div>
					<div>+ text</div>
					<div>[...]</div>
					<div id="export">export</div>
					<a
						href="https://github.com/bwasti/mebm"
						target="_blank"
						rel="noopener noreferrer"
					>
						src
					</a>
				</div>
				<div id="layers">
					{player?.layers.map((layer, index) => (
						<div key={index} className={styles.layer}>
							{layer.name}
						</div>
					))}
				</div>
			</div>
			<div id="time" className={styles.time}>
				<div ref={timelineRef} className={styles.timelineCanvas}></div>
			</div>
		</div>
	);
};

export default Player;
