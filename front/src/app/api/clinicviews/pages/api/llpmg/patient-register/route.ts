import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";
import nodemailer from "nodemailer";
import { renderToString } from "react-dom/server";
import LLPMGEmailTemplate from "@/components/clinicviews/LLPMG/LLPMGEmailTemplate";
import ical from "ical-generator";
import { ICalAttendeeRole, ICalAttendeeStatus } from "ical-generator";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import archiver from "archiver";
import path from "path";
import { ringCentralClient } from "@/lib/clinicviews/ringcentralClient";
import { createOrUpdateConversation } from "../../webhooks/ringcentral/sms";

export const config = {
	api: {
		bodyParser: false,
	},
};

interface TeamResponse {
	id: string;
	name: string;
	description: string;
	creationTime: string;
	lastModifiedTime: string;
}

const conversations: {
	[key: string]: { patientNumber: string; doctorNumber: string };
} = {};

async function createTeam(
	patientName: string,
	doctorName: string,
	patientExtensionId: string,
	doctorExtensionId: string
): Promise<TeamResponse> {
	console.log(
		`Creating team for patient ${patientName} and doctor ${doctorName}`
	);
	try {
		await ringCentralClient.login({ jwt: process.env.RC_JWT });
		const response = await ringCentralClient.post(
			"/team-messaging/v1/teams",
			{
				public: false,
				name: `${patientName} - ${doctorName} Consultation`,
				description: `Private team for consultation between ${patientName} and ${doctorName}`,
				members: [
					{ id: patientExtensionId },
					{ id: doctorExtensionId },
				],
			}
		);
		const data = await response.json();
		console.log(`Team created:`, JSON.stringify(data, null, 2));
		return data;
	} catch (error) {
		console.error(`Error creating team:`, error);
		throw error;
	}
}

async function sendTeamMessage(teamId: string, text: string): Promise<void> {
	console.log(`Sending message to team ${teamId}:`, text);
	try {
		await ringCentralClient.login({ jwt: process.env.RC_JWT });
		const response = await ringCentralClient.post(
			`/team-messaging/v1/chats/${teamId}/posts`,
			{
				text: text,
			}
		);
		console.log(`Message sent to team`);
	} catch (error) {
		console.error(`Error sending team message:`, error);
		throw error;
	}
}

async function getExtensionIdFromPhoneNumber(
	phoneNumber: string
): Promise<string | null> {
	console.log(`Getting extension ID for phone number: ${phoneNumber}`);
	try {
		await ringCentralClient.login({ jwt: process.env.RC_JWT });
		const response = await ringCentralClient.get(
			"/restapi/v1.0/account/~/extension",
			{
				phoneNumber: phoneNumber,
			}
		);
		const data = await response.json();
		if (data.records && data.records.length > 0) {
			console.log(`Extension ID found:`, data.records[0].id);
			return data.records[0].id;
		}
		console.log(`No extension found for phone number: ${phoneNumber}`);
		return null;
	} catch (error) {
		console.error(`Error getting extension ID:`, error);
		throw error;
	}
}

async function createSubscription() {
	try {
		await ringCentralClient.login({ jwt: process.env.RC_JWT });

		const response = await ringCentralClient.post(
			"/restapi/v1.0/subscription",
			{
				eventFilters: [
					"/restapi/v1.0/account/~/extension/~/message-store",
				],
				deliveryMode: {
					transportType: "WebHook",
					address: `${process.env.WEBHOOK_URL}/api/clinicviews/webhooks/ringcentral/sms`,
				},
				expiresIn: 3600,
			}
		);

		return response.json();
	} catch (error) {
		console.error("Error creating subscription:", error);
		throw error;
	}
}

async function syncMessages(syncToken: string | null = null) {
	try {
		await ringCentralClient.login({ jwt: process.env.RC_JWT });

		const queryParams: any = { syncType: syncToken ? "ISync" : "FSync" };
		if (syncToken) queryParams.syncToken = syncToken;

		const response = await ringCentralClient.get(
			"/restapi/v1.0/account/~/extension/~/message-sync",
			queryParams
		);
		return response.json();
	} catch (error) {
		console.error("Error syncing messages:", error);
		throw error;
	}
}

async function sendSMS(to: string | number, message: string) {
	try {
		await ringCentralClient.login({ jwt: process.env.RC_JWT });

		const phoneString = String(to);
		const formattedPhoneNumber = phoneString.startsWith("+1")
			? phoneString
			: `+1${phoneString.replace(/\D/g, "")}`;

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

// function formatDateTime(dateString: string): string {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//     });
// }

async function sendEmailWithCalendar(
	transporter: nodemailer.Transporter,
	to: string,
	subject: string,
	content: string,
	// calendarEvent: any,
	attachments?: nodemailer.SendMailOptions["attachments"]
) {
	const mailOptions: nodemailer.SendMailOptions = {
		from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_0TH_SENDER}>`,
		to,
		subject,
		html: content,
		attachments: [
			...(attachments || []),
			// {
			//     filename: "event.ics",
			//     content: calendarEvent.toString(),
			//     contentType: "text/calendar",
			// },
		],
		// alternatives: [
		//     {
		//         contentType: "text/calendar",
		//         content: Buffer.from(calendarEvent.toString()),
		//         contentDisposition: "inline",
		//     },
		// ],
	};

	const mailOptionsColton: nodemailer.SendMailOptions = {
		from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
		to,
		subject,
		html: content,
		attachments: [
			...(attachments || []),
			// {
			//     filename: "event.ics",
			//     content: calendarEvent.toString(),
			//     contentType: "text/calendar",
			// },
		],
		// alternatives: [
		//     {
		//         contentType: "text/calendar",
		//         content: Buffer.from(calendarEvent.toString()),
		//         contentDisposition: "inline",
		//     },
		// ],
	};

	try {
		await transporter.sendMail(mailOptions);
		await transporter.sendMail(mailOptionsColton);
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

		console.log("Parsed fields:", fields);
		console.log("Parsed files:", files);

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

		if (!phone || !providerPhone) {
			throw new Error(
				`Missing required phone numbers. Phone: ${phone}, Provider Phone: ${providerPhone}`
			);
		}

		const patientName =
			`${(firstName as string[])[0]} ${(lastName as string[])[0]}`.toUpperCase();
		const fullAddress = `${address as string}, ${city as string}, ${state as string} ${zipCode as string}`;
		const file = files.pdf ? (files.pdf[0] as File) : null;

		// const formattedAppointmentTime = formatDateTime(
		//     suggestedAppointment as string
		// );

		// const calendarEvent = ical({
		//     prodId: { company: "LLPMG", product: "Appointment" },
		//     name: "LLPMG Appointment",
		// });

		// calendarEvent.createEvent({
		//     start: new Date(suggestedAppointment as string),
		//     end: new Date(
		//         new Date(suggestedAppointment as string).getTime() +
		//             60 * 60 * 1000
		//     ),
		//     summary: `Appointment with ${patientName}`,
		//     description: `Appointment for ${patientName}\nReason: ${reason as string}`,
		//     location: "Loma Linda Psychiatric Medical Group",
		//     url: "https://lomalindapsych.com",
		//     organizer: {
		//         name: "LLPMG",
		//         email: process.env.PROTONMAIL_SENDER,
		//     },
		//     attendees: [
		//         {
		//             name: patientName,
		//             email: email as string,
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
				email: email as string,
				phone: phone as string,
				birthday: birthday as string,
				insurance: insurance as string,
				address: fullAddress,
				// pharmacy: pharmacy as string,
				reason: reason as string,
				// suggestedAppointment: formattedAppointmentTime,
				isDoctor: false,
				// suggestedProvider: suggestedProvider as string,
				providerPhone: providerPhone as string,
				providerEmail: providerEmail as string,
			})
		);

		const doctorEmailHtml = renderToString(
			LLPMGEmailTemplate({
				name: patientName,
				email: email as string,
				phone: phone as string,
				birthday: birthday as string,
				insurance: insurance as string,
				address: fullAddress,
				// pharmacy: pharmacy as string,
				reason: reason as string,
				// suggestedAppointment: formattedAppointmentTime,
				isDoctor: true,
				// suggestedProvider: suggestedProvider as string,
				providerPhone: providerPhone as string,
				providerEmail: providerEmail as string,
			})
		);

		let fileContent, fileSize;
		if (file) {
			const zipFilePath = await compressFile(file);
			fileContent = await fs.readFile(zipFilePath);
			fileSize = fileContent.length;

			console.log("Compressed file details:", {
				name: `${file.originalFilename}.zip`,
				size: fileSize,
			});
		}

		await sendEmailWithCalendar(
			emailTransporter,
			email as string,
			`Registration Confirmation - ${firstName} ${lastName}`,
			patientEmailHtml
			// calendarEvent
		);

		await sendEmailWithCalendar(
			emailTransporter,
			process.env.PROTONMAIL_RECIPIENT!,
			`New Patient Registration Details - ${firstName} ${lastName}`,
			doctorEmailHtml,
			// calendarEvent,
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
			emailTransporter,
			process.env.PROTONMAIL_0TH_RECIPIENT!,
			`New Patient Registration Details - ${firstName} ${lastName}`,
			doctorEmailHtml,
			// calendarEvent,
			file
				? [
						{
							filename: `${file.originalFilename}.zip`,
							content: fileContent,
						},
					]
				: undefined
		);

		if (!/^\+1\d{10}$/.test(phone as string)) {
			throw new Error(`Invalid phone number format: ${phone}`);
		}

		if (!/^\+1\d{10}$/.test(providerPhone as string)) {
			throw new Error(`Invalid phone number format: ${providerPhone}`);
		}

		const patientFirstName = (firstName as string[])[0];
		const patientLastName = (lastName as string[])[0];
		const patientFullName = `${patientFirstName} ${patientLastName}`;

		await createSubscription();
		await syncMessages();

		console.log(
			`Registering patient: ${firstName} ${lastName}, phone: ${phone}`
		);
		// console.log(`Provider: ${suggestedProvider}, phone: ${providerPhone}`);

		const conversationId = createOrUpdateConversation(phone, providerPhone);
		console.log(`Created conversation with ID: ${conversationId}`);

		// const patientMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion with ${suggestedProvider} for ${suggestedAppointment} has been received. We will contact you soon to confirm. (Conversation ID: ${conversationId})`;
		// const providerMessage = `Hello ${suggestedProvider}, you have a new patient appointment suggestion from ${firstName} ${lastName} for ${suggestedAppointment}. Please review the details in your email and contact the patient to confirm. (Conversation ID: ${conversationId})`;

		// const patientMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion with ${suggestedProvider} has been received. We will contact you soon to confirm. (Conversation ID: ${conversationId})`;
		const patientMessage = `Hello ${firstName}, thank you for registering with Loma Linda Psychiatric Medical Group. Your appointment suggestion has been received. We will contact you soon to confirm. (Conversation ID: ${conversationId})`;
		// const providerMessage = `Hello ${suggestedProvider}, you have a new patient appointment suggestion from ${patientFullName}. Please review the details in your email and contact the patient to confirm. (Conversation ID: ${conversationId})`;
		const providerMessage = `Hello, you have a new patient appointment suggestion from ${patientFullName}. Please review the details in your email and contact the patient to confirm. (Conversation ID: ${conversationId})`;

		console.log(`Sending SMS to patient: ${phone}`);
		await sendSMS(phone, patientMessage);
		console.log(`Sending SMS to provider: ${providerPhone}`);
		await sendSMS(providerPhone, providerMessage);

		res.status(200).json({
			message: "Registration successful",
			conversationId,
		});
	} catch (error) {
		console.error("Error in API route:", error);
		res.status(500).json({
			error: "An unknown error occurred",
			details: (error as Error).message,
		});
	}
}
