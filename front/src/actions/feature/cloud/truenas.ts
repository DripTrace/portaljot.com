// actions/feature/cloud/truenas.ts
import { getTrueNASConfig } from "@/client/cloud/trunas";

export const handleTrueNASView = async () => {
	try {
		const config = await getTrueNASConfig();
		return config;
	} catch (error) {
		console.error("Error fetching TrueNAS configuration:", error);
		return { error: "Error fetching TrueNAS configuration" };
	}
};
