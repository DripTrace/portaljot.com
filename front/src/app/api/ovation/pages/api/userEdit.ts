// pages/api/userData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { RowDataPacket, FieldPacket } from "mysql2";
import { processUser } from "@/utils/apiLock";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await processUser(req, res);
    if (!user) {
        return res.status(401).end();
    }

    const { userId } = req.query;

    // Validate userId and viewerId
    if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
    }

    const pool = await connectToDatabase();

    const [rows] = (await pool.query("CALL GetUserDetails(?)", [userId])) as [
        RowDataPacket[],
        FieldPacket[],
    ];
    const userData = rows[0];

    res.status(200).json(userData);
}
