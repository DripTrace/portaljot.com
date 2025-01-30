// pages/api/initiativePost.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { processUser } from "@/utils/apiLock";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await processUser(req, res);
    if (!user) {
        return res.status(401).end();
    }

    if (req.method === "POST") {
        const { userId, name, description, category, flagged } = req.body;
        // Validate the fields
        if (!userId || !name || !description || !category) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const pool = await connectToDatabase();

            const query =
                "INSERT INTO initiatives (user_id, name, description, category, published, created_at) VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)";
            const [result] = await pool.query(query, [
                userId,
                name,
                description,
                category,
            ]);
            res.status(201).json({
                message:
                    "Resource successfully created" /* id: result.insertId, userId, name, description, category */,
            });
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
