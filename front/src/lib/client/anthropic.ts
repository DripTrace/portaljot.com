import { ChatAnthropic } from "@langchain/anthropic";

export const chatModel = new ChatAnthropic({
	modelName: "claude-3-5-sonnet-20240620",
	anthropicApiKey: process.env.ANTHROPIC_API_KEY,
});
