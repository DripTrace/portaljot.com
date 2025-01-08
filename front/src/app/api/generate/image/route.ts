import { DallEAPIWrapper } from "@langchain/openai";
import { NextResponse } from "next/server";
import { VERTEX_API_CONFIG } from "@/lib/config/vertex";
import {
	DallE3Options,
	GenerationOptions,
	ImagenOptions,
} from "@/types/modify/imggen";
import { getGoogleAuthToken } from "@/lib/client/vertex";

export async function POST(req: Request) {
	console.log("\n🚀 Starting new request ====================");
	console.log("📅 Timestamp:", new Date().toISOString());

	try {
		const options: GenerationOptions = await req.json();
		console.log("\n📝 Request Options:", JSON.stringify(options, null, 2));

		if (options.model === "dalle3") {
			console.log("\n🎨 Using DALL-E 3");
			return handleDallE3Generation(options as DallE3Options);
		} else {
			console.log("\n🖼️ Using Google Imagen");
			return handleImagenGeneration(options as ImagenOptions);
		}
	} catch (error: any) {
		console.error("\n❌ Request failed:", error);
		console.log("==================== End request ❌\n");
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

async function handleDallE3Generation(options: DallE3Options) {
	console.log("\n📍 DALL-E 3 Configuration:");
	console.log(
		JSON.stringify(
			{
				modelName: "dall-e-3",
				size: options.size,
				quality: options.quality,
				style: options.style,
				prompt: options.prompt,
			},
			null,
			2
		)
	);

	try {
		const tool = new DallEAPIWrapper({
			openAIApiKey: process.env.OPENAI_API_KEY,
			modelName: "dall-e-3",
			size: options.size,
			quality: options.quality,
			style: options.style,
		});

		console.log("\n📤 Sending request to DALL-E 3");
		const imageUrl = await tool.invoke(options.prompt);

		console.log("\n📥 DALL-E 3 Response:");
		console.log("Image URL:", imageUrl);
		console.log("==================== End request ✅\n");

		return NextResponse.json({ imageUrl });
	} catch (error) {
		console.error("\n❌ DALL-E 3 Error:", error);
		console.log("==================== End request ❌\n");
		throw error;
	}
}

async function handleImagenGeneration(options: ImagenOptions) {
	console.log("\n🔑 Getting Google auth token");
	const authToken = await getGoogleAuthToken();

	// Check if authToken is null or undefined
	if (!authToken) {
		throw new Error("Failed to retrieve Google auth token.");
	}

	console.log("Auth token received:", authToken.substring(0, 20) + "...");

	const modelVersion = options.sampleImageStyle
		? "imagegeneration@002"
		: "imagegeneration@006";
	console.log("\n📌 Selected model version:", modelVersion);

	const requestBody = {
		instances: [{ prompt: options.prompt }],
		parameters: {
			sampleCount: options.sampleCount,
			seed: options.seed,
			negativePrompt: options.negativePrompt,
			aspectRatio: options.aspectRatio,
			outputOptions: {
				mimeType: "image/png",
			},
			safetySetting: "block_medium_and_above",
			addWatermark: options.addWatermark,
		} as any,
	};

	if (modelVersion === "imagegeneration@002" && options.sampleImageStyle) {
		console.log("\n🎨 Adding style:", options.sampleImageStyle);
		requestBody.parameters.sampleImageStyle = options.sampleImageStyle;
	}

	const apiUrl = `${VERTEX_API_CONFIG.baseUrl(
		process.env.GOOGLE_CLOUD_REGION!,
		process.env.GOOGLE_PROJECT_ID!
	)}/${modelVersion}:predict`;

	console.log("\n📤 Request Details:");
	console.log("URL:", apiUrl);
	console.log("Headers:", {
		Authorization: `Bearer ${authToken.substring(0, 20)}...`,
		"Content-Type": "application/json",
	});
	console.log("Body:", JSON.stringify(requestBody, null, 2));

	try {
		console.log("\n⏳ Sending request to Imagen API");
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${authToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			const error = await response.json();
			console.error(
				"\n❌ API Error Response:",
				JSON.stringify(error, null, 2)
			);
			throw new Error(
				`Image generation failed with the following error: ${error.error?.message || "Unknown error"}`
			);
		}

		const data = await response.json();
		console.log("\n📥 Imagen API Response:");
		console.log("Status:", response.status);
		console.log("Headers:", Object.fromEntries(response.headers));
		console.log(
			"Safety Attributes:",
			JSON.stringify(data.predictions[0].safetyAttributes, null, 2)
		);
		console.log(
			"Image size (base64):",
			data.predictions[0].bytesBase64Encoded.length
		);
		console.log("==================== End request ✅\n");

		return NextResponse.json({
			imageUrl: `data:${data.predictions[0].mimeType || "image/png"};base64,${data.predictions[0].bytesBase64Encoded}`,
			safetyAttributes: data.predictions[0].safetyAttributes,
		});
	} catch (error) {
		console.error("\n❌ Request failed:", error);
		console.log("==================== End request ❌\n");
		throw error;
	}
}
