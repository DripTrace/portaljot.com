import React from "react";

interface FooterProps {
	companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
	return (
		<footer className="p-4 bg-purple-900 text-white text-center">
			&copy; {new Date().getFullYear()} {companyName}. All rights
			reserved.
			<p>A comprehensive platform that leverages resources for:</p>
			<ul className="list-disc list-inside">
				<li>Domain management and website support</li>
				<li>Healthcare communications and customer engagement</li>
				<li>
					Multi-purpose business communications (e.g., 2FA, customer
					support, account notifications, event updates, and targeted
					marketing)
				</li>
				<li>Public service announcements</li>
			</ul>
			<p className="mt-4">
				<a
					href="/about"
					className="text-purple-300 hover:text-purple-100 underline"
				>
					Learn more about NexusConjure
				</a>
			</p>
		</footer>
	);
};

export default Footer;
