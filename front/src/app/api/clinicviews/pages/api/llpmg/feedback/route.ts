import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { ringCentralClient } from "@/lib/ringcentralClient";

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

async function sendEmail(
    to: string,
    subject: string,
    html: string,
    transporter: nodemailer.Transporter
) {
    await transporter.sendMail({
        from: `"${process.env.PROTONMAIL_NAME}" <${process.env.PROTONMAIL_SENDER}>`,
        to: to,
        subject: subject,
        html: html,
    });
}

function createEmailContent(data: any, isDoctor: boolean): string {
    const {
        name,
        email,
        phone,
        rating,
        feedbackType,
        comment,
        additionalFields,
    } = data;

    const header = isDoctor
        ? "New Patient Feedback Submission"
        : "Thank You for Your Feedback";
    const intro = isDoctor
        ? `<p>Dear Healthcare Provider,</p><p>A new patient feedback has been submitted. Please review the details below:</p>`
        : `<p>Dear ${name},</p><p>Thank you for taking the time to provide your feedback to Loma Linda Psychiatric Medical Group. Your input is invaluable in helping us improve our services and ensure the best care for all our patients.</p>`;

    const details = `
        <div>
            <h2>Feedback Details</h2>
            ${
                isDoctor
                    ? `
            <p><strong>Patient Name:</strong> ${name}</p>
            <p><strong>Patient Email:</strong> ${email}</p>
            <p><strong>Patient Phone:</strong> ${phone || "Not provided"}</p>
            `
                    : ""
            }
            <p><strong>Feedback Type:</strong> ${feedbackType}</p>
            <p><strong>Rating:</strong> ${rating}/5</p>
            <p><strong>Comment:</strong></p>
            <p>${comment}</p>
        </div>
    `;

    const additionalInfo =
        Object.keys(additionalFields).length > 0
            ? `
        <div>
            <h2>Additional Information</h2>
            ${Object.entries(additionalFields)
                .map(
                    ([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`
                )
                .join("")}
        </div>
        `
            : "";

    const conclusion = isDoctor
        ? `<p>Please review this feedback carefully and consider any necessary actions or improvements based on the patient's comments.</p>`
        : `<p>We want to assure you that your feedback will be carefully reviewed by our team. Your insights help us continually enhance the quality of care and service we provide.</p>`;

    return `
        <div style="font-family: Arial, sans-serif; color: #494949; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="background-color: ${isDoctor ? "#0C3C60" : "#6EA4CE"}; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1>${header}</h1>
            </div>
            <div style="padding: 20px;">
                ${intro}
                ${details}
                ${additionalInfo}
                ${conclusion}
            </div>
        </div>
    `;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const {
            name,
            email,
            phone,
            rating,
            feedbackType,
            comment,
            additionalFields,
        } = req.body;

        let transporter = nodemailer.createTransport({
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

        await transporter.verify();

        // Generate email content
        const patientEmailHtml = createEmailContent(
            {
                name,
                email,
                phone,
                rating,
                feedbackType,
                comment,
                additionalFields,
            },
            false
        );
        const doctorEmailHtml = createEmailContent(
            {
                name,
                email,
                phone,
                rating,
                feedbackType,
                comment,
                additionalFields,
            },
            true
        );

        // Send emails
        await sendEmail(
            email,
            "Thank you for your feedback",
            patientEmailHtml,
            transporter
        );
        await sendEmail(
            process.env.PROTONMAIL_SENDER!,
            `New Feedback Submission: ${feedbackType}`,
            doctorEmailHtml,
            transporter
        );

        // Send SMS to patient
        if (phone) {
            const patientSmsMessage = `Thank you for your feedback, ${name}! We appreciate your input and will use it to improve our services.`;
            await sendSMS(phone, patientSmsMessage);
        }

        // Send SMS to doctor
        const doctorSmsMessage = `New feedback received from ${name}. Type: ${feedbackType}, Rating: ${rating}/5. Please check your email for details.`;
        await sendSMS(process.env.RC_PHONE_NUMBER!, doctorSmsMessage);

        res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Error processing feedback:", error);
        res.status(500).json({
            message: "Error processing feedback",
            error: (error as Error).message,
        });
    }
}
