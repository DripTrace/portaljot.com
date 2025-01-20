// // // import { NextApiRequest, NextApiResponse } from "next";
// // // import nodemailer from "nodemailer";
// // // import { IncomingForm, File } from "formidable";
// // // import fs from "fs/promises";
// // // import { createWriteStream } from "fs";
// // // import archiver from "archiver";
// // // import path from "path";
// // // import { renderToString } from "react-dom/server";
// // // import EmailTemplate, {
// // // 	EmailTemplateProps,
// // // } from "@/components/templates/EmailTemplate";
// // // import ical, { ICalAttendeeStatus, ICalAttendeeRole } from "ical-generator";
// // // import twilio from "twilio";
// // // import React from "react";

// // // export const config = {
// // // 	api: {
// // // 		bodyParser: false,
// // // 	},
// // // };

// // // const local = process.env;
// // // export const devMode = local.NODE_ENV === "development";
// // // export const smtpAuthUser = local.SMTP_USER as string;
// // // export const smtpAuthPass = local.SMTP_PASSWORD as string;
// // // // export const smtpRecipient = "rpalm@driptrace.io";
// // // export const smtpRecipient = "rpalm@russellpalma.com";
// // // export const smtpHost = local.SMTP_HOST as string;
// // // export const smtpPort = local.SMTP_PORT as string;

// // // const twilioClient = twilio(local.TWILIO_ACCOUNT_SID, local.TWILIO_AUTH_TOKEN);
// // // const twilioFromNumber = local.TWILIO_PHONE_NUMBER;

// // // async function compressFile(file: File): Promise<string> {
// // // 	const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
// // // 	const output = createWriteStream(zipFilePath);
// // // 	const archive = archiver("zip", { zlib: { level: 9 } });

// // // 	return new Promise((resolve, reject) => {
// // // 		output.on("close", () => resolve(zipFilePath));
// // // 		archive.on("error", reject);
// // // 		archive.pipe(output);
// // // 		archive.file(file.filepath, { name: file.originalFilename ?? "file" });
// // // 		archive.finalize();
// // // 	});
// // // }

// // // function formatTo12HourTime(dateString: string): string {
// // // 	const date = new Date(dateString);
// // // 	const hours = date.getHours();
// // // 	const minutes = date.getMinutes();
// // // 	const ampm = hours >= 12 ? "PM" : "AM";
// // // 	const formattedHours = hours % 12 || 12;
// // // 	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
// // // 	return `${formattedHours}:${formattedMinutes} ${ampm}`;
// // // }

// // // async function sendEmailWithCalendar(
// // // 	transporter: nodemailer.Transporter,
// // // 	to: string,
// // // 	subject: string,
// // // 	content: string,
// // // 	calendarEvent: any,
// // // 	attachments?: nodemailer.SendMailOptions["attachments"]
// // // ) {
// // // 	console.log(`Sending email to ${to}`);

// // // 	const mailOptions: nodemailer.SendMailOptions = {
// // // 		from: `"NexusConjure Mail" <${smtpAuthUser}>`,
// // // 		to,
// // // 		subject,
// // // 		html: content,
// // // 		attachments: [
// // // 			...(attachments || []),
// // // 			{
// // // 				filename: "event.ics",
// // // 				content: calendarEvent.toString(),
// // // 				contentType: "text/calendar",
// // // 			},
// // // 		],
// // // 		alternatives: [
// // // 			{
// // // 				contentType: "text/calendar",
// // // 				content: Buffer.from(calendarEvent.toString()),
// // // 				contentDisposition: "inline",
// // // 			},
// // // 		],
// // // 	};

// // // 	await transporter.sendMail(mailOptions);

// // // 	console.log(`Email sent successfully to ${to}`);
// // // }

// // // export default async function handler(
// // // 	req: NextApiRequest,
// // // 	res: NextApiResponse
// // // ) {
// // // 	console.log("Received request to /api/register-alert");
// // // 	console.log("Headers:", req.headers);

// // // 	if (req.method !== "POST") {
// // // 		return res.status(405).json({ error: "Method Not Allowed" });
// // // 	}

// // // 	const form = new IncomingForm();

// // // 	try {
// // // 		const [fields, files] = await new Promise<[any, any]>(
// // // 			(resolve, reject) => {
// // // 				form.parse(req, (err, fields, files) => {
// // // 					if (err) reject(err);
// // // 					resolve([fields, files]);
// // // 				});
// // // 			}
// // // 		);

// // // 		console.log("Received form data:", fields);
// // // 		console.log("Received files:", files);

// // // 		const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
// // // 		const email = Array.isArray(fields.email)
// // // 			? fields.email[0]
// // // 			: fields.email;
// // // 		const phone = Array.isArray(fields.phone)
// // // 			? fields.phone[0]
// // // 			: fields.phone;
// // // 		const reason = Array.isArray(fields.reason)
// // // 			? fields.reason[0]
// // // 			: fields.reason;
// // // 		const smsOptIn = Array.isArray(fields.smsOptIn)
// // // 			? fields.smsOptIn[0]
// // // 			: fields.smsOptIn;
// // // 		const emailOptIn = Array.isArray(fields.emailOptIn)
// // // 			? fields.emailOptIn[0]
// // // 			: fields.emailOptIn;
// // // 		// const datetime = Array.isArray(fields.datetime) ? fields.datetime[0] : fields.datetime;
// // // 		const availability = Array.isArray(fields.availability)
// // // 			? fields.availability[0]
// // // 			: fields.availability;
// // // 		const privacyPolicyOptIn = Array.isArray(fields.privacyPolicyOptIn)
// // // 			? fields.privacyPolicyOptIn[0]
// // // 			: fields.privacyPolicyOptIn;
// // // 		const termsOfServiceOptIn = Array.isArray(fields.termsOfServiceOptIn)
// // // 			? fields.termsOfServiceOptIn[0]
// // // 			: fields.termsOfServiceOptIn;
// // // 		const promotionalOptIn = Array.isArray(fields.promotionalOptIn)
// // // 			? fields.promotionalOptIn[0]
// // // 			: fields.promotionalOptIn;

// // // 		const file = files.file ? (files.file[0] as File) : null;

// // // 		let fileContent, fileSize;
// // // 		if (file) {
// // // 			const zipFilePath = await compressFile(file);
// // // 			fileContent = await fs.readFile(zipFilePath);
// // // 			fileSize = fileContent.length;

// // // 			console.log("Compressed file details:", {
// // // 				name: `${file.originalFilename}.zip`,
// // // 				size: fileSize,
// // // 			});
// // // 		}

// // // 		const appointmentDateTime = new Date(availability);
// // // 		const appointmentDate = appointmentDateTime.toISOString().split("T")[0];
// // // 		const appointmentTime = formatTo12HourTime(
// // // 			appointmentDateTime.toISOString()
// // // 		);

// // // 		console.log("Parsed form data:", {
// // // 			name,
// // // 			email,
// // // 			phone,
// // // 			reason,
// // // 			smsOptIn,
// // // 			emailOptIn,
// // // 			appointmentDate,
// // // 			appointmentTime,
// // // 			availability,
// // // 			privacyPolicyOptIn,
// // // 			termsOfServiceOptIn,
// // // 			promotionalOptIn,
// // // 		});

// // // 		// Create iCal event
// // // 		const calendarEvent = ical({
// // // 			name: "NexusConjure Appointment",
// // // 		});

// // // 		calendarEvent.createEvent({
// // // 			start: appointmentDateTime,
// // // 			end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
// // // 			summary: `Appointment with ${name}`,
// // // 			description: `Appointment details for ${name} on ${appointmentDate} at ${appointmentTime}.\nReason: ${reason}`,
// // // 			location: "NexusConjure Office",
// // // 			url: "https://nexusconjure.com",
// // // 			organizer: {
// // // 				name: "NexusConjure Connect",
// // // 				email: smtpRecipient,
// // // 			},
// // // 			attendees: [
// // // 				{
// // // 					name: name,
// // // 					email: email,
// // // 					rsvp: true,
// // // 					status: ICalAttendeeStatus.NEEDSACTION,
// // // 					role: ICalAttendeeRole.OPT,
// // // 				},
// // // 			],
// // // 		});

// // // 		const transporter = nodemailer.createTransport({
// // // 			host: smtpHost,
// // // 			port: parseInt(smtpPort!, 10),
// // // 			secure: false,
// // // 			auth: {
// // // 				user: smtpAuthUser,
// // // 				pass: smtpAuthPass,
// // // 			},
// // // 			tls: {
// // // 				ciphers: "SSLv3",
// // // 				rejectUnauthorized: false,
// // // 			},
// // // 		});

// // // 		const emailTemplateProps: EmailTemplateProps = {
// // // 			name,
// // // 			email,
// // // 			phone,
// // // 			reason,
// // // 			appointmentDate,
// // // 			appointmentTime,
// // // 			availability,
// // // 			smsOptIn: smsOptIn === "true",
// // // 			emailOptIn: emailOptIn === "true",
// // // 			fileUploaded: !!file,
// // // 			isPlatform: true, // or false for customer email
// // // 			privacyPolicyOptIn: privacyPolicyOptIn === "true",
// // // 			termsOfServiceOptIn: termsOfServiceOptIn === "true",
// // // 			promotionalOptIn: promotionalOptIn === "true",
// // // 		};

// // // 		const platformEmailHtml = renderToString(
// // // 			React.createElement(EmailTemplate, {
// // // 				...emailTemplateProps,
// // // 				isPlatform: true,
// // // 			})
// // // 		);
// // // 		const customerEmailHtml = renderToString(
// // // 			React.createElement(EmailTemplate, {
// // // 				...emailTemplateProps,
// // // 				isPlatform: false,
// // // 			})
// // // 		);

// // // 		// Send email to platform
// // // 		await sendEmailWithCalendar(
// // // 			transporter,
// // // 			smtpRecipient,
// // // 			"New NexusConjure Alert Registration",
// // // 			platformEmailHtml,
// // // 			calendarEvent,
// // // 			file
// // // 				? [
// // // 						{
// // // 							filename: `${file.originalFilename}.zip`,
// // // 							content: fileContent,
// // // 						},
// // // 				  ]
// // // 				: undefined
// // // 		);

// // // 		// Send email to customer if they opted in
// // // 		if (emailOptIn === "true") {
// // // 			await sendEmailWithCalendar(
// // // 				transporter,
// // // 				email,
// // // 				"NexusConjure Alert Registration Confirmation",
// // // 				customerEmailHtml,
// // // 				calendarEvent
// // // 			);
// // // 		}

// // // 		// Send SMS if opted in
// // // 		if (smsOptIn === "true") {
// // // 			await twilioClient.messages.create({
// // // 				// body: `Thank you ${name} for registering with NexusConjure for ${reason}. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}. We're excited to have you on board! Reply with "STOP-TEXT" or "STOP-EMAIL" at anytime to opt out of automated text or email messages.`,
// // // 				body: `Thank you ${name} for registering with NexusConjure for ${reason}. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}. We're excited to have you on board! Reply with "STOP-TEXT" at anytime to opt out of automated text messages.`,
// // // 				from: twilioFromNumber,
// // // 				to: phone,
// // // 			});
// // // 		}

// // // 		res.status(200).json({
// // // 			message: "Alert registration successful",
// // // 		});
// // // 	} catch (error) {
// // // 		console.error("Error registering alert:", error);
// // // 		res.status(500).json({
// // // 			error: "Error registering alert",
// // // 			details: (error as Error).message,
// // // 		});
// // // 	}
// // // }

// // import { NextApiRequest, NextApiResponse } from "next";
// // import nodemailer from "nodemailer";
// // import { IncomingForm, File } from "formidable";
// // import fs from "fs/promises";
// // import { createWriteStream } from "fs";
// // import archiver from "archiver";
// // import path from "path";
// // import { renderToString } from "react-dom/server";
// // import EmailTemplate, {
// //     EmailTemplateProps,
// // } from "@/components/templates/EmailTemplate";
// // import ical, { ICalAttendeeStatus, ICalAttendeeRole } from "ical-generator";
// // import twilio from "twilio";
// // import React from "react";

// // export const config = {
// //     api: {
// //         bodyParser: false,
// //     },
// // };

// // const local = process.env;
// // export const devMode = local.NODE_ENV === "development";
// // export const smtpAuthUser = local.SMTP_USER as string;
// // export const smtpAuthPass = local.SMTP_PASSWORD as string;
// // export const smtpRecipient = "rpalm@russellpalma.com";
// // export const smtpHost = local.SMTP_HOST as string;
// // export const smtpPort = local.SMTP_PORT as string;

// // const twilioClient = twilio(local.TWILIO_ACCOUNT_SID, local.TWILIO_AUTH_TOKEN);
// // const twilioFromNumber = local.TWILIO_PHONE_NUMBER;

// // async function compressFile(file: File): Promise<string> {
// //     const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
// //     const output = createWriteStream(zipFilePath);
// //     const archive = archiver("zip", { zlib: { level: 9 } });

// //     return new Promise((resolve, reject) => {
// //         output.on("close", () => resolve(zipFilePath));
// //         archive.on("error", reject);
// //         archive.pipe(output);
// //         archive.file(file.filepath, { name: file.originalFilename ?? "file" });
// //         archive.finalize();
// //     });
// // }

// // function formatTo12HourTime(dateString: string): string {
// //     const date = new Date(dateString);
// //     const hours = date.getHours();
// //     const minutes = date.getMinutes();
// //     const ampm = hours >= 12 ? "PM" : "AM";
// //     const formattedHours = hours % 12 || 12;
// //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
// //     return `${formattedHours}:${formattedMinutes} ${ampm}`;
// // }

// // async function sendEmailWithCalendar(
// //     transporter: nodemailer.Transporter,
// //     to: string,
// //     subject: string,
// //     content: string,
// //     calendarEvent: any,
// //     attachments?: nodemailer.SendMailOptions["attachments"]
// // ) {
// //     console.log(`Sending email to ${to}`);

// //     const mailOptions: nodemailer.SendMailOptions = {
// //         from: `"NexusConjure Mail" <${smtpAuthUser}>`,
// //         to,
// //         subject,
// //         html: content,
// //         attachments: [
// //             ...(attachments || []),
// //             {
// //                 filename: "event.ics",
// //                 content: calendarEvent.toString(),
// //                 contentType: "text/calendar",
// //             },
// //         ],
// //         alternatives: [
// //             {
// //                 contentType: "text/calendar",
// //                 content: Buffer.from(calendarEvent.toString()),
// //                 contentDisposition: "inline",
// //             },
// //         ],
// //     };

// //     await transporter.sendMail(mailOptions);

// //     console.log(`Email sent successfully to ${to}`);
// // }

// // export default async function handler(
// //     req: NextApiRequest,
// //     res: NextApiResponse
// // ) {
// //     console.log("Received request to /api/register-alert");
// //     console.log("Headers:", req.headers);

// //     if (req.method !== "POST") {
// //         return res.status(405).json({ error: "Method Not Allowed" });
// //     }

// //     const form = new IncomingForm();

// //     try {
// //         const [fields, files] = await new Promise<[any, any]>(
// //             (resolve, reject) => {
// //                 form.parse(req, (err, fields, files) => {
// //                     if (err) reject(err);
// //                     resolve([fields, files]);
// //                 });
// //             }
// //         );

// //         console.log("Received form data:", fields);
// //         console.log("Received files:", files);

// //         // Extract all form fields
// //         const {
// //             businessName,
// //             corporateWebsite,
// //             businessAddress,
// //             businessCity,
// //             businessState,
// //             businessZip,
// //             businessContactFirstName,
// //             businessContactLastName,
// //             estimatedMonthlyVolume,
// //             useCaseCategory,
// //             useCaseSummary,
// //             productionMessageSample,
// //             optInWorkflowDescription,
// //             optInImageUrls,
// //             webFormUrl,
// //             name,
// //             email,
// //             phone,
// //             reason,
// //             smsOptIn,
// //             emailOptIn,
// //             availability,
// //             privacyPolicyOptIn,
// //             termsOfServiceOptIn,
// //             promotionalOptIn,
// //             marketingOptIn,
// //         } = fields;

// //         const file = files.file ? (files.file[0] as File) : null;

// //         let fileContent, fileSize;
// //         if (file) {
// //             const zipFilePath = await compressFile(file);
// //             fileContent = await fs.readFile(zipFilePath);
// //             fileSize = fileContent.length;

// //             console.log("Compressed file details:", {
// //                 name: `${file.originalFilename}.zip`,
// //                 size: fileSize,
// //             });
// //         }

// //         const appointmentDateTime = new Date(availability);
// //         const appointmentDate = appointmentDateTime.toISOString().split("T")[0];
// //         const appointmentTime = formatTo12HourTime(
// //             appointmentDateTime.toISOString()
// //         );

// //         // Create iCal event
// //         const calendarEvent = ical({
// //             name: "NexusConjure Alert Registration",
// //         });

// //         calendarEvent.createEvent({
// //             start: appointmentDateTime,
// //             end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
// //             summary: `Alert Registration for ${name}`,
// //             description: `Alert registration details for ${name} on ${appointmentDate} at ${appointmentTime}.\nReason: ${reason}`,
// //             location: "NexusConjure",
// //             url: "https://nexusconjure.com",
// //             organizer: {
// //                 name: "NexusConjure Alerts",
// //                 email: smtpRecipient,
// //             },
// //             attendees: [
// //                 {
// //                     name: name,
// //                     email: email,
// //                     rsvp: true,
// //                     status: ICalAttendeeStatus.NEEDSACTION,
// //                     role: ICalAttendeeRole.OPT,
// //                 },
// //             ],
// //         });

// //         const transporter = nodemailer.createTransport({
// //             host: smtpHost,
// //             port: parseInt(smtpPort!, 10),
// //             secure: false,
// //             auth: {
// //                 user: smtpAuthUser,
// //                 pass: smtpAuthPass,
// //             },
// //             tls: {
// //                 ciphers: "SSLv3",
// //                 rejectUnauthorized: false,
// //             },
// //         });

// //         const emailTemplateProps: EmailTemplateProps = {
// //             businessName,
// //             corporateWebsite,
// //             businessAddress,
// //             businessCity,
// //             businessState,
// //             businessZip,
// //             businessContactFirstName,
// //             businessContactLastName,
// //             estimatedMonthlyVolume,
// //             useCaseCategory,
// //             useCaseSummary,
// //             productionMessageSample,
// //             optInWorkflowDescription,
// //             optInImageUrls,
// //             webFormUrl,
// //             name,
// //             email,
// //             phone,
// //             reason,
// //             appointmentDate,
// //             appointmentTime,
// //             availability,
// //             smsOptIn: smsOptIn === "true",
// //             emailOptIn: emailOptIn === "true",
// //             fileUploaded: !!file,
// //             isPlatform: true,
// //             privacyPolicyOptIn: privacyPolicyOptIn === "true",
// //             termsOfServiceOptIn: termsOfServiceOptIn === "true",
// //             promotionalOptIn: promotionalOptIn === "true",
// //             marketingOptIn: marketingOptIn === "true",
// //         };

// //         const platformEmailHtml = renderToString(
// //             React.createElement(EmailTemplate, {
// //                 ...emailTemplateProps,
// //                 isPlatform: true,
// //             })
// //         );
// //         const customerEmailHtml = renderToString(
// //             React.createElement(EmailTemplate, {
// //                 ...emailTemplateProps,
// //                 isPlatform: false,
// //             })
// //         );

// //         // Send email to platform
// //         await sendEmailWithCalendar(
// //             transporter,
// //             smtpRecipient,
// //             "New NexusConjure Alert Registration",
// //             platformEmailHtml,
// //             calendarEvent,
// //             file
// //                 ? [
// //                       {
// //                           filename: `${file.originalFilename}.zip`,
// //                           content: fileContent,
// //                       },
// //                   ]
// //                 : undefined
// //         );

// //         // Send email to customer if they opted in
// //         if (emailOptIn === "true") {
// //             await sendEmailWithCalendar(
// //                 transporter,
// //                 email,
// //                 "NexusConjure Alert Registration Confirmation",
// //                 customerEmailHtml,
// //                 calendarEvent
// //             );
// //         }

// //         // Send SMS if opted in
// //         if (smsOptIn === "true") {
// //             await twilioClient.messages.create({
// //                 body: `Thank you ${name} for registering with NexusConjure for ${reason}. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}. We're excited to have you on board! Reply with "STOP-TEXT" at anytime to opt out of automated text messages.`,
// //                 from: twilioFromNumber,
// //                 to: phone,
// //             });
// //         }

// //         res.status(200).json({
// //             message: "Alert registration successful",
// //         });
// //     } catch (error) {
// //         console.error("Error registering alert:", error);
// //         res.status(500).json({
// //             error: "Error registering alert",
// //             details: (error as Error).message,
// //         });
// //     }
// // }

// import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";
// import { IncomingForm, File } from "formidable";
// import fs from "fs/promises";
// import { createWriteStream } from "fs";
// import archiver from "archiver";
// import path from "path";
// import { renderToString } from "react-dom/server";
// import EmailTemplate, {
//     EmailTemplateProps,
// } from "@/components/templates/EmailTemplate";
// import ical, { ICalAttendeeStatus, ICalAttendeeRole } from "ical-generator";
// import twilio from "twilio";
// import React from "react";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const local = process.env;
// export const devMode = local.NODE_ENV === "development";
// export const smtpAuthUser = local.SMTP_USER as string;
// export const smtpAuthPass = local.SMTP_PASSWORD as string;
// export const smtpRecipient = "rpalm@russellpalma.com";
// export const smtpHost = local.SMTP_HOST as string;
// export const smtpPort = local.SMTP_PORT as string;

// const twilioClient = twilio(local.TWILIO_ACCOUNT_SID, local.TWILIO_AUTH_TOKEN);
// const twilioFromNumber = local.TWILIO_PHONE_NUMBER;

// async function compressFile(file: File): Promise<string> {
//     const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
//     const output = createWriteStream(zipFilePath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     return new Promise((resolve, reject) => {
//         output.on("close", () => resolve(zipFilePath));
//         archive.on("error", reject);
//         archive.pipe(output);
//         archive.file(file.filepath, { name: file.originalFilename ?? "file" });
//         archive.finalize();
//     });
// }

// function formatTo12HourTime(dateString: string): string {
//     const date = new Date(dateString);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
// }

// async function sendEmailWithCalendar(
//     transporter: nodemailer.Transporter,
//     to: string,
//     subject: string,
//     content: string,
//     calendarEvent: any,
//     attachments?: nodemailer.SendMailOptions["attachments"]
// ) {
//     console.log(`Sending email to ${to}`);

//     const mailOptions: nodemailer.SendMailOptions = {
//         from: `"NexusConjure Mail" <${smtpAuthUser}>`,
//         to,
//         subject,
//         html: content,
//         attachments: [
//             ...(attachments || []),
//             {
//                 filename: "event.ics",
//                 content: calendarEvent.toString(),
//                 contentType: "text/calendar",
//             },
//         ],
//         alternatives: [
//             {
//                 contentType: "text/calendar",
//                 content: Buffer.from(calendarEvent.toString()),
//                 contentDisposition: "inline",
//             },
//         ],
//     };

//     await transporter.sendMail(mailOptions);

//     console.log(`Email sent successfully to ${to}`);
// }

// // export default async function handler(
// //     req: NextApiRequest,
// //     res: NextApiResponse
// // ) {
// //     console.log("Received request to /api/register-alert");
// //     console.log("Headers:", req.headers);

// //     if (req.method !== "POST") {
// //         return res.status(405).json({ error: "Method Not Allowed" });
// //     }

// //     const form = new IncomingForm();

// //     try {
// //         const [fields, files] = await new Promise<[any, any]>(
// //             (resolve, reject) => {
// //                 form.parse(req, (err, fields, files) => {
// //                     if (err) reject(err);
// //                     resolve([fields, files]);
// //                 });
// //             }
// //         );

// //         console.log("Received form data:", fields);
// //         console.log("Received files:", files);

// //         const {
// //             businessName,
// //             corporateWebsite,
// //             businessAddress,
// //             businessCity,
// //             businessState,
// //             businessZip,
// //             businessContactFirstName,
// //             businessContactLastName,
// //             estimatedMonthlyVolume,
// //             useCaseCategory,
// //             useCaseSummary,
// //             productionMessageSample,
// //             optInWorkflowDescription,
// //             optInImageUrls,
// //             webFormUrl,
// //             name,
// //             email,
// //             phone,
// //             reason,
// //             smsOptIn,
// //             emailOptIn,
// //             availability,
// //             privacyPolicyOptIn,
// //             termsOfServiceOptIn,
// //             promotionalOptIn,
// //             marketingOptIn,
// //         } = fields;

// //         const file = files.file ? (files.file[0] as File) : null;

// //         let fileContent, fileSize;
// //         if (file) {
// //             const zipFilePath = await compressFile(file);
// //             fileContent = await fs.readFile(zipFilePath);
// //             fileSize = fileContent.length;

// //             console.log("Compressed file details:", {
// //                 name: `${file.originalFilename}.zip`,
// //                 size: fileSize,
// //             });
// //         }

// //         const appointmentDateTime = new Date(availability);
// //         const appointmentDate = appointmentDateTime.toISOString().split("T")[0];
// //         const appointmentTime = formatTo12HourTime(
// //             appointmentDateTime.toISOString()
// //         );

// //         const calendarEvent = ical({
// //             name: "NexusConjure Alert Registration",
// //         });

// //         calendarEvent.createEvent({
// //             start: appointmentDateTime,
// //             end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
// //             summary: `Alert Registration for ${name}`,
// //             description: `Alert registration details for ${name} on ${appointmentDate} at ${appointmentTime}.\nReason: ${reason}`,
// //             location: "NexusConjure",
// //             url: "https://nexusconjure.com",
// //             organizer: {
// //                 name: "NexusConjure Alerts",
// //                 email: smtpRecipient,
// //             },
// //             attendees: [
// //                 {
// //                     name: name,
// //                     email: email,
// //                     rsvp: true,
// //                     status: ICalAttendeeStatus.NEEDSACTION,
// //                     role: ICalAttendeeRole.OPT,
// //                 },
// //             ],
// //         });

// //         const transporter = nodemailer.createTransport({
// //             host: smtpHost,
// //             port: parseInt(smtpPort!, 10),
// //             secure: false,
// //             auth: {
// //                 user: smtpAuthUser,
// //                 pass: smtpAuthPass,
// //             },
// //             tls: {
// //                 ciphers: "SSLv3",
// //                 rejectUnauthorized: false,
// //             },
// //         });

// //         const emailTemplateProps: EmailTemplateProps = {
// //             businessName,
// //             corporateWebsite,
// //             businessAddress,
// //             businessCity,
// //             businessState,
// //             businessZip,
// //             businessContactFirstName,
// //             businessContactLastName,
// //             estimatedMonthlyVolume,
// //             useCaseCategory,
// //             useCaseSummary,
// //             productionMessageSample,
// //             optInWorkflowDescription,
// //             optInImageUrls,
// //             webFormUrl,
// //             name,
// //             email,
// //             phone,
// //             reason,
// //             appointmentDate,
// //             appointmentTime,
// //             availability,
// //             smsOptIn: smsOptIn === "true",
// //             emailOptIn: emailOptIn === "true",
// //             fileUploaded: !!file,
// //             isPlatform: true,
// //             privacyPolicyOptIn: privacyPolicyOptIn === "true",
// //             termsOfServiceOptIn: termsOfServiceOptIn === "true",
// //             promotionalOptIn: promotionalOptIn === "true",
// //             marketingOptIn: marketingOptIn === "true",
// //         };

// //         const platformEmailHtml = renderToString(
// //             React.createElement(EmailTemplate, {
// //                 ...emailTemplateProps,
// //                 isPlatform: true,
// //             })
// //         );
// //         const customerEmailHtml = renderToString(
// //             React.createElement(EmailTemplate, {
// //                 ...emailTemplateProps,
// //                 isPlatform: false,
// //             })
// //         );

// //         await sendEmailWithCalendar(
// //             transporter,
// //             smtpRecipient,
// //             "New NexusConjure Alert Registration",
// //             platformEmailHtml,
// //             calendarEvent,
// //             file
// //                 ? [
// //                       {
// //                           filename: `${file.originalFilename}.zip`,
// //                           content: fileContent,
// //                       },
// //                   ]
// //                 : undefined
// //         );

// //         if (emailOptIn === "true") {
// //             await sendEmailWithCalendar(
// //                 transporter,
// //                 email,
// //                 "NexusConjure Alert Registration Confirmation",
// //                 customerEmailHtml,
// //                 calendarEvent
// //             );
// //         }

// //         if (smsOptIn === "true") {
// //             try {
// //                 await twilioClient.messages.create({
// //                     body: `Thank you ${name} for registering with NexusConjure for ${reason}. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}. We're excited to have you on board! Reply with "STOP-TEXT" at anytime to opt out of automated text messages.`,
// //                     from: twilioFromNumber,
// //                     to: phone,
// //                 });
// //                 console.log("SMS sent successfully");
// //             } catch (error) {
// //                 console.error("Error sending SMS:", error);
// //             }
// //         }

// //         res.status(200).json({
// //             message: "Alert registration successful",
// //         });
// //     } catch (error) {
// //         console.error("Error registering alert:", error);
// //         res.status(500).json({
// //             error: "Error registering alert",
// //             details: (error as Error).message,
// //         });
// //     }
// // }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     console.log("Received request to /api/register-alert");
//     console.log("Headers:", req.headers);

//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const form = new IncomingForm();

//     try {
//         const [fields, files] = await new Promise<[any, any]>(
//             (resolve, reject) => {
//                 form.parse(req, (err, fields, files) => {
//                     if (err) reject(err);
//                     resolve([fields, files]);
//                 });
//             }
//         );

//         console.log("Received form data:", fields);
//         console.log("Received files:", files);

//         const {
//             businessName,
//             corporateWebsite,
//             businessAddress,
//             businessCity,
//             businessState,
//             businessZip,
//             businessContactFirstName,
//             businessContactLastName,
//             estimatedMonthlyVolume,
//             useCaseCategory,
//             useCaseSummary,
//             productionMessageSample,
//             optInWorkflowDescription,
//             optInImageUrls,
//             webFormUrl,
//             name,
//             email,
//             phone,
//             reason,
//             smsOptIn,
//             emailOptIn,
//             availability,
//             privacyPolicyOptIn,
//             termsOfServiceOptIn,
//             promotionalOptIn,
//             marketingOptIn,
//         } = fields;

//         const file = files.file ? (files.file[0] as File) : null;

//         let fileContent, fileSize;
//         if (file) {
//             const zipFilePath = await compressFile(file);
//             fileContent = await fs.readFile(zipFilePath);
//             fileSize = fileContent.length;

//             console.log("Compressed file details:", {
//                 name: `${file.originalFilename}.zip`,
//                 size: fileSize,
//             });
//         }

//         const appointmentDateTime = new Date(availability);
//         const appointmentDate = appointmentDateTime.toISOString().split("T")[0];
//         const appointmentTime = formatTo12HourTime(
//             appointmentDateTime.toISOString()
//         );

//         const calendarEvent = ical({
//             name: "NexusConjure Alert Registration",
//         });

//         calendarEvent.createEvent({
//             start: appointmentDateTime,
//             end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
//             summary: `Alert Registration for ${name}`,
//             description: `Alert registration details for ${name} on ${appointmentDate} at ${appointmentTime}.\nReason: ${reason}`,
//             location: "NexusConjure",
//             url: "https://nexusconjure.com",
//             organizer: {
//                 name: "NexusConjure Alerts",
//                 email: smtpRecipient,
//             },
//             attendees: [
//                 {
//                     name: name,
//                     email: email,
//                     rsvp: true,
//                     status: ICalAttendeeStatus.NEEDSACTION,
//                     role: ICalAttendeeRole.OPT,
//                 },
//             ],
//         });

//         const transporter = nodemailer.createTransport({
//             host: smtpHost,
//             port: parseInt(smtpPort!, 10),
//             secure: false,
//             auth: {
//                 user: smtpAuthUser,
//                 pass: smtpAuthPass,
//             },
//             tls: {
//                 ciphers: "SSLv3",
//                 rejectUnauthorized: false,
//             },
//         });

//         const emailTemplateProps: EmailTemplateProps = {
//             businessName: businessName[0],
//             corporateWebsite: corporateWebsite[0],
//             businessAddress: businessAddress[0],
//             businessCity: businessCity[0],
//             businessState: businessState[0],
//             businessZip: businessZip[0],
//             businessContactFirstName: businessContactFirstName[0],
//             businessContactLastName: businessContactLastName[0],
//             estimatedMonthlyVolume: estimatedMonthlyVolume[0],
//             useCaseCategory: useCaseCategory[0],
//             useCaseSummary: useCaseSummary[0],
//             productionMessageSample: productionMessageSample[0],
//             optInWorkflowDescription: optInWorkflowDescription[0],
//             optInImageUrls: optInImageUrls[0],
//             webFormUrl: webFormUrl[0],
//             name: name[0],
//             email: email[0],
//             phone: phone[0],
//             reason: reason[0],
//             appointmentDate,
//             appointmentTime,
//             availability: availability[0],
//             smsOptIn: smsOptIn[0] === "true",
//             emailOptIn: emailOptIn[0] === "true",
//             fileUploaded: !!file,
//             isPlatform: true,
//             privacyPolicyOptIn: privacyPolicyOptIn[0] === "true",
//             termsOfServiceOptIn: termsOfServiceOptIn[0] === "true",
//             promotionalOptIn: promotionalOptIn[0] === "true",
//             marketingOptIn: marketingOptIn[0] === "true",
//         };

//         const platformEmailHtml = renderToString(
//             React.createElement(EmailTemplate, {
//                 ...emailTemplateProps,
//                 isPlatform: true,
//             })
//         );
//         const customerEmailHtml = renderToString(
//             React.createElement(EmailTemplate, {
//                 ...emailTemplateProps,
//                 isPlatform: false,
//             })
//         );

//         // Send email to business
//         await sendEmailWithCalendar(
//             transporter,
//             smtpRecipient,
//             "New NexusConjure Alert Registration",
//             platformEmailHtml,
//             calendarEvent,
//             file
//                 ? [
//                       {
//                           filename: `${file.originalFilename}.zip`,
//                           content: fileContent,
//                       },
//                   ]
//                 : undefined
//         );

//         // Send email to customer
//         if (emailOptIn[0] === "true") {
//             await sendEmailWithCalendar(
//                 transporter,
//                 email[0],
//                 "NexusConjure Alert Registration Confirmation",
//                 customerEmailHtml,
//                 calendarEvent
//             );
//         }

//         // Send SMS to business
//         try {
//             await twilioClient.messages.create({
//                 body: `New NexusConjure Alert Registration from ${name[0]}. Reason: ${reason[0]}. Appointment: ${appointmentDate} at ${appointmentTime}.`,
//                 from: twilioFromNumber,
//                 to: smtpRecipient, // Use your business phone number here
//             });
//             console.log("SMS sent successfully to business");
//         } catch (error) {
//             console.error("Error sending SMS to business:", error);
//         }

//         // Send SMS to customer
//         if (smsOptIn[0] === "true") {
//             try {
//                 await twilioClient.messages.create({
//                     body: `Thank you ${name[0]} for registering with NexusConjure for ${reason[0]}. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}. We're excited to have you on board! Reply with "STOP-TEXT" at anytime to opt out of automated text messages.`,
//                     from: twilioFromNumber,
//                     to: phone[0],
//                 });
//                 console.log("SMS sent successfully to customer");
//             } catch (error) {
//                 console.error("Error sending SMS to customer:", error);
//             }
//         }

//         res.status(200).json({
//             message: "Alert registration successful",
//         });
//     } catch (error) {
//         console.error("Error registering alert:", error);
//         res.status(500).json({
//             error: "Error registering alert",
//             details: (error as Error).message,
//         });
//     }
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";
// import { IncomingForm, File } from "formidable";
// import fs from "fs/promises";
// import { createWriteStream } from "fs";
// import archiver from "archiver";
// import path from "path";
// import { renderToString } from "react-dom/server";
// import EmailTemplate, {
//     EmailTemplateProps,
// } from "@/components/templates/EmailTemplate";
// import ical, { ICalAttendeeStatus, ICalAttendeeRole } from "ical-generator";
// import twilio from "twilio";
// import React from "react";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const local = process.env;
// export const devMode = local.NODE_ENV === "development";
// export const smtpAuthUser = local.SMTP_USER as string;
// export const smtpAuthPass = local.SMTP_PASSWORD as string;
// export const smtpRecipient = "rpalm@russellpalma.com";
// export const smtpHost = local.SMTP_HOST as string;
// export const smtpPort = local.SMTP_PORT as string;

// const twilioClient = twilio(local.TWILIO_ACCOUNT_SID, local.TWILIO_AUTH_TOKEN);
// const twilioFromNumber = local.TWILIO_PHONE_NUMBER;
// const businessPhoneNumber = "+19092895924";

// async function compressFile(file: File): Promise<string> {
//     const zipFilePath = path.join("/tmp", `${file.originalFilename}.zip`);
//     const output = createWriteStream(zipFilePath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     return new Promise((resolve, reject) => {
//         output.on("close", () => resolve(zipFilePath));
//         archive.on("error", reject);
//         archive.pipe(output);
//         archive.file(file.filepath, { name: file.originalFilename ?? "file" });
//         archive.finalize();
//     });
// }

// function formatTo12HourTime(dateString: string): string {
//     const date = new Date(dateString);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
// }

// async function sendEmailWithCalendar(
//     transporter: nodemailer.Transporter,
//     to: string,
//     subject: string,
//     content: string,
//     calendarEvent: any,
//     attachments?: nodemailer.SendMailOptions["attachments"]
// ) {
//     console.log(`Sending email to ${to}`);

//     const mailOptions: nodemailer.SendMailOptions = {
//         from: `"NexusConjure Mail" <${smtpAuthUser}>`,
//         to,
//         subject,
//         html: content,
//         attachments: [
//             ...(attachments || []),
//             {
//                 filename: "event.ics",
//                 content: calendarEvent.toString(),
//                 contentType: "text/calendar",
//             },
//         ],
//         alternatives: [
//             {
//                 contentType: "text/calendar",
//                 content: Buffer.from(calendarEvent.toString()),
//                 contentDisposition: "inline",
//             },
//         ],
//     };

//     await transporter.sendMail(mailOptions);

//     console.log(`Email sent successfully to ${to}`);
// }

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     console.log("Received request to /api/register-alert");
//     console.log("Headers:", req.headers);

//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const form = new IncomingForm();

//     try {
//         const [fields, files] = await new Promise<[any, any]>(
//             (resolve, reject) => {
//                 form.parse(req, (err, fields, files) => {
//                     if (err) reject(err);
//                     resolve([fields, files]);
//                 });
//             }
//         );

//         console.log("Received form data:", fields);
//         console.log("Received files:", files);

//         const {
//             businessName,
//             corporateWebsite,
//             businessAddress,
//             businessCity,
//             businessState,
//             businessZip,
//             businessContactFirstName,
//             businessContactLastName,
//             estimatedMonthlyVolume,
//             useCaseCategory,
//             useCaseSummary,
//             productionMessageSample,
//             optInWorkflowDescription,
//             optInImageUrls,
//             webFormUrl,
//             name,
//             email,
//             phone,
//             reason,
//             smsOptIn,
//             emailOptIn,
//             availability,
//             privacyPolicyOptIn,
//             termsOfServiceOptIn,
//             promotionalOptIn,
//             marketingOptIn,
//         } = fields;

//         const file = files.file ? (files.file[0] as File) : null;

//         let fileContent, fileSize;
//         if (file) {
//             const zipFilePath = await compressFile(file);
//             fileContent = await fs.readFile(zipFilePath);
//             fileSize = fileContent.length;

//             console.log("Compressed file details:", {
//                 name: `${file.originalFilename}.zip`,
//                 size: fileSize,
//             });
//         }

//         const appointmentDateTime = new Date(availability[0]);
//         const appointmentDate = appointmentDateTime.toISOString().split("T")[0];
//         const appointmentTime = formatTo12HourTime(
//             appointmentDateTime.toISOString()
//         );

//         const calendarEvent = ical({
//             name: "NexusConjure Alert Registration",
//         });

//         calendarEvent.createEvent({
//             start: appointmentDateTime,
//             end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
//             summary: `Alert Registration for ${name[0]}`,
//             description: `Alert registration details for ${name[0]} on ${appointmentDate} at ${appointmentTime}.\nReason: ${reason[0]}`,
//             location: "NexusConjure",
//             url: "https://nexusconjure.com",
//             organizer: {
//                 name: "NexusConjure Alerts",
//                 email: smtpRecipient,
//             },
//             attendees: [
//                 {
//                     name: name[0],
//                     email: email[0],
//                     rsvp: true,
//                     status: ICalAttendeeStatus.NEEDSACTION,
//                     role: ICalAttendeeRole.OPT,
//                 },
//             ],
//         });

//         const transporter = nodemailer.createTransport({
//             host: smtpHost,
//             port: parseInt(smtpPort!, 10),
//             secure: false,
//             auth: {
//                 user: smtpAuthUser,
//                 pass: smtpAuthPass,
//             },
//             tls: {
//                 ciphers: "SSLv3",
//                 rejectUnauthorized: false,
//             },
//         });

//         const emailTemplateProps: EmailTemplateProps = {
//             businessName: businessName[0],
//             corporateWebsite: corporateWebsite[0],
//             businessAddress: businessAddress[0],
//             businessCity: businessCity[0],
//             businessState: businessState[0],
//             businessZip: businessZip[0],
//             businessContactFirstName: businessContactFirstName[0],
//             businessContactLastName: businessContactLastName[0],
//             estimatedMonthlyVolume: estimatedMonthlyVolume[0],
//             useCaseCategory: useCaseCategory[0],
//             useCaseSummary: useCaseSummary[0],
//             productionMessageSample: productionMessageSample[0],
//             optInWorkflowDescription: optInWorkflowDescription[0],
//             optInImageUrls: optInImageUrls[0],
//             webFormUrl: webFormUrl[0],
//             name: name[0],
//             email: email[0],
//             phone: phone[0],
//             reason: reason[0],
//             appointmentDate,
//             appointmentTime,
//             availability: availability[0],
//             smsOptIn: smsOptIn[0] === "true",
//             emailOptIn: emailOptIn[0] === "true",
//             fileUploaded: !!file,
//             isPlatform: true,
//             privacyPolicyOptIn: privacyPolicyOptIn[0] === "true",
//             termsOfServiceOptIn: termsOfServiceOptIn[0] === "true",
//             promotionalOptIn: promotionalOptIn[0] === "true",
//             marketingOptIn: marketingOptIn[0] === "true",
//         };

//         const platformEmailHtml = renderToString(
//             React.createElement(EmailTemplate, {
//                 ...emailTemplateProps,
//                 isPlatform: true,
//             })
//         );
//         const customerEmailHtml = renderToString(
//             React.createElement(EmailTemplate, {
//                 ...emailTemplateProps,
//                 isPlatform: false,
//             })
//         );

//         // Send email to business
//         await sendEmailWithCalendar(
//             transporter,
//             smtpRecipient,
//             "New NexusConjure Alert Registration",
//             platformEmailHtml,
//             calendarEvent,
//             file
//                 ? [
//                       {
//                           filename: `${file.originalFilename}.zip`,
//                           content: fileContent,
//                       },
//                   ]
//                 : undefined
//         );

//         // Send email to customer
//         if (emailOptIn[0] === "true") {
//             await sendEmailWithCalendar(
//                 transporter,
//                 email[0],
//                 "NexusConjure Alert Registration Confirmation",
//                 customerEmailHtml,
//                 calendarEvent
//             );
//         }

//         // Send SMS to business
//         try {
//             await twilioClient.messages.create({
//                 body: `New NexusConjure Alert Registration from ${name[0]}. Reason: ${reason[0]}. Appointment: ${appointmentDate} at ${appointmentTime}.`,
//                 from: twilioFromNumber,
//                 to: businessPhoneNumber,
//             });
//             console.log("SMS sent successfully to business");
//         } catch (error) {
//             console.error("Error sending SMS to business:", error);
//         }

//         // Send SMS to customer
//         if (smsOptIn[0] === "true") {
//             try {
//                 await twilioClient.messages.create({
//                     body: `Thank you ${name[0]} for registering with NexusConjure for ${reason[0]}. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}. We're excited to have you on board! Reply with "STOP-TEXT" at anytime to opt out of automated text messages.`,
//                     from: twilioFromNumber,
//                     to: phone[0],
//                 });
//                 console.log("SMS sent successfully to customer");
//             } catch (error) {
//                 console.error("Error sending SMS to customer:", error);
//             }
//         }

//         res.status(200).json({
//             message: "Alert registration successful",
//         });
//     } catch (error) {
//         console.error("Error registering alert:", error);
//         res.status(500).json({
//             error: "Error registering alert",
//             details: (error as Error).message,
//         });
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { IncomingForm, File } from "formidable";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import archiver from "archiver";
import path from "path";
import { renderToString } from "react-dom/server";
import EmailTemplate, {
    EmailTemplateProps,
} from "@/components/templates/EmailTemplate";
import ical, { ICalAttendeeStatus, ICalAttendeeRole } from "ical-generator";
import twilio from "twilio";
import React from "react";

export const config = {
    api: {
        bodyParser: false,
    },
};

const local = process.env;
export const devMode = local.NODE_ENV === "development";
export const smtpAuthUser = local.SMTP_USER as string;
export const smtpAuthPass = local.SMTP_PASSWORD as string;
export const smtpRecipient = "rpalm@russellpalma.com";
export const smtpHost = local.SMTP_HOST as string;
export const smtpPort = local.SMTP_PORT as string;

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("Received request to /api/register-alert");
    console.log("Headers:", req.headers);

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = new IncomingForm();

    try {
        const [fields, files] = await new Promise<[any, any]>(
            (resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    resolve([fields, files]);
                });
            }
        );

        console.log("Received form data:", fields);
        console.log("Received files:", files);

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

            console.log("Compressed file details:", {
                name: `${file.originalFilename}.zip`,
                size: fileSize,
            });
        }

        const appointmentDateTime = new Date(availability[0]);
        const appointmentDate = appointmentDateTime.toISOString().split("T")[0];
        const appointmentTime = formatTo12HourTime(
            appointmentDateTime.toISOString()
        );

        const calendarEvent = ical({
            name: "NexusConjure Alert Registration",
        });

        calendarEvent.createEvent({
            start: appointmentDateTime,
            end: new Date(appointmentDateTime.getTime() + 60 * 60 * 1000),
            summary: `Alert Registration for ${name[0]}`,
            description: `Alert registration details for ${name[0]} on ${appointmentDate} at ${appointmentTime}.\nUse Case: ${useCaseCategory[0]}`,
            location: "NexusConjure",
            url: "https://nexusconjure.com",
            organizer: {
                name: "NexusConjure Alerts",
                email: smtpRecipient,
            },
            attendees: [
                {
                    name: name[0],
                    email: email[0],
                    rsvp: true,
                    status: ICalAttendeeStatus.NEEDSACTION,
                    role: ICalAttendeeRole.OPT,
                },
            ],
        });

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort!, 10),
            secure: false,
            auth: {
                user: smtpAuthUser,
                pass: smtpAuthPass,
            },
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
        });

        const emailTemplateProps: EmailTemplateProps = {
            businessName: businessName[0],
            corporateWebsite: corporateWebsite[0],
            businessAddress: businessAddress[0],
            businessCity: businessCity[0],
            businessState: businessState[0],
            businessZip: businessZip[0],
            businessContactFirstName: businessContactFirstName[0],
            businessContactLastName: businessContactLastName[0],
            estimatedMonthlyVolume: estimatedMonthlyVolume[0],
            useCaseCategory: useCaseCategory[0],
            useCaseSummary: useCaseSummary[0],
            productionMessageSample: productionMessageSample[0],
            optInWorkflowDescription: optInWorkflowDescription[0],
            optInImageUrls: optInImageUrls[0],
            webFormUrl: webFormUrl[0],
            name: name[0],
            email: email[0],
            phone: phone[0],
            reason: reason[0],
            appointmentDate,
            appointmentTime,
            availability: availability[0],
            smsOptIn: smsOptIn[0] === "true",
            emailOptIn: emailOptIn[0] === "true",
            fileUploaded: !!file,
            isPlatform: true,
            privacyPolicyOptIn: privacyPolicyOptIn[0] === "true",
            termsOfServiceOptIn: termsOfServiceOptIn[0] === "true",
            promotionalOptIn: promotionalOptIn[0] === "true",
            marketingOptIn: marketingOptIn[0] === "true",
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

        // Send email to business
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

        // Send email to customer
        if (emailOptIn[0] === "true") {
            await sendEmailWithCalendar(
                transporter,
                email[0],
                "NexusConjure Alert Registration Confirmation",
                customerEmailHtml,
                calendarEvent
            );
        }

        // Send SMS to business
        try {
            await twilioClient.messages.create({
                body: `New NexusConjure Alert Registration from ${name[0]}. Use Case: ${useCaseCategory[0]}. Appointment: ${appointmentDate} at ${appointmentTime}.`,
                from: twilioFromNumber,
                to: businessPhoneNumber,
            });
            console.log("SMS sent successfully to business");
        } catch (error) {
            console.error("Error sending SMS to business:", error);
        }

        // Send SMS to customer
        if (smsOptIn[0] === "true") {
            try {
                await twilioClient.messages.create({
                    body: `Thank you ${name[0]} for registering with NexusConjure for the ${useCaseCategory[0]} use case. Your appointment is scheduled for ${appointmentDate} at ${appointmentTime}. We're excited to have you on board! Reply with "STOP-TEXT" at anytime to opt out of automated text messages.`,
                    from: twilioFromNumber,
                    to: phone[0],
                });
                console.log("SMS sent successfully to customer");
            } catch (error) {
                console.error("Error sending SMS to customer:", error);
            }
        }

        res.status(200).json({
            message: "Alert registration successful",
        });
    } catch (error) {
        console.error("Error registering alert:", error);
        res.status(500).json({
            error: "Error registering alert",
            details: (error as Error).message,
        });
    }
}
