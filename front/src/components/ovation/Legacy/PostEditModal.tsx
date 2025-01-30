import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { PiXCircleBold } from "react-icons/pi";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PostModal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);
    if (!show) {
        return null;
    }

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-40  flex justify-center items-center "
            onClick={onClose}
        >
            <div
                className="bg-bgcolor p-4 rounded-lg shadow-lg  w-3/5 h-screen mt-9"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="sticky float-right text-3xl font-bold text-ovteal"
                    title="Close"
                >
                    <PiXCircleBold />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default PostModal;
