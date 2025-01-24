import { checkAccess } from "@/utils/merchandise/middlewares/checkAccess";
import userAuth from "@/utils/merchandise/middlewares/userAuth";
import { createRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface ExtendedRequest extends NextRequest {
	user?: any; // Replace 'any' with a more specific type if possible
}

// Create a router instance for handling API requests
const accessHandler = createRouter<ExtendedRequest, NextResponse>();

// Middleware for user authentication
const userAuthMiddleware = async (
	req: ExtendedRequest,
	res: NextResponse,
	next: Function
): Promise<void> => {
	await userAuth(req, res, next);
};

// Middleware for access control
const accessMiddleware = (
	resource: string,
	action: string,
	ownership: string
) => {
	return async (req: ExtendedRequest, res: NextResponse, next: Function) => {
		await checkAccess(resource, action, ownership)(req, res, next);
	};
};

// Define routes and handlers
accessHandler
	.use(userAuthMiddleware)
	.get(
		accessMiddleware("users", "read:own", ""),
		async (req: ExtendedRequest) => {
			return NextResponse.json({ ok: true, data: "user" });
		}
	)
	.put(
		accessMiddleware("users", "update:own", ""),
		async (req: ExtendedRequest) => {
			return NextResponse.json({ ok: true, data: "user" });
		}
	)
	.delete(
		accessMiddleware("users", "delete:any", ""),
		async (req: ExtendedRequest) => {
			return NextResponse.json({ ok: true, data: {} });
		}
	)
	.get(
		accessMiddleware("app", "read:any", ""),
		async (req: ExtendedRequest) => {
			return NextResponse.json({ ok: true, data: "user" });
		}
	)
	.put(
		accessMiddleware("app", "update:any", ""),
		async (req: ExtendedRequest) => {
			return NextResponse.json({ ok: true, data: "user" });
		}
	)
	.delete(
		accessMiddleware("app", "delete:any", ""),
		async (req: ExtendedRequest) => {
			return NextResponse.json({ ok: true, data: {} });
		}
	);

// Export the handler for Next.js
export const handler = accessHandler.handler();

export const config = {
	api: {
		bodyParser: false,
	},
};
