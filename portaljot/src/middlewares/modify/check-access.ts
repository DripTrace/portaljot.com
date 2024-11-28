import ac from "@/lib/modify/authentication/accessControl";
import { NextRequest, NextResponse } from "next/server";
import { NextHandler } from "next-connect";

interface ExtendedRequest extends NextRequest {
	session?: {
		user?: {
			role?: string;
		};
	};
}

export const checkAccess =
	(resource: string, action: string, possession: string) =>
	(req: ExtendedRequest, res: NextResponse, next: NextHandler) => {
		let permission: { granted: boolean };
		try {
			permission = ac.permission({
				role: req.session?.user?.role || "",
				resource,
				action,
				possession,
			});
		} catch {
			permission = { granted: false };
		}

		if (
			typeof permission.granted !== "boolean" ||
			permission.granted !== true
		) {
			// Ensure permission.granted is a boolean
			return new NextResponse(
				JSON.stringify({
					ok: false,
					message: "You are not authorized to access this resource",
				}),
				{
					status: 403,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		return next();
	};
