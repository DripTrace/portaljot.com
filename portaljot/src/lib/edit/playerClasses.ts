// lib/playerClasses.ts
"use client";

import { ext_map, dpr, fps } from "./playerFunctions";
import { popup } from "./popup";
import { Settings } from "./playerFunctions";

interface LayerChange {
	scale?: number;
	x?: number;
	y?: number;
	rotation?: number;
}

interface FileWithURI {
	name: string;
	uri: string;
}

type FileOrURI = File | FileWithURI;

function isFileWithURI(obj: unknown): obj is FileWithURI {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"name" in obj &&
		"uri" in obj &&
		typeof (obj as FileWithURI).name === "string" &&
		typeof (obj as FileWithURI).uri === "string"
	);
}

export class RenderedLayer {
	name: string;
	uri?: string;
	ready: boolean;
	total_time: number;
	start_time: number;
	width: number;
	height: number;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	thumb_canvas!: HTMLCanvasElement;
	thumb_ctx!: CanvasRenderingContext2D;
	player!: PlayerClass;
	//   player!: any;
	preview!: HTMLDivElement;
	title_div!: HTMLDivElement;
	description!: HTMLSpanElement;

	constructor(file: FileOrURI) {
		this.name = file.name;
		if (isFileWithURI(file)) {
			this.uri = file.uri;
		}
		this.ready = false;

		this.total_time = 0;
		this.start_time = 0;

		this.width = 0;
		this.height = 0;
		this.canvas = document.createElement("canvas");
		const ctx = this.canvas.getContext("2d");
		if (ctx) {
			this.ctx = ctx;
		} else {
			throw new Error("Could not get canvas context");
		}
		document.getElementById("background")?.appendChild(this.canvas);
	}

	dump() {
		return {
			width: this.width,
			height: this.height,
			name: this.name,
			start_time: this.start_time,
			total_time: this.total_time,
			uri: this.uri,
			type: this.constructor.name,
		};
	}

	resize() {
		this.thumb_canvas.width = this.thumb_canvas.clientWidth * dpr;
		this.thumb_canvas.height = this.thumb_canvas.clientHeight * dpr;
		this.thumb_ctx.scale(dpr, dpr);
	}

	show_preview(ref_time: number) {
		if (!this.ready) {
			return;
		}
		this.thumb_ctx.clearRect(
			0,
			0,
			this.thumb_canvas.clientWidth,
			this.thumb_canvas.clientHeight
		);
		this.render(this.thumb_ctx, ref_time);
	}

	update_name(name: string) {
		this.name = name;
		this.description.textContent = `"${this.name}"`;
	}

	init(player: PlayerClass, preview: HTMLDivElement) {
		this.player = player;
		this.preview = preview;
		this.canvas.width = this.player.width;
		this.canvas.height = this.player.height;
		this.title_div = this.preview.querySelector(
			".preview_title"
		) as HTMLDivElement;

		this.description = document.createElement("span");
		this.description.classList.add("description");
		this.description.addEventListener("click", () => {
			const new_text = prompt("Enter new name", this.name);
			if (new_text) {
				this.update_name(new_text);
			}
		});
		this.title_div.appendChild(this.description);

		const delete_option = document.createElement("a");
		delete_option.textContent = "[x]";
		delete_option.style.float = "right";
		delete_option.addEventListener("click", () => {
			if (confirm(`Delete layer "${this.name}"?`)) {
				this.player.remove(this);
			}
		});
		this.title_div.appendChild(delete_option);

		this.thumb_canvas = document.createElement("canvas");
		this.thumb_canvas.classList.add("preview_thumb");
		const thumb_ctx = this.thumb_canvas.getContext("2d");
		if (thumb_ctx) {
			this.thumb_ctx = thumb_ctx;
			this.thumb_ctx.scale(dpr, dpr);
		} else {
			throw new Error("Could not get thumb canvas context");
		}
		this.preview.appendChild(this.thumb_canvas);
		this.update_name(this.name);
	}

	render(_ctx_out: CanvasRenderingContext2D, _ref_time: number) {
		console.log("render", _ctx_out, _ref_time);
		// Base class does nothing
	}

	render_time(
		ctx: CanvasRenderingContext2D,
		y_coord: number,
		width: number,
		selected: boolean
	) {
		const scale = ctx.canvas.clientWidth / this.player.total_time;
		const start = scale * this.start_time;
		const length = scale * this.total_time;
		ctx.fillStyle = selected ? `rgb(210,210,210)` : `rgb(110,110,110)`;
		ctx.fillRect(start, y_coord - width / 2, length, width);
		const end_width = width * 6;
		const tab_width = 2;
		ctx.fillRect(start, y_coord - end_width / 2, tab_width, end_width);
		ctx.fillRect(
			start + length - tab_width / 2,
			y_coord - end_width / 2,
			tab_width,
			end_width
		);
	}

	update(_change: LayerChange, _time: number) {
		console.log("update", _change, _time);
		// Base class does nothing
	}

	drawScaled(
		source: CanvasRenderingContext2D | HTMLVideoElement | HTMLAudioElement,
		ctx_out: CanvasRenderingContext2D,
		video = false
	) {
		console.log("drawScaled", video);
		let width: number, height: number, drawSource: CanvasImageSource;

		if (source instanceof HTMLVideoElement) {
			width = source.videoWidth;
			height = source.videoHeight;
			drawSource = source;
		} else if (source instanceof CanvasRenderingContext2D) {
			width = source.canvas.width;
			height = source.canvas.height;
			drawSource = source.canvas;
		} else if (source instanceof HTMLAudioElement) {
			// Audio doesn't have visual representation, so we'll skip drawing
			return;
		} else {
			console.error("Invalid source type in drawScaled");
			return;
		}

		const in_ratio = width / height;
		const out_ratio = ctx_out.canvas.width / ctx_out.canvas.height;
		let ratio = 1;
		let offset_width = 0;
		let offset_height = 0;

		if (in_ratio > out_ratio) {
			// Source is wider
			ratio = ctx_out.canvas.width / width;
			offset_height = (ctx_out.canvas.height - ratio * height) / 2;
		} else {
			// Output is wider
			ratio = ctx_out.canvas.height / height;
			offset_width = (ctx_out.canvas.width - ratio * width) / 2;
		}

		ctx_out.drawImage(
			drawSource,
			0,
			0,
			width,
			height,
			offset_width,
			offset_height,
			ratio * width,
			ratio * height
		);
	}

	getContext(
		time: number
	): CanvasRenderingContext2D | HTMLVideoElement | null {
		console.log("getContext", time);
		return this.ctx;
	}
}

export class MoveableLayer extends RenderedLayer {
	frames: Float32Array[];
	anchors: Set<number>;

	constructor(file: FileOrURI) {
		super(file);
		this.frames = [];
		this.anchors = new Set();
	}

	dump() {
		const base = super.dump();
		return {
			...base,
			frames: this.frames.map((frame) => Array.from(frame)),
		};
	}

	init(player: PlayerClass, preview: HTMLDivElement) {
		super.init(player, preview);
		const total_frames = Math.ceil((this.total_time / 1000) * fps);
		for (let i = 0; i < total_frames; ++i) {
			this.frames.push(new Float32Array([0, 0, 1, 0]));
		}
		this.set_anchor(0);
	}

	set_anchor(index: number) {
		this.anchors.add(index);
	}

	is_anchor(index: number) {
		return this.anchors.has(index);
	}

	delete_anchor(ref_time: number) {
		const index = this.getIndex(ref_time);
		this.anchors.delete(index);
	}

	adjustTotalTime(diff: number) {
		if (diff > 0) {
			const frames_to_add = Math.ceil((diff / 1000) * fps);
			const last_frame = this.frames[this.frames.length - 1];
			for (let i = 0; i < frames_to_add; ++i) {
				this.frames.push(new Float32Array(last_frame));
			}
		} else {
			const frames_to_remove = Math.ceil((-diff / 1000) * fps);
			this.frames.splice(-frames_to_remove);
		}
		this.total_time += diff;
	}

	nearest_anchor(ref_time: number, forward: boolean) {
		const index = this.getIndex(ref_time);
		let nearest = -1;
		if (forward) {
			for (let i = index + 1; i < this.frames.length; ++i) {
				if (this.is_anchor(i)) {
					nearest = i;
					break;
				}
			}
		} else {
			for (let i = index - 1; i >= 0; --i) {
				if (this.is_anchor(i)) {
					nearest = i;
					break;
				}
			}
		}
		return nearest;
	}

	interpolate_frame(f0: Float32Array, f1: Float32Array, s: number) {
		const weight = s;
		const f = new Float32Array(4);
		f[0] = weight * f0[0] + (1 - weight) * f1[0];
		f[1] = weight * f0[1] + (1 - weight) * f1[1];
		f[2] = weight * f0[2] + (1 - weight) * f1[2];
		f[3] = weight * f0[3] + (1 - weight) * f1[3];
		return f;
	}

	interpolate(index: number) {
		const frame = this.frames[index];
		const is_anchor = this.is_anchor(index);
		let prev_idx = 0;
		let prev_frame = frame;
		let prev_is_anchor = false;
		let next_idx = this.frames.length - 1;
		let next_frame = frame;
		let next_is_anchor = false;

		for (let i = index - 1; i >= 0; i--) {
			if (this.is_anchor(i)) {
				prev_idx = i;
				prev_is_anchor = true;
				prev_frame = this.frames[i];
				break;
			}
		}

		for (let i = index + 1; i < this.frames.length; ++i) {
			if (this.is_anchor(i)) {
				next_idx = i;
				next_is_anchor = true;
				next_frame = this.frames[i];
				break;
			}
		}

		const prev_range = index - prev_idx;
		const eps = 1e-9;
		for (let i = 0; i <= prev_range; ++i) {
			const s = i / (prev_range + eps);
			this.frames[index - i] = this.interpolate_frame(
				prev_frame,
				frame,
				s
			);
		}
		const next_range = next_idx - index;
		for (let i = 0; i <= next_range; ++i) {
			const s = i / (next_range + eps);
			this.frames[index + i] = this.interpolate_frame(
				next_frame,
				frame,
				s
			);
		}
		if (prev_is_anchor) {
			this.set_anchor(prev_idx);
		}
		if (next_is_anchor) {
			this.set_anchor(next_idx);
		}
		if (is_anchor) {
			this.set_anchor(index);
		}
	}

	getIndex(ref_time: number) {
		const time = ref_time - this.start_time;
		const index = Math.floor((time / 1000) * fps);
		return index;
	}

	getTime(index: number) {
		return (index / fps) * 1000 + this.start_time;
	}

	getFrame(ref_time: number) {
		const index = this.getIndex(ref_time);
		if (index < 0 || index >= this.frames.length) {
			return null;
		}
		let frame = new Float32Array(this.frames[index]);
		// We floored the index, but might need to interpolate subframes
		if (index + 1 < this.frames.length) {
			const diff = ref_time - this.getTime(index);
			const diff_next = this.getTime(index + 1) - ref_time;
			const next_frame = this.frames[index + 1];
			const s = diff_next / (diff + diff_next);
			frame = this.interpolate_frame(frame, next_frame, s);
		}
		return frame;
	}

	update(change: LayerChange, ref_time: number) {
		const f = this.getFrame(ref_time);
		if (!f) {
			return;
		}
		const index = this.getIndex(ref_time);
		if (change.scale) {
			const old_scale = f[2];
			const new_scale = f[2] * change.scale;
			const delta_x =
				(this.width * old_scale - this.width * new_scale) / 2;
			const delta_y =
				(this.height * old_scale - this.height * new_scale) / 2;
			this.frames[index][0] = f[0] + delta_x;
			this.frames[index][1] = f[1] + delta_y;
			this.frames[index][2] = new_scale;
			this.interpolate(index);
			this.set_anchor(index);
		}
		if (change.x !== undefined) {
			this.frames[index][0] = change.x;
			this.interpolate(index);
			this.set_anchor(index);
		}
		if (change.y !== undefined) {
			this.frames[index][1] = change.y;
			this.interpolate(index);
			this.set_anchor(index);
		}
		if (change.rotation) {
			this.frames[index][3] = f[3] + change.rotation;
			this.interpolate(index);
			this.set_anchor(index);
		}
	}

	render_time(
		ctx: CanvasRenderingContext2D,
		y_coord: number,
		base_width: number,
		selected: boolean
	) {
		super.render_time(ctx, y_coord, base_width, selected);
		const scale = ctx.canvas.clientWidth / this.player.total_time;
		const width = 4 * base_width;
		for (let i = 0; i < this.frames.length; ++i) {
			if (this.is_anchor(i)) {
				const anchor_x = scale * (this.start_time + 1000 * (i / fps));
				ctx.fillStyle = `rgb(100,210,255)`;
				ctx.fillRect(anchor_x, y_coord - width / 2, 3, width);
			}
		}
	}
}

export class ImageLayer extends MoveableLayer {
	img: HTMLImageElement;
	reader?: FileReader;

	constructor(file: FileOrURI) {
		super(file);
		this.img = new Image();

		if (isFileWithURI(file)) {
			this.img.crossOrigin = "anonymous";
			this.img.src = file.uri;
			this.img.addEventListener(
				"load",
				() => {
					this.width = this.img.naturalWidth;
					this.height = this.img.naturalHeight;
					this.total_time = Number.MAX_SAFE_INTEGER;
					this.ready = true;
				},
				false
			);
		} else {
			this.reader = new FileReader();
			this.reader.addEventListener(
				"load",
				() => {
					this.img.src = this.reader!.result as string;
					this.img.addEventListener(
						"load",
						() => {
							this.width = this.img.naturalWidth;
							this.height = this.img.naturalHeight;
							this.total_time = Number.MAX_SAFE_INTEGER;
							this.ready = true;
						},
						false
					);
				},
				false
			);
			this.reader.readAsDataURL(file);
		}
	}

	render(ctx_out: CanvasRenderingContext2D, ref_time: number) {
		if (!this.ready) {
			return;
		}
		const f = this.getFrame(ref_time);
		if (f) {
			const scale = f[2];
			const x = f[0] + this.canvas.width / 2 - (this.width * scale) / 2;
			const y = f[1] + this.canvas.height / 2 - (this.height * scale) / 2;
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(
				this.img,
				0,
				0,
				this.width,
				this.height,
				x,
				y,
				scale * this.width,
				scale * this.height
			);
			this.drawScaled(this.ctx, ctx_out);
		}
	}
}

export class TextLayer extends MoveableLayer {
	color: string;
	shadow: boolean;
	name: string;

	constructor(text: string) {
		super({ name: text, uri: "" });
		this.name = text;
		this.color = "#ffffff";
		this.shadow = true;
		this.ready = true;
	}

	init(player: PlayerClass, preview: HTMLDivElement) {
		super.init(player, preview);

		const settings = new Settings();

		settings.add(
			"text",
			null,
			(i) => (i.value = this.name),
			(e) => this.update_name((e.target as HTMLInputElement).value),
			"textarea"
		);

		settings.add(
			"color",
			"color",
			(i) => (i.value = this.color),
			(e) => (this.color = (e.target as HTMLInputElement).value)
		);

		settings.add(
			"shadow",
			"checkbox",
			(i) => (i.checked = this.shadow),
			(e) => (this.shadow = (e.target as HTMLInputElement).checked)
		);

		const settings_link = document.createElement("a");
		settings_link.style.float = "right";
		settings_link.textContent = "[...]";
		settings_link.addEventListener("click", function () {
			popup(settings.div);
		});
		this.title_div.appendChild(settings_link);
	}

	update(change: LayerChange, ref_time: number) {
		const rect = this.ctx.measureText(this.name);
		this.width = rect.width;
		this.height =
			rect.actualBoundingBoxAscent + rect.actualBoundingBoxDescent;
		super.update(change, ref_time);
	}

	render(ctx_out: CanvasRenderingContext2D, ref_time: number) {
		const f = this.getFrame(ref_time);
		if (f) {
			const scale = f[2];
			this.ctx.font = Math.floor(scale * 30) + "px Georgia";
			const rect = this.ctx.measureText(this.name);
			this.width = rect.width;
			this.height =
				rect.actualBoundingBoxAscent + rect.actualBoundingBoxDescent;
			const x = f[0] + this.canvas.width / 2;
			const y = f[1] + this.canvas.height / 2;
			if (this.shadow) {
				this.ctx.shadowColor = "black";
				this.ctx.shadowBlur = 7;
			} else {
				this.ctx.shadowColor = "";
				this.ctx.shadowBlur = 0;
			}
			this.ctx.fillStyle = this.color;
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.save();
			this.ctx.translate(x, y);
			this.ctx.rotate(f[3] * (Math.PI / 180));
			this.ctx.textAlign = "center";
			this.ctx.fillText(this.name, 0, 0);
			this.ctx.restore();
			this.drawScaled(this.ctx, ctx_out);
		}
	}
}

export class VideoLayer extends MoveableLayer {
	video: HTMLVideoElement;
	source?: MediaElementAudioSourceNode;
	loadingIndicator: HTMLDivElement;

	constructor(file: FileOrURI) {
		super(file);
		this.video = document.createElement("video");
		this.video.crossOrigin = "anonymous";
		this.video.muted = true;
		this.video.loop = false;
		this.video.preload = "auto";
		this.video.autoplay = false;
		this.video.playsInline = true;
		this.video.controls = false;
		this.video.style.display = "none";

		if (isFileWithURI(file)) {
			this.video.src = file.uri;
		} else {
			this.video.src = URL.createObjectURL(file);
		}

		this.video.addEventListener("loadedmetadata", () => {
			this.width = this.video.videoWidth;
			this.height = this.video.videoHeight;
			this.total_time = this.video.duration * 1000;
			this.ready = true;
		});

		this.loadingIndicator = document.createElement("div");
		this.loadingIndicator.className = "loading-indicator";
		this.loadingIndicator.style.position = "absolute";
		this.loadingIndicator.style.top = "0";
		this.loadingIndicator.style.left = "0";
		this.loadingIndicator.style.right = "0";
		this.loadingIndicator.style.textAlign = "center";
		this.loadingIndicator.style.backgroundColor = "rgba(0,0,0,0.5)";
		this.loadingIndicator.style.color = "white";
		this.loadingIndicator.style.padding = "5px";

		this.video.addEventListener(
			"progress",
			this.updateLoadingProgress.bind(this)
		);

		document.getElementById("background")?.appendChild(this.video);
	}

	init(player: PlayerClass, preview: HTMLDivElement) {
		super.init(player, preview);
		this.source = player.audio_ctx.createMediaElementSource(this.video);
		this.source.connect(player.audio_ctx.destination);

		// Add the video element to the preview container
		preview.appendChild(this.video);
		this.video.style.display = "block";
		this.video.style.width = "100%";
		this.video.style.height = "auto";
		preview.appendChild(this.loadingIndicator);
	}

	updateLoadingProgress() {
		if (this.video.buffered.length > 0) {
			const percentLoaded =
				(this.video.buffered.end(0) / this.video.duration) * 100;
			this.loadingIndicator.textContent = `Loading: ${percentLoaded.toFixed(
				0
			)}%`;
		}
	}

	render(ctx_out: CanvasRenderingContext2D, ref_time: number) {
		if (!this.ready) {
			return;
		}
		const time_in_layer = ref_time - this.start_time;
		if (time_in_layer < 0 || time_in_layer > this.total_time) {
			return;
		}
		this.video.currentTime = time_in_layer / 1000;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.drawImage(
			this.video,
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
		this.drawScaled(this.ctx, ctx_out, true);
	}

	getContext(time: number): HTMLVideoElement {
		console.log("getContext", time);
		return this.video;
	}
}

export class AudioLayer extends RenderedLayer {
	audio: HTMLAudioElement;
	source?: MediaElementAudioSourceNode;
	loadingIndicator: HTMLDivElement;

	constructor(file: FileOrURI) {
		super(file);
		this.audio = document.createElement("audio");
		this.audio.crossOrigin = "anonymous";
		this.audio.muted = false;
		this.audio.loop = false;
		this.audio.preload = "auto";
		this.audio.autoplay = false;
		this.audio.controls = false;
		this.audio.style.display = "none";

		if (isFileWithURI(file)) {
			this.audio.src = file.uri;
		} else {
			this.audio.src = URL.createObjectURL(file);
		}

		this.audio.addEventListener("loadedmetadata", () => {
			this.total_time = this.audio.duration * 1000;
			this.ready = true;
		});

		document.getElementById("background")?.appendChild(this.audio);

		this.loadingIndicator = document.createElement("div");
		this.loadingIndicator.className = "loading-indicator";
		// ... set other properties for loadingIndicator ...

		this.audio.addEventListener(
			"progress",
			this.updateLoadingProgress.bind(this)
		);
	}

	updateLoadingProgress() {
		if (this.audio.buffered.length > 0) {
			const percentLoaded =
				(this.audio.buffered.end(0) / this.audio.duration) * 100;
			this.loadingIndicator.textContent = `Loading: ${percentLoaded.toFixed(
				0
			)}%`;
		}
	}

	init(player: PlayerClass, preview: HTMLDivElement) {
		super.init(player, preview);
		this.source = player.audio_ctx.createMediaElementSource(this.audio);
		this.source.connect(player.audio_ctx.destination);
	}

	render(ctx_out: CanvasRenderingContext2D, ref_time: number) {
		if (!this.ready) {
			return;
		}
		const time_in_layer = ref_time - this.start_time;
		if (time_in_layer < 0 || time_in_layer > this.total_time) {
			return;
		}
		this.audio.currentTime = time_in_layer / 1000;
		// Remove or comment out the following line as AudioLayer doesn't need to draw anything
		// this.drawScaled(this.audio, ctx_out, true);
	}
}

export class PlayerClass {
	// Properties
	playing: boolean;
	scrubbing: boolean;
	layers: RenderedLayer[];
	selected_layer: RenderedLayer | null;
	onend_callback: ((player: PlayerClass) => void) | null;
	update: (() => void) | null;
	width: number;
	height: number;
	total_time: number;
	last_step: number | null;
	time: number;
	last_paused: number;
	aux_time: number;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	audio_ctx: AudioContext;
	canvas_holder: HTMLElement;
	time_scale: number;
	time_holder: HTMLElement;
	time_canvas: HTMLCanvasElement;
	time_ctx: CanvasRenderingContext2D;
	cursor_preview: HTMLElement;
	cursor_canvas: HTMLCanvasElement;
	cursor_ctx: CanvasRenderingContext2D;
	cursor_text: HTMLElement;
	gesturing: boolean;
	dragging: ((x: number, y: number) => void) | null;
	preview_dragging: HTMLElement | null;
	preview_dragging_layer: RenderedLayer | null;
	audio_dest: MediaStreamAudioDestinationNode | null;
	pointers: Map<number, PointerEvent>;
	initial_distance: number | null;

	constructor(
		canvasElement: HTMLDivElement,
		timelineElement: HTMLDivElement
	) {
		// Initialize properties
		this.playing = false;
		this.scrubbing = false;
		this.layers = [];
		this.selected_layer = null;
		this.onend_callback = null;
		this.update = null;
		this.width = 1280;
		this.height = 720;
		this.total_time = 0;
		this.last_step = null;
		this.time = 0;
		this.last_paused = Number.MAX_SAFE_INTEGER;
		this.aux_time = 0;
		this.canvas_holder = canvasElement;
		this.time_holder = timelineElement;
		this.time_scale = 1.0;
		this.gesturing = false;
		this.dragging = null;
		this.preview_dragging = null;
		this.preview_dragging_layer = null;
		this.audio_dest = null;
		this.pointers = new Map();
		this.initial_distance = null;

		// Initialize canvas
		this.canvas = document.createElement("canvas");
		const ctx = this.canvas.getContext("2d");
		if (ctx) {
			this.ctx = ctx;
		} else {
			throw new Error("Could not get canvas context");
		}
		this.audio_ctx = new AudioContext();
		this.canvas_holder.appendChild(this.canvas);

		// Initialize time canvas
		this.time_canvas = document.createElement("canvas");
		this.time_canvas.addEventListener(
			"pointerdown",
			this.scrubStart.bind(this)
		);
		this.time_canvas.addEventListener(
			"pointermove",
			this.scrubMove.bind(this),
			{
				passive: false,
			}
		);
		this.time_canvas.addEventListener(
			"pointerup",
			this.scrubEnd.bind(this)
		);
		this.time_canvas.addEventListener(
			"pointercancel",
			this.scrubEnd.bind(this)
		);
		const time_ctx = this.time_canvas.getContext("2d");
		if (time_ctx) {
			this.time_ctx = time_ctx;
		} else {
			throw new Error("Could not get time canvas context");
		}
		this.time_holder.appendChild(this.time_canvas);

		// Initialize cursor preview
		this.cursor_preview = document.getElementById(
			"cursor_preview"
		) as HTMLElement;
		this.cursor_canvas = this.cursor_preview.querySelector(
			"canvas"
		) as HTMLCanvasElement;
		const cursor_ctx = this.cursor_canvas.getContext("2d");
		if (cursor_ctx) {
			this.cursor_ctx = cursor_ctx;
		} else {
			throw new Error("Could not get cursor canvas context");
		}
		this.cursor_text = this.cursor_preview.querySelector(
			"div"
		) as HTMLElement;

		// Set up event handlers
		this.setupEventHandlers();

		// Start the animation loop
		window.requestAnimationFrame(this.loop.bind(this));

		// Resize the canvases
		this.resize();
	}

	setupEventHandlers() {
		this.canvas_holder.addEventListener(
			"pointerdown",
			this.onPointerDown.bind(this)
		);
		this.canvas_holder.addEventListener(
			"pointermove",
			this.onPointerMove.bind(this)
		);
		this.canvas_holder.addEventListener(
			"pointerup",
			this.onPointerUp.bind(this)
		);
		this.canvas_holder.addEventListener(
			"pointercancel",
			this.onPointerUp.bind(this)
		);
		this.canvas_holder.addEventListener("wheel", this.onWheel.bind(this), {
			passive: false,
		});
		window.addEventListener("resize", this.resize.bind(this));
	}

	onPointerDown(ev: PointerEvent) {
		ev.preventDefault();
		this.canvas_holder.setPointerCapture(ev.pointerId);
		this.pointers.set(ev.pointerId, ev);

		if (this.pointers.size === 1) {
			// Single touch - start dragging
			const rect = this.canvas.getBoundingClientRect();
			const x =
				(ev.clientX - rect.left) * (this.canvas.width / rect.width);
			const y =
				(ev.clientY - rect.top) * (this.canvas.height / rect.height);
			this.dragging = this.createDragHandler(x, y);
		} else if (this.pointers.size === 2) {
			// Multi-touch - start pinch zoom
			this.gesturing = true;
			const [ev1, ev2] = Array.from(this.pointers.values());
			this.initial_distance = Math.hypot(
				ev2.clientX - ev1.clientX,
				ev2.clientY - ev1.clientY
			);
		}
	}

	onPointerMove(ev: PointerEvent) {
		ev.preventDefault();
		if (!this.pointers.has(ev.pointerId)) return;
		this.pointers.set(ev.pointerId, ev);

		if (
			this.gesturing &&
			this.pointers.size === 2 &&
			this.selected_layer instanceof MoveableLayer
		) {
			const [ev1, ev2] = Array.from(this.pointers.values());
			const current_distance = Math.hypot(
				ev2.clientX - ev1.clientX,
				ev2.clientY - ev1.clientY
			);
			const scale_change =
				current_distance / (this.initial_distance || current_distance);
			this.initial_distance = current_distance;

			this.selected_layer.update({ scale: scale_change }, this.time);
		} else if (this.dragging) {
			const rect = this.canvas.getBoundingClientRect();
			const x =
				(ev.clientX - rect.left) * (this.canvas.width / rect.width);
			const y =
				(ev.clientY - rect.top) * (this.canvas.height / rect.height);
			this.dragging(x, y);
		}
	}

	onPointerUp(ev: PointerEvent) {
		ev.preventDefault();
		this.pointers.delete(ev.pointerId);
		if (this.pointers.size < 2) {
			this.gesturing = false;
		}
		if (this.pointers.size === 0) {
			this.dragging = null;
		}
	}

	onWheel(ev: WheelEvent) {
		ev.preventDefault();
		if (this.selected_layer instanceof MoveableLayer) {
			const rotation_change = ev.deltaY > 0 ? 5 : -5;
			this.selected_layer.update(
				{ rotation: rotation_change },
				this.time
			);
		}
	}

	createDragHandler(startX: number, startY: number) {
		const layer = this.selected_layer;
		if (layer instanceof MoveableLayer) {
			const frame = layer.getFrame(this.time);
			if (frame) {
				const offsetX = startX - frame[0];
				const offsetY = startY - frame[1];
				return (x: number, y: number) => {
					layer.update({ x: x - offsetX, y: y - offsetY }, this.time);
				};
			}
		}
		return null;
	}

	scrubStart(ev: PointerEvent) {
		ev.preventDefault();
		this.scrubbing = true;
		this.updateTimeFromPointer(ev);
	}

	scrubMove(ev: PointerEvent) {
		if (this.scrubbing) {
			ev.preventDefault();
			this.updateTimeFromPointer(ev);
		}
	}

	scrubEnd(ev: PointerEvent) {
		console.log("Scrub end event:", ev);
		this.scrubbing = false;
	}

	updateTimeFromPointer(ev: PointerEvent) {
		const rect = this.time_canvas.getBoundingClientRect();
		const x = ev.clientX - rect.left;
		const t = (x / this.time_canvas.clientWidth) * this.total_time;
		this.time = t;
	}

	loop(realtime: number) {
		const delta = this.last_step ? realtime - this.last_step : 0;
		this.last_step = realtime;

		if (this.playing) {
			this.time += delta;
			if (this.time >= this.total_time) {
				this.time = 0;
				if (this.onend_callback) {
					this.onend_callback(this);
				} else {
					this.pause();
				}
			}
		}

		this.render();

		window.requestAnimationFrame(this.loop.bind(this));
	}

	render() {
		// Clear canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Render layers
		for (const layer of this.layers) {
			layer.render(this.ctx, this.time);
		}

		// Update time canvas
		this.renderTimeCanvas();
	}

	renderTimeCanvas() {
		this.time_ctx.clearRect(
			0,
			0,
			this.time_canvas.width,
			this.time_canvas.height
		);
		const layer_height = this.time_canvas.clientHeight / this.layers.length;

		this.layers.forEach((layer, index) => {
			layer.render_time(
				this.time_ctx,
				(index + 0.5) * layer_height,
				layer_height * 0.8,
				layer === this.selected_layer
			);
		});

		// Draw current time indicator
		const x = (this.time / this.total_time) * this.time_canvas.clientWidth;
		this.time_ctx.strokeStyle = "red";
		this.time_ctx.beginPath();
		this.time_ctx.moveTo(x, 0);
		this.time_ctx.lineTo(x, this.time_canvas.clientHeight);
		this.time_ctx.stroke();
	}

	play() {
		if (!this.playing) {
			this.playing = true;
			this.last_step = null;
			if (this.audio_ctx.state === "suspended") {
				this.audio_ctx.resume();
			}
			for (const layer of this.layers) {
				if (layer instanceof AudioLayer) {
					layer.audio.play();
				} else if (layer instanceof VideoLayer) {
					layer.video.play();
				}
			}
		}
	}

	pause() {
		if (this.playing) {
			this.playing = false;
			for (const layer of this.layers) {
				if (layer instanceof AudioLayer) {
					layer.audio.pause();
				} else if (layer instanceof VideoLayer) {
					layer.video.pause();
				}
			}
		}
	}

	add(layer: RenderedLayer) {
		this.layers.push(layer);
		this.total_time = Math.max(
			this.total_time,
			layer.start_time + layer.total_time
		);
		const layers_div = document.getElementById("layers") as HTMLElement;
		const preview = document.createElement("div");
		preview.classList.add("preview");

		const preview_title = document.createElement("div");
		preview_title.classList.add("preview_title");

		preview.appendChild(preview_title);
		layers_div.appendChild(preview);

		layer.init(this, preview);

		this.resize();
	}

	remove(layer: RenderedLayer) {
		const index = this.layers.indexOf(layer);
		if (index !== -1) {
			this.layers.splice(index, 1);
			layer.preview.remove();
			this.resize();
		}
	}

	resize() {
		this.canvas.width = this.canvas_holder.clientWidth * dpr;
		this.canvas.height = this.canvas_holder.clientHeight * dpr;
		this.ctx.scale(dpr, dpr);

		this.time_canvas.width = this.time_canvas.clientWidth * dpr;
		this.time_canvas.height = this.time_canvas.clientHeight * dpr;
		this.time_ctx.scale(dpr, dpr);

		for (const layer of this.layers) {
			layer.resize();
		}
	}

	dumpToJson() {
		const out = [];
		for (const layer of this.layers) {
			out.push(layer.dump());
		}
		return JSON.stringify(out);
	}

	addFile(file: File) {
		const extension = file.name.split(".").pop()?.toLowerCase();
		if (extension) {
			if (extension in ext_map) {
				const mime_type = ext_map[extension];
				if (mime_type.startsWith("image/")) {
					const layer = new ImageLayer(file);
					this.add(layer);
				} else if (mime_type.startsWith("video/")) {
					const layer = new VideoLayer(file);
					this.add(layer);
				} else if (mime_type.startsWith("audio/")) {
					const layer = new AudioLayer(file);
					this.add(layer);
				}
			}
		}
	}

	addURI(uri: string) {
		const extension = uri.split(".").pop()?.toLowerCase();
		if (extension && extension in ext_map) {
			const mime_type = ext_map[extension];
			const fileWithURI: FileWithURI = { name: uri, uri };
			if (mime_type.startsWith("image/")) {
				const layer = new ImageLayer(fileWithURI);
				this.add(layer);
			} else if (mime_type.startsWith("video/")) {
				const layer = new VideoLayer(fileWithURI);
				this.add(layer);
			} else if (mime_type.startsWith("audio/")) {
				const layer = new AudioLayer(fileWithURI);
				this.add(layer);
			}
		} else {
			// Handle unsupported types or show an error message
			alert(`Unsupported URI type: ${uri}`);
		}
	}

	selectLayer(layer: RenderedLayer) {
		if (this.selected_layer) {
			this.selected_layer.preview.classList.remove("selected");
		}
		this.selected_layer = layer;
		layer.preview.classList.add("selected");
	}

	prev() {
		this.time = Math.max(0, this.time - 1000 / fps);
	}

	next() {
		this.time = Math.min(this.total_time, this.time + 1000 / fps);
	}

	delete_anchor() {
		if (this.selected_layer instanceof MoveableLayer) {
			this.selected_layer.delete_anchor(this.time);
		}
	}

	split() {
		if (this.selected_layer) {
			const index = this.layers.indexOf(this.selected_layer);
			if (index !== -1) {
				const currentTime = this.time;
				const originalLayer = this.selected_layer;
				const remainingTime =
					originalLayer.total_time -
					(currentTime - originalLayer.start_time);
				if (remainingTime > 0) {
					// Adjust the original layer's total time
					originalLayer.total_time =
						currentTime - originalLayer.start_time;

					// Create a new layer for the remaining part
					let newLayer: RenderedLayer;
					if (originalLayer instanceof MoveableLayer) {
						newLayer = Object.assign(
							Object.create(Object.getPrototypeOf(originalLayer)),
							originalLayer
						);
						newLayer.start_time = currentTime;
						newLayer.total_time = remainingTime;
						if (newLayer instanceof MoveableLayer) {
							newLayer.frames = originalLayer.frames.slice(
								originalLayer.getIndex(currentTime)
							);
							newLayer.anchors = new Set(
								Array.from(originalLayer.anchors).filter(
									(idx) =>
										idx >=
										originalLayer.getIndex(currentTime)
								)
							);
						}
					} else {
						newLayer = originalLayer;
					}

					this.layers.splice(index + 1, 0, newLayer);
					this.resize();
				}
			}
		}
	}
}
