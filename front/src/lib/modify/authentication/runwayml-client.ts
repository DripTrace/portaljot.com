import RunwayML from "@runwayml/sdk";

const runwayClient = new RunwayML({
	apiKey: process.env.RUNWAY_API_KEY as string,
	maxRetries: 2,
	timeout: 60000,
	runwayVersion: "2024-11-06",
	baseURL: "https://api.runwayml.com",
});
