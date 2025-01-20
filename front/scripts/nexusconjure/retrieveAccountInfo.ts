import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

interface AccountSettings {
    enforce_twofactor: boolean;
    api_access_enabled: boolean | null;
    access_approval_expiry: string | null;
    use_account_custom_ns_by_default: boolean;
    default_nameservers: string;
    abuse_contact_email: string | null;
}

interface LegacyFlags {
    enterprise_zone_quota: {
        maximum: number;
        current: number;
        available: number;
    };
}

interface AccountInfo {
    id: string;
    name: string;
    type: string;
    created_on: string;
    modified_on: string | null;
    settings: AccountSettings;
    legacy_flags: LegacyFlags;
    permissions?: string[];
}

interface CloudflareResponse {
    result: AccountInfo[];
    success: boolean;
    errors: unknown[];
    messages: unknown[];
}

const getAccountInfo = async (token: string): Promise<AccountInfo | null> => {
    try {
        console.log(`Attempting to fetch account info from Cloudflare`);
        const response = await fetch(
            "https://api.cloudflare.com/client/v4/accounts",
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

        // Parse response JSON safely
        const data = (await response.json()) as unknown;

        // Type guard to check if data is of type CloudflareResponse
        if (isCloudflareResponse(data)) {
            if (data.result && data.result.length > 0) {
                console.log(
                    "Fetched account info from Cloudflare:",
                    data.result[0]
                );
                return data.result[0];
            }
        } else {
            throw new Error("Invalid response format from Cloudflare API");
        }

        return null;
    } catch (error) {
        console.error(
            `Error fetching account info from Cloudflare: ${
                (error as Error).message
            }`
        );
        return null;
    }
};

// Type guard to check if the response is of type CloudflareResponse
function isCloudflareResponse(data: unknown): data is CloudflareResponse {
    return (
        typeof data === "object" &&
        data !== null &&
        "result" in data &&
        Array.isArray((data as CloudflareResponse).result) &&
        "success" in data &&
        typeof (data as CloudflareResponse).success === "boolean"
    );
}

const retrieveAccountInfo = async () => {
    const cloudflareToken = process.env.CLOUDFLARE_API_TOKEN;
    if (!cloudflareToken) {
        throw new Error(
            "CLOUDFLARE_API_TOKEN environment variable is not set."
        );
    }

    const accountInfo = await getAccountInfo(cloudflareToken);

    if (accountInfo) {
        console.log("Account Information:");
        console.log(`ID: ${accountInfo.id}`);
        console.log(`Name: ${accountInfo.name}`);
        console.log(`Type: ${accountInfo.type}`);
        console.log(`Created On: ${accountInfo.created_on}`);
        console.log(`Modified On: ${accountInfo.modified_on || "N/A"}`);
        if (accountInfo.permissions) {
            console.log(`Permissions: ${accountInfo.permissions.join(", ")}`);
        } else {
            console.log("Permissions: N/A");
        }
        console.log(
            `Settings: ${JSON.stringify(accountInfo.settings, null, 2)}`
        );
        console.log(
            `Legacy Flags: ${JSON.stringify(accountInfo.legacy_flags, null, 2)}`
        );
    } else {
        console.log("No account information found.");
    }
};

retrieveAccountInfo();
