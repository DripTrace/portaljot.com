import { NextApiRequest, NextApiResponse } from "next";
import os from "os";

const getIp = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		console.log("Received request to /api/webhooks/ipDataRetrieval");

		// Retrieve IP address from request headers or socket
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		console.log(`Determined IP: ${ip}`);

		if (!ip || ip === "::1") {
			throw new Error("Unable to determine IP address");
		}

		// Additional logic to retrieve more information about the IP could be added here.
		// This example uses basic system information.

		const networkInterfaces = os.networkInterfaces();
		let interfaceInfo: os.NetworkInterfaceInfo[] = [];

		// Flatten the network interfaces object
		for (const interfaceName in networkInterfaces) {
			if (networkInterfaces.hasOwnProperty(interfaceName)) {
				interfaceInfo = interfaceInfo.concat(
					networkInterfaces[interfaceName] || []
				);
			}
		}

		const ipInfo = {
			ip,
			hostname: os.hostname(),
			city: "Unknown",
			region: "Unknown",
			country: "Unknown",
			loc: "Unknown",
			postal: "Unknown",
			org: "Unknown",
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		};

		// Attempt to determine local network information
		interfaceInfo.forEach((info: os.NetworkInterfaceInfo) => {
			if (info.family === "IPv4") {
				ipInfo.loc = `${info.address}:${info.netmask}`;
			}
		});

		console.log("Returning IP info:", ipInfo);
		res.status(200).json(ipInfo);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.log("Error in /api/webhooks/ipDataRetrieval:", errorMessage);
		res.status(500).json({ error: errorMessage });
	}
};

export default getIp;
