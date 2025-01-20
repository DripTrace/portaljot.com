import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]";
import { signIn } from "next-auth/react";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (!result || result.error) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const session = await getServerSession(req, res, authOptions);

        if (session) {
            return res.status(200).json(session);
        } else {
            return res.status(401).json({ message: "Session not established" });
        }
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
