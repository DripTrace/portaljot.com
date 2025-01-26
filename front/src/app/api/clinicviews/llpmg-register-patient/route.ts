import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, File } from "formidable";
import nodemailer from "nodemailer";
import dynamic from "next/dynamic";
import LLPMGEmailTemplate from "@/components/clinicviews/LLPMG/LLPMGEmailTemplate";
import { SDK } from "@ringcentral/sdk";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import archiver from "archiver";
import path from "path";
import { createElement } from "react";
import { IncomingMessage } from "http";

export const config = {
	api: {
		bodyParser: false,
	},
};

interface CustomNextRequest extends NextRequest {
	socket: {
		server: any;
	};
}

const rcsdk = new SDK({
	server: process.env.RC_SERVER_URL!,
	clientId: process.env.RC_CLIENT_ID!,
	clientSecret: process.env.RC_CLIENT_SECRET!,
});

const platform = rcsdk.platform();

async function sendSMS(to: string | number, message: string) {
	try {
		await platform.login({ jwt: process.env.RC_JWT! });

		const phoneString = String(to);
		const formattedPhoneNumber = phoneString.startsWith("+1")
			? phoneString
			: `+1${phoneString.replace(/\D/g, "")}`;

		if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
			throw new Error(
				`Invalid phone number format: ${formattedPhoneNumber}`
			);
		}

		const response = await platform.post(
			"/restapi/v1.0/account/~/extension/~/sms",
			{
				from: { phoneNumber: process.env.RC_PHONE_NUMBER },
				to: [{ phoneNumber: formattedPhoneNumber }],
				text: message,
			}
		);

		return response.json();
	} catch (error) {
		console.error("Error sending SMS:", error);
		throw error;
	}
}

async function compressFile(file: File): Promise<string> {
	const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
	const output = createWriteStream(zipFilePath);
	const archive = archiver("zip", { zlib: { level: 9 } });

	return new Promise((resolve, reject) => {
		output.on("close", () => resolve(zipFilePath));
		archive.on("error", reject);
		archive.pipe(output);
		archive.file(file.filepath, { name: file.originalFilename ?? "file" });
		archive.finalize();
	});
}

async function sendEmail(
	transporter: nodemailer.Transporter,
	to: string,
	subject: string,
	content: string,
	attachments?: nodemailer.SendMailOptions["attachments"]
) {
	const mailOptions: nodemailer.SendMailOptions = {
		from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
		to,
		subject,
		html: content,
		attachments: attachments || [],
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}

export async function POST(req: CustomNextRequest) {
	try {
		const { renderToString } = await import("react-dom/server");

		const form = new IncomingForm();
		const [fields, files] = await new Promise<[any, any]>(
			(resolve, reject) => {
				const nodeReq = req.socket as unknown as IncomingMessage;
				form.parse(nodeReq, (err, fields, files) => {
					if (err) reject(err);
					resolve([fields, files]);
				});
			}
		);

		const {
			firstName,
			lastName,
			email,
			phone,
			birthday,
			insurance,
			address,
			city,
			state,
			zipCode,
			reason,
			providerPhone,
			providerEmail,
		} = fields;

		const patientName = `${firstName[0]} ${lastName[0]}`.toUpperCase();
		const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;
		const file = files.pdf ? files.pdf[0] : null;

		const emailTransporter = nodemailer.createTransport({
			host: process.env.PROTONMAIL_HOST!,
			port: Number(process.env.PROTONMAIL_PORT),
			secure: false,
			auth: {
				user: process.env.PROTONMAIL_SENDER!,
				pass: process.env.PROTONMAIL_PASSWORD!,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		await emailTransporter.verify();

		const patientEmailHtml = renderToString(
			createElement(LLPMGEmailTemplate, {
				name: patientName,
				email,
				phone,
				birthday,
				insurance,
				address: fullAddress,
				reason,
				isDoctor: false,
				providerPhone,
				providerEmail,
			})
		);

		const doctorEmailHtml = renderToString(
			createElement(LLPMGEmailTemplate, {
				name: patientName,
				email,
				phone,
				birthday,
				insurance,
				address: fullAddress,
				reason,
				isDoctor: true,
				providerPhone,
				providerEmail,
			})
		);

		let fileContent;
		if (file) {
			const zipFilePath = await compressFile(file);
			fileContent = await fs.readFile(zipFilePath);
		}

		await sendEmail(
			emailTransporter,
			email,
			`Registration Confirmation - ${patientName}`,
			patientEmailHtml,
			file
				? [
						{
							filename: `${file.originalFilename}.zip`,
							content: fileContent,
						},
					]
				: undefined
		);

		await sendEmail(
			emailTransporter,
			providerEmail,
			`New Patient Registration Details - ${patientName}`,
			doctorEmailHtml,
			file
				? [
						{
							filename: `${file.originalFilename}.zip`,
							content: fileContent,
						},
					]
				: undefined
		);

		const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your registration has been received.`;
		const providerSMS = `Hello, a new patient has registered. Please review the details in your email.`;

		await sendSMS(phone, smsMessage);
		await sendSMS(providerPhone, providerSMS);

		return NextResponse.json({ message: "Registration successful" });
	} catch (error) {
		console.error("Error in POST request:", error);
		return NextResponse.json(
			{
				error: "An error occurred",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
