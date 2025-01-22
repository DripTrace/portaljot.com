import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
	// Restrict admin route to users with specific role
	//   if (isAdminRoute(req)) auth().protect({ role: "org:admin" });
	// Restrict dashboard routes to logged in users
	//   if (isDashboardRoute(req)) auth().protect();
});

export const config = {
	matcher: [
		"/say/((?!.*\\..*|_next).*)",
		"/say/",
		"/say/translate",
		"/say/(api|trpc)(.*)",
	],
};
