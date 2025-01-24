// "use server";

// import { NextRequest, NextResponse } from "next/server";
// import { IncomingForm, File } from "formidable";
// import nodemailer from "nodemailer";
// import fs from "fs/promises";
// import { createWriteStream } from "fs";
// import archiver from "archiver";
// import path from "path";
// import { renderToString } from "react-dom/server";
// // import { renderToString } from "next/dist/compiled/react-dom/server-rendering-stub";
// import EmailTemplate from "@/components/clinicviews/FSClinicals/EmailTemplate";
// import ical, { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";

// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// const smtpAuthUser = process.env.FSCLINICALS_CLINICVIEWS_USER_ENDPOINT!;
// const smtpAuthPass = process.env.FSCLINICALS_CLINICVIEWS_USER_PASSWORD!;
// const smtpRecipient = process.env.FSCLINICALS_USER_ENDPOINT!;
// const smtpHost = process.env.OFFICE365_SMTP_DOMAIN!;
// const smtpPort = process.env.OFFICE365_SMTP_PORT!;

// async function compressFile(file: File): Promise<string> {
// 	const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
// 	const output = createWriteStream(zipFilePath);
// 	const archive = archiver("zip", { zlib: { level: 9 } });

// 	return new Promise((resolve, reject) => {
// 		output.on("close", () => resolve(zipFilePath));
// 		archive.on("error", reject);
// 		archive.pipe(output);
// 		archive.file(file.filepath, { name: file.originalFilename ?? "file" });
// 		archive.finalize();
// 	});
// }

// function formatTo12HourTime(dateString: string): string {
// 	const date = new Date(dateString);
// 	const hours = date.getHours();
// 	const minutes = date.getMinutes();
// 	const ampm = hours >= 12 ? "PM" : "AM";
// 	const formattedHours = hours % 12 || 12;
// 	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
// 	return `${formattedHours}:${formattedMinutes} ${ampm}`;
// }

// async function sendEmailWithCalendar(
// 	transporter: nodemailer.Transporter,
// 	to: string,
// 	subject: string,
// 	content: string,
// 	calendarEvent: any,
// 	attachments?: nodemailer.SendMailOptions["attachments"]
// ) {
// 	const mailOptions: nodemailer.SendMailOptions = {
// 		from: `"FSClinicals Mail" <${smtpAuthUser}>`,
// 		to,
// 		subject,
// 		html: content,
// 		attachments: [
// 			...(attachments || []),
// 			{
// 				filename: "event.ics",
// 				content: calendarEvent.toString(),
// 				contentType: "text/calendar",
// 			},
// 		],
// 		alternatives: [
// 			{
// 				contentType: "text/calendar",
// 				content: Buffer.from(calendarEvent.toString()),
// 				contentDisposition: "inline",
// 			},
// 		],
// 	};

// 	try {
// 		const info = await transporter.sendMail(mailOptions);
// 		console.log(`Email sent to ${to}: Message ID: ${info.messageId}`);
// 	} catch (error) {
// 		console.error(`Error sending email to ${to}:`, error);
// 		throw error;
// 	}
// }

// export async function POST(req: NextRequest) {
// 	const form = new IncomingForm();

// 	try {
// 		const [fields, files] = await new Promise<[any, any]>(
// 			(resolve, reject) => {
// 				form.parse(req as any, (err, fields, files) => {
// 					if (err) reject(err);
// 					resolve([fields, files]);
// 				});
// 			}
// 		);

// 		const patientName = Array.isArray(fields.patientName)
// 			? fields.patientName[0]
// 			: fields.patientName;
// 		const email = Array.isArray(fields.email)
// 			? fields.email[0]
// 			: fields.email;
// 		const phone = Array.isArray(fields.phone)
// 			? fields.phone[0]
// 			: fields.phone;
// 		const reason = Array.isArray(fields.reason)
// 			? fields.reason[0]
// 			: fields.reason;
// 		const appointmentDate = Array.isArray(fields.appointmentDate)
// 			? fields.appointmentDate[0]
// 			: fields.appointmentDate;
// 		const appointmentTime = Array.isArray(fields.appointmentTime)
// 			? fields.appointmentTime[0]
// 			: fields.appointmentTime;

// 		const isNewPatient = !!files.file;
// 		let fileContent;

// 		if (isNewPatient && files.file) {
// 			const file = files.file[0] as File;
// 			const zipFilePath = await compressFile(file);
// 			fileContent = await fs.readFile(zipFilePath);
// 		}

// 		const appointmentDateTime = new Date(
// 			`${appointmentDate}T${appointmentTime}`
// 		);
// 		const formattedAppointmentTime = formatTo12HourTime(
// 			appointmentDateTime.toISOString()
// 		);

// 		const calendarEvent = ical({
// 			prodId: { company: "FSClinicals", product: "Appointment" },
// 			name: "FSClinicals Appointment",
// 		});

// 		calendarEvent.createEvent({
// 			start: appointmentDateTime,
// 			end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
// 			summary: `Appointment with ${patientName}`,
// 			description: `Details for ${patientName}\nReason: ${reason}`,
// 			location: "FSClinicals Office",
// 			organizer: { name: "FSClinicals", email: smtpRecipient },
// 			attendees: [
// 				{
// 					name: patientName,
// 					email,
// 					rsvp: true,
// 					role: ICalAttendeeRole.REQ,
// 				},
// 			],
// 		});

// 		const transporter = nodemailer.createTransport({
// 			host: smtpHost,
// 			port: parseInt(smtpPort, 10),
// 			secure: false,
// 			auth: { user: smtpAuthUser, pass: smtpAuthPass },
// 			tls: { rejectUnauthorized: false },
// 		});

// 		const patientEmailHtml = renderToString(
// 			EmailTemplate({
// 				name: patientName,
// 				email,
// 				phone,
// 				reason,
// 				appointmentDate,
// 				appointmentTime: formattedAppointmentTime,
// 				isDoctor: false,
// 				isNewPatient,
// 			})
// 		);

// 		const doctorEmailHtml = renderToString(
// 			EmailTemplate({
// 				name: patientName,
// 				email,
// 				phone,
// 				reason,
// 				appointmentDate,
// 				appointmentTime: formattedAppointmentTime,
// 				isDoctor: true,
// 				isNewPatient,
// 			})
// 		);

// 		await sendEmailWithCalendar(
// 			transporter,
// 			smtpRecipient,
// 			"New Appointment",
// 			doctorEmailHtml,
// 			calendarEvent
// 		);
// 		await sendEmailWithCalendar(
// 			transporter,
// 			email,
// 			"Appointment Confirmation",
// 			patientEmailHtml,
// 			calendarEvent
// 		);

// 		return NextResponse.json({
// 			message: isNewPatient
// 				? "Patient registered successfully"
// 				: "Appointment suggested successfully",
// 		});
// 	} catch (error) {
// 		console.error("Error in API route:", error);
// 		return NextResponse.json(
// 			{
// 				error: "Error processing request",
// 				details: (error as Error).message,
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

export {};
