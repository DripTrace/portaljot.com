import React from "react";

interface SendTemplateProps {
    patientName: string;
    patientEmail: string;
    submissionDate: string;
}

export const SendTemplate: React.FC<SendTemplateProps> = ({
    patientName,
    patientEmail,
    submissionDate,
}) => (
    <div>
        <div
            className="container"
            style={{ marginLeft: "20px", marginRight: "20px" }}
        >
            <h2>New Patient Packet Submission</h2>
            <p>Dear Loma Linda Psychiatric Medical Group,</p>
            <p>
                A new patient packet has been submitted through your online
                registration system. Please find the details below:
            </p>
            <table style={{ marginBottom: "20px" }}>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Patient Name:</td>
                    <td>{patientName}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Patient Email:</td>
                    <td>{patientEmail}</td>
                </tr>
                <tr>
                    <td style={{ fontWeight: "bold" }}>Submission Date:</td>
                    <td>{submissionDate}</td>
                </tr>
            </table>
            <p>
                The submitted patient packet is attached to this email as a PDF
                file. Please review the information and take the necessary steps
                to process the patient&apos;s registration.
            </p>
            <p>
                If you have any questions or require further assistance, please
                don&apos;t hesitate to contact our support team.
            </p>
            <p style={{ marginTop: "30px" }}>Best regards,</p>
            <p>
                Loma Linda Psychiatric Medical Group
                <br />
                Patient Registration System
            </p>
            <div
                className="footer-links"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "30px",
                    paddingTop: "20px",
                    borderTop: "1px solid #D1D5DB",
                }}
            >
                <a
                    href="https://lomalindapsych.com"
                    style={{
                        textDecoration: "none",
                        margin: "8px",
                        color: "#9CA3AF",
                    }}
                >
                    Website
                </a>
                <a
                    href="mailto:info@lomalindapsych.com"
                    style={{
                        textDecoration: "none",
                        margin: "8px",
                        color: "#9CA3AF",
                    }}
                >
                    Contact Us
                </a>
                <a
                    href="https://lomalindapsych.com/llpmg/privacy-and-notices"
                    style={{
                        textDecoration: "none",
                        margin: "8px",
                        color: "#9CA3AF",
                    }}
                >
                    Privacy Policy
                </a>
            </div>
        </div>
    </div>
);
