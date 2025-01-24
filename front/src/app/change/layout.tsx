// app/layout.tsx
import "@/styles/globals.css";

export const metadata = {
	title: "Portal Jot Media",
	description: "Media Changer",
};

export default function ChangeRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon/default/favicon.ico" />
				<meta charSet="UTF-8" />
				<meta
					content="width=device-width, user-scalable=no"
					name="viewport"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
