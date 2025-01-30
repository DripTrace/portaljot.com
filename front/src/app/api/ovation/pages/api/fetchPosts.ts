import { NextApiRequest, NextApiResponse } from "next";
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
    const db = await connectToDatabase();
    const [rows] = await db.query("CALL FetchPostsAndUsers()");
    res.json(rows);
}
