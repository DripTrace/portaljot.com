import axios from "axios";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const isJwtExpired = async (token: string): Promise<boolean> => {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
		);

		console.log("GOOGLE AUTH ENDPOINT[JWTUTILS]: ", { ...response.data });
		const currentTime = Math.round(Date.now() / 1000 + 60);
		console.log(
			`Current time + 60 seconds: ${new Date(currentTime * 1000)}`
		);

		const adjustedExpiry = response.data.exp;
		console.log(`Token lifetime: ${new Date(adjustedExpiry * 1000)}`);

		if (adjustedExpiry < currentTime) {
			console.log("Token expired");
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error checking token expiration:", error);
		return true;
	}
};

export const makeUrl = (...endpoints: string[]): string => {
	const url = endpoints.reduce((prevUrl, currentPath) => {
		if (prevUrl.length === 0) {
			return prevUrl + currentPath;
		}

		return prevUrl.endsWith("/")
			? prevUrl + currentPath + "/"
			: prevUrl + "/" + currentPath + "/";
	}, "");
	return url;
};
