"use server";

import proxmoxApi from "proxmox-api";

const host = process.env.PROXMOX_HOST;
const tokenID = process.env.PROXMOX_TOKEN_ID;
const tokenSecret = process.env.PROXMOX_TOKEN_SECRET;

if (!host || !tokenID || !tokenSecret) {
	throw new Error("Missing Proxmox environment variables");
}

const proxmox = proxmoxApi({
	host,
	tokenID,
	tokenSecret,
});

export const handleProxmoxView = async () => {
	try {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Allow self-signed certificates
		const nodes = await proxmox.nodes.$get();
		console.log("Proxmox Nodes:", nodes);
		return nodes;
	} catch (error) {
		console.error("Proxmox API Error:", error);
		throw error;
	}
};
