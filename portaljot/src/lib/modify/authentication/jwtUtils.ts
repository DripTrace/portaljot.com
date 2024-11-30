// import axios from "axios";
// import jwt, { type JwtPayload } from "jsonwebtoken";

// export namespace JwtUtils {
// 	// export const isJwtExpired = (token: string): boolean => {
// 	// 	// offset by 60 seconds, so we will check if the token is "almost expired".
// 	// 	const currentTime = Math.round(Date.now() / 1000 + 60);
// 	// 	const decoded = jwt.decode(token) as JwtPayload | null;

// 	// 	console.log("TOKEN INFO[JWTUTILS]: ", token, "\nDECODED: ", decoded);

// 	// 	if (!decoded || typeof decoded === "string") {
// 	// 		console.log(
// 	// 			'Token decoding failed or "exp" property is not available.'
// 	// 		);
// 	// 		return true;
// 	// 	}

// 	// 	if (!decoded.exp) {
// 	// 		console.log('Token does not have an "exp" property.');
// 	// 		return true;
// 	// 	}

// 	// 	console.log(
// 	// 		`Current time + 60 seconds: ${new Date(currentTime * 1000)}`
// 	// 	);
// 	// 	console.log(`Token lifetime: ${new Date(decoded.exp * 1000)}`);

// 	// 	const adjustedExpiry = decoded.exp;

// 	// 	if (adjustedExpiry < currentTime) {
// 	// 		console.log("Token expired");
// 	// 		return true;
// 	// 	}

// 	// 	console.log("Token has not expired yet");
// 	// 	return false;
// 	// };

// 	export const isJwtExpired = async (token: string): Promise<boolean> => {
// 		try {
// 			// Use Google's tokeninfo endpoint to check the token
// 			const response = await axios.get(
// 				`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
// 			);

// 			console.log("GOOGLE AUTH ENDPOINT[JWTUTILS]: ", { ...response });
// 			// 	// offset by 60 seconds, so we will check if the token is "almost expired".
// 			const currentTime = Math.round(Date.now() / 1000 + 60);
// 			console.log(
// 				`Current time + 60 seconds: ${new Date(currentTime * 1000)}`
// 			);

// 			const adjustedExpiry = response.data.exp;

// 			console.log(`Token lifetime: ${new Date(adjustedExpiry * 1000)}`);

// 			if (adjustedExpiry < currentTime) {
// 				console.log("Token expired");
// 				return true;
// 			}
// 			return false;

// 			// const expiresIn = response.data.expires_in;

// 			// Token is considered expired if it expires in less than 5 minutes
// 			// return parseInt(expiresIn) < 300;
// 		} catch (error) {
// 			console.error("Error checking token expiration:", error);
// 			// If there's an error, assume the token is expired
// 			return true;
// 		}
// 	};
// }

// // Modify the JwtUtils class
// // export class JwtUtils {
// // 	static async isTokenExpired(token: string): Promise<boolean> {
// // 		try {
// // 			// Use Google's tokeninfo endpoint to check the token
// // 			const response = await axios.get(
// // 				`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
// // 			);
// // 			const expiresIn = response.data.expires_in;

// // 			// Token is considered expired if it expires in less than 5 minutes
// // 			return parseInt(expiresIn) < 300;
// // 		} catch (error) {
// // 			console.error("Error checking token expiration:", error);
// // 			// If there's an error, assume the token is expired
// // 			return true;
// // 		}
// // 	}
// // }

// export namespace UrlUtils {
// 	export const makeUrl = (...endpoints: string[]): string => {
// 		let url = endpoints.reduce((prevUrl, currentPath) => {
// 			if (prevUrl.length === 0) {
// 				return prevUrl + currentPath;
// 			}

// 			return prevUrl.endsWith("/")
// 				? prevUrl + currentPath + "/"
// 				: prevUrl + "/" + currentPath + "/";
// 		}, "");
// 		return url;
// 	};
// }

import axios from "axios";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const isJwtExpired = async (token: string): Promise<boolean> => {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
		);

		console.log("GOOGLE AUTH ENDPOINT[JWTUTILS]: ", { ...response });
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
