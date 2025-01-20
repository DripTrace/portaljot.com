import { NextApiRequest, NextApiResponse } from "next";
import ApiProxy from "../proxy";
import { DJANGO_API_ENDPOINT } from "@/lib/config/defaults";

const DJANGO_API_WAITLISTS_URL = `${DJANGO_API_ENDPOINT}/waitlists/`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token =
        req.headers.authorization?.split(" ")[1] || req.cookies.access_token;
    console.log("API received token:", token);

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token provided" });
    }

    if (req.method === "GET") {
        try {
            const { data, status } = await ApiProxy.get(
                DJANGO_API_WAITLISTS_URL,
                req
                // token
            );
            console.log("Waitlist response:", { status, data });
            return res.status(status || 200).json(data);
        } catch (error) {
            console.error("Error fetching waitlist:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }

    try {
        switch (req.method) {
            case "GET":
                console.log("Making GET request to:", DJANGO_API_WAITLISTS_URL);
                const { data: getData, status: getStatus } = await ApiProxy.get(
                    DJANGO_API_WAITLISTS_URL,
                    req
                    // token
                );
                console.log("Received data from Django API:", getData);
                console.log("Response status from Django API:", getStatus);
                return res.status(getStatus).json(getData);

            case "POST":
                console.log("Received POST request body:", req.body);
                console.log(
                    "DJANGO_API_WAITLISTS_URL:",
                    DJANGO_API_WAITLISTS_URL
                );
                const { data: postData, status: postStatus } =
                    await ApiProxy.post(
                        DJANGO_API_WAITLISTS_URL,
                        req.body,
                        req
                    );
                console.log("POST response:", postStatus, postData);
                return res.status(postStatus).json(postData);

            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error in waitlists route handler:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
