// pages/api/updateLinks.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pool = await connectToDatabase();
    const { link } = req.body;
    console.log("req.body", req.body);
    console.log("link", link);
    if (req.method === "POST") {
        const { linkId, url, label, userId } = link;
        try {
            await pool.query("CALL InsertOrUpdateLink(?, ?, ?, ?)", [
                linkId,
                url,
                label,
                userId,
            ]);
            res.status(200).json({ message: "Link saved successfully" });
        } catch (error) {
            res.status(500).json({
                error: "An error occurred while saving the link",
            });
        }
    } else if (req.method === "DELETE") {
        const { linkId, userId } = link;
        try {
            await pool.query("CALL DeleteLink(?, ?)", [linkId, userId]);
            res.status(200).json({ message: "Link deleted successfully" });
        } catch (error) {
            res.status(500).json({
                error: "An error occurred while deleting the link",
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
