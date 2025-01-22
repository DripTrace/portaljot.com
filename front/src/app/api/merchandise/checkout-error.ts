import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    success: boolean;
    error: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ success: false, error: "Cart must not be empty" });
}
