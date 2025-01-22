import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/modify/auth/route";

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
