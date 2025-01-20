"use client";

import React from "react";
import { motion } from "framer-motion";

const CustomVisualization: React.FC = () => {
    const items = [
        { title: "Clinical", color: "#1FABC7" },
        { title: "Research", color: "#6EA4CE" },
        { title: "Housing", color: "#0C3C60" },
        { title: "Philanthropy", color: "#D1E0EB" },
    ];

    return (
        <div className="flex justify-center items-center h-full">
            <div className="grid grid-cols-2 gap-4">
                {items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="w-24 h-24 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: item.color }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: "easeOut",
                        }}
                        whileHover={{ scale: 1.1 }}
                    >
                        {item.title}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CustomVisualization;
