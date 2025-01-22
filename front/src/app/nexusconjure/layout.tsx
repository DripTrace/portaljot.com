import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/nexusconjure/theme-provider";
import ModalProvider from "@/providers/nexusconjure/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import Head from "next/head";

export const metadata: Metadata = {
	title: "NexusConjure",
	description: "All in one Agency Solution",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link
					rel="icon"
					href="/nexusconjure/assets/nexusconjure-vector-optimized.svg"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="font-dm-sans">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ModalProvider>
						{children}
						<Toaster />
						<SonnarToaster position="bottom-left" />
					</ModalProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
