import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/utils/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const { username, password } = req.body;
    if (!password || password.length > 32) {
        res.status(418).json({ message: "I'm a teapot" });
        return;
    }
    const pool = await connectToDatabase();

    const [rows] = await pool.execute("CALL ValidateUser(?)", [username]);
    const user = (rows as Array<Array<any>>)[0][0];
    const userId = user.id;
    if (!user || !user.hashed_password) {
        res.status(401).json({ message: "Login failed" });
        return;
    }

    const match = await bcrypt.compare(
        password,
        user.hashed_password.toString()
    );
    if (!match) {
        res.status(401).json({ message: "Login failed" });
    } else {
        // Generate the JWT token
        const token = jwt.sign({ username, userId }, process.env.JWT_SECRET!, {
            expiresIn: "30d",
        });
        // Update the accessToken and updated_at in the database
        const sql =
            "UPDATE users SET accessToken = ?, updated_at = NOW() WHERE username = ?";
        await pool.query(sql, [token, username]);

        res.status(200).json({ message: "Login successful", token });
    }
}
