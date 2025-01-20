"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronRight, ExternalLink } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import Navigation from "@/components/nexusconjure/site/navigation";

const PolicyPage: React.FC = () => {
	const [activeSection, setActiveSection] = useState<string | null>(null);

	const policyTopics = [
		{
			id: "privacy-data-usage",
			title: "Privacy & Data Usage",
			content: `At NexusConjure, we prioritize the privacy and security of your data. We collect only essential information needed to provide our services, which may include personal details, usage data, and technical information.

      • Personal data is used solely for service provision, account management, and communication.
      • Usage data helps us improve our platform and tailor experiences.
      • We employ industry-standard encryption and security measures to protect your data.
      • Your data is never sold to third parties. Sharing occurs only with your explicit consent or as required by law.
      • You have the right to access, correct, or delete your personal information at any time.`,
		},
		{
			id: "security-measures",
			title: "Security Measures",
			content: `We implement robust security measures to safeguard your data and our platform:

      • End-to-end encryption for all data transmissions.
      • Regular security audits and penetration testing.
      • Multi-factor authentication options for user accounts.
      • Continuous monitoring for unusual activities or potential threats.
      • Compliance with international security standards (e.g., ISO 27001, SOC 2).
      • Regular updates and patches to address potential vulnerabilities.`,
		},
		{
			id: "user-responsibilities",
			title: "User Responsibilities",
			content: `As a user of NexusConjure, you play a crucial role in maintaining the security and integrity of our platform:

      • Maintain the confidentiality of your account credentials.
      • Use strong, unique passwords and enable two-factor authentication.
      • Promptly report any suspected unauthorized access or security breaches.
      • Comply with all applicable laws and regulations when using our services.
      • Respect the intellectual property rights of NexusConjure and other users.
      • Do not use our platform for any illegal, harmful, or fraudulent activities.`,
		},
		{
			id: "service-usage",
			title: "Service Usage & Limitations",
			content: `Our platform offers a wide range of services across various industries. Please note:

      • Service availability may vary based on your subscription level and geographical location.
      • We strive for 99.9% uptime, but cannot guarantee uninterrupted service at all times.
      • Usage limits may apply to certain features to ensure fair use for all customers.
      • Beta features are provided "as-is" and may be subject to changes or discontinuation.
      • We reserve the right to modify, suspend, or terminate services with appropriate notice.`,
		},
		{
			id: "data-retention",
			title: "Data Retention & Deletion",
			content: `We have specific policies regarding how long we retain your data:

      • Active account data is retained for the duration of your account's existence.
      • Inactive accounts may be archived after 12 months of inactivity.
      • Upon account deletion, personal data is removed within 30 days, except where legally required to retain it.
      • Anonymized usage data may be retained for analytical purposes.
      • Backup data is retained for a maximum of 90 days for disaster recovery purposes.`,
		},
		{
			id: "compliance",
			title: "Regulatory Compliance",
			content: `NexusConjure is committed to compliance with relevant laws and regulations:

      • GDPR compliance for users in the European Economic Area.
      • CCPA compliance for California residents.
      • HIPAA compliance for healthcare-related services, where applicable.
      • Compliance with industry-specific regulations based on the services used.
      • Regular updates to our policies to reflect changes in legal requirements.
      • Transparency in our data processing activities and user rights.`,
		},
		{
			id: "intellectual-property",
			title: "Intellectual Property",
			content: `Respect for intellectual property rights is crucial:

      • NexusConjure retains ownership of our platform, branding, and proprietary technologies.
      • Users retain ownership of their data and content uploaded to our platform.
      • We provide licenses to use our services as outlined in our Terms of Service.
      • Report any suspected intellectual property infringements promptly.
      • We respect and expect users to respect third-party intellectual property rights.`,
		},
		{
			id: "updates-notifications",
			title: "Policy Updates & Notifications",
			content: `We may update our policies to reflect changes in our services or legal requirements:

      • Users will be notified of significant policy changes via email or in-app notifications.
      • A 30-day notice period will be provided for material changes, where possible.
      • The latest version of our policies will always be available on our website.
      • Users are encouraged to review our policies periodically.
      • Questions about policy updates can be directed to our support team.`,
		},
	];

	return (
		<>
			<Navigation />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="pl-8 pr-8 pb-8 pt-14 bg-background text-foreground"
			>
				<motion.div
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className="flex items-center justify-center mb-8"
				>
					<Shield className="text-primary w-16 h-16 mr-4" />
					<h1 className="text-4xl font-bold text-primary">
						NexusConjure Policies
					</h1>
				</motion.div>

				<p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
					At NexusConjure, we are committed to transparency, security,
					and user empowerment. Our policies are designed to protect
					your rights while ensuring the integrity and efficiency of
					our platform across all the industries we serve.
				</p>

				<Accordion.Root
					type="single"
					collapsible
					className="w-full max-w-3xl mx-auto"
				>
					{policyTopics.map((topic, index) => (
						<motion.div
							key={topic.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<Accordion.Item
								value={topic.id}
								className="mb-4 bg-card rounded-lg shadow-md overflow-hidden"
							>
								<Accordion.Trigger
									className="w-full px-6 py-4 text-left text-lg font-semibold hover:bg-muted flex justify-between items-center"
									onClick={() =>
										setActiveSection(
											activeSection === topic.id
												? null
												: topic.id
										)
									}
								>
									<span>{topic.title}</span>
									<ChevronRight
										className={`w-5 h-5 transform transition-transform duration-200 ${
											activeSection === topic.id
												? "rotate-90"
												: ""
										}`}
									/>
								</Accordion.Trigger>
								<Accordion.Content className="px-6 py-4 text-muted-foreground">
									<p className="whitespace-pre-line">
										{topic.content}
									</p>
								</Accordion.Content>
							</Accordion.Item>
						</motion.div>
					))}
				</Accordion.Root>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="mt-12 text-center"
				>
					<p className="mb-4 text-muted-foreground">
						For more detailed information, please review our full{" "}
						<a
							href="/terms-of-service"
							className="text-primary hover:underline"
						>
							Terms of Service
						</a>{" "}
						and{" "}
						<a
							href="/privacy"
							className="text-primary hover:underline"
						>
							Privacy Policy
						</a>
						.
					</p>
					<motion.a
						href="mailto:support@nexusconjure.com"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-full shadow-lg"
					>
						Contact Support
						<ExternalLink className="ml-2 h-4 w-4" />
					</motion.a>
				</motion.div>
			</motion.div>
		</>
	);
};

export default PolicyPage;
