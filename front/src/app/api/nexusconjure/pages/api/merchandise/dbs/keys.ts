import { keyCreation } from "@/types/merchandise/interfaces/objects/obinsun-objects";
import { NextApiResponse, NextApiRequest } from "next";

// Initialize keys as an empty array of keyCreation type
let keys: keyCreation[] = [];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case "POST":
                return await handlePost(req, res);
            case "GET":
                return handleGet(req, res);
            default:
                res.setHeader("Allow", ["GET", "POST"]);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (e) {
        console.error("There was an error", e);
        res.status(500).json({
            error: "Internal Server Error",
            details: e instanceof Error ? e.message : String(e),
        });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("Received POST request body:", req.body);

        let dbAttributes: keyCreation[];

        if (typeof req.body === "string") {
            dbAttributes = JSON.parse(req.body);
        } else {
            dbAttributes = req.body;
        }

        if (!Array.isArray(dbAttributes)) {
            throw new Error(
                "Invalid input: expected an array of keyCreation objects"
            );
        }

        console.log("Parsed dbAttributes:", dbAttributes);

        // Update the keys
        keys = dbAttributes;

        console.log("Updated keys:", keys);

        res.status(201).json({ sentKeys: dbAttributes });
    } catch (error) {
        console.error("Error in handlePost:", error);
        res.status(400).json({
            error: "Bad Request",
            details: error instanceof Error ? error.message : String(error),
        });
    }
}

function handleGet(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ keys: keys });
}
