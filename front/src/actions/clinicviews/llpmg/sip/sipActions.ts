import { SDK } from "@ringcentral/sdk";
import Platform from "@ringcentral/sdk/lib/platform/Platform";

let sdk: SDK | null = null;
let platform: Platform | null = null;

export async function initializeSDK(
    clientId: string,
    clientSecret: string,
    server: string
) {
    console.log("Initializing SDK with:", { clientId, clientSecret, server });
    sdk = new SDK({ clientId, clientSecret, server });
    platform = sdk.platform();
}

export async function login(jwtToken: string) {
    try {
        const platform = getPlatform();
        console.log("Attempting to login with JWT Token:", jwtToken);
        const response = await platform.login({ jwt: jwtToken });
        console.log("Login response:", response);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Login failed with status:", error.message);
            console.error("Error data:", error.stack);
            console.error("Complete error object:", JSON.stringify(error));
        } else {
            console.error("Login failed with an unknown error");
        }
        throw error;
    }
}

export function getPlatform() {
    if (!platform) {
        throw new Error("SDK is not initialized");
    }
    return platform;
}
