"use server";

import digitalocean from "digitalocean";

const client = digitalocean.client(process.env.DIGITALOCEAN_API_KEY as string);

export const handleDigitalOceanView = async (): Promise<any> => {
	try {
		const account = await client.account.get();
		// @ts-ignore
		const droplets = await client.droplets.list();
		console.log("DigitalOcean Account:", account);
		console.log("DigitalOcean Droplets:", droplets);
		return { account, droplets };
	} catch (error) {
		console.error("DigitalOcean error:", error);
		throw new Error(`DigitalOcean: ${(error as Error).message}`);
	}
};

// "use server";

// import digitalocean from "digitalocean";

// const client = digitalocean.client(process.env.DIGITALOCEAN_API_KEY as string);

// export const handleDigitalOceanView = async (): Promise<any> => {
// 	try {
// 		const account = await client.account.get();
// 		// @ts-ignore
// 		const dropletsResponse = await client.droplets.list();
// 		const droplets = dropletsResponse.droplets;
// 		return { account, droplets };
// 	} catch (error) {
// 		console.error("DigitalOcean error:", error);
// 		throw new Error(`DigitalOcean: ${(error as Error).message}`);
// 	}
// };
