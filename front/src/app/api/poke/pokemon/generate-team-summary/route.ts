import { generateTeamSummary } from "@/actions/feature/poke/generateTeamSummary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { prompt } = await request.json();

	if (!prompt) {
		return NextResponse.json(
			{ error: "No prompt provided" },
			{ status: 400 }
		);
	}

	try {
		const summary = await generateTeamSummary(prompt);
		return NextResponse.json({ summary });
	} catch (error) {
		console.error("Error generating summary:", error);
		return NextResponse.json(
			{ error: "An error occurred while generating the summary." },
			{ status: 500 }
		);
	}
}
