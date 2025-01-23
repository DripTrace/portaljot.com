import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";
import nodemailer from "nodemailer";
import { renderToString } from "react-dom/server";
import LLPMGEmailTemplate from "@/components/clinicviews/LLPMG/LLPMGEmailTemplate";
import { SDK } from "@ringcentral/sdk";
import ical from "ical-generator";
import { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import archiver from "archiver";
import path from "path";

export const config = {
	api: {
		bodyParser: false,
	},
};

const rcsdk = new SDK({
	server: process.env.RC_SERVER_URL,
	clientId: process.env.RC_CLIENT_ID,
	clientSecret: process.env.RC_CLIENT_SECRET,
});

const platform = rcsdk.platform();

async function sendSMS(to: string | number, message: string) {
	try {
		await platform.login({ jwt: process.env.RC_JWT });

		const phoneString = String(to);
		const formattedPhoneNumber = phoneString.startsWith("+1")
			? phoneString
			: `+1${phoneString.replace(/\D/g, "")}`;

		if (!/^\+1\d{10}$/.test(formattedPhoneNumber)) {
			throw new Error(
				`Invalid phone number format: ${formattedPhoneNumber}`
			);
		}

		const resp = await platform.post(
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

function formatDateTime(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
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
		from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
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

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const form = new IncomingForm();
		const [fields, files] = await new Promise<[any, any]>(
			(resolve, reject) => {
				form.parse(req, (err, fields, files) => {
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
			// pharmacy,
			reason,
			// suggestedAppointment,
			providerPhone,
			// suggestedProvider,
			providerEmail,
		} = fields;

		const patientName = `${firstName[0]} ${lastName[0]}`.toUpperCase();
		const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;
		const file = files.pdf ? files.pdf[0] : null;

		// const formattedAppointmentTime = formatDateTime(suggestedAppointment);

		// const calendarEvent = ical({
		//     prodId: { company: "LLPMG", product: "Appointment" },
		//     name: "LLPMG Appointment",
		// });

		// calendarEvent.createEvent({
		//     start: new Date(suggestedAppointment),
		//     end: new Date(
		//         new Date(suggestedAppointment).getTime() + 60 * 60 * 1000
		//     ),
		//     summary: `Appointment with ${patientName}`,
		//     description: `Appointment for ${patientName}\nReason: ${reason}`,
		//     location: "Loma Linda Psychiatric Medical Group",
		//     url: "https://lomalindapsych.com",
		//     organizer: {
		//         name: "LLPMG",
		//         email: process.env.PROTONMAIL_SENDER,
		//     },
		//     attendees: [
		//         {
		//             name: patientName,
		//             email: email,
		//             rsvp: true,
		//             role: ICalAttendeeRole.REQ,
		//             status: ICalAttendeeStatus.NEEDSACTION,
		//         },
		//     ],
		// });

		let emailTransporter = nodemailer.createTransport({
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

		try {
			await emailTransporter.verify();
			console.log("SMTP connection verified successfully");
		} catch (error) {
			console.error("SMTP connection verification failed:", error);
			throw new Error("Failed to establish SMTP connection");
		}

		const patientEmailHtml = renderToString(
			LLPMGEmailTemplate({
				name: patientName,
				email,
				phone,
				birthday,
				insurance,
				address: fullAddress,
				// pharmacy,
				reason,
				// suggestedAppointment: formattedAppointmentTime,
				isDoctor: false,
				// suggestedProvider,
				providerPhone,
				providerEmail,
				// providerName,
			})
		);

		const doctorEmailHtml = renderToString(
			LLPMGEmailTemplate({
				name: patientName,
				email,
				phone,
				birthday,
				insurance,
				address: fullAddress,
				// pharmacy,
				reason,
				// suggestedAppointment: formattedAppointmentTime,
				isDoctor: true,
				// suggestedProvider,
				providerPhone,
				providerEmail,
				// providerName,
			})
		);

		const providerEmailHtml = renderToString(
			LLPMGEmailTemplate({
				name: patientName,
				email,
				phone,
				birthday,
				insurance,
				address: fullAddress,
				// pharmacy,
				reason,
				// suggestedAppointment: formattedAppointmentTime,
				isDoctor: true,
				// suggestedProvider,
				providerPhone,
				providerEmail,
				// providerName,
			})
		);

		let fileContent, fileSize;
		if (file) {
			const zipFilePath = await compressFile(file);
			fileContent = await fs.readFile(zipFilePath);
			fileSize = fileContent.length;

			console.log("Compressed file details:", {
				// name: `${file.originalFilename}.zip`,
				name: `${file.originalFilename}.zip`,
				size: fileSize,
			});
		}

		// await sendEmailWithCalendar(
		//     emailTransporter,
		//     email,
		//     `Registration Confirmation - ${formattedAppointmentTime}`,
		//     patientEmailHtml,
		//     calendarEvent,
		//     file
		//         ? [
		//               {
		//                   content: fileContent,
		//               },
		//           ]
		//         : undefined
		// );

		// await sendEmailWithCalendar(
		//     emailTransporter,
		//     process.env.PROTONMAIL_RECIPIENT!,
		//     `New Patient Registration Details - ${formattedAppointmentTime}`,
		//     doctorEmailHtml,
		//     calendarEvent,
		//     file
		//         ? [
		//               {
		//                   filename: `${file.originalFilename}.zip`,
		//                   content: fileContent,
		//               },
		//           ]
		//         : undefined
		// );

		// await sendEmailWithCalendar(
		//     emailTransporter,
		//     suggestedProvider.email,
		//     `New Patient Registration Details - ${formattedAppointmentTime}`,
		//     providerEmailHtml,
		//     calendarEvent,
		//     file
		//         ? [
		//               {
		//                   filename: `${file.originalFilename}.zip`,
		//                   content: fileContent,
		//               },
		//           ]
		//         : undefined
		// );

		// const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion for ${formattedAppointmentTime} with ${suggestedProvider} has been received. We will contact you soon to confirm.`;
		// const providerSMS = `Hello ${suggestedProvider}, a new patient has registered for an appointment suggestion on ${formattedAppointmentTime}. Please review the details in your email and contact the patient to confirm.`;
		// const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment with ${suggestedProvider} has been received. We will contact you soon to confirm.`;
		const smsMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment has been received. We will contact you soon to confirm.`;
		// const providerSMS = `Hello ${suggestedProvider}, a new patient has registered for an appointment. Please review the details in your email and contact the patient to confirm.`;
		const providerSMS = `Hello, a new patient has registered for an appointment. Please review the details in your email and contact the patient to confirm.`;

		await sendSMS(phone, smsMessage);
		await sendSMS(providerPhone, providerSMS);

		res.status(200).json({ message: "Registration successful" });
	} catch (error) {
		console.error("Error in API route:", error);
		res.status(500).json({
			error: "An unknown error occurred",
			details: (error as Error).message,
		});
	}
}
