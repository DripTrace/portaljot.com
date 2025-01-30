import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";
import { connectToDatabase } from "@/utils/database";
import { processUser } from "@/utils/apiLock";

export default async function checkReferenceCode(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await processUser(req, res);
    if (!user) {
        return res.status(401).end();
    }
    const pool = await connectToDatabase();
    const code = req.query.code;

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM reference_codes WHERE code = ?",
        [code]
    );

    if (rows.length > 0) {
        res.status(200).json({ codeExists: true });
    } else {
        res.status(200).json({ codeExists: false });
    }
}
