import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import nodemailer from "nodemailer";
import { ringCentralClient } from "@/lib/ringcentralClient";

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

async function newPatient(req: NextApiRequest, res: NextApiResponse) {
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

        const { name, email, phone } = fields;
        const file = files.file[0];

        const fileContent = await new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            const readStream = require("fs").createReadStream(file.filepath);
            readStream.on("data", (chunk: Buffer) => chunks.push(chunk));
            readStream.on("error", reject);
            readStream.on("end", () => resolve(Buffer.concat(chunks)));
        });

        const fileContentBase64 = fileContent.toString("base64");

        let emailTransporter = nodemailer.createTransport({
            host: `${process.env.PROTONMAIL_HOST}`,
            port: Number(`${process.env.PROTONMAIL_PORT}`),
            secure: false,
            auth: {
                user: `${process.env.PROTONMAIL_SENDER}`,
                pass: `${process.env.PROTONMAIL_PASSWORD}`,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let emailTransporterColton = nodemailer.createTransport({
            host: `${process.env.PROTONMAIL_HOST}`,
            port: Number(`${process.env.PROTONMAIL_PORT}`),
            secure: false,
            auth: {
                user: `${process.env.PROTONMAIL_0TH_SENDER}`,
                pass: `${process.env.PROTONMAIL_0TH_PASSWORD}`,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const date = new Date();
        const formattedDate = date.toLocaleString("en-US", {
            timeZoneName: "short",
        });

        let emailInfo = await emailTransporter.sendMail({
            from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
            to: `${process.env.PROTONMAIL_RECIPIENT}`,
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

        let emailInfoColton = await emailTransporterColton.sendMail({
            from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_0TH_SENDER}>`,
            to: `${process.env.PROTONMAIL_0TH_RECIPIENT}`,
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

        console.log("%s email sent successfully", emailInfo.messageId);
        console.log("%s email sent successfully", emailInfoColton.messageId);

        // Send SMS to patient
        const patientSmsMessage = `Thank you for registering with Loma Linda Psychiatric Medical Group, ${name}! We have received your registration form and will contact you soon to confirm your details.`;
        await sendSMS(phone, patientSmsMessage);

        // Send SMS to doctor/admin
        const doctorSmsMessage = `New patient registration received from ${name}. Please check your email for the registration form.`;
        await sendSMS(process.env.RC_PHONE_NUMBER!, doctorSmsMessage);

        return res.status(200).json({
            message:
                "Registration successful. Email sent and SMS notifications delivered.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "An unknown error occurred",
            details: (error as Error).message,
        });
    }
}

export default newPatient;
