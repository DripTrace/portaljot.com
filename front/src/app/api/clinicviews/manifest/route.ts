import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const host = req.headers.get("host") || "";
	console.log("Request host:", host);

	let domain = "driptrace";

	if (host.includes("lomalindapsych.com")) {
		domain = "llpmg";
	} else if (host.includes("fsclinicals.com")) {
		domain = "fsclinicals";
	}

	console.log("Selected domain:", domain);

	const manifestPath = path.join(
		process.cwd(),
		"public",
		"clinicviews",
		`manifest_${domain}.webmanifest`
	);

	try {
		const manifestContent = await fs.readFile(manifestPath, "utf8");
		console.log("Serving manifest:", manifestContent);

		return NextResponse.json(JSON.parse(manifestContent), {
			headers: {
				"Content-Type": "application/manifest+json",
			},
		});
	} catch (error) {
		console.error(`No manifest file found for domain: ${domain}`);
		return NextResponse.json(
			{ error: "Manifest not found for this domain" },
			{ status: 404 }
		);
	}
}

export const config = {
	runtime: "edge",
};
