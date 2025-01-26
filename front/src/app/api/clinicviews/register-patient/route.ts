import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { IncomingForm, File } from "formidable";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import archiver from "archiver";
import path from "path";
// import { renderToString } from "react-dom/server";
// import { renderToString } from "next/dist/compiled/react-dom/server-rendering-stub";
import EmailTemplate, {
	EmailTemplateProps,
} from "@/components/clinicviews/FSClinicals/EmailTemplate";
import ical, { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";
import { createElement } from "react";

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

const smtpAuthUser = process.env.FSCLINICALS_CLINICVIEWS_USER_ENDPOINT!;
const smtpAuthPass = process.env.FSCLINICALS_CLINICVIEWS_USER_PASSWORD!;
const smtpRecipient = process.env.FSCLINICALS_USER_ENDPOINT!;
const smtpHost = process.env.OFFICE365_SMTP_DOMAIN!;
const smtpPort = process.env.OFFICE365_SMTP_PORT!;

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
	const mailOptions: nodemailer.SendMailOptions = {
		from: `"FSClinicals Mail" <${smtpAuthUser}>`,
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

	const info = await transporter.sendMail(mailOptions);
	console.log(`Email sent to ${to}: Message ID: ${info.messageId}`);
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

		const { name, email, phone, reason, appointmentDate, appointmentTime } =
			fields;
		const file = files.pdf ? files.pdf[0] : null;

		const appointmentDateTime = new Date(
			`${appointmentDate}T${appointmentTime}`
		);
		const formattedAppointmentTime = formatTo12HourTime(
			appointmentDateTime.toISOString()
		);

		console.log("Parsed form data:", {
			name,
			email,
			phone,
			reason,
			appointmentDate,
			appointmentTime,
			formattedAppointmentTime,
		});

		const calendarEvent = ical({
			prodId: { company: "FSClinicals", product: "Appointment" },
			name: "FSClinicals Appointment",
		});

		calendarEvent.createEvent({
			start: appointmentDateTime,
			end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
			summary: `Appointment with ${name}`,
			description: `Details for ${name}\nReason: ${reason}`,
			location: "FSClinicals Office",
			organizer: { name: "FSClinicals Connect", email: smtpRecipient },
			attendees: [
				{ name, email, rsvp: true, role: ICalAttendeeRole.REQ },
			],
		});

		const transporter = nodemailer.createTransport({
			host: smtpHost,
			port: parseInt(smtpPort, 10),
			secure: false,
			auth: { user: smtpAuthUser, pass: smtpAuthPass },
			tls: { rejectUnauthorized: false },
		});

		await transporter.verify();

		let fileContent;
		if (file) {
			const zipFilePath = await compressFile(file);
			fileContent = await fs.readFile(zipFilePath);
		}

		const emailProps: EmailTemplateProps = {
			name,
			email,
			phone,
			reason,
			appointmentDate,
			appointmentTime: formattedAppointmentTime,
			isDoctor: false,
		};

		const patientEmailHtml = renderToString(
			createElement(EmailTemplate, { ...emailProps, isDoctor: false })
		);

		const doctorEmailHtml = renderToString(
			createElement(EmailTemplate, { ...emailProps, isDoctor: true })
		);

		await sendEmailWithCalendar(
			transporter,
			smtpRecipient,
			"New Patient Registration and Appointment",
			doctorEmailHtml,
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

		await sendEmailWithCalendar(
			transporter,
			email,
			"Registration Confirmation",
			patientEmailHtml,
			calendarEvent
		);

		return NextResponse.json({
			message: "Patient registered successfully",
		});
	} catch (error) {
		console.error("Error in patient registration process:", error);
		return NextResponse.json(
			{
				error: "Error processing patient registration",
				details: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
