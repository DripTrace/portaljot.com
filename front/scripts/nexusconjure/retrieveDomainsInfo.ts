import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

interface Zone {
    id: string;
    name: string;
    status: string;
    paused: boolean;
    type: string;
    development_mode: number;
    name_servers: string[];
    original_name_servers: string[] | null;
    original_registrar: string | null;
    original_dnshost: string | null;
    modified_on: string;
    created_on: string;
    activated_on: string;
    meta: {
        step: number;
        wildcard_proxiable: boolean;
        custom_certificate_quota: number;
        page_rule_quota: number;
        phishing_detected: boolean;
        multiple_railguns_allowed: boolean;
    };
}

interface CloudflareZonesResponse {
    result: Zone[];
    success: boolean;
    errors: unknown[];
    messages: unknown[];
}

const getZones = async (token: string): Promise<Zone[] | null> => {
    try {
        console.log(`Attempting to fetch zones info from Cloudflare`);
        const response = await fetch(
            "https://api.cloudflare.com/client/v4/zones",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Cloudflare fetch failed: ${response.statusText} - ${errorText}`
            );
        }

        // Parse response JSON and use type assertion
        const data = (await response.json()) as unknown;

        // Type guard to ensure 'data' is of type 'CloudflareZonesResponse'
        if (isCloudflareZonesResponse(data)) {
            if (data.result && data.result.length > 0) {
                console.log("Fetched zones info from Cloudflare:", data.result);
                return data.result;
            }
        } else {
            throw new Error("Invalid response format from Cloudflare API");
        }

        return null;
    } catch (error) {
        console.error(
            `Error fetching zones info from Cloudflare: ${
                (error as Error).message
            }`
        );
        return null;
    }
};

// Type guard to check if 'data' is of type 'CloudflareZonesResponse'
function isCloudflareZonesResponse(
    data: unknown
): data is CloudflareZonesResponse {
    return (
        typeof data === "object" &&
        data !== null &&
        "result" in data &&
        Array.isArray((data as CloudflareZonesResponse).result) &&
        "success" in data &&
        typeof (data as CloudflareZonesResponse).success === "boolean"
    );
}

const retrieveDomainsInfo = async () => {
    const cloudflareToken = process.env.CLOUDFLARE_API_TOKEN;
    if (!cloudflareToken) {
        throw new Error(
            "CLOUDFLARE_API_TOKEN environment variable is not set."
        );
    }

    const zones = await getZones(cloudflareToken);

    if (zones) {
        console.log("Domains Information:");
        zones.forEach((zone) => {
            console.log(`ID: ${zone.id}`);
            console.log(`Name: ${zone.name}`);
            console.log(`Status: ${zone.status}`);
            console.log(`Paused: ${zone.paused}`);
            console.log(`Type: ${zone.type}`);
            console.log(`Development Mode: ${zone.development_mode}`);
            console.log(`Name Servers: ${zone.name_servers.join(", ")}`);
            console.log(
                `Original Name Servers: ${
                    zone.original_name_servers
                        ? zone.original_name_servers.join(", ")
                        : "N/A"
                }`
            );
            console.log(
                `Original Registrar: ${zone.original_registrar || "N/A"}`
            );
            console.log(`Original DNS Host: ${zone.original_dnshost || "N/A"}`);
            console.log(`Modified On: ${zone.modified_on}`);
            console.log(`Created On: ${zone.created_on}`);
            console.log(`Activated On: ${zone.activated_on}`);
            console.log(`Meta: ${JSON.stringify(zone.meta, null, 2)}`);
            console.log("-----------------------------------");
        });
    } else {
        console.log("No domains information found.");
    }
};

retrieveDomainsInfo();
