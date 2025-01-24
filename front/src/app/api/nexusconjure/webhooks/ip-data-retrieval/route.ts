import { NextRequest, NextResponse } from "next/server";
import os from "os";

export async function GET(req: NextRequest) {
	try {
		console.log(
			"Received request to /api/nexusconjure/webhooks/ipDataRetrieval"
		);

		// Retrieve IP address from request headers or socket
		const ip =
			req.headers.get("x-forwarded-for") ||
			req.ip ||
			req.headers.get("x-real-ip") ||
			"::1"; // Fallback to localhost if IP is not found
		console.log(`Determined IP: ${ip}`);

		if (!ip || ip === "::1") {
			throw new Error("Unable to determine IP address");
		}

		// Gather system network information
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

		// Construct IP information
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

		// Determine local network location information
		interfaceInfo.forEach((info: os.NetworkInterfaceInfo) => {
			if (info.family === "IPv4") {
				ipInfo.loc = `${info.address}:${info.netmask}`;
			}
		});

		console.log("Returning IP info:", ipInfo);
		return NextResponse.json(ipInfo, { status: 200 });
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error(
			"Error in /api/nexusconjure/webhooks/ipDataRetrieval:",
			errorMessage
		);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
