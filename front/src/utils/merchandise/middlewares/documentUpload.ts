import { NextRequest, NextResponse } from "next/server";
import { createRouter, NextHandler } from "next-connect";
import multiparty from "multiparty";

interface ExtendedRequest extends NextRequest {
	body?: Record<string, any>;
	files?: Record<string, any>;
}

const documentUpload = createRouter<ExtendedRequest, NextResponse>();

documentUpload.use(
	async (req: ExtendedRequest, res: NextResponse, next: NextHandler) => {
		try {
			const form = new multiparty.Form();

			form.parse(req as any, (err, fields, files) => {
				if (err) {
					console.error("Error parsing form data:", err);
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
			console.error("Internal server error in document upload:", error);
			return res.json(
				{ error: "Internal server error during document upload." },
				{ status: 500 }
			);
		}
	}
);

export default documentUpload;
