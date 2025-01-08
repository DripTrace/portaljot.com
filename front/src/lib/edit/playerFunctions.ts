// lib/playerFunctions.ts
"use client";

import {
	//   RenderedLayer,
	//   MoveableLayer,
	//   ImageLayer,
	TextLayer,
	//   VideoLayer,
	//   AudioLayer,
	PlayerClass,
} from "./playerClasses";

import { popup } from "./popup";

export let player: PlayerClass;
export const dpr = window.devicePixelRatio || 1;
export let fps = 24;
export let max_size = (4000 * 1e6) / 4; // 4GB max

// Extension map
export const ext_map: { [key: string]: string } = {
	mp4: "video/mp4",
	mpeg4: "video/mp4",
	mpeg: "video/mpeg",
	ogv: "video/ogg",
	webm: "video/webm",
	gif: "image/gif",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	webp: "image/webp",
	aac: "audio/aac",
	mp3: "audio/mpeg",
	oga: "audio/ogg",
	wav: "audio/wav",
	weba: "audio/webm",
};

// Initialize the player
export function setupPlayer(
	canvasElement: HTMLDivElement,
	cursorPreviewElement: HTMLDivElement
) {
	console.log("setupPlayer", canvasElement, cursorPreviewElement);
	player = new PlayerClass(canvasElement, cursorPreviewElement);

	// Handle window events
	window.addEventListener("drop", handleDrop);
	window.addEventListener("paste", handlePaste);
	window.addEventListener("dragover", (e) => e.preventDefault());
	window.addEventListener("keydown", handleKeydown);
	window.addEventListener("resize", () => player.resize());
	window.addEventListener("touchmove", (e) => e.preventDefault(), {
		passive: false,
	});
	window.addEventListener("beforeunload", () => true);

	// Load from hash if present
	window.addEventListener("load", () => {
		if (location.hash) {
			const l = decodeURIComponent(location.hash.substring(1));
			for (const uri of l.split(",")) {
				player.addURI(uri);
			}
			location.hash = "";
		}
	});
}

// Handle file drop
function handleDrop(ev: DragEvent) {
	ev.preventDefault();
	if (ev.dataTransfer?.items) {
		for (let i = 0; i < ev.dataTransfer.items.length; i++) {
			const item = ev.dataTransfer.items[i];
			if (item.kind === "file") {
				const file = item.getAsFile();
				if (file) {
					player.addFile(file);
				}
			} else if (
				item.kind === "string" &&
				item.type === "text/uri-list"
			) {
				item.getAsString((uri) => player.addURI(uri));
			}
		}
	}
}

// Handle paste event
function handlePaste(ev: ClipboardEvent) {
	const clipboardData: DataTransfer | null =
		ev.clipboardData ||
		("clipboardData" in window
			? (window as unknown as { clipboardData: DataTransfer })
					.clipboardData
			: null);
	const uri = clipboardData?.getData("text");
	if (uri) player.addURI(uri);
}

// Handle keydown events
function handleKeydown(ev: KeyboardEvent) {
	if (ev.code === "Space") {
		if (player.playing) {
			player.pause();
		} else {
			player.play();
		}
	} else if (ev.code === "ArrowLeft") {
		player.prev();
	} else if (ev.code === "ArrowRight") {
		player.next();
	} else if (ev.code === "Backspace") {
		player.delete_anchor();
	} else if (ev.code === "KeyS") {
		player.split();
	} else if (ev.code === "KeyI") {
		if (ev.ctrlKey) {
			const uris = prompt("Paste comma-separated list of URLs")?.replace(
				/ /g,
				""
			);
			if (uris) {
				const encoded = encodeURIComponent(uris);
				location.hash = encoded;
			}
		}
	} else if (ev.code === "KeyJ") {
		if (ev.ctrlKey) {
			exportToJson();
		}
	}
}

// Upload media
export function uploadMedia() {
	const fileInput = document.getElementById("filepicker") as HTMLInputElement;
	fileInput.addEventListener("input", function () {
		if (!uploadSupportedType(fileInput.files)) return;
		if (fileInput.files) {
			for (let i = 0; i < fileInput.files.length; i++) {
				const file = fileInput.files[i];
				player.addFile(file);
			}
		}
		fileInput.value = "";
	});
	fileInput.click();
}

// export function uploadMedia() {
//     const filePicker = document.getElementById('filepicker') as HTMLInputElement;
//     filePicker.click();
//     filePicker.onchange = (event) => {
//       const files = (event.target as HTMLInputElement).files;
//       if (files) {
//         for (let i = 0; i < files.length; i++) {
//           player.addFile(files[i]);
//         }
//       }
//     };
//   }

// Check if uploaded file types are supported
function uploadSupportedType(files: FileList | null) {
	if (!files) return false;
	const badUserExtensions: File[] = [];

	Array.from(files).forEach((file) => {
		const extension = file.name.split(".").pop();
		if (extension && !(extension in ext_map)) {
			badUserExtensions.push(file);
		}
	});

	if (badUserExtensions.length) {
		const badFiles = badUserExtensions
			.map((ext) => `- ${ext.name}`)
			.join("<br>");
		const text = document.createElement("div");
		text.style.textAlign = "left";
		text.innerHTML = `
      The file(s) you uploaded are not supported:
      <br>
      <br>
      ${badFiles}
    `;
		popup(text);
	}
	return badUserExtensions.length === 0;
}

// Add text layer
export function addText() {
	const t = prompt("Enter text");
	if (t) {
		player.add(new TextLayer(t));
	}
}

// Update settings
export function updateSettings() {
	const settings = new Settings();
	settings.add(
		"fps",
		"text",
		(e) => (e.value = fps.toFixed(2)),
		(e) => (fps = Number.parseInt((e.target as HTMLInputElement).value))
	);
	settings.add(
		"max RAM (in MB)",
		"text",
		(e) => (e.value = (max_size / 1e6).toFixed(2)),
		(e) =>
			(max_size =
				1e6 * Number.parseInt((e.target as HTMLInputElement).value))
	);
	popup(settings.div);
}

// Export to JSON
export function exportToJson() {
	const json = player.dumpToJson();
	const text = document.createElement("div");
	const pre = document.createElement("pre");
	pre.textContent = json;
	text.appendChild(pre);
	popup(text);
}

// Settings class
export class Settings {
	div: HTMLDivElement;
	holder: HTMLDivElement;

	constructor() {
		this.div = document.createElement("div");
		this.div.classList.add("settings");
		this.holder = document.createElement("div");
		this.holder.classList.add("holder");
		this.div.appendChild(this.holder);
		const ok = document.createElement("a");
		ok.textContent = "[apply]";
		this.div.appendChild(ok);
	}

	add(
		name: string,
		type: string | null,
		init: (elem: HTMLInputElement) => void,
		callback: (e: Event) => void,
		elem_type = "input"
	) {
		const label = document.createElement("label");
		label.textContent = name;
		const setting = document.createElement(elem_type) as HTMLInputElement;
		setting.addEventListener("change", callback);
		if (type) {
			setting.type = type;
		}
		init(setting);
		this.holder.appendChild(label);
		this.holder.appendChild(setting);
	}
}
