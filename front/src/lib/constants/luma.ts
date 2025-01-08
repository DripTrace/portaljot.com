// Rate limit constants
export const LUMA_API_URL =
	"https://api.lumalabs.ai/dream-machine/v1/generations";
export const RATE_LIMITS = {
	RAY_VIDEO_CONCURRENT: 2,
	RAY_VIDEO_REQUESTS_PER_MIN: 50,
	PHOTON_CONCURRENT: 100,
	PHOTON_REQUESTS_PER_MIN: 100,
} as const;

// Validation constants
export const VALIDATION = {
	PROMPT_MIN_LENGTH: 3,
	PROMPT_MAX_LENGTH: 5000,
} as const;

// Error messages
export const ERROR_MESSAGES = {
	PROMPT_REQUIRED: "Prompt is required",
	PROMPT_TOO_SHORT: `Prompt is too short, minimum length is ${VALIDATION.PROMPT_MIN_LENGTH} characters`,
	PROMPT_TOO_LONG: `Prompt is too long, maximum length is ${VALIDATION.PROMPT_MAX_LENGTH} characters`,
	LOOP_END_FRAME: "Loop is not supported for end frame",
	LOOP_KEYFRAMES: "Loop is not supported for keyframes",
	LOOP_EXTEND_REVERSE: "Loop is not supported for extend reverse",
	LOOP_INTERPOLATE_VIDEO_TO_IMAGE:
		"Loop is not supported for interpolate video to image",
	LOOP_INTERPOLATE_IMAGE_TO_VIDEO:
		"Loop is not supported for interpolate image to video",
	LOOP_INTERPOLATE_VIDEOS:
		"Loop is not supported for interpolate between two videos",
	NO_KEYFRAMES: "No keyframes provided",
	UNKNOWN_REQUEST: "Unknown request type",
} as const;

export const LUMA_STYLES = [
	"3D Animation",
	"Anime",
	"Cinematic",
	"Digital Art",
	"Photographic",
];

export const ASPECT_RATIO = [
	"1:1",
	"16:9",
	"4:3",
	"9:16",
	"21:9",
	"3:4",
	"9:21",
];

export const VALID_RATIOS = ["16:9", "9:16", "4:3", "3:4"];
