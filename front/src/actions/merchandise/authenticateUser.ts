// actions/merchandise/authenticateUser.ts
"use server";

import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";

export async function authenticateUser(email: string, password: string) {
    try {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/callback/credentials`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await res.json();

        console.log("Response from credentials callback:", data);

        if (!res.ok) {
            console.error("Authentication failed with status:", res.status);
            throw new Error("Failed to authenticate");
        }

        const session = await getServerSession(authOptions);

        if (!session) {
            console.error("Session not established after authentication");
            throw new Error("Session not established");
        }

        console.log("Session established:", session);
        return session;
    } catch (error) {
        console.error("Error during authentication:", error);
        throw error;
    }
}
