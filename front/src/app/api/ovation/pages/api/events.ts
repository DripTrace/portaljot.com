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

    const { user_id, action, from_id, target, target_id } = req.body;

    const pool = await connectToDatabase();
    switch (req.method) {
        case "POST":
            if (!user_id || !action || !from_id || !target || !target_id) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }
            if (!pool) {
                throw new Error("Failed to connect to the database.");
            }
            try {
                await pool.query(
                    "INSERT INTO user_events(user_id, action, from_id, target, target_id, viewed) VALUES(?, ?, ?, ?, ?, 0)",
                    [user_id, action, from_id, target, target_id]
                );

                return res
                    .status(201)
                    .json({ message: "Event added successfully" });
            } catch (e) {
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                } else {
                    res.status(500).json({ message: "An error occurred" });
                }
            }

        case "DELETE":
            try {
                const { target, target_id, from_id, user_id } = req.body;

                if (!target || !target_id || !from_id || !user_id) {
                    return res
                        .status(400)
                        .json({ error: "Missing required fields" });
                }

                const sql = `DELETE FROM user_events WHERE target = ? AND target_id = ? AND from_id = ? AND user_id = ?`;

                await pool.query(sql, [target, target_id, from_id, user_id]);

                return res
                    .status(200)
                    .json({ message: "Record deleted successfully" });
            } catch (error) {
                if (error instanceof Error) {
                    return res
                        .status(500)
                        .json({ error: "Database error: " + error.message });
                }
                return res.status(500).json({ error: "Database error" });
            }

        // ...
        default:
            res.setHeader("Allow", ["POST", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
