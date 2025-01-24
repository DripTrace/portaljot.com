import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/modify/auth/route";
import { ExtendedSession } from "@/types/modify/user-auth";
import { createRouter, NextHandler } from "next-connect";

interface ExtendedRequest extends NextRequest {
	session?: ExtendedSession | null;
}

const userAuthMiddleware = async (
	req: ExtendedRequest,
	res: NextResponse,
	next: NextHandler
) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return res
				.status(403)
				.json({ ok: false, message: "User authentication required." });
		}
		req.session = session;
		next();
	} catch (error) {
		console.error("Error in userAuth middleware:", error);
		return res
			.status(500)
			.json({ ok: false, message: "Internal server error." });
	}
};

const router = createRouter<ExtendedRequest, NextResponse>();

router.use(userAuthMiddleware);

export default router.handler();
