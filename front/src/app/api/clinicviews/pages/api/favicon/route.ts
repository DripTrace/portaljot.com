import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getFavicon } from "@/utils/getFavicon";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const host = req.headers.host || "";
    let domainContext = "driptrace";

    if (host.includes("lomalindapsych.com")) {
        domainContext = "llpmg";
    } else if (host.includes("fsclinicals.com")) {
        domainContext = "fsclinicals";
    }

    const favicon = getFavicon(domainContext);
    const faviconPath = path.join(process.cwd(), "public", favicon.icon);

    if (fs.existsSync(faviconPath)) {
        const faviconContent = fs.readFileSync(faviconPath);
        res.setHeader("Content-Type", "image/x-icon");
        res.send(faviconContent);
    } else {
        res.status(404).end();
    }
}
