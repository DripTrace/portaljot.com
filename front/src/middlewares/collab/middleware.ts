import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({});

export const config = {
	matcher: [
		"/collab/((?!.*\\..*|_next).*)",
		"/collab/",
		"/collab/(api|trpc)(.*)",
	],
};
