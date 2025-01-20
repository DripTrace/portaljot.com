import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const domainHostname = request.headers.get("host") || "";
    const domainPathname = request.nextUrl.pathname;
    console.log(
        `Middleware - Hostname: ${domainHostname}, Pathname: ${domainPathname}`
    );

    // Extract domainPort from domainHostname
    const domainPort = domainHostname.split(":")[1];

    let domainContext = "unknown";
    let domainRedirectPath: string | null = null;
    let fullUrl = "";

    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    if (domainPort === "4" || domainHostname === "fsclinicals.com") {
        domainContext = "fsclinicals";
        fullUrl = `${protocol}://${domainHostname}`;
        if (domainPathname === "/") {
            domainRedirectPath = "/fsclinicals/fsclinicals-landing";
        }
    } else if (
        domainPort === "65535" ||
        domainHostname === "lomalindapsych.com"
    ) {
        domainContext = "llpmg";
        // fullUrl = `${protocol}://${domainHostname}`;
        fullUrl = `${process.env.WEBHOOK_URL}`;
        if (domainPathname === "/") {
            domainRedirectPath = "/llpmg/landing";
        }
    } else if (
        domainPort === "42690" ||
        domainHostname === "access-mentalhealth.org"
    ) {
        domainContext = "amh";
        // fullUrl = `${protocol}://${domainHostname}`;
        fullUrl = `${process.env.AMH_URL}`;
        if (domainPathname === "/") {
            domainRedirectPath = "/amh/home";
        }
    } else if (
        domainPort === "42689" ||
        domainHostname === "advancedpractice.io"
    ) {
        domainContext = "app";
        // fullUrl = `${protocol}://${domainHostname}`;
        fullUrl = `${process.env.AP_URL}`;
        if (domainPathname === "/") {
            domainRedirectPath = "/adv-prac-psy";
        }
    } else if (
        domainPort === "42069" ||
        domainHostname === "medical.driptrace.com"
    ) {
        domainContext = "driptrace";
        fullUrl = `${protocol}://${domainHostname}`;
        // No redirect for Driptrace, it stays at the root
    }

    const domainResponse = domainRedirectPath
        ? NextResponse.redirect(new URL(domainRedirectPath, request.url))
        : NextResponse.next();

    // Set the domain context in a cookie
    domainResponse.cookies.set("domainContext", domainContext, {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    // Set the full URL in a header
    domainResponse.headers.set("x-full-url", fullUrl);

    console.log(`Middleware - Set domain context to: ${domainContext}`);
    console.log(`Middleware - Set full URL to: ${fullUrl}`);
    if (domainRedirectPath) {
        console.log(`Middleware - Redirecting to: ${domainRedirectPath}`);
    }

    return domainResponse;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
