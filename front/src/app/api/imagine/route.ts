import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import g from "@/lib/gptScriptInstance";

const script = "app/api/run-script/story-book.gpt";

// export async function POST(request: NextRequest) {
// 	const { story, pages, path } = await request.json();

// 	// FIXME: Potential issue with new version fix (added to input): --disable-cache --credential-override "sys.openai:OPENAI_API_KEY"
// 	const opts: RunOpts = {
// 		disableCache: true,
// 		input: `${story ? ` --story ${story}` : ""} ${
// 			pages ? `--pages ${pages}` : ""
// 		} ${path ? `--path ${path}` : ""}`.trim(),
// 	};

// 	try {
// 		const encoder = new TextEncoder();
// 		const stream = new ReadableStream({
// 			async start(controller) {
// 				try {
// 					const run = await g.run(script, opts);

// 					// ----
// 					// TUTORIAL: Uncomment the line below to test the script with the input "Hello, World!", I recommend you to test it with the input "Hello, World!" to check your streaming is working correctly.
// 					//   const run = await g.run("https://get.gptscript.ai/echo.gpt", opts) // Test this with input: "Hello, World!" inside opts
// 					// ----

// 					run.on(RunEventType.Event, (data) => {
// 						controller.enqueue(
// 							encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
// 						);
// 					});

// 					await run.text();
// 					controller.close();
// 				} catch (error) {
// 					controller.error(error);
// 					console.log("ERROR", error);
// 				}
// 			},
// 		});

// 		return new Response(stream, {
// 			headers: {
// 				"Content-Type": "text/event-stream",
// 				"Cache-Control": "no-cache",
// 				Connection: "keep-alive",
// 			},
// 		});
// 	} catch (error) {
// 		return new Response(JSON.stringify({ error: error }), {
// 			status: 500,
// 		});
// 	}
// }

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
