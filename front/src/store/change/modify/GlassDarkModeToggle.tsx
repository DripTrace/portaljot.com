"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";

const isGlassDark = (): boolean =>
	(localStorage && localStorage.theme === "dark") ||
	(!("theme" in localStorage) &&
		window.matchMedia("(prefers-color-scheme: dark)").matches);

const getThemeString = (isGlassDark: boolean): string =>
	isGlassDark ? "dark" : "light";

const GlassDarkModeToggle = (): JSX.Element => {
	const [isGlassDarkMode, setGlassDarkMode] = useState(false);

	const toggleMode = (): void => {
		localStorage.theme = getThemeString(!isGlassDarkMode);
		if (localStorage.theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setGlassDarkMode(!isGlassDarkMode);
	};

	useEffect(() => {
		setGlassDarkMode(isGlassDark());
	}, []);

	const darkModeActive: boolean =
		typeof window !== "undefined" &&
		document.documentElement.classList.contains("dark");

	return (
		<AnimatePresence initial={false}>
			<motion.button
				className="text-2xl sm:text-3xl text-yellow-400 dark:text-yellow-300 focus:outline-none size-[4rem]"
				onClick={toggleMode}
				key={darkModeActive ? "dark-icon" : "light-icon"}
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 20, opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				{/* {darkModeActive ? "🌙" : "🌤️"} */}
				{darkModeActive ? <MoonIcon /> : <SunIcon />}
			</motion.button>
		</AnimatePresence>
	);
};

export default GlassDarkModeToggle;
