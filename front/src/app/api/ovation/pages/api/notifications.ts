// pages/api/notifications.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";
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

    if (req.method === "GET") {
        const userId = req.query.userId as string;
        try {
            const pool = await connectToDatabase();

            const result = (await pool.query("CALL getNotifications(?)", [
                userId,
            ])) as RowDataPacket[][];
            //console.log(result[0][0] );
            res.status(200).json(result[0][0]);
        } catch (error) {
            res.status(500).json({ error: "Error fetching notifications" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
