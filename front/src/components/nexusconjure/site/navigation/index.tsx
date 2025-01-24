"use client";

import { ModeToggle } from "@/components/nexusconjure/global/mode-toggle";
import NexusConjureWhite from "@/components/logo/NexusConjureWhite";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
	user?: null | User;
};

const Navigation = ({ user }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="navigation-container">
			<Link href="/nexusconjure/" className="navigation-logo">
				{/* <Image
                    src={
                        "./assets/nexusconjurecom-vector-optimized-inverted.svg"
                    }
                    width={40}
                    height={40}
                    alt="NexusConjure logo"`
                    className="navigation-logo-image"
                /> */}
				<NexusConjureWhite
					id="nexusconjure-logo"
					className="w-[2rem] h-[2rem] navigation-logo-image"
				/>

				<span className="navigation-logo-text">NexusConjure</span>
			</Link>
			<nav className="navigation-desktop">
				<ul className="navigation-list">
					<li>
						<Link href="/nexusconjure/pricing">Pricing</Link>
					</li>
					<li>
						<Link href="/nexusconjure/about">About</Link>
					</li>
					<li>
						<Link href="/nexusconjure/documentation">
							Documentation
						</Link>
					</li>
					<li>
						<Link href="/nexusconjure/features">Features</Link>
					</li>
					<li>
						<Link href="/nexusconjure/alerts">Alerts</Link>
					</li>
					<li>
						<Link href="/nexusconjure/policies">Policies</Link>
					</li>
				</ul>
			</nav>
			<aside className="navigation-aside">
				{!user ? (
					<Link
						href="/nexusconjure/agency"
						className="navigation-login-button"
					>
						Login
					</Link>
				) : (
					<UserButton />
				)}
				<ModeToggle />
				<button
					className="navigation-menu-toggle"
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>
			</aside>
			<div className={`navigation-overlay ${isMenuOpen ? "active" : ""}`}>
				<div
					className={`navigation-mobile-menu ${
						isMenuOpen ? "active" : ""
					}`}
				>
					<ul className="navigation-mobile-list">
						<li>
							<Link href="/nexusconjure/pricing">Pricing</Link>
						</li>
						<li>
							<Link href="/nexusconjure/about">About</Link>
						</li>
						<li>
							<Link href="/nexusconjure/documentation">
								Documentation
							</Link>
						</li>
						<li>
							<Link href="/nexusconjure/features">Features</Link>
						</li>
						<li>
							<Link href="/nexusconjure/alerts">Alerts</Link>
						</li>
						<li>
							<Link href="/nexusconjure/policies">Policies</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
