// src/lib/client/runwayml.ts
import RunwayML from "@runwayml/sdk";
import { HttpsProxyAgent } from "https-proxy-agent";
import nodeFetch from "node-fetch";
import type RequestInit from "@runwayml/sdk";

// Environment validation
if (!process.env.RUNWAY_API_KEY) {
	throw new Error("RUNWAY_API_KEY environment variable is not set");
}

// Initialize Runway client with configuration
export const runwayClient = new RunwayML({
	apiKey: process.env.RUNWAY_API_KEY,
	// @ts-expect-error - The types between node-fetch and RunwayML's fetch are incompatible but work at runtime
	fetch: (url: string, init?: RequestInit) => {
		if (process.env.HTTPS_PROXY) {
			const agent = new HttpsProxyAgent(process.env.HTTPS_PROXY);
			return nodeFetch(url, { ...init, agent });
		}
		return nodeFetch(url, init);
	},
});

// Export types for use in other files
export type RunwayMLImageToVideoParams = RunwayML.ImageToVideoCreateParams;
export type RunwayMLTask = RunwayML.Tasks;
export type RunwayMLTaskResponse = RunwayML.TaskRetrieveResponse;
