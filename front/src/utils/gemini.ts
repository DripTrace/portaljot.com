// import axios from "axios";
// import { fallbackVideoAnalysis } from "./vidgen";
// import { VideoAnalysisResult } from "@/types/modify/vidgen";

// export const analyzeVideoWithGemini = async (
// 	videoUrl: string,
// 	duration_seconds: number,
// 	retries = 3
// ): Promise<VideoAnalysisResult> => {
// 	for (let attempt = 0; attempt < retries; attempt++) {
// 		try {
// 			const videoResponse = await axios.get(videoUrl, {
// 				responseType: "arraybuffer",
// 				maxContentLength: 50 * 1024 * 1024, // 50MB limit
// 				timeout: 30000,
// 			});

// 			const videoBase64 = Buffer.from(videoResponse.data).toString(
// 				"base64"
// 			);

// 			const payload = {
// 				contents: [
// 					{
// 						parts: [
// 							{
// 								text: `Analyze this ${duration_seconds}-second video and provide a detailed description of the visual content, focusing on key events, scene changes, and notable elements. Break down your analysis into ${Math.ceil(
// 									duration_seconds / 20
// 								)} segments, each covering up to 20 seconds of the video. For each segment, include timestamps for significant events.`,
// 							},
// 							{
// 								inlineData: {
// 									mimeType: "video/mp4",
// 									data: videoBase64,
// 								},
// 							},
// 						],
// 					},
// 				],
// 				generationConfig: {
// 					temperature: 0.4,
// 					topK: 32,
// 					topP: 1,
// 					maxOutputTokens: 4096,
// 				},
// 			};

// 			const response = await axios.post(
// 				`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${process.env.GOOGLE_API_KEY}`,
// 				payload,
// 				{
// 					headers: {
// 						"Content-Type": "application/json",
// 						"Accept-Encoding": "gzip, deflate",
// 					},
// 					maxContentLength: Infinity,
// 					maxBodyLength: Infinity,
// 					decompress: true,
// 				}
// 			);

// 			if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
// 				throw new Error("Invalid response format from Gemini API");
// 			}

// 			const analysisText =
// 				response.data.candidates[0].content.parts[0].text;
// 			const segments = analysisText
// 				.split(/Segment \d+:/g)
// 				.filter(Boolean)
// 				.map((segment: string) => segment.trim());

// 			return { segments, analysisText, responseData: response.data };
// 		} catch (error) {
// 			console.error(`Analysis attempt ${attempt + 1} failed:`, error);

// 			if (attempt === retries - 1) {
// 				return {
// 					segments: fallbackVideoAnalysis(duration_seconds),
// 					analysisText: null,
// 					responseData: null,
// 				};
// 			}

// 			await new Promise((resolve) =>
// 				setTimeout(resolve, 2000 * (attempt + 1))
// 			);
// 		}
// 	}

// 	throw new Error("Unexpected error in video analysis");
// };

export {};
