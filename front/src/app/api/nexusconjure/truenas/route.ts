import { NextRequest, NextResponse } from "next/server";
import { getTrueNASConfig } from "@/utils/cloud/trunasClient";

export async function GET(req: NextRequest) {
	try {
		console.log("TrueNAS API route hit: GET");
		console.log("Attempting to fetch TrueNAS config...");

		// Fetch the TrueNAS configuration
		const config = await getTrueNASConfig();

		console.log("TrueNAS config fetched successfully:", config);

		// Return the fetched configuration as a JSON response
		return NextResponse.json(config, { status: 200 });
	} catch (error) {
		console.error("Error fetching TrueNAS configuration:", error);

		// Return an error response
		return NextResponse.json(
			{
				error: "Error fetching TrueNAS configuration",
			},
			{ status: 500 }
		);
	}
}

export async function handler(req: NextRequest) {
	// Handle unsupported methods
	return NextResponse.json(
		{
			error: `Method ${req.method} Not Allowed`,
		},
		{ status: 405 }
	);
}
