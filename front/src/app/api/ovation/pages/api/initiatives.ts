// pages/api/initiatives.ts
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

    let pool;
    if (req.method === "GET") {
        try {
            pool = await connectToDatabase();

            const [rows] = await pool.query("CALL FetchInitiatives()");

            res.status(200).json(rows);
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    } else {
        console.log("data failed to fetch");
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
