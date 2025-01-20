"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, {
    forwardRef,
    useState,
    useImperativeHandle,
    ReactNode,
} from "react";
import ReactDOM from "react-dom";

const variants = {
    hidden: { opacity: 0, x: 0, y: -200 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, y: 0 },
};

// Define the types for the props and ref
interface GeneralModalProps {
    children: ReactNode;
}

export interface GeneralModalHandle {
    openModal: () => void;
    close: () => void;
}

const GeneralModal = forwardRef<GeneralModalHandle, GeneralModalProps>(
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
            return ReactDOM.createPortal(
                <div className="modal-wrapper">
                    <div className="modal-backdrop" onClick={close}></div>
                    <AnimatePresence mode="wait" onExitComplete={() => close()}>
                        <motion.div
                            key="login-modal"
                            initial="hidden"
                            animate="enter"
                            exit="exit"
                            variants={variants}
                            transition={{ type: "linear" }}
                            className="modal-box"
                        >
                            {props.children}
                        </motion.div>
                    </AnimatePresence>
                </div>,
                document.getElementById("modal-root") as HTMLElement
            );
        }

        return null;
    }
);

export default GeneralModal;
