import { NextRequest, NextResponse } from "next/server";
import { stringify } from "flatted";
import handleAzureView from "@/actions/feature/cloud/azure";
import { handleGcpView } from "@/actions/feature/cloud/gcp";
import { handleAwsView } from "@/actions/feature/cloud/aws";
import { handleLinodeView } from "@/actions/feature/cloud/linode";
import { handleVultrView } from "@/actions/feature/cloud/vultr";
import { handleDigitalOceanView } from "@/actions/feature/cloud/digitalocean";
import { handleProxmoxView } from "@/actions/feature/cloud/proxmox";

export async function GET(req: NextRequest) {
	try {
		const [azure, gcp, aws, linode, vultr, digitalOcean, proxmox] =
			await Promise.all([
				handleAzureView(),
				handleGcpView(),
				handleAwsView(),
				handleLinodeView(),
				handleVultrView(),
				handleDigitalOceanView(),
				handleProxmoxView(),
			]);

		const cloudData = {
			azure,
			gcp,
			aws,
			linode,
			vultr,
			digitalOcean,
			proxmox,
		};

		return NextResponse.json({ data: stringify(cloudData) });
	} catch (error) {
		console.error("Error fetching cloud data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch cloud data" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	return NextResponse.json(
		{ message: "POST method is not supported." },
		{ status: 405 }
	);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
