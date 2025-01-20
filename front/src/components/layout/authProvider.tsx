"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("access_token");
            const storedUsername = localStorage.getItem("username");
            if (token && storedUsername) {
                setIsAuthenticated(true);
                setUsername(storedUsername);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (newUsername: string, token: string) => {
        localStorage.setItem("access_token", token);
        localStorage.setItem("username", newUsername);
        document.cookie = `access_token=${token}; path=/; max-age=3600; SameSite=Strict`;
        setIsAuthenticated(true);
        setUsername(newUsername);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        document.cookie =
            "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setIsAuthenticated(false);
        setUsername(null);
        router.push("/dashboard/login");
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, username, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("access_token");
    }
    return null;
}
