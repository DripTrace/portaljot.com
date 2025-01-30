import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { processUser } from "@/utils/apiLock";
import bcrypt from "bcryptjs";

export default async function updateProfile(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = await processUser(req, res);
    if (!user) {
        return res.status(401).end();
    }
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password, referenceCode, paths, email } = req.body;
    if (!username || !password || !referenceCode || !paths) {
        return res.status(400).json({ message: "Missing fields" });
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        console.error("Error hashing password:", error);
        return res
            .status(500)
            .json({ message: "An error occurred while hashing the password" });
    }

    const pool = await connectToDatabase();

    // Convert paths object to string
    const pathsString = Object.keys(paths)
        .filter((key) => paths[key])
        .join(",");

    const sql = "CALL createUser(?, ?, ?, ?, ?)";
    const values = [
        username,
        hashedPassword,
        email,
        pathsString,
        referenceCode,
    ];

    try {
        await pool.query(sql, values);
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res
            .status(500)
            .json({ message: "An error occurred while updating the profile" });
    }
}
