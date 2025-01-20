import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        ciphers: "SSLv3",
    },
});

export const sendEmail = async (
    to: string,
    subject: string,
    html: string,
    attachments?: any[]
) => {
    const mailOptions = {
        from: `"FSClinicals Mail" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        attachments,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
    }
};
