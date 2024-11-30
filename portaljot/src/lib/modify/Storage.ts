// // storage.ts

// import type { Settings } from "@/types/modify";
// import type { SerializableVideoBox } from "./VideoBox";

// const VIDEO_RAW_BUFFER_BOXES_KEY = "videoRawBoxes";
// const VIDEO_TIMELINE_BOXES_KEY = "videoTimelineBoxes";
// const VIDEO_SETTINGS_KEY = "videoSettings";

// export interface VideoRawBufferBox {
// 	name: string;
// 	buffer: ArrayBuffer | ArrayBufferView;
// 	resourceId: string;
// 	type: "uploaded" | "generated" | "exported";
// }

// class Storage {
// 	private db: IDBDatabase | null = null;
// 	private promise: Promise<void>;

// 	constructor() {
// 		this.promise = new Promise((resolve, reject) => {
// 			const request = window.indexedDB.open("video-editor", 2); // Incremented version to 2
// 			request.onerror = reject;

// 			request.onsuccess = (event: any) => {
// 				this.db = event.target.result as IDBDatabase;
// 				resolve();
// 			};

// 			request.onupgradeneeded = (event: any) => {
// 				this.db = event.target.result as IDBDatabase;

// 				if (event.oldVersion < 1) {
// 					// Version 1 setup
// 					const objectStore = this.db.createObjectStore(
// 						VIDEO_RAW_BUFFER_BOXES_KEY,
// 						{
// 							keyPath: "resourceId",
// 						}
// 					);
// 				}

// 				if (event.oldVersion < 2) {
// 					// Version 2 upgrade: add 'type' index
// 					const transaction = event.currentTarget.transaction;
// 					const objectStore = transaction.objectStore(
// 						VIDEO_RAW_BUFFER_BOXES_KEY
// 					);
// 					objectStore.createIndex("type", "type", { unique: false });
// 				}
// 			};
// 		});
// 	}

// 	addVideoRawBox = async (rawBox: VideoRawBufferBox) => {
// 		await this.promise;

// 		return new Promise((resolve, reject) => {
// 			const transaction = this.db!.transaction(
// 				[VIDEO_RAW_BUFFER_BOXES_KEY],
// 				"readwrite"
// 			);
// 			const objectStore = transaction.objectStore(
// 				VIDEO_RAW_BUFFER_BOXES_KEY
// 			);
// 			const request = objectStore.add(rawBox);

// 			request.onerror = reject;
// 			request.onsuccess = resolve;
// 		});
// 	};

// 	getVideoRawBoxes = async () => {
// 		await this.promise;

// 		const transaction = this.db!.transaction(
// 			[VIDEO_RAW_BUFFER_BOXES_KEY],
// 			"readonly"
// 		);
// 		const objectStore = transaction.objectStore(VIDEO_RAW_BUFFER_BOXES_KEY);
// 		const request = objectStore.getAll();

// 		return new Promise<VideoRawBufferBox[]>((resolve, reject) => {
// 			request.onsuccess = () => {
// 				resolve(request.result);
// 			};
// 			request.onerror = reject;
// 		});
// 	};

// 	saveTimelineVideoBoxesMetadata = (
// 		timelineBoxes: SerializableVideoBox[]
// 	) => {
// 		window.localStorage.setItem(
// 			VIDEO_TIMELINE_BOXES_KEY,
// 			JSON.stringify(timelineBoxes)
// 		);
// 	};

// 	getTimelineVideoBoxesMetadata = (): SerializableVideoBox[] => {
// 		const rawValue = window.localStorage.getItem(VIDEO_TIMELINE_BOXES_KEY);

// 		if (!rawValue) return [];
// 		return JSON.parse(rawValue);
// 	};

// 	saveSettings = (settings: Settings) => {
// 		window.localStorage.setItem(
// 			VIDEO_SETTINGS_KEY,
// 			JSON.stringify(settings)
// 		);
// 	};

// 	getSettings = (): Settings | null => {
// 		const rawValue = window.localStorage.getItem(VIDEO_SETTINGS_KEY);

// 		if (!rawValue) return null;
// 		return JSON.parse(rawValue);
// 	};
// }

// export const storage = new Storage();

import type { Settings } from "@/types/modify";
import type { SerializableVideoBox } from "./VideoBox";

const VIDEO_RAW_BUFFER_BOXES_KEY = "videoRawBoxes";
const VIDEO_TIMELINE_BOXES_KEY = "videoTimelineBoxes";
const VIDEO_SETTINGS_KEY = "videoSettings";

export interface VideoRawBufferBox {
	name: string;
	buffer: ArrayBuffer | ArrayBufferView;
	resourceId: string;
	type: "uploaded" | "generated" | "exported";
}

class Storage {
	private db: IDBDatabase | null = null;
	private promise: Promise<void> | null = null;

	constructor() {
		if (typeof window !== "undefined") {
			// Make sure this only runs on the client side
			this.promise = new Promise((resolve, reject) => {
				const request = window.indexedDB.open("video-editor", 2); // Incremented version to 2
				request.onerror = reject;

				request.onsuccess = (event: any) => {
					this.db = event.target.result as IDBDatabase;
					resolve();
				};

				request.onupgradeneeded = (event: any) => {
					this.db = event.target.result as IDBDatabase;

					if (event.oldVersion < 1) {
						// Version 1 setup
						const objectStore = this.db.createObjectStore(
							VIDEO_RAW_BUFFER_BOXES_KEY,
							{
								keyPath: "resourceId",
							}
						);
					}

					if (event.oldVersion < 2) {
						// Version 2 upgrade: add 'type' index
						const transaction = event.currentTarget.transaction;
						const objectStore = transaction.objectStore(
							VIDEO_RAW_BUFFER_BOXES_KEY
						);
						objectStore.createIndex("type", "type", {
							unique: false,
						});
					}
				};
			});
		}
	}

	addVideoRawBox = async (rawBox: VideoRawBufferBox) => {
		if (!this.promise) return;
		await this.promise;

		return new Promise((resolve, reject) => {
			const transaction = this.db!.transaction(
				[VIDEO_RAW_BUFFER_BOXES_KEY],
				"readwrite"
			);
			const objectStore = transaction.objectStore(
				VIDEO_RAW_BUFFER_BOXES_KEY
			);
			const request = objectStore.add(rawBox);

			request.onerror = reject;
			request.onsuccess = resolve;
		});
	};

	getVideoRawBoxes = async () => {
		if (!this.promise) return [];
		await this.promise;

		const transaction = this.db!.transaction(
			[VIDEO_RAW_BUFFER_BOXES_KEY],
			"readonly"
		);
		const objectStore = transaction.objectStore(VIDEO_RAW_BUFFER_BOXES_KEY);
		const request = objectStore.getAll();

		return new Promise<VideoRawBufferBox[]>((resolve, reject) => {
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = reject;
		});
	};

	saveTimelineVideoBoxesMetadata = (
		timelineBoxes: SerializableVideoBox[]
	) => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem(
				VIDEO_TIMELINE_BOXES_KEY,
				JSON.stringify(timelineBoxes)
			);
		}
	};

	getTimelineVideoBoxesMetadata = (): SerializableVideoBox[] => {
		if (typeof window !== "undefined") {
			const rawValue = window.localStorage.getItem(
				VIDEO_TIMELINE_BOXES_KEY
			);

			if (!rawValue) return [];
			return JSON.parse(rawValue);
		}
		return [];
	};

	saveSettings = (settings: Settings) => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem(
				VIDEO_SETTINGS_KEY,
				JSON.stringify(settings)
			);
		}
	};

	getSettings = (): Settings | null => {
		if (typeof window !== "undefined") {
			const rawValue = window.localStorage.getItem(VIDEO_SETTINGS_KEY);

			if (!rawValue) return null;
			return JSON.parse(rawValue);
		}
		return null;
	};
}

export const storage = new Storage();
