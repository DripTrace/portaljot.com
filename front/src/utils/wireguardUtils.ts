import { exec } from "child_process";
import { promisify } from "util";
import { wgConfigContent } from "./wireguardClient";

const execPromise = promisify(exec);

export const bringUpWireGuard = async (): Promise<void> => {
	try {
		const { stdout, stderr } = await execPromise(
			`echo "${wgConfigContent}" | sudo wg-quick up /dev/stdin`
		);
		console.log(`WireGuard stdout: ${stdout}`);
		if (stderr) {
			console.error(`WireGuard stderr: ${stderr}`);
		}
	} catch (error) {
		console.error(
			`Error bringing up WireGuard: ${(error as Error).message}`
		);
	}
};

export const bringDownWireGuard = async (): Promise<void> => {
	try {
		const { stdout, stderr } = await execPromise(
			`echo "${wgConfigContent}" | sudo wg-quick down /dev/stdin`
		);
		console.log(`WireGuard stdout: ${stdout}`);
		if (stderr) {
			console.error(`WireGuard stderr: ${stderr}`);
		}
	} catch (error) {
		console.error(
			`Error bringing down WireGuard: ${(error as Error).message}`
		);
	}
};
