import { NextResponse, NextRequest } from "next/server";
import { NextHandler } from "next-connect";
import ac from "../services/accesscontrol";

interface ExtendedRequest extends NextRequest {
	session?: {
		user?: {
			role?: string;
		};
	};
}

export const checkAccess =
	(resource: string, action: string, possession: string) =>
	async (req: ExtendedRequest, res: NextResponse, next: NextHandler) => {
		let permission: { granted: boolean };
		try {
			permission = ac.permission({
				role: req.session?.user?.role || "",
				resource,
				action,
				possession,
			});
		} catch (error) {
			console.error("Access control permission error:", error);
			permission = { granted: false };
		}

		if (!permission.granted) {
			return NextResponse.json(
				{
					ok: false,
					message: "You are not authorized to access this resource",
				},
				{ status: 403 }
			);
		}

		return next();
	};
