"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MainContent: React.FC = () => {
	const [activeSection, setActiveSection] = useState("welcome");

	const handleSectionChange = (section: string) => {
		setActiveSection(section);
	};

	const pageVariants = {
		initial: { opacity: 0, x: -50 },
		animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
		exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
	};

	const buttonHover = {
		scale: 1.05,
		color: "#004e8a",
		transition: { duration: 0.2 },
	};

	return (
		<div className="main-layout">
			{/* Sidebar Navigation */}
			<aside className="sidebar">
				<nav className="sidebar-nav">
					<h2 className="sidebar-title">Navigation</h2>
					<ul>
						{[
							"welcome",
							"resources",
							"connect",
							"features",
							"case-studies",
							"stay-informed",
						].map((section) => (
							<li key={section}>
								<motion.button
									whileHover={buttonHover}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleSectionChange(section)}
									className={
										activeSection === section
											? "active"
											: ""
									}
								>
									{section.replace("-", " ")}
								</motion.button>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			{/* Main Content Section */}
			<main className="content-container">
				<header className="content-header">
					<h1 className="frame__title">Advanced Practice</h1>
					<div className="links">
						<Link href="/clinicviews" className="link">
							About Us
						</Link>
						<Link href="/clinicviews" className="link">
							Contact
						</Link>
						<Link href="/clinicviews" className="link">
							Services
						</Link>
					</div>
				</header>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeSection}
						variants={pageVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="content"
					>
						{activeSection === "welcome" && (
							<section>
								<p>
									Welcome to Advanced Practice. Discover the
									World of Mental Health. Are you a curious
									patient seeking information about mental
									health conditions and treatment options? A
									student or nurse on the path to becoming a
									mental health professional? A practicing
									psychiatrist, nurse practitioner, or
									researcher looking to expand your knowledge?
									You've come to the right place.
								</p>
							</section>
						)}

						{activeSection === "resources" && (
							<section>
								<p>
									Advanced Practice is your one-stop resource
									for all things mental health. We offer a
									wealth of information, resources, and
									opportunities for professional development.
									Explore our website to: Learn about various
									mental health conditions and their
									treatments. Find resources and support for
									patients and their families. Access
									continuing education courses for healthcare
									professionals.
								</p>
							</section>
						)}

						{activeSection === "connect" && (
							<section>
								<h3 className="gtext size-m font-4 shadow-1 spaced">
									Connect
								</h3>
								<p>
									Connect with other mental health
									professionals and advocates. Stay up-to-date
									on the latest research and developments in
									the field. Join us on this journey of
									discovery and growth. Advanced Practice is
									your go-to online resource for professional
									development and mental health education.
								</p>
							</section>
						)}

						{activeSection === "features" && (
							<section>
								<h2 className="gtext size-s font-1 end">
									Key Features:
								</h2>
								<p>
									Access a collection of expertly written
									articles condensed for busy professionals or
									students who need to stay informed on
									various mental health topics, covering
									everything from mental health conditions to
									treatment approaches and research findings.
									Continuing Education Courses: Earn CEUs
									through our online courses, tailored to meet
									the needs of healthcare professionals at all
									levels.
								</p>
							</section>
						)}

						{activeSection === "case-studies" && (
							<section>
								<h3 className="gtext size-m font-2 shadow-2 color-1 blendmode-1 spaced">
									Case Studies
								</h3>
								<p>
									Explore real-world case studies to enhance
									your understanding of mental health
									conditions and treatment approaches. Learn
									from the experiences of others and develop
									your clinical judgment skills.
								</p>
							</section>
						)}

						{activeSection === "stay-informed" && (
							<section>
								<h3 className="gtext size-m font-6 shadow-1 spaced">
									Stay Informed
								</h3>
								<p>
									Stay informed about the latest research,
									policy changes, and industry trends in
									mental health. We keep you up-to-date with
									the most relevant information so you can
									provide the best possible care to your
									patients.
								</p>
							</section>
						)}
					</motion.div>
				</AnimatePresence>

				<footer className="frame frame--footer">
					<span>
						<Link
							href="https://www.instagram.com/advancedpractice/"
							className="link"
						>
							@advancedpractice
						</Link>
					</span>
					<Link
						href="https://www.youtube.com/@AdvanCEdpractice-io/videos"
						className="link"
					>
						Subscribe
					</Link>
				</footer>
			</main>
		</div>
	);
};

export default MainContent;
