import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs/promises";

export const config = {
	api: {
		bodyParser: false, // Disable body parsing for file uploads
	},
};

export async function POST(req: NextRequest) {
	try {
		// Parse the multipart form data using formidable
		const form = new formidable.IncomingForm({ multiples: true });
		const [fields, files] = await new Promise<
			[formidable.Fields, formidable.Files]
		>((resolve, reject) => {
			form.parse(req as any, (err, fields, files) => {
				if (err) reject(err);
				else resolve([fields, files]);
			});
		});

		// Log fields and files for debugging
		console.log("Form fields:", fields);
		console.log("Uploaded files:", files);

		// Check for the SVG file
		if (!files.svg || !(files.svg as formidable.File[]).length) {
			return NextResponse.json(
				{ success: false, message: "No SVG file found in the request" },
				{ status: 400 }
			);
		}

		const svgFile = (files.svg as formidable.File[])[0];

		// Log headers of the SVG file
		console.log("SVG file headers:", svgFile.mimetype);

		// If needed, move or process the file
		const tempPath = svgFile.filepath;
		const newPath = `./uploads/${svgFile.originalFilename}`;
		await fs.rename(tempPath, newPath);

		return NextResponse.json(
			{ success: true, message: "File uploaded successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error handling file upload:", error);
		return NextResponse.json(
			{ success: false, message: "Failed to upload file" },
			{ status: 500 }
		);
	}
}
