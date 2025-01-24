"use server";

import fetch from "node-fetch";

const handleLinodeView = async () => {
	const url = "https://api.linode.com/v4/linode/instances";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			authorization: `Bearer ${process.env.LINODE_API_KEY}`,
		},
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(
				`Linode: Request failed with status ${response.status}`
			);
		}
		const data = await response.json();

		console.log("Linode API Response: ", data);
		return data;
	} catch (error) {
		console.error("Linode API Error:", (error as Error).message);
		throw new Error("Linode: " + (error as Error).message);
	}
};

export { handleLinodeView };
