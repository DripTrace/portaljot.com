import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
	publicRoutes: ["/nexusconjure/site", "/nexusconjure/api/uploadthing"],
	async beforeAuth(auth, req) {},
	async afterAuth(auth, req) {
		//rewrite for domains
		const url = req.nextUrl;
		const searchParams = url.searchParams.toString();
		let hostname = req.headers;

		const pathWithSearchParams = `${url.pathname}${
			searchParams.length > 0 ? `?${searchParams}` : ""
		}`;

		//if subdomain exists
		const customSubDomain = hostname
			.get("host")
			?.split(`${process.env.NEXT_PUBLIC_DOMAIN_NEXUSCONJURE}`)
			.filter(Boolean)[0];

		if (customSubDomain) {
			return NextResponse.rewrite(
				new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
			);
		}

		if (
			url.pathname === "/nexusconjure/sign-in" ||
			url.pathname === "/nexusconjure/sign-up"
		) {
			return NextResponse.redirect(
				new URL(`/nexusconjure/agency/sign-in`, req.url)
			);
		}

		if (
			url.pathname === "/nexusconjure/" ||
			(url.pathname === "/nexusconjure/site" &&
				url.host === process.env.NEXT_PUBLIC_DOMAIN_NEXUSCONJURE)
		) {
			return NextResponse.rewrite(new URL("/nexusconjure/site", req.url));
		}

		if (
			url.pathname.startsWith("/nexusconjure/agency") ||
			url.pathname.startsWith("/nexusconjure/subaccount")
		) {
			return NextResponse.rewrite(
				new URL(`${pathWithSearchParams}`, req.url)
			);
		}
	},
});

export const config = {
	matcher: [
		"/nexusconjure/((?!.+\\.[\\w]+$|_next).*)",
		"/nexusconjure/",
		"/nexusconjure/(api|trpc)(.*)",
	],
};
