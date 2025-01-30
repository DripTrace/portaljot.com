import React from "react";

export const ScrollContainer = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[101vh] w-[101vw] font-sans">
            <h3 className="mb-4">Scroll down ↓</h3>
            <div className="w-[500px] h-[500px] overflow-auto snap-y snap-mandatory">
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-center w-[500px] h-[500px] text-[38px] snap-center
              ${i % 2 === 0 ? "bg-teal-400 text-beige-200" : "bg-beige-200 text-teal-400"}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};
