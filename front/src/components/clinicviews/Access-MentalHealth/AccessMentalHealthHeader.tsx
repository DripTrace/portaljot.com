"use client";

import { toggleAMHDarkMode } from "@/store/access-mentalhealth/anAMHDarkModeSlice";
import { AMHRootState } from "@/store/access-mentalhealth/anAMHStore";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const AccessMentalHealthHeader: React.FC = () => {
    const isDarkMode = useSelector(
        (state: AMHRootState) => state.anAMHDarkMode.isAMHDarkMode
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleToggle = () => {
        dispatch(toggleAMHDarkMode());
    };

    return (
        <header className="p-6 flex justify-between items-center relative z-20">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Access Mental Healthcare
            </h1>
            <nav>
                <ul className="flex space-x-4 text-gray-900 dark:text-gray-300">
                    <li>
                        <a href="#about" className="hover:text-blue-600">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#services" className="hover:text-blue-600">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="#testimonials" className="hover:text-blue-600">
                            Testimonials
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-blue-600">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
            <button
                onClick={handleToggle}
                className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
            >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </header>
    );
};

export default AccessMentalHealthHeader;
