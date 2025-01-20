import { NextApiRequest, NextApiResponse } from "next";
import {
	bringDownWireGuard,
	bringUpWireGuard,
} from "../../../utils/wireguardUtils";

const handleWireguardClient = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		if (req.method === "POST") {
			await bringUpWireGuard();
			res.status(200).json({
				message: "WireGuard interface brought up successfully",
			});
		} else if (req.method === "DELETE") {
			await bringDownWireGuard();
			res.status(200).json({
				message: "WireGuard interface brought down successfully",
			});
		} else {
			res.setHeader("Allow", ["POST", "DELETE"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
};

export default handleWireguardClient;
