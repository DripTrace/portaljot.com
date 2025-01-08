"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	ReactNode,
	useContext,
	useState,
	useEffect,
	createContext,
} from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	login: (username?: string) => void;
	logout: () => void;
	loginRequiredRedirect: () => void;
	username: string;
}

const LOGIN_REDIRECT_URL = "/dashboard";
const LOGOUT_REDIRECT_URL = "/dashboard/login";
const LOGIN_REQUIRED_URL = "/dashboard/login";
const LOCAL_STORAGE_KEY = "is-logged-in";
const LOCAL_USERNAME_KEY = "username";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [username, setUsername] = useState("");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedAuthStatus !== null) {
			const storedAuthStatusInt = parseInt(storedAuthStatus, 10);
			setIsAuthenticated(storedAuthStatusInt === 1);
		}
		const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY);
		if (storedUn !== null) {
			setUsername(storedUn);
		}
	}, []);

	const login = (username?: string): void => {
		setIsAuthenticated(true);
		localStorage.setItem(LOCAL_STORAGE_KEY, "1");
		if (username) {
			localStorage.setItem(LOCAL_USERNAME_KEY, username);
			setUsername(username);
		} else {
			localStorage.removeItem(LOCAL_USERNAME_KEY);
		}
		const nextUrl = searchParams?.get("next");
		const invalidNextUrl = ["/dashboard/login", "/dashboard/logout"];
		const nextUrlValid =
			nextUrl &&
			nextUrl.startsWith("/dashboard") &&
			!invalidNextUrl.includes(nextUrl);
		if (nextUrlValid) {
			router.replace(nextUrl);
		} else {
			router.replace(LOGIN_REDIRECT_URL);
		}
	};

	const logout = (): void => {
		setIsAuthenticated(false);
		localStorage.setItem(LOCAL_STORAGE_KEY, "0");
		router.replace(LOGOUT_REDIRECT_URL);
	};

	const loginRequiredRedirect = (): void => {
		setIsAuthenticated(false);
		localStorage.setItem(LOCAL_STORAGE_KEY, "0");
		let loginWithNextUrl = `/${LOGIN_REQUIRED_URL}?next=${pathname}`;
		if (LOGIN_REQUIRED_URL === pathname) {
			loginWithNextUrl = LOGIN_REQUIRED_URL;
		}
		router.replace(loginWithNextUrl);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				loginRequiredRedirect,
				username,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
