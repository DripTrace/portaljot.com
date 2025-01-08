import axios from "axios";

export const isJwtExpired = async (token: string): Promise<boolean> => {
	if (!token) return true;

	try {
		const response = await axios.get(
			"https://www.googleapis.com/oauth2/v3/tokeninfo",
			{
				params: { access_token: token },
			}
		);

		const expiresIn = parseInt(response.data.expires_in);
		return expiresIn <= 0;
	} catch (error) {
		console.error("Error checking token:", error);
		return true;
	}
};

export const makeUrl = (...parts: string[]): string => {
	return parts.map((part) => part.replace(/^\/+|\/+$/g, "")).join("/");
};

export const refreshToken = async (
	refreshToken: string
): Promise<[string | null, string | null]> => {
	try {
		const response = await axios.post(
			makeUrl(
				process.env.BACKEND_API_BASE || "",
				"api",
				"auth",
				"token",
				"refresh"
			),
			{ refresh: refreshToken },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const { access, refresh } = response.data;
		return [access, refresh];
	} catch (error) {
		console.error("Error refreshing token:", error);
		return [null, null];
	}
};
