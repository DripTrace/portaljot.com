// import { logoutAction } from "@/actions/merchandise/logoutAction";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method === "POST") {
//         await logoutAction(req, res);
//     } else {
//         res.setHeader("Allow", ["POST"]);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

// src/pages/api/merchandise/api/auth/logout.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]";

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "Not logged in" });
        }

        // Destroy the session
        res.setHeader("Set-Cookie", [
            `next-auth.session-token=; Max-Age=0; path=/`,
            `next-auth.csrf-token=; Max-Age=0; path=/`,
        ]);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout failed:", error);
        res.status(500).json({ message: "Logout failed" });
    }
}
