"use client";

import { AMHRootState } from "@/store/access-mentalhealth/anAMHStore";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../store/store";

const AnimatedBackground: React.FC = () => {
    const someAMHControls = useAnimation();
    const isAMHDarkMode = useSelector(
        (state: AMHRootState) => state.anAMHDarkMode.isAMHDarkMode
    );
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!shouldReduceMotion) {
            someAMHControls.start({
                backgroundPosition: ["0% 50%", "100% 50%"],
                transition: {
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                },
            });
        }
    }, [someAMHControls, shouldReduceMotion]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-full h-full bg-gradient-to-r bg-[length:200%_200%] -z-10"
            style={{
                backgroundImage: isAMHDarkMode
                    ? "linear-gradient(to right, #374151, #1F2937, #111827)" // Dark mode colors
                    : "linear-gradient(to right, #DBEAFE, #BFDBFE, #60A5FA)", // Light mode colors
                backgroundPosition: "0% 50%",
            }}
            animate={shouldReduceMotion ? undefined : someAMHControls}
        />
    );
};

export default AnimatedBackground;
