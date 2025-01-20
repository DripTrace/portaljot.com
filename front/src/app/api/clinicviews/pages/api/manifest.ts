import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.headers.host || "";
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
        `manifest_${domain}.webmanifest`
    );

    if (!fs.existsSync(manifestPath)) {
        console.error(`No manifest file found for domain: ${domain}`);
        res.status(404).json({ error: "Manifest not found for this domain" });
        return;
    }

    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

    console.log("Serving manifest:", JSON.stringify(manifestContent, null, 2));

    res.setHeader("Content-Type", "application/manifest+json");
    res.status(200).json(manifestContent);
}
