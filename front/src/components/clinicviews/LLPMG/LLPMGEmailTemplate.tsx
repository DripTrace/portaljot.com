// "use server";

import { FC } from "react";
// import { Provider } from "./ContactForm";

export interface LLPMGEmailTemplateProps {
	name: string;
	email: string;
	phone: string;
	birthday: string;
	insurance: string;
	address: string;
	// pharmacy: string;
	reason: string;
	// suggestedAppointment: string;
	isDoctor: boolean;
	// suggestedProvider: string;
	//?: string;
	providerEmail: string;
	providerPhone: string;
}

const LLPMGEmailTemplate: FC<LLPMGEmailTemplateProps> = ({
	name,
	email,
	phone,
	birthday,
	insurance,
	address,
	// pharmacy,
	reason,
	// suggestedAppointment,
	isDoctor,
	// suggestedProvider,
	//,
	providerEmail,
	providerPhone,
}) => {
	const containerStyle = {
		fontFamily: "Arial, sans-serif",
		color: "#494949",
		textAlign: "center" as const,
		padding: "20px",
		backgroundColor: "#f9f9f9",
		borderRadius: "8px",
		boxShadow: "0 0 10px rgba(0,0,0,0.1)",
		maxWidth: "600px",
		margin: "auto",
	};

	const headerStyle = {
		backgroundColor: isDoctor ? "#0C3C60" : "#6EA4CE",
		color: "#ffffff",
		padding: "10px 0",
		borderRadius: "8px 8px 0 0",
	};

	const contentStyle = {
		padding: "20px",
		textAlign: "left" as const,
	};

	const footerStyle = {
		marginTop: "20px",
		fontSize: "12px",
		color: "#888",
	};

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<h1>
					{isDoctor
						? "New Patient Registration"
						: "Registration Confirmation"}
				</h1>
			</div>
			<div style={contentStyle}>
				<p>
					{isDoctor
						? `A new patient has registered. Here are the details we've received:`
						: `Thank you for registering with Loma Linda Psychiatric Medical Group. Here are the details we've received:`}
				</p>
				<p>
					<strong>Name:</strong> {name}
				</p>
				<p>
					<strong>Email:</strong> {email}
				</p>
				<p>
					<strong>Phone:</strong> {phone}
				</p>
				<p>
					<strong>Birthday:</strong> {birthday}
				</p>
				<p>
					<strong>Insurance:</strong> {insurance}
				</p>
				<p>
					<strong>Address:</strong>
					<br />
					{address}
				</p>
				{/* <p>
                    <strong>Preferred Pharmacy:</strong> {pharmacy}
                </p> */}
				<p>
					<strong>Reason for Visit:</strong> {reason}
				</p>
				{/* <p>
                    <strong>Suggested Appointment:</strong>{" "}
                    {suggestedAppointment}
                </p> */}
				{/* <p>
                    <strong>Suggested Provider:</strong> {suggestedProvider}
                </p> */}
				<p>
					{isDoctor
						? "Please review the attached PDF (if any) for additional information."
						: "We will contact you soon to confirm your registration and provide further information."}
				</p>
				<p style={footerStyle}>
					If you have any questions, please contact us at{" "}
					<a href="mailto:llpmg@lomalindapsych.com">
						llpmg@lomalindapsych.com
					</a>{" "}
					or <a href="tel:9097926262">(909) 792-6262</a>.
				</p>
			</div>
		</div>
	);
};

export default LLPMGEmailTemplate;
