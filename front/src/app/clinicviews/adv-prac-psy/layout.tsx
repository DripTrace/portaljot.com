import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/clinicviews/advancedpracticepsych/advpracpsy.css";
import Head from "next/head";
import AdvancedPracticePsychLogo from "@/components/clinicviews/AdvancedPracticePsych/AdvancedPracticePsychLogo";
import Script from "next/script";
export const metadata: Metadata = {
	title: "Advanced Practice",
	description: "Advanced Practice Psych Education",
};

export default function AdvPracPsyRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>Sliced Text Effect | Advanced Practice</title>
				<meta
					name="description"
					content="A scroll-based sliced text animation for Advanced Practice, focusing on education in psychiatric practice."
				/>
				<meta
					name="keywords"
					content="text effect, psychiatry, psychiatric education, animation, typography"
				/>
				<meta name="author" content="Advanced Practice" />
				<link
					rel="shortcut icon"
					href="/advanced-practice-psych/favicon.ico"
				/>
				<Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></Script>
			</Head>
			<body className={``}>{children}</body>
			<AdvancedPracticePsychLogo
				id="advanced-practice-psych-logo"
				className="text-blue-900 absolute top-[1rem] right-[1rem] h-[9rem] w-[9rem] z-50"
			/>
		</html>
	);
}
