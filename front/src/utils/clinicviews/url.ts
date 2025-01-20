export function getFullUrl(req: any): string {
    const host =
        req.headers.get("host") || req.headers.host || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    return `${protocol}://${host}`;
}
