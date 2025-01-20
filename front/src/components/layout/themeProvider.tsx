// "use client"

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"

// export function ThemeProvider({ children, ...props }) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface CustomThemeProviderProps {
	children: React.ReactNode;
	attribute?: string;
	defaultTheme?: string;
	enableSystem?: boolean;
	storageKey?: string;
}

export function ThemeProvider({
	children,
	...props
}: CustomThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
