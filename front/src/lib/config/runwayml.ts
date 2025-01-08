// config.ts

import { CONFIG } from "../constants/runwayml";

if (!CONFIG.API_KEY) {
	throw new Error("RUNWAY_API_KEY environment variable is not set");
}
