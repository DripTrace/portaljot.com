"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Add this type declaration at the top of your file
declare global {
	interface Document {
		startViewTransition?: (callback: () => void) => void;
	}
}

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const toggleRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const switchTheme = () => {
			setTheme(theme === "dark" ? "light" : "dark");
		};

		const toggleTheme = () => {
			if (!document.startViewTransition) {
				switchTheme();
			} else {
				document.startViewTransition(() => {
					switchTheme();
				});
			}
		};

		const toggle = toggleRef.current;
		if (toggle) {
			toggle.addEventListener("click", toggleTheme);
		}

		return () => {
			if (toggle) {
				toggle.removeEventListener("click", toggleTheme);
			}
		};
	}, [theme, setTheme]);

	return (
		<button
			ref={toggleRef}
			aria-label="Toggle theme"
			className="fixed top-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
		>
			{theme === "dark" ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					className="w-6 h-6 text-yellow-400"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					className="w-6 h-6 text-gray-900"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			)}
		</button>
	);
}
