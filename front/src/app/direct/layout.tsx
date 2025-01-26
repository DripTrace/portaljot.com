import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/direct/theme-provider";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/direct/react-query-provider";
import ReduxProvider from "@/providers/direct/redux-provider";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Slide",
	description: "Automate DMs and comments on instagram",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body suppressHydrationWarning className={jakarta.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						disableTransitionOnChange
					>
						<ReduxProvider>
							<ReactQueryProvider>{children}</ReactQueryProvider>
						</ReduxProvider>

						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
