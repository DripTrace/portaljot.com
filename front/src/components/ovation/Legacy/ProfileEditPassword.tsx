import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
    IoCloseCircleOutline,
    IoEyeOutline,
    IoEyeOffOutline,
} from "react-icons/io5";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

interface ChangePasswordModalProps {
    show: boolean;
    handleClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
    show,
    handleClose,
}) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isRetypePasswordVisible, setIsRetypePasswordVisible] =
        useState(false);
    const session = getSession();

    React.useEffect(() => {
        async function fetchSession() {
            const session = await getSession();
            if (session && session.user) {
                setUserId((session.user as { id: string }).id);
            }
        }
        fetchSession();
    }, [session]);

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,50}$/;
        return regex.test(password);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const password = event.target.value;
        setNewPassword(password);
        setPasswordValid(validatePassword(password));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!isPasswordValid) {
            alert("New password is not valid");
            return;
        }
        if (newPassword !== retypePassword) {
            alert("New password and retype password do not match");
            return;
        }
        try {
            const response = await fetch("/api/userPasswordEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    oldPassword,
                    newPassword,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(`Error: Failed to update password`);
                handleClose();
                return;
            }
            toast.success("Password updated successfully");
            handleClose();
        } catch (error) {
            toast.error(`Error: Failed to update password`);
            handleClose();
        }
    };
    if (!show) {
        return null;
    }

    return ReactDOM.createPortal(
        show ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="p-6 rounded-lg border-2 border-ovteal text-white bg-bgcolor">
                    <div className="flex justify-end text-right text-2xl font-bold text-ovteal">
                        <div
                            className=" sticky float-right text-3xl font-bold text-ovteal"
                            onClick={handleClose}
                        >
                            <IoCloseCircleOutline />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2 mt-3 relative">
                            <label
                                htmlFor="oldPassword"
                                className="text-sm font-medium text-white"
                            >
                                Old Password
                            </label>
                            <input
                                type={
                                    isOldPasswordVisible ? "text" : "password"
                                }
                                id="oldPassword"
                                value={oldPassword}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setOldPassword(e.target.value)}
                                autoComplete="current-password"
                                className="border text-black border-gray-300 rounded-lg p-2"
                            />
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOldPasswordVisible(
                                        !isOldPasswordVisible
                                    );
                                }}
                                className="absolute right-2 top-7 text-black"
                            >
                                {isOldPasswordVisible ? (
                                    <IoEyeOffOutline />
                                ) : (
                                    <IoEyeOutline />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 relative">
                            <label
                                htmlFor="newPassword"
                                className="text-sm font-medium text-white"
                            >
                                New Password
                            </label>
                            <input
                                type={
                                    isNewPasswordVisible ? "text" : "password"
                                }
                                id="newPassword"
                                onClick={(e) => e.stopPropagation()}
                                value={newPassword}
                                onChange={handlePasswordChange}
                                autoComplete="new-password"
                                className={`border text-black border-gray-300 rounded-lg p-2 ${isPasswordValid ? "border-green-500" : ""}`}
                            />
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNewPasswordVisible(
                                        !isNewPasswordVisible
                                    );
                                }}
                                className="absolute right-2 top-7 text-black"
                            >
                                {isNewPasswordVisible ? (
                                    <IoEyeOffOutline />
                                ) : (
                                    <IoEyeOutline />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 relative">
                            <label
                                htmlFor="retypePassword"
                                className="text-sm font-medium text-white"
                            >
                                Retype Password
                            </label>
                            <input
                                type={
                                    isRetypePasswordVisible
                                        ? "text"
                                        : "password"
                                }
                                id="retypePassword"
                                onClick={(e) => e.stopPropagation()}
                                value={retypePassword}
                                onChange={(e) =>
                                    setRetypePassword(e.target.value)
                                }
                                autoComplete="new-password"
                                className="border text-black border-gray-300 rounded-lg p-2"
                            />
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRetypePasswordVisible(
                                        !isRetypePasswordVisible
                                    );
                                }}
                                className="absolute right-2 top-7 text-black"
                            >
                                {isRetypePasswordVisible ? (
                                    <IoEyeOffOutline />
                                ) : (
                                    <IoEyeOutline />
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 bg-ovteal text-black font-bold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        ) : null,
        document.body
    );
};

export default ChangePasswordModal;
