"use client";

import { useState } from "react";
import Image from "next/image";
import {
	DallE3Options,
	GenerationOptions,
	ImagenOptions,
} from "@/types/modify/imggen";

const IMAGEN_STYLES = [
	"photograph",
	"digital_art",
	"landscape",
	"sketch",
	"watercolor",
	"cyberpunk",
	"pop_art",
] as const;

export default function ImageGenerator() {
	const [options, setOptions] = useState<GenerationOptions>({
		model: "dalle3",
		prompt: "",
		size: "1024x1024",
		quality: "standard",
		style: "vivid",
	});

	const [usePreDefinedStyles, setUsePreDefinedStyles] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [safetyAttributes, setSafetyAttributes] = useState<any>(null);

	const handleModelChange = (model: "dalle3" | "imagen") => {
		if (model === "dalle3") {
			setOptions({
				model: "dalle3",
				prompt: options.prompt,
				size: "1024x1024",
				quality: "standard",
				style: "vivid",
			});
			setUsePreDefinedStyles(false);
		} else {
			setOptions({
				model: "imagen",
				prompt: options.prompt,
				sampleCount: 1,
				aspectRatio: "1:1",
				outputOptions: {
					mimeType: "image/png",
					// compressionQuality: 100,
				},
				safetySetting: "block_medium_and_above",
				addWatermark: false,
				personGeneration: "allow_all",
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSafetyAttributes(null);

		try {
			const requestOptions = {
				...options,
				...(usePreDefinedStyles && {
					sampleImageStyle:
						(options as ImagenOptions).sampleImageStyle ||
						"photograph",
				}),
			};

			const response = await fetch("/api/generate/image", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestOptions),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to generate image");
			}

			const data = await response.json();
			setImageUrl(data.imageUrl);
			if (data.safetyAttributes) {
				setSafetyAttributes(data.safetyAttributes);
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-4 space-y-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Model Selection */}
				<div>
					<label className="block text-sm font-medium">
						Model Selection
					</label>
					<select
						value={options.model}
						onChange={(e) =>
							handleModelChange(
								e.target.value as "dalle3" | "imagen"
							)
						}
						className="w-full rounded-md border-gray-300 shadow-sm"
					>
						<option value="dalle3">DALL-E 3</option>
						<option value="imagen">Google Imagen</option>
					</select>
				</div>

				{/* Prompt */}
				<div>
					<label className="block text-sm font-medium">Prompt</label>
					<textarea
						value={options.prompt}
						onChange={(e) =>
							setOptions({ ...options, prompt: e.target.value })
						}
						className="w-full rounded-md border-gray-300 shadow-sm"
						rows={3}
						required
					/>
				</div>

				{options.model === "imagen" && (
					<div className="mb-4">
						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={usePreDefinedStyles}
								onChange={(e) => {
									setUsePreDefinedStyles(e.target.checked);
									if (e.target.checked) {
										setOptions({
											...options,
											sampleImageStyle: "photograph",
										} as ImagenOptions);
									} else {
										setOptions({
											...options,
											sampleImageStyle: undefined,
										} as ImagenOptions);
									}
								}}
								className="rounded border-gray-300"
							/>
							<span className="text-sm font-medium">
								Use Pre-defined Styles
							</span>
						</label>
					</div>
				)}

				{options.model === "dalle3" ? (
					<div className="grid grid-cols-3 gap-4">
						{/* DALL-E Options */}
						<div>
							<label className="block text-sm font-medium">
								Size
							</label>
							<select
								value={(options as DallE3Options).size}
								onChange={(e) =>
									setOptions({
										...options,
										size: e.target.value,
									} as DallE3Options)
								}
								className="w-full rounded-md border-gray-300 shadow-sm"
							>
								<option value="1024x1024">Square</option>
								<option value="1024x1792">Portrait</option>
								<option value="1792x1024">Landscape</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium">
								Quality
							</label>
							<select
								value={(options as DallE3Options).quality}
								onChange={(e) =>
									setOptions({
										...options,
										quality: e.target.value,
									} as DallE3Options)
								}
								className="w-full rounded-md border-gray-300 shadow-sm"
							>
								<option value="standard">Standard</option>
								<option value="hd">HD</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium">
								Style
							</label>
							<select
								value={(options as DallE3Options).style}
								onChange={(e) =>
									setOptions({
										...options,
										style: e.target.value,
									} as DallE3Options)
								}
								className="w-full rounded-md border-gray-300 shadow-sm"
							>
								<option value="vivid">Vivid</option>
								<option value="natural">Natural</option>
							</select>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-2 gap-4">
						{usePreDefinedStyles && (
							<div>
								<label className="block text-sm font-medium">
									Image Style
								</label>
								<select
									value={
										(options as ImagenOptions)
											.sampleImageStyle
									}
									onChange={(e) =>
										setOptions({
											...options,
											sampleImageStyle: e.target.value,
										} as ImagenOptions)
									}
									className="w-full rounded-md border-gray-300 shadow-sm"
								>
									{IMAGEN_STYLES.map((style) => (
										<option key={style} value={style}>
											{style.charAt(0).toUpperCase() +
												style
													.slice(1)
													.replace("_", " ")}
										</option>
									))}
								</select>
							</div>
						)}
						<div>
							<label className="block text-sm font-medium">
								Sample Count
							</label>
							<input
								type="number"
								min={1}
								max={4}
								value={(options as ImagenOptions).sampleCount}
								onChange={(e) =>
									setOptions({
										...options,
										sampleCount: parseInt(e.target.value),
									} as ImagenOptions)
								}
								className="w-full rounded-md border-gray-300 shadow-sm"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium">
								Aspect Ratio
							</label>
							<select
								value={(options as ImagenOptions).aspectRatio}
								onChange={(e) =>
									setOptions({
										...options,
										aspectRatio: e.target.value,
									} as ImagenOptions)
								}
								className="w-full rounded-md border-gray-300 shadow-sm"
							>
								<option value="1:1">Square (1:1)</option>
								<option value="16:9">Landscape (16:9)</option>
								<option value="9:16">Portrait (9:16)</option>
								<option value="4:3">Standard (4:3)</option>
								<option value="3:4">Portrait (3:4)</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium">
								Safety Setting
							</label>
							<select
								value={(options as ImagenOptions).safetySetting}
								onChange={(e) =>
									setOptions({
										...options,
										safetySetting: e.target.value,
									} as ImagenOptions)
								}
								className="w-full rounded-md border-gray-300 shadow-sm"
							>
								<option value="block_medium_and_above">
									Default
								</option>
								<option value="block_low_and_above">
									Strongest Filtering
								</option>
								<option value="block_only_high">
									Reduced Blocking
								</option>
								{/* <option value="block_none">
									Minimal Blocking
								</option> */}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium">
								Negative Prompt
							</label>
							<textarea
								value={
									(options as ImagenOptions).negativePrompt ||
									""
								}
								onChange={(e) =>
									setOptions({
										...options,
										negativePrompt: e.target.value,
									} as ImagenOptions)
								}
								className="w-full rounded-md border-gray-300 shadow-sm"
								rows={2}
							/>
						</div>
					</div>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? "Generating..." : "Generate Image"}
				</button>
			</form>

			{error && <div className="text-red-500 text-sm mt-2">{error}</div>}

			{imageUrl && (
				<div className="relative aspect-square w-full max-w-lg mx-auto mt-4">
					<Image
						src={imageUrl}
						alt="Generated image"
						fill
						className="rounded-lg object-contain"
						priority
					/>
				</div>
			)}

			{safetyAttributes && (
				<div className="mt-4 p-4 bg-gray-50 rounded-md">
					<h3 className="text-sm font-medium mb-2">
						Safety Attributes
					</h3>
					<div className="grid grid-cols-2 gap-2">
						{safetyAttributes.categories.map(
							(category: string, index: number) => (
								<div key={category} className="text-xs">
									{category}: {safetyAttributes.scores[index]}
								</div>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
}
