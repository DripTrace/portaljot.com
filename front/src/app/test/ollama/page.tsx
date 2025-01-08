"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";
import "katex/dist/katex.min.css";

export default function Chat() {
	const [prompt, setPrompt] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [streaming, setStreaming] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);

	// Refs for managing timers and state
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const startTimeRef = useRef<number | null>(null);
	const lastChunkTimeRef = useRef<number | null>(null);
	const noNewChunksTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Cleanup timers on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
			if (noNewChunksTimeoutRef.current)
				clearTimeout(noNewChunksTimeoutRef.current);
		};
	}, []);

	// Timer management functions
	const startTimer = () => {
		startTimeRef.current = Date.now();
		lastChunkTimeRef.current = Date.now();
		setElapsedTime(0);
		timerRef.current = setInterval(() => {
			if (startTimeRef.current) {
				setElapsedTime(
					Math.floor((Date.now() - startTimeRef.current) / 1000)
				);
			}
		}, 1000);
	};

	const stopTimer = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		if (noNewChunksTimeoutRef.current) {
			clearTimeout(noNewChunksTimeoutRef.current);
			noNewChunksTimeoutRef.current = null;
		}
		if (startTimeRef.current) {
			setElapsedTime(
				Math.floor((Date.now() - startTimeRef.current) / 1000)
			);
		}
		startTimeRef.current = null;
		lastChunkTimeRef.current = null;
	};

	const checkStreamComplete = () => {
		if (noNewChunksTimeoutRef.current) {
			clearTimeout(noNewChunksTimeoutRef.current);
		}

		noNewChunksTimeoutRef.current = setTimeout(() => {
			if (Date.now() - (lastChunkTimeRef.current || 0) > 1000) {
				stopTimer();
				setLoading(false);
			}
		}, 1000);
	};

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	// Custom Markdown components with styling
	const components: Components = {
		code(props) {
			const { className, children, ...rest } = props;
			const match = /language-(\w+)/.exec(className || "");

			if ("inline" in rest) {
				return rest.inline ? (
					<code
						className="bg-gray-100 text-gray-800 px-1 rounded"
						{...rest}
					>
						{children}
					</code>
				) : (
					<pre className="bg-gray-800 text-white p-4 rounded">
						<code className={className} {...rest}>
							{children}
						</code>
					</pre>
				);
			}

			return (
				<pre className="bg-gray-800 text-white p-4 rounded">
					<code className={className} {...rest}>
						{children}
					</code>
				</pre>
			);
		},
		a(props) {
			const { className, children, ...rest } = props;
			return (
				<a
					className={`text-blue-600 hover:text-blue-800 ${className || ""}`}
					target="_blank"
					rel="noopener noreferrer"
					{...rest}
				>
					{children}
				</a>
			);
		},
		table(props) {
			const { className, children, ...rest } = props;
			return (
				<table
					className={`border-collapse border border-gray-300 my-4 ${className || ""}`}
					{...rest}
				>
					{children}
				</table>
			);
		},
		th(props) {
			const { className, children, ...rest } = props;
			return (
				<th
					className={`border border-gray-300 px-4 py-2 bg-gray-100 ${className || ""}`}
					{...rest}
				>
					{children}
				</th>
			);
		},
		td(props) {
			const { className, children, ...rest } = props;
			return (
				<td
					className={`border border-gray-300 px-4 py-2 ${className || ""}`}
					{...rest}
				>
					{children}
				</td>
			);
		},
		// Fix for LaTeX display mode
		p(props) {
			const { children } = props;
			// Check if the paragraph contains only a display math element
			if (
				typeof children === "string" &&
				children.startsWith("$$") &&
				children.endsWith("$$")
			) {
				return <div className="my-4">{children}</div>;
			}
			return <p {...props}>{children}</p>;
		},
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResponse("");

		console.log("Starting request with prompt:", prompt.slice(0, 100));

		let accumulatedResponse = "";
		let isFirstChunk = true;

		if (streaming) {
			try {
				const response = await fetch("/api/generate/text/ollama", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						prompt,
						temperature: 0.7,
						stream: true,
					}),
				});

				const reader = response.body?.getReader();
				const decoder = new TextDecoder();

				if (reader) {
					if (isFirstChunk) {
						startTimer();
						isFirstChunk = false;
						console.log("Stream started");
					}

					while (true) {
						const { done, value } = await reader.read();

						if (done) {
							console.log("Stream complete");
							stopTimer();
							setLoading(false);
							break;
						}

						const chunk = decoder.decode(value);
						console.log("Received chunk:", chunk.slice(0, 50));

						const lines = chunk.split("\n");
						for (const line of lines) {
							if (line.startsWith("data: ")) {
								try {
									const data = JSON.parse(line.slice(6));
									if (data.error) {
										console.error(
											"Stream error:",
											data.error
										);
										setError(data.error);
										stopTimer();
									} else if (data.content) {
										accumulatedResponse += data.content;
										setResponse(accumulatedResponse);
										lastChunkTimeRef.current = Date.now();
										checkStreamComplete();
										console.log(
											"Updated response length:",
											accumulatedResponse.length
										);
									}
								} catch (e) {
									console.error(
										"Error parsing SSE message:",
										e
									);
								}
							}
						}
					}
				}
			} catch (err) {
				console.error("Streaming error:", err);
				setError(
					err instanceof Error
						? err.message
						: "Stream processing failed"
				);
				stopTimer();
				setLoading(false);
			}
		} else {
			try {
				console.log("Starting non-streaming request");
				const res = await fetch("/api/generate/text/ollama", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						prompt,
						temperature: 0.7,
					}),
				});

				const data = await res.json();
				console.log("Received response:", data);

				if (!res.ok) {
					throw new Error(data.error || "Failed to get response");
				}
				setResponse(data.content);
			} catch (err) {
				console.error("Request error:", err);
				setError(
					err instanceof Error ? err.message : "An error occurred"
				);
			} finally {
				stopTimer();
				setLoading(false);
			}
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<textarea
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					className="w-full p-2 border rounded"
					rows={4}
					placeholder="Ask anything... Use LaTeX notation for formulas: inline ($...$) or block ($$...$$)"
				/>
				<div className="flex items-center gap-4">
					<button
						type="submit"
						disabled={loading}
						className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
					>
						{loading ? "Thinking..." : "Send"}
					</button>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={streaming}
							onChange={(e) => setStreaming(e.target.checked)}
						/>
						Stream response
					</label>
					{loading && (
						<span className="text-gray-600">
							Time elapsed: {formatTime(elapsedTime)}
						</span>
					)}
				</div>
			</form>

			{error && (
				<div className="mt-4 p-4 border rounded bg-red-50 text-red-500">
					{error}
				</div>
			)}

			{response && (
				<div className="mt-4">
					{!loading && elapsedTime > 0 && (
						<div className="mb-2 text-sm text-gray-600">
							Generated in {formatTime(elapsedTime)}
						</div>
					)}
					<div className="p-4 border rounded bg-gray-50 prose prose-slate max-w-none">
						<ReactMarkdown
							remarkPlugins={[remarkGfm, remarkMath]}
							rehypePlugins={[rehypeKatex]}
							components={components}
						>
							{response}
						</ReactMarkdown>
					</div>
				</div>
			)}
		</div>
	);
}
