import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { processUser } from "@/utils/apiLock";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await processUser(req, res);
    if (!user) {
        res.status(401).json({ error: "Not authenticated" });
        return;
    }
    if (!req.body.title || !req.body.content) {
        res.status(400).json({ error: "Title and content are required." });
        return;
    }
    if (typeof req.body.user_id !== "number") {
        res.status(400).json({ error: "Invalid user ID." });
        return;
    }
    if (req.body.title.length > 255 || req.body.content.length > 5000) {
        res.status(400).json({ error: "Title or content is too long." });
        return;
    }
    // Add more checks here as needed

    if (req.method === "POST") {
        const { title, content, user_id } = req.body;
        try {
            const db = await connectToDatabase();
            const sql = "CALL InsertPost(?, ?, ?)";
            const values = [title, content, user_id];
            const result = await db.query(sql, values);

            res.status(200).json({ message: "Post created successfully" });
        } catch (error) {
            res.status(500).json({ error: "Unable to create post" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
