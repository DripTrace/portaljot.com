import ThemeToggle from "@/components/clinicviews/background/ThemeToggle";
import { BackgroundThemeProvider } from "@/clinicviews/context/background/BackgroundContext";
import "@/styles/clinicviews/background/background-home/background-home.css";

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
