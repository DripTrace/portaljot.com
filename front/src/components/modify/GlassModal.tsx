"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	forwardRef,
	useState,
	useImperativeHandle,
	type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const variants = {
	hidden: { opacity: 0, x: 0, y: -200 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: -100, y: 0 },
};

// Define the types for the props and ref
interface GlassModalProps {
	children: ReactNode;
}

export interface GlassModalHandle {
	openModal: () => void;
	close: () => void;
}

const GlassModal = forwardRef<GlassModalHandle, GlassModalProps>(
	(props, ref) => {
		const [display, setDisplay] = useState(false);

		useImperativeHandle(ref, () => ({
			openModal: () => open(),
			close: () => close(),
		}));

		const open = () => {
			setDisplay(true);
		};

		const close = () => {
			setDisplay(false);
		};

		if (display) {
			return createPortal(
				<div className="glass-modal-wrapper">
					<div className="glass-modal-backdrop" onClick={close}></div>
					<AnimatePresence mode="wait" onExitComplete={() => close()}>
						<motion.div
							key="login-modal"
							initial="hidden"
							animate="enter"
							exit="exit"
							variants={variants}
							transition={{ type: "linear" }}
							className="glass-modal-box"
						>
							{props.children}
						</motion.div>
					</AnimatePresence>
				</div>,
				document.getElementById("glass-modal-root") as HTMLElement
			);
		}

		return null;
	}
);

export default GlassModal;
