// import { NextApiRequest, NextApiResponse } from "next";
// import fetch from "node-fetch";

// const fetchIpInfoFromIpInfo = async (ip: string): Promise<any> => {
// 	const response = await fetch(
// 		`https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_TOKEN}`
// 	);
// 	if (!response.ok) {
// 		throw new Error(`ipinfo.io fetch failed: ${response.statusText}`);
// 	}
// 	return response.json();
// };

// const fetchBackupIpInfo = async (ip: string): Promise<any> => {
// 	const response = await fetch(`https://freegeoip.app/json/${ip}`);
// 	if (!response.ok) {
// 		throw new Error(`freegeoip.app fetch failed: ${response.statusText}`);
// 	}
// 	return response.json();
// };

// const getIp = async (req: NextApiRequest, res: NextApiResponse) => {
// 	let errors: string[] = [];
// 	let logs: string[] = [];

// 	try {
// 		let ip =
// 			(req.headers["cf-connecting-ip"] as string) ||
// 			(req.socket.remoteAddress as string);

// 		if (!ip || ip === "::1") {
// 			try {
// 				logs.push("Trying to fetch IP from ipify");
// 				const ipifyResponse = await fetch(
// 					"https://api.ipify.org?format=json"
// 				);
// 				if (!ipifyResponse.ok) {
// 					throw new Error(
// 						`ipify fetch failed: ${ipifyResponse.statusText}`
// 					);
// 				}
// 				const ipifyData = await ipifyResponse.json();
// 				ip = ipifyData.ip;
// 				logs.push(`Fetched IP from ipify: ${ip}`);
// 			} catch (error) {
// 				const errorMessage =
// 					error instanceof Error ? error.message : "Unknown error";
// 				errors.push(`ipify fetch failed: ${errorMessage}`);
// 			}
// 		}

// 		let ipInfoData = null;
// 		let method = "ipinfo.io";

// 		try {
// 			if (ip) {
// 				logs.push("Trying to fetch IP info from ipinfo.io");
// 				ipInfoData = await fetchIpInfoFromIpInfo(ip);
// 				logs.push(
// 					`Fetched IP info from ipinfo.io: ${JSON.stringify(
// 						ipInfoData
// 					)}`
// 				);
// 			}
// 		} catch (error) {
// 			const errorMessage =
// 				error instanceof Error ? error.message : "Unknown error";
// 			errors.push(errorMessage);
// 		}

// 		const isVpn =
// 			ipInfoData &&
// 			(ipInfoData.bogon || ipInfoData.vpn || ipInfoData.proxy);

// 		if (
// 			!ipInfoData ||
// 			!ipInfoData.city ||
// 			!ipInfoData.region ||
// 			!ipInfoData.country
// 		) {
// 			method = "freegeoip.app";
// 			try {
// 				logs.push("Trying to fetch backup IP info from freegeoip.app");
// 				const backupIpInfoData = await fetchBackupIpInfo(ip);
// 				logs.push(
// 					`Fetched backup IP info from freegeoip.app: ${JSON.stringify(
// 						backupIpInfoData
// 					)}`
// 				);

// 				ipInfoData = {
// 					...ipInfoData,
// 					city: ipInfoData?.city || backupIpInfoData.city,
// 					region: ipInfoData?.region || backupIpInfoData.region,
// 					country: ipInfoData?.country || backupIpInfoData.country,
// 					loc:
// 						ipInfoData?.loc ||
// 						`${backupIpInfoData.latitude},${backupIpInfoData.longitude}`,
// 					postal: ipInfoData?.postal || backupIpInfoData.zip_code,
// 					timezone:
// 						ipInfoData?.timezone || backupIpInfoData.time_zone,
// 				};
// 			} catch (error) {
// 				const errorMessage =
// 					error instanceof Error ? error.message : "Unknown error";
// 				errors.push(errorMessage);
// 			}
// 		}

// 		res.status(200).json({
// 			ip: ipInfoData?.ip || ip,
// 			hostname: ipInfoData?.hostname || "Unknown",
// 			location: {
// 				city: ipInfoData?.city || "Unknown",
// 				region: ipInfoData?.region || "Unknown",
// 				country:
// 					ipInfoData?.country ||
// 					req.headers["cf-ipcountry"] ||
// 					"Unknown",
// 				loc: ipInfoData?.loc || "",
// 				postal: ipInfoData?.postal || "",
// 			},
// 			org: ipInfoData?.org || "Unknown",
// 			timezone: ipInfoData?.timezone || "Unknown",
// 			vpn: isVpn || false,
// 			method: method,
// 			errors: errors,
// 			logs: logs,
// 		});
// 	} catch (error) {
// 		const errorMessage =
// 			error instanceof Error ? error.message : "Unknown error";
// 		errors.push(errorMessage);
// 		res.status(500).json({ error: errorMessage, errors, logs });
// 	}
// };

// export default getIp;

// import { NextApiRequest, NextApiResponse } from "next";
// import fetch from "node-fetch";

// const fetchIpFromWebhook = async (): Promise<any> => {
// 	try {
// 		console.log("Attempting to fetch IP from webhook");
// 		const response = await fetch(
// 			"http://localhost:420/api/webhooks/ipDataRetrieval"
// 		);
// 		if (!response.ok) {
// 			throw new Error(`Webhook fetch failed: ${response.statusText}`);
// 		}
// 		const data = await response.json();
// 		console.log("Fetched IP from webhook:", data);
// 		return data;
// 	} catch (error) {
// 		console.log("Webhook fetch failed:", error);
// 		throw new Error(
// 			`Webhook fetch failed: ${
// 				error instanceof Error ? error.message : "Unknown error"
// 			}`
// 		);
// 	}
// };

// const fetchIpInfoFromIpInfo = async (ip: string): Promise<any> => {
// 	console.log(`Attempting to fetch IP info from ipinfo.io for IP: ${ip}`);
// 	const response = await fetch(
// 		`https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_TOKEN}`
// 	);
// 	if (!response.ok) {
// 		throw new Error(`ipinfo.io fetch failed: ${response.statusText}`);
// 	}
// 	const data = await response.json();
// 	console.log("Fetched IP info from ipinfo.io:", data);
// 	return data;
// };

// const fetchBackupIpInfo = async (ip: string): Promise<any> => {
// 	console.log(`Attempting to fetch IP info from freegeoip.app for IP: ${ip}`);
// 	const response = await fetch(`https://freegeoip.app/json/${ip}`);
// 	if (!response.ok) {
// 		throw new Error(`freegeoip.app fetch failed: ${response.statusText}`);
// 	}
// 	const data = await response.json();
// 	console.log("Fetched IP info from freegeoip.app:", data);
// 	return data;
// };

// const getIp = async (req: NextApiRequest, res: NextApiResponse) => {
// 	let errors: string[] = [];
// 	let logs: string[] = [];
// 	let sources: { [key: string]: string } = {};

// 	try {
// 		let ip =
// 			(req.headers["cf-connecting-ip"] as string) ||
// 			(req.socket.remoteAddress as string);
// 		console.log(`Initial determined IP: ${ip}`);

// 		if (!ip || ip === "::1") {
// 			try {
// 				logs.push("Trying to fetch IP via webhook");
// 				const webhookData = await fetchIpFromWebhook();
// 				ip = webhookData.ip;
// 				logs.push(`Fetched IP via webhook: ${ip}`);
// 				sources.ip = "webhook";
// 			} catch (error) {
// 				const errorMessage =
// 					error instanceof Error ? error.message : "Unknown error";
// 				errors.push(`Webhook fetch failed: ${errorMessage}`);
// 			}
// 		}

// 		if (!ip || ip === "::1") {
// 			try {
// 				logs.push("Trying to fetch IP from ipify");
// 				const ipifyResponse = await fetch(
// 					"https://api.ipify.org?format=json"
// 				);
// 				if (!ipifyResponse.ok) {
// 					throw new Error(
// 						`ipify fetch failed: ${ipifyResponse.statusText}`
// 					);
// 				}
// 				const ipifyData = await ipifyResponse.json();
// 				ip = ipifyData.ip;
// 				logs.push(`Fetched IP from ipify: ${ip}`);
// 				sources.ip = "ipify";
// 			} catch (error) {
// 				const errorMessage =
// 					error instanceof Error ? error.message : "Unknown error";
// 				errors.push(`ipify fetch failed: ${errorMessage}`);
// 			}
// 		}

// 		let ipInfoData = null;
// 		let method = "ipinfo.io";

// 		try {
// 			if (ip) {
// 				logs.push("Trying to fetch IP info from ipinfo.io");
// 				ipInfoData = await fetchIpInfoFromIpInfo(ip);
// 				logs.push(
// 					`Fetched IP info from ipinfo.io: ${JSON.stringify(
// 						ipInfoData
// 					)}`
// 				);
// 				sources.info = "ipinfo.io";
// 			}
// 		} catch (error) {
// 			const errorMessage =
// 				error instanceof Error ? error.message : "Unknown error";
// 			errors.push(errorMessage);
// 		}

// 		const isVpn =
// 			ipInfoData &&
// 			(ipInfoData.bogon || ipInfoData.vpn || ipInfoData.proxy);

// 		if (
// 			!ipInfoData ||
// 			!ipInfoData.city ||
// 			!ipInfoData.region ||
// 			!ipInfoData.country
// 		) {
// 			method = "freegeoip.app";
// 			try {
// 				logs.push("Trying to fetch backup IP info from freegeoip.app");
// 				const backupIpInfoData = await fetchBackupIpInfo(ip);
// 				logs.push(
// 					`Fetched backup IP info from freegeoip.app: ${JSON.stringify(
// 						backupIpInfoData
// 					)}`
// 				);
// 				sources.backup = "freegeoip.app";

// 				ipInfoData = {
// 					...ipInfoData,
// 					city: ipInfoData?.city || backupIpInfoData.city,
// 					region: ipInfoData?.region || backupIpInfoData.region,
// 					country: ipInfoData?.country || backupIpInfoData.country,
// 					loc:
// 						ipInfoData?.loc ||
// 						`${backupIpInfoData.latitude},${backupIpInfoData.longitude}`,
// 					postal: ipInfoData?.postal || backupIpInfoData.zip_code,
// 					timezone:
// 						ipInfoData?.timezone || backupIpInfoData.time_zone,
// 				};
// 			} catch (error) {
// 				const errorMessage =
// 					error instanceof Error ? error.message : "Unknown error";
// 				errors.push(errorMessage);
// 			}
// 		}

// 		const responseData = {
// 			ip: ipInfoData?.ip || ip,
// 			hostname: ipInfoData?.hostname || "Unknown",
// 			location: {
// 				city: ipInfoData?.city || "Unknown",
// 				region: ipInfoData?.region || "Unknown",
// 				country:
// 					ipInfoData?.country ||
// 					req.headers["cf-ipcountry"] ||
// 					"Unknown",
// 				loc: ipInfoData?.loc || "",
// 				postal: ipInfoData?.postal || "",
// 			},
// 			org: ipInfoData?.org || "Unknown",
// 			timezone: ipInfoData?.timezone || "Unknown",
// 			vpn: isVpn || false,
// 			method: method,
// 			errors: errors,
// 			logs: logs,
// 			sources: sources,
// 		};

// 		console.log("Returning response data:", responseData);
// 		res.status(200).json(responseData);
// 	} catch (error) {
// 		const errorMessage =
// 			error instanceof Error ? error.message : "Unknown error";
// 		errors.push(errorMessage);
// 		console.log("Error in /api/ip/getIp:", errorMessage);
// 		res.status(500).json({ error: errorMessage, errors, logs, sources });
// 	}
// };

// export default getIp;

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
