// app/api/dalle/route.ts
import { DallEAPIWrapper } from "@langchain/openai";
import { NextResponse } from "next/server";

interface GenerationOptions {
	prompt: string;
	n?: number;
	size?: "1024x1024" | "1024x1792" | "1792x1024";
	quality?: "standard" | "hd";
	style?: "vivid" | "natural";
}

export async function POST(req: Request) {
	console.log("🚀 API Route: Started processing request");

	if (!process.env.OPENAI_API_KEY) {
		console.error("❌ API Route: Missing OpenAI API key");
		return NextResponse.json(
			{ error: "OpenAI API key not configured" },
			{ status: 500 }
		);
	}

	try {
		console.log("📝 API Route: Parsing request body");
		const options: GenerationOptions = await req.json();
		console.log("✅ API Route: Request options:", {
			...options,
			prompt: options.prompt.substring(0, 50) + "...", // Truncate for logging
		});

		console.log("🔧 API Route: Initializing DALL-E wrapper");
		const tool = new DallEAPIWrapper({
			openAIApiKey: process.env.OPENAI_API_KEY,
			modelName: "dall-e-3",
			n: options.n || 1,
			size: options.size || "1024x1024",
			quality: options.quality || "standard",
			style: options.style || "vivid",
			responseFormat: "url",
		});

		console.log("🎨 API Route: Generating image");
		const imageUrl = await tool.invoke(options.prompt);
		console.log("✨ API Route: Image generated successfully");

		return NextResponse.json({ imageUrl });
	} catch (error: any) {
		console.error("❌ API Route: Error details:", {
			message: error.message,
			stack: error.stack,
			status: error.status,
		});

		return NextResponse.json(
			{ error: error.message || "Failed to generate image" },
			{ status: error.status || 500 }
		);
	}
}
