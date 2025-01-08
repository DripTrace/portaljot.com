// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import ac from "@/lib/modify/authentication/accessControl";
import { authOptions } from "./api/modify/auth/route";

export async function middleware(req: NextRequest) {
	const session = await getServerSession(authOptions);

	const role = session?.user?.role || "guest";

	const url = req.nextUrl;
	const pathname = url.pathname;
	const method = req.method.toLowerCase();

	const resource = pathname.split("/")[1] || "home";

	type Actions = "readAny" | "createAny" | "updateAny" | "deleteAny";
	const actionMap: Record<string, Actions> = {
		get: "readAny",
		post: "createAny",
		put: "updateAny",
		patch: "updateAny",
		delete: "deleteAny",
	};

	const action = actionMap[method] || "readAny";

	const permission = ac.can(role)[action](resource);

	if (!permission.granted) {
		return NextResponse.json(
			{ message: "You are not authorized to access this resource" },
			{ status: 403 }
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/modify/:path*"],
};
