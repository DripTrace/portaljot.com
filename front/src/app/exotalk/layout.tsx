import type { Metadata } from "next";
import "@/styles/exotalk/globals.css";
import Header from "@/components/exotalk/Header";
import { ThemeProvider } from "@/components/exotalk/ThemeProvider";
import ClientProviders from "@/components/exotalk/ClientProviders";
import PrismaAuthProvider from "@/components/exotalk/PrismaAuthProvider";
import SubscriptionProvider from "@/components/exotalk/SubscriptionProvider";
import { Toaster } from "@/components/ui/toaster";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Exotalk",
	description: "Converse without boundries.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClientProviders>
			<html lang="en">
				<body className="flex flex-col min-h-screen">
					<PrismaAuthProvider>
						<SubscriptionProvider>
							<ThemeProvider
								attribute="class"
								defaultTheme="system"
								enableSystem
								disableTransitionOnChange
							>
								<Header />

								{children}

								<Toaster />
							</ThemeProvider>
						</SubscriptionProvider>
					</PrismaAuthProvider>
				</body>
			</html>
		</ClientProviders>
	);
}
