import { DJANGO_API_ENDPOINT } from "@/lib/config/defaults";
import type { NextApiRequest, NextApiResponse } from "next";

const DJANGO_API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/token/pair`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const requestData = req.body;
    const jsonData = JSON.stringify(requestData);
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonData,
    };

    try {
        const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
        const responseData = await response.json();

        if (response.ok) {
            console.log("logged in [ROUTE]");
            const { username, access, refresh } = responseData;

            // Set cookies for access and refresh tokens
            res.setHeader("Set-Cookie", [
                `access_token=${access}; HttpOnly; Path=/; Max-Age=3600`,
                `refresh_token=${refresh}; HttpOnly; Path=/; Max-Age=86400`,
            ]);

            return res.status(200).json({ loggedIn: true, username: username });
        } else {
            return res.status(400).json({ loggedIn: false, ...responseData });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
