import axios, { type AxiosError, isAxiosError } from "axios";
import { ELEVENLABS_API_URL } from "../constants/elevenlabs";

export const generateAudioSegment = async (
	prompt: string,
	duration: number
): Promise<Buffer> => {
	const adjustedDuration = Math.max(duration, 0.5);

	try {
		const response = await axios.post(
			ELEVENLABS_API_URL,
			{
				text: prompt,
				duration_seconds: adjustedDuration,
				prompt_influence: 0.7,
			},
			{
				headers: {
					"xi-api-key": process.env.ELEVENLABS_API_KEY,
					"Content-Type": "application/json",
				},
				responseType: "arraybuffer",
			}
		);

		return Buffer.from(response.data);
	} catch (error) {
		if (isAxiosError(error)) {
			const axiosError = error as AxiosError;
			const errorData = axiosError.response?.data
				? JSON.parse(
						Buffer.from(
							axiosError.response.data as ArrayBuffer
						).toString()
					)
				: axiosError.message;
			throw new Error(
				`Audio generation failed: ${JSON.stringify(errorData)}`
			);
		}
		throw error;
	}
};
