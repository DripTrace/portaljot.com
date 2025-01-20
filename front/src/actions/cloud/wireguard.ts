// import { exec } from "child_process";
// import { promisify } from "util";

// const execPromise = promisify(exec);

// interface WireguardPeer {
// 	publicKey: string;
// 	endpoint: string;
// 	allowedIps: string[];
// 	latestHandshake: number;
// 	transferRx: number;
// 	transferTx: number;
// }

// interface WireguardInterface {
// 	interface: string;
// 	privateKey: string;
// 	publicKey: string;
// 	listeningPort: number;
// 	peers: WireguardPeer[];
// }

// export const handleWireguardView = async (): Promise<WireguardInterface[]> => {
// 	try {
// 		const { stdout } = await execPromise("wg show all dump");
// 		const interfaces = parseWireguardOutput(stdout);
// 		return interfaces;
// 	} catch (error) {
// 		const errorMessage =
// 			error instanceof Error ? error.message : "Unknown error";
// 		throw new Error(`WireGuard: ${errorMessage}`);
// 	}
// };

// const parseWireguardOutput = (output: string): WireguardInterface[] => {
// 	const lines = output.trim().split("\n");
// 	const interfaces: { [key: string]: WireguardInterface } = {};

// 	lines.forEach((line) => {
// 		const [iface, type, ...params] = line.split("\t");
// 		if (!interfaces[iface]) {
// 			interfaces[iface] = {
// 				interface: iface,
// 				privateKey: "",
// 				publicKey: "",
// 				listeningPort: 0,
// 				peers: [],
// 			};
// 		}

// 		if (type === "interface") {
// 			const [privateKey, publicKey, listeningPort] = params;
// 			interfaces[iface].privateKey = privateKey;
// 			interfaces[iface].publicKey = publicKey;
// 			interfaces[iface].listeningPort = parseInt(listeningPort, 10);
// 		} else if (type === "peer") {
// 			const [
// 				publicKey,
// 				endpoint,
// 				allowedIps,
// 				latestHandshake,
// 				transferRx,
// 				transferTx,
// 			] = params;
// 			interfaces[iface].peers.push({
// 				publicKey,
// 				endpoint,
// 				allowedIps: allowedIps.split(","),
// 				latestHandshake: parseInt(latestHandshake, 10),
// 				transferRx: parseInt(transferRx, 10),
// 				transferTx: parseInt(transferTx, 10),
// 			});
// 		}
// 	});

// 	return Object.values(interfaces);
// };

// import path from "path";
// import { WgConfig, getConfigObjectFromFile } from "wireguard-tools";

// export const handleWireguardView = async (): Promise<WgConfig> => {
// 	const filePath = path.join(__dirname, "/configs", "/guardline-server.conf");

// 	try {
// 		const wgConfig = new WgConfig({ filePath });
// 		await wgConfig.parseFile();

// 		// Generate keys if they don't exist
// 		if (!wgConfig.publicKey) {
// 			await wgConfig.generateKeys();
// 		}

// 		return wgConfig;
// 	} catch (error) {
// 		const errorMessage =
// 			error instanceof Error ? error.message : "Unknown error";
// 		throw new Error(`WireGuard: ${errorMessage}`);
// 	}
// };

// "use server";

// import path from "path";
// import { WgConfig, getConfigObjectFromFile } from "wireguard-tools";

// export const handleWireguardView = async (): Promise<WgConfig> => {
// 	const filePath = path.join(
// 		process.cwd(),
// 		"/src/configs",
// 		"guardline-server.conf"
// 	);

// 	try {
// 		const wgConfig = new WgConfig({ filePath });
// 		await wgConfig.parseFile();

// 		// Generate keys if they don't exist
// 		if (!wgConfig.publicKey) {
// 			await wgConfig.generateKeys();
// 		}

// 		console.log("WireGuard Config: ", wgConfig);

// 		return wgConfig;
// 	} catch (error) {
// 		const errorMessage =
// 			error instanceof Error ? error.message : "Unknown error";
// 		throw new Error(`WireGuard: ${errorMessage}`);
// 	}
// };

import path from "path";
import { WgConfig } from "wireguard-tools";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const handleWireguardView = async (): Promise<WgConfig> => {
	const filePath = path.join(
		process.cwd(),
		"/src/configs",
		"guardline-server.conf"
	);

	try {
		let configContent = fs.readFileSync(filePath, "utf8");

		// Replace environment variables in the config content
		configContent = configContent.replace(/\$\{?(\w+)\}?/g, (_, envVar) => {
			return process.env[envVar] || "";
		});

		// Write the interpolated content to a temporary file
		const tempFilePath = path.join(
			process.cwd(),
			"/src/configs",
			"temp-guardline-server.conf"
		);
		fs.writeFileSync(tempFilePath, configContent, "utf8");

		const wgConfig = new WgConfig({ filePath: tempFilePath });
		await wgConfig.parseFile();

		// Generate keys if they don't exist
		if (!wgConfig.publicKey) {
			await wgConfig.generateKeys();
		}

		console.log("WireGuard Config: ", wgConfig);

		// Clean up the temporary file
		fs.unlinkSync(tempFilePath);

		return wgConfig;
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		throw new Error(`WireGuard: ${errorMessage}`);
	}
};
