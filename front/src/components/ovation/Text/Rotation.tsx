import React from "react";

type BadgeCharProps = {
    char: string;
    index: number;
    totalChars: number;
};

const BadgeChar: React.FC<BadgeCharProps> = ({ char, index, totalChars }) => {
    const angle = (360 / totalChars) * index;
    const positionAngle = (Math.PI / 180) * angle;
    const radius = 70; // Reduced radius to keep text within the circle

    const x = Math.cos(positionAngle) * radius;
    const y = Math.sin(positionAngle) * radius;

    const charRotation = angle + 90;

    return (
        <span
            className="absolute text-white text-xs" // Adjusted text size for better fit
            style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${charRotation}deg)`,
                transformOrigin: "center",
            }}
        >
            {char}
        </span>
    );
};

const Badge: React.FC = () => {
    const chars = "Ovation ★ Social ★ SUPPERAPP ★"
        .split("")
        .filter((c) => c !== " ");

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            <div className="relative w-40 h-40 bg-black rounded-full flex items-center justify-center animate-spin-slow">
                {chars.map((char, index) => (
                    <BadgeChar
                        key={index}
                        char={char}
                        index={index}
                        totalChars={chars.length}
                    />
                ))}
            </div>
        </div>
    );
};

export default Badge;
