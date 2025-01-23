import { useState, useEffect } from "react";

export default function useAMHDarkMode() {
    const [anAMHDarkMode, setAMHDarkMode] = useState(false);

    useEffect(() => {
        // Check user's system preference
        const isAMHDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setAMHDarkMode(isAMHDark);
    }, []);

    useEffect(() => {
        if (anAMHDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [anAMHDarkMode]);

    return [anAMHDarkMode, setAMHDarkMode] as const;
}
