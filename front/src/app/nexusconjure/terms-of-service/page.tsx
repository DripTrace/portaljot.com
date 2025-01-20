"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scroll, FileText, AlertCircle } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import Navigation from "@/components/nexusconjure/site/navigation";

const TermsOfServicePage: React.FC = () => {
	const termsSection = [
		{
			id: "acceptance",
			title: "Acceptance of Terms",
			content: `By accessing or using NexusConjure's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.`,
		},
		{
			id: "service-description",
			title: "Description of Service",
			content: `NexusConjure provides a multi-industry platform for digital transformation, including but not limited to web services, business solutions, blockchain integration, and AI-powered tools. The specific services available to you depend on your subscription level and intended use case.`,
		},
		{
			id: "user-obligations",
			title: "User Obligations",
			content: `You are responsible for maintaining the confidentiality of your account, using the services legally and ethically, and ensuring that any data or content you provide doesn't violate any laws or infringe on others' rights.`,
		},
		{
			id: "payment-terms",
			title: "Payment Terms",
			content: `Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable, except as required by law or as explicitly stated in our refund policy.`,
		},
		{
			id: "data-ownership",
			title: "Data Ownership and Usage",
			content: `You retain all rights to your data. By using our services, you grant NexusConjure a license to host, store, and share your content as necessary to provide the service.`,
		},
		{
			id: "intellectual-property",
			title: "Intellectual Property Rights",
			content: `NexusConjure's platform, including its original content, features, and functionality, is owned by NexusConjure and protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`,
		},
		{
			id: "termination",
			title: "Termination",
			content: `We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including breach of these Terms.`,
		},
		{
			id: "limitation-liability",
			title: "Limitation of Liability",
			content: `NexusConjure shall not be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, or goodwill, resulting from your use of the service.`,
		},
		{
			id: "changes-to-terms",
			title: "Changes to Terms",
			content: `We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes at least 30 days before they become effective.`,
		},
		{
			id: "governing-law",
			title: "Governing Law",
			content: `These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.`,
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
					<Scroll className="text-primary w-16 h-16 mr-4" />
					<h1 className="text-4xl font-bold text-primary">
						Terms of Service
					</h1>
				</motion.div>

				<p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
					Welcome to NexusConjure. These Terms of Service govern your
					use of our platform and services. Please read them
					carefully.
				</p>

				<Accordion.Root
					type="single"
					collapsible
					className="w-full max-w-3xl mx-auto"
				>
					{termsSection.map((section, index) => (
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
									<FileText className="w-5 h-5" />
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
						<AlertCircle className="w-5 h-5 mr-2" />
						If you have any questions about these Terms, please
						contact us.
					</p>
					<motion.a
						href="mailto:legal@nexusconjure.com"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-full shadow-lg"
					>
						Contact Legal Team
					</motion.a>
				</motion.div>
			</motion.div>
		</>
	);
};

export default TermsOfServicePage;
