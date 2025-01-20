import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { conversation } = req.body;

    console.log("REQUEST BODY FROM ANALYZE CONVERSATION: >>>>\n", req.body);

    if (!conversation) {
        return res.status(400).json({ error: "Conversation data is required" });
    }

    try {
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

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.7,
            max_tokens: 150,
        });

        const suggestion = aiResponse.choices[0]?.message?.content?.trim();

        if (!suggestion) {
            return res
                .status(500)
                .json({ error: "Failed to generate AI suggestion" });
        }

        res.status(200).json({ suggestion });
    } catch (error) {
        console.error("Error in analyze-conversation:", error);
        res.status(500).json({
            error: "Failed to analyze the conversation",
            details: (error as Error).message,
        });
    }
}
