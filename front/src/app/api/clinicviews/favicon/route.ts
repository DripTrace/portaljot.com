// app/api/get-favicon/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getFavicon } from "@/utils/clinicviews/getFavicon";

export async function GET(req: NextRequest) {
	try {
		const host = req.headers.get("host") || "";
		let domainContext = "driptrace";

		if (host.includes("lomalindapsych.com")) {
			domainContext = "llpmg";
		} else if (host.includes("fsclinicals.com")) {
			domainContext = "fsclinicals";
		}

		const favicon = getFavicon(domainContext);
		const faviconPath = path.join(
			process.cwd(),
			"public",
			"clinicviews",
			favicon.icon
		);

		if (fs.existsSync(faviconPath)) {
			const faviconContent = fs.readFileSync(faviconPath);
			return new NextResponse(faviconContent, {
				headers: {
					"Content-Type": "image/x-icon",
				},
				status: 200,
			});
		} else {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}
	} catch (error: any) {
		console.error("Error fetching favicon:", error);
		return NextResponse.json(
			{ error: "Error fetching favicon" },
			{ status: 500 }
		);
	}
}
