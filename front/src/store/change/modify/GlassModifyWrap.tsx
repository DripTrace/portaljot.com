"use client";

import { DefaultSeo } from "next-seo";
import { type ReactNode, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import UserProvider from "./GlassUserContext";
import NextAuthProvider from "./NextAuthProvider";
import Glass from "@/components/modify/Glass";

interface GlassModifyWrapProps {
	children: ReactNode;
}

export default function GlassModifyWrap({ children }: GlassModifyWrapProps) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (
				localStorage.theme === "dark" ||
				(!("theme" in localStorage) &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
			) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Head>
				{/* <link rel="icon" href="/merchandise/Grim2021.svg" /> */}
				<link
					href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Fuzzy+Bubbles:wght@400;700&family=Grandstander:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div className="antialiased font-grandstander bg-gray-300 dark:bg-gray-800 text-black dark:text-[#4C8EFF] transition-colors duration-200">
				<DefaultSeo
					titleTemplate="%s - Modify"
					openGraph={{
						type: "website",
						locale: "en_IE",
						url: `${process.env.MODIFY_URL}`,
						description:
							"The personal website for rPalm, graphic artist.",
						site_name: "rPalm | portaljot.com",
						images: [],
					}}
					canonical={`${process.env.MODIFY_URL}`}
				/>
				<AnimatePresence
					mode="wait"
					initial={false}
					onExitComplete={() => window.scrollTo(0, 0)}
				>
					<NextAuthProvider>
						<UserProvider>
							<Glass>{children}</Glass>
						</UserProvider>
					</NextAuthProvider>
				</AnimatePresence>
			</div>
			<div id="glass-modal-root"></div>
		</>
	);
}
