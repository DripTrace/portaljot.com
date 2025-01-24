import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, File } from "formidable";
import nodemailer from "nodemailer";
import fs from "fs/promises";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req: NextRequest) {
	if (req.method !== "POST") {
		return NextResponse.json(
			{ error: "Method not allowed" },
			{ status: 405 }
		);
	}

	try {
		const form = new IncomingForm();
		const formData = await new Promise<{ fields: any; files: any }>(
			(resolve, reject) => {
				form.parse(req, (err, fields, files) => {
					if (err) reject(err);
					resolve({ fields, files });
				});
			}
		);

		const patientFile = formData.files.file as File;
		const filePath = patientFile.filepath;

		// Read the file and encode it in base64
		const fileContent = await fs.readFile(filePath);
		const fileContentBase64 = fileContent.toString("base64");

		console.log("PDF file processed successfully");

		// Configure email transporter
		const emailTransporter = nodemailer.createTransport({
			host: "smtp.protonmail.ch",
			port: 587,
			secure: true,
			auth: {
				user: process.env.PROTONMAIL_SENDER,
				pass: process.env.PROTONMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		// Send the email with the attachment
		const emailInfo = await emailTransporter.sendMail({
			from: `"LLPMG" <${process.env.PROTONMAIL_SENDER}>`,
			to: "me@russellpalma.com",
			subject: "Patient Registration Details",
			text: "A patient registration form is attached to this email.",
			attachments: [
				{
					filename: patientFile.originalFilename || "PatientForm.pdf",
					content: fileContentBase64,
					encoding: "base64",
				},
			],
		});

		console.log("Message sent successfully:", emailInfo.messageId);
		return NextResponse.json({ message: "Email sent successfully" });
	} catch (error) {
		console.error("Error in sendPatientMail:", error);
		return NextResponse.json(
			{
				error: "Failed to process and send the patient email",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
