import { NextRequest, NextResponse } from "next/server";
import { NextHandler } from "next-connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import { ExtendedSession } from "@/types/merchandise/ExtendedSession";

interface ExtendedRequest extends NextRequest {
	session?: ExtendedSession | null;
}

const userAuth = async (
	req: ExtendedRequest,
	res: NextResponse,
	next: NextHandler
) => {
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return res.json(
				{
					ok: false,
					message: "User authentication required.",
				},
				{ status: 403 }
			);
		}

		req.session = session as ExtendedSession;
		next();
	} catch (error) {
		console.error("Authentication middleware error:", error);
		return res.json(
			{
				ok: false,
				message: "Internal server error during authentication.",
			},
			{ status: 500 }
		);
	}
};

export default userAuth;
