import { NextApiRequest, NextApiResponse } from "next";
import ApiProxy from "../proxy";
import { DJANGO_API_ENDPOINT } from "@/lib/config/defaults";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const endpoint = `${DJANGO_API_ENDPOINT}/waitlists/${id}`;

    // Get the token from the request headers
    const token = req.headers.authorization?.split(" ")[1] || null;
    console.log("TOKEN [ID]", req.headers);

    switch (req.method) {
        case "GET":
            const { data: getData, status: getStatus } = await ApiProxy.get(
                endpoint,
                req
            );
            return res.status(getStatus).json(getData);

        case "PUT":
            const { data: putData, status: putStatus } = await ApiProxy.put(
                endpoint,
                req,
                req.body
            );
            return res.status(putStatus).json(putData);

        case "DELETE":
            // Implement DELETE method if needed
            return res
                .status(405)
                .json({ message: "DELETE method not implemented" });

        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
