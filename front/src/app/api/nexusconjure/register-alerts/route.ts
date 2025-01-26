import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { IncomingForm, File } from "formidable";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import archiver from "archiver";
import path from "path";
// import { renderToString } from "react-dom/server";
// import EmailTemplate, {
// 	EmailTemplateProps,
// } from "@/components/nexusconjure/templates/EmailTemplate";
import ical, { ICalAttendeeStatus, ICalAttendeeRole } from "ical-generator";
import twilio from "twilio";
import React from "react";
import EmailTemplate, {
	EmailTemplateProps,
} from "@/components/templates/EmailTemplate";

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

const local = process.env;
const devMode = local.NODE_ENV === "development";
const smtpAuthUser = local.SMTP_USER as string;
const smtpAuthPass = local.SMTP_PASSWORD as string;
const smtpRecipient = "rpalm@russellpalma.com";
const smtpHost = local.SMTP_HOST as string;
const smtpPort = local.SMTP_PORT as string;
const twilioClient = twilio(local.TWILIO_ACCOUNT_SID, local.TWILIO_AUTH_TOKEN);
const twilioFromNumber = local.TWILIO_PHONE_NUMBER as string;
const businessPhoneNumber = local.TWILIO_PHONE_RECIPIENT as string;

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

function formatTo12HourTime(dateString: string): string {
	const date = new Date(dateString);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

async function sendEmailWithCalendar(
	transporter: nodemailer.Transporter,
	to: string,
	subject: string,
	content: string,
	calendarEvent: any,
	attachments?: nodemailer.SendMailOptions["attachments"]
) {
	console.log(`Sending email to ${to}`);

	const mailOptions: nodemailer.SendMailOptions = {
		from: `"NexusConjure Mail" <${smtpAuthUser}>`,
		to,
		subject,
		html: content,
		attachments: [
			...(attachments || []),
			{
				filename: "event.ics",
				content: calendarEvent.toString(),
				contentType: "text/calendar",
			},
		],
		alternatives: [
			{
				contentType: "text/calendar",
				content: Buffer.from(calendarEvent.toString()),
				contentDisposition: "inline",
			},
		],
	};

	await transporter.sendMail(mailOptions);

	console.log(`Email sent successfully to ${to}`);
}

export async function POST(req: CustomNextRequest) {
	const { renderToString } = await import("react-dom/server");
	const form = new IncomingForm();

	try {
		const [fields, files] = await new Promise<[any, any]>(
			(resolve, reject) => {
				form.parse(req as any, (err, fields, files) => {
					if (err) reject(err);
					resolve([fields, files]);
				});
			}
		);

		const {
			businessName,
			corporateWebsite,
			businessAddress,
			businessCity,
			businessState,
			businessZip,
			businessContactFirstName,
			businessContactLastName,
			estimatedMonthlyVolume,
			useCaseCategory,
			useCaseSummary,
			productionMessageSample,
			optInWorkflowDescription,
			optInImageUrls,
			webFormUrl,
			name,
			email,
			phone,
			reason,
			smsOptIn,
			emailOptIn,
			availability,
			privacyPolicyOptIn,
			termsOfServiceOptIn,
			promotionalOptIn,
			marketingOptIn,
		} = fields;

		const file = files.file ? (files.file[0] as File) : null;

		let fileContent, fileSize;
		if (file) {
			const zipFilePath = await compressFile(file);
			fileContent = await fs.readFile(zipFilePath);
			fileSize = fileContent.length;
		}

		const appointmentDateTime = new Date(availability[0]);
		const appointmentDate = appointmentDateTime.toISOString().split("T")[0];
		const appointmentTime = formatTo12HourTime(
			appointmentDateTime.toISOString()
		);

		const calendarEvent = ical({ name: "NexusConjure Alert Registration" });
		calendarEvent.createEvent({
			start: appointmentDateTime,
			end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
			summary: `Alert Registration for ${name[0]}`,
			description: `Alert registration details for ${name[0]} on ${appointmentDate} at ${appointmentTime}.`,
			location: "NexusConjure",
			organizer: { name: "NexusConjure Alerts", email: smtpRecipient },
			attendees: [{ name: name[0], email: email[0], rsvp: true }],
		});

		const transporter = nodemailer.createTransport({
			host: smtpHost,
			port: parseInt(smtpPort, 10),
			secure: false,
			auth: { user: smtpAuthUser, pass: smtpAuthPass },
		});

		const emailTemplateProps: EmailTemplateProps = {
			...fields,
			appointmentDate,
			appointmentTime,
			fileUploaded: !!file,
		};

		const platformEmailHtml = renderToString(
			React.createElement(EmailTemplate, {
				...emailTemplateProps,
				isPlatform: true,
			})
		);
		const customerEmailHtml = renderToString(
			React.createElement(EmailTemplate, {
				...emailTemplateProps,
				isPlatform: false,
			})
		);

		await sendEmailWithCalendar(
			transporter,
			smtpRecipient,
			"New NexusConjure Alert Registration",
			platformEmailHtml,
			calendarEvent,
			file
				? [
						{
							filename: `${file.originalFilename}.zip`,
							content: fileContent,
						},
					]
				: undefined
		);

		if (emailOptIn[0] === "true") {
			await sendEmailWithCalendar(
				transporter,
				email[0],
				"NexusConjure Alert Registration Confirmation",
				customerEmailHtml,
				calendarEvent
			);
		}

		if (smsOptIn[0] === "true") {
			await twilioClient.messages.create({
				body: `Thank you ${name[0]} for registering with NexusConjure. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}.`,
				from: twilioFromNumber,
				to: phone[0],
			});
		}

		return NextResponse.json(
			{ message: "Alert registration successful" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error registering alert:", error);
		return NextResponse.json(
			{
				error: "Error registering alert",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
