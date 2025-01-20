"use client";

import { ModeToggle } from "@/components/global/mode-toggle";
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
            <Link href="/" className="navigation-logo">
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
                        <Link href="/pricing">Pricing</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/documentation">Documentation</Link>
                    </li>
                    <li>
                        <Link href="/features">Features</Link>
                    </li>
                    <li>
                        <Link href="/alerts">Alerts</Link>
                    </li>
                    <li>
                        <Link href="/policies">Policies</Link>
                    </li>
                </ul>
            </nav>
            <aside className="navigation-aside">
                {!user ? (
                    <Link href="/agency" className="navigation-login-button">
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
                            <Link href="/pricing">Pricing</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/documentation">Documentation</Link>
                        </li>
                        <li>
                            <Link href="/features">Features</Link>
                        </li>
                        <li>
                            <Link href="/alerts">Alerts</Link>
                        </li>
                        <li>
                            <Link href="/policies">Policies</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navigation;

// "use client";

// import { ModeToggle } from "@/components/global/mode-toggle";
// import {
// 	NexusConjureRootState,
// 	NexusConjureAppDispatch,
// } from "@/lib/redux/stores/ncThemeStore";
// import { UserButton } from "@clerk/nextjs";
// import { User } from "@clerk/nextjs/server";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	NexusConjureToggleMenu,
// 	NexusConjureToggleTheme,
// } from "@/lib/redux/slices/nexusConjureSlice"; // Import actions

// type Props = {
// 	user?: null | User;
// };

// const Navigation = ({ user }: Props) => {
// 	const [isMenuOpen, setIsMenuOpen] = useState(false);
// 	const dispatch = useDispatch<NexusConjureAppDispatch>();
// 	const theme = useSelector(
// 		(state: NexusConjureRootState) => state.nexusConjure.theme
// 	);

// 	const toggleMenuHandler = () => {
// 		dispatch(NexusConjureToggleMenu());
// 	};

// 	const handleThemeToggle = () => {
// 		dispatch(NexusConjureToggleTheme());
// 	};

// 	return (
// 		<div className="navigation-container">
// 			<Link href="/" className="navigation-logo">
// 				<Image
// 					src={
// 						"/assets/nexusconjurecom-vector-optimized-inverted.svg"
// 					}
// 					width={40}
// 					height={40}
// 					alt="NexusConjure logo"
// 					className="navigation-logo-image"
// 				/>
// 				<span className="navigation-logo-text">NexusConjure</span>
// 			</Link>
// 			<nav className="navigation-desktop">
// 				<ul className="navigation-list">
// 					<li>
// 						<Link href="/pricing">Pricing</Link>
// 					</li>
// 					<li>
// 						<Link href="/about">About</Link>
// 					</li>
// 					<li>
// 						<Link href="/documentation">Documentation</Link>
// 					</li>
// 					<li>
// 						<Link href="/features">Features</Link>
// 					</li>
// 					<li>
// 						<Link href="/alerts">Alerts</Link>
// 					</li>
// 					<li>
// 						<Link href="/policies">Policies</Link>
// 					</li>
// 				</ul>
// 			</nav>
// 			<aside className="navigation-aside">
// 				{!user ? (
// 					<Link href="/agency" className="navigation-login-button">
// 						Login
// 					</Link>
// 				) : (
// 					<UserButton />
// 				)}
// 				<button
// 					onClick={handleThemeToggle}
// 					className="theme-toggle-button"
// 				>
// 					{theme === "nc-light" ? "Dark Mode" : "Light Mode"}{" "}
// 					{/* Adjusted theme comparison */}
// 				</button>
// 				<button
// 					className="navigation-menu-toggle"
// 					onClick={toggleMenuHandler}
// 					aria-label="Toggle menu"
// 				>
// 					<div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
// 						<span></span>
// 						<span></span>
// 						<span></span>
// 					</div>
// 				</button>
// 			</aside>
// 			<div className={`navigation-overlay ${isMenuOpen ? "active" : ""}`}>
// 				<div
// 					className={`navigation-mobile-menu ${
// 						isMenuOpen ? "active" : ""
// 					}`}
// 				>
// 					<ul className="navigation-mobile-list">
// 						<li>
// 							<Link href="/pricing">Pricing</Link>
// 						</li>
// 						<li>
// 							<Link href="/about">About</Link>
// 						</li>
// 						<li>
// 							<Link href="/documentation">Documentation</Link>
// 						</li>
// 						<li>
// 							<Link href="/features">Features</Link>
// 						</li>
// 						<li>
// 							<Link href="/alerts">Alerts</Link>
// 						</li>
// 						<li>
// 							<Link href="/policies">Policies</Link>
// 						</li>
// 					</ul>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Navigation;
