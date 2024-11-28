export const RATIOS = [
	"1:1",
	"16:9",
	"21:9",
	"4:3",
	"9:16",
	"9:21",
	"3:4",
] as const;
export type RatioKey = (typeof RATIOS)[number];
export const DEFAULT_RATIO: RatioKey = "16:9";

interface RatioResolutionItem {
	resolutions: string[];
	prefered: string;
}

export const RATIO_RESOLUTIONS: Record<RatioKey, RatioResolutionItem> = {
	"1:1": {
		prefered: "1080x1080",
		resolutions: [
			"240x240",
			"360x360",
			"480x480",
			"720x720",
			"1080x1080",
			"1280x1280",
			"1920x1920",
			"2560x2560",
			"3840x3840",
		],
	},
	"16:9": {
		prefered: "1920x1080",
		resolutions: [
			"640x360",
			"854x480",
			"1280x720",
			"1920x1080",
			"2560x1440",
			"3840x2160",
		],
	},
	"21:9": {
		prefered: "1920x800",
		resolutions: [
			"1280x536",
			"1600x672",
			"1920x800",
			"2560x1080",
			"3840x1600",
		],
	},
	"4:3": {
		prefered: "1280x960",
		resolutions: [
			"800x600",
			"1024x768",
			"1280x960",
			"1400x1050",
			"1600x1200",
		],
	},
	"9:16": {
		prefered: "1080x1920",
		resolutions: [
			"360x640",
			"480x854",
			"720x1280",
			"1080x1920",
			"1440x2560",
			"2160x3840",
		],
	},
	"9:21": {
		prefered: "800x1920",
		resolutions: [
			"536x1280",
			"672x1600",
			"800x1920",
			"1080x2560",
			"1600x3840",
		],
	},
	"3:4": {
		prefered: "960x1280",
		resolutions: [
			"600x800",
			"768x1024",
			"960x1280",
			"1050x1400",
			"1200x1600",
		],
	},
};

// src/constants/modify/video-size.ts

// export const RATIOS = ["16:9", "21:9", "1:1", "4:3"] as const;
// export type RatioKey = (typeof RATIOS)[number];
// export const DEFAULT_RATIO: RatioKey = "16:9";

// interface RatioResolutionItem {
// 	resolutions: string[];
// 	prefered: string;
// }

// export const RATIO_RESOLUTIONS: Record<RatioKey, RatioResolutionItem> = {
// 	"16:9": {
// 		prefered: "1920x1080",
// 		resolutions: [
// 			"640x360",
// 			"854x480",
// 			"1280x720",
// 			"1920x1080",
// 			"2560x1440",
// 			"3840x2160",
// 		],
// 	},
// 	"21:9": {
// 		prefered: "1920x800",
// 		resolutions: [
// 			"1280x536",
// 			"1600x672",
// 			"1920x800",
// 			"2560x1080",
// 			"3840x1600",
// 		],
// 	},
// 	"1:1": {
// 		prefered: "720x720",
// 		resolutions: ["240x240", "360x360", "480x480", "720x720", "1080x1080"],
// 	},
// 	"4:3": {
// 		prefered: "1280x960",
// 		resolutions: [
// 			"800x600",
// 			"1024x768",
// 			"1280x960",
// 			"1400x1050",
// 			"1600x1200",
// 		],
// 	},
// };
