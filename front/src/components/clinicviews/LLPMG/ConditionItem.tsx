"use client";

import { type FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ConditionItemProps {
    condition: string;
    description: string;
}

const ConditionItem: FC<ConditionItemProps> = memo(
    ({ condition, description }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        const toggleExpand = useCallback(() => {
            setIsExpanded((prev) => !prev);
        }, []);

        return (
            <div
                className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "row-span-2" : ""}`}
            >
                <button
                    className="w-full p-4 text-left flex justify-between items-center bg-blue-200/70 dark:bg-blue-900/70 hover:bg-blue-300/70 dark:hover:bg-gray-500/70 transition-colors duration-300 "
                    onClick={toggleExpand}
                >
                    <span className="font-bold text-blue-900 dark:text-blue-200">
                        {condition}
                    </span>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div
                    className={`bg-blue-700/40 dark:bg-gray-600/40 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-48 p-4" : "max-h-0 p-0"}`}
                >
                    <p className="text-white">{description}</p>
                </div>
            </div>
        );
    }
);

ConditionItem.displayName = "ConditionItem";

export default ConditionItem;
