import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { filename } = req.query;
    const filePath = path.join(
        process.cwd(),
        "public",
        "llpmg",
        "audio",
        filename as string
    );

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).json({ error: "File not found" });
        } else {
            res.setHeader("Content-Type", "audio/mpeg");
            res.send(data);
        }
    });
}
