import React from "react";

interface CustomPointerButtonProps {
    onClick: () => void;
    expanded: boolean;
}

const CustomPointerButton: React.FC<CustomPointerButtonProps> = ({
    onClick,
    expanded,
}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center px-4 py-2 bg-[#1FABC7] text-white rounded-full hover:bg-[#6EA4CE] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1FABC7]"
        >
            <span className="mr-2">
                {expanded ? "Show Less" : "Learn More"}
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                }`}
            >
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
    );
};

export default CustomPointerButton;
