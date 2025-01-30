import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log("API route hit"); // Log when the route is hit
        const response = await fetch("https://bored-api.appbrewery.com/random");

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API response:", data); // Log the response data
        res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching data:", error.message); // Log the error message
            res.status(500).json({ error: error.message });
        } else {
            console.error("Unexpected error:", error); // Log the unexpected error
            res.status(500).json({ error: "Unexpected error occurred" });
        }
    }
}
