// app/api/clinicviews/new-patient/route.ts
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, File } from "formidable";
import nodemailer from "nodemailer";
import { ringCentralClient } from "@/lib/clinicviews/ringcentralClient";
import fs from "fs/promises";

export const config = {
	api: {
		bodyParser: false,
	},
};

async function sendSMS(to: string, message: string) {
	try {
		await ringCentralClient.login({ jwt: process.env.RC_JWT });

		const formattedPhoneNumber = to.startsWith("+1")
			? to
			: `+1${to.replace(/\D/g, "")}`;

		if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
			throw new Error(
				`Invalid phone number format: ${formattedPhoneNumber}`
			);
		}

		const resp = await ringCentralClient.post(
			"/restapi/v1.0/account/~/extension/~/sms",
			{
				from: { phoneNumber: process.env.RC_PHONE_NUMBER },
				to: [{ phoneNumber: formattedPhoneNumber }],
				text: message,
			}
		);

		return resp.json();
	} catch (error) {
		console.error("Error sending SMS:", error);
		throw error;
	}
}

export async function POST(request: NextRequest) {
	try {
		const form = new IncomingForm();
		const { fields, files } = await new Promise<any>((resolve, reject) => {
			form.parse(request.body as any, (err, fields, files) => {
				if (err) reject(err);
				else resolve({ fields, files });
			});
		});

		const { name, email, phone } = fields;
		const file: File = files.file[0];

		const fileContent = await fs.readFile(file.filepath);
		const fileContentBase64 = fileContent.toString("base64");

		const emailTransporter = nodemailer.createTransport({
			host: process.env.PROTONMAIL_HOST,
			port: Number(process.env.PROTONMAIL_PORT),
			secure: false,
			auth: {
				user: process.env.PROTONMAIL_SENDER,
				pass: process.env.PROTONMAIL_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const emailTransporterColton = nodemailer.createTransport({
			host: process.env.PROTONMAIL_HOST,
			port: Number(process.env.PROTONMAIL_PORT),
			secure: false,
			auth: {
				user: process.env.PROTONMAIL_0TH_SENDER,
				pass: process.env.PROTONMAIL_0TH_PASSWORD,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		const date = new Date();
		const formattedDate = date.toLocaleString("en-US", {
			timeZoneName: "short",
		});

		// Send email to the primary recipient
		await emailTransporter.sendMail({
			from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
			to: process.env.PROTONMAIL_RECIPIENT,
			subject: `New Patient Registration Details - ${formattedDate}`,
			text: "A patient registration form is attached to this email.",
			attachments: [
				{
					filename: `new-patient-registration_${formattedDate}.pdf`,
					content: fileContentBase64,
					encoding: "base64",
				},
			],
		});

		// Send email to Colton's recipient
		await emailTransporterColton.sendMail({
			from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_0TH_SENDER}>`,
			to: process.env.PROTONMAIL_0TH_RECIPIENT,
			subject: `New Patient Registration Details - ${formattedDate}`,
			text: "A patient registration form is attached to this email.",
			attachments: [
				{
					filename: `new-patient-registration_${formattedDate}.pdf`,
					content: fileContentBase64,
					encoding: "base64",
				},
			],
		});

		// Send SMS to the patient
		const patientSmsMessage = `Thank you for registering with Loma Linda Psychiatric Medical Group, ${name}! We have received your registration form and will contact you soon to confirm your details.`;
		await sendSMS(phone, patientSmsMessage);

		// Send SMS to the doctor/admin
		const doctorSmsMessage = `New patient registration received from ${name}. Please check your email for the registration form.`;
		await sendSMS(process.env.RC_PHONE_NUMBER!, doctorSmsMessage);

		return NextResponse.json({
			message:
				"Registration successful. Email sent and SMS notifications delivered.",
		});
	} catch (error) {
		console.error("Error in API route:", error);
		return NextResponse.json(
			{
				error: "An unknown error occurred",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
