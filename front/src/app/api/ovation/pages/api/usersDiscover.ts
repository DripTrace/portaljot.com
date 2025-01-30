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

    const currentUserId = req.query.currentUserId;

    const pool = await connectToDatabase();

    // Validate currentUserId
    if (!currentUserId || typeof currentUserId !== "string") {
        return res.status(400).json({ error: "Invalid currentUserId" });
    }

    const [users] = await pool.query("CALL getAllUsersAndFollowInfo(?)", [
        currentUserId,
    ]);

    res.json(users);
}
