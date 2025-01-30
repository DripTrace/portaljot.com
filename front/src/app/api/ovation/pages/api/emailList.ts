import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { name, email, comments } = req.body;
        console.log(req.body);

        // Required fields validation
        if (!name || !email) {
            res.status(400).json({ error: "Name and email are required" });
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: "Invalid email format" });
            return;
        }

        // Length validation
        if (
            name.length > 255 ||
            email.length > 255 ||
            (comments && comments.length > 500)
        ) {
            res.status(400).json({ error: "Input is too long" });
            return;
        }
        try {
            const db = await connectToDatabase();
            await db.query("CALL InsertIntoMailingList(?, ?, ?)", [
                name,
                email,
                comments,
            ]);
            res.status(200).json({ message: "Data inserted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Error inserting data: " + (err as Error).message,
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
