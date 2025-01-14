// import { makeAutoObservable } from "mobx";
// // import { Canvas } from "fabric";
// import * as fabric from "fabric";
// import anime from "animejs";
// import {
// 	MenuOption,
// 	EditorElement,
// 	Animation,
// 	TimeFrame,
// 	VideoEditorElement,
// 	AudioEditorElement,
// 	Placement,
// 	ImageEditorElement,
// 	Effect,
// 	TextEditorElement,
// } from "@/types/change/fabric-types";
// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { toBlobURL } from "@ffmpeg/util";
// import { CoverImage, CoverVideo, FabricUtils } from "@/lib/change/fabric-utils";
// import {
// 	getUid,
// 	isHtmlAudioElement,
// 	isHtmlImageElement,
// 	isHtmlVideoElement,
// } from "@/lib/change";

// export class Store {
// 	canvas: fabric.Canvas | null;

// 	backgroundColor: string;

// 	selectedMenuOption: MenuOption;
// 	audios: string[];
// 	videos: string[];
// 	images: string[];
// 	editorElements: EditorElement[];
// 	selectedElement: EditorElement | null;

// 	maxTime: number;
// 	animations: Animation[];
// 	animationTimeLine: anime.AnimeTimelineInstance | any;
// 	playing: boolean;

// 	currentKeyFrame: number;
// 	fps: number;

// 	possibleVideoFormats: string[] = ["mp4", "webm"];
// 	selectedVideoFormat: "mp4" | "webm";

// 	constructor() {
// 		this.canvas = null;
// 		this.videos = [];
// 		this.images = [];
// 		this.audios = [];
// 		this.editorElements = [];
// 		this.backgroundColor = "#111111";
// 		this.maxTime = 30 * 1000;
// 		this.playing = false;
// 		this.currentKeyFrame = 0;
// 		this.selectedElement = null;
// 		this.fps = 60;
// 		this.animations = [];
// 		this.animationTimeLine =
// 			typeof window !== "undefined" ? anime.timeline() : null;
// 		this.selectedMenuOption = "Video";
// 		this.selectedVideoFormat = "mp4";
// 		makeAutoObservable(this);
// 	}

// 	get currentTimeInMs() {
// 		return (this.currentKeyFrame * 1000) / this.fps;
// 	}

// 	setCurrentTimeInMs(time: number) {
// 		this.currentKeyFrame = Math.floor((time / 1000) * this.fps);
// 	}

// 	setSelectedMenuOption(selectedMenuOption: MenuOption) {
// 		this.selectedMenuOption = selectedMenuOption;
// 	}

// 	setCanvas(canvas: fabric.Canvas | null) {
// 		this.canvas = canvas;
// 		if (canvas) {
// 			canvas.backgroundColor = this.backgroundColor;
// 		}
// 	}

// 	setBackgroundColor(backgroundColor: string) {
// 		this.backgroundColor = backgroundColor;
// 		if (this.canvas) {
// 			this.canvas.backgroundColor = backgroundColor;
// 		}
// 	}

// 	updateEffect(id: string, effect: Effect) {
// 		const index = this.editorElements.findIndex(
// 			(element) => element.id === id
// 		);
// 		const element = this.editorElements[index];
// 		if (isEditorVideoElement(element) || isEditorImageElement(element)) {
// 			element.properties.effect = effect;
// 		}
// 		this.refreshElements();
// 	}

// 	setVideos(videos: string[]) {
// 		this.videos = videos;
// 	}

// 	addVideoResource(video: string) {
// 		this.videos = [...this.videos, video];
// 	}
// 	addAudioResource(audio: string) {
// 		this.audios = [...this.audios, audio];
// 	}
// 	addImageResource(image: string) {
// 		this.images = [...this.images, image];
// 	}

// 	addAnimation(animation: Animation) {
// 		this.animations = [...this.animations, animation];
// 		this.refreshAnimations();
// 	}
// 	updateAnimation(id: string, animation: Animation) {
// 		const index = this.animations.findIndex((a) => a.id === id);
// 		this.animations[index] = animation;
// 		this.refreshAnimations();
// 	}

// 	refreshAnimations() {
// 		anime.remove(this.animationTimeLine);
// 		this.animationTimeLine = anime.timeline({
// 			duration: this.maxTime,
// 			autoplay: false,
// 		});
// 		for (let i = 0; i < this.animations.length; i++) {
// 			const animation = this.animations[i];
// 			const editorElement = this.editorElements.find(
// 				(element) => element.id === animation.targetId
// 			);
// 			const fabricObject = editorElement?.fabricObject;
// 			if (!editorElement || !fabricObject) {
// 				continue;
// 			}
// 			fabricObject.clipPath = undefined;
// 			switch (animation.type) {
// 				case "fadeIn": {
// 					this.animationTimeLine.add(
// 						{
// 							opacity: [0, 1],
// 							duration: animation.duration,
// 							targets: fabricObject,
// 							easing: "linear",
// 						},
// 						editorElement.timeFrame.start
// 					);
// 					break;
// 				}
// 				case "fadeOut": {
// 					this.animationTimeLine.add(
// 						{
// 							opacity: [1, 0],
// 							duration: animation.duration,
// 							targets: fabricObject,
// 							easing: "linear",
// 						},
// 						editorElement.timeFrame.end - animation.duration
// 					);
// 					break;
// 				}
// 				case "slideIn": {
// 					const direction = animation.properties.direction;
// 					const targetPosition = {
// 						left: editorElement.placement.x,
// 						top: editorElement.placement.y,
// 					};
// 					const startPosition = {
// 						left:
// 							direction === "left"
// 								? -editorElement.placement.width
// 								: direction === "right"
// 									? this.canvas?.width
// 									: editorElement.placement.x,
// 						top:
// 							direction === "top"
// 								? -editorElement.placement.height
// 								: direction === "bottom"
// 									? this.canvas?.height
// 									: editorElement.placement.y,
// 					};
// 					if (animation.properties.useClipPath) {
// 						const clipRectangle = FabricUtils.getClipMaskRect(
// 							editorElement,
// 							50
// 						);
// 						fabricObject.set("clipPath", clipRectangle);
// 					}
// 					if (
// 						editorElement.type === "text" &&
// 						animation.properties.textType === "character"
// 					) {
// 						this.canvas?.remove(
// 							...editorElement.properties.splittedTexts
// 						);
// 	// @ts-expect-error
//     					editorElement.properties.splittedTexts =
// 							getTextObjectsPartitionedByCharacters(
// 								editorElement.fabricObject,
// 								editorElement
// 							);
// 						editorElement.properties.splittedTexts.forEach(
// 							(textObject) => {
// 								this.canvas!.add(textObject);
// 							}
// 						);
// 						const duration = animation.duration / 2;
// 						const delay =
// 							duration /
// 							editorElement.properties.splittedTexts.length;
// 						for (
// 							let i = 0;
// 							i < editorElement.properties.splittedTexts.length;
// 							i++
// 						) {
// 							const splittedText =
// 								editorElement.properties.splittedTexts[i];
// 							const offset = {
// 								left:
// 									splittedText.left! -
// 									editorElement.placement.x,
// 								top:
// 									splittedText.top! -
// 									editorElement.placement.y,
// 							};
// 							this.animationTimeLine.add(
// 								{
// 									left: [
// 										startPosition.left! + offset.left,
// 										targetPosition.left + offset.left,
// 									],
// 									top: [
// 										startPosition.top! + offset.top,
// 										targetPosition.top + offset.top,
// 									],
// 									delay: i * delay,
// 									duration: duration,
// 									targets: splittedText,
// 								},
// 								editorElement.timeFrame.start
// 							);
// 						}
// 						this.animationTimeLine.add(
// 							{
// 								opacity: [1, 0],
// 								duration: 1,
// 								targets: fabricObject,
// 								easing: "linear",
// 							},
// 							editorElement.timeFrame.start
// 						);
// 						this.animationTimeLine.add(
// 							{
// 								opacity: [0, 1],
// 								duration: 1,
// 								targets: fabricObject,
// 								easing: "linear",
// 							},
// 							editorElement.timeFrame.start + animation.duration
// 						);

// 						this.animationTimeLine.add(
// 							{
// 								opacity: [0, 1],
// 								duration: 1,
// 								targets: editorElement.properties.splittedTexts,
// 								easing: "linear",
// 							},
// 							editorElement.timeFrame.start
// 						);
// 						this.animationTimeLine.add(
// 							{
// 								opacity: [1, 0],
// 								duration: 1,
// 								targets: editorElement.properties.splittedTexts,
// 								easing: "linear",
// 							},
// 							editorElement.timeFrame.start + animation.duration
// 						);
// 					}
// 					this.animationTimeLine.add(
// 						{
// 							left: [startPosition.left, targetPosition.left],
// 							top: [startPosition.top, targetPosition.top],
// 							duration: animation.duration,
// 							targets: fabricObject,
// 							easing: "linear",
// 						},
// 						editorElement.timeFrame.start
// 					);
// 					break;
// 				}
// 				case "slideOut": {
// 					const direction = animation.properties.direction;
// 					const startPosition = {
// 						left: editorElement.placement.x,
// 						top: editorElement.placement.y,
// 					};
// 					const targetPosition = {
// 						left:
// 							direction === "left"
// 								? -editorElement.placement.width
// 								: direction === "right"
// 									? this.canvas?.width
// 									: editorElement.placement.x,
// 						top:
// 							direction === "top"
// 								? -100 - editorElement.placement.height
// 								: direction === "bottom"
// 									? this.canvas?.height
// 									: editorElement.placement.y,
// 					};
// 					if (animation.properties.useClipPath) {
// 						const clipRectangle = FabricUtils.getClipMaskRect(
// 							editorElement,
// 							50
// 						);
// 						fabricObject.set("clipPath", clipRectangle);
// 					}
// 					this.animationTimeLine.add(
// 						{
// 							left: [startPosition.left, targetPosition.left],
// 							top: [startPosition.top, targetPosition.top],
// 							duration: animation.duration,
// 							targets: fabricObject,
// 							easing: "linear",
// 						},
// 						editorElement.timeFrame.end - animation.duration
// 					);
// 					break;
// 				}
// 				case "breathe": {
// 					const itsSlideInAnimation = this.animations.find(
// 						(a) =>
// 							a.targetId === animation.targetId &&
// 							a.type === "slideIn"
// 					);
// 					const itsSlideOutAnimation = this.animations.find(
// 						(a) =>
// 							a.targetId === animation.targetId &&
// 							a.type === "slideOut"
// 					);
// 					const timeEndOfSlideIn = itsSlideInAnimation
// 						? editorElement.timeFrame.start +
// 							itsSlideInAnimation.duration
// 						: editorElement.timeFrame.start;
// 					const timeStartOfSlideOut = itsSlideOutAnimation
// 						? editorElement.timeFrame.end -
// 							itsSlideOutAnimation.duration
// 						: editorElement.timeFrame.end;
// 					if (timeEndOfSlideIn > timeStartOfSlideOut) {
// 						continue;
// 					}
// 					const duration = timeStartOfSlideOut - timeEndOfSlideIn;
// 					const easeFactor = 4;
// 					const suitableTimeForHeartbeat =
// 						((1000 * 60) / 72) * easeFactor;
// 					const upScale = 1.05;
// 					const currentScaleX = fabricObject.scaleX ?? 1;
// 					const currentScaleY = fabricObject.scaleY ?? 1;
// 					const finalScaleX = currentScaleX * upScale;
// 					const finalScaleY = currentScaleY * upScale;
// 					const totalHeartbeats = Math.floor(
// 						duration / suitableTimeForHeartbeat
// 					);
// 					if (totalHeartbeats < 1) {
// 						continue;
// 					}
// 					// const keyframes = [];
//                     const keyframes: { scaleX: number; scaleY: number }[] = [];
// 					for (let i = 0; i < totalHeartbeats; i++) {
// 						keyframes.push({
// 							scaleX: finalScaleX,
// 							scaleY: finalScaleY,
// 						});
// 						keyframes.push({
// 							scaleX: currentScaleX,
// 							scaleY: currentScaleY,
// 						});
// 					}

// 					this.animationTimeLine.add(
// 						{
// 							duration: duration,
// 							targets: fabricObject,
// 							keyframes,
// 							easing: "linear",
// 							loop: true,
// 						},
// 						timeEndOfSlideIn
// 					);

// 					break;
// 				}
// 			}
// 		}
// 	}

// 	removeAnimation(id: string) {
// 		this.animations = this.animations.filter(
// 			(animation) => animation.id !== id
// 		);
// 		this.refreshAnimations();
// 	}

// 	setSelectedElement(selectedElement: EditorElement | null) {
// 		this.selectedElement = selectedElement;
// 		if (this.canvas) {
// 			if (selectedElement?.fabricObject)
// 				this.canvas.setActiveObject(selectedElement.fabricObject);
// 			else this.canvas.discardActiveObject();
// 		}
// 	}
// 	updateSelectedElement() {
// 		this.selectedElement =
// 			this.editorElements.find(
// 				(element) => element.id === this.selectedElement?.id
// 			) ?? null;
// 	}

// 	setEditorElements(editorElements: EditorElement[]) {
// 		this.editorElements = editorElements;
// 		this.updateSelectedElement();
// 		this.refreshElements();
// 		// this.refreshAnimations();
// 	}

// 	updateEditorElement(editorElement: EditorElement) {
// 		this.setEditorElements(
// 			this.editorElements.map((element) =>
// 				element.id === editorElement.id ? editorElement : element
// 			)
// 		);
// 	}

// 	updateEditorElementTimeFrame(
// 		editorElement: EditorElement,
// 		timeFrame: Partial<TimeFrame>
// 	) {
// 		if (timeFrame.start != undefined && timeFrame.start < 0) {
// 			timeFrame.start = 0;
// 		}
// 		if (timeFrame.end != undefined && timeFrame.end > this.maxTime) {
// 			timeFrame.end = this.maxTime;
// 		}
// 		const newEditorElement = {
// 			...editorElement,
// 			timeFrame: {
// 				...editorElement.timeFrame,
// 				...timeFrame,
// 			},
// 		};
// 		this.updateVideoElements();
// 		this.updateAudioElements();
// 		this.updateEditorElement(newEditorElement);
// 		this.refreshAnimations();
// 	}

// 	addEditorElement(editorElement: EditorElement) {
// 		this.setEditorElements([...this.editorElements, editorElement]);
// 		this.refreshElements();
// 		this.setSelectedElement(
// 			this.editorElements[this.editorElements.length - 1]
// 		);
// 	}

// 	removeEditorElement(id: string) {
// 		this.setEditorElements(
// 			this.editorElements.filter(
// 				(editorElement) => editorElement.id !== id
// 			)
// 		);
// 		this.refreshElements();
// 	}

// 	setMaxTime(maxTime: number) {
// 		this.maxTime = maxTime;
// 	}

// 	setPlaying(playing: boolean) {
// 		this.playing = playing;
// 		this.updateVideoElements();
// 		this.updateAudioElements();
// 		if (playing) {
// 			this.startedTime = Date.now();
// 			this.startedTimePlay = this.currentTimeInMs;
// 			requestAnimationFrame(() => {
// 				this.playFrames();
// 			});
// 		}
// 	}

// 	startedTime = 0;
// 	startedTimePlay = 0;

// 	playFrames() {
// 		if (!this.playing) {
// 			return;
// 		}
// 		const elapsedTime = Date.now() - this.startedTime;
// 		const newTime = this.startedTimePlay + elapsedTime;
// 		this.updateTimeTo(newTime);
// 		if (newTime > this.maxTime) {
// 			this.currentKeyFrame = 0;
// 			this.setPlaying(false);
// 		} else {
// 			requestAnimationFrame(() => {
// 				this.playFrames();
// 			});
// 		}
// 	}
// 	updateTimeTo(newTime: number) {
// 		this.setCurrentTimeInMs(newTime);
// 		this.animationTimeLine.seek(newTime);
// 		if (this.canvas) {
// 			this.canvas.backgroundColor = this.backgroundColor;
// 		}
// 		this.editorElements.forEach((e) => {
// 			if (!e.fabricObject) return;
// 			const isInside =
// 				e.timeFrame.start <= newTime && newTime <= e.timeFrame.end;
// 			e.fabricObject.visible = isInside;
// 		});
// 	}

// 	handleSeek(seek: number) {
// 		if (this.playing) {
// 			this.setPlaying(false);
// 		}
// 		this.updateTimeTo(seek);
// 		this.updateVideoElements();
// 		this.updateAudioElements();
// 	}

// 	addVideo(index: number) {
// 		const videoElement = document.getElementById(`video-${index}`);
// 		if (!isHtmlVideoElement(videoElement)) {
// 			return;
// 		}
// 		const videoDurationMs = videoElement.duration * 1000;
// 		const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
// 		const id = getUid();
// 		this.addEditorElement({
// 			id,
// 			name: `Media(video) ${index + 1}`,
// 			type: "video",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100 * aspectRatio,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: videoDurationMs,
// 			},
// 			properties: {
// 				elementId: `video-${id}`,
// 				src: videoElement.src,
// 				effect: {
// 					type: "none",
// 				},
// 			},
// 		});
// 	}

// 	addImage(index: number) {
// 		const imageElement = document.getElementById(`image-${index}`);
// 		if (!isHtmlImageElement(imageElement)) {
// 			return;
// 		}
// 		const aspectRatio =
// 			imageElement.naturalWidth / imageElement.naturalHeight;
// 		const id = getUid();
// 		this.addEditorElement({
// 			id,
// 			name: `Media(image) ${index + 1}`,
// 			type: "image",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100 * aspectRatio,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: this.maxTime,
// 			},
// 			properties: {
// 				elementId: `image-${id}`,
// 				src: imageElement.src,
// 				effect: {
// 					type: "none",
// 				},
// 			},
// 		});
// 	}

// 	addAudio(index: number) {
// 		const audioElement = document.getElementById(`audio-${index}`);
// 		if (!isHtmlAudioElement(audioElement)) {
// 			return;
// 		}
// 		const audioDurationMs = audioElement.duration * 1000;
// 		const id = getUid();
// 		this.addEditorElement({
// 			id,
// 			name: `Media(audio) ${index + 1}`,
// 			type: "audio",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: audioDurationMs,
// 			},
// 			properties: {
// 				elementId: `audio-${id}`,
// 				src: audioElement.src,
// 			},
// 		});
// 	}
// 	addText(options: { text: string; fontSize: number; fontWeight: number }) {
// 		const id = getUid();
// 		const index = this.editorElements.length;
// 		this.addEditorElement({
// 			id,
// 			name: `Text ${index + 1}`,
// 			type: "text",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: this.maxTime,
// 			},
// 			properties: {
// 				text: options.text,
// 				fontSize: options.fontSize,
// 				fontWeight: options.fontWeight,
// 				splittedTexts: [],
// 			},
// 		});
// 	}

// 	updateVideoElements() {
// 		this.editorElements
// 			.filter(
// 				(element): element is VideoEditorElement =>
// 					element.type === "video"
// 			)
// 			.forEach((element) => {
// 				const video = document.getElementById(
// 					element.properties.elementId
// 				);
// 				if (isHtmlVideoElement(video)) {
// 					const videoTime =
// 						(this.currentTimeInMs - element.timeFrame.start) / 1000;
// 					video.currentTime = videoTime;
// 					if (this.playing) {
// 						video.play();
// 					} else {
// 						video.pause();
// 					}
// 				}
// 			});
// 	}
// 	updateAudioElements() {
// 		this.editorElements
// 			.filter(
// 				(element): element is AudioEditorElement =>
// 					element.type === "audio"
// 			)
// 			.forEach((element) => {
// 				const audio = document.getElementById(
// 					element.properties.elementId
// 				);
// 				if (isHtmlAudioElement(audio)) {
// 					const audioTime =
// 						(this.currentTimeInMs - element.timeFrame.start) / 1000;
// 					audio.currentTime = audioTime;
// 					if (this.playing) {
// 						audio.play();
// 					} else {
// 						audio.pause();
// 					}
// 				}
// 			});
// 	}
// 	// saveCanvasToVideo() {
// 	//   const video = document.createElement("video");
// 	//   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// 	//   const stream = canvas.captureStream();
// 	//   video.srcObject = stream;
// 	//   video.play();
// 	//   const mediaRecorder = new MediaRecorder(stream);
// 	//   const chunks: Blob[] = [];
// 	//   mediaRecorder.ondataavailable = function (e) {
// 	//     console.log("data available");
// 	//     console.log(e.data);
// 	//     chunks.push(e.data);
// 	//   };
// 	//   mediaRecorder.onstop = function (e) {
// 	//     const blob = new Blob(chunks, { type: "video/webm" });
// 	//     const url = URL.createObjectURL(blob);
// 	//     const a = document.createElement("a");
// 	//     a.href = url;
// 	//     a.download = "video.webm";
// 	//     a.click();
// 	//   };
// 	//   mediaRecorder.start();
// 	//   setTimeout(() => {
// 	//     mediaRecorder.stop();
// 	//   }, this.maxTime);

// 	// }

// 	setVideoFormat(format: "mp4" | "webm") {
// 		this.selectedVideoFormat = format;
// 	}

// 	saveCanvasToVideoWithAudio() {
// 		this.saveCanvasToVideoWithAudioWebmMp4();
// 	}

// 	saveCanvasToVideoWithAudioWebmMp4() {
// 		console.log("modified");
// 		const mp4 = this.selectedVideoFormat === "mp4";
// 		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// 		const stream = canvas.captureStream(30);
// 		const audioElements = this.editorElements.filter(isEditorAudioElement);
// 		const audioStreams: MediaStream[] = [];
// 		audioElements.forEach((audio) => {
// 			const audioElement = document.getElementById(
// 				audio.properties.elementId
// 			) as HTMLAudioElement;
// 			const ctx = new AudioContext();
// 			const sourceNode = ctx.createMediaElementSource(audioElement);
// 			const dest = ctx.createMediaStreamDestination();
// 			sourceNode.connect(dest);
// 			sourceNode.connect(ctx.destination);
// 			audioStreams.push(dest.stream);
// 		});
// 		audioStreams.forEach((audioStream) => {
// 			stream.addTrack(audioStream.getAudioTracks()[0]);
// 		});
// 		const video = document.createElement("video");
// 		video.srcObject = stream;
// 		video.height = 500;
// 		video.width = 800;
// 		// video.controls = true;
// 		// document.body.appendChild(video);
// 		video.play().then(() => {
// 			const mediaRecorder = new MediaRecorder(stream);
// 			const chunks: Blob[] = [];
// 			mediaRecorder.ondataavailable = function (e) {
// 				chunks.push(e.data);
// 				console.log("data available");
// 			};
// 			mediaRecorder.onstop = async function (e) {
// 				const blob = new Blob(chunks, { type: "video/webm" });

// 				if (mp4) {
// 					// lets use ffmpeg to convert webm to mp4
// 					const data = new Uint8Array(await blob.arrayBuffer());
// 					const ffmpeg = new FFmpeg();
// 					const baseURL =
// 						"https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
// 					await ffmpeg.load({
// 						coreURL: await toBlobURL(
// 							`${baseURL}/ffmpeg-core.js`,
// 							"text/javascript"
// 						),
// 						wasmURL: await toBlobURL(
// 							`${baseURL}/ffmpeg-core.wasm`,
// 							"application/wasm"
// 						),
// 						// workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
// 					});
// 					await ffmpeg.writeFile("video.webm", data);
// 					await ffmpeg.exec([
// 						"-y",
// 						"-i",
// 						"video.webm",
// 						"-c",
// 						"copy",
// 						"video.mp4",
// 					]);
// 					// await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "video.mp4"]);

// 					const output = await ffmpeg.readFile("video.mp4");
// 					const outputBlob = new Blob([output], {
// 						type: "video/mp4",
// 					});
// 					const outputUrl = URL.createObjectURL(outputBlob);
// 					const a = document.createElement("a");
// 					a.download = "video.mp4";
// 					a.href = outputUrl;
// 					a.click();
// 				} else {
// 					const url = URL.createObjectURL(blob);
// 					const a = document.createElement("a");
// 					a.href = url;
// 					a.download = "video.webm";
// 					a.click();
// 				}
// 			};
// 			mediaRecorder.start();
// 			setTimeout(() => {
// 				mediaRecorder.stop();
// 			}, this.maxTime);
// 			video.remove();
// 		});
// 	}

// 	refreshElements() {
// 		const store = this;
// 		if (!store.canvas) return;
// 		const canvas = store.canvas;
// 		store.canvas.remove(...store.canvas.getObjects());
// 		for (let index = 0; index < store.editorElements.length; index++) {
// 			const element = store.editorElements[index];
// 			switch (element.type) {
// 				case "video": {
// 					console.log("elementid", element.properties.elementId);
// 					if (
// 						document.getElementById(element.properties.elementId) ==
// 						null
// 					)
// 						continue;
// 					const videoElement = document.getElementById(
// 						element.properties.elementId
// 					);
// 					if (!isHtmlVideoElement(videoElement)) continue;
// 					// const filters = [];
// 					// if (element.properties.effect?.type === "blackAndWhite") {
// 					//   filters.push(new fabric.Image.filters.Grayscale());
// 					// }
// 					// const videoObject = new (fabric as any).CoverVideo(
// 					// 	videoElement,
// 					// 	{
// 					// 		name: element.id,
// 					// 		left: element.placement.x,
// 					// 		top: element.placement.y,
// 					// 		width: element.placement.width,
// 					// 		height: element.placement.height,
// 					// 		scaleX: element.placement.scaleX,
// 					// 		scaleY: element.placement.scaleY,
// 					// 		angle: element.placement.rotation,
// 					// 		objectCaching: false,
// 					// 		selectable: true,
// 					// 		lockUniScaling: true,
// 					// 		customFilter: element.properties.effect.type,
// 					// 	}
// 					// );
// 					const videoObject = new CoverVideo(videoElement, {
// 						type: "coverVideo", // Include 'type' property
// 						name: element.id,
// 						left: element.placement.x,
// 						top: element.placement.y,
// 						width: element.placement.width,
// 						height: element.placement.height,
// 						scaleX: element.placement.scaleX,
// 						scaleY: element.placement.scaleY,
// 						angle: element.placement.rotation,
// 						objectCaching: false,
// 						selectable: true,
// 						lockUniScaling: true,
// 						customFilter: element.properties.effect.type,
// 					});

// 					element.fabricObject = videoObject;
// 					element.properties.imageObject = videoObject;
// 					videoElement.width = 100;
// 					videoElement.height =
// 						(videoElement.videoHeight * 100) /
// 						videoElement.videoWidth;
// 					canvas.add(videoObject);
// 					canvas.on("object:modified", function (e) {
// 						if (!e.target) return;
// 						const target = e.target;
// 						if (target != videoObject) return;
// 						const placement = element.placement;
// 						const newPlacement: Placement = {
// 							...placement,
// 							x: target.left ?? placement.x,
// 							y: target.top ?? placement.y,
// 							rotation: target.angle ?? placement.rotation,
// 							width:
// 								target.width && target.scaleX
// 									? target.width * target.scaleX
// 									: placement.width,
// 							height:
// 								target.height && target.scaleY
// 									? target.height * target.scaleY
// 									: placement.height,
// 							scaleX: 1,
// 							scaleY: 1,
// 						};
// 						const newElement = {
// 							...element,
// 							placement: newPlacement,
// 						};
// 						store.updateEditorElement(newElement);
// 					});
// 					break;
// 				}
// 				case "image": {
// 					if (
// 						document.getElementById(element.properties.elementId) ==
// 						null
// 					)
// 						continue;
// 					const imageElement = document.getElementById(
// 						element.properties.elementId
// 					);
// 					if (!isHtmlImageElement(imageElement)) continue;
// 					// const filters = [];
// 					// if (element.properties.effect?.type === "blackAndWhite") {
// 					//   filters.push(new fabric.Image.filters.Grayscale());
// 					// }
// 					// const imageObject = new (fabric as any).CoverImage(
// 					// 	imageElement,
// 					// 	{
// 					// 		name: element.id,
// 					// 		left: element.placement.x,
// 					// 		top: element.placement.y,
// 					// 		angle: element.placement.rotation,
// 					// 		objectCaching: false,
// 					// 		selectable: true,
// 					// 		lockUniScaling: true,
// 					// 		// filters
// 					// 		// @ts-ignore
// 					// 		customFilter: element.properties.effect.type,
// 					// 	}
// 					// );
// 					const imageObject = new CoverImage(imageElement, {
// 						type: "coverImage", // Add this line
// 						name: element.id,
// 						left: element.placement.x,
// 						top: element.placement.y,
// 						width: element.placement.width,
// 						height: element.placement.height,
// 						scaleX: element.placement.scaleX,
// 						scaleY: element.placement.scaleY,
// 						angle: element.placement.rotation,
// 						objectCaching: false,
// 						selectable: true,
// 						lockUniScaling: true,
// 						customFilter: element.properties.effect.type,
// 					});

// 					// imageObject.applyFilters();
// 					element.fabricObject = imageObject;
// 					element.properties.imageObject = imageObject;
// 					const image = {
// 						w: imageElement.naturalWidth,
// 						h: imageElement.naturalHeight,
// 					};

// 					imageObject.width = image.w;
// 					imageObject.height = image.h;
// 					imageElement.width = image.w;
// 					imageElement.height = image.h;
// 					imageObject.scaleToHeight(image.w);
// 					imageObject.scaleToWidth(image.h);
// 					const toScale = {
// 						x: element.placement.width / image.w,
// 						y: element.placement.height / image.h,
// 					};
// 					imageObject.scaleX = toScale.x * element.placement.scaleX;
// 					imageObject.scaleY = toScale.y * element.placement.scaleY;
// 					canvas.add(imageObject);
// 					canvas.on("object:modified", function (e) {
// 						if (!e.target) return;
// 						const target = e.target;
// 						if (target != imageObject) return;
// 						const placement = element.placement;
// 						let fianlScale = 1;
// 						if (target.scaleX && target.scaleX > 0) {
// 							fianlScale = target.scaleX / toScale.x;
// 						}
// 						const newPlacement: Placement = {
// 							...placement,
// 							x: target.left ?? placement.x,
// 							y: target.top ?? placement.y,
// 							rotation: target.angle ?? placement.rotation,
// 							scaleX: fianlScale,
// 							scaleY: fianlScale,
// 						};
// 						const newElement = {
// 							...element,
// 							placement: newPlacement,
// 						};
// 						store.updateEditorElement(newElement);
// 					});
// 					break;
// 				}
// 				case "audio": {
// 					break;
// 				}
// 				case "text": {
// 					const textObject = new fabric.Textbox(
// 						element.properties.text,
// 						{
// 							name: element.id,
// 							left: element.placement.x,
// 							top: element.placement.y,
// 							scaleX: element.placement.scaleX,
// 							scaleY: element.placement.scaleY,
// 							width: element.placement.width,
// 							height: element.placement.height,
// 							angle: element.placement.rotation,
// 							fontSize: element.properties.fontSize,
// 							fontWeight: element.properties.fontWeight,
// 							objectCaching: false,
// 							selectable: true,
// 							lockUniScaling: true,
// 							fill: "#ffffff",
// 						}
// 					);
// 					element.fabricObject = textObject;
// 					canvas.add(textObject);
// 					canvas.on("object:modified", function (e) {
// 						if (!e.target) return;
// 						const target = e.target;
// 						if (target != textObject) return;
// 						const placement = element.placement;
// 						const newPlacement: Placement = {
// 							...placement,
// 							x: target.left ?? placement.x,
// 							y: target.top ?? placement.y,
// 							rotation: target.angle ?? placement.rotation,
// 							width: target.width ?? placement.width,
// 							height: target.height ?? placement.height,
// 							scaleX: target.scaleX ?? placement.scaleX,
// 							scaleY: target.scaleY ?? placement.scaleY,
// 						};
// 						const newElement = {
// 							...element,
// 							placement: newPlacement,
// 							properties: {
// 								// ...element.properties,
// 								// // @ts-expect-error
// 								// text: target?.text,
//                                 ...element.properties,
// 								// @ts-expect-error: target may not have a text property
// 								text: target?.text,
// 							},
// 						};
// 						store.updateEditorElement(newElement);
// 					});
// 					break;
// 				}
// 				default: {
// 					throw new Error("Not implemented");
// 				}
// 			}
// 			if (element.fabricObject) {
// 				element.fabricObject.on("selected", function (e: any) {
// 					store.setSelectedElement(element);
// 				});
// 			}
// 		}
// 		const selectedEditorElement = store.selectedElement;
// 		if (selectedEditorElement && selectedEditorElement.fabricObject) {
// 			canvas.setActiveObject(selectedEditorElement.fabricObject);
// 		}
// 		this.refreshAnimations();
// 		this.updateTimeTo(this.currentTimeInMs);
// 		store.canvas.renderAll();
// 	}
// }

// export function isEditorAudioElement(
// 	element: EditorElement
// ): element is AudioEditorElement {
// 	return element.type === "audio";
// }
// export function isEditorVideoElement(
// 	element: EditorElement
// ): element is VideoEditorElement {
// 	return element.type === "video";
// }

// export function isEditorImageElement(
// 	element: EditorElement
// ): element is ImageEditorElement {
// 	return element.type === "image";
// }

// function getTextObjectsPartitionedByCharacters(
// 	textObject: any,
// 	element: TextEditorElement
// ): any[] {
// 	let copyCharsObjects: any[] = [];
// 	// replace all line endings with blank
// 	const characters = (textObject.text ?? "")
// 		.split("")
// 		.filter((m: string) => m !== "\n");
// 	const charObjects = textObject.__charBounds;
// 	if (!charObjects) return [];
// 	const charObjectFixed = charObjects
// 		.map((m: any, index: number) =>
// 			m.slice(0, m.length - 1).map((m: any) => ({ m, index }))
// 		)
// 		.flat();
// 	const lineHeight = textObject.getHeightOfLine(0);
// 	for (let i = 0; i < characters.length; i++) {
// 		if (!charObjectFixed[i]) continue;
// 		const { m: charObject, index: lineIndex } = charObjectFixed[i];
// 		const char = characters[i];
// 		const scaleX = textObject.scaleX ?? 1;
// 		const scaleY = textObject.scaleY ?? 1;
// 		const charTextObject = new fabric.Text(char, {
// 			left: charObject.left * scaleX + element.placement.x,
// 			scaleX: scaleX,
// 			scaleY: scaleY,
// 			top: lineIndex * lineHeight * scaleY + element.placement.y,
// 			fontSize: textObject.fontSize,
// 			fontWeight: textObject.fontWeight,
// 			fill: "#fff",
// 		});
// 		copyCharsObjects.push(charTextObject);
// 	}
// 	return copyCharsObjects;
// }

// // import { makeAutoObservable } from "mobx";
// // import * as fabric from "fabric";
// // import anime, { get } from "animejs";
// // // import {
// // //   MenuOption,
// // //   EditorElement,
// // //   Animation,
// // //   TimeFrame,
// // //   VideoEditorElement,
// // //   AudioEditorElement,
// // //   Placement,
// // //   ImageEditorElement,
// // //   Effect,
// // //   TextEditorElement,
// // // } from '@/types/change'
// // // import { FabricUitls } from '@/utils/fabric-utils'
// // import { FFmpeg } from "@ffmpeg/ffmpeg";
// // import { toBlobURL } from "@ffmpeg/util";
// // import {
// // 	AudioEditorElement,
// // 	EditorElement,
// // 	Effect,
// // 	ImageEditorElement,
// // 	MenuOption,
// // 	Placement,
// // 	TextEditorElement,
// // 	TimeFrame,
// // 	VideoEditorElement,
// // } from "@/types/change/fabric-types";
// // import { FabricUitls } from "@/lib/change/fabric-utils";
// // import { isHtmlVideoElement } from "@/lib/change";
// // // import { FabricUitls } from '../utils/fabric-utils'
// // // import {
// // //   getUid,
// // //   isHtmlAudioElement,
// // //   isHtmlImageElement,
// // //   isHtmlVideoElement,
// // // } from '../utils'

// // export class Store {
// // 	canvas: fabric.Canvas | null;

// // 	backgroundColor: string;

// // 	selectedMenuOption: MenuOption;
// // 	audios: string[];
// // 	videos: string[];
// // 	images: string[];
// // 	editorElements: EditorElement[];
// // 	selectedElement: EditorElement | null;

// // 	maxTime: number;
// // 	animations: Animation[];
// // 	animationTimeLine: anime.AnimeTimelineInstance | any;
// // 	playing: boolean;

// // 	currentKeyFrame: number;
// // 	fps: number;

// // 	possibleVideoFormats: string[] = ["mp4", "webm"];
// // 	selectedVideoFormat: "mp4" | "webm";

// // 	constructor() {
// // 		this.canvas = null;
// // 		this.videos = [];
// // 		this.images = [];
// // 		this.audios = [];
// // 		this.editorElements = [];
// // 		this.backgroundColor = "#111111";
// // 		this.maxTime = 30 * 1000;
// // 		this.playing = false;
// // 		this.currentKeyFrame = 0;
// // 		this.selectedElement = null;
// // 		this.fps = 60;
// // 		this.animations = [];
// // 		this.animationTimeLine =
// // 			typeof window !== "undefined" ? anime.timeline() : null;
// // 		this.selectedMenuOption = "Video";
// // 		this.selectedVideoFormat = "mp4";
// // 		makeAutoObservable(this);
// // 	}

// // 	get currentTimeInMs() {
// // 		return (this.currentKeyFrame * 1000) / this.fps;
// // 	}

// // 	setCurrentTimeInMs(time: number) {
// // 		this.currentKeyFrame = Math.floor((time / 1000) * this.fps);
// // 	}

// // 	setSelectedMenuOption(selectedMenuOption: MenuOption) {
// // 		this.selectedMenuOption = selectedMenuOption;
// // 	}

// // 	setCanvas(canvas: fabric.Canvas | null) {
// // 		this.canvas = canvas;
// // 		if (canvas) {
// // 			canvas.backgroundColor = this.backgroundColor;
// // 		}
// // 	}

// // 	setBackgroundColor(backgroundColor: string) {
// // 		this.backgroundColor = backgroundColor;
// // 		if (this.canvas) {
// // 			this.canvas.backgroundColor = backgroundColor;
// // 		}
// // 	}

// // 	updateEffect(id: string, effect: Effect) {
// // 		const index = this.editorElements.findIndex(
// // 			(element) => element.id === id
// // 		);
// // 		const element = this.editorElements[index];
// // 		if (isEditorVideoElement(element) || isEditorImageElement(element)) {
// // 			element.properties.effect = effect;
// // 		}
// // 		this.refreshElements();
// // 	}

// // 	setVideos(videos: string[]) {
// // 		this.videos = videos;
// // 	}

// // 	addVideoResource(video: string) {
// // 		this.videos = [...this.videos, video];
// // 	}
// // 	addAudioResource(audio: string) {
// // 		this.audios = [...this.audios, audio];
// // 	}
// // 	addImageResource(image: string) {
// // 		this.images = [...this.images, image];
// // 	}

// // 	addAnimation(animation: Animation) {
// // 		this.animations = [...this.animations, animation];
// // 		this.refreshAnimations();
// // 	}
// // 	updateAnimation(id: string, animation: Animation) {
// // 		const index = this.animations.findIndex((a) => a.id === id);
// // 		this.animations[index] = animation;
// // 		this.refreshAnimations();
// // 	}

// // 	refreshAnimations() {
// // 		anime.remove(this.animationTimeLine);
// // 		this.animationTimeLine = anime.timeline({
// // 			duration: this.maxTime,
// // 			autoplay: false,
// // 		});
// // 		for (let i = 0; i < this.animations.length; i++) {
// // 			const animation = this.animations[i];
// // 			const editorElement = this.editorElements.find(
// // 				(element) => element.id === animation.targetId
// // 			);
// // 			const fabricObject = editorElement?.fabricObject;
// // 			if (!editorElement || !fabricObject) {
// // 				continue;
// // 			}
// // 			fabricObject.clipPath = undefined;
// // 			switch (animation.type) {
// // 				case "fadeIn": {
// // 					this.animationTimeLine.add(
// // 						{
// // 							opacity: [0, 1],
// // 							duration: animation.duration,
// // 							targets: fabricObject,
// // 							easing: "linear",
// // 						},
// // 						editorElement.timeFrame.start
// // 					);
// // 					break;
// // 				}
// // 				case "fadeOut": {
// // 					this.animationTimeLine.add(
// // 						{
// // 							opacity: [1, 0],
// // 							duration: animation.duration,
// // 							targets: fabricObject,
// // 							easing: "linear",
// // 						},
// // 						editorElement.timeFrame.end - animation.duration
// // 					);
// // 					break;
// // 				}
// // 				case "slideIn": {
// // 					const direction = animation.properties.direction;
// // 					const targetPosition = {
// // 						left: editorElement.placement.x,
// // 						top: editorElement.placement.y,
// // 					};
// // 					const startPosition = {
// // 						left:
// // 							direction === "left"
// // 								? -editorElement.placement.width
// // 								: direction === "right"
// // 									? this.canvas?.width
// // 									: editorElement.placement.x,
// // 						top:
// // 							direction === "top"
// // 								? -editorElement.placement.height
// // 								: direction === "bottom"
// // 									? this.canvas?.height
// // 									: editorElement.placement.y,
// // 					};
// // 					if (animation.properties.useClipPath) {
// // 						const clipRectangle = FabricUitls.getClipMaskRect(
// // 							editorElement,
// // 							50
// // 						);
// // 						fabricObject.set("clipPath", clipRectangle);
// // 					}
// // 					if (
// // 						editorElement.type === "text" &&
// // 						animation.properties.textType === "character"
// // 					) {
// // 						this.canvas?.remove(
// // 							...editorElement.properties.splittedTexts
// // 						);
// // 						// @ts-ignore
// // 						editorElement.properties.splittedTexts =
// // 							getTextObjectsPartitionedByCharacters(
// // 								editorElement.fabricObject,
// // 								editorElement
// // 							);
// // 						editorElement.properties.splittedTexts.forEach(
// // 							(textObject) => {
// // 								this.canvas!.add(textObject);
// // 							}
// // 						);
// // 						const duration = animation.duration / 2;
// // 						const delay =
// // 							duration /
// // 							editorElement.properties.splittedTexts.length;
// // 						for (
// // 							let i = 0;
// // 							i < editorElement.properties.splittedTexts.length;
// // 							i++
// // 						) {
// // 							const splittedText =
// // 								editorElement.properties.splittedTexts[i];
// // 							const offset = {
// // 								left:
// // 									splittedText.left! -
// // 									editorElement.placement.x,
// // 								top:
// // 									splittedText.top! -
// // 									editorElement.placement.y,
// // 							};
// // 							this.animationTimeLine.add(
// // 								{
// // 									left: [
// // 										startPosition.left! + offset.left,
// // 										targetPosition.left + offset.left,
// // 									],
// // 									top: [
// // 										startPosition.top! + offset.top,
// // 										targetPosition.top + offset.top,
// // 									],
// // 									delay: i * delay,
// // 									duration: duration,
// // 									targets: splittedText,
// // 								},
// // 								editorElement.timeFrame.start
// // 							);
// // 						}
// // 						this.animationTimeLine.add(
// // 							{
// // 								opacity: [1, 0],
// // 								duration: 1,
// // 								targets: fabricObject,
// // 								easing: "linear",
// // 							},
// // 							editorElement.timeFrame.start
// // 						);
// // 						this.animationTimeLine.add(
// // 							{
// // 								opacity: [0, 1],
// // 								duration: 1,
// // 								targets: fabricObject,
// // 								easing: "linear",
// // 							},
// // 							editorElement.timeFrame.start + animation.duration
// // 						);

// // 						this.animationTimeLine.add(
// // 							{
// // 								opacity: [0, 1],
// // 								duration: 1,
// // 								targets: editorElement.properties.splittedTexts,
// // 								easing: "linear",
// // 							},
// // 							editorElement.timeFrame.start
// // 						);
// // 						this.animationTimeLine.add(
// // 							{
// // 								opacity: [1, 0],
// // 								duration: 1,
// // 								targets: editorElement.properties.splittedTexts,
// // 								easing: "linear",
// // 							},
// // 							editorElement.timeFrame.start + animation.duration
// // 						);
// // 					}
// // 					this.animationTimeLine.add(
// // 						{
// // 							left: [startPosition.left, targetPosition.left],
// // 							top: [startPosition.top, targetPosition.top],
// // 							duration: animation.duration,
// // 							targets: fabricObject,
// // 							easing: "linear",
// // 						},
// // 						editorElement.timeFrame.start
// // 					);
// // 					break;
// // 				}
// // 				case "slideOut": {
// // 					const direction = animation.properties.direction;
// // 					const startPosition = {
// // 						left: editorElement.placement.x,
// // 						top: editorElement.placement.y,
// // 					};
// // 					const targetPosition = {
// // 						left:
// // 							direction === "left"
// // 								? -editorElement.placement.width
// // 								: direction === "right"
// // 									? this.canvas?.width
// // 									: editorElement.placement.x,
// // 						top:
// // 							direction === "top"
// // 								? -100 - editorElement.placement.height
// // 								: direction === "bottom"
// // 									? this.canvas?.height
// // 									: editorElement.placement.y,
// // 					};
// // 					if (animation.properties.useClipPath) {
// // 						const clipRectangle = FabricUitls.getClipMaskRect(
// // 							editorElement,
// // 							50
// // 						);
// // 						fabricObject.set("clipPath", clipRectangle);
// // 					}
// // 					this.animationTimeLine.add(
// // 						{
// // 							left: [startPosition.left, targetPosition.left],
// // 							top: [startPosition.top, targetPosition.top],
// // 							duration: animation.duration,
// // 							targets: fabricObject,
// // 							easing: "linear",
// // 						},
// // 						editorElement.timeFrame.end - animation.duration
// // 					);
// // 					break;
// // 				}
// // 				case "breathe": {
// // 					const itsSlideInAnimation = this.animations.find(
// // 						(a) =>
// // 							a.targetId === animation.targetId &&
// // 							a.type === "slideIn"
// // 					);
// // 					const itsSlideOutAnimation = this.animations.find(
// // 						(a) =>
// // 							a.targetId === animation.targetId &&
// // 							a.type === "slideOut"
// // 					);
// // 					const timeEndOfSlideIn = itsSlideInAnimation
// // 						? editorElement.timeFrame.start +
// // 							itsSlideInAnimation.duration
// // 						: editorElement.timeFrame.start;
// // 					const timeStartOfSlideOut = itsSlideOutAnimation
// // 						? editorElement.timeFrame.end -
// // 							itsSlideOutAnimation.duration
// // 						: editorElement.timeFrame.end;
// // 					if (timeEndOfSlideIn > timeStartOfSlideOut) {
// // 						continue;
// // 					}
// // 					const duration = timeStartOfSlideOut - timeEndOfSlideIn;
// // 					const easeFactor = 4;
// // 					const suitableTimeForHeartbeat =
// // 						((1000 * 60) / 72) * easeFactor;
// // 					const upScale = 1.05;
// // 					const currentScaleX = fabricObject.scaleX ?? 1;
// // 					const currentScaleY = fabricObject.scaleY ?? 1;
// // 					const finalScaleX = currentScaleX * upScale;
// // 					const finalScaleY = currentScaleY * upScale;
// // 					const totalHeartbeats = Math.floor(
// // 						duration / suitableTimeForHeartbeat
// // 					);
// // 					if (totalHeartbeats < 1) {
// // 						continue;
// // 					}
// // 					const keyframes = [];
// // 					for (let i = 0; i < totalHeartbeats; i++) {
// // 						keyframes.push({
// // 							scaleX: finalScaleX,
// // 							scaleY: finalScaleY,
// // 						});
// // 						keyframes.push({
// // 							scaleX: currentScaleX,
// // 							scaleY: currentScaleY,
// // 						});
// // 					}

// // 					this.animationTimeLine.add(
// // 						{
// // 							duration: duration,
// // 							targets: fabricObject,
// // 							keyframes,
// // 							easing: "linear",
// // 							loop: true,
// // 						},
// // 						timeEndOfSlideIn
// // 					);

// // 					break;
// // 				}
// // 			}
// // 		}
// // 	}

// // 	removeAnimation(id: string) {
// // 		this.animations = this.animations.filter(
// // 			(animation) => animation.id !== id
// // 		);
// // 		this.refreshAnimations();
// // 	}

// // 	setSelectedElement(selectedElement: EditorElement | null) {
// // 		this.selectedElement = selectedElement;
// // 		if (this.canvas) {
// // 			if (selectedElement?.fabricObject)
// // 				this.canvas.setActiveObject(selectedElement.fabricObject);
// // 			else this.canvas.discardActiveObject();
// // 		}
// // 	}
// // 	updateSelectedElement() {
// // 		this.selectedElement =
// // 			this.editorElements.find(
// // 				(element) => element.id === this.selectedElement?.id
// // 			) ?? null;
// // 	}

// // 	setEditorElements(editorElements: EditorElement[]) {
// // 		this.editorElements = editorElements;
// // 		this.updateSelectedElement();
// // 		this.refreshElements();
// // 		// this.refreshAnimations();
// // 	}

// // 	updateEditorElement(editorElement: EditorElement) {
// // 		this.setEditorElements(
// // 			this.editorElements.map((element) =>
// // 				element.id === editorElement.id ? editorElement : element
// // 			)
// // 		);
// // 	}

// // 	updateEditorElementTimeFrame(
// // 		editorElement: EditorElement,
// // 		timeFrame: Partial<TimeFrame>
// // 	) {
// // 		if (timeFrame.start != undefined && timeFrame.start < 0) {
// // 			timeFrame.start = 0;
// // 		}
// // 		if (timeFrame.end != undefined && timeFrame.end > this.maxTime) {
// // 			timeFrame.end = this.maxTime;
// // 		}
// // 		const newEditorElement = {
// // 			...editorElement,
// // 			timeFrame: {
// // 				...editorElement.timeFrame,
// // 				...timeFrame,
// // 			},
// // 		};
// // 		this.updateVideoElements();
// // 		this.updateAudioElements();
// // 		this.updateEditorElement(newEditorElement);
// // 		this.refreshAnimations();
// // 	}

// // 	addEditorElement(editorElement: EditorElement) {
// // 		this.setEditorElements([...this.editorElements, editorElement]);
// // 		this.refreshElements();
// // 		this.setSelectedElement(
// // 			this.editorElements[this.editorElements.length - 1]
// // 		);
// // 	}

// // 	removeEditorElement(id: string) {
// // 		this.setEditorElements(
// // 			this.editorElements.filter(
// // 				(editorElement) => editorElement.id !== id
// // 			)
// // 		);
// // 		this.refreshElements();
// // 	}

// // 	setMaxTime(maxTime: number) {
// // 		this.maxTime = maxTime;
// // 	}

// // 	setPlaying(playing: boolean) {
// // 		this.playing = playing;
// // 		this.updateVideoElements();
// // 		this.updateAudioElements();
// // 		if (playing) {
// // 			this.startedTime = Date.now();
// // 			this.startedTimePlay = this.currentTimeInMs;
// // 			requestAnimationFrame(() => {
// // 				this.playFrames();
// // 			});
// // 		}
// // 	}

// // 	startedTime = 0;
// // 	startedTimePlay = 0;

// // 	playFrames() {
// // 		if (!this.playing) {
// // 			return;
// // 		}
// // 		const elapsedTime = Date.now() - this.startedTime;
// // 		const newTime = this.startedTimePlay + elapsedTime;
// // 		this.updateTimeTo(newTime);
// // 		if (newTime > this.maxTime) {
// // 			this.currentKeyFrame = 0;
// // 			this.setPlaying(false);
// // 		} else {
// // 			requestAnimationFrame(() => {
// // 				this.playFrames();
// // 			});
// // 		}
// // 	}
// // 	updateTimeTo(newTime: number) {
// // 		this.setCurrentTimeInMs(newTime);
// // 		this.animationTimeLine.seek(newTime);
// // 		if (this.canvas) {
// // 			this.canvas.backgroundColor = this.backgroundColor;
// // 		}
// // 		this.editorElements.forEach((e) => {
// // 			if (!e.fabricObject) return;
// // 			const isInside =
// // 				e.timeFrame.start <= newTime && newTime <= e.timeFrame.end;
// // 			e.fabricObject.visible = isInside;
// // 		});
// // 	}

// // 	handleSeek(seek: number) {
// // 		if (this.playing) {
// // 			this.setPlaying(false);
// // 		}
// // 		this.updateTimeTo(seek);
// // 		this.updateVideoElements();
// // 		this.updateAudioElements();
// // 	}

// // 	addVideo(index: number) {
// // 		const videoElement = document.getElementById(`video-${index}`);
// // 		if (!isHtmlVideoElement(videoElement)) {
// // 			return;
// // 		}
// // 		const videoDurationMs = videoElement.duration * 1000;
// // 		const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
// // 		const id = getUid();
// // 		this.addEditorElement({
// // 			id,
// // 			name: `Media(video) ${index + 1}`,
// // 			type: "video",
// // 			placement: {
// // 				x: 0,
// // 				y: 0,
// // 				width: 100 * aspectRatio,
// // 				height: 100,
// // 				rotation: 0,
// // 				scaleX: 1,
// // 				scaleY: 1,
// // 			},
// // 			timeFrame: {
// // 				start: 0,
// // 				end: videoDurationMs,
// // 			},
// // 			properties: {
// // 				elementId: `video-${id}`,
// // 				src: videoElement.src,
// // 				effect: {
// // 					type: "none",
// // 				},
// // 			},
// // 		});
// // 	}

// // 	addImage(index: number) {
// // 		const imageElement = document.getElementById(`image-${index}`);
// // 		if (!isHtmlImageElement(imageElement)) {
// // 			return;
// // 		}
// // 		const aspectRatio =
// // 			imageElement.naturalWidth / imageElement.naturalHeight;
// // 		const id = getUid();
// // 		this.addEditorElement({
// // 			id,
// // 			name: `Media(image) ${index + 1}`,
// // 			type: "image",
// // 			placement: {
// // 				x: 0,
// // 				y: 0,
// // 				width: 100 * aspectRatio,
// // 				height: 100,
// // 				rotation: 0,
// // 				scaleX: 1,
// // 				scaleY: 1,
// // 			},
// // 			timeFrame: {
// // 				start: 0,
// // 				end: this.maxTime,
// // 			},
// // 			properties: {
// // 				elementId: `image-${id}`,
// // 				src: imageElement.src,
// // 				effect: {
// // 					type: "none",
// // 				},
// // 			},
// // 		});
// // 	}

// // 	addAudio(index: number) {
// // 		const audioElement = document.getElementById(`audio-${index}`);
// // 		if (!isHtmlAudioElement(audioElement)) {
// // 			return;
// // 		}
// // 		const audioDurationMs = audioElement.duration * 1000;
// // 		const id = getUid();
// // 		this.addEditorElement({
// // 			id,
// // 			name: `Media(audio) ${index + 1}`,
// // 			type: "audio",
// // 			placement: {
// // 				x: 0,
// // 				y: 0,
// // 				width: 100,
// // 				height: 100,
// // 				rotation: 0,
// // 				scaleX: 1,
// // 				scaleY: 1,
// // 			},
// // 			timeFrame: {
// // 				start: 0,
// // 				end: audioDurationMs,
// // 			},
// // 			properties: {
// // 				elementId: `audio-${id}`,
// // 				src: audioElement.src,
// // 			},
// // 		});
// // 	}
// // 	addText(options: { text: string; fontSize: number; fontWeight: number }) {
// // 		const id = getUid();
// // 		const index = this.editorElements.length;
// // 		this.addEditorElement({
// // 			id,
// // 			name: `Text ${index + 1}`,
// // 			type: "text",
// // 			placement: {
// // 				x: 0,
// // 				y: 0,
// // 				width: 100,
// // 				height: 100,
// // 				rotation: 0,
// // 				scaleX: 1,
// // 				scaleY: 1,
// // 			},
// // 			timeFrame: {
// // 				start: 0,
// // 				end: this.maxTime,
// // 			},
// // 			properties: {
// // 				text: options.text,
// // 				fontSize: options.fontSize,
// // 				fontWeight: options.fontWeight,
// // 				splittedTexts: [],
// // 			},
// // 		});
// // 	}

// // 	updateVideoElements() {
// // 		this.editorElements
// // 			.filter(
// // 				(element): element is VideoEditorElement =>
// // 					element.type === "video"
// // 			)
// // 			.forEach((element) => {
// // 				const video = document.getElementById(
// // 					element.properties.elementId
// // 				);
// // 				if (isHtmlVideoElement(video)) {
// // 					const videoTime =
// // 						(this.currentTimeInMs - element.timeFrame.start) / 1000;
// // 					video.currentTime = videoTime;
// // 					if (this.playing) {
// // 						video.play();
// // 					} else {
// // 						video.pause();
// // 					}
// // 				}
// // 			});
// // 	}
// // 	updateAudioElements() {
// // 		this.editorElements
// // 			.filter(
// // 				(element): element is AudioEditorElement =>
// // 					element.type === "audio"
// // 			)
// // 			.forEach((element) => {
// // 				const audio = document.getElementById(
// // 					element.properties.elementId
// // 				);
// // 				if (isHtmlAudioElement(audio)) {
// // 					const audioTime =
// // 						(this.currentTimeInMs - element.timeFrame.start) / 1000;
// // 					audio.currentTime = audioTime;
// // 					if (this.playing) {
// // 						audio.play();
// // 					} else {
// // 						audio.pause();
// // 					}
// // 				}
// // 			});
// // 	}
// // 	// saveCanvasToVideo() {
// // 	//   const video = document.createElement("video");
// // 	//   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// // 	//   const stream = canvas.captureStream();
// // 	//   video.srcObject = stream;
// // 	//   video.play();
// // 	//   const mediaRecorder = new MediaRecorder(stream);
// // 	//   const chunks: Blob[] = [];
// // 	//   mediaRecorder.ondataavailable = function (e) {
// // 	//     console.log("data available");
// // 	//     console.log(e.data);
// // 	//     chunks.push(e.data);
// // 	//   };
// // 	//   mediaRecorder.onstop = function (e) {
// // 	//     const blob = new Blob(chunks, { type: "video/webm" });
// // 	//     const url = URL.createObjectURL(blob);
// // 	//     const a = document.createElement("a");
// // 	//     a.href = url;
// // 	//     a.download = "video.webm";
// // 	//     a.click();
// // 	//   };
// // 	//   mediaRecorder.start();
// // 	//   setTimeout(() => {
// // 	//     mediaRecorder.stop();
// // 	//   }, this.maxTime);

// // 	// }

// // 	setVideoFormat(format: "mp4" | "webm") {
// // 		this.selectedVideoFormat = format;
// // 	}

// // 	saveCanvasToVideoWithAudio() {
// // 		this.saveCanvasToVideoWithAudioWebmMp4();
// // 	}

// // 	saveCanvasToVideoWithAudioWebmMp4() {
// // 		console.log("modified");
// // 		let mp4 = this.selectedVideoFormat === "mp4";
// // 		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// // 		const stream = canvas.captureStream(30);
// // 		const audioElements = this.editorElements.filter(isEditorAudioElement);
// // 		const audioStreams: MediaStream[] = [];
// // 		audioElements.forEach((audio) => {
// // 			const audioElement = document.getElementById(
// // 				audio.properties.elementId
// // 			) as HTMLAudioElement;
// // 			let ctx = new AudioContext();
// // 			let sourceNode = ctx.createMediaElementSource(audioElement);
// // 			let dest = ctx.createMediaStreamDestination();
// // 			sourceNode.connect(dest);
// // 			sourceNode.connect(ctx.destination);
// // 			audioStreams.push(dest.stream);
// // 		});
// // 		audioStreams.forEach((audioStream) => {
// // 			stream.addTrack(audioStream.getAudioTracks()[0]);
// // 		});
// // 		const video = document.createElement("video");
// // 		video.srcObject = stream;
// // 		video.height = 500;
// // 		video.width = 800;
// // 		// video.controls = true;
// // 		// document.body.appendChild(video);
// // 		video.play().then(() => {
// // 			const mediaRecorder = new MediaRecorder(stream);
// // 			const chunks: Blob[] = [];
// // 			mediaRecorder.ondataavailable = function (e) {
// // 				chunks.push(e.data);
// // 				console.log("data available");
// // 			};
// // 			mediaRecorder.onstop = async function (e) {
// // 				const blob = new Blob(chunks, { type: "video/webm" });

// // 				if (mp4) {
// // 					// lets use ffmpeg to convert webm to mp4
// // 					const data = new Uint8Array(await blob.arrayBuffer());
// // 					const ffmpeg = new FFmpeg();
// // 					const baseURL =
// // 						"https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
// // 					await ffmpeg.load({
// // 						coreURL: await toBlobURL(
// // 							`${baseURL}/ffmpeg-core.js`,
// // 							"text/javascript"
// // 						),
// // 						wasmURL: await toBlobURL(
// // 							`${baseURL}/ffmpeg-core.wasm`,
// // 							"application/wasm"
// // 						),
// // 						// workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
// // 					});
// // 					await ffmpeg.writeFile("video.webm", data);
// // 					await ffmpeg.exec([
// // 						"-y",
// // 						"-i",
// // 						"video.webm",
// // 						"-c",
// // 						"copy",
// // 						"video.mp4",
// // 					]);
// // 					// await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "video.mp4"]);

// // 					const output = await ffmpeg.readFile("video.mp4");
// // 					const outputBlob = new Blob([output], {
// // 						type: "video/mp4",
// // 					});
// // 					const outputUrl = URL.createObjectURL(outputBlob);
// // 					const a = document.createElement("a");
// // 					a.download = "video.mp4";
// // 					a.href = outputUrl;
// // 					a.click();
// // 				} else {
// // 					const url = URL.createObjectURL(blob);
// // 					const a = document.createElement("a");
// // 					a.href = url;
// // 					a.download = "video.webm";
// // 					a.click();
// // 				}
// // 			};
// // 			mediaRecorder.start();
// // 			setTimeout(() => {
// // 				mediaRecorder.stop();
// // 			}, this.maxTime);
// // 			video.remove();
// // 		});
// // 	}

// // 	refreshElements() {
// // 		const store = this;
// // 		if (!store.canvas) return;
// // 		const canvas = store.canvas;
// // 		store.canvas.remove(...store.canvas.getObjects());
// // 		for (let index = 0; index < store.editorElements.length; index++) {
// // 			const element = store.editorElements[index];
// // 			switch (element.type) {
// // 				case "video": {
// // 					console.log("elementid", element.properties.elementId);
// // 					if (
// // 						document.getElementById(element.properties.elementId) ==
// // 						null
// // 					)
// // 						continue;
// // 					const videoElement = document.getElementById(
// // 						element.properties.elementId
// // 					);
// // 					if (!isHtmlVideoElement(videoElement)) continue;
// // 					// const filters = [];
// // 					// if (element.properties.effect?.type === "blackAndWhite") {
// // 					//   filters.push(new fabric.Image.filters.Grayscale());
// // 					// }
// // 					const videoObject = new fabric.CoverVideo(videoElement, {
// // 						name: element.id,
// // 						left: element.placement.x,
// // 						top: element.placement.y,
// // 						width: element.placement.width,
// // 						height: element.placement.height,
// // 						scaleX: element.placement.scaleX,
// // 						scaleY: element.placement.scaleY,
// // 						angle: element.placement.rotation,
// // 						objectCaching: false,
// // 						selectable: true,
// // 						lockUniScaling: true,
// // 						// filters: filters,
// // 						// @ts-ignore
// // 						customFilter: element.properties.effect.type,
// // 					});

// // 					element.fabricObject = videoObject;
// // 					element.properties.imageObject = videoObject;
// // 					videoElement.width = 100;
// // 					videoElement.height =
// // 						(videoElement.videoHeight * 100) /
// // 						videoElement.videoWidth;
// // 					canvas.add(videoObject);
// // 					canvas.on("object:modified", function (e) {
// // 						if (!e.target) return;
// // 						const target = e.target;
// // 						if (target != videoObject) return;
// // 						const placement = element.placement;
// // 						const newPlacement: Placement = {
// // 							...placement,
// // 							x: target.left ?? placement.x,
// // 							y: target.top ?? placement.y,
// // 							rotation: target.angle ?? placement.rotation,
// // 							width:
// // 								target.width && target.scaleX
// // 									? target.width * target.scaleX
// // 									: placement.width,
// // 							height:
// // 								target.height && target.scaleY
// // 									? target.height * target.scaleY
// // 									: placement.height,
// // 							scaleX: 1,
// // 							scaleY: 1,
// // 						};
// // 						const newElement = {
// // 							...element,
// // 							placement: newPlacement,
// // 						};
// // 						store.updateEditorElement(newElement);
// // 					});
// // 					break;
// // 				}
// // 				case "image": {
// // 					if (
// // 						document.getElementById(element.properties.elementId) ==
// // 						null
// // 					)
// // 						continue;
// // 					const imageElement = document.getElementById(
// // 						element.properties.elementId
// // 					);
// // 					if (!isHtmlImageElement(imageElement)) continue;
// // 					// const filters = [];
// // 					// if (element.properties.effect?.type === "blackAndWhite") {
// // 					//   filters.push(new fabric.Image.filters.Grayscale());
// // 					// }
// // 					const imageObject = new fabric.CoverImage(imageElement, {
// // 						name: element.id,
// // 						left: element.placement.x,
// // 						top: element.placement.y,
// // 						angle: element.placement.rotation,
// // 						objectCaching: false,
// // 						selectable: true,
// // 						lockUniScaling: true,
// // 						// filters
// // 						// @ts-ignore
// // 						customFilter: element.properties.effect.type,
// // 					});
// // 					// imageObject.applyFilters();
// // 					element.fabricObject = imageObject;
// // 					element.properties.imageObject = imageObject;
// // 					const image = {
// // 						w: imageElement.naturalWidth,
// // 						h: imageElement.naturalHeight,
// // 					};

// // 					imageObject.width = image.w;
// // 					imageObject.height = image.h;
// // 					imageElement.width = image.w;
// // 					imageElement.height = image.h;
// // 					imageObject.scaleToHeight(image.w);
// // 					imageObject.scaleToWidth(image.h);
// // 					const toScale = {
// // 						x: element.placement.width / image.w,
// // 						y: element.placement.height / image.h,
// // 					};
// // 					imageObject.scaleX = toScale.x * element.placement.scaleX;
// // 					imageObject.scaleY = toScale.y * element.placement.scaleY;
// // 					canvas.add(imageObject);
// // 					canvas.on("object:modified", function (e) {
// // 						if (!e.target) return;
// // 						const target = e.target;
// // 						if (target != imageObject) return;
// // 						const placement = element.placement;
// // 						let fianlScale = 1;
// // 						if (target.scaleX && target.scaleX > 0) {
// // 							fianlScale = target.scaleX / toScale.x;
// // 						}
// // 						const newPlacement: Placement = {
// // 							...placement,
// // 							x: target.left ?? placement.x,
// // 							y: target.top ?? placement.y,
// // 							rotation: target.angle ?? placement.rotation,
// // 							scaleX: fianlScale,
// // 							scaleY: fianlScale,
// // 						};
// // 						const newElement = {
// // 							...element,
// // 							placement: newPlacement,
// // 						};
// // 						store.updateEditorElement(newElement);
// // 					});
// // 					break;
// // 				}
// // 				case "audio": {
// // 					break;
// // 				}
// // 				case "text": {
// // 					const textObject = new fabric.Textbox(
// // 						element.properties.text,
// // 						{
// // 							name: element.id,
// // 							left: element.placement.x,
// // 							top: element.placement.y,
// // 							scaleX: element.placement.scaleX,
// // 							scaleY: element.placement.scaleY,
// // 							width: element.placement.width,
// // 							height: element.placement.height,
// // 							angle: element.placement.rotation,
// // 							fontSize: element.properties.fontSize,
// // 							fontWeight: element.properties.fontWeight,
// // 							objectCaching: false,
// // 							selectable: true,
// // 							lockUniScaling: true,
// // 							fill: "#ffffff",
// // 						}
// // 					);
// // 					element.fabricObject = textObject;
// // 					canvas.add(textObject);
// // 					canvas.on("object:modified", function (e) {
// // 						if (!e.target) return;
// // 						const target = e.target;
// // 						if (target != textObject) return;
// // 						const placement = element.placement;
// // 						const newPlacement: Placement = {
// // 							...placement,
// // 							x: target.left ?? placement.x,
// // 							y: target.top ?? placement.y,
// // 							rotation: target.angle ?? placement.rotation,
// // 							width: target.width ?? placement.width,
// // 							height: target.height ?? placement.height,
// // 							scaleX: target.scaleX ?? placement.scaleX,
// // 							scaleY: target.scaleY ?? placement.scaleY,
// // 						};
// // 						const newElement = {
// // 							...element,
// // 							placement: newPlacement,
// // 							properties: {
// // 								...element.properties,
// // 								// @ts-ignore
// // 								text: target?.text,
// // 							},
// // 						};
// // 						store.updateEditorElement(newElement);
// // 					});
// // 					break;
// // 				}
// // 				default: {
// // 					throw new Error("Not implemented");
// // 				}
// // 			}
// // 			if (element.fabricObject) {
// // 				element.fabricObject.on("selected", function (e: any) {
// // 					store.setSelectedElement(element);
// // 				});
// // 			}
// // 		}
// // 		const selectedEditorElement = store.selectedElement;
// // 		if (selectedEditorElement && selectedEditorElement.fabricObject) {
// // 			canvas.setActiveObject(selectedEditorElement.fabricObject);
// // 		}
// // 		this.refreshAnimations();
// // 		this.updateTimeTo(this.currentTimeInMs);
// // 		store.canvas.renderAll();
// // 	}
// // }

// // export function isEditorAudioElement(
// // 	element: EditorElement
// // ): element is AudioEditorElement {
// // 	return element.type === "audio";
// // }
// // export function isEditorVideoElement(
// // 	element: EditorElement
// // ): element is VideoEditorElement {
// // 	return element.type === "video";
// // }

// // export function isEditorImageElement(
// // 	element: EditorElement
// // ): element is ImageEditorElement {
// // 	return element.type === "image";
// // }

// // function getTextObjectsPartitionedByCharacters(
// // 	textObject: fabric.Text,
// // 	element: TextEditorElement
// // ): fabric.Text[] {
// // 	let copyCharsObjects: fabric.Text[] = [];
// // 	// replace all line endings with blank
// // 	const characters = (textObject.text ?? "")
// // 		.split("")
// // 		.filter((m) => m !== "\n");
// // 	const charObjects = textObject.__charBounds;
// // 	if (!charObjects) return [];
// // 	const charObjectFixed = charObjects
// // 		.map((m, index) => m.slice(0, m.length - 1).map((m) => ({ m, index })))
// // 		.flat();
// // 	const lineHeight = textObject.getHeightOfLine(0);
// // 	for (let i = 0; i < characters.length; i++) {
// // 		if (!charObjectFixed[i]) continue;
// // 		const { m: charObject, index: lineIndex } = charObjectFixed[i];
// // 		const char = characters[i];
// // 		const scaleX = textObject.scaleX ?? 1;
// // 		const scaleY = textObject.scaleY ?? 1;
// // 		const charTextObject = new fabric.Text(char, {
// // 			left: charObject.left * scaleX + element.placement.x,
// // 			scaleX: scaleX,
// // 			scaleY: scaleY,
// // 			top: lineIndex * lineHeight * scaleY + element.placement.y,
// // 			fontSize: textObject.fontSize,
// // 			fontWeight: textObject.fontWeight,
// // 			fill: "#fff",
// // 		});
// // 		copyCharsObjects.push(charTextObject);
// // 	}
// // 	return copyCharsObjects;
// // }

import { makeAutoObservable } from "mobx";
// import { Canvas } from "fabric";
import * as fabric from "fabric";
import anime from "animejs";
import {
	MenuOption,
	EditorElement,
	Animation,
	TimeFrame,
	VideoEditorElement,
	AudioEditorElement,
	Placement,
	ImageEditorElement,
	Effect,
	TextEditorElement,
} from "@/types/change/fabric-types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { CoverImage, CoverVideo, FabricUtils } from "@/lib/change/fabric-utils";
import {
	getUid,
	isHtmlAudioElement,
	isHtmlImageElement,
	isHtmlVideoElement,
} from "@/lib/change";

export class Store {
	canvas: fabric.Canvas | null;

	backgroundColor: string;

	selectedMenuOption: MenuOption;
	audios: string[];
	videos: string[];
	images: string[];
	editorElements: EditorElement[];
	selectedElement: EditorElement | null;

	maxTime: number;
	animations: Animation[];
	animationTimeLine: anime.AnimeTimelineInstance | any;
	playing: boolean;

	currentKeyFrame: number;
	fps: number;

	possibleVideoFormats: string[] = ["mp4", "webm"];
	selectedVideoFormat: "mp4" | "webm";

	constructor() {
		this.canvas = null;
		this.videos = [];
		this.images = [];
		this.audios = [];
		this.editorElements = [];
		this.backgroundColor = "#111111";
		this.maxTime = 30 * 1000;
		this.playing = false;
		this.currentKeyFrame = 0;
		this.selectedElement = null;
		this.fps = 60;
		this.animations = [];
		this.animationTimeLine =
			typeof window !== "undefined" ? anime.timeline() : null;
		this.selectedMenuOption = "Video";
		this.selectedVideoFormat = "mp4";
		makeAutoObservable(this);
	}

	get currentTimeInMs() {
		return (this.currentKeyFrame * 1000) / this.fps;
	}

	setCurrentTimeInMs(time: number) {
		this.currentKeyFrame = Math.floor((time / 1000) * this.fps);
	}

	setSelectedMenuOption(selectedMenuOption: MenuOption) {
		this.selectedMenuOption = selectedMenuOption;
	}

	setCanvas(canvas: fabric.Canvas | null) {
		this.canvas = canvas;
		if (canvas) {
			canvas.backgroundColor = this.backgroundColor;
		}
	}

	setBackgroundColor(backgroundColor: string) {
		this.backgroundColor = backgroundColor;
		if (this.canvas) {
			this.canvas.backgroundColor = backgroundColor;
		}
	}

	updateEffect(id: string, effect: Effect) {
		const index = this.editorElements.findIndex(
			(element) => element.id === id
		);
		const element = this.editorElements[index];
		if (isEditorVideoElement(element) || isEditorImageElement(element)) {
			element.properties.effect = effect;
		}
		this.refreshElements();
	}

	setVideos(videos: string[]) {
		this.videos = videos;
	}

	addVideoResource(video: string) {
		this.videos = [...this.videos, video];
	}
	addAudioResource(audio: string) {
		this.audios = [...this.audios, audio];
	}
	addImageResource(image: string) {
		this.images = [...this.images, image];
	}

	addAnimation(animation: Animation) {
		this.animations = [...this.animations, animation];
		this.refreshAnimations();
	}
	updateAnimation(id: string, animation: Animation) {
		const index = this.animations.findIndex((a) => a.id === id);
		this.animations[index] = animation;
		this.refreshAnimations();
	}

	refreshAnimations() {
		anime.remove(this.animationTimeLine);
		this.animationTimeLine = anime.timeline({
			duration: this.maxTime,
			autoplay: false,
		});
		for (let i = 0; i < this.animations.length; i++) {
			const animation = this.animations[i];
			const editorElement = this.editorElements.find(
				(element) => element.id === animation.targetId
			);
			const fabricObject = editorElement?.fabricObject;
			if (!editorElement || !fabricObject) {
				continue;
			}
			fabricObject.clipPath = undefined;
			switch (animation.type) {
				case "fadeIn": {
					this.animationTimeLine.add(
						{
							opacity: [0, 1],
							duration: animation.duration,
							targets: fabricObject,
							easing: "linear",
						},
						editorElement.timeFrame.start
					);
					break;
				}
				case "fadeOut": {
					this.animationTimeLine.add(
						{
							opacity: [1, 0],
							duration: animation.duration,
							targets: fabricObject,
							easing: "linear",
						},
						editorElement.timeFrame.end - animation.duration
					);
					break;
				}
				case "slideIn": {
					const direction = animation.properties.direction;
					const targetPosition = {
						left: editorElement.placement.x,
						top: editorElement.placement.y,
					};
					const startPosition = {
						left:
							direction === "left"
								? -editorElement.placement.width
								: direction === "right"
									? this.canvas?.width
									: editorElement.placement.x,
						top:
							direction === "top"
								? -editorElement.placement.height
								: direction === "bottom"
									? this.canvas?.height
									: editorElement.placement.y,
					};
					if (animation.properties.useClipPath) {
						const clipRectangle = FabricUtils.getClipMaskRect(
							editorElement,
							50
						);
						fabricObject.set("clipPath", clipRectangle);
					}
					if (
						editorElement.type === "text" &&
						animation.properties.textType === "character"
					) {
						this.canvas?.remove(
							...editorElement.properties.splittedTexts
						);
						editorElement.properties.splittedTexts =
							getTextObjectsPartitionedByCharacters(
								editorElement.fabricObject,
								editorElement
							);
						editorElement.properties.splittedTexts.forEach(
							(textObject) => {
								this.canvas!.add(textObject);
							}
						);
						const duration = animation.duration / 2;
						const delay =
							duration /
							editorElement.properties.splittedTexts.length;
						for (
							let i = 0;
							i < editorElement.properties.splittedTexts.length;
							i++
						) {
							const splittedText =
								editorElement.properties.splittedTexts[i];
							const offset = {
								left:
									splittedText.left! -
									editorElement.placement.x,
								top:
									splittedText.top! -
									editorElement.placement.y,
							};
							this.animationTimeLine.add(
								{
									left: [
										startPosition.left! + offset.left,
										targetPosition.left + offset.left,
									],
									top: [
										startPosition.top! + offset.top,
										targetPosition.top + offset.top,
									],
									delay: i * delay,
									duration: duration,
									targets: splittedText,
								},
								editorElement.timeFrame.start
							);
						}
						this.animationTimeLine.add(
							{
								opacity: [1, 0],
								duration: 1,
								targets: fabricObject,
								easing: "linear",
							},
							editorElement.timeFrame.start
						);
						this.animationTimeLine.add(
							{
								opacity: [0, 1],
								duration: 1,
								targets: fabricObject,
								easing: "linear",
							},
							editorElement.timeFrame.start + animation.duration
						);

						this.animationTimeLine.add(
							{
								opacity: [0, 1],
								duration: 1,
								targets: editorElement.properties.splittedTexts,
								easing: "linear",
							},
							editorElement.timeFrame.start
						);
						this.animationTimeLine.add(
							{
								opacity: [1, 0],
								duration: 1,
								targets: editorElement.properties.splittedTexts,
								easing: "linear",
							},
							editorElement.timeFrame.start + animation.duration
						);
					}
					this.animationTimeLine.add(
						{
							left: [startPosition.left, targetPosition.left],
							top: [startPosition.top, targetPosition.top],
							duration: animation.duration,
							targets: fabricObject,
							easing: "linear",
						},
						editorElement.timeFrame.start
					);
					break;
				}
				case "slideOut": {
					const direction = animation.properties.direction;
					const startPosition = {
						left: editorElement.placement.x,
						top: editorElement.placement.y,
					};
					const targetPosition = {
						left:
							direction === "left"
								? -editorElement.placement.width
								: direction === "right"
									? this.canvas?.width
									: editorElement.placement.x,
						top:
							direction === "top"
								? -100 - editorElement.placement.height
								: direction === "bottom"
									? this.canvas?.height
									: editorElement.placement.y,
					};
					if (animation.properties.useClipPath) {
						const clipRectangle = FabricUtils.getClipMaskRect(
							editorElement,
							50
						);
						fabricObject.set("clipPath", clipRectangle);
					}
					this.animationTimeLine.add(
						{
							left: [startPosition.left, targetPosition.left],
							top: [startPosition.top, targetPosition.top],
							duration: animation.duration,
							targets: fabricObject,
							easing: "linear",
						},
						editorElement.timeFrame.end - animation.duration
					);
					break;
				}
				case "breathe": {
					const itsSlideInAnimation = this.animations.find(
						(a) =>
							a.targetId === animation.targetId &&
							a.type === "slideIn"
					);
					const itsSlideOutAnimation = this.animations.find(
						(a) =>
							a.targetId === animation.targetId &&
							a.type === "slideOut"
					);
					const timeEndOfSlideIn = itsSlideInAnimation
						? editorElement.timeFrame.start +
							itsSlideInAnimation.duration
						: editorElement.timeFrame.start;
					const timeStartOfSlideOut = itsSlideOutAnimation
						? editorElement.timeFrame.end -
							itsSlideOutAnimation.duration
						: editorElement.timeFrame.end;
					if (timeEndOfSlideIn > timeStartOfSlideOut) {
						continue;
					}
					const duration = timeStartOfSlideOut - timeEndOfSlideIn;
					const easeFactor = 4;
					const suitableTimeForHeartbeat =
						((1000 * 60) / 72) * easeFactor;
					const upScale = 1.05;
					const currentScaleX = fabricObject.scaleX ?? 1;
					const currentScaleY = fabricObject.scaleY ?? 1;
					const finalScaleX = currentScaleX * upScale;
					const finalScaleY = currentScaleY * upScale;
					const totalHeartbeats = Math.floor(
						duration / suitableTimeForHeartbeat
					);
					if (totalHeartbeats < 1) {
						continue;
					}
					const keyframes: { scaleX: number; scaleY: number }[] = [];
					for (let i = 0; i < totalHeartbeats; i++) {
						keyframes.push({
							scaleX: finalScaleX,
							scaleY: finalScaleY,
						});
						keyframes.push({
							scaleX: currentScaleX,
							scaleY: currentScaleY,
						});
					}

					this.animationTimeLine.add(
						{
							duration: duration,
							targets: fabricObject,
							keyframes,
							easing: "linear",
							loop: true,
						},
						timeEndOfSlideIn
					);

					break;
				}
			}
		}
	}

	removeAnimation(id: string) {
		this.animations = this.animations.filter(
			(animation) => animation.id !== id
		);
		this.refreshAnimations();
	}

	setSelectedElement(selectedElement: EditorElement | null) {
		this.selectedElement = selectedElement;
		if (this.canvas) {
			if (selectedElement?.fabricObject)
				this.canvas.setActiveObject(selectedElement.fabricObject);
			else this.canvas.discardActiveObject();
		}
	}
	updateSelectedElement() {
		this.selectedElement =
			this.editorElements.find(
				(element) => element.id === this.selectedElement?.id
			) ?? null;
	}

	setEditorElements(editorElements: EditorElement[]) {
		this.editorElements = editorElements;
		this.updateSelectedElement();
		this.refreshElements();
		// this.refreshAnimations();
	}

	updateEditorElement(editorElement: EditorElement) {
		this.setEditorElements(
			this.editorElements.map((element) =>
				element.id === editorElement.id ? editorElement : element
			)
		);
	}

	updateEditorElementTimeFrame(
		editorElement: EditorElement,
		timeFrame: Partial<TimeFrame>
	) {
		if (timeFrame.start != undefined && timeFrame.start < 0) {
			timeFrame.start = 0;
		}
		if (timeFrame.end != undefined && timeFrame.end > this.maxTime) {
			timeFrame.end = this.maxTime;
		}
		const newEditorElement = {
			...editorElement,
			timeFrame: {
				...editorElement.timeFrame,
				...timeFrame,
			},
		};
		this.updateVideoElements();
		this.updateAudioElements();
		this.updateEditorElement(newEditorElement);
		this.refreshAnimations();
	}

	addEditorElement(editorElement: EditorElement) {
		this.setEditorElements([...this.editorElements, editorElement]);
		this.refreshElements();
		this.setSelectedElement(
			this.editorElements[this.editorElements.length - 1]
		);
	}

	removeEditorElement(id: string) {
		this.setEditorElements(
			this.editorElements.filter(
				(editorElement) => editorElement.id !== id
			)
		);
		this.refreshElements();
	}

	setMaxTime(maxTime: number) {
		this.maxTime = maxTime;
	}

	setPlaying(playing: boolean) {
		this.playing = playing;
		this.updateVideoElements();
		this.updateAudioElements();
		if (playing) {
			this.startedTime = Date.now();
			this.startedTimePlay = this.currentTimeInMs;
			requestAnimationFrame(() => {
				this.playFrames();
			});
		}
	}

	startedTime = 0;
	startedTimePlay = 0;

	playFrames() {
		if (!this.playing) {
			return;
		}
		const elapsedTime = Date.now() - this.startedTime;
		const newTime = this.startedTimePlay + elapsedTime;
		this.updateTimeTo(newTime);
		if (newTime > this.maxTime) {
			this.currentKeyFrame = 0;
			this.setPlaying(false);
		} else {
			requestAnimationFrame(() => {
				this.playFrames();
			});
		}
	}
	updateTimeTo(newTime: number) {
		this.setCurrentTimeInMs(newTime);
		this.animationTimeLine.seek(newTime);
		if (this.canvas) {
			this.canvas.backgroundColor = this.backgroundColor;
		}
		this.editorElements.forEach((e) => {
			if (!e.fabricObject) return;
			const isInside =
				e.timeFrame.start <= newTime && newTime <= e.timeFrame.end;
			e.fabricObject.visible = isInside;
		});
	}

	handleSeek(seek: number) {
		if (this.playing) {
			this.setPlaying(false);
		}
		this.updateTimeTo(seek);
		this.updateVideoElements();
		this.updateAudioElements();
	}

	addVideo(index: number) {
		const videoElement = document.getElementById(`video-${index}`);
		if (!isHtmlVideoElement(videoElement)) {
			return;
		}
		const videoDurationMs = videoElement.duration * 1000;
		const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
		const id = getUid();
		this.addEditorElement({
			id,
			name: `Media(video) ${index + 1}`,
			type: "video",
			placement: {
				x: 0,
				y: 0,
				width: 100 * aspectRatio,
				height: 100,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
			},
			timeFrame: {
				start: 0,
				end: videoDurationMs,
			},
			properties: {
				elementId: `video-${id}`,
				src: videoElement.src,
				effect: {
					type: "none",
				},
			},
		});
	}

	addImage(index: number) {
		const imageElement = document.getElementById(`image-${index}`);
		if (!isHtmlImageElement(imageElement)) {
			return;
		}
		const aspectRatio =
			imageElement.naturalWidth / imageElement.naturalHeight;
		const id = getUid();
		this.addEditorElement({
			id,
			name: `Media(image) ${index + 1}`,
			type: "image",
			placement: {
				x: 0,
				y: 0,
				width: 100 * aspectRatio,
				height: 100,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
			},
			timeFrame: {
				start: 0,
				end: this.maxTime,
			},
			properties: {
				elementId: `image-${id}`,
				src: imageElement.src,
				effect: {
					type: "none",
				},
			},
		});
	}

	addAudio(index: number) {
		const audioElement = document.getElementById(`audio-${index}`);
		if (!isHtmlAudioElement(audioElement)) {
			return;
		}
		const audioDurationMs = audioElement.duration * 1000;
		const id = getUid();
		this.addEditorElement({
			id,
			name: `Media(audio) ${index + 1}`,
			type: "audio",
			placement: {
				x: 0,
				y: 0,
				width: 100,
				height: 100,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
			},
			timeFrame: {
				start: 0,
				end: audioDurationMs,
			},
			properties: {
				elementId: `audio-${id}`,
				src: audioElement.src,
			},
		});
	}
	addText(options: { text: string; fontSize: number; fontWeight: number }) {
		const id = getUid();
		const index = this.editorElements.length;
		this.addEditorElement({
			id,
			name: `Text ${index + 1}`,
			type: "text",
			placement: {
				x: 0,
				y: 0,
				width: 100,
				height: 100,
				rotation: 0,
				scaleX: 1,
				scaleY: 1,
			},
			timeFrame: {
				start: 0,
				end: this.maxTime,
			},
			properties: {
				text: options.text,
				fontSize: options.fontSize,
				fontWeight: options.fontWeight,
				splittedTexts: [],
			},
		});
	}

	updateVideoElements() {
		this.editorElements
			.filter(
				(element): element is VideoEditorElement =>
					element.type === "video"
			)
			.forEach((element) => {
				const video = document.getElementById(
					element.properties.elementId
				) as HTMLVideoElement | null;
				if (video) {
					const videoTime =
						(this.currentTimeInMs - element.timeFrame.start) / 1000;
					video.currentTime = videoTime;
					if (this.playing) {
						video.play();
					} else {
						video.pause();
					}
				}
			});
	}
	updateAudioElements() {
		this.editorElements
			.filter(
				(element): element is AudioEditorElement =>
					element.type === "audio"
			)
			.forEach((element) => {
				const audio = document.getElementById(
					element.properties.elementId
				) as HTMLAudioElement | null;
				if (audio) {
					const audioTime =
						(this.currentTimeInMs - element.timeFrame.start) / 1000;
					audio.currentTime = audioTime;
					if (this.playing) {
						audio.play();
					} else {
						audio.pause();
					}
				}
			});
	}
	// saveCanvasToVideo() {
	//   const video = document.createElement("video");
	//   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
	//   const stream = canvas.captureStream();
	//   video.srcObject = stream;
	//   video.play();
	//   const mediaRecorder = new MediaRecorder(stream);
	//   const chunks: Blob[] = [];
	//   mediaRecorder.ondataavailable = function (e) {
	//     console.log("data available");
	//     console.log(e.data);
	//     chunks.push(e.data);
	//   };
	//   mediaRecorder.onstop = function (e) {
	//     const blob = new Blob(chunks, { type: "video/webm" });
	//     const url = URL.createObjectURL(blob);
	//     const a = document.createElement("a");
	//     a.href = url;
	//     a.download = "video.webm";
	//     a.click();
	//   };
	//   mediaRecorder.start();
	//   setTimeout(() => {
	//     mediaRecorder.stop();
	//   }, this.maxTime);

	// }

	setVideoFormat(format: "mp4" | "webm") {
		this.selectedVideoFormat = format;
	}

	saveCanvasToVideoWithAudio() {
		this.saveCanvasToVideoWithAudioWebmMp4();
	}

	saveCanvasToVideoWithAudioWebmMp4() {
		console.log("modified");
		const mp4 = this.selectedVideoFormat === "mp4";
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		const stream = canvas.captureStream(30);
		const audioElements = this.editorElements.filter(isEditorAudioElement);
		const audioStreams: MediaStream[] = [];
		audioElements.forEach((audio) => {
			const audioElement = document.getElementById(
				audio.properties.elementId
			) as HTMLAudioElement | null;
			if (audioElement) {
				const ctx = new AudioContext();
				const sourceNode = ctx.createMediaElementSource(audioElement);
				const dest = ctx.createMediaStreamDestination();
				sourceNode.connect(dest);
				sourceNode.connect(ctx.destination);
				audioStreams.push(dest.stream);
			}
		});
		audioStreams.forEach((audioStream) => {
			stream.addTrack(audioStream.getAudioTracks()[0]);
		});
		const video = document.createElement("video");
		video.srcObject = stream;
		video.height = 500;
		video.width = 800;
		// video.controls = true;
		// document.body.appendChild(video);
		video.play().then(() => {
			const mediaRecorder = new MediaRecorder(stream);
			const chunks: Blob[] = [];
			mediaRecorder.ondataavailable = (e) => {
				chunks.push(e.data);
				console.log("data available");
			};
			mediaRecorder.onstop = async () => {
				const blob = new Blob(chunks, { type: "video/webm" });

				if (mp4) {
					// Use FFmpeg to convert WebM to MP4
					const data = new Uint8Array(await blob.arrayBuffer());
					const ffmpeg = new FFmpeg();
					const baseURL =
						"https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
					await ffmpeg.load({
						coreURL: await toBlobURL(
							`${baseURL}/ffmpeg-core.js`,
							"text/javascript"
						),
						wasmURL: await toBlobURL(
							`${baseURL}/ffmpeg-core.wasm`,
							"application/wasm"
						),
						// workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
					});
					await ffmpeg.writeFile("video.webm", data);
					await ffmpeg.exec([
						"-y",
						"-i",
						"video.webm",
						"-c",
						"copy",
						"video.mp4",
					]);

					const output = await ffmpeg.readFile("video.mp4");
					const outputBlob = new Blob([output], {
						type: "video/mp4",
					});
					const outputUrl = URL.createObjectURL(outputBlob);
					const a = document.createElement("a");
					a.download = "video.mp4";
					a.href = outputUrl;
					a.click();
				} else {
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = "video.webm";
					a.click();
				}
			};
			mediaRecorder.start();
			setTimeout(() => {
				mediaRecorder.stop();
			}, this.maxTime);
			video.remove();
		});
	}

	refreshElements() {
		if (!this.canvas) return;
		const canvas = this.canvas;
		canvas.remove(...canvas.getObjects());
		for (let index = 0; index < this.editorElements.length; index++) {
			const element = this.editorElements[index];
			switch (element.type) {
				case "video": {
					console.log("elementid", element.properties.elementId);
					if (
						document.getElementById(element.properties.elementId) ==
						null
					)
						continue;
					const videoElement = document.getElementById(
						element.properties.elementId
					) as HTMLVideoElement | null;
					if (!videoElement) continue;

					const videoObject = new CoverVideo(videoElement, {
						type: "coverVideo", // Include 'type' property
						name: element.id,
						left: element.placement.x,
						top: element.placement.y,
						width: element.placement.width,
						height: element.placement.height,
						scaleX: element.placement.scaleX,
						scaleY: element.placement.scaleY,
						angle: element.placement.rotation,
						objectCaching: false,
						selectable: true,
						lockUniScaling: true,
						customFilter: element.properties.effect.type,
					});

					element.fabricObject = videoObject;
					element.properties.imageObject = videoObject;
					videoElement.width = 100;
					videoElement.height =
						(videoElement.videoHeight * 100) /
						videoElement.videoWidth;
					canvas.add(videoObject);
					canvas.on("object:modified", (e) => {
						if (!e.target) return;
						const target = e.target;
						if (target !== videoObject) return;
						const placement = element.placement;
						const newPlacement: Placement = {
							...placement,
							x: target.left ?? placement.x,
							y: target.top ?? placement.y,
							rotation: target.angle ?? placement.rotation,
							width:
								target.width && target.scaleX
									? target.width * target.scaleX
									: placement.width,
							height:
								target.height && target.scaleY
									? target.height * target.scaleY
									: placement.height,
							scaleX: 1,
							scaleY: 1,
						};
						const newElement = {
							...element,
							placement: newPlacement,
						};
						this.updateEditorElement(newElement);
					});
					break;
				}
				case "image": {
					if (
						document.getElementById(element.properties.elementId) ==
						null
					)
						continue;
					const imageElement = document.getElementById(
						element.properties.elementId
					) as HTMLImageElement | null;
					if (!imageElement) continue;

					const imageObject = new CoverImage(imageElement, {
						type: "coverImage", // Add this line
						name: element.id,
						left: element.placement.x,
						top: element.placement.y,
						width: element.placement.width,
						height: element.placement.height,
						scaleX: element.placement.scaleX,
						scaleY: element.placement.scaleY,
						angle: element.placement.rotation,
						objectCaching: false,
						selectable: true,
						lockUniScaling: true,
						customFilter: element.properties.effect.type,
					});

					element.fabricObject = imageObject;
					element.properties.imageObject = imageObject;
					const image = {
						w: imageElement.naturalWidth,
						h: imageElement.naturalHeight,
					};

					imageObject.width = image.w;
					imageObject.height = image.h;
					imageElement.width = image.w;
					imageElement.height = image.h;
					imageObject.scaleToHeight(image.w);
					imageObject.scaleToWidth(image.h);
					const toScale = {
						x: element.placement.width / image.w,
						y: element.placement.height / image.h,
					};
					imageObject.scaleX = toScale.x * element.placement.scaleX;
					imageObject.scaleY = toScale.y * element.placement.scaleY;
					canvas.add(imageObject);
					canvas.on("object:modified", (e) => {
						if (!e.target) return;
						const target = e.target;
						if (target !== imageObject) return;
						const placement = element.placement;
						let finalScale = 1;
						if (target.scaleX && target.scaleX > 0) {
							finalScale = target.scaleX / toScale.x;
						}
						const newPlacement: Placement = {
							...placement,
							x: target.left ?? placement.x,
							y: target.top ?? placement.y,
							rotation: target.angle ?? placement.rotation,
							scaleX: finalScale,
							scaleY: finalScale,
						};
						const newElement = {
							...element,
							placement: newPlacement,
						};
						this.updateEditorElement(newElement);
					});
					break;
				}
				case "audio": {
					// Audio elements are handled separately and don't need to be added to the canvas
					break;
				}
				case "text": {
					const textObject = new fabric.Textbox(
						element.properties.text,
						{
							name: element.id,
							left: element.placement.x,
							top: element.placement.y,
							scaleX: element.placement.scaleX,
							scaleY: element.placement.scaleY,
							width: element.placement.width,
							height: element.placement.height,
							angle: element.placement.rotation,
							fontSize: element.properties.fontSize,
							fontWeight: element.properties.fontWeight,
							objectCaching: false,
							selectable: true,
							lockUniScaling: true,
							fill: "#ffffff",
						}
					);
					element.fabricObject = textObject;
					canvas.add(textObject);
					canvas.on("object:modified", (e) => {
						if (!e.target) return;
						const target = e.target;
						if (target !== textObject) return;
						const placement = element.placement;
						const newPlacement: Placement = {
							...placement,
							x: target.left ?? placement.x,
							y: target.top ?? placement.y,
							rotation: target.angle ?? placement.rotation,
							width: target.width ?? placement.width,
							height: target.height ?? placement.height,
							scaleX: target.scaleX ?? placement.scaleX,
							scaleY: target.scaleY ?? placement.scaleY,
						};
						const newElement = {
							...element,
							placement: newPlacement,
							properties: {
								...element.properties,
								text: (target as fabric.Textbox).text || "",
							},
						};
						this.updateEditorElement(newElement);
					});
					break;
				}
				default: {
					throw new Error("Not implemented");
				}
			}
			if (element.fabricObject) {
				element.fabricObject.on("selected", (e: any) => {
					this.setSelectedElement(element);
				});
			}
		}
		const selectedEditorElement = this.selectedElement;
		if (selectedEditorElement && selectedEditorElement.fabricObject) {
			canvas.setActiveObject(selectedEditorElement.fabricObject);
		}
		this.refreshAnimations();
		this.updateTimeTo(this.currentTimeInMs);
		canvas.renderAll();
	}
}

export function isEditorAudioElement(
	element: EditorElement
): element is AudioEditorElement {
	return element.type === "audio";
}
export function isEditorVideoElement(
	element: EditorElement
): element is VideoEditorElement {
	return element.type === "video";
}

export function isEditorImageElement(
	element: EditorElement
): element is ImageEditorElement {
	return element.type === "image";
}

function getTextObjectsPartitionedByCharacters(
	textObject: any,
	element: TextEditorElement
): any[] {
	const copyCharsObjects: any[] = [];
	// Replace all line endings with blank
	const characters = (textObject.text ?? "")
		.split("")
		.filter((m: string) => m !== "\n");
	const charObjects = textObject.__charBounds;
	if (!charObjects) return [];
	const charObjectFixed = charObjects
		.map((m: any, index: number) =>
			m.slice(0, m.length - 1).map((m: any) => ({ m, index }))
		)
		.flat();
	const lineHeight = textObject.getHeightOfLine(0);
	for (let i = 0; i < characters.length; i++) {
		if (!charObjectFixed[i]) continue;
		const { m: charObject, index: lineIndex } = charObjectFixed[i];
		const char = characters[i];
		const scaleX = textObject.scaleX ?? 1;
		const scaleY = textObject.scaleY ?? 1;
		const charTextObject = new fabric.Text(char, {
			left: charObject.left * scaleX + element.placement.x,
			scaleX: scaleX,
			scaleY: scaleY,
			top: lineIndex * lineHeight * scaleY + element.placement.y,
			fontSize: textObject.fontSize,
			fontWeight: textObject.fontWeight,
			fill: "#fff",
		});
		copyCharsObjects.push(charTextObject);
	}
	return copyCharsObjects;
}

// import { makeAutoObservable } from "mobx";
// import * as fabric from "fabric";
// import anime from "animejs";
// import {
// 	MenuOption,
// 	EditorElement,
// 	Animation,
// 	TimeFrame,
// 	VideoEditorElement,
// 	AudioEditorElement,
// 	Placement,
// 	ImageEditorElement,
// 	Effect,
// 	TextEditorElement,
// 	SlideDirection,
// 	SlideTextType,
// } from "@/types/change/fabric-types";
// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { toBlobURL } from "@ffmpeg/util";
// import { CoverImage, CoverVideo, FabricUtils } from "@/lib/change/fabric-utils";
// import {
// 	getUid,
// 	isHtmlAudioElement,
// 	isHtmlImageElement,
// 	isHtmlVideoElement,
// } from "@/lib/change";

// export class Store {
// 	private canvas: fabric.Canvas | null = null;
// 	private backgroundColor: string = "#111111";
// 	public selectedMenuOption: MenuOption = "Video";
// 	public audios: string[] = [];
// 	public videos: string[] = [];
// 	public images: string[] = [];
// 	private _editorElements: EditorElement[] = [];
// 	public selectedElement: EditorElement | null = null;
// 	public maxTime: number = 30 * 1000;
// 	private animations: Animation[] = [];
// 	private animationTimeLine: anime.AnimeTimelineInstance | null = null;
// 	private playing: boolean = false;
// 	private currentKeyFrame: number = 0;
// 	private fps: number = 60;
// 	public possibleVideoFormats: string[] = ["mp4", "webm"];
// 	public selectedVideoFormat: "mp4" | "webm" = "mp4";
// 	private startedTime: number = 0;
// 	private startedTimePlay: number = 0;

// 	constructor() {
// 		makeAutoObservable(
// 			this,
// 			{},
// 			{
// 				deep: false,
// 				autoBind: true,
// 			}
// 		);

// 		if (typeof window !== "undefined") {
// 			this.animationTimeLine = anime.timeline();
// 		}
// 	}

// 	get editorElements(): EditorElement[] {
// 		return this._editorElements;
// 	}

// 	get currentTimeInMs(): number {
// 		return (this.currentKeyFrame * 1000) / this.fps;
// 	}

// 	public setCurrentTimeInMs(time: number): void {
// 		this.currentKeyFrame = Math.floor((time / 1000) * this.fps);
// 	}

// 	public setSelectedMenuOption(selectedMenuOption: MenuOption): void {
// 		this.selectedMenuOption = selectedMenuOption;
// 	}

// 	public setCanvas(canvas: fabric.Canvas | null): void {
// 		this.canvas = canvas;
// 		if (canvas) {
// 			canvas.backgroundColor = this.backgroundColor;
// 		}
// 	}

// 	public setBackgroundColor(backgroundColor: string): void {
// 		this.backgroundColor = backgroundColor;
// 		if (this.canvas) {
// 			this.canvas.backgroundColor = backgroundColor;
// 			this.canvas.renderAll();
// 		}
// 	}

// 	public updateEffect(id: string, effect: Effect): void {
// 		const element = this._editorElements.find(
// 			(element) => element.id === id
// 		);
// 		if (!element) return;

// 		if (isEditorVideoElement(element) || isEditorImageElement(element)) {
// 			element.properties.effect = effect;
// 			this.refreshElements();
// 		}
// 	}

// 	public addAnimation(animation: Animation): void {
// 		this.animations = [...this.animations, animation];
// 		this.refreshAnimations();
// 	}

// 	public updateAnimation(id: string, animation: Animation): void {
// 		const index = this.animations.findIndex((a) => a.id === id);
// 		if (index === -1) return;

// 		const updatedAnimations = [...this.animations];
// 		updatedAnimations[index] = animation;
// 		this.animations = updatedAnimations;
// 		this.refreshAnimations();
// 	}

// 	public removeAnimation(id: string): void {
// 		this.animations = this.animations.filter(
// 			(animation) => animation.id !== id
// 		);
// 		this.refreshAnimations();
// 	}

// 	private refreshAnimations(): void {
// 		if (!this.animationTimeLine) return;

// 		anime.remove(this.animationTimeLine);
// 		this.animationTimeLine = anime.timeline({
// 			duration: this.maxTime,
// 			autoplay: false,
// 		});

// 		this.animations.forEach((animation) => {
// 			const editorElement = this._editorElements.find(
// 				(element) => element.id === animation.targetId
// 			);
// 			const fabricObject = editorElement?.fabricObject;

// 			if (!editorElement || !fabricObject) return;

// 			fabricObject.clipPath = undefined;

// 			switch (animation.type) {
// 				case "fadeIn":
// 					this.addFadeInAnimation(
// 						animation,
// 						fabricObject,
// 						editorElement
// 					);
// 					break;
// 				case "fadeOut":
// 					this.addFadeOutAnimation(
// 						animation,
// 						fabricObject,
// 						editorElement
// 					);
// 					break;
// 				case "slideIn":
// 					this.addSlideInAnimation(
// 						animation,
// 						fabricObject,
// 						editorElement
// 					);
// 					break;
// 				case "slideOut":
// 					this.addSlideOutAnimation(
// 						animation,
// 						fabricObject,
// 						editorElement
// 					);
// 					break;
// 				case "breathe":
// 					this.addBreatheAnimation(
// 						animation,
// 						fabricObject,
// 						editorElement
// 					);
// 					break;
// 			}
// 		});
// 	}

// 	private addFadeInAnimation(
// 		animation: Animation,
// 		fabricObject: fabric.Object,
// 		editorElement: EditorElement
// 	): void {
// 		this.animationTimeLine?.add(
// 			{
// 				opacity: [0, 1],
// 				duration: animation.duration,
// 				targets: fabricObject,
// 				easing: "linear",
// 			},
// 			editorElement.timeFrame.start
// 		);
// 	}

// 	private addFadeOutAnimation(
// 		animation: Animation,
// 		fabricObject: fabric.Object,
// 		editorElement: EditorElement
// 	): void {
// 		this.animationTimeLine?.add(
// 			{
// 				opacity: [1, 0],
// 				duration: animation.duration,
// 				targets: fabricObject,
// 				easing: "linear",
// 			},
// 			editorElement.timeFrame.end - animation.duration
// 		);
// 	}

// 	private addSlideInAnimation(
// 		animation: Animation,
// 		fabricObject: fabric.Object,
// 		editorElement: EditorElement
// 	): void {
// 		if (!animation.properties || !("direction" in animation.properties))
// 			return;

// 		const direction = animation.properties.direction as SlideDirection;
// 		const targetPosition = {
// 			left: editorElement.placement.x,
// 			top: editorElement.placement.y,
// 		};

// 		const startPosition = {
// 			left:
// 				direction === "left"
// 					? -editorElement.placement.width
// 					: direction === "right"
// 						? this.canvas?.width
// 						: editorElement.placement.x,
// 			top:
// 				direction === "top"
// 					? -editorElement.placement.height
// 					: direction === "bottom"
// 						? this.canvas?.height
// 						: editorElement.placement.y,
// 		};

// 		if (
// 			"useClipPath" in animation.properties &&
// 			animation.properties.useClipPath
// 		) {
// 			const clipRectangle = FabricUtils.getClipMaskRect(
// 				editorElement,
// 				50
// 			);
// 			fabricObject.set("clipPath", clipRectangle);
// 		}

// 		if (
// 			editorElement.type === "text" &&
// 			"textType" in animation.properties &&
// 			animation.properties.textType === "character"
// 		) {
// 			this.handleTextSlideInAnimation(
// 				editorElement as TextEditorElement,
// 				animation,
// 				startPosition,
// 				targetPosition
// 			);
// 		} else {
// 			this.animationTimeLine?.add(
// 				{
// 					left: [startPosition.left, targetPosition.left],
// 					top: [startPosition.top, targetPosition.top],
// 					duration: animation.duration,
// 					targets: fabricObject,
// 					easing: "linear",
// 				},
// 				editorElement.timeFrame.start
// 			);
// 		}
// 	}

// 	private handleTextSlideInAnimation(
// 		editorElement: TextEditorElement,
// 		animation: Animation,
// 		startPosition: { left: number | undefined; top: number | undefined },
// 		targetPosition: { left: number; top: number }
// 	): void {
// 		if (!this.canvas) return;

// 		this.canvas.remove(...editorElement.properties.splittedTexts);

// 		editorElement.properties.splittedTexts =
// 			getTextObjectsPartitionedByCharacters(
// 				editorElement.fabricObject as fabric.Textbox,
// 				editorElement
// 			);

// 		editorElement.properties.splittedTexts.forEach((textObject) => {
// 			this.canvas?.add(textObject);
// 		});

// 		const duration = animation.duration / 2;
// 		const delay = duration / editorElement.properties.splittedTexts.length;

// 		editorElement.properties.splittedTexts.forEach((splittedText, i) => {
// 			const offset = {
// 				left: (splittedText.left || 0) - editorElement.placement.x,
// 				top: (splittedText.top || 0) - editorElement.placement.y,
// 			};

// 			const startLeft = (startPosition.left || 0) + offset.left;
// 			const startTop = (startPosition.top || 0) + offset.top;
// 			const endLeft = targetPosition.left + offset.left;
// 			const endTop = targetPosition.top + offset.top;

// 			this.animationTimeLine?.add(
// 				{
// 					left: [startLeft, endLeft],
// 					top: [startTop, endTop],
// 					delay: i * delay,
// 					duration: duration,
// 					targets: splittedText,
// 				},
// 				editorElement.timeFrame.start
// 			);
// 		});

// 		this.handleTextOpacityAnimation(editorElement, animation);
// 	}

// 	private handleTextOpacityAnimation(
// 		editorElement: TextEditorElement,
// 		animation: Animation
// 	): void {
// 		const fabricObject = editorElement.fabricObject;
// 		if (!fabricObject) return;

// 		this.animationTimeLine?.add(
// 			{
// 				opacity: [1, 0],
// 				duration: 1,
// 				targets: fabricObject,
// 				easing: "linear",
// 			},
// 			editorElement.timeFrame.start
// 		);

// 		this.animationTimeLine?.add(
// 			{
// 				opacity: [0, 1],
// 				duration: 1,
// 				targets: fabricObject,
// 				easing: "linear",
// 			},
// 			editorElement.timeFrame.start + animation.duration
// 		);

// 		this.animationTimeLine?.add(
// 			{
// 				opacity: [0, 1],
// 				duration: 1,
// 				targets: editorElement.properties.splittedTexts,
// 				easing: "linear",
// 			},
// 			editorElement.timeFrame.start
// 		);

// 		this.animationTimeLine?.add(
// 			{
// 				opacity: [1, 0],
// 				duration: 1,
// 				targets: editorElement.properties.splittedTexts,
// 				easing: "linear",
// 			},
// 			editorElement.timeFrame.start + animation.duration
// 		);
// 	}

// 	private addSlideOutAnimation(
// 		animation: Animation,
// 		fabricObject: fabric.Object,
// 		editorElement: EditorElement
// 	): void {
// 		if (!animation.properties || !("direction" in animation.properties))
// 			return;

// 		const direction = animation.properties.direction as SlideDirection;
// 		const startPosition = {
// 			left: editorElement.placement.x,
// 			top: editorElement.placement.y,
// 		};

// 		const targetPosition = {
// 			left:
// 				direction === "left"
// 					? -editorElement.placement.width
// 					: direction === "right"
// 						? this.canvas?.width
// 						: editorElement.placement.x,
// 			top:
// 				direction === "top"
// 					? -100 - editorElement.placement.height
// 					: direction === "bottom"
// 						? this.canvas?.height
// 						: editorElement.placement.y,
// 		};

// 		if (
// 			"useClipPath" in animation.properties &&
// 			animation.properties.useClipPath
// 		) {
// 			const clipRectangle = FabricUtils.getClipMaskRect(
// 				editorElement,
// 				50
// 			);
// 			fabricObject.set("clipPath", clipRectangle);
// 		}

// 		this.animationTimeLine?.add(
// 			{
// 				left: [startPosition.left, targetPosition.left],
// 				top: [startPosition.top, targetPosition.top],
// 				duration: animation.duration,
// 				targets: fabricObject,
// 				easing: "linear",
// 			},
// 			editorElement.timeFrame.end - animation.duration
// 		);
// 	}

// 	private addBreatheAnimation(
// 		animation: Animation,
// 		fabricObject: fabric.Object,
// 		editorElement: EditorElement
// 	): void {
// 		const itsSlideInAnimation = this.animations.find(
// 			(a) => a.targetId === animation.targetId && a.type === "slideIn"
// 		);
// 		const itsSlideOutAnimation = this.animations.find(
// 			(a) => a.targetId === animation.targetId && a.type === "slideOut"
// 		);

// 		const timeEndOfSlideIn = itsSlideInAnimation
// 			? editorElement.timeFrame.start + itsSlideInAnimation.duration
// 			: editorElement.timeFrame.start;

// 		const timeStartOfSlideOut = itsSlideOutAnimation
// 			? editorElement.timeFrame.end - itsSlideOutAnimation.duration
// 			: editorElement.timeFrame.end;

// 		if (timeEndOfSlideIn > timeStartOfSlideOut) return;

// 		const duration = timeStartOfSlideOut - timeEndOfSlideIn;
// 		const easeFactor = 4;
// 		const suitableTimeForHeartbeat = ((1000 * 60) / 72) * easeFactor;
// 		const upScale = 1.05;
// 		const currentScaleX = fabricObject.scaleX ?? 1;
// 		const currentScaleY = fabricObject.scaleY ?? 1;
// 		const finalScaleX = currentScaleX * upScale;
// 		const finalScaleY = currentScaleY * upScale;
// 		const totalHeartbeats = Math.floor(duration / suitableTimeForHeartbeat);

// 		if (totalHeartbeats < 1) return;

// 		const keyframes: { scaleX: number; scaleY: number }[] = [];
// 		for (let i = 0; i < totalHeartbeats; i++) {
// 			keyframes.push({
// 				scaleX: finalScaleX,
// 				scaleY: finalScaleY,
// 			});
// 			keyframes.push({
// 				scaleX: currentScaleX,
// 				scaleY: currentScaleY,
// 			});
// 		}

// 		this.animationTimeLine?.add(
// 			{
// 				duration: duration,
// 				targets: fabricObject,
// 				keyframes,
// 				easing: "linear",
// 				loop: true,
// 			},
// 			timeEndOfSlideIn
// 		);
// 	}

// 	public setEditorElements(elements: EditorElement[]): void {
// 		this._editorElements = [...elements];
// 		this.updateSelectedElement();
// 		this.refreshElements();
// 	}

// 	public updateSelectedElement(): void {
// 		if (!this.selectedElement) return;

// 		this.selectedElement =
// 			this._editorElements.find(
// 				(element) => element.id === this.selectedElement?.id
// 			) ?? null;
// 	}

// 	public setSelectedElement(element: EditorElement | null): void {
// 		this.selectedElement = element;
// 		if (!this.canvas) return;

// 		if (element?.fabricObject) {
// 			this.canvas.setActiveObject(element.fabricObject);
// 		} else {
// 			this.canvas.discardActiveObject();
// 		}
// 		this.canvas.renderAll();
// 	}

// 	private addEditorElement(
// 		element:
// 			| VideoEditorElement
// 			| ImageEditorElement
// 			| AudioEditorElement
// 			| TextEditorElement
// 	): void {
// 		this._editorElements = [...this._editorElements, element];
// 		this.refreshElements();
// 		this.setSelectedElement(
// 			this._editorElements[this._editorElements.length - 1]
// 		);
// 	}

// 	public updateEditorElement(updatedElement: EditorElement): void {
// 		this._editorElements = this._editorElements.map((element) =>
// 			element.id === updatedElement.id ? updatedElement : element
// 		);
// 		this.refreshElements();
// 	}

// 	public updateEditorElementTimeFrame(
// 		element: EditorElement,
// 		timeFrame: Partial<TimeFrame>
// 	): void {
// 		const start = Math.max(0, timeFrame.start ?? element.timeFrame.start);
// 		const end = Math.min(
// 			this.maxTime,
// 			timeFrame.end ?? element.timeFrame.end
// 		);

// 		const updatedElement = {
// 			...element,
// 			timeFrame: {
// 				...element.timeFrame,
// 				start,
// 				end,
// 			},
// 		};

// 		this.updateVideoElements();
// 		this.updateAudioElements();
// 		this.updateEditorElement(updatedElement);
// 		this.refreshAnimations();
// 	}

// 	public removeEditorElement(id: string): void {
// 		this._editorElements = this._editorElements.filter(
// 			(element) => element.id !== id
// 		);
// 		this.refreshElements();
// 	}

// 	public addVideo(index: number): void {
// 		const videoElement = document.getElementById(`video-${index}`);
// 		if (!isHtmlVideoElement(videoElement)) return;

// 		const videoDurationMs = videoElement.duration * 1000;
// 		const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
// 		const id = getUid();

// 		const element: VideoEditorElement = {
// 			id,
// 			name: `Media(video) ${index + 1}`,
// 			type: "video",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100 * aspectRatio,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: videoDurationMs,
// 			},
// 			properties: {
// 				elementId: `video-${id}`,
// 				src: videoElement.src,
// 				effect: {
// 					type: "none",
// 				},
// 			},
// 		};

// 		this.addEditorElement(element);
// 	}

// 	public addImage(index: number): void {
// 		const imageElement = document.getElementById(`image-${index}`);
// 		if (!isHtmlImageElement(imageElement)) return;

// 		const aspectRatio =
// 			imageElement.naturalWidth / imageElement.naturalHeight;
// 		const id = getUid();

// 		const element: ImageEditorElement = {
// 			id,
// 			name: `Media(image) ${index + 1}`,
// 			type: "image",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100 * aspectRatio,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: this.maxTime,
// 			},
// 			properties: {
// 				elementId: `image-${id}`,
// 				src: imageElement.src,
// 				effect: {
// 					type: "none",
// 				},
// 			},
// 		};

// 		this.addEditorElement(element);
// 	}

// 	public addAudio(index: number): void {
// 		const audioElement = document.getElementById(`audio-${index}`);
// 		if (!isHtmlAudioElement(audioElement)) return;

// 		const audioDurationMs = audioElement.duration * 1000;
// 		const id = getUid();

// 		const element: AudioEditorElement = {
// 			id,
// 			name: `Media(audio) ${index + 1}`,
// 			type: "audio",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: audioDurationMs,
// 			},
// 			properties: {
// 				elementId: `audio-${id}`,
// 				src: audioElement.src,
// 			},
// 		};

// 		this.addEditorElement(element);
// 	}

// 	public addText(options: {
// 		text: string;
// 		fontSize: number;
// 		fontWeight: number;
// 	}): void {
// 		const id = getUid();
// 		const index = this._editorElements.length;

// 		const element: TextEditorElement = {
// 			id,
// 			name: `Text ${index + 1}`,
// 			type: "text",
// 			placement: {
// 				x: 0,
// 				y: 0,
// 				width: 100,
// 				height: 100,
// 				rotation: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			},
// 			timeFrame: {
// 				start: 0,
// 				end: this.maxTime,
// 			},
// 			properties: {
// 				text: options.text,
// 				fontSize: options.fontSize,
// 				fontWeight: options.fontWeight,
// 				splittedTexts: [],
// 			},
// 		};

// 		this.addEditorElement(element);
// 	}
// 	private updateVideoElements(): void {
// 		this._editorElements.filter(isEditorVideoElement).forEach((element) => {
// 			const video = document.getElementById(
// 				element.properties.elementId
// 			) as HTMLVideoElement | null;

// 			if (!video) return;

// 			const videoTime =
// 				(this.currentTimeInMs - element.timeFrame.start) / 1000;
// 			video.currentTime = videoTime;

// 			if (this.playing) {
// 				video.play();
// 			} else {
// 				video.pause();
// 			}
// 		});
// 	}

// 	private updateAudioElements(): void {
// 		this._editorElements.filter(isEditorAudioElement).forEach((element) => {
// 			const audio = document.getElementById(
// 				element.properties.elementId
// 			) as HTMLAudioElement | null;

// 			if (!audio) return;

// 			const audioTime =
// 				(this.currentTimeInMs - element.timeFrame.start) / 1000;
// 			audio.currentTime = audioTime;

// 			if (this.playing) {
// 				audio.play();
// 			} else {
// 				audio.pause();
// 			}
// 		});
// 	}

// 	public setMaxTime(maxTime: number): void {
// 		this.maxTime = maxTime;
// 	}

// 	public setVideoFormat(format: "mp4" | "webm"): void {
// 		this.selectedVideoFormat = format;
// 	}

// 	public setPlaying(playing: boolean): void {
// 		this.playing = playing;
// 		this.updateVideoElements();
// 		this.updateAudioElements();

// 		if (playing) {
// 			this.startedTime = Date.now();
// 			this.startedTimePlay = this.currentTimeInMs;
// 			requestAnimationFrame(() => this.playFrames());
// 		}
// 	}

// 	private playFrames(): void {
// 		if (!this.playing) return;

// 		const elapsedTime = Date.now() - this.startedTime;
// 		const newTime = this.startedTimePlay + elapsedTime;
// 		this.updateTimeTo(newTime);

// 		if (newTime > this.maxTime) {
// 			this.currentKeyFrame = 0;
// 			this.setPlaying(false);
// 		} else {
// 			requestAnimationFrame(() => this.playFrames());
// 		}
// 	}

// 	public updateTimeTo(newTime: number): void {
// 		this.setCurrentTimeInMs(newTime);
// 		this.animationTimeLine?.seek(newTime);

// 		if (this.canvas) {
// 			this.canvas.backgroundColor = this.backgroundColor;
// 		}

// 		this._editorElements.forEach((element) => {
// 			if (!element.fabricObject) return;
// 			const isInside =
// 				element.timeFrame.start <= newTime &&
// 				newTime <= element.timeFrame.end;
// 			element.fabricObject.visible = isInside;
// 		});
// 	}

// 	public handleSeek(seek: number): void {
// 		if (this.playing) {
// 			this.setPlaying(false);
// 		}
// 		this.updateTimeTo(seek);
// 		this.updateVideoElements();
// 		this.updateAudioElements();
// 	}

// 	public addVideoResource(video: string): void {
// 		this.videos = [...this.videos, video];
// 	}

// 	public addAudioResource(audio: string): void {
// 		this.audios = [...this.audios, audio];
// 	}

// 	public addImageResource(image: string): void {
// 		this.images = [...this.images, image];
// 	}

// 	public async saveCanvasToVideoWithAudio(): Promise<void> {
// 		try {
// 			const canvas = document.getElementById(
// 				"canvas"
// 			) as HTMLCanvasElement;
// 			if (!canvas) throw new Error("Canvas element not found");

// 			const stream = canvas.captureStream(30);
// 			const audioStreams = this.captureAudioStreams();

// 			audioStreams.forEach((audioStream) => {
// 				stream.addTrack(audioStream.getAudioTracks()[0]);
// 			});

// 			await this.recordAndSaveVideo(stream);
// 		} catch (error) {
// 			console.error("Error saving canvas to video:", error);
// 		}
// 	}

// 	private captureAudioStreams(): MediaStream[] {
// 		const audioStreams: MediaStream[] = [];

// 		this._editorElements.filter(isEditorAudioElement).forEach((audio) => {
// 			const audioElement = document.getElementById(
// 				audio.properties.elementId
// 			) as HTMLAudioElement | null;

// 			if (!audioElement) return;

// 			const ctx = new AudioContext();
// 			const sourceNode = ctx.createMediaElementSource(audioElement);
// 			const dest = ctx.createMediaStreamDestination();
// 			sourceNode.connect(dest);
// 			sourceNode.connect(ctx.destination);
// 			audioStreams.push(dest.stream);
// 		});

// 		return audioStreams;
// 	}

// 	private async recordAndSaveVideo(stream: MediaStream): Promise<void> {
// 		const video = document.createElement("video");
// 		video.srcObject = stream;
// 		video.height = 500;
// 		video.width = 800;

// 		try {
// 			await video.play();

// 			const mediaRecorder = new MediaRecorder(stream);
// 			const chunks: Blob[] = [];

// 			mediaRecorder.ondataavailable = (e) => {
// 				chunks.push(e.data);
// 			};

// 			mediaRecorder.onstop = async () => {
// 				const blob = new Blob(chunks, { type: "video/webm" });

// 				if (this.selectedVideoFormat === "mp4") {
// 					await this.convertAndSaveToMp4(blob);
// 				} else {
// 					this.saveWebmVideo(blob);
// 				}
// 			};

// 			mediaRecorder.start();
// 			setTimeout(() => {
// 				mediaRecorder.stop();
// 				video.remove();
// 			}, this.maxTime);
// 		} catch (error) {
// 			console.error("Error recording video:", error);
// 			video.remove();
// 		}
// 	}

// 	private async convertAndSaveToMp4(webmBlob: Blob): Promise<void> {
// 		try {
// 			const data = new Uint8Array(await webmBlob.arrayBuffer());
// 			const ffmpeg = new FFmpeg();

// 			const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
// 			await ffmpeg.load({
// 				coreURL: await toBlobURL(
// 					`${baseURL}/ffmpeg-core.js`,
// 					"text/javascript"
// 				),
// 				wasmURL: await toBlobURL(
// 					`${baseURL}/ffmpeg-core.wasm`,
// 					"application/wasm"
// 				),
// 			});

// 			await ffmpeg.writeFile("video.webm", data);
// 			await ffmpeg.exec([
// 				"-y",
// 				"-i",
// 				"video.webm",
// 				"-c",
// 				"copy",
// 				"video.mp4",
// 			]);

// 			const output = await ffmpeg.readFile("video.mp4");
// 			const outputBlob = new Blob([output], { type: "video/mp4" });

// 			const outputUrl = URL.createObjectURL(outputBlob);
// 			const a = document.createElement("a");
// 			a.download = "video.mp4";
// 			a.href = outputUrl;
// 			a.click();

// 			URL.revokeObjectURL(outputUrl);
// 		} catch (error) {
// 			console.error("Error converting video to MP4:", error);
// 		}
// 	}

// 	private saveWebmVideo(blob: Blob): void {
// 		try {
// 			const url = URL.createObjectURL(blob);
// 			const a = document.createElement("a");
// 			a.href = url;
// 			a.download = "video.webm";
// 			a.click();

// 			URL.revokeObjectURL(url);
// 		} catch (error) {
// 			console.error("Error saving WebM video:", error);
// 		}
// 	}

// 	private refreshElements(): void {
// 		if (!this.canvas) return;

// 		const canvas = this.canvas;
// 		canvas.remove(...canvas.getObjects());

// 		for (const element of this._editorElements) {
// 			switch (element.type) {
// 				case "video":
// 					this.createVideoObject(element);
// 					break;
// 				case "image":
// 					this.createImageObject(element);
// 					break;
// 				case "text":
// 					this.createTextObject(element);
// 					break;
// 				case "audio":
// 					// Audio elements don't need visual representation
// 					break;
// 			}
// 		}

// 		if (this.selectedElement?.fabricObject) {
// 			canvas.setActiveObject(this.selectedElement.fabricObject);
// 		}

// 		this.refreshAnimations();
// 		this.updateTimeTo(this.currentTimeInMs);
// 		canvas.renderAll();
// 	}

// 	private createVideoObject(element: VideoEditorElement): void {
// 		if (!this.canvas) return;

// 		const videoElement = document.getElementById(
// 			element.properties.elementId
// 		) as HTMLVideoElement | null;

// 		if (!videoElement) return;

// 		const videoObject = new CoverVideo(videoElement, {
// 			type: "coverVideo",
// 			name: element.id,
// 			left: element.placement.x,
// 			top: element.placement.y,
// 			width: element.placement.width,
// 			height: element.placement.height,
// 			scaleX: element.placement.scaleX,
// 			scaleY: element.placement.scaleY,
// 			angle: element.placement.rotation,
// 			objectCaching: false,
// 			selectable: true,
// 			lockUniScaling: true,
// 			customFilter: element.properties.effect.type,
// 		});

// 		element.fabricObject = videoObject;
// 		element.properties.imageObject = videoObject;
// 		videoElement.width = 100;
// 		videoElement.height =
// 			(videoElement.videoHeight * 100) / videoElement.videoWidth;

// 		this.canvas.add(videoObject);
// 		this.setupObjectEventHandlers(element, videoObject);
// 	}

// 	private createImageObject(element: ImageEditorElement): void {
// 		if (!this.canvas) return;

// 		const imageElement = document.getElementById(
// 			element.properties.elementId
// 		) as HTMLImageElement | null;

// 		if (!imageElement) return;

// 		const imageObject = new CoverImage(imageElement, {
// 			type: "coverImage",
// 			name: element.id,
// 			left: element.placement.x,
// 			top: element.placement.y,
// 			width: element.placement.width,
// 			height: element.placement.height,
// 			scaleX: element.placement.scaleX,
// 			scaleY: element.placement.scaleY,
// 			angle: element.placement.rotation,
// 			objectCaching: false,
// 			selectable: true,
// 			lockUniScaling: true,
// 			customFilter: element.properties.effect.type,
// 		});

// 		element.fabricObject = imageObject;
// 		element.properties.imageObject = imageObject;

// 		const image = {
// 			w: imageElement.naturalWidth,
// 			h: imageElement.naturalHeight,
// 		};

// 		imageObject.width = image.w;
// 		imageObject.height = image.h;
// 		imageElement.width = image.w;
// 		imageElement.height = image.h;
// 		imageObject.scaleToHeight(image.w);
// 		imageObject.scaleToWidth(image.h);

// 		const toScale = {
// 			x: element.placement.width / image.w,
// 			y: element.placement.height / image.h,
// 		};

// 		imageObject.scaleX = toScale.x * element.placement.scaleX;
// 		imageObject.scaleY = toScale.y * element.placement.scaleY;

// 		this.canvas.add(imageObject);
// 		this.setupObjectEventHandlers(element, imageObject);
// 	}

// 	private createTextObject(element: TextEditorElement): void {
// 		if (!this.canvas) return;

// 		const textObject = new fabric.Textbox(element.properties.text, {
// 			name: element.id,
// 			left: element.placement.x,
// 			top: element.placement.y,
// 			scaleX: element.placement.scaleX,
// 			scaleY: element.placement.scaleY,
// 			width: element.placement.width,
// 			height: element.placement.height,
// 			angle: element.placement.rotation,
// 			fontSize: element.properties.fontSize,
// 			fontWeight: element.properties.fontWeight,
// 			objectCaching: false,
// 			selectable: true,
// 			lockUniScaling: true,
// 			fill: "#ffffff",
// 		});

// 		element.fabricObject = textObject;
// 		this.canvas.add(textObject);
// 		this.setupObjectEventHandlers(element, textObject);
// 	}

// 	private setupObjectEventHandlers(
// 		element: EditorElement,
// 		fabricObject: fabric.Object
// 	): void {
// 		if (!this.canvas) return;

// 		fabricObject.on("selected", () => {
// 			this.setSelectedElement(element);
// 		});

// 		this.canvas.on("object:modified", (e) => {
// 			if (!e.target || e.target !== fabricObject) return;

// 			const target = e.target;
// 			const placement = element.placement;
// 			const newPlacement: Placement = {
// 				...placement,
// 				x: target.left ?? placement.x,
// 				y: target.top ?? placement.y,
// 				rotation: target.angle ?? placement.rotation,
// 				width:
// 					target.width && target.scaleX
// 						? target.width * target.scaleX
// 						: placement.width,
// 				height:
// 					target.height && target.scaleY
// 						? target.height * target.scaleY
// 						: placement.height,
// 				scaleX: target.scaleX ?? placement.scaleX,
// 				scaleY: target.scaleY ?? placement.scaleY,
// 			};

// 			const updatedElement = {
// 				...element,
// 				placement: newPlacement,
// 				...(element.type === "text" &&
// 					target instanceof fabric.Textbox && {
// 						properties: {
// 							...element.properties,
// 							text: target.text || "",
// 						},
// 					}),
// 			} as EditorElement;

// 			this.updateEditorElement(updatedElement);
// 		});
// 	}
// }

// function getTextObjectsPartitionedByCharacters(
// 	textObject: fabric.Textbox,
// 	element: TextEditorElement
// ): fabric.Text[] {
// 	if (!textObject.text) return [];

// 	const copyCharsObjects: fabric.Text[] = [];
// 	const characters = textObject.text
// 		.split("")
// 		.filter((char) => char !== "\n");
// 	const charObjects = (textObject as any).__charBounds;

// 	if (!charObjects) return [];

// 	const charObjectFixed = charObjects
// 		.map((bounds: any[], lineIndex: number) =>
// 			bounds
// 				.slice(0, bounds.length - 1)
// 				.map((bound) => ({ bound, lineIndex }))
// 		)
// 		.flat();

// 	const lineHeight = textObject.getHeightOfLine(0);

// 	for (let i = 0; i < characters.length; i++) {
// 		if (!charObjectFixed[i]) continue;

// 		const { bound: charObject, lineIndex } = charObjectFixed[i];
// 		const char = characters[i];
// 		const scaleX = textObject.scaleX ?? 1;
// 		const scaleY = textObject.scaleY ?? 1;

// 		const charTextObject = new fabric.Text(char, {
// 			left: charObject.left * scaleX + element.placement.x,
// 			scaleX: scaleX,
// 			scaleY: scaleY,
// 			top: lineIndex * lineHeight * scaleY + element.placement.y,
// 			fontSize: textObject.fontSize,
// 			fontWeight: textObject.fontWeight,
// 			fill: "#fff",
// 		});

// 		copyCharsObjects.push(charTextObject);
// 	}

// 	return copyCharsObjects;
// }

// export function isEditorAudioElement(
// 	element: EditorElement
// ): element is AudioEditorElement {
// 	return element.type === "audio";
// }

// export function isEditorVideoElement(
// 	element: EditorElement
// ): element is VideoEditorElement {
// 	return element.type === "video";
// }

// export function isEditorImageElement(
// 	element: EditorElement
// ): element is ImageEditorElement {
// 	return element.type === "image";
// }
