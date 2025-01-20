// // utils/trunasClient.ts
// import axios from "axios";
// import https from "https";

// const apiUrl = process.env.TRUENAS_API_URL;
// const apiKey = process.env.TRUENAS_API_KEY;

// console.log("TrueNAS API URL:", apiUrl);
// console.log("TrueNAS API Key:", apiKey ? "Set" : "Not set");

// const httpsAgent = new https.Agent({
// 	rejectUnauthorized: false, // Bypass SSL verification (not recommended for production)
// });

// const truenasClient = axios.create({
// 	baseURL: apiUrl,
// 	headers: {
// 		"Content-Type": "application/json",
// 		Authorization: `Bearer ${apiKey}`,
// 	},
// 	httpsAgent,
// });

// export const getTrueNASConfig = async () => {
// 	try {
// 		console.log("Attempting to fetch TrueNAS config...");
// 		const response = await truenasClient.get("/system/info/");
// 		console.log("TrueNAS response:", response.data);
// 		return response.data;
// 	} catch (error: any) {
// 		console.error(
// 			"TrueNAS Client Error:",
// 			error.response?.data || error.message
// 		);
// 		throw new Error(`Error fetching TrueNAS configuration: ${error}`);
// 	}
// };

// utils/trunasClient.ts
import axios from "axios";
import https from "https";

const apiUrl = process.env.TRUENAS_API_URL;
const apiKey = process.env.TRUENAS_API_KEY;

console.log("TrueNAS API URL:", apiUrl);
console.log("TrueNAS API Key:", apiKey ? "Set" : "Not set");

const httpsAgent = new https.Agent({
	rejectUnauthorized: false, // Bypass SSL verification (not recommended for production)
});

const truenasClient = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${apiKey}`,
	},
	httpsAgent,
});

export const getTrueNASConfig = async () => {
	try {
		console.log("Attempting to fetch TrueNAS config...");
		const [systemInfo, pools] = await Promise.all([
			truenasClient.get("/system/info/"),
			truenasClient.get("/pool/"),
		]);
		console.log("TrueNAS system info response:", systemInfo.data);
		console.log("TrueNAS pools response:", pools.data);
		return {
			systemInfo: systemInfo.data,
			pools: pools.data,
		};
	} catch (error: any) {
		console.error(
			"TrueNAS Client Error:",
			error.response?.data || error.message
		);
		throw new Error(`Error fetching TrueNAS configuration: ${error}`);
	}
};
