import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PostModal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-40  flex justify-center items-center">
            <div className="bg-bgcolor p-4 rounded-lg shadow-lg  w-[575px]">
                <button
                    onClick={onClose}
                    className="float-right text-xl font-bold"
                >
                    ×
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default PostModal;
