import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const domainContext = req.cookies["domainContext"] || "unknown";
    res.status(200).json({ domainContext });
}
