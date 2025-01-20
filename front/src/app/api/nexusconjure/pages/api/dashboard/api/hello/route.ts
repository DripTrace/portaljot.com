import type { NextApiRequest, NextApiResponse } from "next";
import { DJANGO_API_ENDPOINT } from "@/lib/config/defaults";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const data = { apiEndpoint: DJANGO_API_ENDPOINT };
        res.status(200).json(data);
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
