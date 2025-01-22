import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import g from "@/lib/imagine/gptScriptInstance";

const script = "app/api/imagine/run-script/story-book.gpt";

export async function POST(request: NextRequest) {
	const { story, pages, path } = await request.json();

	const opts: RunOpts = {
		disableCache: true,
		// input: `--story "${story}" --pages ${pages} --path "${path}"`,
		input: `${story ? ` --story ${story}` : ""} ${
			pages ? `--pages ${pages}` : ""
		} ${path ? `--path ${path}` : ""}`.trim(),
	};

	try {
		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				try {
					const run = await g.run(script, opts);

					run.on(RunEventType.Event, (data) => {
						controller.enqueue(
							encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
						);
					});

					// run.on(RunEventType.Event, (error) => {
					// 	controller.error(error);
					// });

					await run.text();
					controller.close();
				} catch (error) {
					controller.error(error);
					console.error("Stream Error:", error);
				}
			},
			cancel() {
				// Handle stream cancellation
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("Handler Error:", error);
		return new Response(
			JSON.stringify({
				error: (error as Error).message || "Internal Server Error",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
