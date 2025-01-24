// import { useViewportContext } from "@/hooks/nexusconjure/useViewportContext";
// import { ServerStyleSheet } from "styled-components";
// import { Html, Head, Main, NextScript } from "next/document";

// export const metadata = {
// 	title: "Styled Components SSR Example",
// 	description:
// 		"An example of SSR with styled-components in Next.js App Router",
// };

// export default async function RootLayout({
// 	children,
// }: {
// 	children: React.ReactNode;
// }) {
// 	const sheet = new ServerStyleSheet();
// 	let appHtml: React.ReactNode = null;
// 	let styles: React.ReactNode = null;

// 	try {
// 		// Collect styles during SSR
// 		appHtml = sheet.collectStyles(<>{children}</>);
// 		styles = sheet.getStyleElement();
// 	} finally {
// 		// Clean up resources
// 		sheet.seal();
// 	}

// 	return (
// 		<Html lang="en">
// 			<Head>
// 				{/* Inject styles */}
// 				{styles}
// 			</Head>
// 			<body>
// 				<Main>{appHtml}</Main>
// 				<NextScript />
// 				{/* Portal roots */}
// 				<div id="modal-root"></div>
// 				<div id="sketch-root"></div>
// 			</body>
// 		</Html>
// 	);
// }

"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	});

	if (typeof window !== "undefined") return <>{children}</>;

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			{children}
		</StyleSheetManager>
	);
}
