import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
	"/face/",
	"/face/upcoming",
	"/face/meeting(.*)",
	"/face/previous",
	"/face/recordings",
	"/face/personal-room",
]);

export default clerkMiddleware(async (auth, req) => {
	if (protectedRoute(req)) return (await auth()).redirectToSignIn();
});

export const config = {
	matcher: [
		"/face/((?!.+\\.[\\w]+$|_next).*)",
		"/face/",
		"/face/(api|trpc)(.*)",
	],
};
