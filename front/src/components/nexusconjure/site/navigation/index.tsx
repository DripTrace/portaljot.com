// components/nexusconjure/global/navigation/index.tsx

"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ModeToggle } from "@/components/nexusconjure/global/mode-toggle";
import NexusConjureWhite from "@/components/logo/NexusConjureWhite";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const Navigation = ({}: Props) => {
	const { data: session, status } = useSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSignOut = () => {
		signOut({ callbackUrl: "/nexusconjure/" });
	};

	if (status === "loading") {
		return null; // Or a loading spinner
	}

	return (
		<div className="navigation-container flex items-center justify-between p-4 bg-background">
			{/* Logo */}
			<Link
				href="/nexusconjure/"
				className="navigation-logo flex items-center gap-2"
			>
				<NexusConjureWhite
					id="nexusconjure-logo"
					className="w-[2rem] h-[2rem] navigation-logo-image"
				/>
				<span className="navigation-logo-text font-bold text-xl">
					NexusConjure
				</span>
			</Link>

			{/* Desktop Navigation */}
			<nav className="navigation-desktop hidden md:block">
				<ul className="navigation-list flex space-x-6">
					<li>
						<Link
							href="/nexusconjure/pricing"
							className="hover:text-primary"
						>
							Pricing
						</Link>
					</li>
					<li>
						<Link
							href="/nexusconjure/about"
							className="hover:text-primary"
						>
							About
						</Link>
					</li>
					<li>
						<Link
							href="/nexusconjure/documentation"
							className="hover:text-primary"
						>
							Documentation
						</Link>
					</li>
					<li>
						<Link
							href="/nexusconjure/features"
							className="hover:text-primary"
						>
							Features
						</Link>
					</li>
					<li>
						<Link
							href="/nexusconjure/alerts"
							className="hover:text-primary"
						>
							Alerts
						</Link>
					</li>
					<li>
						<Link
							href="/nexusconjure/policies"
							className="hover:text-primary"
						>
							Policies
						</Link>
					</li>
				</ul>
			</nav>

			{/* Right Side: User Menu and Mode Toggle */}
			<aside className="navigation-aside flex items-center gap-4">
				{/* User Menu */}
				{session?.user ? (
					<div className="relative">
						<button
							className="flex items-center focus:outline-none"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<Avatar>
								{session.user.image ? (
									<AvatarImage
										src={session.user.image}
										alt="User Avatar"
									/>
								) : (
									<AvatarFallback>
										{session.user.name
											? session.user.name
													.split(" ")
													.map((n) => n[0])
													.join("")
													.toUpperCase()
											: "U"}
									</AvatarFallback>
								)}
							</Avatar>
						</button>

						{/* Dropdown Menu */}
						{isMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-30">
								<div className="px-4 py-2 border-b dark:border-gray-700">
									<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
										{session.user.name}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										{session.user.email}
									</p>
								</div>
								<button
									onClick={handleSignOut}
									className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<Link
						href="/nexusconjure/agency"
						className="navigation-login-button px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
					>
						Login
					</Link>
				)}

				{/* Mode Toggle */}
				<ModeToggle />

				{/* Mobile Menu Toggle */}
				<button
					className="navigation-menu-toggle md:hidden focus:outline-none"
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
						<span className="block w-6 h-0.5 bg-current mb-1 transition-transform duration-300"></span>
						<span className="block w-6 h-0.5 bg-current mb-1 transition-transform duration-300"></span>
						<span className="block w-6 h-0.5 bg-current transition-transform duration-300"></span>
					</div>
				</button>
			</aside>

			{/* Mobile Navigation Overlay */}
			<div
				className={`navigation-overlay fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
			>
				<div
					className={`navigation-mobile-menu fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 p-6 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
				>
					<button
						className="mb-8 focus:outline-none"
						onClick={toggleMenu}
						aria-label="Close menu"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-gray-700 dark:text-gray-200"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<ul className="navigation-mobile-list flex flex-col space-y-4">
						<li>
							<Link
								href="/nexusconjure/pricing"
								className="hover:text-primary"
							>
								Pricing
							</Link>
						</li>
						<li>
							<Link
								href="/nexusconjure/about"
								className="hover:text-primary"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/nexusconjure/documentation"
								className="hover:text-primary"
							>
								Documentation
							</Link>
						</li>
						<li>
							<Link
								href="/nexusconjure/features"
								className="hover:text-primary"
							>
								Features
							</Link>
						</li>
						<li>
							<Link
								href="/nexusconjure/alerts"
								className="hover:text-primary"
							>
								Alerts
							</Link>
						</li>
						<li>
							<Link
								href="/nexusconjure/policies"
								className="hover:text-primary"
							>
								Policies
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
