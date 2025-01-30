import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { RowDataPacket, FieldPacket } from "mysql2";
import { processUser } from "@/utils/apiLock";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await processUser(req, res);
    if (!user) {
        return res.status(401).end();
    }
    const { userId } = req.query;

    try {
        const pool = await connectToDatabase();

        const [results] = (await pool.query("CALL GetUserName(?)", [
            userId,
        ])) as [RowDataPacket[], FieldPacket[]];
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};
export default handler;
