// "use client";

// import { useEffect, useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import Head from "next/head";

// interface LayoutProps {
// 	children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
// 	const [isLoaded, setIsLoaded] = useState(false);

// 	useEffect(() => {
// 		setIsLoaded(true);
// 	}, []);

// 	return (
// 		<div
// 			className={`flex flex-col min-h-screen ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
// 		>
// 			<Head>
// 				<link
// 					rel="stylesheet"
// 					type="text/css"
// 					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
// 				/>
// 				<link
// 					rel="stylesheet"
// 					type="text/css"
// 					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
// 				/>
// 			</Head>
// 			<Header />
// 			<main className="flex-grow">{children}</main>
// 			<Footer />
// 		</div>
// 	);
// };

// export default Layout;

// "use client";

// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// // import { LLPMGThemeProvider } from '@/context/LLPMGTheme';
// import Header from "@/components/LLPMG/Header";
// import Footer from "@/components/LLPMG/Footer";
// import { ThemeProvider } from "@/context/LLPMGTheme";

// const AnimatePresence = dynamic(
// 	() => import("framer-motion").then((mod) => mod.AnimatePresence),
// 	{ ssr: false }
// );

// export default function Layout({ children }: { children: React.ReactNode }) {
// 	const [isClient, setIsClient] = useState(false);

// 	useEffect(() => {
// 		setIsClient(true);
// 	}, []);

// 	return (
// 		// <ThemeProvider>
// 		<div className="flex flex-col min-h-screen">
// 			<Header />
// 			{isClient ? (
// 				<AnimatePresence mode="wait" initial={false}>
// 					<main className="flex-grow">{children}</main>
// 				</AnimatePresence>
// 			) : (
// 				<main className="flex-grow">{children}</main>
// 			)}
// 			<Footer />
// 		</div>
// 		// </ThemeProvider>
// 	);
// }

import React from "react";
import { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
	title: "LLPMG",
	description: "Loma Linda Psychiatric Medical Group",
};

export default function LLPMGRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ClientLayout>{children}</ClientLayout>;
}
