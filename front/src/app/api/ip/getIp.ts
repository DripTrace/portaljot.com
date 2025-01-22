import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

interface CloudflareResponse {
	result?: {
		ip?: string;
	};
}

const getPublicIpInfo = async (token: string): Promise<any> => {
	try {
		const response = await fetch(
			"https://api.cloudflare.com/client/v4/user/tokens/verify",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch public IP info: ${response.statusText}`
			);
		}

		const data = (await response.json()) as CloudflareResponse;
		const ip = data?.result?.ip; // Extract IP address from response

		if (ip) {
			console.log(`Attempting to fetch IP info for IP: ${ip}`);
			const geoResponse = await fetch(
				`https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_TOKEN}`
			);
			if (!geoResponse.ok) {
				const errorText = await geoResponse.text();
				throw new Error(
					`ipinfo.io fetch failed: ${geoResponse.statusText} - ${errorText}`
				);
			}
			const geoData = await geoResponse.json();
			console.log("Fetched IP info from ipinfo.io:", geoData);
			return geoData;
		}

		return null;
	} catch (error) {
		console.error(
			`Error fetching public IP info: ${(error as Error).message}`
		);
		return null;
	}
};

export default async function getIp(req: NextApiRequest, res: NextApiResponse) {
	try {
		const cloudflareToken =
			process.env.CLOUDFLARE_NEXUSCONJURECOM_API_TOKEN;
		if (!cloudflareToken) {
			throw new Error(
				"CLOUDFLARE_API_TOKEN environment variable is not set."
			);
		}
		const ipinfoToken = process.env.IPINFO_API_TOKEN;
		if (!ipinfoToken) {
			throw new Error(
				"IPINFO_API_TOKEN environment variable is not set."
			);
		}

		const publicIpInfo = await getPublicIpInfo(cloudflareToken);

		if (!publicIpInfo) {
			res.status(500).json({ error: "Unable to determine IP address" });
			return;
		}

		res.status(200).json(publicIpInfo);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
}
