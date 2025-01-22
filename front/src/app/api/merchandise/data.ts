import { check } from "@/utils/merchandise/rate-limiting/bucket";
import { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    const { allowed, remaining } = await check("abcd");
    res.status(200).json({ allowed, remaining });
};
