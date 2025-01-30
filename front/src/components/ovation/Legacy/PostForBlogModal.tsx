import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { PiXCircleBold } from "react-icons/pi";
import EmojiPicker, {
    Theme,
    SkinTones,
    EmojiClickData,
} from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
interface EmojiObject {
    emoji: string;
    names: string[];
    originalUnified: string;
    unified: string;
    activeSkinTone: string;
}
const PostModal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [focusedElement, setFocusedElement] = useState(null);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && session.user) {
            setUserId(session.user.id);
        }
    }, [session]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!title || !content) {
            toast.error("Both title and content are required.");
            return;
        }

        const response = await fetch("/api/executePost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                user_id: userId,
            }),
        });

        if (response.ok) {
            toast.success("Post created successfully!");
            onClose();
        } else {
            toast.error("An error occurred while creating the post.");
            onClose();
        }
    };

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
    const onEmojiClick = (emojiObject: EmojiClickData, _: MouseEvent) => {
        setContent((prevContent) => prevContent + emojiObject.emoji);
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-top justify-center"
            onClick={onClose}
        >
            <div
                className="bg-bgcolor p-4 m-4 rounded-lg shadow-lg w-1/2 h-[70vh] mt-9"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="sticky mb-7  mt-2 float-right text-3xl bg-bgcolor  text-ovteal hover:bg-white/10 rounded-full"
                    title="Close Modal"
                >
                    <PiXCircleBold />
                </button>

                <form
                    onSubmit={onSubmit}
                    className={"overflow-y-auto h-[90vh]"}
                >
                    <label
                        htmlFor="title"
                        className="flex flex-col mt-7 text-sm font-medium text-gray-700 bg-bgcolor "
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="p-3 mt-1 ml-3 block w-[90%] rounded-md bg-bgcolor border-ovteal ring-2 ring-ovteal shadow-lg focus:ring-opacity-50 placeholder-gradient-to-r placeholder-from-blue-400 placeholder-to-purple-500"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700 mt-4 bg-bgcolor "
                    >
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        rows={5}
                        className="text-lg w-[90%] ml-3 p-3 mb-4 mt-1 block  rounded-md bg-bgcolor border-ovteal ring-2 ring-ovteal shadow-lg focus:ring-opacity-50 placeholder-gradient-to-r placeholder-from-blue-400 placeholder-to-purple-500"
                        placeholder="Enter post content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    <div className="flex items-start">
                        <div className="flex flex-col ">
                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-bgcolor border border-ovteal text-white hover:bg-white/10 rounded-full"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="relative">
                            <FaSmile
                                className="text-ovteal ml-7 mt-5"
                                size="2em"
                                onClick={() =>
                                    setPickerVisible(!isPickerVisible)
                                }
                            />

                            {isPickerVisible && (
                                <EmojiPicker
                                    width={444}
                                    height={300}
                                    searchDisabled={true}
                                    theme={Theme.DARK}
                                    onEmojiClick={onEmojiClick}
                                />
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default PostModal;
