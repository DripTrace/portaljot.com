"use server";

import { DefaultAzureCredential } from "@azure/identity";
import { ResourceManagementClient } from "@azure/arm-resources";

const handleAzureView = async () => {
	try {
		const credential = new DefaultAzureCredential();
		const client = new ResourceManagementClient(
			credential,
			process.env.AZURE_SUBSCRIPTION_ID!
		);

		const resources = [];
		for await (const resource of client.resources.list()) {
			resources.push(resource);
		}

		console.log("Azure Resources:", resources);
		return resources;
	} catch (error) {
		console.error("Azure API Error:", error);
		throw new Error(
			`Azure: ${error instanceof Error ? error.message : "Unknown error"}`
		);
	}
};

export default handleAzureView;
