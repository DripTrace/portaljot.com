// import { NextApiRequest, NextApiResponse } from "next";
// import { createRouter, NextHandler } from "next-connect";
// import multiparty from "multiparty";
// import ac from "@/lib/modify/authentication/accessControl";

// // 1) Force this route to run in Node.js mode so we can use next-connect, multiparty, etc.
// export const runtime = "nodejs";

// // 2) ExtendedRequest for next-connect
// interface ExtendedRequest extends NextApiRequest {
// 	body: any;
// 	files?: any;
// 	session?: {
// 		user?: {
// 			role?: string;
// 		};
// 	};
// }

// // 3) userAuth middleware
// async function userAuth(
// 	req: ExtendedRequest,
// 	res: NextApiResponse,
// 	next: NextHandler
// ) {
// 	// Example: check if user is signed in with NextAuth.
// 	// Typically you'd do: const session = await getServerSession({ req, res, ...authOptions })
// 	// For demonstration, we just check an Authorization header:
// 	const authHeader = req.headers.authorization || "";
// 	if (!authHeader) {
// 		return res.status(403).json({
// 			ok: false,
// 			message: "User authentication required.",
// 		});
// 	}
// 	// Mock session object to show how you'd attach it
// 	req.session = {
// 		user: {
// 			// Could parse out role from the token or database
// 			role: "editor",
// 		},
// 	};
// 	return next();
// }

// // 4) fileUpload middleware using multiparty
// async function fileUpload(
// 	req: ExtendedRequest,
// 	res: NextApiResponse,
// 	next: NextHandler
// ) {
// 	const form = new multiparty.Form();
// 	try {
// 		await new Promise<void>((resolve, reject) => {
// 			form.parse(req, (err, fields, files) => {
// 				if (err) return reject(err);
// 				req.body = fields;
// 				req.files = files;
// 				resolve();
// 			});
// 		});
// 		return next();
// 	} catch (error) {
// 		return res
// 			.status(500)
// 			.json({ ok: false, error: "Error parsing form data" });
// 	}
// }

// // 5) checkAccess middleware
// function checkAccess(resource: string, action: string, possession: string) {
// 	return (req: ExtendedRequest, res: NextApiResponse, next: NextHandler) => {
// 		const userRole = req.session?.user?.role || "";
// 		let permission: { granted: boolean } = { granted: false };
// 		try {
// 			permission = ac.permission({
// 				role: userRole,
// 				resource,
// 				action,
// 				possession,
// 			});
// 		} catch {
// 			permission.granted = false;
// 		}
// 		if (!permission.granted) {
// 			return res.status(403).json({
// 				ok: false,
// 				message: "You are not authorized to access this resource",
// 			});
// 		}
// 		return next();
// 	};
// }

// // 6) Create a next-connect router
// const router = createRouter<ExtendedRequest, NextApiResponse>();

// // 7) Attach our middlewares
// router
// 	.use(userAuth)
// 	.use(fileUpload)
// 	.use(checkAccess("document", "create", "any")) // example usage
// 	.post(async (req, res) => {
// 		// If we got here, user is authenticated, file is parsed, and role-based check is OK
// 		return res.status(200).json({
// 			ok: true,
// 			message: "File uploaded and user authorized",
// 			fields: req.body, // from multiparty
// 			files: req.files,
// 			userRole: req.session?.user?.role || "",
// 		});
// 	});

// /**
//  * The Next.js 13 App Router expects named exports like GET, POST, PUT, etc.
//  * We'll handle only POST in this route. We pass control to `router.run`.
//  */
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
// 	return router.run(req, res);
// }

import { NextRequest, NextResponse } from "next/server";
import { createRouter, NextHandler } from "next-connect";
import multiparty from "multiparty";
import { Readable } from "node:stream";
import { ServerResponse } from "node:http";
import ac from "@/lib/modify/authentication/accessControl";

// 1) Force Node.js runtime so we can do next-connect, multiparty, etc.
export const runtime = "nodejs";

// 2) Extended types
interface ExtendedSession {
	user: {
		role: string;
	};
}
interface ExtendedRequest extends Request {
	session?: ExtendedSession | null;
	body?: any;
	files?: any;
}

// 3) next-connect middlewares
async function userAuth(
	req: ExtendedRequest,
	res: ServerResponse,
	next: NextHandler
) {
	// In real usage, you'd do e.g. `getServerSession({ req, res })` or check a token
	const authHeader = req.headers.get("authorization") || "";
	if (!authHeader) {
		res.statusCode = 403;
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({
				ok: false,
				message: "User authentication required.",
			})
		);
		return;
	}
	req.session = { user: { role: "editor" } }; // mock role
	next();
}

async function fileUpload(
	req: ExtendedRequest,
	res: ServerResponse,
	next: NextHandler
) {
	const form = new multiparty.Form();

	try {
		// We must convert the Request body to a Node stream for multiparty
		const buffers: Buffer[] = [];
		for await (const chunk of req.body as any) {
			buffers.push(Buffer.from(chunk));
		}
		const finalBuffer = Buffer.concat(buffers);

		// Convert it into a Node Readable Stream
		const readStream = new Readable();
		readStream.push(finalBuffer);
		readStream.push(null);

		form.parse(
			// Hack: Use an object that has .pipe
			{
				pipe: (dest: any) => readStream.pipe(dest),
				headers: { ...Object.fromEntries(req.headers) },
			} as any,
			(err, fields, files) => {
				if (err) {
					res.statusCode = 500;
					res.setHeader("Content-Type", "application/json");
					res.end(
						JSON.stringify({ error: "Error parsing form data" })
					);
					return;
				}
				req.body = fields;
				req.files = files;
				next();
			}
		);
	} catch (err) {
		res.statusCode = 500;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ error: "Error reading request body" }));
	}
}

function checkAccess(resource: string, action: string, possession: string) {
	return (req: ExtendedRequest, res: ServerResponse, next: NextHandler) => {
		const userRole = req.session?.user?.role || "";
		let permission: { granted: boolean } = { granted: false };
		try {
			permission = ac.permission({
				role: userRole,
				resource,
				action,
				possession,
			});
		} catch {
			permission.granted = false;
		}
		if (!permission.granted) {
			res.statusCode = 403;
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify({ ok: false, message: "Not authorized" }));
			return;
		}
		next();
	};
}

// 4) Build the next-connect router
const router = createRouter<ExtendedRequest, ServerResponse>();

router
	.use(userAuth)
	.use(fileUpload)
	.use(checkAccess("document", "create", "any"))
	.post((req: ExtendedRequest, res: ServerResponse) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({
				ok: true,
				message: "File uploaded and user authorized",
				fields: req.body,
				files: req.files,
				userRole: req.session?.user?.role || "",
			})
		);
	});

// 5) The Next.js route definitions (only POST in this example)
export async function POST(request: NextRequest): Promise<NextResponse> {
	// We must adapt NextRequest -> Node's req/res
	const { req, res } = createNodejsMocks(request);

	await router.run(req, res);
	return toNextResponse(res);
}

/**
 * Helper: Convert NextRequest to Node's IncomingMessage/ServerResponse.
 * We'll collect the body as a stream to pass to multiparty in fileUpload.
 */
function createNodejsMocks(request: NextRequest) {
	// Mock "req" object
	const req: ExtendedRequest = {
		headers: request.headers,
		method: request.method,
		// Our custom body usage below
		body: request.body,
		url: request.url,
		// We'll attach more stuff if needed
	} as any;

	// Because NextRequest.body is a ReadableStream, we can pass it along
	// We'll do that in fileUpload above.

	// Mock "res" object
	let statusCode = 200;
	let headers: Record<string, string> = {};
	let bodyData: Buffer[] = [];

	const res = new ServerResponse(req as any);
	res.write = (chunk: any): boolean => {
		bodyData.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
		return true;
	};
	res.end = (chunk: any) => {
		if (chunk)
			bodyData.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
		res.emit("finish");
	};
	Object.defineProperty(res, "statusCode", {
		get() {
			return statusCode;
		},
		set(value: number) {
			statusCode = value;
		},
	});
	res.setHeader = (name: string, value: string) => {
		headers[name.toLowerCase()] = value;
	};

	return { req, res };
}

/**
 * Helper: Convert the Node "res" back to NextResponse.
 */
function toNextResponse(res: ServerResponse): NextResponse {
	let statusCode = (res as any).statusCode || 200;
	let headers = (res as any).getHeaders ? (res as any).getHeaders() : {};
	let chunks = (res as any).bodyData || [];

	const responseBody = Buffer.concat(chunks).toString("utf-8");
	const nextResponse = new NextResponse(responseBody, {
		status: statusCode,
		headers,
	});

	return nextResponse;
}
