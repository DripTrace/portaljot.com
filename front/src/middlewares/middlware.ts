/**
 * Example "middleware.ts" that merges:
 *  - Domain rewriting (edge logic)
 *  - NextAuth-based session checks (withAuth)
 *  - next-connect style middleware (userAuth, fileUpload, checkAccess)
 *  - Additional route matching
 *
 * In real-world usage:
 *  - Domain rewriting is done in Edge middleware.
 *  - next-connect code is done in Node-based route handlers (e.g., /app/api/.../route.ts).
 */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { createRouter, NextHandler } from "next-connect";
import multiparty from "multiparty";
import ac from "@/lib/modify/authentication/accessControl";
import { ENVIRONMENT } from "@/constants/school/forms";

/* --------------------------------------------
   NEXT-CONNECT MIDDLEWARE USAGE
-------------------------------------------- */

/**
 * ExtendedRequest for next-connect:
 *   Typically used in Node server routes, not in Edge.
 */
interface ExtendedRequest extends NextRequest {
	body?: any;
	files?: any;
	session?: {
		user?: {
			role?: string;
		};
	};
}

/**
 * fileUpload middleware: uses multiparty to parse form data.
 * Typically you'd do this in a server route, not Edge.
 */
async function fileUploadMiddleware(
	req: ExtendedRequest,
	_res: NextResponse,
	next: NextHandler
) {
	const form = new multiparty.Form();
	// In Edge environment, this won't work. This is for demonstration.
	await new Promise<void>((resolve, reject) => {
		form.parse(req as any, (err: any, fields: any, files: any) => {
			if (err) {
				reject(err);
			} else {
				req.body = fields;
				req.files = files;
				resolve();
			}
		});
	});
	next();
}

/**
 * userAuth middleware: check if there's a NextAuth session.
 * In Edge, you can't do getServerSession. This is a mock approach.
 */
async function userAuthMiddleware(
	req: ExtendedRequest,
	_res: NextResponse,
	next: NextHandler
) {
	// In Edge, you'd rely on withAuth token checking.
	// This mock checks an Authorization header, for example:
	const token = req.headers.get("Authorization");
	if (!token) {
		return new NextResponse(
			JSON.stringify({
				ok: false,
				message: "User authentication required.",
			}),
			{ status: 403, headers: { "Content-Type": "application/json" } }
		);
	}
	// If valid token, attach a mock session
	req.session = { user: { role: "editor" } }; // or "owner"
	next();
}

/**
 * checkAccess middleware: verifies user role from session against AC.
 */
function checkAccessMiddleware(
	resource: string,
	action: string,
	possession: string
) {
	return (req: ExtendedRequest, _res: NextResponse, next: NextHandler) => {
		let userRole = req.session?.user?.role || "";
		let permission: { granted: boolean } = { granted: false };
		try {
			permission = ac.permission({
				role: userRole,
				resource,
				action,
				possession,
			});
		} catch {
			permission.granted = false;
		}
		if (!permission.granted) {
			return new NextResponse(
				JSON.stringify({
					ok: false,
					message: "You are not authorized",
				}),
				{ status: 403, headers: { "Content-Type": "application/json" } }
			);
		}
		next();
	};
}

/**
 * Build a next-connect router with all the sub-middlewares:
 * In real usage, you'd do this in a route file (e.g. /app/api/some-route/route.ts).
 */
const router = createRouter<ExtendedRequest, NextResponse>();
router
	.use(fileUploadMiddleware)
	.use(userAuthMiddleware)
	.use(checkAccessMiddleware("someResource", "read", "any"));

/* --------------------------------------------
   EDGE MIDDLEWARE FOR DOMAIN & ROUTE
-------------------------------------------- */

/** Domain rewriting logic. */
function domainMiddleware(request: NextRequest) {
	const domainHostname = request.headers.get("host") || "";
	const domainPathname = request.nextUrl.pathname;
	const domainPort = domainHostname.split(":")[1];
	let domainContext = "unknown";
	let domainRedirectPath: string | null = null;
	let fullUrl = "";
	const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

	if (domainPort === "4" || domainHostname === "fsclinicals.com") {
		domainContext = "fsclinicals";
		fullUrl = `${protocol}://${domainHostname}`;
		if (domainPathname === "/clinicviews/") {
			domainRedirectPath = "/clinicviews/fsclinicals/fsclinicals-landing";
		}
	} else if (
		domainPort === "65535" ||
		domainHostname === "lomalindapsych.com"
	) {
		domainContext = "llpmg";
		fullUrl = process.env.WEBHOOK_URL || `${protocol}://${domainHostname}`;
		if (domainPathname === "/clinicviews/") {
			domainRedirectPath = "/clinicviews/llpmg/landing";
		}
	} else if (
		domainPort === "42690" ||
		domainHostname === "access-mentalhealth.org"
	) {
		domainContext = "amh";
		fullUrl = process.env.AMH_URL || `${protocol}://${domainHostname}`;
		if (domainPathname === "/clinicviews/") {
			domainRedirectPath = "/clinicviews/amh/home";
		}
	} else if (
		domainPort === "42689" ||
		domainHostname === "advancedpractice.io"
	) {
		domainContext = "app";
		fullUrl = process.env.AP_URL || `${protocol}://${domainHostname}`;
		if (domainPathname === "/clinicviews/") {
			domainRedirectPath = "/clinicviews/adv-prac-psy";
		}
	} else if (
		domainPort === "42069" ||
		domainHostname === "medical.driptrace.com"
	) {
		domainContext = "driptrace";
		fullUrl = `${protocol}://${domainHostname}`;
	}

	const response = domainRedirectPath
		? NextResponse.redirect(new URL(domainRedirectPath, request.url))
		: NextResponse.next();

	response.cookies.set("domainContext", domainContext, {
		path: "/clinicviews/",
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
	});
	response.headers.set("x-full-url", fullUrl);

	return { response, domainContext, fullUrl, domainRedirectPath };
}

/**
 * Helper checks for protected routes.
 */
function isProtectedDirectRoute(urlPath: string): boolean {
	const patterns = [
		"^/direct/dashboard(.*)$",
		"^/direct/api/payment(.*)$",
		"^/direct/callback(.*)$",
	];
	return patterns.some((pattern) => new RegExp(pattern).test(urlPath));
}
function isProtectedFaceRoute(urlPath: string): boolean {
	const patterns = [
		"^/face/",
		"^/face/upcoming",
		"^/face/meeting(.*)$",
		"^/face/previous",
		"^/face/recordings",
		"^/face/personal-room",
	];
	return patterns.some((pattern) => new RegExp(pattern).test(urlPath));
}
function isProtectedWarpCatchRoute(urlPath: string): boolean {
	const patterns = ["^/warpcatch/dashboard(.*)$"];
	return patterns.some((pattern) => new RegExp(pattern).test(urlPath));
}
function isProtectedRoute(urlPath: string): boolean {
	return false;
}

/**
 * The main NextAuth + next-connect "middleware"
 */
export default withAuth(
	async function middleware(request: NextRequest) {
		const { response: domainResponse, domainRedirectPath } =
			domainMiddleware(request);
		if (domainRedirectPath) return domainResponse;

		const url = request.nextUrl;
		const hostHeader = request.headers.get("host") || "";
		const pathWithSearchParams = url.searchParams
			? `${url.pathname}?${url.searchParams.toString()}`
			: url.pathname;

		// If routes require next-connect logic, we might "simulate" a call to our router:
		// In real usage, you'd only do this in a Node environment, not Edge.
		// But here's the demonstration:
		await router.run(request as ExtendedRequest, domainResponse);

		if (isProtectedDirectRoute(url.pathname)) {
			// NextAuth withAuth => checks for token presence
		}
		if (isProtectedFaceRoute(url.pathname)) {
			return NextResponse.redirect(
				new URL("/api/auth/signin", request.url)
			);
		}
		if (isProtectedWarpCatchRoute(url.pathname)) {
			// same
		}
		if (isProtectedRoute(url.pathname)) {
			// ...
		}

		const baseHost = process.env.DOMAIN_SCHOOL || "";
		if (!baseHost.includes(hostHeader) && url.pathname.includes("/group")) {
			const result = await fetch(
				`${url.origin}/api/school/domain?host=${hostHeader}`
			);
			const data = await result.json();
			if (data.status === 200 && data) {
				return NextResponse.rewrite(
					new URL(
						`${url.pathname}`,
						`http${ENVIRONMENT}://${data.domain}`
					)
				);
			}
		}

		return domainResponse;
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				return !!token;
			},
		},
	}
);

export const config = {
	matcher: [
		"/exotalk/chat",
		"/exotalk/chat/:id*",
		"/exotalk/register",
		"/collab/((?!.*\\..*|_next).*)",
		"/collab/",
		"/collab/(api|trpc)(.*)",
		"/commune/((?!.*\\..*|_next).*)",
		"/commune",
		"/commune(api|trpc)(.*)",
		"/direct/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/direct/(api|trpc)(.*)",
		"/face/((?!.+\\.[\\w]+$|_next).*)",
		"/face/",
		"/face/(api|trpc)(.*)",
		"/nexusconjure/((?!.+\\.[\\w]+$|_next).*)",
		"/nexusconjure/",
		"/nexusconjure/(api|trpc)(.*)",
		"/say/((?!.*\\..*|_next).*)",
		"/say/",
		"/say/translate",
		"/say/(api|trpc)(.*)",
		"/spread/((?!.+\\.[\\w]+$|_next).*)",
		"/spread/",
		"/spread/(api|trpc)(.*)",
		"/warpcatch/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/warpcatch/(api|trpc)(.*)",
		"/clinicviews/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
