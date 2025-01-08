// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Add rate limiting headers if needed
	const response = NextResponse.next();

	// Add security headers
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-XSS-Protection", "1; mode=block");

	return response;
}

export const config = {
	matcher: "/api/generate/video/runway/:path*",
};
