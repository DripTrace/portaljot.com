import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/modify/auth/route";

export default async function sessionHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({ message: "No active session found" });
		}

		// Respond with the session data
		return res.status(200).json(session);
	} catch (error) {
		console.error("Session retrieval failed:", error);
		return res.status(500).json({ message: "Failed to retrieve session" });
	}
}
