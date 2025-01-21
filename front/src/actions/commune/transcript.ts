// og
// "use server";

// import {
//   AzureKeyCredential,
//   ChatRequestMessage,
//   OpenAIClient,
// } from "@azure/openai";

// async function transcript(prevState: any, formData: FormData) {
//   "use server";

//   const id = Math.random().toString(36);

//   console.log("PREVIOUS STATE:", prevState);
//   if (
//     process.env.AZURE_API_KEY === undefined ||
//     process.env.AZURE_ENDPOINT === undefined ||
//     process.env.AZURE_DEPLOYMENT_NAME === undefined ||
//     process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined
//   ) {
//     console.error("Azure credentials not set");
//     return {
//       sender: "",
//       response: "Azure credentials not set",
//     };
//   }

//   const file = formData.get("audio") as File;
//   if (file.size === 0) {
//     return {
//       sender: "",
//       response: "No audio file provided",
//     };
//   }

//   console.log(">>", file);

//   const arrayBuffer = await file.arrayBuffer();
//   const audio = new Uint8Array(arrayBuffer);

//   // ---   get audio transcription from Azure OpenAI Whisper ----

//   console.log("== Transcribe Audio Sample ==");

//   const client = new OpenAIClient(
//     process.env.AZURE_ENDPOINT,
//     new AzureKeyCredential(process.env.AZURE_API_KEY)
//   );

//   const result = await client.getAudioTranscription(
//     process.env.AZURE_DEPLOYMENT_NAME,
//     audio
//   );
//   console.log(`Transcription: ${result.text}`);

//   // ---   get chat completion from Azure OpenAI ----

//   const messages: ChatRequestMessage[] = [
//     {
//       role: "system",
//       content:
//         "You are a helpful assistant. You will answer questions and reply I cannot answer that if you dont know the answer.",
//     },
//     { role: "user", content: result.text },
//   ];

//   console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`);

//   const completions = await client.getChatCompletions(
//     process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME,
//     messages,
//     { maxTokens: 128 }
//   );

//   console.log("chatbot: ", completions.choices[0].message?.content);

//   const response = completions.choices[0].message?.content;

//   console.log(prevState.sender, "+++", result.text);
//   return {
//     sender: result.text,
//     response: response,
//     id: id,
//   };
// }

// export default transcript;

// entra
// "use server";

// import { AzureOpenAI } from "openai";
// import {
// 	DefaultAzureCredential,
// 	getBearerTokenProvider,
// } from "@azure/identity";

// async function transcript(prevState: any, formData: FormData) {
// 	const id = Math.random().toString(36);

// 	console.log("PREVIOUS STATE:", prevState);

// 	// Validate environment variables
// 	const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
// 	const deploymentName = process.env.AZURE_DEPLOYMENT_NAME;
// 	const apiVersion = "2024-08-01-preview"; // Ensure this matches your deployment's API version

// 	if (!endpoint || !deploymentName) {
// 		console.error("Azure OpenAI configuration is not set");
// 		return {
// 			sender: "",
// 			response: "Azure OpenAI configuration is not set",
// 		};
// 	}

// 	// Validate audio file from FormData
// 	const file = formData.get("audio") as File;
// 	if (!file || file.size === 0) {
// 		return {
// 			sender: "",
// 			response: "No audio file provided",
// 		};
// 	}

// 	console.log("Audio file received:", file);

// 	// Initialize Azure OpenAI client
// 	const credential = new DefaultAzureCredential();
// 	const scope = "https://cognitiveservices.azure.com/.default";
// 	const azureADTokenProvider = getBearerTokenProvider(credential, scope);

// 	const client = new AzureOpenAI({
// 		endpoint,
// 		azureADTokenProvider,
// 		apiVersion,
// 		deployment: deploymentName,
// 	});

// 	try {
// 		// Convert the audio file into a buffer
// 		const arrayBuffer = await file.arrayBuffer();
// 		const buffer = Buffer.from(arrayBuffer);

// 		// Transcribe audio
// 		const transcriptionResult = await client.audio.transcriptions.create({
// 			file: buffer,
// 			model: "whisper-1", // Ensure this matches your deployed model
// 		});

// 		console.log(`Transcription result: ${transcriptionResult.text}`);

// 		// Prepare chat completion messages
// 		const messages = [
// 			{
// 				role: "system",
// 				content:
// 					"You are a helpful assistant. If you don't know the answer to a question, respond with 'I cannot answer that.'",
// 			},
// 			{ role: "user", content: transcriptionResult.text },
// 		];

// 		console.log("Sending messages to OpenAI chat completion API...");

// 		// Get chat completion
// 		const chatCompletionResult = await client.chat.completions.create({
// 			messages,
// 			max_tokens: 128, // Adjust token limit as needed
// 		});

// 		const response =
// 			chatCompletionResult.choices[0].message?.content || "No response.";

// 		console.log("Chatbot response:", response);

// 		return {
// 			sender: transcriptionResult.text,
// 			response: response,
// 			id: id,
// 		};
// 	} catch (error) {
// 		console.error("Error during transcription or chat completion:", error);
// 		return {
// 			sender: "",
// 			response: "An error occurred while processing the request.",
// 		};
// 	}
// }

// export default transcript;

// api key
// "use server";

// import { AzureOpenAI } from "openai";
// import { type Completion } from "openai/resources/index";

// // Environment variables
// const endpoint = process.env["AZURE_ENDPOINT"] || "<endpoint>";
// const apiKey = process.env["AZURE_API_KEY"] || "<api key>";
// const apiVersion = "2024-08-01-preview";
// // const deploymentName = "whisper-1"; // Update with your Whisper model deployment name
// const deploymentName = process.env.AZURE_DEPLOYMENT_NAME as string;
// // const chatDeploymentName = "gpt-35-turbo-instruct"; // Update with your Chat model deployment name
// const chatDeploymentName = process.env
// 	.AZURE_DEPLOYMENT_COMPLETIONS_NAME as string;

// function getClient(): AzureOpenAI {
// 	return new AzureOpenAI({
// 		endpoint,
// 		apiKey,
// 		apiVersion,
// 		deployment: deploymentName,
// 	});
// }

// async function transcribeAudio(
// 	client: AzureOpenAI,
// 	file: File
// ): Promise<string> {
// 	const arrayBuffer = await file.arrayBuffer();
// 	const buffer = Buffer.from(arrayBuffer);

// 	console.log("Sending audio file for transcription...");

// 	const transcriptionResult = await client.audio.transcriptions.create({
// 		file: buffer,
// 		model: deploymentName,
// 	});

// 	console.log("Transcription result:", transcriptionResult.text);

// 	return transcriptionResult.text;
// }

// async function getChatCompletion(
// 	client: AzureOpenAI,
// 	transcription: string
// ): Promise<Completion> {
// 	console.log("Sending transcription for chat completion...");

// 	const messages = [
// 		{ role: "system", content: "You are a helpful assistant." },
// 		{ role: "user", content: transcription },
// 	];

// 	const chatResult = await client.chat.completions.create({
// 		model: chatDeploymentName,
// 		messages,
// 		max_tokens: 128,
// 	});

// 	return chatResult;
// }

// async function printChoices(completion: Completion): Promise<void> {
// 	for (const choice of completion.choices) {
// 		console.log(choice.message?.content || "No content.");
// 	}
// }

// export async function transcript(formData: FormData) {
// 	if (!endpoint || !apiKey) {
// 		throw new Error("Azure OpenAI endpoint or API key is not configured.");
// 	}

// 	const file = formData.get("audio") as File;
// 	if (!file || file.size === 0) {
// 		return { sender: "", response: "No audio file provided" };
// 	}

// 	console.log("Audio file received:", file);

// 	try {
// 		const client = getClient();

// 		// Transcribe audio
// 		const transcription = await transcribeAudio(client, file);

// 		// Get chat completion
// 		const completion = await getChatCompletion(client, transcription);

// 		// Extract response
// 		const response =
// 			completion.choices[0]?.message?.content || "No response.";

// 		return {
// 			sender: transcription,
// 			response,
// 		};
// 	} catch (error) {
// 		console.error("Error occurred:", error);
// 		return {
// 			sender: "",
// 			response: "An error occurred during processing.",
// 		};
// 	}
// }

"use server";

import { AzureOpenAI } from "openai";

// Environment variables
const endpoint = process.env["AZURE_ENDPOINT"] || process.env.AZURE_ENDPOINT;
const apiKey = process.env["AZURE_API_KEY"] || process.env.AZURE_API_KEY;
const apiVersion = "2024-08-01-preview";
// const audioModel = "whisper-1"; // Update with your Whisper model deployment name
const audioModel = process.env.AZURE_DEPLOYMENT_NAME as string;
// const chatModel = "gpt-35-turbo-instruct"; // Update with your Chat model deployment name
const chatModel = process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME as string;

function getClient(): AzureOpenAI {
	return new AzureOpenAI({
		endpoint,
		apiKey,
		apiVersion,
	});
}

async function transcribeAudio(
	client: AzureOpenAI,
	file: File
): Promise<string> {
	console.log("Sending audio file for transcription...");

	const transcriptionResult = await client.audio.transcriptions.create({
		file, // Pass the `File` object directly
		model: audioModel,
	});

	console.log("Transcription result:", transcriptionResult.text);
	return transcriptionResult.text;
}

async function getChatCompletion(
	client: AzureOpenAI,
	transcription: string
): Promise<string> {
	console.log("Sending transcription for chat completion...");

	// Ensure messages conform to the strict type requirements
	const messages: Array<{
		role: "system" | "user" | "assistant";
		content: string;
		name?: string;
	}> = [
		{
			role: "system",
			content: "You are a helpful assistant.",
		},
		{
			role: "user",
			content: transcription,
		},
	];

	const chatResult = await client.chat.completions.create({
		model: chatModel,
		messages,
		max_tokens: 128,
	});

	console.log("Chat completion result:", chatResult);

	const response = chatResult.choices[0]?.message?.content;
	if (!response) {
		throw new Error("No response received from the chat model.");
	}

	return response;
}

export async function transcript(formData: FormData) {
	if (!endpoint || !apiKey) {
		throw new Error("Azure OpenAI endpoint or API key is not configured.");
	}

	const file = formData.get("audio") as File;
	if (!file || file.size === 0) {
		return { sender: "", response: "No audio file provided" };
	}

	try {
		const client = getClient();

		// Step 1: Transcribe audio
		const transcription = await transcribeAudio(client, file);

		// Step 2: Get chat completion based on transcription
		const chatResponse = await getChatCompletion(client, transcription);

		return {
			sender: transcription,
			response: chatResponse,
		};
	} catch (error) {
		console.error("Error during processing:", error);
		return {
			sender: "",
			response: "An error occurred during processing.",
		};
	}
}
