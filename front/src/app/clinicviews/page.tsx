import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = "auto";

export default function DebugPage() {
    const headersList = headers();
    const allHeaders = Object.fromEntries(headersList.entries());
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const host = headersList.get("host") || "localhost";
    const [hostname, port] = host.split(":");
    const pathname = headersList.get("x-invoke-path") || "/";
    const fullUrl = `${protocol}://${host}${pathname}`;

    return (
        <main>
            <h1>Next.js 14 Debug Page</h1>
            <p>Current Pathname: {pathname}</p>
            <p>Full URL: {fullUrl}</p>
            <p>Hostname: {hostname}</p>
            <p>Port: {port}</p>
            <p>App Context: {headersList.get("x-app-context") || "Unknown"}</p>
            <p>
                Middleware Test:{" "}
                {headersList.get("x-middleware-test") || "Not executed"}
            </p>
            <h2>All Headers:</h2>
            <pre>{JSON.stringify(allHeaders, null, 2)}</pre>
            <div>
                <p>
                    The route below is not prefetched. If you go offline before
                    visiting it, you will fallback to an offline page (wait for
                    it..).
                </p>
                <p>
                    If you visit it while online, come back here, and then go
                    offline, it will then be available offline - served from
                    cache.
                </p>
                <Link href="/cached-on-nav" prefetch={false}>
                    cache on nav
                </Link>
            </div>
            <div className="mt-2">
                <p>
                    The route below is prefetched. If you have not visited it
                    before but go offline, it will be available offline.
                </p>
                <Link href="/cache-on-demand">cache on demand</Link>
            </div>
        </main>
    );
}
