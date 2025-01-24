// app/api/analyze-conversation/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
	try {
		// Parse the JSON body from the incoming request
		const { conversation } = await req.json();

		console.log("REQUEST BODY FROM ANALYZE CONVERSATION: >>>>\n", {
			conversation,
		});

		// Validate that the conversation data is provided
		if (!conversation) {
			return NextResponse.json(
				{ error: "Conversation data is required" },
				{ status: 400 }
			);
		}

		// Construct the prompt for OpenAI
		const prompt = `
Analyze the following conversation and suggest the next step for the patient. 
Possible actions include:
- Registering as a new patient
- Scheduling an appointment
- Refilling a prescription
- Asking general information
- Ending the call
Conversation so far:
${conversation}
Provide a brief, clear suggestion for the next step. The suggestion should be a continuation of the conversation, so, propose a question to the patient confirming their suggestion. Otherwise ask them to clarify. Don't append 'System:' to your response. There should not be any side commentary on your end, you should respond as if you are the one speaking the next sentence in the conversation.
        `;

		// Create a chat completion using OpenAI's API
		const aiResponse = await openai.chat.completions.create({
			model: "gpt-4o-mini-2024-07-18",
			messages: [{ role: "system", content: prompt }],
			temperature: 0.7,
			max_tokens: 150,
		});

		// Extract the suggestion from the AI response
		const suggestion = aiResponse.choices[0]?.message?.content?.trim();

		// If no suggestion is generated, respond with an error
		if (!suggestion) {
			return NextResponse.json(
				{ error: "Failed to generate AI suggestion" },
				{ status: 500 }
			);
		}

		// Respond with the AI-generated suggestion
		return NextResponse.json({ suggestion }, { status: 200 });
	} catch (error: any) {
		console.error("Error in analyze-conversation:", error);
		return NextResponse.json(
			{
				error: "Failed to analyze the conversation",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}
