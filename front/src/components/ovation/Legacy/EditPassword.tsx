import React, { useState } from "react";
import ReactDOM from "react-dom";

const EditPassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Password change form submitted");
    };

    return (
        <div>
            ReactDOM.createPortal(
            <>
                <form className="z-40" onSubmit={handlePasswordChange}>
                    <div className="mt-10 mx-auto">
                        <div className="mb-6">
                            <label
                                className="block text-xl font-bold mb-2"
                                htmlFor="old-password"
                            >
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old-password"
                                className="w-1/3 p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                placeholder="Old Password *"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-xl font-bold mb-2"
                                htmlFor="new-password"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new-password"
                                className="w-1/3 p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                placeholder="New Password *"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-xl font-bold mb-2"
                                htmlFor="confirm-password"
                            >
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="w-1/3 p-2 bg-bgcolor border-b border-ovteal placeholder:font-bold outline-none placeholder:pl-1"
                                placeholder="Confirm New Password *"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer inline-block bg-ovteal text-bgcolor font-bold hover:bg-opacity-80 transition duration-100 py-2 px-4 rounded-full"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </>
            , document.body )
        </div>
    );
};

export default EditPassword;
