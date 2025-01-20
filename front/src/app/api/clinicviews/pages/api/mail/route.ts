import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import nodemailer from "nodemailer";

export const config = {
    api: {
        bodyParser: false,
    },
};

const sendPatientMail = async (req: NextApiRequest, res: NextApiResponse) => {
    const patientForm = new IncomingForm();
    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
        patientForm.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
        });
    });

    const patientFile = files.file[0];

    const patientFileContent = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        const readStream = require("fs").createReadStream(patientFile.filepath);
        readStream.on("data", (chunk: Buffer) => chunks.push(chunk));
        readStream.on("error", reject);
        readStream.on("end", () => resolve(Buffer.concat(chunks)));
    });

    const fileContentBase64 = patientFileContent.toString("base64");

    console.log("PDF file processed successfully");

    let emailTransporter = nodemailer.createTransport({
        host: "smtp.protonmail.ch",
        port: 587,
        secure: true,
        auth: {
            user: "colton@lomalindapsych.com",
            pass: "T5UX66HD49PWZ6YA",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let emailInfo = await emailTransporter.sendMail({
        from: '"LLPMG" <colton@lomalindapsych.com>',
        to: "me@russellpalma.com",
        subject: "Patient Registration Details",
        text: "A patient registration form is attached to this email.",
        attachments: [
            {
                filename: `${patientFile.filename}`,
                content: fileContentBase64,
                encoding: "base64",
            },
        ],
    });

    console.log("Message sent: %s", emailInfo.messageId);
};

export default sendPatientMail;
