import { manifestConfig } from "../../config/manifestConfig";
interface FaviconConfig {
    icon: string;
    apple: string;
    shortcut: string;
}

export function getFavicon(domainContext: string): FaviconConfig {
    const config = manifestConfig[domainContext];
    if (!config) {
        console.error(
            `(config/manifestConfig)\nNo configuration found for domain context: ${domainContext}`
        );
        return {
            icon: "/manifest-icons/default-favicon.ico",
            apple: "/manifest-icons/default-icon-192x192.png",
            shortcut: "/manifest-icons/default-icon-512x512.png",
        };
    }

    const basePath = "/manifest-icons";
    const prefix = config.iconPrefix;

    return {
        icon: `${basePath}/${prefix}-favicon.ico`,
        apple: `${basePath}/${prefix}-x192.png`,
        shortcut: `${basePath}/${prefix}-x512.png`,
    };
}
