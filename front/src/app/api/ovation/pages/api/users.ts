import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pool = await connectToDatabase();

    const [users] = await pool.query("CALL getAllUsersAndInfo()");

    res.json(users);
}
