import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]";
import NextAuth from "next-auth";

export default async function providersHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Ensure the correct content type
        res.setHeader("Content-Type", "application/json");

        // Use NextAuth's handler to access the providers, if needed
        const providers = authOptions.providers;

        // Return providers as JSON
        res.status(200).json(providers);
    } catch (error) {
        console.error("Error fetching providers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
