// pages/api/openUserData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { RowDataPacket, FieldPacket } from "mysql2";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { user } = req.query;
    // Validate userId
    if (!user) {
        return res.status(400).json({ error: "Missing userId" });
    }

    const pool = await connectToDatabase();

    const [rows] = (await pool.query("CALL getOpenProfileData(?)", [user])) as [
        RowDataPacket[],
        FieldPacket[],
    ];
    const userData = rows[0];

    res.status(200).json(userData);
}
