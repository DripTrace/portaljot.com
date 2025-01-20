"use client";

import React from "react";
import { motion } from "framer-motion";
import {
	Globe,
	Users,
	Zap,
	Award,
	Briefcase,
	Code,
	ShieldCheck,
	MessageSquare,
} from "lucide-react";
import Navigation from "@/components/nexusconjure/site/navigation";

const AboutPage: React.FC = () => {
	const sections = [
		{
			title: "Our Mission",
			content:
				"To empower businesses across all industries with cutting-edge digital solutions, fostering innovation and growth in an interconnected world.",
			icon: <Globe className="w-12 h-12 text-primary" />,
		},
		{
			title: "Our Team",
			content:
				"A diverse group of experts passionate about technology and its potential to transform industries. From blockchain specialists to AI researchers, our team is at the forefront of digital innovation.",
			icon: <Users className="w-12 h-12 text-primary" />,
		},
		{
			title: "Our Approach",
			content:
				"We believe in tailored solutions that address the unique challenges of each industry. Our platform adapts to your needs, whether you're in healthcare, finance, or creative industries.",
			icon: <Zap className="w-12 h-12 text-primary" />,
		},
		{
			title: "Our Commitment",
			content:
				"We're committed to security, privacy, and ethical technology use. As we push the boundaries of what's possible, we never lose sight of our responsibility to our users and society.",
			icon: <Award className="w-12 h-12 text-primary" />,
		},
	];

	const industries = [
		"Healthcare",
		"Finance",
		"Education",
		"E-commerce",
		"Manufacturing",
		"Entertainment",
		"Legal",
		"Real Estate",
		"Logistics",
		"Agriculture",
	];

	const useCases = [
		{
			title: "Domain Management",
			content:
				"Effortlessly manage your domain names, renewals, and transfers. Our platform provides a seamless experience for all your domain management needs.",
			icon: <Globe className="w-8 h-8 text-primary" />,
		},
		{
			title: "Website Support",
			content:
				"Get expert support for your website, from troubleshooting to optimization. Our team of experts is here to help you every step of the way.",
			icon: <Code className="w-8 h-8 text-primary" />,
		},
		{
			title: "Healthcare Communications",
			content:
				"Stay connected with your patients and healthcare providers through secure and HIPAA-compliant messaging. Our platform ensures privacy and security for all communications.",
			icon: <MessageSquare className="w-8 h-8 text-primary" />,
		},
		{
			title: "Business Communications",
			content:
				"Enhance your business communications with features like 2FA, customer support, account notifications, event updates, and targeted marketing. Our platform provides a comprehensive solution for all your communication needs.",
			icon: <MessageSquare className="w-8 h-8 text-primary" />,
		},
		{
			title: "Security and Privacy",
			content:
				"We prioritize security and privacy. Our platform uses advanced encryption techniques to protect your data, and we comply with all relevant regulations to ensure your privacy is protected.",
			icon: <ShieldCheck className="w-8 h-8 text-primary" />,
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
				<motion.h1
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className="text-4xl font-bold text-primary text-center mb-8"
				>
					About NexusConjure
				</motion.h1>

				<p className="text-center mb-12 text-muted-foreground max-w-2xl mx-auto">
					NexusConjure is a pioneering platform that bridges the gap
					between cutting-edge technology and diverse industry needs.
					We&apos;re on a mission to democratize digital
					transformation across all sectors through the use of our
					comprehensive interfaces.
				</p>

				<div className="grid md:grid-cols-2 gap-8 mb-12">
					{sections.map((section, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-card p-6 rounded-lg shadow-md"
						>
							<div className="flex items-center mb-4">
								{section.icon}
								<h2 className="text-2xl font-semibold ml-4">
									{section.title}
								</h2>
							</div>
							<p className="text-muted-foreground">
								{section.content}
							</p>
						</motion.div>
					))}
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-12">
					{useCases.map((useCase, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-card p-6 rounded-lg shadow-md"
						>
							<div className="flex items-center mb-4">
								{useCase.icon}
								<h2 className="text-2xl font-semibold ml-4">
									{useCase.title}
								</h2>
							</div>
							<p className="text-muted-foreground">
								{useCase.content}
							</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mb-12"
				>
					<h2 className="text-2xl font-semibold mb-4 flex items-center">
						<Briefcase className="w-8 h-8 text-primary mr-2" />
						Industries We Serve
					</h2>
					<div className="flex flex-wrap gap-2">
						{industries.map((industry, index) => (
							<span
								key={index}
								className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
							>
								{industry}
							</span>
						))}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-center"
				>
					<p className="mb-4 text-muted-foreground">
						Ready to transform your industry with NexusConjure?
					</p>
					<motion.a
						href="/alerts"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-full shadow-lg"
					>
						Get in Touch
					</motion.a>
				</motion.div>
			</motion.div>
		</>
	);
};

export default AboutPage;
