import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/spread/",
		"/spread/auth(.*)",
		"/spread/portal(.*)",
		"/spread/images(.*)",
	],
	ignoredRoutes: ["/spread/chatbot"],
});

export const config = {
	matcher: [
		"/spread/((?!.+.[w]+$|_next).*)",
		"/spread/",
		"/spread/(api|trpc)(.*)",
	],
};
