// pages/api/updateExperience.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pool = await connectToDatabase();
    console.log("req.body", req.body);
    const { exp } = req.body;

    if (req.method === "POST") {
        const { experienceId, company, role, jobDescription, userId } = exp;

        try {
            await pool.query("CALL InsertOrUpdateExperience(?, ?, ?, ?, ?)", [
                experienceId,
                company,
                role,
                jobDescription,
                userId,
            ]);
            res.status(200).json({ message: "Experience saved successfully" });
        } catch (error) {
            res.status(500).json({
                error: "An error occurred while saving the experience",
            });
        }
    } else if (req.method === "DELETE") {
        console.log("exp", exp);
        const { experienceId, userId } = exp;
        try {
            await pool.query("CALL DeleteExperience(?, ?)", [
                experienceId,
                userId,
            ]);
            res.status(200).json({
                message: "Experience deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                error: "An error occurred while deleting the experience",
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
