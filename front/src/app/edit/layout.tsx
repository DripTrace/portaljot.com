// app/layout.tsx
import "@/styles/globals.css";

export const metadata = {
	title: "mebm",
	description: "Media Editor",
};

export default function EditRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
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
