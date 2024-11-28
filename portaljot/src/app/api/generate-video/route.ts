import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { prompt, aspect_ratio, loop } = await req.json();
	try {
		const response = await fetch(
			"https://api.lumalabs.ai/dream-machine/v1/generations",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.LUMA_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt, aspect_ratio, loop }),
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Error generating video" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
