import BarChart from "@/components/icons/bar_chart";
import Calendar from "@/components/icons/calendar";
import CheckCircle from "@/components/icons/check_circled";
import Chip from "@/components/icons/chip";
import ClipboardIcon from "@/components/icons/clipboardIcon";
import Compass from "@/components/icons/compass";
import Database from "@/components/icons/database";
import Flag from "@/components/icons/flag";
import Headphone from "@/components/icons/headphone";
import Home from "@/components/icons/home";
import Info from "@/components/icons/info";
import LinkIcon from "@/components/icons/link";
import Lock from "@/components/icons/lock";
import Message from "@/components/icons/messages";
import Notification from "@/components/icons/notification";
import Payment from "@/components/icons/payment";
import Person from "@/components/icons/person";
import Pipelines from "@/components/icons/pipelines";
import NexusConjureCategory from "@/components/icons/nexusconjure-category";
import Power from "@/components/icons/power";
import Receipt from "@/components/icons/receipt";
import Send from "@/components/icons/send";
import Settings from "@/components/icons/settings";
import Shield from "@/components/icons/shield";
import Star from "@/components/icons/star";
import Tune from "@/components/icons/tune";
import Video from "@/components/icons/video_recorder";
import Wallet from "@/components/icons/wallet";
import Warning from "@/components/icons/warning";
export const pricingCards = [
	{
		title: "Starter",
		description: "Perfect for trying out nexusconjure",
		price: "Free",
		duration: "",
		highlight: "Key features",
		features: ["3 Sub accounts", "2 Team members", "Unlimited pipelines"],
		priceId: "",
	},
	{
		title: "Unlimited Saas",
		description: "The ultimate agency kit",
		price: "$449",
		duration: "month",
		highlight: "Key features",
		features: ["Rebilling", "24/7 Support team"],
		priceId: `${process.env.STRIPE_PRICE_ID_2}`,
	},
	{
		title: "Basic",
		description: "For serious agency owners",
		price: "$249",
		duration: "month",
		highlight: "Everything in Starter, plus",
		features: ["Unlimited Sub accounts", "Unlimited Team members"],
		priceId: `${process.env.STRIPE_PRICE_ID_1}`,
	},
];

export const addOnProducts = [
	{ title: "Priority Support", id: `${process.env.STRIPE_PRODUCT_ID}` },
];

export const icons = [
	{
		value: "chart",
		label: "Bar Chart",
		path: BarChart,
	},
	{
		value: "headphone",
		label: "Headphones",
		path: Headphone,
	},
	{
		value: "send",
		label: "Send",
		path: Send,
	},
	{
		value: "pipelines",
		label: "Pipelines",
		path: Pipelines,
	},
	{
		value: "calendar",
		label: "Calendar",
		path: Calendar,
	},
	{
		value: "settings",
		label: "Settings",
		path: Settings,
	},
	{
		value: "check",
		label: "Check Circled",
		path: CheckCircle,
	},
	{
		value: "chip",
		label: "Chip",
		path: Chip,
	},
	{
		value: "compass",
		label: "Compass",
		path: Compass,
	},
	{
		value: "database",
		label: "Database",
		path: Database,
	},
	{
		value: "flag",
		label: "Flag",
		path: Flag,
	},
	{
		value: "home",
		label: "Home",
		path: Home,
	},
	{
		value: "info",
		label: "Info",
		path: Info,
	},
	{
		value: "link",
		label: "Link",
		path: LinkIcon,
	},
	{
		value: "lock",
		label: "Lock",
		path: Lock,
	},
	{
		value: "messages",
		label: "Messages",
		path: Message,
	},
	{
		value: "notification",
		label: "Notification",
		path: Notification,
	},
	{
		value: "payment",
		label: "Payment",
		path: Payment,
	},
	{
		value: "power",
		label: "Power",
		path: Power,
	},
	{
		value: "receipt",
		label: "Receipt",
		path: Receipt,
	},
	{
		value: "shield",
		label: "Shield",
		path: Shield,
	},
	{
		value: "star",
		label: "Star",
		path: Star,
	},
	{
		value: "tune",
		label: "Tune",
		path: Tune,
	},
	{
		value: "videorecorder",
		label: "Video Recorder",
		path: Video,
	},
	{
		value: "wallet",
		label: "Wallet",
		path: Wallet,
	},
	{
		value: "warning",
		label: "Warning",
		path: Warning,
	},
	{
		value: "person",
		label: "Person",
		path: Person,
	},
	{
		value: "category",
		label: "Category",
		path: NexusConjureCategory,
	},
	{
		value: "clipboardIcon",
		label: "Clipboard Icon",
		path: ClipboardIcon,
	},
];

export type EditorBtns =
	| "text"
	| "container"
	| "section"
	| "contactForm"
	| "paymentForm"
	| "link"
	| "2Col"
	| "video"
	| "__body"
	| "image"
	| null
	| "3Col";

export const defaultStyles: React.CSSProperties = {
	backgroundPosition: "center",
	objectFit: "cover",
	backgroundRepeat: "no-repeat",
	textAlign: "left",
	opacity: "100%",
};

export const reasonOptions = [
	{
		value: "web-digital-presence",
		label: "Web & Digital Presence",
		children: [
			{
				value: "website-development",
				label: "Custom Website Development",
			},
			{
				value: "ecommerce-solutions",
				label: "E-commerce Platform Integration",
			},
			{
				value: "cms-implementation",
				label: "Content Management System (CMS) Setup",
			},
			{
				value: "seo-optimization",
				label: "Search Engine Optimization (SEO)",
			},
			{
				value: "web-accessibility",
				label: "Web Accessibility Compliance",
			},
			{
				value: "progressive-web-apps",
				label: "Progressive Web App (PWA) Development",
			},
		],
	},
	{
		value: "business-operations",
		label: "Business Operations & Management",
		children: [
			{
				value: "erp-implementation",
				label: "Enterprise Resource Planning (ERP) Systems",
			},
			{
				value: "crm-solutions",
				label: "Customer Relationship Management (CRM) Tools",
			},
			{
				value: "business-intelligence",
				label: "Business Intelligence & Analytics",
			},
			{
				value: "project-management",
				label: "Project Management Solutions",
			},
			{
				value: "supply-chain-optimization",
				label: "Supply Chain Optimization",
			},
			{
				value: "inventory-management",
				label: "Inventory Management Systems",
			},
		],
	},
	{
		value: "financial-services",
		label: "Financial Services & FinTech",
		children: [
			{ value: "payment-gateways", label: "Payment Gateway Integration" },
			{
				value: "cryptocurrency-solutions",
				label: "Cryptocurrency & Blockchain Solutions",
			},
			{
				value: "financial-analytics",
				label: "Financial Analytics & Reporting",
			},
			{
				value: "risk-management-systems",
				label: "Risk Management Systems",
			},
			{
				value: "regulatory-compliance",
				label: "Financial Regulatory Compliance Tools",
			},
			{ value: "robo-advisory", label: "Robo-Advisory Platforms" },
		],
	},
	{
		value: "healthcare-medical",
		label: "Healthcare & Medical Technologies",
		children: [
			{
				value: "ehr-systems",
				label: "Electronic Health Record (EHR) Systems",
			},
			{
				value: "telemedicine-platforms",
				label: "Telemedicine & Remote Care Platforms",
			},
			{
				value: "medical-imaging",
				label: "Medical Imaging & Diagnostics Solutions",
			},
			{
				value: "healthcare-analytics",
				label: "Healthcare Analytics & Predictive Modeling",
			},
			{
				value: "patient-engagement",
				label: "Patient Engagement & Portal Systems",
			},
			{
				value: "clinical-trial-management",
				label: "Clinical Trial Management Systems",
			},
		],
	},
	{
		value: "education-elearning",
		label: "Education & E-Learning",
		children: [
			{
				value: "lms-development",
				label: "Learning Management System (LMS) Development",
			},
			{
				value: "educational-content",
				label: "Interactive Educational Content Creation",
			},
			{
				value: "student-information-systems",
				label: "Student Information Systems",
			},
			{
				value: "adaptive-learning",
				label: "Adaptive Learning Technologies",
			},
			{
				value: "virtual-classrooms",
				label: "Virtual Classroom Solutions",
			},
			{
				value: "education-analytics",
				label: "Educational Analytics & Performance Tracking",
			},
		],
	},
	{
		value: "media-entertainment",
		label: "Media & Entertainment",
		children: [
			{
				value: "streaming-platforms",
				label: "Video & Audio Streaming Platforms",
			},
			{
				value: "content-management",
				label: "Digital Asset Management Systems",
			},
			{
				value: "gaming-solutions",
				label: "Gaming & Interactive Entertainment Solutions",
			},
			{
				value: "ar-vr-experiences",
				label: "Augmented & Virtual Reality Experiences",
			},
			{
				value: "media-analytics",
				label: "Media Analytics & Audience Insights",
			},
			{
				value: "content-recommendation",
				label: "Content Recommendation Engines",
			},
		],
	},
	{
		value: "iot-smart-devices",
		label: "IoT & Smart Devices",
		children: [
			{ value: "iot-platforms", label: "IoT Platform Development" },
			{ value: "smart-home", label: "Smart Home & Building Automation" },
			{
				value: "industrial-iot",
				label: "Industrial IoT & Predictive Maintenance",
			},
			{ value: "wearable-tech", label: "Wearable Technology Solutions" },
			{ value: "iot-security", label: "IoT Security & Privacy" },
			{ value: "edge-computing", label: "Edge Computing Solutions" },
		],
	},
	{
		value: "ai-machine-learning",
		label: "AI & Machine Learning",
		children: [
			{
				value: "predictive-analytics",
				label: "Predictive Analytics & Forecasting",
			},
			{
				value: "nlp-solutions",
				label: "Natural Language Processing Applications",
			},
			{
				value: "computer-vision",
				label: "Computer Vision & Image Recognition",
			},
			{
				value: "chatbots-virtual-assistants",
				label: "Chatbots & Virtual Assistants",
			},
			{
				value: "recommendation-systems",
				label: "AI-Powered Recommendation Systems",
			},
			{
				value: "autonomous-systems",
				label: "Autonomous Systems & Robotics",
			},
		],
	},
	{
		value: "cybersecurity",
		label: "Cybersecurity & Data Protection",
		children: [
			{
				value: "threat-detection",
				label: "Advanced Threat Detection & Prevention",
			},
			{
				value: "encryption-solutions",
				label: "Data Encryption & Secure Communication",
			},
			{
				value: "identity-access-management",
				label: "Identity & Access Management",
			},
			{
				value: "security-compliance",
				label: "Security Compliance & Audit Tools",
			},
			{
				value: "incident-response",
				label: "Incident Response & Forensics",
			},
			{
				value: "blockchain-security",
				label: "Blockchain Security Solutions",
			},
		],
	},
	{
		value: "cloud-infrastructure",
		label: "Cloud & Infrastructure",
		children: [
			{ value: "cloud-migration", label: "Cloud Migration & Strategy" },
			{
				value: "multi-cloud-management",
				label: "Multi-Cloud Management Solutions",
			},
			{
				value: "serverless-architecture",
				label: "Serverless Architecture Implementation",
			},
			{
				value: "container-orchestration",
				label: "Container Orchestration (e.g., Kubernetes)",
			},
			{
				value: "infrastructure-as-code",
				label: "Infrastructure as Code (IaC)",
			},
			{ value: "cloud-security", label: "Cloud Security & Compliance" },
		],
	},
	{
		value: "blockchain-dlt",
		label: "Blockchain & Distributed Ledger Technologies",
		children: [
			{
				value: "smart-contracts",
				label: "Smart Contract Development & Auditing",
			},
			{
				value: "dapps",
				label: "Decentralized Application (DApp) Development",
			},
			{ value: "tokenization", label: "Asset Tokenization Platforms" },
			{
				value: "blockchain-integration",
				label: "Blockchain Integration for Existing Systems",
			},
			{
				value: "consensus-mechanisms",
				label: "Consensus Mechanism Design & Implementation",
			},
			{
				value: "crypto-exchanges",
				label: "Cryptocurrency Exchange Platforms",
			},
		],
	},
	{
		value: "energy-sustainability",
		label: "Energy & Sustainability",
		children: [
			{
				value: "energy-management",
				label: "Smart Grid & Energy Management Systems",
			},
			{
				value: "renewable-energy",
				label: "Renewable Energy Integration Solutions",
			},
			{
				value: "carbon-footprint",
				label: "Carbon Footprint Tracking & Reporting",
			},
			{
				value: "waste-management",
				label: "Waste Management & Recycling Solutions",
			},
			{
				value: "sustainable-supply-chain",
				label: "Sustainable Supply Chain Management",
			},
			{
				value: "environmental-monitoring",
				label: "Environmental Monitoring & Compliance",
			},
		],
	},
	{
		value: "transportation-logistics",
		label: "Transportation & Logistics",
		children: [
			{
				value: "fleet-management",
				label: "Fleet Management & Telematics",
			},
			{
				value: "route-optimization",
				label: "Route Optimization & Planning",
			},
			{
				value: "warehouse-automation",
				label: "Warehouse Management & Automation",
			},
			{
				value: "freight-tracking",
				label: "Real-time Freight Tracking & Visibility",
			},
			{
				value: "last-mile-delivery",
				label: "Last-Mile Delivery Optimization",
			},
			{
				value: "autonomous-vehicles",
				label: "Autonomous Vehicle Technologies",
			},
		],
	},
	{
		value: "agriculture-foodtech",
		label: "Agriculture & FoodTech",
		children: [
			{
				value: "precision-agriculture",
				label: "Precision Agriculture Solutions",
			},
			{
				value: "crop-monitoring",
				label: "Crop Monitoring & Yield Prediction",
			},
			{ value: "smart-irrigation", label: "Smart Irrigation Systems" },
			{
				value: "food-traceability",
				label: "Food Traceability & Safety Solutions",
			},
			{
				value: "vertical-farming",
				label: "Vertical Farming Technologies",
			},
			{
				value: "agri-marketplaces",
				label: "Agricultural Marketplaces & Supply Chain",
			},
		],
	},
	{
		value: "legal-regulatory",
		label: "Legal & Regulatory Technology",
		children: [
			{
				value: "legal-practice-management",
				label: "Legal Practice Management Systems",
			},
			{
				value: "contract-analysis",
				label: "AI-Powered Contract Analysis",
			},
			{
				value: "compliance-management",
				label: "Regulatory Compliance Management",
			},
			{
				value: "ip-management",
				label: "Intellectual Property Management",
			},
			{
				value: "legal-research",
				label: "Legal Research & Analytics Tools",
			},
			{
				value: "online-dispute-resolution",
				label: "Online Dispute Resolution Platforms",
			},
		],
	},
	{
		value: "manufacturing-industry40",
		label: "Manufacturing & Industry 4.0",
		children: [
			{
				value: "smart-manufacturing",
				label: "Smart Manufacturing Systems",
			},
			{
				value: "predictive-maintenance",
				label: "Predictive Maintenance Solutions",
			},
			{ value: "digital-twin", label: "Digital Twin Technology" },
			{
				value: "quality-control-ai",
				label: "AI-Powered Quality Control",
			},
			{
				value: "additive-manufacturing",
				label: "3D Printing & Additive Manufacturing",
			},
			{
				value: "industrial-automation",
				label: "Industrial Automation & Robotics",
			},
		],
	},
	{
		value: "research-development",
		label: "Research & Development",
		children: [
			{
				value: "lab-management",
				label: "Laboratory Information Management Systems (LIMS)",
			},
			{
				value: "research-collaboration",
				label: "Research Collaboration Platforms",
			},
			{
				value: "data-visualization",
				label: "Scientific Data Visualization Tools",
			},
			{
				value: "simulation-modeling",
				label: "Simulation & Modeling Software",
			},
			{
				value: "research-analytics",
				label: "Research Analytics & Insights",
			},
			{
				value: "grant-management",
				label: "Grant Management & Funding Platforms",
			},
		],
	},
	{
		value: "human-resources",
		label: "Human Resources & Workforce Management",
		children: [
			{
				value: "hris",
				label: "Human Resource Information Systems (HRIS)",
			},
			{
				value: "talent-acquisition",
				label: "AI-Powered Talent Acquisition",
			},
			{
				value: "employee-engagement",
				label: "Employee Engagement & Experience Platforms",
			},
			{
				value: "performance-management",
				label: "Performance Management Solutions",
			},
			{
				value: "workforce-analytics",
				label: "Workforce Analytics & Planning",
			},
			{
				value: "learning-development",
				label: "Learning & Development Platforms",
			},
		],
	},
	{
		value: "creative-design",
		label: "Creative & Design Technologies",
		children: [
			{
				value: "design-collaboration",
				label: "Design Collaboration Tools",
			},
			{ value: "3d-modeling", label: "3D Modeling & Rendering Software" },
			{
				value: "generative-design",
				label: "AI-Powered Generative Design",
			},
			{
				value: "motion-graphics",
				label: "Motion Graphics & Animation Tools",
			},
			{
				value: "virtual-production",
				label: "Virtual Production Technologies",
			},
			{
				value: "creative-asset-management",
				label: "Creative Asset Management Systems",
			},
		],
	},
	{
		value: "other",
		label: "Other Specialized Solutions",
		children: [
			{
				value: "custom-development",
				label: "Custom Software Development",
			},
			{
				value: "legacy-modernization",
				label: "Legacy System Modernization",
			},
			{ value: "data-migration", label: "Data Migration & Integration" },
			{ value: "api-development", label: "API Development & Management" },
			{
				value: "technology-consulting",
				label: "Technology Strategy Consulting",
			},
			{
				value: "emerging-tech",
				label: "Emerging Technology Exploration",
			},
		],
	},
];
