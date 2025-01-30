import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";
import { RowDataPacket } from "mysql2";

import bcrypt from "bcrypt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    console.log(req.body);
    const { userId, oldPassword, newPassword } = req.body;

    const pool = await connectToDatabase();
    console.log(userId);
    // Fetch the user from the database
    // Replace 'username' with the actual username
    const [rows] = await pool.execute(
        "SELECT hashed_password FROM users WHERE id = ?",
        [userId]
    );
    const user = (rows as RowDataPacket[])[0];
    console.log(oldPassword);
    console.log(user.hashed_password.toString());

    // Check if the old password is valid
    const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        user.hashed_password.toString()
    );
    console.log(isOldPasswordValid);

    if (!isOldPasswordValid) {
        return res.status(400).json({ error: "Old password is not valid" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await pool.execute(
        "UPDATE users SET hashed_password = ? WHERE id = ? LIMIT 1",
        [hashedNewPassword, userId]
    );

    return res.status(200).json({ message: "Password updated successfully" });
}
