import { NextRequest, NextResponse } from "next/server";
import { Ollama } from "ollama";

const OLLAMA_HOST =
	process.env.OLLAMA_HOST ||
	"http://ec2-184-169-229-241.us-west-1.compute.amazonaws.com:7869";

const ollamaClient = new Ollama({
	host: OLLAMA_HOST,
});

export async function POST(request: NextRequest) {
	const requestId = crypto.randomUUID();
	console.log(`[${requestId}] New request received`);

	try {
		const body = await request.json();
		console.log(`[${requestId}] Request body:`, {
			promptLength: body.prompt.length,
			streaming: body.stream,
			temperature: body.temperature,
		});

		if (body.stream) {
			console.log(`[${requestId}] Starting streaming response`);
			const encoder = new TextEncoder();
			const customStream = new TransformStream();
			const writer = customStream.writable.getWriter();

			(async () => {
				try {
					const response = await fetch(
						`${OLLAMA_HOST}/api/generate`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								model: "llama3-groq-tool-use",
								prompt: body.prompt,
								stream: true,
								options: {
									temperature: body.temperature || 0.7,
								},
							}),
						}
					);

					console.log(`[${requestId}] Stream connected to Ollama`);
					const reader = response.body?.getReader();
					if (!reader) throw new Error("No reader available");

					let responseCount = 0;
					let startTime = Date.now();

					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						const chunk = new TextDecoder().decode(value);
						console.log(
							`[${requestId}] Received chunk ${responseCount + 1}`
						);

						const lines = chunk
							.split("\n")
							.filter((line) => line.trim());
						for (const line of lines) {
							try {
								const data = JSON.parse(line);
								responseCount++;

								const message = {
									content: data.response,
									timestamp: Date.now(),
									chunkNumber: responseCount,
									metrics: {
										elapsedMs: Date.now() - startTime,
										tokensPerSecond:
											responseCount /
											((Date.now() - startTime) / 1000),
									},
								};

								await writer.write(
									encoder.encode(
										`data: ${JSON.stringify(message)}\n\n`
									)
								);
							} catch (e) {
								console.error(
									`[${requestId}] Error parsing line:`,
									e
								);
							}
						}
					}
				} catch (error) {
					console.error(`[${requestId}] Streaming error:`, error);
					await writer.write(
						encoder.encode(
							`data: ${JSON.stringify({
								error:
									error instanceof Error
										? error.message
										: "Stream processing failed",
								timestamp: Date.now(),
							})}\n\n`
						)
					);
				} finally {
					console.log(`[${requestId}] Stream completed`);
					await writer.close();
				}
			})();

			return new Response(customStream.readable, {
				headers: {
					"Content-Type": "text/event-stream",
					"Cache-Control": "no-cache",
					Connection: "keep-alive",
				},
			});
		}

		// Non-streaming request handling
		console.log(`[${requestId}] Processing non-streaming request`);
		const response = await ollamaClient.chat({
			model: "llama3-groq-tool-use",
			messages: [{ role: "user", content: body.prompt }],
			options: { temperature: body.temperature || 0.7 },
		});

		console.log(`[${requestId}] Request completed successfully`);
		return NextResponse.json({
			content: response.message.content,
			model: "llama3-groq-tool-use",
			created_at: new Date().toISOString(),
			metrics: {
				processingTime: Date.now(),
				promptTokens: response.prompt_eval_count,
				completionTokens: response.eval_count,
			},
		});
	} catch (error) {
		console.error(`[${requestId}] API Error:`, error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "An unknown error occurred",
				timestamp: Date.now(),
			},
			{ status: 500 }
		);
	}
}
