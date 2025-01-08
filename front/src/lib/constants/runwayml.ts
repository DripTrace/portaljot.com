export const CONFIG = {
	API_KEY: process.env.RUNWAY_API_KEY,
	API_VERSION: "2024-11-06",
	API_URL: "https://api.runway.ml/v1",
	MAX_RETRIES: 3,
	BASE_RETRY_DELAY: 1000, // 1 second
	MAX_RETRY_DELAY: 32000, // 32 seconds
	JITTER_FACTOR: 0.5, // 50% jitter
} as const;

export const RUNWAYML_STATUSES = [429, 502, 503, 504];

export const CAMERA_MOTIONS = [
	"Static",
	"Move Left",
	"Move Right",
	"Move Up",
	"Move Down",
	"Push In",
	"Pull Out",
	"Zoom In",
	"Zoom Out",
	"Pan Left",
	"Pan Right",
	"Orbit Left",
	"Orbit Right",
	"Crane Up",
	"Crane Down",
];

export const RUNWAY_MODES = ["standard", "fast"];
