"use client";

import { useState } from "react";

export default function ImageUpload() {
	const [progress, setProgress] = useState<number>(0);
	const [uploading, setUploading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		setUploading(true);

		try {
			// Upload to Next.js API route first
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) throw new Error("Upload failed");

			// Poll for progress
			const uploadId = await response.json();
			const progressInterval = setInterval(async () => {
				const progressResponse = await fetch(
					`/api/upload/progress?id=${uploadId}`
				);
				const { progress } = await progressResponse.json();
				setProgress(progress);

				if (progress === 100) {
					clearInterval(progressInterval);
				}
			}, 1000);
		} catch (error) {
			console.error("Upload failed:", error);
		} finally {
			setUploading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="file"
				name="image"
				accept="image/*"
				disabled={uploading}
			/>
			{uploading && (
				<div>
					<progress value={progress} max="100" />
					<span>{progress}%</span>
				</div>
			)}
			<button type="submit" disabled={uploading}>
				{uploading ? "Uploading..." : "Upload"}
			</button>
		</form>
	);
}
