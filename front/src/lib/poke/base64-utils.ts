// Remove the node-fetch import
// import fetch from "node-fetch";

/**
 * Converts an image URL to a Base64 string using browser APIs.
 * @param {string} imageUrl - The URL of the image to convert.
 * @returns {Promise<string>} - A promise that resolves to the Base64 string of the image.
 */
export async function convertFileToBase64(imageUrl: string): Promise<string> {
	try {
		const response = await fetch(imageUrl);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch image. Status: ${response.status}`
			);
		}
		const blob = await response.blob();
		return await blobToBase64(blob);
	} catch (error) {
		console.error("Error converting image to Base64:", error);
		throw new Error("Failed to convert image to Base64");
	}
}

/**
 * Converts a Blob to a Base64 string.
 * @param {Blob} blob - The Blob to convert.
 * @returns {Promise<string>} - A promise that resolves to the Base64 string.
 */
function blobToBase64(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => {
			reader.abort();
			reject(new Error("Failed to read the blob as Base64."));
		};
		reader.onload = () => {
			const result = reader.result as string;
			resolve(result);
		};
		reader.readAsDataURL(blob);
	});
}
