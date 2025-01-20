"use client";

import React from "react";
import { motion } from "framer-motion";
import useFirestore from "@/hooks/merchandise/useFirestore";

type SvgGridProps = {
    setSelectedImg: (url: string) => void;
    designs: Array<{ id: string; url: string }>; // Add the designs prop
};

const SvgGrid: React.FC<SvgGridProps> = ({ setSelectedImg, designs }) => {
    return (
        <div className="svg-grid">
            {designs &&
                designs.map((design) => (
                    <motion.div
                        className="svg-wrap"
                        key={design.id}
                        layout
                        whileHover={{ opacity: 1 }}
                        onClick={() => setSelectedImg(design.url)}
                    >
                        <motion.img
                            className="svgs"
                            src={design.url}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
        </div>
    );
};

export default SvgGrid;
