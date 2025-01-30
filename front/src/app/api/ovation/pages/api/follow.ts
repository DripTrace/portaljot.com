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

    const { userId, profileId } = req.body;

    if (!userId || !profileId) {
        res.status(400).json({ error: "userId and profileId are required" });
        return;
    }
    try {
        const pool = await connectToDatabase();

        if (req.method === "POST") {
            const action = "Followed you";
            const target = "discover";
            await pool.query("CALL FollowUser(?, ?, ?, ?)", [
                profileId,
                action,
                userId,
                target,
            ]);
            res.status(200).json({ message: "Followed successfully" });
        } else if (req.method === "DELETE") {
            await pool.query(
                "DELETE FROM user_followers WHERE user_id = ? AND follower_id = ?",
                [profileId, userId]
            );

            res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            res.status(405).json({ error: "Method not allowed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while trying to follow/unfollow",
        });
    }
}
