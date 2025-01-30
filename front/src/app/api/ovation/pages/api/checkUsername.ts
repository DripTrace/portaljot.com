import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";
import { connectToDatabase } from "@/utils/database";
import { processUser } from "@/utils/apiLock";

export default async function checkUsername(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await processUser(req, res);
    if (!user) {
        return res.status(401).end();
    }
    const pool = await connectToDatabase();
    const username = req.query.username;

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );

    if (rows.length > 0) {
        res.status(200).json({ usernameExists: true });
    } else {
        res.status(200).json({ usernameExists: false });
    }
}
