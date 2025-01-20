import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Secondary Quantization",
	description: "This is the following generation.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className="min-h-screen h-screen overflow-hidden flex flex-col">
					<Toaster />
					{/* <SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn> */}
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
