import { HumanMessage } from "@langchain/core/messages";
import { chatModel } from "../client/anthropic";

export const summarizeWithClaude = async (
	description: string,
	segmentDuration: number
): Promise<{ summary: string; response: any }> => {
	const maxCharacters = 450;
	try {
		const response = await chatModel.invoke([
			new HumanMessage(
				`Create a sound effect description for this ${segmentDuration}-second video segment. Describe key sounds, their timing, and ambient noise. Focus on creating an immersive audio experience. Keep it under ${maxCharacters} characters:\n\n${description}`
			),
		]);

		let summaryContent = response.content;
		let summary = "";

		if (typeof summaryContent === "string") {
			summary = summaryContent;
		} else if (Array.isArray(summaryContent)) {
			summary = summaryContent
				.map((part) => {
					if (typeof part === "string") return part;
					if ("type" in part && part.type === "text")
						return part.text;
					return "";
				})
				.join(" ")
				.trim();
		}

		if (summary.length > maxCharacters) {
			summary = summary.slice(0, maxCharacters - 3) + "...";
		}

		return { summary, response };
	} catch (error) {
		console.error("Error in summarization:", error);
		throw error;
	}
};
