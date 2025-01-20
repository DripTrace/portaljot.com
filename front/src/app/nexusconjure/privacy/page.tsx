"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import Navigation from "@/components/nexusconjure/site/navigation";

const PrivacyPolicyPage: React.FC = () => {
	const privacySections = [
		{
			id: "information-collection",
			title: "Information We Collect",
			content: `We collect information you provide directly, such as account details and service usage data. We also collect data automatically through your use of our platform, including log data and device information.`,
		},
		{
			id: "use-of-information",
			title: "How We Use Your Information",
			content: `We use your information to provide and improve our services, communicate with you, ensure security, and comply with legal obligations. This includes personalizing your experience and developing new features.`,
		},
		{
			id: "data-sharing",
			title: "How We Share Your Information",
			content: `We do not sell your personal information. We may share data with service providers, for legal compliance, or in the event of a business transfer. Any sharing is subject to strict confidentiality agreements.`,
		},
		{
			id: "data-security",
			title: "How We Protect Your Data",
			content: `We implement robust security measures, including encryption, access controls, and regular security audits. We also provide options for users to enhance their account security, such as two-factor authentication.`,
		},
		{
			id: "data-retention",
			title: "Data Retention",
			content: `We retain your data for as long as your account is active or as needed to provide services. We will delete or anonymize your data upon request, except where we are legally required to retain it.`,
		},
		{
			id: "user-rights",
			title: "Your Rights and Choices",
			content: `Depending on your location, you may have rights to access, correct, delete, or port your data. You can also opt-out of certain data uses. We provide tools in your account settings to exercise many of these rights.`,
		},
		{
			id: "cookies",
			title: "Cookies and Tracking",
			content: `We use cookies and similar technologies to maintain sessions, remember preferences, and analyze usage patterns. You can control cookie settings through your browser.`,
		},
		{
			id: "children-privacy",
			title: "Children's Privacy",
			content: `Our services are not directed to children under 13. If we learn we have collected personal information from a child under 13, we will promptly delete that information.`,
		},
		{
			id: "international-transfers",
			title: "International Data Transfers",
			content: `Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for these transfers.`,
		},
		{
			id: "policy-changes",
			title: "Changes to This Policy",
			content: `We may update this policy periodically. We will notify you of any material changes via email or through our platform. We encourage you to review the policy regularly.`,
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
						Privacy Policy
					</h1>
				</motion.div>

				<p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
					At NexusConjure, we are committed to protecting your privacy
					and ensuring the security of your data across all our
					services and industries we serve.
				</p>

				<Accordion.Root
					type="single"
					collapsible
					className="w-full max-w-3xl mx-auto"
				>
					{privacySections.map((section, index) => (
						<motion.div
							key={section.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<Accordion.Item
								value={section.id}
								className="mb-4 bg-card rounded-lg shadow-md overflow-hidden"
							>
								<Accordion.Trigger className="w-full px-6 py-4 text-left text-lg font-semibold hover:bg-muted flex justify-between items-center">
									<span>{section.title}</span>
									<Lock className="w-5 h-5" />
								</Accordion.Trigger>
								<Accordion.Content className="px-6 py-4 text-muted-foreground">
									<p>{section.content}</p>
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
					<p className="mb-4 text-muted-foreground flex items-center justify-center">
						<Eye className="w-5 h-5 mr-2" />
						For more information about our privacy practices, please
						contact our Data Protection Officer.
					</p>
					<motion.a
						href="mailto:privacy@nexusconjure.com"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-full shadow-lg"
					>
						Contact Privacy Team
					</motion.a>
				</motion.div>
			</motion.div>
		</>
	);
};

export default PrivacyPolicyPage;
