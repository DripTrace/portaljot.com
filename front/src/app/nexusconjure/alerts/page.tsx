// // "use client";

// // import React, { useState, useRef } from "react";
// // import { motion } from "framer-motion";
// // import { Send, ChevronDown, Info } from "lucide-react";
// // import * as Form from "@radix-ui/react-form";
// // import * as Select from "@radix-ui/react-select";
// // import { isValidPhoneNumber } from "libphonenumber-js";
// // import { Canvas, useFrame } from "@react-three/fiber";
// // import { Box, OrbitControls } from "@react-three/drei";
// // import { Tooltip } from "react-tooltip";
// // import * as THREE from "three";
// // import Navigation from "@/components/site/navigation";
// // import Footer from "@/components/site/footer";

// // const reasonOptions = [
// // 	{
// // 		value: "web-digital-presence",
// // 		label: "Web & Digital Presence",
// // 		children: [
// // 			{
// // 				value: "website-development",
// // 				label: "Custom Website Development",
// // 			},
// // 			{
// // 				value: "ecommerce-solutions",
// // 				label: "E-commerce Platform Integration",
// // 			},
// // 			{
// // 				value: "cms-implementation",
// // 				label: "Content Management System (CMS) Setup",
// // 			},
// // 			{
// // 				value: "seo-optimization",
// // 				label: "Search Engine Optimization (SEO)",
// // 			},
// // 			{
// // 				value: "web-accessibility",
// // 				label: "Web Accessibility Compliance",
// // 			},
// // 			{
// // 				value: "progressive-web-apps",
// // 				label: "Progressive Web App (PWA) Development",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "business-operations",
// // 		label: "Business Operations & Management",
// // 		children: [
// // 			{
// // 				value: "erp-implementation",
// // 				label: "Enterprise Resource Planning (ERP) Systems",
// // 			},
// // 			{
// // 				value: "crm-solutions",
// // 				label: "Customer Relationship Management (CRM) Tools",
// // 			},
// // 			{
// // 				value: "business-intelligence",
// // 				label: "Business Intelligence & Analytics",
// // 			},
// // 			{
// // 				value: "project-management",
// // 				label: "Project Management Solutions",
// // 			},
// // 			{
// // 				value: "supply-chain-optimization",
// // 				label: "Supply Chain Optimization",
// // 			},
// // 			{
// // 				value: "inventory-management",
// // 				label: "Inventory Management Systems",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "financial-services",
// // 		label: "Financial Services & FinTech",
// // 		children: [
// // 			{ value: "payment-gateways", label: "Payment Gateway Integration" },
// // 			{
// // 				value: "cryptocurrency-solutions",
// // 				label: "Cryptocurrency & Blockchain Solutions",
// // 			},
// // 			{
// // 				value: "financial-analytics",
// // 				label: "Financial Analytics & Reporting",
// // 			},
// // 			{
// // 				value: "risk-management-systems",
// // 				label: "Risk Management Systems",
// // 			},
// // 			{
// // 				value: "regulatory-compliance",
// // 				label: "Financial Regulatory Compliance Tools",
// // 			},
// // 			{ value: "robo-advisory", label: "Robo-Advisory Platforms" },
// // 		],
// // 	},
// // 	{
// // 		value: "healthcare-medical",
// // 		label: "Healthcare & Medical Technologies",
// // 		children: [
// // 			{
// // 				value: "ehr-systems",
// // 				label: "Electronic Health Record (EHR) Systems",
// // 			},
// // 			{
// // 				value: "telemedicine-platforms",
// // 				label: "Telemedicine & Remote Care Platforms",
// // 			},
// // 			{
// // 				value: "medical-imaging",
// // 				label: "Medical Imaging & Diagnostics Solutions",
// // 			},
// // 			{
// // 				value: "healthcare-analytics",
// // 				label: "Healthcare Analytics & Predictive Modeling",
// // 			},
// // 			{
// // 				value: "patient-engagement",
// // 				label: "Patient Engagement & Portal Systems",
// // 			},
// // 			{
// // 				value: "clinical-trial-management",
// // 				label: "Clinical Trial Management Systems",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "education-elearning",
// // 		label: "Education & E-Learning",
// // 		children: [
// // 			{
// // 				value: "lms-development",
// // 				label: "Learning Management System (LMS) Development",
// // 			},
// // 			{
// // 				value: "educational-content",
// // 				label: "Interactive Educational Content Creation",
// // 			},
// // 			{
// // 				value: "student-information-systems",
// // 				label: "Student Information Systems",
// // 			},
// // 			{
// // 				value: "adaptive-learning",
// // 				label: "Adaptive Learning Technologies",
// // 			},
// // 			{
// // 				value: "virtual-classrooms",
// // 				label: "Virtual Classroom Solutions",
// // 			},
// // 			{
// // 				value: "education-analytics",
// // 				label: "Educational Analytics & Performance Tracking",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "media-entertainment",
// // 		label: "Media & Entertainment",
// // 		children: [
// // 			{
// // 				value: "streaming-platforms",
// // 				label: "Video & Audio Streaming Platforms",
// // 			},
// // 			{
// // 				value: "content-management",
// // 				label: "Digital Asset Management Systems",
// // 			},
// // 			{
// // 				value: "gaming-solutions",
// // 				label: "Gaming & Interactive Entertainment Solutions",
// // 			},
// // 			{
// // 				value: "ar-vr-experiences",
// // 				label: "Augmented & Virtual Reality Experiences",
// // 			},
// // 			{
// // 				value: "media-analytics",
// // 				label: "Media Analytics & Audience Insights",
// // 			},
// // 			{
// // 				value: "content-recommendation",
// // 				label: "Content Recommendation Engines",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "iot-smart-devices",
// // 		label: "IoT & Smart Devices",
// // 		children: [
// // 			{ value: "iot-platforms", label: "IoT Platform Development" },
// // 			{ value: "smart-home", label: "Smart Home & Building Automation" },
// // 			{
// // 				value: "industrial-iot",
// // 				label: "Industrial IoT & Predictive Maintenance",
// // 			},
// // 			{ value: "wearable-tech", label: "Wearable Technology Solutions" },
// // 			{ value: "iot-security", label: "IoT Security & Privacy" },
// // 			{ value: "edge-computing", label: "Edge Computing Solutions" },
// // 		],
// // 	},
// // 	{
// // 		value: "ai-machine-learning",
// // 		label: "AI & Machine Learning",
// // 		children: [
// // 			{
// // 				value: "predictive-analytics",
// // 				label: "Predictive Analytics & Forecasting",
// // 			},
// // 			{
// // 				value: "nlp-solutions",
// // 				label: "Natural Language Processing Applications",
// // 			},
// // 			{
// // 				value: "computer-vision",
// // 				label: "Computer Vision & Image Recognition",
// // 			},
// // 			{
// // 				value: "chatbots-virtual-assistants",
// // 				label: "Chatbots & Virtual Assistants",
// // 			},
// // 			{
// // 				value: "recommendation-systems",
// // 				label: "AI-Powered Recommendation Systems",
// // 			},
// // 			{
// // 				value: "autonomous-systems",
// // 				label: "Autonomous Systems & Robotics",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "cybersecurity",
// // 		label: "Cybersecurity & Data Protection",
// // 		children: [
// // 			{
// // 				value: "threat-detection",
// // 				label: "Advanced Threat Detection & Prevention",
// // 			},
// // 			{
// // 				value: "encryption-solutions",
// // 				label: "Data Encryption & Secure Communication",
// // 			},
// // 			{
// // 				value: "identity-access-management",
// // 				label: "Identity & Access Management",
// // 			},
// // 			{
// // 				value: "security-compliance",
// // 				label: "Security Compliance & Audit Tools",
// // 			},
// // 			{
// // 				value: "incident-response",
// // 				label: "Incident Response & Forensics",
// // 			},
// // 			{
// // 				value: "blockchain-security",
// // 				label: "Blockchain Security Solutions",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "cloud-infrastructure",
// // 		label: "Cloud & Infrastructure",
// // 		children: [
// // 			{ value: "cloud-migration", label: "Cloud Migration & Strategy" },
// // 			{
// // 				value: "multi-cloud-management",
// // 				label: "Multi-Cloud Management Solutions",
// // 			},
// // 			{
// // 				value: "serverless-architecture",
// // 				label: "Serverless Architecture Implementation",
// // 			},
// // 			{
// // 				value: "container-orchestration",
// // 				label: "Container Orchestration (e.g., Kubernetes)",
// // 			},
// // 			{
// // 				value: "infrastructure-as-code",
// // 				label: "Infrastructure as Code (IaC)",
// // 			},
// // 			{ value: "cloud-security", label: "Cloud Security & Compliance" },
// // 		],
// // 	},
// // 	{
// // 		value: "blockchain-dlt",
// // 		label: "Blockchain & Distributed Ledger Technologies",
// // 		children: [
// // 			{
// // 				value: "smart-contracts",
// // 				label: "Smart Contract Development & Auditing",
// // 			},
// // 			{
// // 				value: "dapps",
// // 				label: "Decentralized Application (DApp) Development",
// // 			},
// // 			{ value: "tokenization", label: "Asset Tokenization Platforms" },
// // 			{
// // 				value: "blockchain-integration",
// // 				label: "Blockchain Integration for Existing Systems",
// // 			},
// // 			{
// // 				value: "consensus-mechanisms",
// // 				label: "Consensus Mechanism Design & Implementation",
// // 			},
// // 			{
// // 				value: "crypto-exchanges",
// // 				label: "Cryptocurrency Exchange Platforms",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "energy-sustainability",
// // 		label: "Energy & Sustainability",
// // 		children: [
// // 			{
// // 				value: "energy-management",
// // 				label: "Smart Grid & Energy Management Systems",
// // 			},
// // 			{
// // 				value: "renewable-energy",
// // 				label: "Renewable Energy Integration Solutions",
// // 			},
// // 			{
// // 				value: "carbon-footprint",
// // 				label: "Carbon Footprint Tracking & Reporting",
// // 			},
// // 			{
// // 				value: "waste-management",
// // 				label: "Waste Management & Recycling Solutions",
// // 			},
// // 			{
// // 				value: "sustainable-supply-chain",
// // 				label: "Sustainable Supply Chain Management",
// // 			},
// // 			{
// // 				value: "environmental-monitoring",
// // 				label: "Environmental Monitoring & Compliance",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "transportation-logistics",
// // 		label: "Transportation & Logistics",
// // 		children: [
// // 			{
// // 				value: "fleet-management",
// // 				label: "Fleet Management & Telematics",
// // 			},
// // 			{
// // 				value: "route-optimization",
// // 				label: "Route Optimization & Planning",
// // 			},
// // 			{
// // 				value: "warehouse-automation",
// // 				label: "Warehouse Management & Automation",
// // 			},
// // 			{
// // 				value: "freight-tracking",
// // 				label: "Real-time Freight Tracking & Visibility",
// // 			},
// // 			{
// // 				value: "last-mile-delivery",
// // 				label: "Last-Mile Delivery Optimization",
// // 			},
// // 			{
// // 				value: "autonomous-vehicles",
// // 				label: "Autonomous Vehicle Technologies",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "agriculture-foodtech",
// // 		label: "Agriculture & FoodTech",
// // 		children: [
// // 			{
// // 				value: "precision-agriculture",
// // 				label: "Precision Agriculture Solutions",
// // 			},
// // 			{
// // 				value: "crop-monitoring",
// // 				label: "Crop Monitoring & Yield Prediction",
// // 			},
// // 			{ value: "smart-irrigation", label: "Smart Irrigation Systems" },
// // 			{
// // 				value: "food-traceability",
// // 				label: "Food Traceability & Safety Solutions",
// // 			},
// // 			{
// // 				value: "vertical-farming",
// // 				label: "Vertical Farming Technologies",
// // 			},
// // 			{
// // 				value: "agri-marketplaces",
// // 				label: "Agricultural Marketplaces & Supply Chain",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "legal-regulatory",
// // 		label: "Legal & Regulatory Technology",
// // 		children: [
// // 			{
// // 				value: "legal-practice-management",
// // 				label: "Legal Practice Management Systems",
// // 			},
// // 			{
// // 				value: "contract-analysis",
// // 				label: "AI-Powered Contract Analysis",
// // 			},
// // 			{
// // 				value: "compliance-management",
// // 				label: "Regulatory Compliance Management",
// // 			},
// // 			{
// // 				value: "ip-management",
// // 				label: "Intellectual Property Management",
// // 			},
// // 			{
// // 				value: "legal-research",
// // 				label: "Legal Research & Analytics Tools",
// // 			},
// // 			{
// // 				value: "online-dispute-resolution",
// // 				label: "Online Dispute Resolution Platforms",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "manufacturing-industry40",
// // 		label: "Manufacturing & Industry 4.0",
// // 		children: [
// // 			{
// // 				value: "smart-manufacturing",
// // 				label: "Smart Manufacturing Systems",
// // 			},
// // 			{
// // 				value: "predictive-maintenance",
// // 				label: "Predictive Maintenance Solutions",
// // 			},
// // 			{ value: "digital-twin", label: "Digital Twin Technology" },
// // 			{
// // 				value: "quality-control-ai",
// // 				label: "AI-Powered Quality Control",
// // 			},
// // 			{
// // 				value: "additive-manufacturing",
// // 				label: "3D Printing & Additive Manufacturing",
// // 			},
// // 			{
// // 				value: "industrial-automation",
// // 				label: "Industrial Automation & Robotics",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "research-development",
// // 		label: "Research & Development",
// // 		children: [
// // 			{
// // 				value: "lab-management",
// // 				label: "Laboratory Information Management Systems (LIMS)",
// // 			},
// // 			{
// // 				value: "research-collaboration",
// // 				label: "Research Collaboration Platforms",
// // 			},
// // 			{
// // 				value: "data-visualization",
// // 				label: "Scientific Data Visualization Tools",
// // 			},
// // 			{
// // 				value: "simulation-modeling",
// // 				label: "Simulation & Modeling Software",
// // 			},
// // 			{
// // 				value: "research-analytics",
// // 				label: "Research Analytics & Insights",
// // 			},
// // 			{
// // 				value: "grant-management",
// // 				label: "Grant Management & Funding Platforms",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "human-resources",
// // 		label: "Human Resources & Workforce Management",
// // 		children: [
// // 			{
// // 				value: "hris",
// // 				label: "Human Resource Information Systems (HRIS)",
// // 			},
// // 			{
// // 				value: "talent-acquisition",
// // 				label: "AI-Powered Talent Acquisition",
// // 			},
// // 			{
// // 				value: "employee-engagement",
// // 				label: "Employee Engagement & Experience Platforms",
// // 			},
// // 			{
// // 				value: "performance-management",
// // 				label: "Performance Management Solutions",
// // 			},
// // 			{
// // 				value: "workforce-analytics",
// // 				label: "Workforce Analytics & Planning",
// // 			},
// // 			{
// // 				value: "learning-development",
// // 				label: "Learning & Development Platforms",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "creative-design",
// // 		label: "Creative & Design Technologies",
// // 		children: [
// // 			{
// // 				value: "design-collaboration",
// // 				label: "Design Collaboration Tools",
// // 			},
// // 			{ value: "3d-modeling", label: "3D Modeling & Rendering Software" },
// // 			{
// // 				value: "generative-design",
// // 				label: "AI-Powered Generative Design",
// // 			},
// // 			{
// // 				value: "motion-graphics",
// // 				label: "Motion Graphics & Animation Tools",
// // 			},
// // 			{
// // 				value: "virtual-production",
// // 				label: "Virtual Production Technologies",
// // 			},
// // 			{
// // 				value: "creative-asset-management",
// // 				label: "Creative Asset Management Systems",
// // 			},
// // 		],
// // 	},
// // 	{
// // 		value: "other",
// // 		label: "Other Specialized Solutions",
// // 		children: [
// // 			{
// // 				value: "custom-development",
// // 				label: "Custom Software Development",
// // 			},
// // 			{
// // 				value: "legacy-modernization",
// // 				label: "Legacy System Modernization",
// // 			},
// // 			{ value: "data-migration", label: "Data Migration & Integration" },
// // 			{ value: "api-development", label: "API Development & Management" },
// // 			{
// // 				value: "technology-consulting",
// // 				label: "Technology Strategy Consulting",
// // 			},
// // 			{
// // 				value: "emerging-tech",
// // 				label: "Emerging Technology Exploration",
// // 			},
// // 		],
// // 	},
// // ];

// // interface FormData {
// // 	name: string;
// // 	email: string;
// // 	phone: string;
// // 	reason: string;
// // 	smsOptIn: boolean;
// // 	emailOptIn: boolean;
// // 	availability: string;
// // 	file?: File;
// // 	privacyPolicyOptIn: boolean;
// // 	termsOfServiceOptIn: boolean;
// // 	promotionalOptIn: boolean;
// // }

// // const AnimatedBox = () => {
// // 	const meshRef = useRef<THREE.Mesh>(null);

// // 	useFrame((state, delta) => {
// // 		if (meshRef.current) {
// // 			meshRef.current.rotation.x += delta;
// // 			meshRef.current.rotation.y += delta * 0.5;
// // 		}
// // 	});

// // 	return (
// // 		<Box ref={meshRef} args={[1, 1, 1]}>
// // 			<meshStandardMaterial color="#6B46C1" />
// // 		</Box>
// // 	);
// // };

// // const AlertsPage: React.FC = () => {
// // 	const smsTooltipContent = `
// //     Receive important alerts, 2FA, customer support, account notifications, event updates, and targeted marketing via SMS.

// //     You can opt out at any time by:
// //     • Texting "STOP-TEXT" to our number
// //     • Updating your preferences in your account settings
// //     `;

// // 	const emailTooltipContent = `
// //     Receive updates, newsletters, and promotional content via email.

// //     You can opt out at any time by:
// //     • Texting "STOP-EMAIL" to our number
// //     • Updating your preferences in your account settings
// //     `;
// // 	const [formData, setFormData] = useState<FormData>({
// // 		name: "",
// // 		email: "",
// // 		phone: "",
// // 		reason: "",
// // 		smsOptIn: false,
// // 		emailOptIn: true,
// // 		availability: "",
// // 		privacyPolicyOptIn: false,
// // 		termsOfServiceOptIn: false,
// // 		promotionalOptIn: false,
// // 	});
// // 	const [file, setFile] = useState<File | null>(null);
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [submitMessage, setSubmitMessage] = useState("");
// // 	const [errors, setErrors] = useState<Partial<FormData>>({});
// // 	// const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
// // 	// const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);

// // 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // 		const { name, value, type, checked } = e.target;
// // 		setFormData((prev) => ({
// // 			...prev,
// // 			[name]: type === "checkbox" ? checked : value,
// // 		}));
// // 		validateField(name, type === "checkbox" ? checked : value);
// // 	};

// // 	const handleSelectChange = (value: string) => {
// // 		setFormData((prev) => ({ ...prev, reason: value }));
// // 		validateField("reason", value);
// // 	};

// // 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // 		if (e.target.files && e.target.files[0]) {
// // 			setFile(e.target.files[0]);
// // 		}
// // 	};

// // 	const validateField = (name: string, value: any) => {
// // 		let error = "";
// // 		switch (name) {
// // 			case "promotionalOptIn":
// // 				error = !value
// // 					? "You must opt-in to receive promotional content and updates"
// // 					: "";
// // 				break;
// // 			case "name":
// // 				error = value.trim() === "" ? "Name is required" : "";
// // 				break;
// // 			case "email":
// // 				error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
// // 					? "Invalid email address"
// // 					: "";
// // 				break;
// // 			case "phone":
// // 				error = !isValidPhoneNumber(value, "US")
// // 					? "Invalid phone number"
// // 					: "";
// // 				break;
// // 			case "reason":
// // 				error = value === "" ? "Please select a reason" : "";
// // 				break;
// // 			case "availability":
// // 				error =
// // 					value === ""
// // 						? "Please select your availability (must be at least 48 hours in advanced)"
// // 						: "";
// // 				break;
// // 		}
// // 		setErrors((prev) => ({ ...prev, [name]: error }));
// // 	};

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		const formErrors = Object.values(errors).filter(
// // 			(error) => error !== ""
// // 		);
// // 		if (formErrors.length > 0) {
// // 			setSubmitMessage("Please correct the errors in the form.");
// // 			return;
// // 		}

// // 		setIsSubmitting(true);
// // 		setSubmitMessage("");

// // 		const formDataToSend = new FormData();
// // 		Object.entries(formData).forEach(([key, value]) => {
// // 			formDataToSend.append(key, value.toString());
// // 		});

// // 		if (file) {
// // 			formDataToSend.append("file", file);
// // 		}

// // 		try {
// // 			const response = await fetch("/api/register-alerts/route", {
// // 				method: "POST",
// // 				body: formDataToSend,
// // 			});

// // 			if (response.ok) {
// // 				setSubmitMessage(
// // 					"Registration successful! Check your phone and email for confirmation messages."
// // 				);
// // 				setFormData({
// // 					name: "",
// // 					email: "",
// // 					phone: "",
// // 					reason: "",
// // 					availability: "",
// // 					smsOptIn: false,
// // 					emailOptIn: true,
// // 					privacyPolicyOptIn: false,
// // 					termsOfServiceOptIn: false,
// // 					promotionalOptIn: false,
// // 				});
// // 				setFile(null);
// // 			} else {
// // 				setSubmitMessage("Registration failed. Please try again.");
// // 			}
// // 		} catch (error) {
// // 			setSubmitMessage("An error occurred. Please try again later.");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	return (
// // 		<>
// // 			<Navigation />
// // 			<motion.div
// // 				initial={{ opacity: 0, y: 20 }}
// // 				animate={{ opacity: 1, y: 0 }}
// // 				transition={{ duration: 0.5 }}
// // 				className="p-8 bg-gradient-to-br from-purple-900 to-indigo-800 text-white min-h-screen"
// // 			>
// // 				<div className="max-w-4xl mx-auto">
// // 					<div className="flex items-center justify-between mb-8">
// // 						<h1 className="text-4xl font-bold">
// // 							Register for Alerts
// // 						</h1>
// // 						<div className="w-32 h-32">
// // 							<Canvas>
// // 								<ambientLight intensity={0.5} />
// // 								<pointLight position={[10, 10, 10]} />
// // 								<AnimatedBox />
// // 								<OrbitControls enableZoom={false} />
// // 							</Canvas>
// // 						</div>
// // 					</div>

// // 					<Form.Root onSubmit={handleSubmit} className="space-y-6">
// // 						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // 							<Form.Field name="name">
// // 								<Form.Label className="block text-sm font-medium mb-1">
// // 									Name
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										title="Enter your full name"
// // 										type="text"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.name}
// // 										onChange={handleInputChange}
// // 										name="name"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="email">
// // 								<Form.Label className="block text-sm font-medium mb-1">
// // 									Email
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										title="Enter your email address"
// // 										type="email"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.email}
// // 										onChange={handleInputChange}
// // 										name="email"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="phone">
// // 								<Form.Label className="block text-sm font-medium mb-1">
// // 									Phone Number
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										title="Enter your phone number"
// // 										type="tel"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.phone}
// // 										onChange={handleInputChange}
// // 										name="phone"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="reason">
// // 								<div className="flex items-center">
// // 									<Form.Label className="block text-sm font-medium mb-1">
// // 										Reason for Platform Use
// // 									</Form.Label>
// // 									<Info
// // 										className="ml-2 text-purple-300 cursor-pointer"
// // 										data-tooltip-id="reason-tooltip"
// // 										data-tooltip-content="This can be changed later if needed."
// // 									/>
// // 								</div>
// // 								<Select.Root onValueChange={handleSelectChange}>
// // 									<Select.Trigger className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center">
// // 										<Select.Value placeholder="Select a reason" />
// // 										<Select.Icon>
// // 											<ChevronDown className="h-4 w-4" />
// // 										</Select.Icon>
// // 									</Select.Trigger>
// // 									<Select.Portal>
// // 										<Select.Content className="bg-purple-900 rounded-md shadow-lg max-h-80 overflow-auto">
// // 											<Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-purple-900 text-white cursor-default">
// // 												<ChevronDown className="rotate-180" />
// // 											</Select.ScrollUpButton>
// // 											<Select.Viewport className="p-2">
// // 												{reasonOptions.map(
// // 													(category) => (
// // 														<Select.Group
// // 															key={category.value}
// // 														>
// // 															<Select.Label className="px-2 py-1 text-sm font-bold text-purple-300">
// // 																{category.label}
// // 															</Select.Label>
// // 															{category.children.map(
// // 																(option) => (
// // 																	<Select.Item
// // 																		key={
// // 																			option.value
// // 																		}
// // 																		value={
// // 																			option.value
// // 																		}
// // 																		className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
// // 																	>
// // 																		<Select.ItemText>
// // 																			{
// // 																				option.label
// // 																			}
// // 																		</Select.ItemText>
// // 																	</Select.Item>
// // 																)
// // 															)}
// // 														</Select.Group>
// // 													)
// // 												)}
// // 											</Select.Viewport>
// // 											<Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-purple-900 text-white cursor-default">
// // 												<ChevronDown />
// // 											</Select.ScrollDownButton>
// // 										</Select.Content>
// // 									</Select.Portal>
// // 								</Select.Root>
// // 							</Form.Field>
// // 						</div>

// // 						<Form.Field name="availability">
// // 							<div className="flex items-center">
// // 								<Form.Label className="block text-sm font-medium mb-1">
// // 									Preferred Availability
// // 								</Form.Label>
// // 								<Info
// // 									className="ml-2 text-purple-300 cursor-pointer"
// // 									data-tooltip-id="availability-tooltip"
// // 									data-tooltip-content="Suggested appointments must be at least 48 hours in advance."
// // 								/>
// // 							</div>
// // 							<Form.Control asChild>
// // 								<input
// // 									title="Select your availability"
// // 									type="datetime-local"
// // 									required
// // 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 									value={formData.availability}
// // 									onChange={handleInputChange}
// // 									name="availability"
// // 									min={new Date(Date.now() + 172800000)
// // 										.toISOString()
// // 										.slice(0, 16)}
// // 								/>
// // 							</Form.Control>
// // 						</Form.Field>
// // 						<Form.Field name="file">
// // 							<div className="flex items-center">
// // 								<Form.Label className="block text-sm font-medium mb-1">
// // 									Upload File (Optional)
// // 								</Form.Label>
// // 								<Info
// // 									className="ml-2 text-purple-300 cursor-pointer"
// // 									data-tooltip-id="file-tooltip"
// // 									data-tooltip-content="Upload relevant documents or files that represent your business assets."
// // 								/>
// // 							</div>
// // 							<Form.Control asChild>
// // 								<input
// // 									title="Upload a file"
// // 									type="file"
// // 									onChange={handleFileChange}
// // 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 								/>
// // 							</Form.Control>
// // 						</Form.Field>

// // 						<div className="flex space-x-6">
// // 							<div className="flex space-x-6">
// // 								<Form.Field
// // 									name="smsOptIn"
// // 									className="flex items-center"
// // 								>
// // 									<Form.Control asChild>
// // 										<input
// // 											title="Opt-in for SMS alerts, 2FA, customer support, account notifications, event updates, and targeted marketing"
// // 											type="checkbox"
// // 											checked={formData.smsOptIn}
// // 											onChange={handleInputChange}
// // 											name="smsOptIn"
// // 											className="mr-2"
// // 										/>
// // 									</Form.Control>
// // 									<Form.Label className="text-sm">
// // 										Opt-in for SMS alerts, 2FA, customer
// // 										support, account notifications, event
// // 										updates, and targeted marketing
// // 									</Form.Label>
// // 									<Info
// // 										className="ml-2 text-purple-300 cursor-pointer"
// // 										data-tooltip-id="sms-optin-tooltip"
// // 									/>
// // 								</Form.Field>

// // 								<Form.Field
// // 									name="promotionalOptIn"
// // 									className="flex items-center"
// // 								>
// // 									<Form.Control asChild>
// // 										<input
// // 											title="Opt-in for promotional content and updates"
// // 											type="checkbox"
// // 											checked={formData.promotionalOptIn}
// // 											onChange={handleInputChange}
// // 											name="promotionalOptIn"
// // 											className="mr-2"
// // 										/>
// // 									</Form.Control>
// // 									<Form.Label className="text-sm">
// // 										By checking this box, you agree to
// // 										receive promotional content and updates
// // 									</Form.Label>
// // 									<Info
// // 										className="ml-2 text-purple-300 cursor-pointer"
// // 										data-tooltip-id="promotional-optin-tooltip"
// // 									/>
// // 								</Form.Field>
// // 							</div>
// // 						</div>

// // 						<div className="space-y-2">
// // 							<Form.Field
// // 								name="privacyPolicyOptIn"
// // 								className="flex items-center"
// // 							>
// // 								<Form.Control asChild>
// // 									<input
// // 										title="Agree to the Privacy Policy"
// // 										type="checkbox"
// // 										checked={formData.privacyPolicyOptIn}
// // 										onChange={handleInputChange}
// // 										name="privacyPolicyOptIn"
// // 										className="mr-2"
// // 									/>
// // 								</Form.Control>
// // 								<Form.Label>
// // 									I agree to the{" "}
// // 									<a
// // 										href="/privacy"
// // 										target="_blank"
// // 										rel="noopener noreferrer"
// // 										className="text-purple-300 hover:text-purple-100 underline"
// // 									>
// // 										Privacy Policy
// // 									</a>
// // 								</Form.Label>
// // 								<Info
// // 									className="ml-2 text-purple-300 cursor-pointer"
// // 									data-tooltip-id="privacy-tooltip"
// // 									data-tooltip-content="Read our Privacy Policy to understand how we handle your data."
// // 								/>
// // 							</Form.Field>

// // 							<Form.Field
// // 								name="termsOfServiceOptIn"
// // 								className="flex items-center"
// // 							>
// // 								<Form.Control asChild>
// // 									<input
// // 										title="Agree to the Terms of Service"
// // 										type="checkbox"
// // 										checked={formData.termsOfServiceOptIn}
// // 										onChange={handleInputChange}
// // 										name="termsOfServiceOptIn"
// // 										className="mr-2"
// // 									/>
// // 								</Form.Control>
// // 								<Form.Label>
// // 									I agree to the{" "}
// // 									<a
// // 										href="/terms-of-service"
// // 										target="_blank"
// // 										rel="noopener noreferrer"
// // 										className="text-purple-300 hover:text-purple-100 underline"
// // 									>
// // 										Terms of Service
// // 									</a>
// // 								</Form.Label>
// // 								<Info
// // 									className="ml-2 text-purple-300 cursor-pointer"
// // 									data-tooltip-id="terms-tooltip"
// // 									data-tooltip-content="Review our Terms of Service before agreeing."
// // 								/>
// // 							</Form.Field>
// // 						</div>

// // 						<Form.Submit asChild>
// // 							<motion.button
// // 								whileHover={{ scale: 1.05 }}
// // 								whileTap={{ scale: 0.95 }}
// // 								className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md shadow-lg flex items-center justify-center"
// // 								disabled={isSubmitting}
// // 								type="submit"
// // 							>
// // 								{isSubmitting ? "Submitting..." : "Register"}
// // 								<Send className="ml-2 h-4 w-4" />
// // 							</motion.button>
// // 						</Form.Submit>
// // 					</Form.Root>

// // 					{submitMessage && (
// // 						<p
// // 							className={`mt-4 text-center text-sm font-medium ${
// // 								submitMessage.includes("successful")
// // 									? "text-green-400"
// // 									: "text-red-400"
// // 							}`}
// // 						>
// // 							{submitMessage}
// // 						</p>
// // 					)}
// // 				</div>
// // 				<Footer />

// // 				<Tooltip
// // 					id="sms-optin-tooltip"
// // 					place="top"
// // 					content={smsTooltipContent}
// // 					className="max-w-xs whitespace-pre-line"
// // 				/>
// // 				<Tooltip
// // 					id="promotional-optin-tooltip"
// // 					place="top"
// // 					content="By checking this box, you agree to receive promotional content and updates."
// // 					className="max-w-xs whitespace-pre-line"
// // 				/>
// // 				<Tooltip id="reason-tooltip" />
// // 				<Tooltip id="availability-tooltip" />
// // 				<Tooltip id="file-tooltip" />
// // 				<Tooltip id="privacy-tooltip" />
// // 				<Tooltip id="terms-tooltip" />
// // 			</motion.div>
// // 		</>
// // 	);
// // };

// // export default AlertsPage;

// // "use client";

// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Send, ChevronDown, Info } from "lucide-react";
// // import * as Form from "@radix-ui/react-form";
// // import * as Select from "@radix-ui/react-select";
// // import { isValidPhoneNumber } from "libphonenumber-js";
// // import { Tooltip } from "react-tooltip";
// // import Navigation from "@/components/site/navigation";
// // import Footer from "@/components/site/footer";
// // import { reasonOptions } from "@/lib/constants"; // Ensure this import path is correct

// // interface FormData {
// // 	businessName: string;
// // 	corporateWebsite: string;
// // 	businessAddress: string;
// // 	businessCity: string;
// // 	businessState: string;
// // 	businessZip: string;
// // 	estimatedMonthlyVolume: string;
// // 	useCaseCategory: string;
// // 	useCaseSummary: string;
// // 	productionMessageSample: string;
// // 	optInWorkflowDescription: string;
// // 	optInImageUrls: string;
// // 	webFormUrl: string;
// // 	name: string;
// // 	email: string;
// // 	phone: string;
// // 	smsOptIn: boolean;
// // 	emailOptIn: boolean;
// // 	promotionalOptIn: boolean;
// // 	availability: string;
// // 	privacyPolicyOptIn: boolean;
// // 	termsOfServiceOptIn: boolean;
// // }

// // const AlertsPage: React.FC = () => {
// // 	const [formData, setFormData] = useState<FormData>({
// // 		businessName: "",
// // 		corporateWebsite: "",
// // 		businessAddress: "",
// // 		businessCity: "",
// // 		businessState: "",
// // 		businessZip: "",
// // 		estimatedMonthlyVolume: "",
// // 		useCaseCategory: "",
// // 		useCaseSummary: "",
// // 		productionMessageSample: "",
// // 		optInWorkflowDescription: "",
// // 		optInImageUrls: "",
// // 		webFormUrl: "",
// // 		name: "",
// // 		email: "",
// // 		phone: "",
// // 		smsOptIn: false,
// // 		emailOptIn: true,
// // 		promotionalOptIn: false,
// // 		availability: "",
// // 		privacyPolicyOptIn: false,
// // 		termsOfServiceOptIn: false,
// // 	});

// // 	const [file, setFile] = useState<File | null>(null);
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [submitMessage, setSubmitMessage] = useState("");
// // 	const [errors, setErrors] = useState<Partial<FormData>>({});

// // 	const handleInputChange = (
// // 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // 	) => {
// // 		const { name, value, type } = e.target;
// // 		const checked = (e.target as HTMLInputElement).checked;
// // 		setFormData((prev) => ({
// // 			...prev,
// // 			[name]: type === "checkbox" ? checked : value,
// // 		}));
// // 		validateField(name, type === "checkbox" ? checked : value);
// // 	};

// // 	const handleSelectChange = (name: string, value: string) => {
// // 		setFormData((prev) => ({ ...prev, [name]: value }));
// // 		validateField(name, value);
// // 	};

// // 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // 		if (e.target.files && e.target.files[0]) {
// // 			setFile(e.target.files[0]);
// // 		}
// // 	};

// // 	const validateField = (name: string, value: any) => {
// // 		let error = "";
// // 		switch (name) {
// // 			case "businessName":
// // 			case "corporateWebsite":
// // 			case "businessAddress":
// // 			case "businessCity":
// // 			case "businessState":
// // 			case "businessZip":
// // 			case "estimatedMonthlyVolume":
// // 			case "useCaseCategory":
// // 			case "useCaseSummary":
// // 			case "productionMessageSample":
// // 			case "optInWorkflowDescription":
// // 			case "optInImageUrls":
// // 			case "webFormUrl":
// // 				error = value.trim() === "" ? `${name} is required` : "";
// // 				break;
// // 			case "email":
// // 				error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
// // 					? "Invalid email address"
// // 					: "";
// // 				break;
// // 			case "phone":
// // 				error = !isValidPhoneNumber(value, "US")
// // 					? "Invalid phone number"
// // 					: "";
// // 				break;
// // 		}
// // 		setErrors((prev) => ({ ...prev, [name]: error }));
// // 	};

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		const formErrors = Object.values(errors).filter(
// // 			(error) => error !== ""
// // 		);
// // 		if (formErrors.length > 0) {
// // 			setSubmitMessage("Please correct the errors in the form.");
// // 			return;
// // 		}

// // 		setIsSubmitting(true);
// // 		setSubmitMessage("");

// // 		const formDataToSend = new FormData();
// // 		Object.entries(formData).forEach(([key, value]) => {
// // 			formDataToSend.append(key, value.toString());
// // 		});

// // 		if (file) {
// // 			formDataToSend.append("file", file);
// // 		}

// // 		try {
// // 			const response = await fetch("/api/register-alerts/route", {
// // 				method: "POST",
// // 				body: formDataToSend,
// // 			});

// // 			if (response.ok) {
// // 				setSubmitMessage(
// // 					"Registration successful! Check your phone and email for confirmation messages."
// // 				);
// // 				setFormData({
// // 					businessName: "",
// // 					corporateWebsite: "",
// // 					businessAddress: "",
// // 					businessCity: "",
// // 					businessState: "",
// // 					businessZip: "",
// // 					estimatedMonthlyVolume: "",
// // 					useCaseCategory: "",
// // 					useCaseSummary: "",
// // 					productionMessageSample: "",
// // 					optInWorkflowDescription: "",
// // 					optInImageUrls: "",
// // 					webFormUrl: "",
// // 					name: "",
// // 					email: "",
// // 					phone: "",
// // 					smsOptIn: false,
// // 					emailOptIn: true,
// // 					promotionalOptIn: false,
// // 					availability: "",
// // 					privacyPolicyOptIn: false,
// // 					termsOfServiceOptIn: false,
// // 				});
// // 				setFile(null);
// // 			} else {
// // 				setSubmitMessage("Registration failed. Please try again.");
// // 			}
// // 		} catch (error) {
// // 			setSubmitMessage("An error occurred. Please try again later.");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	return (
// // 		<>
// // 			<Navigation />
// // 			<motion.div
// // 				initial={{ opacity: 0, y: 20 }}
// // 				animate={{ opacity: 1, y: 0 }}
// // 				transition={{ duration: 0.5 }}
// // 				className="p-8 bg-gradient-to-br from-purple-900 to-indigo-800 text-white min-h-screen"
// // 			>
// // 				<div className="max-w-4xl mx-auto">
// // 					<div className="flex items-center justify-between mb-8">
// // 						<h1 className="text-4xl font-bold">
// // 							Register for Alerts
// // 						</h1>
// // 					</div>

// // 					<Form.Root onSubmit={handleSubmit} className="space-y-6">
// // 						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // 							<Form.Field name="businessName">
// // 								<Form.Label
// // 									className="block text-sm font-medium mb-1"
// // 									htmlFor="businessName"
// // 								>
// // 									Business Name
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										type="text"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.businessName}
// // 										onChange={handleInputChange}
// // 										name="businessName"
// // 										id="businessName"
// // 										title="Enter the business name"
// // 										placeholder="Business Name"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="corporateWebsite">
// // 								<Form.Label
// // 									className="block text-sm font-medium mb-1"
// // 									htmlFor="corporateWebsite"
// // 								>
// // 									Corporate Website
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										type="url"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.corporateWebsite}
// // 										onChange={handleInputChange}
// // 										name="corporateWebsite"
// // 										id="corporateWebsite"
// // 										title="Enter the corporate website"
// // 										placeholder="Corporate Website"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="businessAddress">
// // 								<Form.Label
// // 									className="block text-sm font-medium mb-1"
// // 									htmlFor="businessAddress"
// // 								>
// // 									Business Address
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										type="text"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.businessAddress}
// // 										onChange={handleInputChange}
// // 										name="businessAddress"
// // 										id="businessAddress"
// // 										title="Enter the business address"
// // 										placeholder="Business Address"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="businessCity">
// // 								<Form.Label
// // 									className="block text-sm font-medium mb-1"
// // 									htmlFor="businessCity"
// // 								>
// // 									City
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										type="text"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.businessCity}
// // 										onChange={handleInputChange}
// // 										name="businessCity"
// // 										id="businessCity"
// // 										title="Enter the business city"
// // 										placeholder="City"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="businessState">
// // 								<Form.Label
// // 									className="block text-sm font-medium mb-1"
// // 									htmlFor="businessState"
// // 								>
// // 									State
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										type="text"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.businessState}
// // 										onChange={handleInputChange}
// // 										name="businessState"
// // 										id="businessState"
// // 										title="Enter the business state"
// // 										placeholder="State"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>

// // 							<Form.Field name="businessZip">
// // 								<Form.Label
// // 									className="block text-sm font-medium mb-1"
// // 									htmlFor="businessZip"
// // 								>
// // 									ZIP Code
// // 								</Form.Label>
// // 								<Form.Control asChild>
// // 									<input
// // 										type="text"
// // 										required
// // 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 										value={formData.businessZip}
// // 										onChange={handleInputChange}
// // 										name="businessZip"
// // 										id="businessZip"
// // 										title="Enter the business ZIP code"
// // 										placeholder="ZIP Code"
// // 									/>
// // 								</Form.Control>
// // 							</Form.Field>
// // 						</div>

// // 						<Form.Field name="estimatedMonthlyVolume">
// // 							<Form.Label
// // 								className="block text-sm font-medium mb-1"
// // 								htmlFor="estimatedMonthlyVolume"
// // 							>
// // 								Estimated Monthly Volume
// // 							</Form.Label>
// // 							<Select.Root
// // 								onValueChange={(value) =>
// // 									handleSelectChange(
// // 										"estimatedMonthlyVolume",
// // 										value
// // 									)
// // 								}
// // 							>
// // 								<Select.Trigger className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center">
// // 									<Select.Value placeholder="Select volume" />
// // 									<Select.Icon>
// // 										<ChevronDown className="h-4 w-4" />
// // 									</Select.Icon>
// // 								</Select.Trigger>
// // 								<Select.Portal>
// // 									<Select.Content className="bg-purple-900 rounded-md shadow-lg">
// // 										<Select.Viewport className="p-2">
// // 											{[
// // 												"10",
// // 												"100",
// // 												"1000",
// // 												"10000",
// // 												"100000",
// // 												"250000",
// // 												"500000",
// // 												"750000",
// // 												"1000000",
// // 												"5000000",
// // 												"10000000+",
// // 											].map((volume) => (
// // 												<Select.Item
// // 													key={volume}
// // 													value={volume}
// // 													className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
// // 												>
// // 													<Select.ItemText>
// // 														{volume}
// // 													</Select.ItemText>
// // 												</Select.Item>
// // 											))}
// // 										</Select.Viewport>
// // 									</Select.Content>
// // 								</Select.Portal>
// // 							</Select.Root>
// // 						</Form.Field>

// // 						<Form.Field name="phone">
// // 							<Form.Label
// // 								className="block text-sm font-medium mb-1"
// // 								htmlFor="phone"
// // 							>
// // 								Phone Number
// // 							</Form.Label>
// // 							<Form.Control asChild>
// // 								<input
// // 									type="tel"
// // 									required
// // 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 									value={formData.phone}
// // 									onChange={handleInputChange}
// // 									name="phone"
// // 									id="phone"
// // 									title="Enter your phone number"
// // 									placeholder="Phone Number"
// // 								/>
// // 							</Form.Control>
// // 						</Form.Field>

// // 						<div className="flex flex-col space-y-2">
// // 							<div className="flex items-center space-x-2">
// // 								<input
// // 									title="Opt-in for SMS alerts, 2FA, customer support, account notifications, event updates, and targeted marketing"
// // 									type="checkbox"
// // 									checked={formData.smsOptIn}
// // 									onChange={handleInputChange}
// // 									name="smsOptIn"
// // 									id="smsOptIn"
// // 								/>
// // 								<Form.Label
// // 									className="text-sm"
// // 									htmlFor="smsOptIn"
// // 								>
// // 									Opt-in for SMS alerts, 2FA, customer
// // 									support, account notifications, event
// // 									updates, and targeted marketing
// // 								</Form.Label>
// // 								<Tooltip id="smsOptIn" place="top">
// // 									<Info
// // 										className="h-4 w-4 text-gray-400"
// // 										data-tip="Opt-in for SMS alerts, 2FA, customer support, account notifications, event updates, and targeted marketing"
// // 									/>
// // 								</Tooltip>
// // 							</div>

// // 							<div className="flex items-center space-x-2">
// // 								<input
// // 									title="Opt-in for promotional content and updates"
// // 									type="checkbox"
// // 									checked={formData.emailOptIn}
// // 									onChange={handleInputChange}
// // 									name="emailOptIn"
// // 									id="emailOptIn"
// // 								/>
// // 								<Form.Label
// // 									className="text-sm"
// // 									htmlFor="emailOptIn"
// // 								>
// // 									By checking this box, you agree to receive
// // 									promotional content and updates
// // 								</Form.Label>
// // 								<Tooltip id="emailOptIn" place="top">
// // 									<Info
// // 										className="h-4 w-4 text-gray-400"
// // 										data-tip="Receive promotional content and updates"
// // 									/>
// // 								</Tooltip>
// // 							</div>

// // 							<div className="flex items-center space-x-2">
// // 								<input
// // 									title="Receive marketing communications"
// // 									type="checkbox"
// // 									checked={formData.promotionalOptIn}
// // 									onChange={handleInputChange}
// // 									name="promotionalOptIn"
// // 									id="promotionalOptIn"
// // 								/>
// // 								<Form.Label
// // 									className="text-sm"
// // 									htmlFor="promotionalOptIn"
// // 								>
// // 									By checking this box, you agree to receive
// // 									marketing communications
// // 								</Form.Label>
// // 								<Tooltip id="promotionalOptIn" place="top">
// // 									<Info
// // 										className="h-4 w-4 text-gray-400"
// // 										data-tip="Receive marketing communications"
// // 									/>
// // 								</Tooltip>
// // 							</div>
// // 						</div>

// // 						<Form.Field name="availability">
// // 							<Form.Label
// // 								className="block text-sm font-medium mb-1"
// // 								htmlFor="availability"
// // 							>
// // 								Preferred Availability
// // 							</Form.Label>
// // 							<Form.Control asChild>
// // 								<input
// // 									type="text"
// // 									required
// // 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 									value={formData.availability}
// // 									onChange={handleInputChange}
// // 									name="availability"
// // 									id="availability"
// // 									title="Select your availability"
// // 									placeholder="mm/dd/yyyy, --:--"
// // 								/>
// // 							</Form.Control>
// // 							<Tooltip id="availability" place="top">
// // 								<Info
// // 									className="h-4 w-4 text-gray-400"
// // 									data-tip="Select your availability"
// // 								/>
// // 							</Tooltip>
// // 						</Form.Field>

// // 						<Form.Field name="file">
// // 							<Form.Label
// // 								className="block text-sm font-medium mb-1"
// // 								htmlFor="file"
// // 							>
// // 								Upload File (Optional)
// // 							</Form.Label>
// // 							<Form.Control asChild>
// // 								<input
// // 									title="Upload a file"
// // 									type="file"
// // 									onChange={handleFileChange}
// // 									className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// // 									name="file"
// // 									id="file"
// // 								/>
// // 							</Form.Control>
// // 							<Tooltip id="file" place="top">
// // 								<Info
// // 									className="h-4 w-4 text-gray-400"
// // 									data-tip="Upload a file if applicable"
// // 								/>
// // 							</Tooltip>
// // 						</Form.Field>

// // 						<div className="flex flex-col space-y-2">
// // 							<div className="flex items-center space-x-2">
// // 								<input
// // 									title="Agree to the Privacy Policy"
// // 									type="checkbox"
// // 									checked={formData.privacyPolicyOptIn}
// // 									onChange={handleInputChange}
// // 									name="privacyPolicyOptIn"
// // 									id="privacyPolicyOptIn"
// // 								/>
// // 								<Form.Label
// // 									className="text-sm"
// // 									htmlFor="privacyPolicyOptIn"
// // 								>
// // 									I agree to the Privacy Policy
// // 								</Form.Label>
// // 								<Tooltip id="privacyPolicyOptIn" place="top">
// // 									<Info
// // 										className="h-4 w-4 text-gray-400"
// // 										data-tip="Agree to the Privacy Policy"
// // 									/>
// // 								</Tooltip>
// // 							</div>

// // 							<div className="flex items-center space-x-2">
// // 								<input
// // 									title="Agree to the Terms of Service"
// // 									type="checkbox"
// // 									checked={formData.termsOfServiceOptIn}
// // 									onChange={handleInputChange}
// // 									name="termsOfServiceOptIn"
// // 									id="termsOfServiceOptIn"
// // 								/>
// // 								<Form.Label
// // 									className="text-sm"
// // 									htmlFor="termsOfServiceOptIn"
// // 								>
// // 									I agree to the Terms of Service
// // 								</Form.Label>
// // 								<Tooltip id="termsOfServiceOptIn" place="top">
// // 									<Info
// // 										className="h-4 w-4 text-gray-400"
// // 										data-tip="Agree to the Terms of Service"
// // 									/>
// // 								</Tooltip>
// // 							</div>
// // 						</div>

// // 						<button
// // 							type="submit"
// // 							className="w-full py-3 bg-purple-700 hover:bg-purple-600 rounded-md text-white font-medium"
// // 							disabled={isSubmitting}
// // 						>
// // 							Register{" "}
// // 							<Send className="inline-block ml-2 h-4 w-4" />
// // 						</button>
// // 						{submitMessage && (
// // 							<p className="mt-4 text-center text-red-500">
// // 								{submitMessage}
// // 							</p>
// // 						)}
// // 					</Form.Root>
// // 				</div>
// // 			</motion.div>
// // 			<Footer companyName="PalmaViewLLC DBA NexusConjure" />
// // 		</>
// // 	);
// // };

// // export default AlertsPage;

// "use client";

// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { Send, ChevronDown, Info } from "lucide-react";
// import * as Form from "@radix-ui/react-form";
// import * as Select from "@radix-ui/react-select";
// import { isValidPhoneNumber } from "libphonenumber-js";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Box, OrbitControls } from "@react-three/drei";
// import { Tooltip } from "react-tooltip";
// import * as THREE from "three";
// import Navigation from "@/components/site/navigation";
// import Footer from "@/components/site/footer";
// import { reasonOptions } from "@/lib/constants";

// interface FormData {
//     businessName: string;
//     corporateWebsite: string;
//     businessAddress: string;
//     businessCity: string;
//     businessState: string;
//     businessZip: string;
//     businessContactFirstName: string;
//     businessContactLastName: string;
//     // businessContactEmail: string;
//     // businessContactPhone: string;
//     estimatedMonthlyVolume: string;
//     useCaseCategory: string;
//     useCaseSummary: string;
//     productionMessageSample: string;
//     optInWorkflowDescription: string;
//     optInImageUrls: string;
//     webFormUrl: string;
//     name: string;
//     email: string;
//     phone: string;
//     reason: string;
//     smsOptIn: boolean;
//     emailOptIn: boolean;
//     availability: string;
//     privacyPolicyOptIn: boolean;
//     termsOfServiceOptIn: boolean;
//     promotionalOptIn: boolean;
//     marketingOptIn: boolean;
// }

// const AlertsPage: React.FC = () => {
//     const [formData, setFormData] = useState<FormData>({
//         businessName: "",
//         corporateWebsite: "",
//         businessAddress: "",
//         businessCity: "",
//         businessState: "",
//         businessZip: "",
//         businessContactFirstName: "",
//         businessContactLastName: "",
//         // businessContactEmail: "",
//         // businessContactPhone: "",
//         estimatedMonthlyVolume: "",
//         useCaseCategory: "",
//         useCaseSummary: "",
//         productionMessageSample: "",
//         optInWorkflowDescription: "",
//         optInImageUrls: "",
//         webFormUrl: "",
//         name: "",
//         email: "",
//         phone: "",
//         reason: "",
//         smsOptIn: false,
//         emailOptIn: true,
//         availability: "",
//         privacyPolicyOptIn: false,
//         termsOfServiceOptIn: false,
//         promotionalOptIn: false,
//         marketingOptIn: false,
//     });

//     const [file, setFile] = useState<File | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitMessage, setSubmitMessage] = useState("");
//     const [errors, setErrors] = useState<Partial<FormData>>({});

//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value, type } = e.target;
//         const checked = (e.target as HTMLInputElement).checked;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" ? checked : value,
//         }));
//         validateField(name, type === "checkbox" ? checked : value);
//     };

//     const handleSelectChange = (name: string, value: string) => {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         validateField(name, value);
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setFile(e.target.files[0]);
//         }
//     };

//     const validateField = (name: string, value: any) => {
//         let error = "";
//         switch (name) {
//             case "businessName":
//             case "corporateWebsite":
//             case "businessAddress":
//             case "businessCity":
//             case "businessState":
//             case "businessZip":
//             case "businessContactFirstName":
//             case "businessContactLastName":
//             // case "businessContactEmail":
//             // case "businessContactPhone":
//             case "estimatedMonthlyVolume":
//             case "useCaseCategory":
//             case "useCaseSummary":
//             case "productionMessageSample":
//             case "optInWorkflowDescription":
//             case "optInImageUrls":
//             case "webFormUrl":
//                 error = value.trim() === "" ? `${name} is required` : "";
//                 break;
//             case "email":
//             case "businessContactEmail":
//                 error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//                     ? "Invalid email address"
//                     : "";
//                 break;
//             case "phone":
//             case "businessContactPhone":
//                 error = !isValidPhoneNumber(value, "US")
//                     ? "Invalid phone number"
//                     : "";
//                 break;
//         }
//         setErrors((prev) => ({ ...prev, [name]: error }));
//     };

//     const AnimatedBox = () => {
//         const meshRef = useRef<THREE.Mesh>(null);

//         useFrame((state, delta) => {
//             if (meshRef.current) {
//                 meshRef.current.rotation.x += delta;
//                 meshRef.current.rotation.y += delta * 0.5;
//             }
//         });

//         return (
//             <Box ref={meshRef} args={[1, 1, 1]}>
//                 <meshStandardMaterial color="#6B46C1" />
//             </Box>
//         );
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const formErrors = Object.values(errors).filter(
//             (error) => error !== ""
//         );
//         if (formErrors.length > 0) {
//             setSubmitMessage("Please correct the errors in the form.");
//             return;
//         }

//         setIsSubmitting(true);
//         setSubmitMessage("");

//         const formDataToSend = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             formDataToSend.append(key, value.toString());
//         });

//         if (file) {
//             formDataToSend.append("file", file);
//         }

//         try {
//             const response = await fetch("/api/register-alerts/route", {
//                 method: "POST",
//                 body: formDataToSend,
//             });

//             if (response.ok) {
//                 setSubmitMessage(
//                     "Registration successful! Check your phone and email for confirmation messages."
//                 );
//                 setFormData({
//                     businessName: "",
//                     corporateWebsite: "",
//                     businessAddress: "",
//                     businessCity: "",
//                     businessState: "",
//                     businessZip: "",
//                     businessContactFirstName: "",
//                     businessContactLastName: "",
//                     // businessContactEmail: "",
//                     // businessContactPhone: "",
//                     estimatedMonthlyVolume: "",
//                     useCaseCategory: "",
//                     useCaseSummary: "",
//                     productionMessageSample: "",
//                     optInWorkflowDescription: "",
//                     optInImageUrls: "",
//                     webFormUrl: "",
//                     name: "",
//                     email: "",
//                     phone: "",
//                     reason: "",
//                     smsOptIn: false,
//                     emailOptIn: true,
//                     availability: "",
//                     privacyPolicyOptIn: false,
//                     termsOfServiceOptIn: false,
//                     promotionalOptIn: false,
//                     marketingOptIn: false,
//                 });
//                 setFile(null);
//             } else {
//                 setSubmitMessage("Registration failed. Please try again.");
//             }
//         } catch (error) {
//             setSubmitMessage("An error occurred. Please try again later.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <>
//             <Navigation />
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-gradient-to-br from-purple-900 to-indigo-800 text-white min-h-screen"
//             >
//                 <div className="max-w-4xl mx-auto py-4">
//                     <div className="flex items-center justify-between mb-8">
//                         <h1 className="text-4xl font-bold">
//                             Register for Alerts
//                         </h1>
//                         <div className="w-32 h-32">
//                             <Canvas>
//                                 <ambientLight intensity={0.5} />
//                                 <pointLight position={[10, 10, 10]} />
//                                 <AnimatedBox />
//                                 <OrbitControls enableZoom={false} />
//                             </Canvas>
//                         </div>
//                     </div>

//                     <Form.Root onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <Form.Field name="businessName">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="businessName"
//                                 >
//                                     Business Name
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.businessName}
//                                         onChange={handleInputChange}
//                                         name="businessName"
//                                         id="businessName"
//                                         title="Enter the business name"
//                                         placeholder="Business Name"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="corporateWebsite">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="corporateWebsite"
//                                 >
//                                     Corporate Website
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="url"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.corporateWebsite}
//                                         onChange={handleInputChange}
//                                         name="corporateWebsite"
//                                         id="corporateWebsite"
//                                         title="Enter the corporate website"
//                                         placeholder="Corporate Website"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="businessAddress">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="businessAddress"
//                                 >
//                                     Business Address
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.businessAddress}
//                                         onChange={handleInputChange}
//                                         name="businessAddress"
//                                         id="businessAddress"
//                                         title="Enter the business address"
//                                         placeholder="Business Address"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="businessCity">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="businessCity"
//                                 >
//                                     City
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.businessCity}
//                                         onChange={handleInputChange}
//                                         name="businessCity"
//                                         id="businessCity"
//                                         title="Enter the city"
//                                         placeholder="City"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="businessState">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="businessState"
//                                 >
//                                     State
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.businessState}
//                                         onChange={handleInputChange}
//                                         name="businessState"
//                                         id="businessState"
//                                         title="Enter the state"
//                                         placeholder="State"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="businessZip">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="businessZip"
//                                 >
//                                     ZIP Code
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.businessZip}
//                                         onChange={handleInputChange}
//                                         name="businessZip"
//                                         id="businessZip"
//                                         title="Enter the ZIP code"
//                                         placeholder="ZIP Code"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="businessContactFirstName">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="businessContactFirstName"
//                                 >
//                                     Contact First Name
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={
//                                             formData.businessContactFirstName
//                                         }
//                                         onChange={handleInputChange}
//                                         name="businessContactFirstName"
//                                         id="businessContactFirstName"
//                                         title="Enter the contact's first name"
//                                         placeholder="First Name"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="businessContactLastName">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="businessContactLastName"
//                                 >
//                                     Contact Last Name
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.businessContactLastName}
//                                         onChange={handleInputChange}
//                                         name="businessContactLastName"
//                                         id="businessContactLastName"
//                                         title="Enter the contact's last name"
//                                         placeholder="Last Name"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             {/* <Form.Field name="businessContactEmail">
// 								<Form.Label
// 									className="block text-sm font-medium mb-1"
// 									htmlFor="businessContactEmail"
// 								>
// 									Contact Email
// 								</Form.Label>
// 								<Form.Control asChild>
// 									<input
// 										type="email"
// 										required
// 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// 										value={formData.businessContactEmail}
// 										onChange={handleInputChange}
// 										name="businessContactEmail"
// 										id="businessContactEmail"
// 										title="Enter the contact's email address"
// 										placeholder="Email Address"
// 									/>
// 								</Form.Control>
// 							</Form.Field>

// 							<Form.Field name="businessContactPhone">
// 								<Form.Label
// 									className="block text-sm font-medium mb-1"
// 									htmlFor="businessContactPhone"
// 								>
// 									Contact Phone
// 								</Form.Label>
// 								<Form.Control asChild>
// 									<input
// 										type="tel"
// 										required
// 										className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
// 										value={formData.businessContactPhone}
// 										onChange={handleInputChange}
// 										name="businessContactPhone"
// 										id="businessContactPhone"
// 										title="Enter the contact's phone number"
// 										placeholder="Phone Number"
// 									/>
// 								</Form.Control>
// 							</Form.Field> */}
//                         </div>

//                         <Form.Field name="estimatedMonthlyVolume">
//                             <Form.Label
//                                 className="block text-sm font-medium mb-1"
//                                 htmlFor="estimatedMonthlyVolume"
//                             >
//                                 Estimated Monthly Volume
//                             </Form.Label>
//                             <Select.Root
//                                 onValueChange={(value) =>
//                                     handleSelectChange(
//                                         "estimatedMonthlyVolume",
//                                         value
//                                     )
//                                 }
//                             >
//                                 <Select.Trigger
//                                     className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
//                                     id="estimatedMonthlyVolume"
//                                 >
//                                     <Select.Value placeholder="Select volume" />
//                                     <Select.Icon>
//                                         <ChevronDown className="h-4 w-4" />
//                                     </Select.Icon>
//                                 </Select.Trigger>
//                                 <Select.Portal>
//                                     <Select.Content className="bg-purple-900 rounded-md shadow-lg">
//                                         <Select.Viewport className="p-2">
//                                             {[
//                                                 "10",
//                                                 "100",
//                                                 "1000",
//                                                 "10000",
//                                                 "100000",
//                                                 "250000",
//                                                 "500000",
//                                                 "750000",
//                                                 "1000000",
//                                                 "5000000",
//                                                 "10000000+",
//                                             ].map((volume) => (
//                                                 <Select.Item
//                                                     key={volume}
//                                                     value={volume}
//                                                     className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
//                                                 >
//                                                     <Select.ItemText>
//                                                         {volume}
//                                                     </Select.ItemText>
//                                                 </Select.Item>
//                                             ))}
//                                         </Select.Viewport>
//                                     </Select.Content>
//                                 </Select.Portal>
//                             </Select.Root>
//                         </Form.Field>

//                         <Form.Field name="useCaseCategory">
//                             <Form.Label
//                                 className="block text-sm font-medium mb-1"
//                                 htmlFor="useCaseCategory"
//                             >
//                                 Use Case Category
//                             </Form.Label>
//                             <Select.Root
//                                 onValueChange={(value) =>
//                                     handleSelectChange("useCaseCategory", value)
//                                 }
//                             >
//                                 <Select.Trigger
//                                     className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
//                                     id="useCaseCategory"
//                                 >
//                                     <Select.Value placeholder="Select use case" />
//                                     <Select.Icon>
//                                         <ChevronDown className="h-4 w-4" />
//                                     </Select.Icon>
//                                 </Select.Trigger>
//                                 <Select.Portal>
//                                     <Select.Content className="bg-purple-900 rounded-md shadow-lg">
//                                         <Select.Viewport className="p-2">
//                                             {reasonOptions.map((category) => (
//                                                 <Select.Group
//                                                     key={category.value}
//                                                 >
//                                                     <Select.Label className="px-2 py-1 text-sm font-bold text-purple-300">
//                                                         {category.label}
//                                                     </Select.Label>
//                                                     {category.children.map(
//                                                         (option) => (
//                                                             <Select.Item
//                                                                 key={
//                                                                     option.value
//                                                                 }
//                                                                 value={
//                                                                     option.value
//                                                                 }
//                                                                 className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
//                                                             >
//                                                                 <Select.ItemText>
//                                                                     {
//                                                                         option.label
//                                                                     }
//                                                                 </Select.ItemText>
//                                                             </Select.Item>
//                                                         )
//                                                     )}
//                                                 </Select.Group>
//                                             ))}
//                                         </Select.Viewport>
//                                     </Select.Content>
//                                 </Select.Portal>
//                             </Select.Root>
//                         </Form.Field>

//                         <Form.Field name="useCaseSummary">
//                             <Form.Label
//                                 className="block text-sm font-medium mb-1"
//                                 htmlFor="useCaseSummary"
//                             >
//                                 Use Case Summary
//                             </Form.Label>
//                             <Form.Control asChild>
//                                 <textarea
//                                     required
//                                     className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                     value={formData.useCaseSummary}
//                                     onChange={handleInputChange}
//                                     name="useCaseSummary"
//                                     id="useCaseSummary"
//                                     title="Provide a summary of the use case"
//                                     placeholder="Use Case Summary"
//                                 />
//                             </Form.Control>
//                         </Form.Field>

//                         <Form.Field name="productionMessageSample">
//                             <Form.Label
//                                 className="block text-sm font-medium mb-1"
//                                 htmlFor="productionMessageSample"
//                             >
//                                 Production Message Sample
//                             </Form.Label>
//                             <Form.Control asChild>
//                                 <textarea
//                                     required
//                                     className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                     value={formData.productionMessageSample}
//                                     onChange={handleInputChange}
//                                     name="productionMessageSample"
//                                     id="productionMessageSample"
//                                     title="Provide a sample production message"
//                                     placeholder="Sample Message"
//                                 />
//                             </Form.Control>
//                         </Form.Field>

//                         <Form.Field name="optInWorkflowDescription">
//                             <Form.Label
//                                 className="block text-sm font-medium mb-1"
//                                 htmlFor="optInWorkflowDescription"
//                             >
//                                 Opt-In Workflow Description
//                             </Form.Label>
//                             <Form.Control asChild>
//                                 <textarea
//                                     required
//                                     className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                     value={formData.optInWorkflowDescription}
//                                     onChange={handleInputChange}
//                                     name="optInWorkflowDescription"
//                                     id="optInWorkflowDescription"
//                                     title="Describe the opt-in workflow"
//                                     placeholder="Opt-In Workflow Description"
//                                 />
//                             </Form.Control>
//                         </Form.Field>

//                         <Form.Field name="optInImageUrls">
//                             <Form.Label
//                                 className="block text-sm font-medium mb-1"
//                                 htmlFor="optInImageUrls"
//                             >
//                                 Opt-In Image URLs
//                             </Form.Label>
//                             <Form.Control asChild>
//                                 <input
//                                     type="text"
//                                     required
//                                     className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                     value={formData.optInImageUrls}
//                                     onChange={handleInputChange}
//                                     name="optInImageUrls"
//                                     id="optInImageUrls"
//                                     title="Provide the URLs for opt-in images"
//                                     placeholder="Opt-In Image URLs"
//                                 />
//                             </Form.Control>
//                         </Form.Field>

//                         <Form.Field name="webFormUrl">
//                             <Form.Label
//                                 className="block text-sm font-medium mb-1"
//                                 htmlFor="webFormUrl"
//                             >
//                                 Web Form URL
//                             </Form.Label>
//                             <Form.Control asChild>
//                                 <input
//                                     type="url"
//                                     required
//                                     className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                     value={formData.webFormUrl}
//                                     onChange={handleInputChange}
//                                     name="webFormUrl"
//                                     id="webFormUrl"
//                                     title="Provide the URL for the web form"
//                                     placeholder="Web Form URL"
//                                 />
//                             </Form.Control>
//                         </Form.Field>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <Form.Field name="name">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="name"
//                                 >
//                                     Name
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="text"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.name}
//                                         onChange={handleInputChange}
//                                         name="name"
//                                         id="name"
//                                         title="Enter your name"
//                                         placeholder="Name"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="email">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="email"
//                                 >
//                                     Email
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="email"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.email}
//                                         onChange={handleInputChange}
//                                         name="email"
//                                         id="email"
//                                         title="Enter your email address"
//                                         placeholder="Email"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="phone">
//                                 <Form.Label
//                                     className="block text-sm font-medium mb-1"
//                                     htmlFor="phone"
//                                 >
//                                     Phone Number
//                                 </Form.Label>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="tel"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.phone}
//                                         onChange={handleInputChange}
//                                         name="phone"
//                                         id="phone"
//                                         title="Enter your phone number"
//                                         placeholder="Phone Number"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>
//                         </div>

//                         <div className="space-y-2">
//                             <div className="flex items-center space-x-6">
//                                 <Form.Field
//                                     name="smsOptIn"
//                                     className="flex items-center justify-center gap-2"
//                                 >
//                                     <div className="flex items-center justify-center flex-col gap-2">
//                                         <Info
//                                             className="text-purple-300 cursor-pointer size-[0.85rem]"
//                                             data-tooltip-id="sms-optin-tooltip"
//                                         />
//                                         <Form.Control asChild>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={formData.smsOptIn}
//                                                 onChange={handleInputChange}
//                                                 name="smsOptIn"
//                                                 id="smsOptIn"
//                                                 title="Opt-in for SMS alerts"
//                                             />
//                                         </Form.Control>
//                                     </div>
//                                     <Form.Label className="text-sm">
//                                         Opt-in for SMS alerts, 2FA, customer
//                                         support, account notifications, and
//                                         event updates
//                                     </Form.Label>
//                                 </Form.Field>

//                                 <Form.Field
//                                     name="promotionalOptIn"
//                                     className="flex items-center justify-center gap-2"
//                                 >
//                                     <div className="flex items-center justify-center flex-col gap-2">
//                                         <Info
//                                             className="text-purple-300 cursor-pointer size-[0.85rem]"
//                                             data-tooltip-id="promotional-optin-tooltip"
//                                         />
//                                         <Form.Control asChild>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={
//                                                     formData.promotionalOptIn
//                                                 }
//                                                 onChange={handleInputChange}
//                                                 name="promotionalOptIn"
//                                                 id="promotionalOptIn"
//                                                 title="Opt-in for promotional content"
//                                             />
//                                         </Form.Control>
//                                     </div>
//                                     <Form.Label className="text-sm">
//                                         By checking this box, you agree to
//                                         receive promotional content and updates
//                                     </Form.Label>
//                                 </Form.Field>

//                                 <Form.Field
//                                     name="marketingOptIn"
//                                     className="flex items-center justify-center gap-2"
//                                 >
//                                     <div className="flex items-center justify-center flex-col gap-2">
//                                         <Info
//                                             className="text-purple-300 cursor-pointer size-[0.85rem]"
//                                             data-tooltip-id="marketing-optin-tooltip"
//                                         />
//                                         <Form.Control asChild>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={
//                                                     formData.marketingOptIn
//                                                 }
//                                                 onChange={handleInputChange}
//                                                 name="marketingOptIn"
//                                                 id="marketingOptIn"
//                                                 title="Opt-in for marketing communications"
//                                             />
//                                         </Form.Control>
//                                     </div>
//                                     <Form.Label className="text-sm">
//                                         By checking this box, you agree to
//                                         receive marketing communications
//                                     </Form.Label>
//                                 </Form.Field>
//                             </div>

//                             <Form.Field name="availability">
//                                 <div className="flex items-center justify-start gap-2">
//                                     <Info
//                                         className="text-purple-300 cursor-pointer size-[0.85rem]"
//                                         data-tooltip-id="availability-tooltip"
//                                         data-tooltip-content="Suggested appointments must be at least 48 hours in advance."
//                                     />
//                                     <Form.Label
//                                         className="block text-sm font-medium mb-1"
//                                         htmlFor="availability"
//                                     >
//                                         Preferred Availability
//                                     </Form.Label>
//                                 </div>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="datetime-local"
//                                         required
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         value={formData.availability}
//                                         onChange={handleInputChange}
//                                         name="availability"
//                                         id="availability"
//                                         title="Select your availability"
//                                         placeholder="Preferred Availability"
//                                         min={new Date(Date.now() + 172800000)
//                                             .toISOString()
//                                             .slice(0, 16)}
//                                     />
//                                 </Form.Control>
//                             </Form.Field>

//                             <Form.Field name="file">
//                                 <div className="flex items-center justify-start gap-2">
//                                     <Info
//                                         className="text-purple-300 cursor-pointer size-[0.85rem]"
//                                         data-tooltip-id="file-tooltip"
//                                         data-tooltip-content="Upload relevant documents or files that represent your business assets."
//                                     />
//                                     <Form.Label
//                                         className="block text-sm font-medium mb-1"
//                                         htmlFor="file"
//                                     >
//                                         Upload File (Optional)
//                                     </Form.Label>
//                                 </div>
//                                 <Form.Control asChild>
//                                     <input
//                                         type="file"
//                                         onChange={handleFileChange}
//                                         className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                         name="file"
//                                         id="file"
//                                         title="Upload a file"
//                                         placeholder="Upload File"
//                                     />
//                                 </Form.Control>
//                             </Form.Field>
//                         </div>

//                         <div className="space-y-2">
//                             <Form.Field
//                                 name="privacyPolicyOptIn"
//                                 className="flex items-center"
//                             >
//                                 <Form.Control asChild>
//                                     <input
//                                         type="checkbox"
//                                         checked={formData.privacyPolicyOptIn}
//                                         onChange={handleInputChange}
//                                         name="privacyPolicyOptIn"
//                                         id="privacyPolicyOptIn"
//                                         title="Agree to the Privacy Policy"
//                                     />
//                                 </Form.Control>
//                                 <Form.Label>
//                                     I agree to the{" "}
//                                     <a
//                                         href="/privacy"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-purple-300 hover:text-purple-100 underline"
//                                     >
//                                         Privacy Policy
//                                     </a>
//                                 </Form.Label>
//                                 <Info
//                                     className="ml-2 text-purple-300 cursor-pointer size-[0.85rem]"
//                                     data-tooltip-id="privacy-tooltip"
//                                     data-tooltip-content="Read our Privacy Policy to understand how we handle your data."
//                                 />
//                             </Form.Field>

//                             <Form.Field
//                                 name="termsOfServiceOptIn"
//                                 className="flex items-center"
//                             >
//                                 <Form.Control asChild>
//                                     <input
//                                         type="checkbox"
//                                         checked={formData.termsOfServiceOptIn}
//                                         onChange={handleInputChange}
//                                         name="termsOfServiceOptIn"
//                                         id="termsOfServiceOptIn"
//                                         title="Agree to the Terms of Service"
//                                     />
//                                 </Form.Control>
//                                 <Form.Label>
//                                     I agree to the{" "}
//                                     <a
//                                         href="/terms-of-service"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-purple-300 hover:text-purple-100 underline"
//                                     >
//                                         Terms of Service
//                                     </a>
//                                 </Form.Label>
//                                 <Info
//                                     className="ml-2 text-purple-300 cursor-pointer size-[0.85rem]"
//                                     data-tooltip-id="terms-tooltip"
//                                     data-tooltip-content="Review our Terms of Service before agreeing."
//                                 />
//                             </Form.Field>
//                         </div>

//                         <Form.Submit asChild>
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md shadow-lg flex items-center justify-center"
//                                 disabled={isSubmitting}
//                                 type="submit"
//                             >
//                                 {isSubmitting ? "Submitting..." : "Register"}
//                                 <Send className="ml-2 h-4 w-4" />
//                             </motion.button>
//                         </Form.Submit>
//                     </Form.Root>

//                     {submitMessage && (
//                         <p
//                             className={`mt-4 text-center text-sm font-medium ${
//                                 submitMessage.includes("successful")
//                                     ? "text-green-400"
//                                     : "text-red-400"
//                             }`}
//                         >
//                             {submitMessage}
//                         </p>
//                     )}
//                 </div>
//                 <Footer companyName="NexusConjure dba Palmaview LLC" />

//                 <Tooltip
//                     id="sms-optin-tooltip"
//                     place="top"
//                     content="Receive important alerts, 2FA, customer support, account notifications, and event updates via SMS. You can opt out at any time by texting 'STOP-TEXT' to our number or updating your preferences in your account settings."
//                     className="max-w-xs whitespace-pre-line"
//                 />
//                 <Tooltip
//                     id="promotional-optin-tooltip"
//                     place="top"
//                     content="By checking this box, you agree to receive promotional content and updates."
//                     className="max-w-xs whitespace-pre-line"
//                 />
//                 <Tooltip
//                     id="marketing-optin-tooltip"
//                     place="top"
//                     content="By checking this box, you agree to receive marketing communications."
//                     className="max-w-xs whitespace-pre-line"
//                 />
//                 <Tooltip id="reason-tooltip" />
//                 <Tooltip id="availability-tooltip" />
//                 <Tooltip id="file-tooltip" />
//                 <Tooltip id="privacy-tooltip" />
//                 <Tooltip id="terms-tooltip" />
//             </motion.div>
//         </>
//     );
// };

// export default AlertsPage;

"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, ChevronDown, Info } from "lucide-react";
import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import { Tooltip } from "react-tooltip";
import * as THREE from "three";
import Navigation from "@/components/nexusconjure/site/navigation";
import Footer from "@/components/nexusconjure/site/footer";
import { reasonOptions } from "@/utils/nexusconjure/constants";

interface FormData {
    businessName: string;
    corporateWebsite: string;
    businessAddress: string;
    businessCity: string;
    businessState: string;
    businessZip: string;
    businessContactFirstName: string;
    businessContactLastName: string;
    estimatedMonthlyVolume: string;
    useCaseCategory: string;
    useCaseSummary: string;
    productionMessageSample: string;
    optInWorkflowDescription: string;
    optInImageUrls: string;
    webFormUrl: string;
    name: string;
    email: string;
    phone: string;
    reason: string;
    smsOptIn: boolean;
    emailOptIn: boolean;
    availability: string;
    privacyPolicyOptIn: boolean;
    termsOfServiceOptIn: boolean;
    promotionalOptIn: boolean;
    marketingOptIn: boolean;
}

const AlertsPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        businessName: "",
        corporateWebsite: "",
        businessAddress: "",
        businessCity: "",
        businessState: "",
        businessZip: "",
        businessContactFirstName: "",
        businessContactLastName: "",
        estimatedMonthlyVolume: "",
        useCaseCategory: "",
        useCaseSummary: "",
        productionMessageSample: "",
        optInWorkflowDescription: "",
        optInImageUrls: "",
        webFormUrl: "",
        name: "",
        email: "",
        phone: "",
        reason: "",
        smsOptIn: false,
        emailOptIn: true,
        availability: "",
        privacyPolicyOptIn: false,
        termsOfServiceOptIn: false,
        promotionalOptIn: false,
        marketingOptIn: false,
    });

    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        validateField(name, type === "checkbox" ? checked : value);
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const validateField = (name: string, value: any) => {
        let error = "";
        switch (name) {
            case "businessName":
            case "corporateWebsite":
            case "businessAddress":
            case "businessCity":
            case "businessState":
            case "businessZip":
            case "businessContactFirstName":
            case "businessContactLastName":
            case "estimatedMonthlyVolume":
            case "useCaseCategory":
            case "useCaseSummary":
            case "productionMessageSample":
            case "optInWorkflowDescription":
            case "optInImageUrls":
            case "webFormUrl":
            case "reason":
                error = value.trim() === "" ? `${name} is required` : "";
                break;
            case "email":
                error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? "Invalid email address"
                    : "";
                break;
            case "phone":
                error = !isValidPhoneNumber(value, "US")
                    ? "Invalid phone number"
                    : "";
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const AnimatedBox = () => {
        const meshRef = useRef<THREE.Mesh>(null);

        useFrame((state, delta) => {
            if (meshRef.current) {
                meshRef.current.rotation.x += delta;
                meshRef.current.rotation.y += delta * 0.5;
            }
        });

        return (
            <Box ref={meshRef} args={[1, 1, 1]}>
                <meshStandardMaterial color="#6B46C1" />
            </Box>
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = Object.values(errors).filter(
            (error) => error !== ""
        );
        if (formErrors.length > 0) {
            setSubmitMessage("Please correct the errors in the form.");
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage("");

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value.toString());
        });

        if (file) {
            formDataToSend.append("file", file);
        }

        try {
            const response = await fetch("/api/register-alerts/route", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                setSubmitMessage(
                    "Registration successful! Check your phone and email for confirmation messages."
                );
                setFormData({
                    businessName: "",
                    corporateWebsite: "",
                    businessAddress: "",
                    businessCity: "",
                    businessState: "",
                    businessZip: "",
                    businessContactFirstName: "",
                    businessContactLastName: "",
                    estimatedMonthlyVolume: "",
                    useCaseCategory: "",
                    useCaseSummary: "",
                    productionMessageSample: "",
                    optInWorkflowDescription: "",
                    optInImageUrls: "",
                    webFormUrl: "",
                    name: "",
                    email: "",
                    phone: "",
                    reason: "",
                    smsOptIn: false,
                    emailOptIn: true,
                    availability: "",
                    privacyPolicyOptIn: false,
                    termsOfServiceOptIn: false,
                    promotionalOptIn: false,
                    marketingOptIn: false,
                });
                setFile(null);
            } else {
                setSubmitMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            setSubmitMessage("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navigation />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-gradient-to-br from-purple-900 to-indigo-800 text-white min-h-screen"
            >
                <div className="max-w-4xl mx-auto py-4">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold">
                            Register for Alerts
                        </h1>
                        <div className="w-32 h-32">
                            <Canvas>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <AnimatedBox />
                                <OrbitControls enableZoom={false} />
                            </Canvas>
                        </div>
                    </div>

                    <Form.Root onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Form.Field name="businessName">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="businessName"
                                >
                                    Business Name
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.businessName}
                                        onChange={handleInputChange}
                                        name="businessName"
                                        id="businessName"
                                        title="Enter the business name"
                                        placeholder="Business Name"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="corporateWebsite">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="corporateWebsite"
                                >
                                    Corporate Website
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="url"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.corporateWebsite}
                                        onChange={handleInputChange}
                                        name="corporateWebsite"
                                        id="corporateWebsite"
                                        title="Enter the corporate website"
                                        placeholder="Corporate Website"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="businessAddress">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="businessAddress"
                                >
                                    Business Address
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.businessAddress}
                                        onChange={handleInputChange}
                                        name="businessAddress"
                                        id="businessAddress"
                                        title="Enter the business address"
                                        placeholder="Business Address"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="businessCity">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="businessCity"
                                >
                                    City
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.businessCity}
                                        onChange={handleInputChange}
                                        name="businessCity"
                                        id="businessCity"
                                        title="Enter the city"
                                        placeholder="City"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="businessState">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="businessState"
                                >
                                    State
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.businessState}
                                        onChange={handleInputChange}
                                        name="businessState"
                                        id="businessState"
                                        title="Enter the state"
                                        placeholder="State"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="businessZip">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="businessZip"
                                >
                                    ZIP Code
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.businessZip}
                                        onChange={handleInputChange}
                                        name="businessZip"
                                        id="businessZip"
                                        title="Enter the ZIP code"
                                        placeholder="ZIP Code"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="businessContactFirstName">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="businessContactFirstName"
                                >
                                    Contact First Name
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={
                                            formData.businessContactFirstName
                                        }
                                        onChange={handleInputChange}
                                        name="businessContactFirstName"
                                        id="businessContactFirstName"
                                        title="Enter the contact's first name"
                                        placeholder="First Name"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="businessContactLastName">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="businessContactLastName"
                                >
                                    Contact Last Name
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.businessContactLastName}
                                        onChange={handleInputChange}
                                        name="businessContactLastName"
                                        id="businessContactLastName"
                                        title="Enter the contact's last name"
                                        placeholder="Last Name"
                                    />
                                </Form.Control>
                            </Form.Field>
                        </div>

                        <Form.Field name="estimatedMonthlyVolume">
                            <Form.Label
                                className="block text-sm font-medium mb-1"
                                htmlFor="estimatedMonthlyVolume"
                            >
                                Estimated Monthly Volume
                            </Form.Label>
                            <Select.Root
                                onValueChange={(value) =>
                                    handleSelectChange(
                                        "estimatedMonthlyVolume",
                                        value
                                    )
                                }
                            >
                                <Select.Trigger
                                    className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
                                    id="estimatedMonthlyVolume"
                                >
                                    <Select.Value placeholder="Select volume" />
                                    <Select.Icon>
                                        <ChevronDown className="h-4 w-4" />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content className="bg-purple-900 rounded-md shadow-lg">
                                        <Select.Viewport className="p-2">
                                            {[
                                                "10",
                                                "100",
                                                "1000",
                                                "10000",
                                                "100000",
                                                "250000",
                                                "500000",
                                                "750000",
                                                "1000000",
                                                "5000000",
                                                "10000000+",
                                            ].map((volume) => (
                                                <Select.Item
                                                    key={volume}
                                                    value={volume}
                                                    className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
                                                >
                                                    <Select.ItemText>
                                                        {volume}
                                                    </Select.ItemText>
                                                </Select.Item>
                                            ))}
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </Form.Field>

                        <Form.Field name="useCaseCategory">
                            <Form.Label
                                className="block text-sm font-medium mb-1"
                                htmlFor="useCaseCategory"
                            >
                                Use Case Category
                            </Form.Label>
                            <Select.Root
                                onValueChange={(value) =>
                                    handleSelectChange("useCaseCategory", value)
                                }
                            >
                                <Select.Trigger
                                    className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center"
                                    id="useCaseCategory"
                                >
                                    <Select.Value placeholder="Select use case" />
                                    <Select.Icon>
                                        <ChevronDown className="h-4 w-4" />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content className="bg-purple-900 rounded-md shadow-lg">
                                        <Select.Viewport className="p-2">
                                            {reasonOptions.map((category) => (
                                                <Select.Group
                                                    key={category.value}
                                                >
                                                    <Select.Label className="px-2 py-1 text-sm font-bold text-purple-300">
                                                        {category.label}
                                                    </Select.Label>
                                                    {category.children.map(
                                                        (option) => (
                                                            <Select.Item
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                                className="px-2 py-1 rounded hover:bg-purple-700 cursor-pointer"
                                                            >
                                                                <Select.ItemText>
                                                                    {
                                                                        option.label
                                                                    }
                                                                </Select.ItemText>
                                                            </Select.Item>
                                                        )
                                                    )}
                                                </Select.Group>
                                            ))}
                                        </Select.Viewport>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </Form.Field>

                        <Form.Field name="useCaseSummary">
                            <Form.Label
                                className="block text-sm font-medium mb-1"
                                htmlFor="useCaseSummary"
                            >
                                Use Case Summary
                            </Form.Label>
                            <Form.Control asChild>
                                <textarea
                                    required
                                    className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.useCaseSummary}
                                    onChange={handleInputChange}
                                    name="useCaseSummary"
                                    id="useCaseSummary"
                                    title="Provide a summary of the use case"
                                    placeholder="Use Case Summary"
                                />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="productionMessageSample">
                            <Form.Label
                                className="block text-sm font-medium mb-1"
                                htmlFor="productionMessageSample"
                            >
                                Production Message Sample
                            </Form.Label>
                            <Form.Control asChild>
                                <textarea
                                    required
                                    className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.productionMessageSample}
                                    onChange={handleInputChange}
                                    name="productionMessageSample"
                                    id="productionMessageSample"
                                    title="Provide a sample production message"
                                    placeholder="Sample Message"
                                />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="optInWorkflowDescription">
                            <Form.Label
                                className="block text-sm font-medium mb-1"
                                htmlFor="optInWorkflowDescription"
                            >
                                Opt-In Workflow Description
                            </Form.Label>
                            <Form.Control asChild>
                                <textarea
                                    required
                                    className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.optInWorkflowDescription}
                                    onChange={handleInputChange}
                                    name="optInWorkflowDescription"
                                    id="optInWorkflowDescription"
                                    title="Describe the opt-in workflow"
                                    placeholder="Opt-In Workflow Description"
                                />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="optInImageUrls">
                            <Form.Label
                                className="block text-sm font-medium mb-1"
                                htmlFor="optInImageUrls"
                            >
                                Opt-In Image URLs
                            </Form.Label>
                            <Form.Control asChild>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.optInImageUrls}
                                    onChange={handleInputChange}
                                    name="optInImageUrls"
                                    id="optInImageUrls"
                                    title="Provide the URLs for opt-in images"
                                    placeholder="Opt-In Image URLs"
                                />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="webFormUrl">
                            <Form.Label
                                className="block text-sm font-medium mb-1"
                                htmlFor="webFormUrl"
                            >
                                Web Form URL
                            </Form.Label>
                            <Form.Control asChild>
                                <input
                                    type="url"
                                    required
                                    className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.webFormUrl}
                                    onChange={handleInputChange}
                                    name="webFormUrl"
                                    id="webFormUrl"
                                    title="Provide the URL for the web form"
                                    placeholder="Web Form URL"
                                />
                            </Form.Control>
                        </Form.Field>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Form.Field name="name">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="name"
                                >
                                    Name
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        name="name"
                                        id="name"
                                        title="Enter your name"
                                        placeholder="Name"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="email">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="email"
                                >
                                    Email
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        name="email"
                                        id="email"
                                        title="Enter your email address"
                                        placeholder="Email"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="phone">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="phone"
                                >
                                    Phone Number
                                </Form.Label>
                                <Form.Control asChild>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        name="phone"
                                        id="phone"
                                        title="Enter your phone number"
                                        placeholder="Phone Number"
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="reason">
                                <Form.Label
                                    className="block text-sm font-medium mb-1"
                                    htmlFor="reason"
                                >
                                    Reason for Registration
                                </Form.Label>
                                <Form.Control asChild>
                                    <textarea
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        name="reason"
                                        id="reason"
                                        title="Enter the reason for registration"
                                        placeholder="Reason for Registration"
                                    />
                                </Form.Control>
                            </Form.Field>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-6">
                                <Form.Field
                                    name="smsOptIn"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <div className="flex items-center justify-center flex-col gap-2">
                                        <Info
                                            className="text-purple-300 cursor-pointer size-[0.85rem]"
                                            data-tooltip-id="sms-optin-tooltip"
                                        />
                                        <Form.Control asChild>
                                            <input
                                                type="checkbox"
                                                checked={formData.smsOptIn}
                                                onChange={handleInputChange}
                                                name="smsOptIn"
                                                id="smsOptIn"
                                                title="Opt-in for SMS alerts"
                                            />
                                        </Form.Control>
                                    </div>
                                    <Form.Label className="text-sm">
                                        Opt-in for SMS alerts, 2FA, customer
                                        support, account notifications, and
                                        event updates
                                    </Form.Label>
                                </Form.Field>

                                <Form.Field
                                    name="promotionalOptIn"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <div className="flex items-center justify-center flex-col gap-2">
                                        <Info
                                            className="text-purple-300 cursor-pointer size-[0.85rem]"
                                            data-tooltip-id="promotional-optin-tooltip"
                                        />
                                        <Form.Control asChild>
                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.promotionalOptIn
                                                }
                                                onChange={handleInputChange}
                                                name="promotionalOptIn"
                                                id="promotionalOptIn"
                                                title="Opt-in for promotional content"
                                            />
                                        </Form.Control>
                                    </div>
                                    <Form.Label className="text-sm">
                                        By checking this box, you agree to
                                        receive promotional content and updates
                                    </Form.Label>
                                </Form.Field>

                                <Form.Field
                                    name="marketingOptIn"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <div className="flex items-center justify-center flex-col gap-2">
                                        <Info
                                            className="text-purple-300 cursor-pointer size-[0.85rem]"
                                            data-tooltip-id="marketing-optin-tooltip"
                                        />
                                        <Form.Control asChild>
                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.marketingOptIn
                                                }
                                                onChange={handleInputChange}
                                                name="marketingOptIn"
                                                id="marketingOptIn"
                                                title="Opt-in for marketing communications"
                                            />
                                        </Form.Control>
                                    </div>
                                    <Form.Label className="text-sm">
                                        By checking this box, you agree to
                                        receive marketing communications
                                    </Form.Label>
                                </Form.Field>
                            </div>

                            <Form.Field name="availability">
                                <div className="flex items-center justify-start gap-2">
                                    <Info
                                        className="text-purple-300 cursor-pointer size-[0.85rem]"
                                        data-tooltip-id="availability-tooltip"
                                        data-tooltip-content="Suggested appointments must be at least 48 hours in advance."
                                    />
                                    <Form.Label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="availability"
                                    >
                                        Preferred Availability
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        type="datetime-local"
                                        required
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        name="availability"
                                        id="availability"
                                        title="Select your availability"
                                        placeholder="Preferred Availability"
                                        min={new Date(Date.now() + 172800000)
                                            .toISOString()
                                            .slice(0, 16)}
                                    />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field name="file">
                                <div className="flex items-center justify-start gap-2">
                                    <Info
                                        className="text-purple-300 cursor-pointer size-[0.85rem]"
                                        data-tooltip-id="file-tooltip"
                                        data-tooltip-content="Upload relevant documents or files that represent your business assets."
                                    />
                                    <Form.Label
                                        className="block text-sm font-medium mb-1"
                                        htmlFor="file"
                                    >
                                        Upload File (Optional)
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full px-3 py-2 bg-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        name="file"
                                        id="file"
                                        title="Upload a file"
                                        placeholder="Upload File"
                                    />
                                </Form.Control>
                            </Form.Field>
                        </div>

                        <div className="space-y-2">
                            <Form.Field
                                name="privacyPolicyOptIn"
                                className="flex items-center gap-2"
                            >
                                <Form.Control asChild>
                                    <input
                                        type="checkbox"
                                        checked={formData.privacyPolicyOptIn}
                                        onChange={handleInputChange}
                                        name="privacyPolicyOptIn"
                                        id="privacyPolicyOptIn"
                                        title="Agree to the Privacy Policy"
                                    />
                                </Form.Control>
                                <Form.Label>
                                    I agree to the{" "}
                                    <a
                                        href="/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-300 hover:text-purple-100 underline"
                                    >
                                        Privacy Policy
                                    </a>
                                </Form.Label>
                                <Info
                                    className="ml-2 text-purple-300 cursor-pointer size-[0.85rem]"
                                    data-tooltip-id="privacy-tooltip"
                                    data-tooltip-content="Read our Privacy Policy to understand how we handle your data."
                                />
                            </Form.Field>

                            <Form.Field
                                name="termsOfServiceOptIn"
                                className="flex items-center gap-2"
                            >
                                <Form.Control asChild>
                                    <input
                                        type="checkbox"
                                        checked={formData.termsOfServiceOptIn}
                                        onChange={handleInputChange}
                                        name="termsOfServiceOptIn"
                                        id="termsOfServiceOptIn"
                                        title="Agree to the Terms of Service"
                                    />
                                </Form.Control>
                                <Form.Label>
                                    I agree to the{" "}
                                    <a
                                        href="/terms-of-service"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-300 hover:text-purple-100 underline"
                                    >
                                        Terms of Service
                                    </a>
                                </Form.Label>
                                <Info
                                    className="ml-2 text-purple-300 cursor-pointer size-[0.85rem]"
                                    data-tooltip-id="terms-tooltip"
                                    data-tooltip-content="Review our Terms of Service before agreeing."
                                />
                            </Form.Field>
                        </div>

                        <Form.Submit asChild>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md shadow-lg flex items-center justify-center"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                {isSubmitting ? "Submitting..." : "Register"}
                                <Send className="ml-2 h-4 w-4" />
                            </motion.button>
                        </Form.Submit>
                    </Form.Root>

                    {submitMessage && (
                        <p
                            className={`mt-4 text-center text-sm font-medium ${
                                submitMessage.includes("successful")
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            {submitMessage}
                        </p>
                    )}
                </div>
                <Footer companyName="NexusConjure dba Palmaview LLC" />

                <Tooltip
                    id="sms-optin-tooltip"
                    place="top"
                    content="Receive important alerts, 2FA, customer support, account notifications, and event updates via SMS. You can opt out at any time by texting 'STOP-TEXT' to our number or updating your preferences in your account settings."
                    className="max-w-xs whitespace-pre-line"
                />
                <Tooltip
                    id="promotional-optin-tooltip"
                    place="top"
                    content="By checking this box, you agree to receive promotional content and updates."
                    className="max-w-xs whitespace-pre-line"
                />
                <Tooltip
                    id="marketing-optin-tooltip"
                    place="top"
                    content="By checking this box, you agree to receive marketing communications."
                    className="max-w-xs whitespace-pre-line"
                />
                <Tooltip id="reason-tooltip" />
                <Tooltip id="availability-tooltip" />
                <Tooltip id="file-tooltip" />
                <Tooltip id="privacy-tooltip" />
                <Tooltip id="terms-tooltip" />
            </motion.div>
        </>
    );
};

export default AlertsPage;
