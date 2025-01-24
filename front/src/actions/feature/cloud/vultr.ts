"use server";

import VultrNode from "@vultr/vultr-node";

const vultr = VultrNode.initialize({
	apiKey: process.env.VULTR_API_KEY as string,
});

export const handleVultrView = async (): Promise<any> => {
	try {
		const instances = await vultr.instances.listInstances({});
		return instances;
	} catch (error) {
		console.error("Vultr error:", error);
		throw new Error(`Vultr: ${(error as Error).message}`);
	}
};
