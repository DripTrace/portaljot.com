export interface FaviconConfig {
    icon: string;
    apple: string;
    shortcut: string;
}

export function getFavicon(domainContext: string): FaviconConfig {
    const basePath = "/manifest-icons";

    switch (domainContext) {
        case "llpmg":
            return {
                icon: `${basePath}/llpmg-logo-favicon.ico`,
                apple: `${basePath}/llpmg-logo-x192.png`,
                shortcut: `${basePath}/llpmg-logo-x192.png`,
            };
        case "fsclinicals":
            return {
                icon: `${basePath}/fsc-logo-favicon.ico`,
                apple: `${basePath}/fsc-logo-x192.png`,
                shortcut: `${basePath}/fsc-logo-x192.png`,
            };
        case "amh":
            return {
                icon: `${basePath}/amh-logo-favicon.ico`,
                apple: `${basePath}/amh-logo-x192.png`,
                shortcut: `${basePath}/amh-logo-x192.png`,
            };
        case "ap":
            return {
                icon: `${basePath}/ap-logo-favicon.ico`,
                apple: `${basePath}/ap-logo-x192.png`,
                shortcut: `${basePath}/ap-logo-x192.png`,
            };
        default:
            return {
                icon: `${basePath}/driptrace-logo-favicon.ico`,
                apple: `${basePath}/driptrace-logo-x192.png`,
                shortcut: `${basePath}/driptrace-logo-x192.png`,
            };
    }
}
