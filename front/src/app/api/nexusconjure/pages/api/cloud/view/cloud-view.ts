import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "flatted";
// import { handleWireguardView } from "@/actions/cloud/wireguard";
// import { handleTrueNASView } from "@/actions/cloud/truenas";
import handleAzureView from "@/actions/cloud/azure";
import { handleGcpView } from "@/actions/cloud/gcp";
import { handleAwsView } from "@/actions/cloud/aws";
import { handleLinodeView } from "@/actions/cloud/linode";
import { handleVultrView } from "@/actions/cloud/vultr";
import { handleDigitalOceanView } from "@/actions/cloud/digitalocean";
import { handleProxmoxView } from "@/actions/cloud/proxmox";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const [
                // wireguard,
                // truenas,
                azure,
                gcp,
                aws,
                linode,
                vultr,
                digitalOcean,
                proxmox,
            ] = await Promise.all([
                // handleWireguardView(),
                // handleTrueNASView(),
                handleAzureView(),
                handleGcpView(),
                handleAwsView(),
                handleLinodeView(),
                handleVultrView(),
                handleDigitalOceanView(),
                handleProxmoxView(),
            ]);

            const cloudData = {
                // wireguard,
                // truenas,
                azure,
                gcp,
                aws,
                linode,
                vultr,
                digitalOcean,
                proxmox,
            };

            res.status(200).json({ data: stringify(cloudData) });
        } catch (error) {
            console.error("Error fetching cloud data:", error);
            res.status(500).json({ error: "Failed to fetch cloud data" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
