"use client";

import { motion } from "framer-motion";

function Modal({ setSelectedImg, selectedImg }: any) {
    const handleClick = (e: any) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImg(null);
        }
    };

    return (
        <motion.div
            className="svg-backdrop backdrop"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.img
                className="svg-display"
                src={selectedImg}
                alt="enlarged pic"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            />
        </motion.div>
    );
}

export default Modal;
