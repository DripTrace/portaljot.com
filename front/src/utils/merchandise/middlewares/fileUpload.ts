import { NextRequest, NextResponse } from "next/server";
import { createRouter, NextHandler } from "next-connect";
import multiparty from "multiparty";

interface ExtendedRequest extends NextRequest {
	body?: Record<string, any>;
	files?: Record<string, any>;
}

const fileUpload = createRouter<ExtendedRequest, NextResponse>();

fileUpload.use(
	async (req: ExtendedRequest, res: NextResponse, next: NextHandler) => {
		try {
			const form = new multiparty.Form();

			form.parse(req as any, (err, fields, files) => {
				if (err) {
					return res.json(
						{ error: "Error parsing form data" },
						{ status: 500 }
					);
				}

				req.body = fields;
				req.files = files;
				next();
			});
		} catch (error) {
			console.error("Error in file upload middleware:", error);
			return res.json(
				{ error: "Internal server error during file upload." },
				{ status: 500 }
			);
		}
	}
);

export default fileUpload;
