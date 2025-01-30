import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { getToken } from "next-auth/jwt";
import { processUser } from "@/utils/apiLock";

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await processUser(req, res);

    if (!user) {
        return res.status(401).end();
    }
    const profile = req.body;

    // Basic validation
    if (!profile) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Get the user's token
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const authHeader = req.headers.authorization;
    let bearerToken;
    if (authHeader) {
        bearerToken = JSON.parse(authHeader.split(" ")[1]); // Bearer <token>
    }
    const userId = req.body.userId;
    const sub = bearerToken["sub"];

    if (Number(sub) === Number(userId)) {
        const pool = await connectToDatabase();

        try {
            const { username, email, bio, location, role, userId } = profile;
            // Update the profile
            await pool.query("CALL UpdateUserProfile(?, ?, ?, ?, ?, ?)", [
                username,
                email,
                bio,
                location,
                role,
                userId,
            ]);

            // Send a success response
            res.status(200).json({ message: "Profile updated successfully" });
        } catch (error) {
            // Send an error response
            res.status(500).json({ error: "Failed to update profile" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};
export default updateProfile;
