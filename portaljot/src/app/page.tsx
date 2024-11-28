"use client";

import { useState, useRef, useMemo } from "react";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	PanInfo,
} from "framer-motion";
import {
	Menu,
	X,
	Home,
	Film,
	Users,
	Settings,
	LogOut,
	PlusCircle,
} from "lucide-react";

const ArcMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);
	const rotation = useMotionValue(0);

	const toggleMenu = () => setIsOpen(!isOpen);

	const menuItems = useMemo(
		() => [
			{ icon: <Home size={20} />, label: "Dashboard" },
			{ icon: <Film size={20} />, label: "Projects" },
			{ icon: <Users size={20} />, label: "Collaborate" },
			{ icon: <Settings size={20} />, label: "Settings" },
			{ icon: <LogOut size={20} />, label: "Logout" },
			{ icon: <PlusCircle size={20} />, label: "New Feature" },
			// Add more items as needed
		],
		[]
	);

	const radius = 100;
	const isScrollable = menuItems.length > 5;

	const handleDrag = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		if (isScrollable) {
			rotation.set(rotation.get() + info.delta.y * 0.01);
		}
	};

	const handleWheel = (e: React.WheelEvent) => {
		if (isScrollable) {
			rotation.set(rotation.get() + e.deltaY * 0.01);
		}
	};

	const totalItems = menuItems.length;
	const angleStep = (Math.PI * 2) / totalItems;

	const menuItemsWithPositions = useMemo(
		() =>
			menuItems.map((item, index) => {
				const angle = angleStep * index - Math.PI / 2;
				const x = radius * Math.cos(angle);
				const y = radius * Math.sin(angle);
				return { ...item, x, y };
			}),
		[menuItems, angleStep, radius]
	);

	return (
		<div className="fixed bottom-8 left-8 z-50" ref={containerRef}>
			<motion.button
				className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-200 z-10 relative"
				onClick={toggleMenu}
				animate={{ rotate: isOpen ? 90 : 0 }}
			>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute left-0 bottom-0"
						style={{ width: radius * 2, height: radius * 2 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onWheel={handleWheel}
						drag={isScrollable ? "y" : false}
						dragConstraints={{ top: 0, bottom: 0 }}
						onDrag={handleDrag}
					>
						<motion.div
							style={{
								width: radius * 2,
								height: radius * 2,
								rotate: rotation,
								originX: 0.5,
								originY: 0.5,
							}}
						>
							{menuItemsWithPositions.map((item, index) => (
								<motion.div
									key={index}
									className="absolute"
									style={{
										left: radius,
										bottom: radius,
										x: item.x,
										y: item.y,
									}}
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ delay: index * 0.05 }}
								>
									<button className="bg-white text-blue-500 rounded-full p-3 shadow-lg hover:bg-blue-100 transition-colors duration-200 group relative">
										{item.icon}
										<span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
											{item.label}
										</span>
									</button>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-100">
			<ArcMenu />
			<main className="p-8">{children}</main>
		</div>
	);
}
