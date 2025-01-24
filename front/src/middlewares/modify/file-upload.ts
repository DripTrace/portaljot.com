import { NextRequest, NextResponse } from "next/server";
import { createRouter, NextHandler } from "next-connect";
import multiparty from "multiparty";

interface ExtendedRequest extends NextRequest {
	body?: Record<string, any>;
	files?: Record<string, any>;
}

const fileUploadRouter = createRouter<ExtendedRequest, NextResponse>();

// Middleware to handle file upload using multiparty
fileUploadRouter.use(
	async (req: ExtendedRequest, res: NextResponse, next: NextHandler) => {
		const form = new multiparty.Form();

		try {
			const parsedForm = await new Promise<{
				fields: Record<string, any>;
				files: Record<string, any>;
			}>((resolve, reject) => {
				form.parse(req.body as any, (err, fields, files) => {
					if (err) reject(err);
					resolve({ fields, files });
				});
			});

			req.body = parsedForm.fields;
			req.files = parsedForm.files;
			next();
		} catch (error) {
			console.error("Error parsing form data:", error);
			return res.json(
				{ error: "Error parsing form data", details: error.message },
				{ status: 500 }
			);
		}
	}
);

// POST handler to process the uploaded files and form data
fileUploadRouter.post((req: ExtendedRequest, res: NextResponse) => {
	console.log("Parsed fields:", req.body);
	console.log("Parsed files:", req.files);

	return res.json(
		{
			message: "File upload successful",
			fields: req.body,
			files: req.files,
		},
		{ status: 200 }
	);
});

// Export the default handler
export const POST = async (req: NextRequest) => {
	return fileUploadRouter.handler(req);
};

// Middleware configuration for disabling the body parser
export const config = {
	api: {
		bodyParser: false,
	},
};
