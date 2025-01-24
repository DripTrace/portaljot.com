import { motion } from "framer-motion";

const FireAnimation = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		className="fixed inset-0 w-screen h-screen overflow-hidden bg-orange-100"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			<g className="flames">
				{[...Array(30)].map((_, i) => (
					<motion.path
						key={i}
						d={`M${50 + Math.random() * 40 - 20} 100 Q${
							50 + Math.random() * 40 - 20
						} ${80 + Math.random() * 20} ${
							50 + Math.random() * 40 - 20
						} ${60 + Math.random() * 40}`}
						fill="none"
						stroke="#FF9800"
						strokeWidth="0.3"
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{
							duration: 1 + Math.random(),
							repeat: Infinity,
							repeatType: "reverse",
						}}
					/>
				))}
			</g>
		</svg>
	</motion.div>
);

export default FireAnimation;
