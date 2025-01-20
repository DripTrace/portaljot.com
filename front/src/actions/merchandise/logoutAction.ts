"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function logoutAction(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        // Destroy the session
        res.setHeader("Set-Cookie", [
            `next-auth.session-token=; Max-Age=0; Path=/merchandise; HttpOnly`,
        ]);
        res.status(200).json({ message: "Logged out successfully" });
    } else {
        res.status(401).json({ message: "No active session found" });
    }
}
