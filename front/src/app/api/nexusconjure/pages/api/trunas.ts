import { NextApiRequest, NextApiResponse } from "next";
import { getTrueNASConfig } from "../../utils/trunasClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("TrueNAS API route hit:", req.method);
	if (req.method === "GET") {
		try {
			console.log("Attempting to fetch TrueNAS config...");
			const config = await getTrueNASConfig();
			console.log("TrueNAS config fetched successfully:", config);
			res.status(200).json(config);
		} catch (error) {
			console.error("Error fetching TrueNAS configuration:", error);
			res.status(500).json({
				error: "Error fetching TrueNAS configuration",
			});
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
