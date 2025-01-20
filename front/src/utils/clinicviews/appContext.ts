export function getAppContext() {
    if (typeof window !== "undefined") {
        // Client-side
        return localStorage.getItem("appContext") || "unknown";
    }
    // Server-side
    return "unknown"; // This will be overwritten by actual context in getServerSideProps
}

export function isProduction() {
    return getAppContext().includes("production");
}

export function isDevelopment() {
    return getAppContext().includes("development");
}

export function getAppName() {
    const context = getAppContext();
    if (context.startsWith("driptrace")) return "driptrace";
    if (context.startsWith("llpmg")) return "llpmg";
    if (context.startsWith("fsclinicals")) return "fsclinicals";
    return "unknown";
}
