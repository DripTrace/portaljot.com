import LumaAI from "lumaai";

// Initialize Luma client
export function initLumaClient(): LumaAI {
	const apiKey = process.env.LUMA_API_KEY;
	if (!apiKey) {
		throw new Error("LUMA_API_KEY is not configured");
	}
	return new LumaAI({
		authToken: apiKey,
		maxRetries: 3,
		timeout: 30000,
	});
}
