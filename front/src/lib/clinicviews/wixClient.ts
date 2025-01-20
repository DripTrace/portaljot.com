// src/utils/wixClient.ts

import { createClient, OAuthStrategy, AccessToken } from "@wix/api-client";
import data from "@wix/data";
import Cookies from "js-cookies";

// Parse tokens from cookies or initialize as empty object
const tokens = JSON.parse(Cookies.get("session") || "{}");

// Initialize the Wix client without attempting to listen for events
export const wixClient = createClient({
    modules: { data },
    auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID || "your-client-id",
        tokens: tokens,
    }),
});

// Function to save new tokens manually
export function saveTokens(newTokens: any) {
    Cookies.set("session", JSON.stringify(newTokens));
}

// You can now call saveTokens wherever you handle authentication
