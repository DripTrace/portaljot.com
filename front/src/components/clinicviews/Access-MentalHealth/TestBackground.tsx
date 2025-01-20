"use client";

import { motion } from "framer-motion";

const TestBackground: React.FC = () => {
	return (
		<motion.div
			className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_200%]"
			animate={{
				backgroundPosition: ["0% 50%", "100% 50%"],
			}}
			transition={{
				duration: 20,
				ease: "linear",
				repeat: Infinity,
			}}
			style={{ backgroundPosition: "0% 50%" }}
		/>
	);
};

export default TestBackground;
