import ThemeToggle from "@/components/clinicviews/background/ThemeToggle";
import { BackgroundThemeProvider } from "@/context/clinicviews/background/BackgroundContext";
import "@/styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<BackgroundThemeProvider>
				<body>
					<ThemeToggle />
					{children}
				</body>
			</BackgroundThemeProvider>
		</html>
	);
}
